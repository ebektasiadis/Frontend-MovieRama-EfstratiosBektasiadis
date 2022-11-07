import styled from "styled-components";

export const ModalBackground = styled.div`
  z-index: 2;
  background: rgb(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const StyledModal = styled.div`
  background: var(--primary-color);
  border-radius: 5px;
  filter: drop-shadow(0px 0px 8px #000000);
  position: relative;
  animation: opacity 1s;

  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-areas: "title . cross";
  padding: 20px;
  border-bottom: 1px solid var(--secondary-color);
`;

export const Body = styled.div`
  padding: 20px;
`;

export const CloseImg = styled.div`
  filter: invert(1);
  grid-area: cross;
  justify-self: right;
  width: 16px;
  height: 16px;
  background: url("/close.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    cursor: pointer;
  }
`;

export const HeaderTitle = styled.p`
  color: white;
  font-weight: lighter;
`;
