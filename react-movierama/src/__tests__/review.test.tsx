import { Review } from "@components";
import { render, screen } from "@testing-library/react";

describe("Review", () => {
  it("should not display createdAt date if invalid", () => {
    const reviewProps = {
      avatar: "",
      author: "test",
      createdAt: "a",
      content: "Test content",
    };
    render(<Review {...reviewProps} />);
    const dateElement = screen.getByTestId("created-at");
    expect(dateElement).toHaveTextContent("");
  });
});
