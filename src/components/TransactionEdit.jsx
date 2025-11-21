import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import CircleButton from "./button/CircleButton";
import Button from "./button/SquareButton";

const TransactionEdit = forwardRef(
  ({ initialData = null, onSave, onDelete, onClose }, ref) => {
    const [entryType, setEntryType] = useState(
      initialData?.entry_type || "EXPENSE"
    );

    const [formData, setFormData] = useState({
      date: initialData?.date || new Date().toISOString().split("T")[0],
      payment_method: initialData?.payment_method || "CARD",
      category: initialData?.category || "FOOD",
      amount: initialData?.amount || "",
      currency_code: initialData?.currency_code || "USD",
    });

    const categoryOptions = [
      { value: "FOOD", label: "식비" },
      { value: "HOUSING", label: "주거비" },
      { value: "TRANSPORT", label: "교통비" },
      { value: "SHOPPING", label: "쇼핑비" },
      { value: "TRAVEL", label: "여행비" },
      { value: "STUDY_MATERIALS", label: "교재비" },
      { value: "ALLOWANCE", label: "용돈" },
      { value: "ETC", label: "기타" },
    ];

    // 결제수단 옵션은 : 지출일 때만 ?
    const paymentMethodOptions = [
      { value: "CARD", label: "카드" },
      { value: "CASH", label: "현금" },
    ];

    const currencyOptions = [
      { value: "USD", label: "달러 ($)" },
      { value: "KRW", label: "원화 (₩)" },
      { value: "EUR", label: "유로 (€)" },
      { value: "JPY", label: "엔화 (¥)" },
      { value: "GBP", label: "파운드 (£)" },
      { value: "CNY", label: "위안화 (¥)" },
      { value: "CAD", label: "캐나다 달러 (CA$)" },
      { value: "TWD", label: "대만 달러 (NT$)" },
    ];

    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
      if (!formData.date || !formData.category || !formData.amount) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
      }

      // API 요청용 데이터 준비
      const requestData = {
        entry_type: entryType,
        date: formData.date,
        category: formData.category,
        amount: parseFloat(formData.amount),
        currency_code: formData.currency_code,
      };
      if (entryType === "EXPENSE") {
        requestData.payment_method = formData.payment_method;
      }

      if (onSave) {
        onSave(requestData);
      }

      // 등록 때만 초기화 (모달 아닐 때)
      if (!initialData && !onClose) {
        setFormData({
          date: new Date().toISOString().split("T")[0],
          payment_method: "CARD",
          category: "FOOD",
          amount: "",
          currency_code: "USD",
        });
        setEntryType("EXPENSE");
      }
    };

    // 외부에서 handleSave 호출할수ㅇ있ㄱ게함
    useImperativeHandle(ref, () => ({
      handleSave,
    }));

    const handleDelete = () => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        onDelete(initialData?.id);
      }
    };

    return (
      <Container>
        {/* 지출/수입 토글 */}
        <ToggleContainer>
          <CircleButton
            onClick={() => setEntryType("EXPENSE")}
            customStyle={`
            background: ${
              entryType === "EXPENSE" ? "var(--blue)" : "var(--white)"
            };
            color: ${entryType === "EXPENSE" ? "var(--white)" : "var(--black)"};
            border: ${
              entryType === "EXPENSE" ? "none" : "1px solid var(--light-gray)"
            };
            padding: 0.5rem 1.40625rem;
            gap: 0.5rem;
            font-size: 0.84375rem;
            width: 6.79688rem;
            height: 2.48438rem;
          `}
          >
            <ButtonWrapper>
              <IconCircle $active={entryType === "EXPENSE"}>−</IconCircle>
              <span>지출</span>
            </ButtonWrapper>
          </CircleButton>
          <CircleButton
            onClick={() => setEntryType("INCOME")}
            customStyle={`
            background: ${
              entryType === "INCOME" ? "var(--blue)" : "var(--white)"
            };
            color: ${entryType === "INCOME" ? "var(--white)" : "var(--black)"};
            border: ${
              entryType === "INCOME" ? "none" : "1px solid var(--light-gray)"
            };
            padding: 0.70313rem 1.7rem;
            gap: 0.5rem;
            font-size: 0.84375rem;
            width: 6.79688rem;
            height: 2.48438rem;
          `}
          >
            <ButtonWrapper>
              <IconCircle $active={entryType === "INCOME"}>+</IconCircle>
              <span>수입</span>
            </ButtonWrapper>
          </CircleButton>
        </ToggleContainer>

        {/* 입력 폼 */}
        <FormContainer>
          {/* 1행: 발생일 + 결제수단 */}
          <FormRow1>
            <FormGroup style={{ flex: 1 }}>
              <LabelRow>
                <Label>발생일</Label>
              </LabelRow>
              <DateInputWrapper>
                <DateInput
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
                <CalendarIcon
                  src="https://www.figma.com/api/mcp/asset/161dc58a-6ef5-49b2-ac38-dfcf17b9376e"
                  alt="calendar"
                />
              </DateInputWrapper>
            </FormGroup>

            {/* 결제수단 (지출일 때만!) */}
            {entryType === "EXPENSE" && (
              <FormGroup style={{ flex: 1 }}>
                <LabelRow>
                  <Label>결제수단</Label>
                  <Note>*신용카드의 경우 예상환율 적용</Note>
                </LabelRow>
                <Dropdown
                  options={paymentMethodOptions}
                  placeholder={paymentMethodOptions[0].label}
                  onSelect={(option) =>
                    handleInputChange("payment_method", option.value)
                  }
                  customStyle={`
                min-width: 100%;
                  height: 2.53125rem;
                  font-size: 0.84375rem;
                  text-align: center;
                `}
                />
              </FormGroup>
            )}
          </FormRow1>

          {/* 2행: 카테고리 + 금액 + 화폐단위 */}
          <FormRow2>
            <FormGroup style={{ flex: 1 }}>
              <LabelRow>
                <Label>카테고리</Label>
              </LabelRow>
              <Dropdown
                options={categoryOptions}
                placeholder={categoryOptions[0].label}
                onSelect={(option) =>
                  handleInputChange("category", option.value)
                }
                customStyle={`
                height: 2.53125rem;
                font-size: 0.84375rem;
                color: var(--blue);
                text-align: center;
              `}
              />
            </FormGroup>

            <FormGroup style={{ flex: 2 }}>
              <Label>&nbsp;</Label>
              <AmountInput
                type="number"
                placeholder="금액을 입력하세요."
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <LabelRow>
                <Label>화폐단위</Label>
              </LabelRow>
              <Dropdown
                options={currencyOptions}
                placeholder={currencyOptions[0].label}
                onSelect={(option) =>
                  handleInputChange("currency_code", option.value)
                }
                customStyle={`
                height: 2.53125rem;
                font-size: 0.84375rem;
                text-align: center;
              `}
              />
            </FormGroup>
          </FormRow2>
        </FormContainer>

        {/* 등록 모드일 때만 등록하기 버튼 표시 (모달 X) */}
        {!initialData && !onClose && (
          <RegisterButtonContainer>
            <Button
              onClick={handleSave}
              customStyle={`
              width: 17.4375rem;
              height: 3.375rem;
              border-radius: 1.078125rem;
              font-size: 1.3125rem;
              background: var(--blue);
              color: var(--white);
            `}
            >
              <span style={{ color: "var(--white)" }}>등록하기</span>
            </Button>
          </RegisterButtonContainer>
        )}
      </Container>
    );
  }
);

