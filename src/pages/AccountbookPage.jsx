import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import NavTopbar from "../components/topbar/NavTopbar";
import TransactionEdit from "../components/TransactionEdit";
import TransactionItem from "../components/TransactionItem";
import CategoryCard from "../components/CategoryCard";
import CircleButton from "../components/button/CircleButton";
import Button from "../components/button/SquareButton";

const AccountbookPage = () => {
  const navigate = useNavigate();

  // 모달에서 사용할 TransactionEdit ref
  const editFormRef = React.useRef(null);

  // 지출 or 수입?
  const [transactionType, setTransactionType] = useState("expense");
  const [viewType, setViewType] = useState("daily");

  // TransactionEdit 컴포넌트 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // 거래 내역 리스트(..인데, 실제 사용 시 API에서 가져올거)
  // API: GET /ledgers/date/ (일별 조회)
  // API: GET /ledgers/category/ (카테고리별 조회)
  const [transactions, setTransactions] = useState([]);

  // 선택된 월 (YYYY-MM 형식)
  const [selectedMonth, setSelectedMonth] = useState("2025-11");

  // 가계부 요약본 게시 상태
  const [isSummaryPublished, setIsSummaryPublished] = useState(false);

  // 이번달 수입/지출 데이터 (API: GET /ledgers/thisMonth/)
  const [monthlyExpense, setMonthlyExpense] = useState({
    foreign_amount: 0,
    foreign_currency: "USD",
    krw_amount: 0,
  });
  const [monthlyIncome, setMonthlyIncome] = useState({
    foreign_amount: 0,
    foreign_currency: "USD",
    krw_amount: 0,
  });

  // 파견기간내 수입/지출 데이터 (API: GET /ledgers/totalMonth/)
  const [totalExpense, setTotalExpense] = useState({
    foreign_amount: 0,
    foreign_currency: "USD",
    krw_amount: 0,
  });
  const [totalIncome, setTotalIncome] = useState({
    foreign_amount: 0,
    foreign_currency: "USD",
    krw_amount: 0,
  });

  // 기본파견비용 데이터 (API에서 받아올 데이터)
  const [baseDispatchCost, setBaseDispatchCost] = useState({
    airfare: {
      foreign_amount: 0,
      foreign_currency: "USD",
      krw_amount: 0,
      krw_currency: "KRW",
    },
    insurance: {
      foreign_amount: 0,
      foreign_currency: "USD",
      krw_amount: 0,
      krw_currency: "KRW",
    },
    visa: {
      foreign_amount: 0,
      foreign_currency: "USD",
      krw_amount: 0,
      krw_currency: "KRW",
    },
    tuition: {
      foreign_amount: 0,
      foreign_currency: "USD",
      krw_amount: 0,
      krw_currency: "KRW",
    },
    total: {
      foreign_amount: 0,
      foreign_currency: "USD",
      krw_amount: 0,
      krw_currency: "KRW",
    },
  });

  const handleMonthPrev = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    setSelectedMonth(`${prevYear}-${String(prevMonth).padStart(2, "0")}`);
  };

  const handleMonthNext = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    setSelectedMonth(`${nextYear}-${String(nextMonth).padStart(2, "0")}`);
  };

  const handlePublish = () => {
    // API: POST /summaries/snapshot/ (가계부 요약본 등록)
    // 세부 프로필 데이터를 포함하여 POST 요청으로 API 연결하면 되겠다
    navigate("/summaries/loading");
  };

  // 모달 열기/닫기 (수정 시에만 사용)
  const handleOpenModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  // API: POST /ledgers/fill/ (등록)
  const handleRegisterTransaction = (data) => {
    if (!data) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 실제 API 호출: POST /ledgers/fill/ (서버필요)
    const newTransaction = {
      ...data,
      id: Date.now(), // 임시 ID (서버필요)
      // 서버에서 계산해가지고 받아와야 하는데 API 연결 안돼서 걍 환율 아무렇게나 써놨음
      amount_converted: data.amount * 1430, // 임시 환율
      converted_currency_code: data.currency_code === "KRW" ? "USD" : "KRW",
    };
    setTransactions((prev) => [...prev, newTransaction]);

    // 폼 초기화는 TransactionEdit 컴포넌트에서 처리
  };

  // API: PUT /ledgers/fill/<int:ledger_id>/ (수정)
  const handleSaveTransaction = (data) => {
    if (!data || !editingTransaction) return;

    // 실제 API 호출: PUT /ledgers/fill/<int:ledger_id>/
    // 서버에서 환산 데이터를 받아와야 하지만 임시로 계산
    const updatedTransaction = {
      ...data,
      id: editingTransaction.id,
      amount_converted: data.amount * 1430, // 임시 환율
      converted_currency_code: data.currency_code === "KRW" ? "USD" : "KRW",
    };

    setTransactions((prev) =>
      prev.map((t) => (t.id === editingTransaction.id ? updatedTransaction : t))
    );
    handleCloseModal();
  };

  // API: DELETE /ledgers/fill/<int:ledger_id>/
  const handleDeleteTransaction = (id) => {
    if (!id) return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    handleCloseModal();
  };

  // 내 게시글 ㄱㄱ
  const handleGoToMyPost = () => {
    // API: GET /summaries/snapshot/<int:snapshot_id>/
    navigate("/summaries/snapshot");
  };

  // 일별 daily 뷰
  const renderDailyTransactions = () => {
    // 실제 API 호출 시에는 dailyData 사용 ⭐
    // API: GET /ledgers/date/
    // const dailyData = API에서 받아온 데이터;
    // API는 월별로 그룹화된 데이터를 반환: data = [{ month: "2025-11", days: [...] }, ...]

    // transactions를 날짜별로 묶어둠
    const grouped = {};
    transactions
      .filter((t) => t.date && t.date.startsWith(selectedMonth)) // 선택된 ""월"" 데이터만 필터링
      .forEach((transaction) => {
        const date = transaction.date;
        if (!grouped[date]) {
          grouped[date] = {
            items: [],
            weekday_ko: ["일", "월", "화", "수", "목", "금", "토"][
              new Date(date).getDay()
            ],
          };
        }
        grouped[date].items.push(transaction);
      });

    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    return sortedDates.map((date) => (
      <DateGroup key={date}>
        <DateHeader>
          <DateDay>{new Date(date).getDate()}일</DateDay>
          <DateWeekday>{grouped[date].weekday_ko}</DateWeekday>
        </DateHeader>
        <TransactionItemsWrapper>
          {grouped[date].items.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onClick={() => handleOpenModal(transaction)}
            />
          ))}
        </TransactionItemsWrapper>
      </DateGroup>
    ));
  };

  // 카테고리별 집계 데이터 생성
  const getCategoryData = () => {
    // 실제 API 호출하면? API 데이터 걍 그대로 사용
    // const categoryData = API에서 받아온 data.categories;
    // 일단 임시로.. transactionsㄹ,ㄹ 카테고리별 집계해둠
    const categoryMap = {};
    const categoryLabels = {
      FOOD: "식비",
      HOUSING: "주거비",
      TRANSPORT: "교통비",
      SHOPPING: "쇼핑비",
      TRAVEL: "여행비",
      STUDY_MATERIALS: "교재비",
      ALLOWANCE: "용돈",
      ETC: "기타",
    };

    transactions
      .filter((t) => t.entry_type === "EXPENSE")
      .filter((t) => t.date && t.date.startsWith(selectedMonth)) // 선택된 월 필터링 추가
      .forEach((transaction) => {
        const category = transaction.category;
        if (!categoryMap[category]) {
          categoryMap[category] = {
            code: category,
            label: categoryLabels[category] || category,
            foreign_amount: 0,
            foreign_currency: transaction.currency_code,
            krw_amount: 0,
            krw_currency: "KRW",
            budget_diff: null, // API에서 받아온 예산 차이 데이터
          };
        }
        categoryMap[category].foreign_amount += parseFloat(
          transaction.amount || 0
        );
        categoryMap[category].krw_amount += parseFloat(
          transaction.amount_converted || 0
        );
      });

    return Object.values(categoryMap);
  };

  // 카테고리별 뷰 렌더링
  const renderCategoryView = () => {
    const categoryData = getCategoryData();

    if (categoryData.length === 0) {
      return (
        <EmptySection>
          <EmptyMessage>카테고리별 지출 내역이 없습니다.</EmptyMessage>
        </EmptySection>
      );
    }

    // 실제 API 호출하면 주석 해제해서 쓰면댐
    // const { living_expense, living_expense_budget_diff, categories, base_dispatch_cost } = API 데이터;
    const totalSpent = categoryData.reduce(
      (sum, cat) => sum + cat.foreign_amount,
      0
    );
    const totalSpentKRW = categoryData.reduce(
      (sum, cat) => sum + cat.krw_amount,
      0
    );
    const foreignCurrency = categoryData[0]?.foreign_currency || "USD";

    return (
      <>
        {/* 이번달 생활비 섹션 */}
        <CategoryHeader>
          <CategoryTitle>이번달 생활비</CategoryTitle>
          <CategoryAmount>
            {foreignCurrency === "KRW" ? "₩" : "$"}
            {totalSpent.toFixed(2)} (₩{totalSpentKRW.toLocaleString()})
          </CategoryAmount>
        </CategoryHeader>

        {/* 예산대비 메시지는 API 명ㄱ결을 해야해(API에서 living_expense_budget_diff 사용) */}
        {/* <BudgetMessage>
          예산대비: {foreignCurrency === "KRW" ? "₩" : "$"}{budget_diff} 더 적게 썼어요!
        </BudgetMessage> */}

        {/* 카테고리별 카드 */}
        <CategoryCardsGrid>
          {categoryData.map((category) => (
            <CategoryCard key={category.code} categoryData={category} />
          ))}
        </CategoryCardsGrid>
        <BasicCostSection>
          <BasicCostHeader>
            <BasicCostTitle>기본파견비용</BasicCostTitle>
            <BasicCostAmount>
              {baseDispatchCost.total.foreign_currency === "KRW" ? "₩" : "$"}
              {parseFloat(baseDispatchCost.total.foreign_amount).toFixed(2)} (₩
              {parseFloat(baseDispatchCost.total.krw_amount).toLocaleString()})
            </BasicCostAmount>
          </BasicCostHeader>
          <BasicCostGrid>
            {[
              {
                code: "airfare",
                label: "항공권",
                ...baseDispatchCost.airfare,
                budget_diff: null,
              },
              {
                code: "insurance",
                label: "보험료",
                ...baseDispatchCost.insurance,
                budget_diff: null,
              },
              {
                code: "visa",
                label: "비자",
                ...baseDispatchCost.visa,
                budget_diff: null,
              },
              {
                code: "tuition",
                label: "등록금",
                ...baseDispatchCost.tuition,
                budget_diff: null,
              },
            ].map((cost) => (
              <CategoryCard key={cost.code} categoryData={cost} />
            ))}
          </BasicCostGrid>
        </BasicCostSection>
        {/* 기본파견비용도 API 가 필요(아마? API에서 base_dispatch_cost 사용) */}
        {/* <BaseCostSection>
          <BaseCostTitle>기본파견비용</BaseCostTitle>
          <BaseCostGrid>
            요기 항공권, 보험료, 비자, 등록금 카드 표시
          </BaseCostGrid>
        </BaseCostSection> */}
      </>
    );
  };

  return (
    <>
      <NavTopbar />
      <PageContainer>
        <PageTitle>가계부</PageTitle>
        <Wrapper>
          <MainContent>
            {/* TransactionEdit : 걍 컴포넌트 만들었음.. */}
            {isModalOpen && (
              <ModalOverlay onClick={handleCloseModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                  <TransactionEdit
                    ref={editFormRef}
                    initialData={editingTransaction}
                    onSave={handleSaveTransaction}
                    onDelete={handleDeleteTransaction}
                    onClose={handleCloseModal}
                  />
                  <ModalButtonContainer>
                    <Button
                      onClick={() =>
                        handleDeleteTransaction(editingTransaction?.id)
                      }
                      customStyle={`
                        width: 100%;
                        height: 2.53125rem;
                        border-radius: 0.52734375rem;
                        background: var(--light-gray);
                        color: var(--black);
                        font-size: 0.925rem;
                        font-weight: 500;
                      `}
                    >
                      삭제하기
                    </Button>
                    <Button
                      onClick={() => editFormRef.current?.handleSave()}
                      customStyle={`
                        width: 100%;
                        height: 2.53125rem;
                        border-radius: 0.52734375rem;
                        background: var(--blue);
                        color: var(--white);
                        font-size: 0.925rem;
                        font-weight: 500;
                      `}
                    >
                      <span style={{ color: "var(--white)" }}>
                        수정사항 저장하기
                      </span>
                    </Button>
                  </ModalButtonContainer>
                </ModalContent>
              </ModalOverlay>
            )}
            {/* 거래 등록 영역 */}
            <TransactionEditContainer>
              <TransactionEdit
                initialData={null}
                onSave={handleRegisterTransaction}
                onDelete={null}
                onClose={null}
              />
            </TransactionEditContainer>
            <DateAndTabRow>
              <DateSelector>
                <DateButton onClick={handleMonthPrev}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M15 5L8 12.5L15 20"
                      stroke="var(--gray)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </DateButton>

                <DateDisplay>
                  <h2>{selectedMonth.split("-")[1]}월</h2>
                </DateDisplay>

                <DateButton onClick={handleMonthNext}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M10 20L17 12.5L10 5"
                      stroke="var(--gray)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </DateButton>
              </DateSelector>

              <TabContainer>
                <CircleButton
                  onClick={() => setViewType("daily")}
                  customStyle={`
              width: 5.625rem;
              height: 2.484375rem;
              background: ${
                viewType === "daily" ? "var(--blue)" : "var(--white)"
              };
              color: ${viewType === "daily" ? "var(--white)" : "var(--black)"};
              border: ${
                viewType === "daily"
                  ? "none"
                  : "0.046875rem solid var(--light-gray)"
              };
              font-size: 0.925rem;
            `}
                >
                  일별
                </CircleButton>
                <CircleButton
                  onClick={() => setViewType("category")}
                  customStyle={`
              width: 5.625rem;
              height: 2.484375rem;
              background: ${
                viewType === "category" ? "var(--blue)" : "var(--white)"
              };
              color: ${
                viewType === "category" ? "var(--white)" : "var(--black)"
              };
              border: ${
                viewType === "category"
                  ? "none"
                  : "0.046875rem solid var(--light-gray)"
              };
              font-size: 0.925rem;
            `}
                >
                  카테고리별
                </CircleButton>
              </TabContainer>
            </DateAndTabRow>{" "}
            {/* 가계부 내역.. 인데 없으면 뭐라고 할 지 딱히 안적어두셔서 */}
            {viewType === "daily" ? (
              <TransactionList>
                {transactions.length === 0 ? (
                  <EmptyMessage>거래 내역이 없습니다.</EmptyMessage>
                ) : (
                  <DailyViewContainer>
                    {renderDailyTransactions()}
                  </DailyViewContainer>
                )}
              </TransactionList>
            ) : (
              <CategoryViewContainer>
                {renderCategoryView()}
              </CategoryViewContainer>
            )}
          </MainContent>

          {/* ————————————————————————————— 사이드(?) ————————————————————————————— */}
          <Sidebar>
            {/* ""이번 달"" - API: GET /ledgers/thisMonth/ */}
            <SummaryCard>
              <SummaryTitle>이번달 수입/지출</SummaryTitle>
              <SummaryContent>
                <SummaryRow>
                  <SummaryLabel>지출</SummaryLabel>
                  <SummaryValues>
                    <SummaryValue $type="expense">
                      - {monthlyExpense.foreign_currency === "KRW" ? "₩" : "$"}
                      {monthlyExpense.foreign_amount.toFixed(2)}
                    </SummaryValue>
                    <SummarySubValue>
                      - ₩{monthlyExpense.krw_amount.toLocaleString()}
                    </SummarySubValue>
                  </SummaryValues>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>수입</SummaryLabel>
                  <SummaryValues>
                    <SummaryValue $type="income">
                      + {monthlyIncome.foreign_currency === "KRW" ? "₩" : "$"}
                      {monthlyIncome.foreign_amount.toFixed(2)}
                    </SummaryValue>
                    <SummarySubValue>
                      + ₩{monthlyIncome.krw_amount.toLocaleString()}
                    </SummarySubValue>
                  </SummaryValues>
                </SummaryRow>
              </SummaryContent>
            </SummaryCard>

            {/* ""파견기간"" 내에서.. - API: GET /ledgers/totalMonth/ */}
            <SummaryCard>
              <SummaryTitle>파견기간내 수입/지출</SummaryTitle>
              <SummaryContent>
                <SummaryRow>
                  <SummaryLabel>지출</SummaryLabel>
                  <SummaryValues>
                    <SummaryValue $type="expense">
                      - {totalExpense.foreign_currency === "KRW" ? "₩" : "$"}
                      {totalExpense.foreign_amount.toFixed(2)}
                    </SummaryValue>
                    <SummarySubValue>
                      - ₩{totalExpense.krw_amount.toLocaleString()}
                    </SummarySubValue>
                  </SummaryValues>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>수입</SummaryLabel>
                  <SummaryValues>
                    <SummaryValue $type="income">
                      + {totalIncome.foreign_currency === "KRW" ? "₩" : "$"}
                      {totalIncome.foreign_amount.toFixed(2)}
                    </SummaryValue>
                    <SummarySubValue>
                      + ₩{totalIncome.krw_amount.toLocaleString()}
                    </SummarySubValue>
                  </SummaryValues>
                </SummaryRow>
              </SummaryContent>
            </SummaryCard>

            {/* 게시하기 / 내 게시글 바로가기 버튼 */}
            <ButtonGroup>
              <Button
                onClick={handlePublish}
                disabled={transactions.length === 0 || isSummaryPublished}
                customStyle={`
              width: 100%;
              height: 3.609375rem;
              padding: 1.078125rem 1.5rem;
              border-radius: 0.97744rem;
              font-size: 1.125rem;
              background: ${
                transactions.length === 0 || isSummaryPublished
                  ? "var(--gray)"
                  : "var(--blue)"
              };
            `}
              >
                내 가계부 요약본 게시하기
              </Button>

              <Button
                onClick={handleGoToMyPost}
                disabled={!isSummaryPublished}
                customStyle={`
              width: 100%;
              height: 3.609375rem;
              padding: 1.078125rem 1.5rem;
              border-radius: 0.97744rem;
              font-size: 1.125rem;
              background: ${isSummaryPublished ? "var(--blue)" : "var(--gray)"};
            `}
              >
                내 게시글 바로가기
              </Button>
            </ButtonGroup>
          </Sidebar>
        </Wrapper>
      </PageContainer>
    </>
  );
};

