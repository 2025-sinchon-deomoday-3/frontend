import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import LoginCircleButton from "../button/LoginCircleButton"

const NavTopbar = () =>{
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // 현재 경로랑 버튼의 route가 같으면 active 상태 (추후 수정 필요)
    const homeActive          = !!useMatch('/home');
    const budgetActive        = !!useMatch('/budget/*'); 
    const accountbookActive   = !!useMatch('/accountbook/*');
    const scrapbookActive     = !!useMatch('/scrapbook/*');

    return(
        <>
            <Wrapper>
                <img src="/icons/Logo.svg" alt="로고" style={{width: "9rem"}}/>

                <NavContainer>
                    <Button onClick={() => navigate('/home')} $active={homeActive}>
                        홈
                    </Button>
                    <Button onClick={() => navigate('/budget')} $active={budgetActive}>
                        예산안
                    </Button>
                    <Button onClick={() => navigate('/accountbook')} $active={accountbookActive}>
                        가계부
                    </Button>
                    <Button onClick={() => navigate('/scrapbook')} $active={scrapbookActive}>
                        스크랩북
                    </Button>
                </NavContainer>

                <LoginCircleButton></LoginCircleButton>
            </Wrapper>
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
