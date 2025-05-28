import React, { Children, createContext, ReactNode, useState, useContext, useRef } from "react";

interface iProps {
  children: ReactNode;
  className?: string;
}

interface iAccordionContext {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

const AccordionContext = createContext<iAccordionContext>({
  openId: null,
  setOpenId: () => {},
});

export function Accordion({ children, className }: iProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const length = Children.count(children);
  
  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className={className}>
        {children}
      </div>
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
  const id = itemContext?.id ?? '';
  
  const handleClick = () => {
    setOpenId(openId === id ? null : id);
  };
  
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

const AccordionItemBody = ({ children, className }: iProps) => {
  const { openId } = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);
  const id = itemContext?.id ?? '';
  const isOpen = openId === id;
  
  return (
    <div className={className} style={{ maxHeight: isOpen ? "5000px" : "0px", overflow: "hidden" }}>
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
