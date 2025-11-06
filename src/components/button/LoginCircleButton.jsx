import React, { useState } from "react";
import styled from "styled-components";


const LoginCircleButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onClick = () => {
        setIsLoggedIn((prev) => !prev); // 상태 반전 (true ↔ false)
    };
    
    return (
        <StyledLoginCircleButton
        onClick={onClick}
        $isLoggedIn={isLoggedIn}
        >
            {isLoggedIn ? "로그아웃" : "로그인"}
        </StyledLoginCircleButton>
    );
}

export default LoginCircleButton;

const StyledLoginCircleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 3.25rem;
    width: 6.5625rem;

    border-radius: 2.5rem;

    border: ${({ $isLoggedIn }) =>
    $isLoggedIn ? "1px solid var(--gray, #A5A5A5)" : "none"};

    background: ${({ $isLoggedIn }) =>
    $isLoggedIn ? "var(--white, #fff)" : "var(--blue, #115BCA)"};

    color: ${({ $isLoggedIn }) =>
    $isLoggedIn ? "var(--black, #000)" : "var(--white, #fff)"};

    font-size: 1.125rem;
    font-weight: 500;

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }
`;