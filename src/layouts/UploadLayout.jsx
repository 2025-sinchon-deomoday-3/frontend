import UploadTopbar from '../components/topbar/UploadTopbar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function UploadLayout() {
  return (
    <LayoutWrapper>
      <UploadTopbar />
      <Content>
        <Outlet /> {/* ← 여기에 각 페이지가 들어감 */}
      </Content>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
`

const Content = styled.main`
  padding-top: calc(5.5rem + 2rem); /* UploadTopbar 높이 + 여백 */
  min-height: calc(100vh - 5.5rem);
  
  display: flex;
  flex-direction: column;
  align-items: center;
`