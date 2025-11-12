import React, { useState } from "react";
import styled from "styled-components";

const Inputfield = ({
  type = "text", // input 타입 (text, password, email 등 : password 쓰면 마스킹?처리되어 보암!)
  placeholder = "입력하세요", 
  value, 
  onChange, 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <InputWrapper>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        $isFocused={isFocused}
      />
    </InputWrapper>
  );
};

export default Inputfield;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;

  border-radius: 0.375rem;
  border: 1px solid
    ${({ $isFocused }) =>
      $isFocused ? "var(--blue, #115BCA)" : "var(--light-gray, #D9D9D9)"};

  background: var(--white, #fff);
  color: var(--black, #000);

  font-size: 1rem;
  font-weight: 400;

  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: var(--gray, #a5a5a5);
  }

  &:hover {
    border-color: var(--blue, #115bca);
  }
`;
