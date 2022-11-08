import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { StyledComponent } from "styled-components";

interface IContainerProps {
  layout: StyledComponent<any, any>;
  onIntersect?: Function;
  isLoading?: boolean;
  children: ReactNode;
}

const Container = ({
  layout: Layout,
  onIntersect,
  children,
  isLoading,
}: IContainerProps) => {
  const observer: any = useRef();

  const lastItem = useCallback(
    (node: any) => {
      if (!onIntersect || isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      });
      if (node) observer.current.observe(node);
    },
    [onIntersect, isLoading]
  );

  const childrenWithRef = () => {
    let childrenCount = Children.count(children);
    return Children.map(children, (child, index) => {
      return childrenCount === index + 1 &&
        isValidElement<{ ref: Function }>(child)
        ? cloneElement(child, { ref: lastItem })
        : child;
    });
  };

  return <Layout>{childrenWithRef()}</Layout>;
};

export default Container;
