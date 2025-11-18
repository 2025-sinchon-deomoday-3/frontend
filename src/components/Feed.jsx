import React, { useState, forwardRef } from "react";
import styled from "styled-components";

const userInfo = ["미국", "화연이에연", "ewhaewhalikelion", "이화여자대학교"];

const Feed = () => {
  const [isScraped, setIsScraped] = useState(false);
  
  const handleScrapClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 중단 - Box 클릭 이벤트가 실행되지 않음
    setIsScraped((prev) => !prev); // 상태 반전 (true ↔ false)
  };

  const handleFeedClick = () => {
    // 피드 클릭 시 페이지 이동 로직
    console.log("Feed clicked!");
    // navigate('/feed-detail'); // 예시
  };

  const flagSrc = `/images/flags/${encodeURIComponent(userInfo[0])}.png`;
  
  return(
    <Box onClick={handleFeedClick}>
      <User>
        <UserProfile>
          <Flag>
            <img src={flagSrc} alt={userInfo[0]}/>
          </Flag>
          <Type>방문학생</Type>
        </UserProfile>
        <UserText>
          <p className="body1">화연이에연 / 여</p>
          <h2>미국 University of California, Davis</h2>
          <p className="body1">25년도 1학기 (5개월)</p>
        </UserText>
        <ScrapBtn onClick={handleScrapClick} $isScraped={isScraped}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="none">
            <path d="M10 22.0125L3.77 24.7515C2.87222 25.1466 2.01944 25.0706 1.21167 24.5232C0.403889 23.977 0 23.2133 0 22.2322V2.75262C0 1.96794 0.257222 1.31329 0.771666 0.788653C1.28611 0.26402 1.92667 0.00113557 2.69333 0H17.3083C18.075 0 18.7156 0.262884 19.23 0.788653C19.7444 1.31442 20.0011 1.96908 20 2.75262V22.2322C20 23.2133 19.5961 23.977 18.7883 24.5232C17.9806 25.0706 17.1278 25.1466 16.23 24.7515L10 22.0125ZM10 20.0996L16.8917 23.1384C17.2328 23.2917 17.5583 23.2593 17.8683 23.0413C18.1783 22.8221 18.3333 22.5269 18.3333 22.1556V2.75433C18.3333 2.49201 18.2267 2.25127 18.0133 2.0321C17.8 1.81294 17.5644 1.70336 17.3067 1.70336H2.69333C2.43667 1.70336 2.20111 1.81237 1.98667 2.0304C1.77222 2.24843 1.66556 2.48917 1.66667 2.75262V22.1573C1.66667 22.5286 1.82167 22.8233 2.13167 23.0413C2.44167 23.2593 2.76722 23.2917 3.10833 23.1384L10 20.0996ZM10 1.70336H1.66667H18.3333H10Z" fill={isScraped ? "var(--blue)" : "var(--gray)"}/>
            <path d="M10 20.0996L16.8917 23.1384C17.2328 23.2917 17.5583 23.2593 17.8683 23.0413C18.1783 22.8221 18.3333 22.5269 18.3333 22.1556V2.75433C18.3333 2.49201 18.2267 2.25127 18.0133 2.0321C17.8 1.81294 17.5644 1.70336 17.3067 1.70336H10H2.69333C2.43667 1.70336 2.20111 1.81237 1.98667 2.0304C1.77222 2.24843 1.66556 2.48917 1.66667 2.75262V22.1573C1.66667 22.5286 1.82167 22.8233 2.13167 23.0413C2.44167 23.2593 2.76722 23.2917 3.10833 23.1384L10 20.0996Z" fill={isScraped ? "var(--blue)" : "none"}/>
          </svg>
          {!isScraped && <p className="body1">15</p>}
        </ScrapBtn>
      </User>
      <Cost>
        <CostSection>
          <p className="body2">총 파견 비용</p>
          <CostText>
            <h3>1050만 6530원</h3>
            <h3 className="dblue">$7,451</h3>
          </CostText>
        </CostSection>
        <CostSection>
          <p className="body2">한달 평균 생활비</p>
          <CostText>
            <h3>150만 3000원</h3>
            <h3 className="dblue">$1,065</h3>
          </CostText>
        </CostSection>
      </Cost>
    </Box>
  );
};

export default Feed;

// ------ 스타일링 영역 ------ 
const Box = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.72rem;

  padding: 1rem 1.5rem;

  background: var(--white);
  border-radius: 0.97744rem;
  border: 1px solid var(--light-gray);

  transition: all 0.2s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const User = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 1.37rem;
`;

const UserProfile = styled.div`
  position: relative; /* Type의 기준점 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Flag = styled.div`
  width: 4.64063rem;
  height: 4.64063rem;

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
    width: 2.78438rem;
    height: 2.78438rem;
  }
`

const Type = styled.div`
  position: absolute;
  bottom: -12%; /* Flag 하단에 배치 */
  left: 50%;
  transform: translateX(-50%); /* 가로 중앙 정렬 */
  
  width: 4.70569rem;
  height: 1.31756rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--visiting);
  border-radius: 2.5rem;

  font-family: "Pretendard Variable";
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--white);
`

const UserText = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 0.19rem;
`;

const ScrapBtn = styled.button`
  height: 3.25rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;

  background: none;
  border: none;

  color: var(--gray);

  margin: 0.75rem 1.5rem 0 0;

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }

  svg {
    flex-shrink: 0; /* SVG 크기가 축소되지 않도록 */
  }
`

const Cost = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.37rem;
`;

const CostSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.3rem;
`;

const CostText = styled.div`
  width: 100%;
  height: 2.6875rem;
  
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  padding: 0 1.88rem;

  border-radius: 1.07813rem;
  background: #F6FAFF;

  .dblue {
    color: var(--deep-blue);
  }
`;