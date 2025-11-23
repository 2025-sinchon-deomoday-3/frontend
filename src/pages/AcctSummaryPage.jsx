import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackTopbar from "../components/topbar/BackTopbar";
import CategoryCard from "../components/CategoryCard";
import LikeCircleButton from "../components/button/LikeCircleButton";
import ScrapCircleButton from "../components/button/ScrapCircleButton";

const AcctSummaryPage = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 연결할 부분
        // const accessToken = localStorage.getItem('accessToken');

        // 세부프로필 (앞에서 입력))
        // const profileResponse = await fetch('/summaries/snapshot/', {
        //   headers: {
        //     'Authorization': `Bearer ${accessToken}`
        //   }
        // });
        // const profileResult = await profileResponse.json();
        // setProfileData(profileResult.data);

        // 비용 데이터 (가져오ㅓ야함)
        // const summaryResponse = await fetch('/summaries/ledger-summary/', {
        //   headers: {
        //     'Authorization': `Bearer ${accessToken}`
        //   }
        // });
        // const summaryResult = await summaryResponse.json();
        // setSummaryData(summaryResult.data);

        // ↓ 이건 어케 표시되는지 보려고 내가 걍.. 암거나 넣은 것
        setProfileData({
          monthly_spend_in_korea: "2400000",
          meal_frequency: "2",
          dineout_per_week: 3,
          coffee_per_week: 7,
          smoking_per_day: 0,
          drinking_per_week: 2,
          shopping_per_month: 5,
          culture_per_month: 2,
          residence_type: "본가",
          commute: false,
          summary_note: "이번 달은 교통비가 생각보다 많이많이 들었어요!",
        });

        setSummaryData({
          average_monthly_living_expense: {
            foreign_amount: "2026.25",
            foreign_currency: "USD",
            krw_amount: "2634475",
            krw_currency: "KRW",
          },
          categories: [
            {
              code: "FOOD",
              label: "식비",
              foreign_amount: "450.25",
              foreign_currency: "USD",
              krw_amount: "585325",
              krw_currency: "KRW",
            },
            {
              code: "HOUSING",
              label: "주거비",
              foreign_amount: "800.00",
              foreign_currency: "USD",
              krw_amount: "1040000",
              krw_currency: "KRW",
            },
            {
              code: "TRANSPORT",
              label: "교통비",
              foreign_amount: "120.50",
              foreign_currency: "USD",
              krw_amount: "156650",
              krw_currency: "KRW",
            },
            {
              code: "SHOPPING",
              label: "쇼핑비",
              foreign_amount: "200.00",
              foreign_currency: "USD",
              krw_amount: "260000",
              krw_currency: "KRW",
            },
            {
              code: "TRAVEL",
              label: "여행비",
              foreign_amount: "150.00",
              foreign_currency: "USD",
              krw_amount: "195000",
              krw_currency: "KRW",
            },
            {
              code: "STUDY_MATERIALS",
              label: "교재비",
              foreign_amount: "180.00",
              foreign_currency: "USD",
              krw_amount: "234000",
              krw_currency: "KRW",
            },
            {
              code: "ALLOWANCE",
              label: "용돈",
              foreign_amount: "50.00",
              foreign_currency: "USD",
              krw_amount: "65000",
              krw_currency: "KRW",
            },
            {
              code: "ETC",
              label: "기타",
              foreign_amount: "75.50",
              foreign_currency: "USD",
              krw_amount: "98150",
              krw_currency: "KRW",
            },
          ],
          base_dispatch_cost: {
            flight: {
              foreign_amount: "1200.00",
              foreign_currency: "USD",
              krw_amount: "1560000",
              krw_currency: "KRW",
            },
            insurance: {
              foreign_amount: "500.00",
              foreign_currency: "USD",
              krw_amount: "650000",
              krw_currency: "KRW",
            },
            visa: {
              foreign_amount: "160.00",
              foreign_currency: "USD",
              krw_amount: "208000",
              krw_currency: "KRW",
            },
            tuition: {
              foreign_amount: "3000.00",
              foreign_currency: "USD",
              krw_amount: "3900000",
              krw_currency: "KRW",
            },
            total: {
              foreign_amount: "4860.00",
              foreign_currency: "USD",
              krw_amount: "6318000",
              krw_currency: "KRW",
            },
          },
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    navigate("/summaries/edit");
  };

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  if (!profileData || !summaryData) {
    return <PageWrapper>데이터를 불러올 수 없습니다.</PageWrapper>;
  }

  const getMealFrequencyText = (freq) => {
    return freq ? `하루 ${freq}회` : null;
  };

  const getCommuteText = (commute) => {
    if (commute === true) return "예";
    if (commute === false) return "아니오";
    return null;
  };

  return (
    <PageWrapper>
      <BackTopbar />

      <TitleRow>
        <Title>가계부 상세보기</Title>
      </TitleRow>

      {/* ————————————————————— 프로필 ————————————————————— */}
      <ProfileBox>
        <ProfileImage>
          <Flag>
            <img src="/images/flags/미국.png" alt="미국" />
          </Flag>
          <Type>방문학생</Type>
        </ProfileImage>
        <ProfileInfo>
          <ProfileNickname>
            <ProfileText>화연이에연 / 여</ProfileText>
            <ProfileBadge>나</ProfileBadge>
          </ProfileNickname>
          <ProfileWrapper>
            <h3>미국 University of California, Davis</h3>
            <p>25년도 1학기 (5개월)</p>
          </ProfileWrapper>
        </ProfileInfo>
        <BtnBox>
          <LikeCircleButton></LikeCircleButton>
          <ScrapCircleButton></ScrapCircleButton>
        </BtnBox>
      </ProfileBox>

      {/* ————————————————————— 세부 프로필 ————————————————————— */}
      <ContentWrapper>
        <Section1Header>
          <SectionTitle>세부 프로필</SectionTitle>
          <EditButton onClick={handleEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.768 0.87099C16.2101 0.313295 15.4536 0 14.6648 0C13.8759 0 13.1194 0.313295 12.5616 0.87099L11.8605 1.57305L16.7689 6.48152L17.469 5.78045C17.7453 5.50421 17.9645 5.17624 18.114 4.81528C18.2635 4.45433 18.3405 4.06745 18.3405 3.67675C18.3405 3.28605 18.2635 2.89917 18.114 2.53822C17.9645 2.17726 17.7453 1.84929 17.469 1.57305L16.768 0.87099ZM15.3658 7.88366L10.4574 2.97519L1.44362 11.9899C1.24637 12.1872 1.10858 12.436 1.04598 12.7078L0.0256175 17.1255C-0.0124018 17.2895 -0.0080408 17.4604 0.0382895 17.6223C0.0846199 17.7841 0.171394 17.9315 0.290436 18.0506C0.409478 18.1696 0.556867 18.2564 0.718717 18.3027C0.880567 18.349 1.05155 18.3534 1.21555 18.3154L5.63416 17.296C5.90567 17.2332 6.15409 17.0955 6.3511 16.8984L15.3658 7.88366Z"
                fill="#115BCA"
              />
            </svg>
          </EditButton>{" "}
        </Section1Header>
        <Section1>
          <FormGrid>
            <FormRow>
              <Label>한국에서의 월 지출</Label>
              <DisplayValue>
                ₩{parseInt(profileData.monthly_spend_in_korea).toLocaleString()}
              </DisplayValue>
            </FormRow>
            {profileData.meal_frequency && (
              <FormRow>
                <Label>식사</Label>
                <DisplayValue>
                  {getMealFrequencyText(profileData.meal_frequency)}
                </DisplayValue>
              </FormRow>
            )}

            {profileData.dineout_per_week && (
              <FormRow>
                <Label>외식 및 배달음식 소비</Label>
                <DisplayValue>주 {profileData.dineout_per_week}회</DisplayValue>
              </FormRow>
            )}

            {profileData.coffee_per_week && (
              <FormRow>
                <Label>커피 등 음료 소비</Label>
                <DisplayValue>주 {profileData.coffee_per_week}회</DisplayValue>
              </FormRow>
            )}

            {profileData.smoking_per_day !== null &&
              profileData.smoking_per_day !== undefined && (
                <FormRow>
                  <Label>흡연</Label>
                  <DisplayValue>
                    하루 {profileData.smoking_per_day}회
                  </DisplayValue>
                </FormRow>
              )}

            {profileData.drinking_per_week && (
              <FormRow>
                <Label>음주</Label>
                <DisplayValue>
                  주 {profileData.drinking_per_week}회
                </DisplayValue>
              </FormRow>
            )}

            {profileData.shopping_per_month && (
              <FormRow>
                <Label>쇼핑</Label>
                <DisplayValue>
                  월 {profileData.shopping_per_month}회
                </DisplayValue>
              </FormRow>
            )}

            {profileData.culture_per_month && (
              <FormRow>
                <Label>여가 및 문화생활 소비</Label>
                <DisplayValue>
                  월 {profileData.culture_per_month}회
                </DisplayValue>
              </FormRow>
            )}

            {profileData.residence_type && (
              <FormRow>
                <Label>거주유형</Label>
                <DisplayValue>{profileData.residence_type}</DisplayValue>
              </FormRow>
            )}

            {profileData.commute !== null &&
              profileData.commute !== undefined && (
                <FormRow>
                  <Label>통학 여부</Label>
                  <DisplayValue>
                    {getCommuteText(profileData.commute)}
                  </DisplayValue>
                </FormRow>
              )}
          </FormGrid>
        </Section1>

        {/* ————————————————————— 가계부 요약본  ————————————————————— */}
        <Section2>
          <Section2Header>
            <TitleWrapper>
              <Username>화연이에연</Username>
              <SectionTitle>님의 가계부 요약본</SectionTitle>
            </TitleWrapper>
            <Notice>* 기록시점의 환율 기준</Notice>
          </Section2Header>
          <EntireGrid>
            <CategorySection>
              <CategoryLabel>
                <CategoryText>한달평균생활비</CategoryText>
                <CategoryAmount>
                  {summaryData.average_monthly_living_expense
                    .foreign_currency === "KRW"
                    ? "₩"
                    : "$"}
                  {parseFloat(
                    summaryData.average_monthly_living_expense.foreign_amount
                  ).toFixed(2)}{" "}
                  (₩
                  {parseFloat(
                    summaryData.average_monthly_living_expense.krw_amount
                  ).toLocaleString()}
                  )
                </CategoryAmount>
              </CategoryLabel>
              <CategoryGrid>
                {summaryData.categories.map((category) => (
                  <CategoryCard key={category.code} categoryData={category} />
                ))}
              </CategoryGrid>
            </CategorySection>

            <BasicCostSection>
              <BasicCostLabel>
                <BasicCostText>기본파견비용</BasicCostText>
                <BasicCostAmount>
                  {summaryData.base_dispatch_cost.total.foreign_currency ===
                  "KRW"
                    ? "₩"
                    : "$"}
                  {parseFloat(
                    summaryData.base_dispatch_cost.total.foreign_amount
                  ).toFixed(2)}{" "}
                  (₩
                  {parseFloat(
                    summaryData.base_dispatch_cost.total.krw_amount
                  ).toLocaleString()}
                  )
                </BasicCostAmount>
              </BasicCostLabel>
              <BasicCostGrid>
                {[
                  {
                    code: "flight",
                    label: "항공권",
                    ...summaryData.base_dispatch_cost.flight,
                  },
                  {
                    code: "insurance",
                    label: "보험료",
                    ...summaryData.base_dispatch_cost.insurance,
                  },
                  {
                    code: "visa",
                    label: "비자",
                    ...summaryData.base_dispatch_cost.visa,
                  },
                  {
                    code: "tuition",
                    label: "등록금",
                    ...summaryData.base_dispatch_cost.tuition,
                  },
                ].map((cost) => (
                  <CategoryCard key={cost.code} categoryData={cost} />
                ))}
              </BasicCostGrid>
            </BasicCostSection>
          </EntireGrid>
        </Section2>

        {/* ————————————————————— 한줄평 ————————————————————— */}
        {profileData.summary_note && (
          <Section3>
            <TitleWrapper>
              <Username>화연이에연</Username>
              <SectionTitle>님이 남긴 한 마디</SectionTitle>
            </TitleWrapper>
            <DisplayNote>{profileData.summary_note}</DisplayNote>
          </Section3>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AcctSummaryPage;
//
// —————————————————————————— 스타일링 ——————————————————————————

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--white);
  padding-top: 5.5rem;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  color: var(--black);
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.87rem 0;
  padding: 0;
  text-align: left;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 19px;
    height: 22px;
  }
`;

const ProfileImage = styled.div`
  position: relative;
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
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 auto;

  img {
    width: 2.78438rem;
    height: 2.78438rem;
  }
`;

const Type = styled.div`
  position: absolute;
  bottom: -12%;
  left: 50%;
  transform: translateX(-50%);
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
`;

const ProfileInfo = styled.div`
  width: 100%;
  font-size: 0.81881rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.19rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileNickname = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileText = styled.div`
  font-size: 0.81881rem;
  font-weight: 400;
  gap: 0.19rem;
`;

const ProfileBadge = styled.div`
  background: var(--gray, #f4f4f4);
  color: var(--white, #ffffff);
  border-radius: 50%;
  height: 1.1rem;
  width: 1.1rem;
  margin-left: 0.5rem;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.37rem;
  padding: 1.5rem;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

//
// —————————————————————————— (세부 프로필) ——————————————————————————

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 2rem 1.67rem 3rem;
  text-align: left;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`;

const Section3 = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;

const Label = styled.span`
  white-space: nowrap;
  text-align: left;
  min-width: fit-content;
  color: var(--, #000);
  font-family: "Pretendard Variable";
  font-size: 0.9rem;
  font-weight: 500;
`;

const DisplayValue = styled.div`
  color: var(--, #000);
  font-size: 0.75rem;
  font-weight: 400;
  border-radius: 0.30706rem;
  border: 1px solid var(--, #f4f4f4);
  background: var(--FCFCFC, #fcfcfc);
`;

const Section1 = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
  border-radius: 1.07813rem;
  border: 1px solid var(--light-gray, #d9d9d9);
`;

const SectionTitle = styled.h2`
  color: var(--black);
  margin-left: 0.4rem;
  text-align: left;
`;

const Section1Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  white-space: nowrap;
  color: var(--red, #ff0000);
  font-size: 0.925rem;
  font-weight: 500;
  display: flex;
  margin-bottom: 0.2rem;
`;

//
// ———————————— 가계부 요약본 부분 ————————————

const Username = styled.h2`
  color: var(--blue, #115bca);
  margin-left: 2rem;
`;

const TitleWrapper = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-top: 3.06rem;
`;

const Section2Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const EntireGrid = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 0.625rem;
  border: 1px solid var(--light-gray);

  margin: 0;
  width: 100%;
`;

const Section2 = styled.div`
  width: 100%;
`;

// ————— 요약본(카테고리) —————

const CategoryLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.89rem;
  flex-wrap: wrap;
  padding: 2rem 2rem 1rem 2rem;
  margin: 1rem 0 0 0;
`;

const CategoryText = styled.h2`
  white-space: nowrap;
  color: var(--black);
  font-size: 1.7rem;
  font-weight: 700;
`;

const CategoryAmount = styled.span`
  color: var(--deep-blue);
  font-size: 1.7rem;
  font-weight: 700;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 0 1rem 1rem 1rem;
  width: 90%;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`;

// ————— 요약본(기본비용) —————

const BasicCostSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`;

const BasicCostLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.89rem;
  flex-wrap: wrap;
  padding: 2rem 2rem 1rem 2rem;
`;

const BasicCostText = styled.h2`
  color: var(--black);
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0;
`;

const BasicCostAmount = styled.span`
  color: var(--deep-blue);
  font-size: 1.7rem;
  font-weight: 700;
`;

const BasicCostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 1rem 1rem 1rem;
  width: 95%;
  margin: 0 1rem 0 1rem;
`;

const DisplayNote = styled.div`
  width: 100%;
  min-height: 3.55456rem;
  text-align: left;
  padding: 1rem;

  border-radius: 1.177rem;
  border: 1px solid var(--light-gray, #d9d9d9);
  background: var(--text-input, #fcfcfc);

  color: var(--, #000);
  font-size: 0.925rem;
  font-weight: 500;
`;