export default AccountbookPage;

//
// ————————————————————— 스타일링 —————————————————————

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h2`
  width: 100%;
  max-width: calc(38rem + 2rem + 16rem);
  color: var(--black);
  text-align: left;
  margin-bottom: 1.5rem;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: calc(38rem + 2rem + 16rem);
  margin: 0 auto;
  min-height: calc(100vh - 5.5rem - 1.25rem);
  display: grid;
  grid-template-columns: 45fr 32fr;
  gap: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  h2 {
    color: var(--black);
    text-align: left;
    margin-bottom: 0.5rem;
  }
`;

const TransactionEditContainer = styled.div`
  width: 100%;
  padding: 1rem 0.88rem 1rem 0.88rem;
  border: 1px solid var(--light-gray);
  border-radius: 1.078125rem;
  background: var(--white);
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 2.81rem;
`;

const DateAndTabRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

const DateDisplay = styled.div`
  h2 {
    color: var(--black);
    margin: 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;

  align-self: flex-end;
`;

const TransactionList = styled.div`
  width: 100%;
  min-height: 30rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 2rem;
  border-radius: 0.97744rem;
  border: 1px solid var(--light-gray);
  background: var(--white);
`;

const EmptyMessage = styled.p`
  color: var(--gray);
  font-size: 1.125rem;
  font-weight: 400;
`;