export default TransactionEdit;

//
// ————————————————————— 스타일링 —————————————————————

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const IconCircle = styled.div`
  width: 1.23rem;
  height: 1.23rem;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "var(--white)" : "var(--gray)")};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow1 = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  gap: 0.5rem;
`;

const FormRow2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  gap: 0.5rem;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--black);
  font-size: 0.8rem;
  font-weight: 400;
  min-width: fit-content;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const Note = styled.span`
  color: var(--red);
  font-size: 0.6rem;
  font-weight: 400;
  white-space: nowrap;
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.53125rem;
`;

const DateInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 2.5rem 0 1.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 0.28125rem;
  background: var(--white);
  color: var(--black);
  font-size: 0.84375rem;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: var(--blue);
  }

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const CalendarIcon = styled.img`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.6875rem;
  height: 1.6875rem;
  pointer-events: none;
`;

const AmountInput = styled.input`
  min-width: fit-content;
  height: 2.53125rem;
  padding: 0 1.125rem;

  border: 1px solid var(--light-gray);
  border-radius: 0.28125rem;
  background: #fcfcfc;

  color: var(--black);
  font-size: 0.84375rem;
  font-weight: 500;

  &::placeholder {
    color: #fcfcfc;
  }

  &:focus {
    outline: none;
    border-color: var(--blue);
    background: var(--white);

    &::placeholder {
      color: var(--gray);
    }
  }

  /* 숫자 입력 화살표 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 파폭 */
  appearance: textfield;
  -moz-appearance: textfield;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
`;

const RegisterButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
`;
