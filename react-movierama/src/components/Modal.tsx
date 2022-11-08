import { ReactElement } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { ModalStyles as Styles } from "@styles";

interface IModalProps {
  header: string;
  children: ReactElement;
  onHide: Function;
}

const Modal = ({ header, children, onHide }: IModalProps) => {
  const keyMap = {
    CLOSE_MODAL: "esc",
  };

  const handlers = {
    CLOSE_MODAL: (e: any) => {
      e.preventDefault();
      onHide();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Styles.ModalBackground onClick={() => onHide()}>
        <Styles.StyledModal onClick={(e) => e.stopPropagation()}>
          <Styles.Header>
            <Styles.HeaderTitle aria-label={header}>
              {header}
            </Styles.HeaderTitle>
            <Styles.CloseImg
              onClick={() => onHide()}
              aria-label={"Close modal"}
            />
          </Styles.Header>
          <Styles.Body>{children}</Styles.Body>
        </Styles.StyledModal>
      </Styles.ModalBackground>
    </GlobalHotKeys>
  );
};

export default Modal;
