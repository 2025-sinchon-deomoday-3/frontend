import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Inputfield from "../components/Inputfield";
import SearchDropdown from "../components/SearchDropdown";
import Dropdown from "../components/Dropdown";

// 프로필 페이지용 인풋 스타일
const profileInputStyle = {
  width: "19.5915rem",
  height: "2.93238rem",
  fontSize: "0.925rem",
  fontWeight: "500",
}

const userInfo = ["미국", "화연이에연", "ewhaewhalikelion", "이화여자대학교"];
const exInfo = ["미국", "교환학생", "University of California, Davis", "24학년도 2학기", "5개월"];

const ProfilePage = () => {
  // build flag src safely (encode in case of non-ascii names)
  const flagSrc = `/images/flags/${encodeURIComponent(userInfo[0])}.png`;
  const [editMode, setEditMode] = useState(false);
  const [exData, setExData] = useState(exInfo);

  const toggleEdit = () => setEditMode((s) => !s);

  const handleExChange = (idx) => (e) => {
    const next = [...exData]; // 배열을 복사(불변성 유지)
    next[idx] = e.target.value; // 해당 인덱스의 값을 사용자가 입력한 값으로 교체
    setExData(next); //상태 업데이트 -> 리렌더링
  };

  const handleDropdownSelect = (idx) => (option) => {
    const next = [...exData];
    next[idx] = option.label; // 드롭다운 선택값 저장
    setExData(next);
  };

  // 드롭다운 옵션 예시 (실제로는 API나 데이터에서 가져올 수 있음)
  const countryOptions = [
    { label: "미국", value: "us" },
    { label: "일본", value: "jp" },
    { label: "중국", value: "cn" },
    { label: "영국", value: "uk" },
    { label: "프랑스", value: "fr" },
  ];

  const typeOptions = [
    { label: "교환학생", value: "교환학생" },
    { label: "방문학생", value: "방문학생" },
    { label: "기타", value: "기타" },
  ];

  const schoolOptions = [
    { label: "University of California, Davis", value: "ucd" },
    { label: "University of Tokyo", value: "ut" },
    { label: "Peking University", value: "pku" },
    { label: "University of Oxford", value: "oxford" },
    { label: "Sorbonne University", value: "sorbonne" },
  ];

  return(
    <Wrapper>
        <h2 className="title">프로필</h2>
        <Box>
          <Container>
            <Flag>
                <img
                  src={flagSrc}
                  alt={userInfo[0]}
                />
            </Flag>
            <TextContainer>
                <h3>{userInfo[1]} (@{userInfo[2]})</h3>
                <p className="body1">{userInfo[3]}</p>
            </TextContainer>
          </Container>
        </Box>
        <EditContainer className="title">
          <h2>파견 정보</h2>
          {editMode ? (
            <h3
              className="blue"
              onClick={toggleEdit}
            >
              저장
            </h3>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill='none'
              onClick={toggleEdit}
              style={{ cursor: 'pointer' }}
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M16.768 0.87099C16.2101 0.313295 15.4536 0 14.6648 0C13.8759 0 13.1194 0.313295 12.5616 0.87099L11.8605 1.57305L16.7689 6.48152L17.469 5.78045C17.7453 5.50421 17.9645 5.17624 18.114 4.81528C18.2635 4.45433 18.3405 4.06745 18.3405 3.67675C18.3405 3.28605 18.2635 2.89917 18.114 2.53822C17.9645 2.17726 17.7453 1.84929 17.469 1.57305L16.768 0.87099ZM15.3658 7.88366L10.4574 2.97519L1.44362 11.9899C1.24637 12.1872 1.10858 12.436 1.04598 12.7078L0.0256175 17.1255C-0.0124018 17.2895 -0.0080408 17.4604 0.0382895 17.6223C0.0846199 17.7841 0.171394 17.9315 0.290436 18.0506C0.409478 18.1696 0.556867 18.2564 0.718717 18.3027C0.880567 18.349 1.05155 18.3534 1.21555 18.3154L5.63416 17.296C5.90567 17.2332 6.15409 17.0955 6.3511 16.8984L15.3658 7.88366Z" fill="#115BCA" />
            </svg>
          )}
        </EditContainer>
        <Box>
          {editMode ? (
            exData.map((val, idx) => (
              <Input key={idx}>
                <h3>{['파견 국가','파견 유형','파견 학교','파견 시기','파견 기간'][idx]}</h3>
                {idx === 0 ? (
                  <SearchDropdown
                    options={countryOptions}
                    placeholder={val}
                    searchPlaceholder="파견 국가를 검색하세요"
                    onSelect={handleDropdownSelect(idx)}
                    customStyle={profileInputStyle}
                  />
                ) : idx === 1 ? (
                  <Dropdown
                    options={typeOptions}
                    placeholder={val}
                    onSelect={handleDropdownSelect(idx)}
                    customStyle={profileInputStyle}
                  />
                ) : idx === 2 ? (
                  <SearchDropdown
                    options={schoolOptions}
                    placeholder={val}
                    searchPlaceholder="파견 학교를 검색하세요"
                    onSelect={handleDropdownSelect(idx)}
                    customStyle={profileInputStyle}
                  />
                ) : (
                  <Inputfield 
                    customStyle={profileInputStyle}
                    value={val} 
                    onChange={handleExChange(idx)} 
                  />
                )}
              </Input>
            ))
          ) : (
            exData.map((val, idx) => (
              <Input key={idx}>
                <h3>{['파견 국가','파견 유형','파견 학교','파견 시기','파견 기간'][idx]}</h3>
                <p className="body1">{val}</p>
              </Input>
            ))
          )}
        </Box>
        <Button>
          <h3>내 게시글 바로가기</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M24.9127 14.6189L15.9585 23.5731C15.6539 23.8777 15.5065 24.233 15.5162 24.6391C15.526 25.0452 15.6835 25.4005 15.9889 25.7051C16.2943 26.0097 16.6496 26.162 17.0549 26.162C17.4602 26.162 17.8155 26.0097 18.1209 25.7051L27.5015 16.3549C27.7452 16.1113 27.9279 15.8372 28.0497 15.5326C28.1716 15.228 28.2325 14.9235 28.2325 14.6189C28.2325 14.3143 28.1716 14.0098 28.0497 13.7052C27.9279 13.4006 27.7452 13.1265 27.5015 12.8829L18.1209 3.50225C17.8163 3.19769 17.4557 3.05028 17.0391 3.06002C16.6224 3.06977 16.2622 3.22733 15.9585 3.53271C15.6547 3.83809 15.5024 4.19341 15.5016 4.59869C15.5008 5.00397 15.6531 5.35929 15.9585 5.66467L24.9127 14.6189Z" fill="#A5A5A5"/>
          </svg>
        </Button>
    </Wrapper>
  );
}

