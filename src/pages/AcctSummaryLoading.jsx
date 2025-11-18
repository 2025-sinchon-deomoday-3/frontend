import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";

const AcctSummaryLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const createSnapshot = async () => {
      try {
        const profileData = location.state?.profileData;

        if (!profileData) {
          // 데이터 없으면? 이전 페이지로
          navigate(-1);
          return;
        }

        const token = localStorage.getItem("accessToken"); // 또는 세션/쿠키에서 가져오기

        const response = await fetch("/summaries/snapshot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        });

        const data = await response.json();

        if (response.ok) {
          // 성공 시 요약본 페이지로 이동
          navigate("/summary", {
            state: {
              snapshotId: data.data.snapshot_id,
              detailProfileId: data.data.detail_profile_id,
            },
          });
        } else {
          setError(data.message || "요약본 생성에 실패했습니다.");
        }
      } catch (err) {
        setError("네트워크 오류가 발생했습니다.");
        console.error("Snapshot creation error:", err);
      }
    };

    createSnapshot();
  }, [navigate, location]);

  if (error) {
    return (
      <Wrapper>
        <ContentContainer>
          <ErrorText>{error}</ErrorText>
        </ContentContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ContentContainer>
        <Spinner />
        <TextContainer>
          <MainText>요약본을 열심히 생성하고 있어요.</MainText>
          <SubText>잠시만 기다려주세요. 약 ~분이 소요됩니다.</SubText>
        </TextContainer>
      </ContentContainer>
    </Wrapper>
  );
};

export default AcctSummaryLoading;

//
// —————————————————————  스타일링 ————————————————————————

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  background: var(--white, #fff);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.40625rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.46875rem;
`;

const MainText = styled.h1`
  color: var(--black, #000);
  font-family: var(--font-main);
  font-size: 2.15625rem;
  font-weight: 700;
  line-height: 3.2375rem;
  text-align: center;
  white-space: pre-wrap;
`;

const SubText = styled.h3`
  color: var(--gray, #a5a5a5);
  font-family: var(--font-main);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.6875rem;
  text-align: center;
  white-space: pre-wrap;
`;

const ErrorText = styled.p`
  color: var(--red, #ca1111);
  font-size: 1.125rem;
  font-weight: 500;
  text-align: center;
`;
