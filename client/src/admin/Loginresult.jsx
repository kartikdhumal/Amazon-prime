import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../login/Login'
import Register from '../register/Register';

function Loginresult() {
  const [pressed, setPressed] = useState(false);

function press() {
    if (pressed == false) {
      setPressed(true)
     }
}
const component = pressed ? <Login /> : <Register/>
  return (
    <div onClick={press}>
        {component}
    </div>
  )
}

export default Loginresult
