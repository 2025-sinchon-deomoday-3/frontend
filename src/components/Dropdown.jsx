import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Dropdown = ({ 
  options = [], 
  placeholder = "선택하세요", 
  onSelect,
  customStyle, // 추가 스타일을 받을 props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownWrapper ref={ref}>
      <DropdownButton 
        onClick={toggleDropdown}
        $customStyle={customStyle} // 커스텀 스타일 전달
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ArrowIcon $isOpen={isOpen}>
          <path
            d="M0.900391 0.899902L5.70039 5.6999L10.5004 0.899902"
            stroke="#6B7280"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ArrowIcon>
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;


const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: var(--white, #FFF);
  border: 1px solid var(--light-gray, #D9D9D9);
  border-radius: 0.5rem;
  cursor: pointer;
  min-width: 9.5625rem;
  height: 3rem;

  padding: 0 1rem;

  text-align: left;
  color: var(--black, #000);
  font-size: 1rem;
  font-weight: 400;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
      cursor: pointer;
      filter: brightness(0.9);
  }

  &:focus {
      outline: 1px solid var(--blue, #115BCA);
  }

  /* 커스텀 스타일 적용 */
  ${({ $customStyle }) => $customStyle && $customStyle}
`;

const ArrowIcon = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "7",
  viewBox: "0 0 12 7",
  fill: "none",
})`
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownList = styled.ul`
  list-style: none;

  position: absolute;
  background: var(--white, #FFF);
  border: 1px solid var(--light-gray, #D9D9D9);
  border-radius: 0.5rem;
  width: 100%;
  z-index: 10;
  overflow: hidden;
  color: var(--black, #000);
  text-align: left;
  font-size: 0.875rem;
  font-weight: 400;
`;

const DropdownItem = styled.li`
  height: 3rem;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid var(--light-gray, #D9D9D9);
  }
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }
`;
