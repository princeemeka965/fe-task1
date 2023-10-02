import React, {
  Children,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type MenuProps = {
  children: ReactNode;
};

const Title: FC<MenuProps> = ({ children }) => {
  return <>{children}</>;
};

const Section: FC<MenuProps> = ({ children }) => {
  return <>{children}</>;
};

const Menu: FC<MenuProps> & {
  Title: FC<MenuProps>;
  Section: FC<MenuProps>;
} = ({ children }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<ReactElement | null>(null);
  const [section, setSection] = useState<ReactElement | null>(null);
  const [isOpen, setOpen] = useState<Boolean>(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node) &&
      divRef.current &&
      !divRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect((): void => {
    document.addEventListener("mousedown", handleClickOutside);
    // Loop through children to find Title components
    Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === Menu.Title) {
          setTitle(child);
        }
        if (child.type === Menu.Section) {
          setSection(child);
        }
      }
    });
  }, [children]);

  const openDropDown = (): void => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div
          className="cursor-pointer"
          ref={buttonRef}
          onClick={() => openDropDown()}
        >
          {title ? title.props.children : null}
        </div>
        {isOpen && (
          <div className="dropdownMenu" ref={divRef} style={{ top: "22px" }}>
            {section ? section.props.children : null}
          </div>
        )}
      </div>
    </>
  );
};

Menu.Title = Title;
Menu.Section = Section;

export default Menu;