export default ProfilePage;

const Wrapper = styled.div`
  width: 36.71788rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  color: var(--black);

  h2 {
    text-align: left;
  }

  .body1 {
    color: #767676;
  }

  .title{
    margin-bottom: 1rem;
  }

  .blue{
    color: var(--blue);
  }
`

const Box = styled.div`
  width: 100%;
  padding: 1.5rem 1.66rem;
  margin-bottom: 1.38rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.09rem;

  background: var(--white);
  border-radius: 0.97744rem;
  border: 1px solid var(--light-gray);
`

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 3.69rem;
`

const Flag = styled.div`
  width: 4.20725rem;;
  height: 4.20725rem;;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--sub-btn);
  /* make perfectly circular and prevent inner overflow */
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 auto; /* prevent flex children from stretching the box */

  img{
    width: 2.5rem;
    height: 2.5rem;
  }
`

const EditContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 0.19rem;
`

const TextContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 0.13rem;
`

const Input = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: 6.62rem;
`

const Button = styled.button`
  width: 100%;
  padding: 1.5rem 1.66rem;
  margin-bottom: 2.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--white);
  border-radius: 0.97744rem;
  border: 1px solid var(--light-gray);

  color: var(--black);

  &:hover {
        cursor: pointer;
        filter: brightness(0.9);
  }
`