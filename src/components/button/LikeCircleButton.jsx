import React, { useState } from "react";
import styled from "styled-components";


const LikeCircleButton = () => {
    const [isLiked, setIsLiked] = useState(false);
    const onClick = () => {
        setIsLiked((prev) => !prev); // 상태 반전 (true ↔ false)
    };
    const count=400;
    
    return (
        <StyledLikeCircleButton
        onClick={onClick}
        $isLiked={isLiked}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="-1 -1 27 24" fill="none">
                <path d="M6.875 1.12456e-06C3.07812 1.12456e-06 0 3.1565 0 7.05005C0 14.1001 8.125 20.5092 12.5 22C16.875 20.5092 25 14.1001 25 7.05005C25 3.1565 21.9219 1.12456e-06 18.125 1.12456e-06C15.8 1.12456e-06 13.7437 1.18377 12.5 2.99563C11.8659 2.06976 11.0237 1.31414 10.0446 0.7927C9.06548 0.271264 7.97828 -0.000638125 6.875 1.12456e-06Z" fill="var(--white, #fff)" stroke={isLiked? "var(--white, #fff)" : "var(--gray, #A5A5A5)"} strokeWidth="1"/>
            </svg>
            {count}
        </StyledLikeCircleButton>
    );
}

export default LikeCircleButton;

const StyledLikeCircleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.62rem;

    height: 3.25rem;
    width: 9.0625rem;

    border-radius: 2.5rem;

    border: ${({ $isLiked }) =>
    $isLiked ? "none" : "1px solid var(--gray, #A5A5A5)"};

    background: ${({ $isLiked }) =>
    $isLiked ? "var(--red, #CA1111)" : "var(--white, #fff)"};

    color: ${({ $isLiked }) =>
    $isLiked ? "var(--white, #fff)" : "var(--black, #000)"};

    font-size: 1.125rem;
    font-weight: 500;

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }
`;