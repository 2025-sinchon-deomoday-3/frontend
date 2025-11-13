import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SquareButton from "../components/button/SquareButton";
import CircleButton from "../components/button/CircleButton";
import Inputfield from "../components/Inputfield";
import SearchDropdown from "../components/SearchDropdown";
import Dropdown from "../components/Dropdown";

const onClick = () => {
    // 회원가입 로직 추가 예정
    console.log("회원가입");
}

// 회원가입 페이지용 인풋 스타일
const signupInputStyle = {
  width: "35rem",
  height: "3rem",
  padding: "0.81rem 1rem",
}

// 에러 상태일 때의 인풋필드 추가 스타일
const errorInputStyle = {
  ...signupInputStyle,
  borderColor: "var(--red)"
}

// 회원가입 페이지용 드롭다운 스타일
const signupDropStyle = {
  width: "35rem"
}

// 에러 상태일 때의 드롭다운 추가 스타일
const errorDropStyle = {
  ...signupDropStyle,
  borderColor: "var(--red)"
}

// 회원가입 페이지용 버튼 스타일
const signupButtonStyle = {
  width: "16.875rem",
  height: "3rem",
  border: "1px solid var(--light-gray, #A5A5A5)",
  background: "var(--white, #fff)",
  color: "var(--black, #000)",
  fontSize: "1rem",
  fontWeight: "400"
}

// 클릭된 상태의 버튼 스타일
const signupButtonClickedStyle = {
  width: "16.875rem", 
  height: "3rem",
  border: "none",
  background: "var(--blue, #115BCA)",
  color: "var(--white, #fff)",
  fontSize: "1rem",
  fontWeight: "400"
}

// 에러 상태일 때의 버튼 추가 스타일
const errorButtonStyle = {
  ...signupButtonStyle,
  borderColor: "var(--red)"
}

//본교 목록
const univList = [
  { label: "가천대학교", value: "가천대학교" },
  { label: "가톨릭대학교", value: "가톨릭대학교" },
  { label: "건국대학교", value: "건국대학교" },
  { label: "경희대학교", value: "경희대학교" },
  { label: "고려대학교", value: "고려대학교" },
  { label: "국민대학교", value: "국민대학교" },
  { label: "단국대학교", value: "단국대학교" },
  { label: "동국대학교", value: "동국대학교" },
  { label: "동덕여자대학교", value: "동덕여자대학교" },
  { label: "명지대학교", value: "명지대학교" },
  { label: "삼육대학교", value: "삼육대학교" },
  { label: "서강대학교", value: "서강대학교" },
  { label: "서울대학교", value: "서울대학교" },
  { label: "서울시립대학교", value: "서울시립대학교" },
  { label: "성균관대학교", value: "성균관대학교" },
  { label: "숙명여자대학교", value: "숙명여자대학교" },
  { label: "숭실대학교", value: "숭실대학교" },
  { label: "연세대학교", value: "연세대학교" },
  { label: "이화여자대학교", value: "이화여자대학교" },
  { label: "중앙대학교", value: "중앙대학교" },
  { label: "한국외국어대학교", value: "한국외국어대학교" },
  { label: "한성대학교", value: "한성대학교" },
  { label: "한양대학교", value: "한양대학교" },
  { label: "홍익대학교", value: "홍익대학교" }
];

const typeList = [
    { label: "교환학생", value: "교환학생" },
    { label: "방문학생", value: "방문학생" },
    { label: "기타", value: "교환" },
]

