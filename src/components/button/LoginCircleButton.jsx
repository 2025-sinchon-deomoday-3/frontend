import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/apis";


const LoginCircleButton = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // localStorage에 토큰이 있으면 로그인 상태로 초기화
        return !!localStorage.getItem("token");
    });

    // 컴포넌트 마운트 시 로그인 상태 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);
    
    const onClick = async () => {
        if (!isLoggedIn) {
            // 로그인 상태가 아니면 로그인 페이지로 이동
            navigate('/login');
        } else {
            // 로그아웃 API 호출
            try {
                await AuthAPI.logout();
                // 로컬 스토리지에서 토큰 제거
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
                // 로그아웃 상태로 변경
                setIsLoggedIn(false);
                window.dispatchEvent(new Event("storage"));
            } catch (error) {
                console.error("로그아웃 실패:", error);
                // 에러가 발생해도 로컬 상태는 정리
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
                setIsLoggedIn(false);
                window.dispatchEvent(new Event("storage"));
            }
        }
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

    white-space: nowrap;

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