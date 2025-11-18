import React, { useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Inputfield from "../components/Inputfield";
import Feed from "../components/Feed";

const ScrapbookPage = () => {
  const navigate = useNavigate();

  return(
    <Wrapper>
      <Left> 
        <p className="page">스크랩북</p>
        <Feeding>
          <Feed/>
          <Feed/>
          <Feed/>
          <Feed/>
        </Feeding>
      </Left>
      <Right>
        <img className="ad" src="/images/Advertising.png" alt="advertising" />
      </Right>
    </Wrapper>
  );
};

export default ScrapbookPage;

const Wrapper = styled.div`
  width: 100vw;

  display: grid;
  grid-template-columns: 1.9fr 1fr;
  gap: 2.68rem;

  padding: 0 3.94rem 0 2.94rem;
`

const Left = styled.div`
  width: 100%;
  height: calc(100vh - 5.5rem - 1.25rem); /* Right와 동일한 높이 */
  max-height: calc(100vh - 5.5rem - 1.25rem);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .page {
    width: 100%;
    flex-shrink: 0; /* Top 영역이 축소되지 않도록 고정 */

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    padding: 0 1rem 0 2.44rem;
    margin-bottom: 1.87rem;

    gap: 1.25rem;

    text-align: left;
  }
`

const Feeding = styled.div`
  width: 100%;
  flex: 1; /* 남은 공간을 모두 차지 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 방지 */

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;
  padding: 0 1rem 1rem 1rem;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

const Right = styled.div`
  width: 100%;
  height: calc(100vh - 5.5rem - 1.25rem); /* 뷰포트 높이 - topbar(5.5rem) - padding-top(1.25rem) */
  max-height: calc(100vh - 5.5rem - 1.25rem);
  overflow: hidden; /* 스크롤 방지 */

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .ad {
    width: 100%;
    object-fit: contain; /* 이미지가 찌그러지지 않도록 */
    margin-bottom: 2rem;
  }
`