const SignupPage = () => {
  const [id, setId] = useState(""); // 아이디 값
  const [idError, setIdError] = useState(""); // 아이디 에러 메시지

  const [password, setPassword] = useState(""); // 비밀번호 값
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 에러 메시지

  const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인 값
  const [passwordCheckError, setPasswordCheckError] = useState(""); // 비밀번호 확인 에러 메시지

  const [nickname, setNickname] = useState(""); // 닉네임 값
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 에러 메시지

  const [gender, setGender] = useState(""); // 선택된 성별
  const [genderError, setGenderError] = useState(""); // 성별 에러 메시지

  const [univ, setSelectedUniv] = useState(null); // 선택된 본교
  const [univError, setUnivError] = useState(""); // 본교 선택 에러 메시지

  const [country, setCountry] = useState(""); // 선택된 파견국가
  const [countryError, setCountryError] = useState(""); // 파견국가 에러 메시지

  const [exUniv, setexUniv] = useState(""); // 선택된 파견학교
  const [exUnivError, setExUnivError] = useState(""); // 파견학교 에러 메시지

  const [type, setType] = useState(""); // 선택된 파견유형
  const [typeError, setTypeError] = useState(""); // 파견유형 에러 메시지

  const [time, setTime] = useState(""); // 선택된 파견시기
  const [timeError, setTimeError] = useState(""); // 파견시기 에러 메시지

  const [period, setPeriod] = useState(""); // 선택된 파견기간
  const [periodError, setPeriodError] = useState(""); // 파견기간 에러 메시지

  // 각 인풋필드에 대한 ref 생성 (13개 필드)
  const inputRefs = Array.from({length: 13}, () => useRef(null));
  
  // 통합 키보드 핸들러
  const handleKeyDown = (e, currentIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputRefs.length) {
        inputRefs[nextIndex].current?.focus();
      }
    }
  };

  // 회원가입 버튼 클릭 핸들러
  const handleSignup = () => {
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

    // 비밀번호 일치 여부 검증
    if (passwordCheck!=password || password.length < 8) {
      setPasswordCheckError("* 비밀번호가 일치하지 않습니다");
      hasError = true;
    }

    // 비밀번호 일치 여부 검증
    if (nickname.length<1 || nickname.length>10) {
      setNicknameError("* 닉네임을 10자 이내로 입력하세요");
      hasError = true;
    }

    // 성별 선택여부 검증
    if (!gender) {
      setGenderError("* 성별을 선택하세요");
      hasError = true;
    }

    // 본교 선택여부 검증
    if (!univ) {
      setUnivError("* 본교를 선택하세요");
      hasError = true;
    }

    // 파견국가 선택여부 검증
    if (!country) {
      setCountryError("* 파견 국가를 선택하세요");
      hasError = true;
    }

    // 파견학교 선택여부 검증
    if (!exUniv) {
      setExUnivError("* 파견 학교를 선택하세요");
      hasError = true;
    }

    // 파견유형 선택여부 검증
    if (!type) {
      setTypeError("* 파견 유형을 선택하세요");
      hasError = true;
    }

    // 파견시기 입력여부 검증
    if (time.length < 1) {
      setTimeError("* 파견 시기를 입력하세요");
      hasError = true;
    }

    // 파견기간 입력여부 검증
    if (period.length < 1) {
      setPeriodError("* 파견 기간를 입력하세요");
      hasError = true;
    }
    
    // 에러가 있으면 로그인 실행하지 않음
    if (hasError) {
      return;
    }
    
    // 검증 통과 시 기존 회원가입 로직 실행
    onClick();
  }

  // 공통 입력 변경 핸들러
  const createInputHandler = (setValue, setError) => (e) => {
    setValue(e.target.value);
    setError("");
  };

  // 공통 선택 핸들러
  const createSelectHandler = (setValue, setError) => (option) => {
    setValue(option);
    setError("");
  };

  // 핸들러들
  const handleIdChange = createInputHandler(setId, setIdError);
  const handlePasswordChange = createInputHandler(setPassword, setPasswordError);
  const handlePasswordCheckChange = createInputHandler(setPasswordCheck, setPasswordCheckError);
  const handleNicknameChange = createInputHandler(setNickname, setNicknameError);
  const handleTimeChange = createInputHandler(setTime, setTimeError);
  const handlePeriodChange = createInputHandler(setPeriod, setPeriodError);
  
  const handleGenderSelect = createSelectHandler(setGender, setGenderError);
  const handleUnivSelect = createSelectHandler(setSelectedUniv, setUnivError);
  const handleCountrySelect = createSelectHandler(setCountry, setCountryError);
  const handleExUnivSelect = createSelectHandler(setexUniv, setExUnivError);
  const handleTypeSelect = createSelectHandler(setType, setTypeError);

  return(
    <Wrapper>
      <img src="/icons/Logo.svg" alt="로고" style={{width: "13.93656rem"}}/>
      <h1>개인정보 입력</h1>
      <Container>
        <Input>
          <a>아이디</a>
          <Inputfield
            ref={inputRefs[0]}
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
            customStyle={idError ? errorInputStyle : signupInputStyle}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
          <ErrorMessage>
            {idError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>비밀번호</a>
          <Inputfield
            ref={inputRefs[1]}
            type="password"
            placeholder="비밀번호 (최소 8자)"
            value={password}
            onChange={handlePasswordChange}
            customStyle={passwordError ? errorInputStyle : signupInputStyle}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
          <ErrorMessage>
            {passwordError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>비밀번호 확인</a>
          <Inputfield
            ref={inputRefs[2]}
            type="password"
            placeholder="비밀번호 확인 (최소 8자)"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            customStyle={passwordCheckError ? errorInputStyle : signupInputStyle}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          />
          <ErrorMessage>
            {passwordCheckError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>닉네임</a>
          <Inputfield
            ref={inputRefs[3]}
            placeholder="닉네임 (최대 10자)"
            value={nickname}
            onChange={handleNicknameChange}
            customStyle={nicknameError ? errorInputStyle : signupInputStyle}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
          <ErrorMessage>
            {nicknameError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>성별</a>
          <ButtonContainer>
            <CircleButton 
              ref={inputRefs[4]}
              onClick={() => handleGenderSelect("남성")}
              style={gender === "남성" ? signupButtonClickedStyle : (genderError ? errorButtonStyle : signupButtonStyle)}
              onKeyDown={(e) => handleKeyDown(e, 4)}
            >
              남성
            </CircleButton>
            <CircleButton 
              ref={inputRefs[5]}
              onClick={() => handleGenderSelect("여성")}
              style={gender === "여성" ? signupButtonClickedStyle : (genderError ? errorButtonStyle : signupButtonStyle)}
              onKeyDown={(e) => handleKeyDown(e, 5)}
            >
              여성
            </CircleButton>
          </ButtonContainer>
          <ErrorMessage>
            {genderError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>본교</a>
          <SearchDropdown
            ref={inputRefs[6]}
            options={univList}
            placeholder="본교 선택"
            searchPlaceholder="학교를 검색하세요"
            onSelect={handleUnivSelect}
            customStyle={univError ? errorDropStyle : null}
            onKeyDown={(e) => handleKeyDown(e, 6)}
          />
          <ErrorMessage>
            {univError || " "}
          </ErrorMessage>
        </Input>
      </Container>
      <h1>파견정보 입력</h1>
      <Container>
        <Input>
          <a>파견 국가</a>
          <SearchDropdown
            ref={inputRefs[7]}
            options={univList}
            placeholder="파견 국가 선택"
            searchPlaceholder="파견 국가를 검색하세요"
            onSelect={handleCountrySelect}
            customStyle={countryError ? errorDropStyle : null}
            onKeyDown={(e) => handleKeyDown(e, 7)}
          />
          <ErrorMessage>
            {countryError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>파견 학교</a>
          <SearchDropdown
            ref={inputRefs[8]}
            options={univList}
            placeholder="파견 학교 선택"
            searchPlaceholder="파견 학교를 검색하세요"
            onSelect={handleExUnivSelect}
            customStyle={exUnivError ? errorDropStyle : null}
            onKeyDown={(e) => handleKeyDown(e, 8)}
          />
          <ErrorMessage>
            {exUnivError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>파견 유형</a>
          <Dropdown
            ref={inputRefs[9]}
            options={typeList}
            placeholder="파견 유형 선택"
            onSelect={handleTypeSelect}
            customStyle={typeError ? errorDropStyle : signupDropStyle}
            onKeyDown={(e) => handleKeyDown(e, 9)}
          />
          <ErrorMessage>
            {typeError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>파견 시기</a>
          <Inputfield
            ref={inputRefs[10]}
            placeholder="예: 2024년 2학기"
            value={time}
            onChange={handleTimeChange}
            customStyle={timeError ? errorInputStyle : signupInputStyle}
            onKeyDown={(e) => handleKeyDown(e, 10)}
          />
          <ErrorMessage>
            {timeError || " "}
          </ErrorMessage>
        </Input>
        <Input>
          <a>파견 기간</a>
          <Inputfield
            ref={inputRefs[11]}
            placeholder="예: 3개월"
            value={period}
            onChange={handlePeriodChange}
            customStyle={periodError ? errorInputStyle : signupInputStyle}
            onKeyDown={(e) => handleKeyDown(e, 11)}
          />
          <ErrorMessage>
            {periodError || " "}
          </ErrorMessage>
        </Input>
      </Container>
      <SquareButton
        ref={inputRefs[12]}
        onClick={handleSignup}
        style={{marginTop: "0.75rem"}}
      >
        회원가입
      </SquareButton>
    </Wrapper>
  );
};

export default SignupPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5rem;

  img{
    margin-top: 4.12rem;
    margin-bottom: 3.85rem;
  }

  h1{
    width: 37rem;
    margin-bottom: 3.85rem;
    text-align: left;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--deep-blue);

    margin-bottom: 1.25rem;
  }
`

const Container = styled.div`
  width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.88rem;
  
  margin-bottom: 3.44rem;
`

const Input = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  a{
    width: 100%;
    text-align: left;
    color: var(--black);
    font-size: 1.25rem;
    font-weight: 400;

    margin-bottom: 0.38rem;
  }
`

const ErrorMessage = styled.div`
  color: var(--red);
  font-size: 0.9rem;
  min-height: 1.5rem;
  display: flex;
  align-items: left;
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 0.25rem;
  padding-left: 0.5rem;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`