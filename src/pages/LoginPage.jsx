import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SquareButton from "../components/button/SquareButton";
import Inputfield from "../components/Inputfield";
import { AuthAPI } from "@/apis";

// 로그인 페이지용 인풋 스타일
const loginInputStyle = {
  width: "30.88rem",
  height: "4.13506rem",
  fontSize: "1.3125rem",
  padding: "1.27rem 1.76rem",
}

// 에러 상태일 때의 추가 스타일
const errorInputStyle = {
  ...loginInputStyle,
  borderColor: "var(--red)"
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

  const [password, setPassword] = useState(""); // 비밀번호 값
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 에러 메시지
  
  const [id, setId] = useState(""); // 아이디 값
  const [idError, setIdError] = useState(""); // 아이디 에러 메시지
  
  // 각 인풋필드에 대한 ref 생성
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // 🔥 로그인 API 실행
  const runLogin = async () => {
    try {
      const loginData = {
        username: id,
        password: password,
        remember: isChecked,
      };
      const res = await AuthAPI.login(loginData);

      // 토큰 저장
      localStorage.setItem("token", res.data.access_token);

      navigate("/");

    } catch (err) {
      
      const errorData = err?.error || {};

      // 전체 에러 초기화
      setIdError("");
      setPasswordError("");

      // 1) username 에러
      if (errorData.username) {
        setIdError(errorData.username[0]);
        return;
      }

      // 2) password 에러
      if (errorData.password) {
        setPasswordError(errorData.password[0]);
        return;
      }

      // 3) non_field_errors 처리
      if (errorData.non_field_errors) {
        const msg = errorData.non_field_errors[0];

        // (1) 가입되지 않은 사용자 → 아이디 밑에 표시
        if (msg.includes("가입되지 않은")) {
          setIdError(msg);
          return;
        }

        // (2) 잘못된 비밀번호 → 비밀번호 밑에 표시
        if (msg.includes("비밀번호")) {
          setPasswordError(msg);
          return;
        }

        // (3) 예외적인 메시지 → 팝업으로 표시
        alert(msg);
        return;
      }

      // 4) 서버 에러 (500)
      if (err.response && err.response.status === 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      // 5) 진짜 예상 못한 구조 → 전체 팝업
      console.log("에러 메시지:", err?.message);
      console.log("에러 구조:", JSON.stringify(err, null, 2));
      alert(err?.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    let hasError = false;

    // 아이디 입력여부 검증
    if (id.length < 1) {
      setIdError("* 아이디를 입력하세요");
      hasError = true;
    }
    
    // 비밀번호 8자 이상 검증
    if (password.length < 8) {
      setPasswordError("* 비밀번호를 8자 이상 입력하세요");
      hasError = true;
    }
    
    // 에러가 있으면 로그인 실행하지 않음
    if (hasError) {
      return;
    }
    
    // 검증 통과 시 기존 로그인 로직 실행
    runLogin();
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // 아이디 입력 변경 핸들러
  const handleIdChange = (e) => {
    setId(e.target.value);
    // 입력 중에는 에러 메시지 제거
    if (idError) {
      setIdError("");
    }
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // 입력 중에는 에러 메시지 제거
    if (passwordError) {
      setPasswordError("");
    }
  };

  // 비밀번호 표시/숨김 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 엔터키 처리 함수
  const handleUsernameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current?.focus(); // 비밀번호 필드로 포커스 이동
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // 엔터키 누르면 로그인 실행 (필요시)
      handleLogin();
    }
  };

  return(
    <Wrapper>
        <img src="/icons/Logo.svg" alt="로고"/>
        <UsernameWrapper>
          <Inputfield
            ref={usernameRef}
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
            customStyle={idError ? errorInputStyle : loginInputStyle}
            onKeyDown={handleUsernameKeyDown}
          />
          <ErrorMessage>
            {idError || " "}
          </ErrorMessage>
        </UsernameWrapper>
        <PasswordWrapper>
          <Inputfield
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            customStyle={passwordError ? errorInputStyle : loginInputStyle}
            onKeyDown={handlePasswordKeyDown}
          />
          <EyeIcon onClick={togglePasswordVisibility}>
            {showPassword ? (
              // 눈 열린 아이콘 (비밀번호 보임)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7.305 4.5 3.45 7.59 2.25 12C3.45 16.41 7.305 19.5 12 19.5C16.695 19.5 20.55 16.41 21.75 12C20.55 7.59 16.695 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#A5A5A5"/>
              </svg>
            ) : (
              // 눈 감긴 아이콘 (비밀번호 숨김)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.27 7.61 17 4.5 12 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10 1.01 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.81 19.09L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8Z" fill="#A5A5A5"/>
              </svg>
            )}
          </EyeIcon>
          <ErrorMessage>
            {passwordError || " "}
          </ErrorMessage>
        </PasswordWrapper>
        <SquareButton
          onClick={handleLogin}
        >
          <span className="h2">로그인</span>
        </SquareButton>

        <Container>
          <CheckboxContainer>
            <StyledCheckbox
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span>로그인 유지</span>
          </CheckboxContainer>
          <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>회원가입</span>
        </Container>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  width: 30.88rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.71rem;

  img{
    width: 19.50819rem;
    height: 5.94913rem;
    margin-bottom: 3.58rem;
  }
`

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`

const UsernameWrapper = styled.div`
  position: relative;
  width: 100%;
`

const EyeIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  
  svg{
    margin: 0;
  }

  &:hover {
    opacity: 0.7;
  }
`

const Container = styled.div`
  width: 100%;

  

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--black);
  font-size: 1.1rem;
  font-weight: 400;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const StyledCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: white;
  position: relative;

  &:checked {
    background-color: var(--blue);
    border-color: var(--blue);
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.9rem;
    height: 0.7rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='38' viewBox='0 0 52 38' fill='none'%3E%3Cpath d='M17.6282 29.25L45.8782 1C46.5449 0.333334 47.3227 0 48.2115 0C49.1004 0 49.8782 0.333334 50.5449 1C51.2115 1.66667 51.5449 2.45889 51.5449 3.37667C51.5449 4.29445 51.2115 5.08556 50.5449 5.75L19.9615 36.4167C19.2949 37.0833 18.5171 37.4167 17.6282 37.4167C16.7393 37.4167 15.9615 37.0833 15.2949 36.4167L0.961539 22.0833C0.294872 21.4167 -0.0251282 20.6256 0.00153846 19.71C0.0282051 18.7944 0.375982 18.0022 1.04487 17.3333C1.71376 16.6644 2.50598 16.3311 3.42154 16.3333C4.33709 16.3356 5.1282 16.6689 5.79487 17.3333L17.6282 29.25Z' fill='white'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`

const ErrorMessage = styled.div`
  color: var(--red);
  font-size: 0.9rem;
  min-height: 1rem;
  display: flex;
  align-items: left;
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 0.15rem;
  padding-left: 0.5rem;
`
