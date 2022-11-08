import { render, screen, fireEvent } from "@testing-library/react";
import Card from "@components/Card";
import { MovieContext } from "../App";

describe("Card", () => {
  const cardProps = { id: 1, title: "Test" };

  it("should render a placeholder if no poster provided", () => {
    render(<Card {...cardProps} />);
    const posterElement = screen.getByTestId("poster-img");
    expect(posterElement).toHaveAttribute(
      "src",
      "/movie-poster-placeholder.png"
    );
  });

  it("should have the movie title as an alt attribute", () => {
    render(<Card {...cardProps} />);
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
        <Card {...cardProps} />
      </MovieContext.Provider>
    );

    const cardElement = screen.getByTestId("card");
    fireEvent.click(cardElement);
    expect(value.setSelectedMovie).toHaveBeenCalledTimes(1);
    expect(value.setSelectedMovie).toHaveBeenCalledWith(cardProps.id);
  });
});
