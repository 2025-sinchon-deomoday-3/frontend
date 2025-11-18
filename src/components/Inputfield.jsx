import React, { useState, forwardRef } from "react";
import styled from "styled-components";

const Inputfield = forwardRef(({
  type = "text", // input 타입 (text, password, email 등 : password 쓰면 마스킹?처리되어 보암!)
  placeholder = "입력하세요",
  value,// 현재 입력된 값
  onChange,// 값 변경하면 실행될 것!
  customStyle, // 추가 스타일을 받을 props
  placeholderStyle, // placeholder 스타일을 받을 props
  onKeyDown, // 키보드 이벤트를 받을 props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <StyledInput
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 

      onFocus={handleFocus} // input 클릭(포커스) 시 실행
      onBlur={handleBlur} // input 벗어날 때(포커스 해제) 실행
      onKeyDown={onKeyDown} // 키보드 이벤트 처리
      ref={ref} // ref 전달
      $isFocused={isFocused} // 포커스 상태 전달 styled-components에 전달

      $customStyle={customStyle} // 커스텀 스타일 전달
      $placeholderStyle={placeholderStyle} // placeholder 스타일 전달
    />
  );
});

export default Inputfield;

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;

  border-radius: 0.5rem;
  border: 1px solid var(--light-gray, #D9D9D9);

  background: var(--text-input);
  color: var(--black, #000);

  font-size: 1rem;
  font-weight: 400;

  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: var(--gray, #a5a5a5);
    ${({ $placeholderStyle }) => $placeholderStyle && $placeholderStyle}
  }

  &:hover {
    border-color: var(--gray);
  }

  &:focus{
    outline: 1px solid var(--blue, #115BCA);
  }

  /* 커스텀 스타일 적용 */
  ${({ $customStyle }) => $customStyle && $customStyle}
`;