const Sidebar = styled.aside`
  max-width: 16rem;
  display: flex;
  flex-direction: column;
  gap: 1.9rem;
`;

const SummaryCard = styled.div`
  width: 100%;
  padding: 2.25rem 1.9rem 2.25rem 1.9rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  border-radius: 0.97744rem;
  border: 1px solid var(--light-gray);
  background: var(--white);
`;

const SummaryTitle = styled.h2`
  color: var(--black);
  font-size: 1.3125rem;
  font-weight: 700;
  text-align: left;
  margin-bottom: 1rem;
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryLabel = styled.span`
  color: var(--black);
  font-size: 1.125rem;
  font-weight: 560;
  text-align: left;
  margin-left: 0.5rem;
`;

const SummaryValues = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-end;
  margin-right: 0.5rem;
`;

const SummaryValue = styled.span`
  color: ${({ $type }) =>
    $type === "income" ? "var(--blue)" : "var(--black)"};
  font-size: 1.125rem;
  font-weight: 700;
`;

const SummarySubValue = styled.span`
  color: var(--gray);
  font-size: 0.925rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const DailyViewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const DateGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1.344rem;
  padding: 0.5rem 0;
`;

const DateHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.172rem;
  min-width: 3rem;
  padding-top: 0.5rem;
`;

const DateDay = styled.span`
  color: var(--black);
  font-size: 0.925rem;
  font-weight: 700;
`;

const DateWeekday = styled.span`
  color: var(--black);
  font-size: 0.925rem;
  font-weight: 500;
`;

const TransactionItemsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 0.792rem;
  overflow: hidden;
  background: var(--white);
  gap: 0.5rem;
`;

const CategoryViewContainer = styled.div`
  width: 100%;
  min-height: 30rem;
  padding: 2rem;
  border-radius: 0.97744rem;
  border: 1px solid var(--light-gray);
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.89rem;
  flex-wrap: wrap;
`;

const CategoryTitle = styled.h2`
  color: var(--black);
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0;
`;

const CategoryAmount = styled.span`
  color: var(--blue);
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
`;

const CategoryCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.8125rem, 1fr));
  gap: 0.7rem;
  width: 100%;
`;

const BasicCostSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 100%;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0 ;
  width: 100%;
`;

const EmptySection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 40rem;
  padding: 1rem 1.0625rem 1.5rem 1.0625rem;
  background: var(--white);
  border-radius: 0.97744rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1.5rem;
`;
