import React from "react";
import styled from "styled-components";
import ModalAlertImage from "../assets/Modal_alert.svg";
import Button from "./button/SquareButton";

const Modal = ({
  isOpen = false,
  content = "", // 내용
  subtext = "", // 부연설명은 안 넣어도 ㄱㅊ
  actionText = "확인", // action(?) 버튼 텍스트
  cancelText = "취소", // Cancel 버튼 텍스트
  showCancelButton = true, // Cancel 버튼 표시 O/X
  showImage = true, // 이미지 표시 O/X
  onAction,
  onCancel,
  onClose,
}) => {
  if (!isOpen) return null; //안열려읶면 렌더링X

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    if (onClose) {
      onClose();
    }
  };

  //
  // ————————————————————— 마크업/로직 ————————————————————————

  return (
    <ModalBackdrop>
      <ModalContainer>
        <ModalContentWrapper>
          {showImage && <StyledModalImage src={ModalAlertImage} alt="알림" />}
          <h2>{content}</h2>
          {subtext && (
            <span className="body1">{subtext}</span>
          )}
        </ModalContentWrapper>

        <ButtonContainer>
          {showCancelButton && (
            <Button
              onClick={handleCancel}
              customStyle={`background: var(--light-gray, #f4f4f4); color: var(--black); height: 2.55469rem; display: flex; justify-content: center; align-items: center;`}
            >
              <span className="body1" style={{width: '100%', textAlign: 'center'}}>{cancelText}</span>
            </Button>
          )}
          <Button
            onClick={handleAction}
            customStyle={`height: 2.55469rem; display: flex; justify-content: center; align-items: center;`}
          >
            <span className="body1" style={{width: '100%', textAlign: 'center'}}>{actionText}</span>
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default Modal;

//
// —————————————————————  스타일링 ————————————————————————

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: var(--white, #fff);
  border-radius: 1.05469rem;
  box-shadow: 0 12px 30px -6px rgba(88, 92, 95, 0.16);
  padding: 2rem 1.125rem 1rem 1.125rem;
  width: 21.32rem;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.27244rem;
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .body1{
    color: var(--gray);
  }
`;

const StyledModalImage = styled.img`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

//
// —————— 버튼 텍스트 색상만 ———————

const ButtonContainer = styled.div`
  // 참고 : ButtonContainer = ( handleCancel + handleAction )
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;