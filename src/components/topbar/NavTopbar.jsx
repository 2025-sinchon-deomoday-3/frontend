import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import LoginCircleButton from "../button/LoginCircleButton"
import Modal from "../Modal";

const NavTopbar = () =>{
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    // 현재 경로랑 버튼의 route가 같으면 active 상태 (추후 수정 필요)
    const homeActive          = !!useMatch('/home');
    const budgetActive        = !!useMatch('/budget/*'); 
    const accountbookActive   = !!useMatch('/accountbook/*');
    const scrapbookActive     = !!useMatch('/scrapbook/*');
    const [isLoggedIn, setIsLoggedIn] = React.useState(() => !!localStorage.getItem("token"));

    // 로그인/로그아웃 상태 변화 감지하여 isLoggedIn 갱신
    const location = useLocation();
    React.useEffect(() => {
        const handleStorageChange = () => {
            const loggedIn = !!localStorage.getItem("token");
            setIsLoggedIn(loggedIn);
            // 로그아웃 시 예산안, 가계부, 스크랩북 페이지일 때만 모달 띄우기
            const isBudget = location.pathname.startsWith("/budget");
            const isAccountbook = location.pathname.startsWith("/accountbook");
            const isScrapbook = location.pathname.startsWith("/scrapbook");
            if (
                !loggedIn && (isBudget || isAccountbook || isScrapbook)
            ) {
                setShowModal(true);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [location]);

    // 버튼 클릭 핸들러: 로그인 안했으면 모달, 했으면 이동
    const handleNavClick = (route) => {
        if (isLoggedIn) {
            navigate(route);
        } else {
            setShowModal(true);
        }
    };

    const handleModalAction = () => {
        setShowModal(false);
        navigate('/login');
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return(
        <>
            <Wrapper>
                <img src="/icons/Logo.svg" alt="로고" style={{width: "9rem"}}/>

                <NavContainer>
                    <Button onClick={() => navigate('/home')} $active={homeActive}>
                        홈
                    </Button>
                    <Button onClick={() => handleNavClick('/budget')} $active={budgetActive}>
                        예산안
                    </Button>
                    <Button onClick={() => handleNavClick('/accountbook')} $active={accountbookActive}>
                        가계부
                    </Button>
                    <Button onClick={() => handleNavClick('/scrapbook')} $active={scrapbookActive}>
                        스크랩북
                    </Button>
                </NavContainer>

                <LoginCircleButton></LoginCircleButton>
            </Wrapper>
            {showModal && (
                <Modal
                    isOpen={showModal}
                    content="로그인이 필요한 기능입니다."
                    cancelText="닫기"
                    actionText="로그인하러 가기"
                    onClose={handleCloseModal}
                    onAction={handleModalAction}
                />
            )}
        </>
    );
}

export default NavTopbar;


const Wrapper = styled.div`
    width: 100vw;
    height: 5.5rem;

    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1000;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 2.56rem;

    background-color: var(--white);
`

const NavContainer = styled.div`
    display: flex;
    gap: 2.5rem;
`

const Button = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;

    white-space: nowrap;

    transition: color 0.2s ease;

    color: ${({ $active }) => ($active ? 'var(--black)' : 'var(--gray)')};

    &:hover {
        color: ${({ $active }) => ($active ? 'var(--black)' : '#828282ff')};
    }

    &:focus,
    &:active {
        outline: none;
        box-shadow: none;
        background-color: transparent;
    }
`
