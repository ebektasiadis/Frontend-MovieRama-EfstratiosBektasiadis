import { ReactElement } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import {
  ModalBackground,
  StyledModal,
  Header,
  HeaderTitle,
  CloseImg,
  Body,
} from "@styles/Modal.styled";

interface IModalProps {
  header: string;
  children: ReactElement;
  onHide: Function;
}

function Modal({ header, children, onHide }: IModalProps) {
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
      <ModalBackground onClick={() => onHide()}>
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <Header>
            <HeaderTitle aria-label={header}>{header}</HeaderTitle>
            <CloseImg onClick={() => onHide()} aria-label={"Close modal"} />
          </Header>
          <Body>{children}</Body>
        </StyledModal>
      </ModalBackground>
    </GlobalHotKeys>
  );
}

export default Modal;
