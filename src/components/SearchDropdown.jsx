import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const SearchDropdown = ({
  options = [],
  placeholder = "선택하세요",
  searchPlaceholder = "검색...",
  onSelect,
  customStyle, // 추가 스타일을 받을 props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setSearchTerm("");
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  // 검색어 없으면 전체 리스트 표시
  const filteredOptions =
    searchTerm.trim() === ""
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

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
          <SearchBox>
            <SearchInput
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M7.50502 1.68204e-06C8.91701 0.000443901 10.3002 0.399463 11.4954 1.15116C12.6907 1.90285 13.6495 2.97669 14.2615 4.24914C14.8735 5.52158 15.1139 6.94095 14.955 8.34397C14.7962 9.74698 14.2444 11.0766 13.3634 12.18L18.095 16.9117L18.2017 17.0417C18.3079 17.2019 18.3554 17.394 18.3362 17.5853C18.317 17.7766 18.2323 17.9554 18.0963 18.0913C17.9604 18.2273 17.7816 18.312 17.5903 18.3312C17.399 18.3504 17.2069 18.3029 17.0467 18.1967L16.915 18.09L12.185 13.3567C11.2491 14.1053 10.1475 14.6188 8.97228 14.8541C7.79711 15.0893 6.58266 15.0396 5.43069 14.7089C4.27872 14.3782 3.22277 13.7763 2.3513 12.9535C1.47983 12.1308 0.81823 11.1111 0.421918 9.98007C0.0256054 8.849 -0.0938744 7.63942 0.073488 6.45267C0.24085 5.26592 0.690181 4.13656 1.38384 3.1592C2.07749 2.18184 2.99527 1.38495 4.06029 0.835291C5.1253 0.285627 6.30653 -0.000800909 7.50502 1.68204e-06ZM7.50502 1.66667C6.73898 1.66667 5.98044 1.81755 5.2727 2.1107C4.56497 2.40386 3.92191 2.83354 3.38023 3.37521C2.83856 3.91689 2.40888 4.55995 2.11573 5.26768C1.82257 5.97541 1.67169 6.73396 1.67169 7.5C1.67169 8.26605 1.82257 9.02459 2.11573 9.73232C2.40888 10.4401 2.83856 11.0831 3.38023 11.6248C3.92191 12.1665 4.56497 12.5961 5.2727 12.8893C5.98044 13.1825 6.73898 13.3333 7.50502 13.3333C9.05212 13.3333 10.5359 12.7188 11.6298 11.6248C12.7238 10.5308 13.3384 9.0471 13.3384 7.5C13.3384 5.95291 12.7238 4.46917 11.6298 3.37521C10.5359 2.28125 9.05212 1.66667 7.50502 1.66667Z"
                fill="var(--gray)"
              />
            </SearchIcon>
          </SearchBox>

          <DropdownItemsContainer>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </DropdownItem>
              ))
            ) : (
              <DropdownEmpty>검색 결과 없음</DropdownEmpty>
            )}
          </DropdownItemsContainer>
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default SearchDropdown;


const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: var(--white, #FFF);
  border: 1px solid var(--light-gray, #D9D9D9);
  border-radius: 0.5rem;
  cursor: pointer;
  min-width: 35rem;
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

const DropdownList = styled.div`
  position: absolute;
  top: 100%;

  background: var(--white, #FFF);
  border: 0.0625rem solid var(--light-gray, #D9D9D9); /* 1px = 0.0625rem */
  border-radius: 0.5rem;
  width: 100%;
  max-height: 18.75rem; /* 최대 높이 설정 300px = 18.75rem */
  z-index: 10;
  overflow: hidden; /* 전체 컨테이너는 overflow hidden */
  color: var(--black, #000);
  text-align: left;
  font-size: 0.875rem;
  font-weight: 400;
`;

const DropdownItemsContainer = styled.div`
  max-height: 15rem; /* 검색창 높이(3.75rem) 제외한 높이 240px = 15rem */
  overflow-y: auto; /* 아이템 컨테이너만 스크롤 */

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  border-radius: 3rem;
  background-color: #f2f2f2;
  border: none;
  outline: none;

  width: 100%;
  height: 2.375rem;

  margin: 0.5rem;
  padding: 0 2.3rem 0 1rem;

  font-size: 1rem;
  font-weight: 400;
  color: var(--black);


  &::placeholder {
    color: var(--gray);

  }
`;

const SearchIcon = styled.svg`
  flex-shrink: 0;
  position: absolute;
  right: 1.5rem;       /* input 내부 오른쪽 여백 */
  top: 50%;
  transform: translateY(-50%);
`;

const DropdownItem = styled.li`
  height: 3rem;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;

  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }
`;

const DropdownEmpty = styled.div`
  height: 3rem;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  color: #999;
  text-align: left;
`;
