import React from "react";
import styled from "styled-components";


const Button = ({ 
  children,       // 버튼 안의 내용
  onClick,        // 클릭 시 실행할 함수
  disabled = false, // 비활성화 여부
  customStyle,      // 인라인 스타일 오버라이드
}) => {
    
    return (
        <StyledButton
        onClick={onClick}
        disabled={disabled}
        $customStyle={customStyle} // 커스텀 스타일 전달
        >
          <h2>{children}</h2>
        </StyledButton>
    );
}

export default Button;

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 3.86rem;
    width: 30.88rem;

    white-space: nowrap;

    border-radius: 0.827rem;
    background: var(--blue, #115BCA);

    color: var(--white, #fff);
    font-size: 1.75rem;
    font-weight: 700;

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }

    &:focus {
        outline: 1px solid var(--blue, #115BCA);
        outline-offset: 2px;
    }

    &:disabled {
        background: var(--gray, #A5A5A5);
        cursor: not-allowed;
    }

    /* 커스텀 스타일 적용 */
    ${({ $customStyle }) => $customStyle && $customStyle}
`;