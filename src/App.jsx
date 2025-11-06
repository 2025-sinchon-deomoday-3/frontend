import { useState } from 'react'
import './App.css'
import CircleButton from './components/button/CircleButton'

function App() {
  const onClick = () => {
    console.log("버튼 클릭됨!");
  };

  return (
    <>
      <CircleButton
        onClick={onClick}
      >
        게시하기
      </CircleButton>
    </>
  )
}

export default App
