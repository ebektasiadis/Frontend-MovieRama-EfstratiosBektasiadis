import { render, screen, fireEvent } from "@testing-library/react";
import CardDetailed from "../CardDetailed";
import { MovieContext } from "../../App";

describe("CardDetailed", () => {
  const cardProps = {
    id: 1,
    title: "Test",
    poster: null,
    releaseYear: "2020-10-06",
    genres: [],
    rating: 10,
    ratingCount: 6,
    overview: "This is a test overview",
  };

  it("should render a placeholder if no poster provided", () => {
    render(<CardDetailed {...cardProps} />);
    const posterElement = screen.getByTestId("poster-img");
    expect(posterElement).toHaveAttribute(
      "src",
      "/movie-poster-placeholder.png"
    );
  });

  it("should have the movie title as an alt attribute", () => {
    render(<CardDetailed {...cardProps} />);
    const posterElement = screen.getByTestId("poster-img");
    expect(posterElement).toHaveAttribute("alt", cardProps.title);
  });

  it("should trigger a set event on click with the movie ID", () => {
    const value = {
      selectedMovie: 0,
      setSelectedMovie: jest.fn(),
    };
    render(
      <MovieContext.Provider value={value}>
        <CardDetailed {...cardProps} />
      </MovieContext.Provider>
    );

    const cardElement = screen.getByTestId("card");
    fireEvent.click(cardElement);
    expect(value.setSelectedMovie).toHaveBeenCalledTimes(1);
    expect(value.setSelectedMovie).toHaveBeenCalledWith(cardProps.id);
  });

  it("should not render genre list when empty", () => {
    render(<CardDetailed {...cardProps} />);
    const genreListElement = screen.queryByTestId("genre-list");
    expect(genreListElement).toBeNull();
  });
});
