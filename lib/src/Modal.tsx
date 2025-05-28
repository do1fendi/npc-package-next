import React, { createContext, useContext, ReactNode } from "react";

interface iProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<iProps>({
  children: null,
  isOpen: false,
  onClose: () => {},
});

/**
 * Modal
 * @param isOpen - state for open modal
 * @param onClose - function for close modal
 * @example
 * ```tsx
 * <Modal isOpen={boolean} onClose={() => setIsOpen(false)}>
 *   <Modal.Header>
 *     <h1 className="w-full h-full bg-pink-200">Header</h1>
 *   </Modal.Header>
 *   <Modal.Body>
 *     <p className="w-full h-full bg-pink-200">Body content</p>
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <button className="w-full h-full bg-pink-200">Footer button</button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */

export function Modal({ children, className, isOpen = false, onClose }: iProps) {
  return (
    <ModalContext.Provider value={{ children, isOpen, onClose }}>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(10px)",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div
          className={className}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

interface iChildrenProps {
  children: ReactNode;
  className?: string;
}

Modal.Header = ({ children, className }: iChildrenProps) => {
  const ctx = useContext(ModalContext);

  return (
    <div
      className={className}
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "50px" }}
    >
      <div>{children}</div>
      <button style={{ cursor: "pointer" }} onClick={ctx.onClose}>
        X
      </button>
    </div>
  );
};

Modal.Body = ({ children, className }: iChildrenProps) => {
  return <div className={className}>{children}</div>;
};

Modal.Footer = ({ children, className }: iChildrenProps) => {
  return <div className={className}>{children}</div>;
};
