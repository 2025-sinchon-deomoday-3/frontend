import React, { useState } from "react";
import styled from "styled-components";


const CircleButton = ({
  children,       // 버튼 안의 내용
  onClick,        // 클릭 시 실행할 함수
  disabled = false, // 비활성화 여부
  style = {}       // 인라인 스타일 오버라이드
}) => {
    const [isClickedIn, setIsClickedIn] = useState(false);
    const handleClick = (e) => {
        setIsClickedIn((prev) => !prev);   // 내부 토글
        onClick?.(e);                   // 외부 onClick 실행
    };
    
    return (
        <StyledCircleButton
        onClick={handleClick}
        $isClickedIn={isClickedIn}
        disabled={disabled}
        style={style}
        >
            {children}
        </StyledCircleButton>
    );
}

export default CircleButton;

const StyledCircleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 3.25rem;
    width: 6.5625rem;

    border-radius: 2.5rem;

    border: ${({ $isClickedIn }) =>
    $isClickedIn ? "1px solid var(--gray, #A5A5A5)" : "none"};

    background: ${({ $isClickedIn }) =>
    $isClickedIn ? "var(--white, #fff)" : "var(--blue, #115BCA)"};

    color: ${({ $isClickedIn }) =>
    $isClickedIn ? "var(--black, #000)" : "var(--white, #fff)"};

    font-size: 1.125rem;
    font-weight: 500;

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }

    &:disabled {
        background: var(--gray, #A5A5A5);
        cursor: not-allowed;
        color: var(--white)
    }
`;