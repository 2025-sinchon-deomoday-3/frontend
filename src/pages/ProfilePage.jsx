import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CircleButton from "../components/button/CircleButton";
import Inputfield from "../components/Inputfield";

const userInfo = ["미국", "화연이에연", "ewhaewhalikelion", "이화여자대학교"];
const exInfo = ["미국", "교환학생", "University of California, Davis", "24학년도 2학기", "5개월"];

const ProfilePage = () => {
  // build flag src safely (encode in case of non-ascii names)
  const flagSrc = `/images/flags/${encodeURIComponent(userInfo[0])}.png`;

  return(
    <Wrapper>
        <h4>프로필</h4>
        <Box>
          <Container>
            <Flag>
                <img
                  src={flagSrc}
                  alt={userInfo[0]}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/flags/default.png'; }}
                />
            </Flag>
            <TextContainer>
                <h5>{userInfo[1]} (@{userInfo[2]})</h5>
                <p>{userInfo[3]}</p>
            </TextContainer>
          </Container>
        </Box>
        <h4>파견 정보</h4>
        <Box>
          <Input>
            <h5>파견 국가</h5>
            <p>{exInfo[0]}</p>
          </Input>
          <Input>
            <h5>파견 유형</h5>
            <p>{exInfo[1]}</p>
          </Input>
          <Input>
            <h5>파견 학교</h5>
            <p>{exInfo[2]}</p>
          </Input>
          <Input>
            <h5>파견 시기</h5>
            <p>{exInfo[3]}</p>
          </Input>
          <Input>
            <h5>파견 기간</h5>
            <p>{exInfo[4]}</p>
          </Input>
        </Box>
        <Button>
        <h5>내 게시글 바로가기</h5>
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 34" fill="none">
            <path d="M13.8404 17L0.671614 30.1688C0.223696 30.6167 0.0069046 31.1392 0.0212383 31.7365C0.0355721 32.3337 0.267292 32.8563 0.716404 33.3042C1.16552 33.7521 1.68808 33.976 2.28411 33.976C2.88014 33.976 3.40271 33.7521 3.85182 33.3042L17.6477 19.5531C18.006 19.1948 18.2747 18.7917 18.4539 18.3438C18.6331 17.8958 18.7227 17.4479 18.7227 17C18.7227 16.5521 18.6331 16.1042 18.4539 15.6563C18.2747 15.2083 18.006 14.8052 17.6477 14.4469L3.85182 0.651042C3.4039 0.203125 2.87357 -0.0136667 2.26082 0.000666667C1.64807 0.015 1.11834 0.246722 0.671614 0.695833C0.22489 1.14494 0.000932693 1.66751 -0.000261307 2.26354C-0.00145721 2.85957 0.222502 3.38214 0.671614 3.83125L13.8404 17Z" fill="#A5A5A5"/>
        </svg>
        </Button>
    </Wrapper>
  );
}

export default ProfilePage;

const Wrapper = styled.div`
  width: 54rem;
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  h4 {
    width: 100%;
    margin-bottom: 1.87rem;
    text-align: left;
  }

  p{
    font-size: 1.5rem;
    font-weight: 500;
    color: #767676;
  }
`

const Box = styled.div`
  width: 100%;
  padding: 2.4rem 2.81rem;
  margin-bottom: 2.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  background: var(--white);
  border-radius: 1.4375rem;
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
  width: 6.1875rem;
  height: 6.1875rem;

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
    width: 3.75rem;
    height: 3.75rem;
  }
`

const TextContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 0.19rem;
`

const Input = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: 10rem;
`

const Button = styled.button`
  width: 100%;
  padding: 2.4rem 2.81rem;
  margin-bottom: 2.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--white);
  border-radius: 1.4375rem;
  border: 1px solid var(--light-gray);

  &:hover {
        cursor: pointer;
        filter: brightness(0.9);
  }
`