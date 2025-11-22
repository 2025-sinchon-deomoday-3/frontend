import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UploadTopbar from "../components/topbar/UploadTopbar";
import Inputfield from "../components/Inputfield";
import Modal from "../components/Modal";
import CategoryCard from "../components/CategoryCard";
import CircleButton from "../components/button/CircleButton";

const AcctSummaryProfileData = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    monthly_spend_in_korea: "",
    meal_frequency: "", // 기본값: 2회
    dineout_per_week: "",
    coffee_per_week: "",
    smoking_per_day: "",
    drinking_per_week: "",
    shopping_per_month: "",
    culture_per_month: "",
    residence_type: "",
    commute: null, // 초기값 null로  (선택 X 상태)
    summary_note: "",
  });

  // 임시로 넣었음 (실제로는 API: GET /summaries/ledger-summary/ 에서 받아올 데이터)
  // API 응답: { average_monthly_living_expense, categories, base_dispatch_cost }
  const summaryData = {
    average_monthly_living_expense: {
      foreign_amount: "2026.25",
      foreign_currency: "USD",
      krw_amount: "2634475",
      krw_currency: "KRW",
    },
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
  };

  //
  // ————————————————————————————— 카테고리 —————————————————————————————

  const categoryData = [
    {
      code: "FOOD",
      label: "식비",
      foreign_amount: 450.25,
      foreign_currency: "USD",
      krw_amount: 585325,
      krw_currency: "KRW",
      budget_diff: null,
    },
    {
      code: "HOUSING",
      label: "주거비",
      foreign_amount: 800.0,
      foreign_currency: "USD",
      krw_amount: 1040000,
      krw_currency: "KRW",
      budget_diff: null,
    },
    {
      code: "TRANSPORT",
      label: "교통비",
      foreign_amount: 120.5,
      foreign_currency: "USD",
      krw_amount: 156650,
      krw_currency: "KRW",
      budget_diff: null,
    },
    {
      code: "SHOPPING",
      label: "쇼핑비",
      foreign_amount: 200.0,
      foreign_currency: "USD",
      krw_amount: 260000,
      krw_currency: "KRW",
      budget_diff: null,
    },
    {
      code: "TRAVEL",
      label: "여행비",
      foreign_amount: 150.0,
      foreign_currency: "USD",
      krw_amount: 195000,
      krw_currency: "KRW",
      budget_diff: null,
    },
    {
      code: "STUDY_MATERIALS",
      label: "교재비",
      foreign_amount: 180.0,
      foreign_currency: "USD",
      krw_amount: 234000,
      krw_currency: "KRW",
      budget_diff: null,
    },
    {
      code: "ALLOWANCE",
      label: "용돈",
      foreign_amount: 50.0,
      foreign_currency: "USD",
      krw_amount: 65000,
      krw_currency: "KRW",
      budget_diff: null,
    },
    {
      code: "ETC",
      label: "기타",
      foreign_amount: 75.5,
      foreign_currency: "USD",
      krw_amount: 98150,
      krw_currency: "KRW",
      budget_diff: null,
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePublish = () => {
    if (!formData.monthly_spend_in_korea) {
      alert("한국에서의 한달 지출 비용은 필수 입력 항목입니다.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmPublish = async () => {
    try {
      // API 명세서에 맞게 데이터 구성
      const requestData = {};

      // 필수 필드
      if (formData.monthly_spend_in_korea) {
        requestData.monthly_spend_in_korea = parseInt(
          formData.monthly_spend_in_korea
        );
      }

      // 선택 필드 (값 있을 때만? 추가)
      if (formData.meal_frequency) {
        requestData.meal_frequency = formData.meal_frequency;
      }
      if (formData.dineout_per_week) {
        requestData.dineout_per_week = parseInt(formData.dineout_per_week);
      }
      if (formData.coffee_per_week) {
        requestData.coffee_per_week = parseInt(formData.coffee_per_week);
      }
      if (formData.smoking_per_day) {
        requestData.smoking_per_day = parseInt(formData.smoking_per_day);
      }
      if (formData.drinking_per_week) {
        requestData.drinking_per_week = parseInt(formData.drinking_per_week);
      }
      if (formData.shopping_per_month) {
        requestData.shopping_per_month = parseInt(formData.shopping_per_month);
      }
      if (formData.culture_per_month) {
        requestData.culture_per_month = parseInt(formData.culture_per_month);
      }
      if (formData.residence_type) {
        requestData.residence_type = formData.residence_type;
      }
      // commute는 boolean이므로 명시적으로 선택한 경우에만 추가
      if (formData.commute !== null && formData.commute !== undefined) {
        requestData.commute = formData.commute;
      }
      if (formData.summary_note) {
        requestData.summary_note = formData.summary_note;
      }

      // API 호출
      // const response = await fetch('/summaries/snapshot/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${accessToken}`
      //   },
      //   body: JSON.stringify(requestData)
      // });
      //
      // if (!response.ok) {
      //   throw new Error('게시 실패');
      // }
      //
      // const result = await response.json();
      // console.log('게시 성공:', result.data);

      console.log("Publishing data:", requestData);

      // 성공 시 -> AcctSummaryComplete 페이지로 이동
      navigate("/summaries/complete");
    } catch (error) {
      console.error("Error publishing summary:", error);
      alert("게시 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <UploadTopbar onPublish={handlePublish} />

      <ContentWrapper>
        <Title>내 가계부 요약본</Title>
        {/* ————————————————————— 프로필 ————————————————————— */}
        <ProfileBox>
          <ProfileImage>
            <Flag>
              <img src="/images/flags/미국.png" alt="미국" />
            </Flag>
            <Type>방문학생</Type>
          </ProfileImage>
          <ProfileInfo>
            <p className="body1">화연이에연 / 여</p>
            <h2>미국 University of California, Davis</h2>
            <p className="body1">25년도 1학기 (5개월)</p>
          </ProfileInfo>
        </ProfileBox>

        {/* ————————————————————— 세부 프로필 ————————————————————— */}
        <SectionTitle>세부 프로필</SectionTitle>
        <Section>
          <FormGrid>
            <Required>*필수입력</Required>
            <FormRow>
              <Label>한국에서의 월 지출</Label>
              <InputWrapper>
                <Inputfield
                  type="number"
                  placeholder="금액을 입력해주세요"
                  value={formData.monthly_spend_in_korea}
                  onChange={(e) =>
                    handleInputChange("monthly_spend_in_korea", e.target.value)
                  }
                />
              </InputWrapper>
            </FormRow>

            <Optional>* 선택입력</Optional>
            <FormRow>
              <Label>식사</Label>
              <ButtonGroup1>
                {["1", "2", "3"].map((freq) => (
                  <CircleButton
                    key={freq}
                    onClick={() => handleInputChange("meal_frequency", freq)}
                    customStyle={`
                      font-size: 0.85rem;
                      height: 2.15625rem;
                      background-color: ${
                        formData.meal_frequency === freq
                          ? "var(--blue, #115BCA)"
                          : "var(--white, #fff)"
                      };
                      color: ${
                        formData.meal_frequency === freq
                          ? "var(--white, #fff)"
                          : "var(--gray, #A5A5A5)"
                      };
                      border: ${
                        formData.meal_frequency === freq
                          ? "none"
                          : "1px solid var(--gray, #A5A5A5)"
                      };
                    `}
                  >
                    하루 {freq}회
                  </CircleButton>
                ))}
              </ButtonGroup1>
            </FormRow>

            <FormRow>
              <Label>외식 및 배달음식 소비</Label>
              <InputWrapper>
                <span style={{ minWidth: "fit-content" }}>주</span>
                <Inputfield
                  customStyle={`
                    color: var(--black, #000);
                    border: none;
                    `}
                  type="number"
                  placeholder=""
                  value={formData.dineout_per_week}
                  onChange={(e) =>
                    handleInputChange("dineout_per_week", e.target.value)
                  }
                />
                <Unit>회</Unit>
              </InputWrapper>
            </FormRow>

            <FormRow>
              <Label>커피 등 음료 소비</Label>
              <InputWrapper>
                <span style={{ minWidth: "fit-content" }}>주</span>
                <Inputfield
                  customStyle={`
                    color: var(--black, #000);
                    border: none;
                    `}
                  type="number"
                  placeholder=""
                  value={formData.coffee_per_week}
                  onChange={(e) =>
                    handleInputChange("coffee_per_week", e.target.value)
                  }
                />
                <Unit>회</Unit>
              </InputWrapper>
            </FormRow>

            <FormRow>
              <Label>흡연</Label>
              <InputWrapper>
                <span style={{ minWidth: "fit-content" }}>하루</span>
                <Inputfield
                  customStyle={`
                    color: var(--black, #000);
                    border: none;
                    `}
                  type="number"
                  placeholder=""
                  value={formData.smoking_per_day}
                  onChange={(e) =>
                    handleInputChange("smoking_per_day", e.target.value)
                  }
                />
                <Unit>회</Unit>
              </InputWrapper>
            </FormRow>

            <FormRow>
              <Label>음주</Label>
              <InputWrapper>
                <span style={{ minWidth: "fit-content" }}>주</span>
                <Inputfield
                  customStyle={`
                    color: var(--black, #000);
                    border: none;
                    `}
                  type="number"
                  placeholder=""
                  value={formData.drinking_per_week}
                  onChange={(e) =>
                    handleInputChange("drinking_per_week", e.target.value)
                  }
                />
                <Unit>회</Unit>
              </InputWrapper>
            </FormRow>

            <FormRow>
              <Label>쇼핑</Label>
              <InputWrapper>
                <span style={{ minWidth: "fit-content" }}>월</span>
                <Inputfield
                  customStyle={`
                    color: var(--black, #000);
                    border: none;
                    `}
                  type="number"
                  placeholder=""
                  value={formData.shopping_per_month}
                  onChange={(e) =>
                    handleInputChange("shopping_per_month", e.target.value)
                  }
                />
                <Unit>회</Unit>
              </InputWrapper>
            </FormRow>

            <FormRow>
              <Label>여가 및 문화생활 소비</Label>
              <InputWrapper>
                <span style={{ minWidth: "fit-content" }}>월</span>
                <Inputfield
                  customStyle={`
                    color: var(--black, #000);
                    border: none;
                    `}
                  type="number"
                  placeholder=""
                  value={formData.culture_per_month}
                  onChange={(e) =>
                    handleInputChange("culture_per_month", e.target.value)
                  }
                />
                <Unit>회</Unit>
              </InputWrapper>
            </FormRow>

            <FormRow>
              <Label>거주유형</Label>
              <InputWrapper>
                <Inputfield
                  customStyle={`
                    color: var(--black, #000);
                  `}
                  type="text"
                  placeholder="거주 유형을 직접 입력해주세요"
                  value={formData.residence_type}
                  onChange={(e) =>
                    handleInputChange("residence_type", e.target.value)
                  }
                />
              </InputWrapper>
            </FormRow>

            <FormRow>
              <Label>통학 여부</Label>
              <ButtonGroup2>
                <CircleButton
                  onClick={() => handleInputChange("commute", true)}
                  customStyle={`
                    width: 90%;
                    height: 2.15625rem;
                    font-size: 0.85rem;
                    background-color: ${
                      formData.commute === true
                        ? "var(--blue, #115BCA)"
                        : "var(--white, #fff)"
                    };
                    color: ${
                      formData.commute === true
                        ? "var(--white, #fff)"
                        : "var(--gray, #A5A5A5)"
                    };
                    border: ${
                      formData.commute === true
                        ? "none"
                        : "1px solid var(--gray, #A5A5A5)"
                    };
                  `}
                >
                  예
                </CircleButton>
                <CircleButton
                  onClick={() => handleInputChange("commute", false)}
                  customStyle={`
                      width: 100%;
                      height: 2.15625rem;
                      font-size: 0.85rem;
                      background-color: ${
                        formData.commute === false
                          ? "var(--blue, #115BCA)"
                          : "var(--white, #fff)"
                      };
                    color: ${
                      formData.commute === false
                        ? "var(--white, #fff)"
                        : "var(--gray, #A5A5A5)"
                    };
                    border: ${
                      formData.commute === false
                        ? "none"
                        : "1px solid var(--gray, #A5A5A5)"
                    };
                  `}
                >
                  아니오
                </CircleButton>
              </ButtonGroup2>
            </FormRow>
          </FormGrid>
        </Section>

        {/* ————————————————————— 가계부 요약본  ————————————————————— */}

        <Section2Header>
          <TitleWrapper>
            <Username>화연이에연</Username>
            <SectionTitle>님의 가계부 요약본</SectionTitle>
          </TitleWrapper>
          <Notice>* 기록시점의 환율 기준</Notice>
        </Section2Header>
        <Section2>
          <CategorySection>
            <CategoryHeader>
              <CategoryTitle>한달평균생활비</CategoryTitle>
              <CategoryAmount>
                {summaryData.average_monthly_living_expense.foreign_currency ===
                "KRW"
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
            </CategoryHeader>
            <CategoryGrid>
              {categoryData.map((category) => (
                <CategoryCard key={category.code} categoryData={category} />
              ))}
            </CategoryGrid>
          </CategorySection>

          <BasicCostSection>
            <BasicCostHeader>
              <BasicCostTitle>기본파견비용</BasicCostTitle>
              <BasicCostAmount>
                {summaryData.base_dispatch_cost.total.foreign_currency === "KRW"
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
            </BasicCostHeader>
            <BasicCostGrid>
              {[
                {
                  code: "flight",
                  label: "항공권",
                  ...summaryData.base_dispatch_cost.flight,
                  budget_diff: null,
                },
                {
                  code: "insurance",
                  label: "보험료",
                  ...summaryData.base_dispatch_cost.insurance,
                  budget_diff: null,
                },
                {
                  code: "visa",
                  label: "비자",
                  ...summaryData.base_dispatch_cost.visa,
                  budget_diff: null,
                },
                {
                  code: "tuition",
                  label: "등록금",
                  ...summaryData.base_dispatch_cost.tuition,
                  budget_diff: null,
                },
              ].map((cost) => (
                <CategoryCard key={cost.code} categoryData={cost} />
              ))}
            </BasicCostGrid>
          </BasicCostSection>
        </Section2>

        {/* ————————————————————— 한줄평 ————————————————————— */}

        <FormRow2 $fullWidth>
          <Section2Header>
            <TitleWrapper>
              <Username>화연이에연</Username>
              <SectionTitle>님이 남긴 한 마디</SectionTitle>
            </TitleWrapper>
            <OptionalNotice>* 선택입력</OptionalNotice>
          </Section2Header>
          <Inputfield
            customStyle={`
            width: 57.00875rem;
            height: 4.55456rem;
            flex-shrink: 0;
            border-radius: 1.177rem;
            border: 1px solid var(--light-gray, #D9D9D9);
            background: var(--text-input, #FCFCFC);
            `}
            type="text"
            placeholder="교통비가 생각보다 많이 들었어요!"
            value={formData.summary_note}
            onChange={(e) => handleInputChange("summary_note", e.target.value)}
          />
        </FormRow2>
      </ContentWrapper>

      {/* —————————————————————————— 모달 —————————————————————————— */}
      <Modal
        isOpen={isModalOpen}
        content="게시하시겠습니까?"
        subtext="게시 후에도 게시물을 수정하실 수 있습니다."
        customContentStyle={`
          font-size: 1.3125rem;
          font-weight: 700;
          `}
        customSubtextStyle={`
          font-size: 0.9rem;
          color: var(--dark-gray);
          `}
        actionText="네"
        cancelText="아니오"
        showCancelButton={true}
        showImage={false}
        onAction={handleConfirmPublish}
        onCancel={() => setIsModalOpen(false)}
        onClose={() => setIsModalOpen(false)}
      />
    </PageWrapper>
  );
};

export default AcctSummaryProfileData;

// —————————————————————————— 스타일링 ——————————————————————————

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--white);
  padding-top: 5.5rem;
`;

const ContentWrapper = styled.div`
  max-width: 70vw;
  margin: 0 auto;
  padding: 2rem 2.56rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  color: var(--black);
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.37rem;
  padding: 1.5rem;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.19rem;
`;

//
// ———————————— 세부 프로필 입력받는 곳 ————————————

const Required = styled.div`
  color: var(--red, #ff0000);
  font-size: 0.925rem;
  font-weight: 500;
  display: flex;
`;

const Optional = styled.div`
  margin-top: 1rem;
  display: flex;
  color: var(--gray, #a5a5a5);
  font-family: "Pretendard Variable";
  font-size: 0.925rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.38125rem; /* 149.324% */
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem 2rem;
  padding: 2rem 2rem 1.67rem 3rem;
  max-width: fit-content;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: baseline;
  grid-column: ${(props) => (props.$fullWidth ? "1 / -1" : "auto")};
`;

const FormRow2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  grid-column: ${(props) => (props.$fullWidth ? "1 / -1" : "auto")};
  margin-top: 1rem;
`;

const Label = styled.span`
  text-align: left;
  min-width: fit-content;
  color: var(--, #000);
  font-family: "Pretendard Variable";
  font-size: 0.925rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.38125rem; /* 149.324% */
`;

const ButtonGroup1 = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  height: 2.15625rem;
  gap: 0.44625rem;
`;

const ButtonGroup2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Section = styled.section`
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

const InputWrapper = styled.div`
  height: 2.15625rem;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--black, #000);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;

  border-radius: 0.28125rem;
  border: 1px solid var(--text-input, #f4f4f4);
  background: var(--text-input, #fcfcfc);
`;

const Unit = styled.span`
  color: var(--black);
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  margin-right: 1.31rem;
`;

const Notice = styled.div`
  color: var(--red, #ff0000);
  font-size: 0.925rem;
  font-weight: 500;
  display: flex;
`;

const OptionalNotice = styled.span`
  color: var(--gray, #a5a5a5);
  font-size: 0.925rem;
  font-weight: 500;
  display: flex;
`;

//
// ———————————— 가계부 요약본 부분 ————————————

const Username = styled.h2`
  color: var(--blue, #115bca);
  margin-left: 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3.06rem;
`;

const Section2Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Section2 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 1px solid var(--light-gray);
  margin: 0;
`;

// ————— 요약본(카테고리) —————

const CategoryHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.89rem;
  flex-wrap: wrap;
  padding: 2rem 2rem 1rem 2rem;
  margin: 1rem 0 0 0;
`;

const CategoryTitle = styled.h2`
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
`;

// ————— 요약본(기본비용) —————

const BasicCostSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BasicCostHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.89rem;
  flex-wrap: wrap;
  padding: 2rem 2rem 1rem 2rem;
`;

const BasicCostTitle = styled.h2`
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
