import React, { createContext, ReactNode, useState, useContext, useRef } from "react";

interface iProps {
  children: ReactNode;
  className?: string;
  height?: number;
}

interface iAccordionContext {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

const AccordionContext = createContext<iAccordionContext>({
  openId: null,
  setOpenId: () => {},
});

/**
 * Accordion
 * @example
 * ```tsx
 * <Accordion>
        <Accordion.Item>
          <Accordion.Item.Header>
            <h1>Accordion Item Header 1</h1>
          </Accordion.Item.Header>
          <Accordion.Item.Body height={384}>
            <p>Body content 1</p>
          </Accordion.Item.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Item.Header>
            <h1>Accordion Item Header 2</h1>
          </Accordion.Item.Header>
          <Accordion.Item.Body height={384}>
            <p>Body content 2</p>
          </Accordion.Item.Body>
        </Accordion.Item>
      </Accordion>
 * ```
 */

export function Accordion({ children, className }: iProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = createContext<{ id: string } | null>(null);

const AccordionItem = ({ children, className }: iProps) => {
  const id = useRef(Math.random().toString(36).substr(2, 9)).current;

  return (
    <AccordionItemContext.Provider value={{ id }}>
      <div className={className}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

const AccordionItemHeader = ({ children, className }: iProps) => {
  const { openId, setOpenId } = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);
  const id = itemContext?.id ?? "";

  const handleClick = () => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

const AccordionItemBody = ({ children, className, height = 500 }: iProps) => {
  const { openId } = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);
  const id = itemContext?.id ?? "";
  const isOpen = openId === id;

  return (
    <div className={className} style={{ maxHeight: isOpen ? height : "0px", overflow: "hidden" }}>
      {children}
    </div>
  );
};

// Attach sub-components
Accordion.Item = AccordionItem as typeof AccordionItem & {
  Header: typeof AccordionItemHeader;
  Body: typeof AccordionItemBody;
};

Accordion.Item.Header = AccordionItemHeader;
Accordion.Item.Body = AccordionItemBody;
