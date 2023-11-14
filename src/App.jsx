import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Login} from "./components/Forms/Login/Login.jsx";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
    </>
  )
}

export default App
