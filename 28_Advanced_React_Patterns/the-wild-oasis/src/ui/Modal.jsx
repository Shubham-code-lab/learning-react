import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState(null);

  const close = useCallback(() => setOpenName(null), []);
  const open = useCallback((openWindowName) => setOpenName(openWindowName), []);


  return <ModalContext.Provider value={{openName, open, close}}>{children}</ModalContext.Provider>
}

function Open({ children, opens: openWindowName }) {
  const {open} = useContext(ModalContext);
  //Pitfall :-
  //cloneElement is used to clone another react element using another element and we can pass props to it.
  return cloneElement(children, {onClick: () => open(openWindowName)});
}

function useOutsideClick(callback, listenCapturing = true) {
  const ref = useRef(null);
  useEffect(function() {
    function handleClick(e) {
      //if the click is outside of the modal, close the modal 
      if(ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }
    //IMPORTANT :-
    //modal will be open and closed immediately, so we need to use capture phase to ensure the event is captured before the modal is closed.
    document.addEventListener("click", handleClick, listenCapturing);
    return function() {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback, listenCapturing]);
  return ref;
}

function Window({ children, name }) {
  const {openName, close: onClose} = useContext(ModalContext);
  const ref = useOutsideClick(onClose);

  if(name !== openName) return null;
  
//IMPORTANT :-
//React Portal :-
//allow us to render element outside of the parent component in the HTML DOM structure while keeping the element in current position of component tree.
//useful to access props.
//it receive two arguments : 1. the element to render, 2. the DOM node to render the element to.

//useful to overcome css property set to hidden.
//if parent component of this component is hidden, the element will not be rendered in the HTML DOM structure.
  return createPortal(
    <Overlay>
      <StyledModal ref={ref} >
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        {/* cloneElement */}
        <div>{cloneElement(children, {onCloseModal: onClose})}</div>
      </StyledModal>
    </Overlay>
  , 
  document.body //parent element to render the element to.
  //OR document.querySelector("element")
);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
