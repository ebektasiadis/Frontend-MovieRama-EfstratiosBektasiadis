import { Modal } from "@components";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Modal", () => {
  it("should not close when clicking inside the header", () => {
    const onHideMock = jest.fn();
    render(
      <Modal header="test" onHide={onHideMock}>
        <p></p>
      </Modal>
    );

    const headerElement = screen.getByTestId("modal-header");
    fireEvent.click(headerElement);
    expect(onHideMock).not.toHaveBeenCalled();
  });

  it("should not close when clicking inside the body", () => {
    const onHideMock = jest.fn();
    render(
      <Modal header="test" onHide={onHideMock}>
        <p></p>
      </Modal>
    );

    const bodyElement = screen.getByTestId("modal-body");
    fireEvent.click(bodyElement);
    expect(onHideMock).not.toHaveBeenCalled();
  });

  it("should close when clicking outside of the modal", () => {
    const onHideMock = jest.fn();
    render(
      <Modal header="test" onHide={onHideMock}>
        <p></p>
      </Modal>
    );

    const bgElement = screen.getByTestId("modal-background");
    fireEvent.click(bgElement);
    expect(onHideMock).toHaveBeenCalled();
  });

  it("should close when pressing the ESC button", () => {
    const onHideMock = jest.fn();
    render(
      <Modal header="test" onHide={onHideMock}>
        <p></p>
      </Modal>
    );

    fireEvent.keyDown(document, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    expect(onHideMock).toHaveBeenCalled();
  });
});
