import React, { useState } from "react";
import styled from "styled-components";


const ScrapCircleButton = () => {
    const [isScraped, setIsScraped] = useState(false);
    const onClick = () => {
        setIsScraped((prev) => !prev); // 상태 반전 (true ↔ false)
    };
    const count=400;
    
    return (
        <StyledScrapCircleButton
        onClick={onClick}
        $isScraped={isScraped}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="22" viewBox="-1 -1 19 24" fill="none">
                <path d="M14.5 0H2.41667C1.0875 0 0 1.0875 0 2.41667V21.75L8.45833 18.125L16.9167 21.75V2.41667C16.9167 1.0875 15.8292 0 14.5 0Z" fill="white" stroke={isScraped? "#fff" : "var(--gray, #A5A5A5)"} strokeWidth="1"/>
            </svg>
            {count}
        </StyledScrapCircleButton>
    );
}

export default ScrapCircleButton;

const StyledScrapCircleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.62rem;

    height: 3.25rem;
    width: 9.0625rem;

    border-radius: 2.5rem;

    border: ${({ $isScraped }) =>
    $isScraped ? "none" : "1px solid var(--gray, #A5A5A5)"};

    background: ${({ $isScraped }) =>
    $isScraped ? "var(--blue, #115BCA)" : "var(--white, #fff)"};

    color: ${({ $isScraped }) =>
    $isScraped ? "var(--white, #fff)" : "var(--black, #000)"};

    font-size: 1.125rem;
    font-weight: 500;

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }
`;