import React, { useState } from 'react'
import {useCookies} from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie,removeCookie] = useCookies(null);
  const [isLogin,setIsLogin] = useState(true);
  const [error,setError] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [confirmpassword,setConfirmPassword] = useState(null);

  console.log(email,password);

  const viewLogin = (status) => {

    setError(status);
    setIsLogin(status);
  }

  const handleSubmit = async(e,endpoint)=>{
    e.preventDefault();
    if(!isLogin && password!==confirmpassword){
      setError('Password mismatch')
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
      method:'POST',
      headers:{'Content-Type' : 'application/json'},
      body: JSON.stringify({email,password})
    })

    const data = await response.json();
    console.log(data);
    if(data.detail){
    setError(data.detail);
    } else{
      setCookie('Email',data.email)
      setCookie('AuthToken',data.token)
      window.location.reload()

    }

  }

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
          <h2>
            {isLogin ? 'PLEASE LOG IN ' : 'PLEASE SIGN UP!'}
          </h2>
          <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
          <input type = "password" placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}/>
          {!isLogin && <input type="password" placeholder="confirm password" onChange={(e)=>setConfirmPassword(e.target.value)}/>}
          <input type="submit" onClick={(e)=>handleSubmit(e,isLogin?'login':'signup')} className='create'/>
          {error && <p>{error}</p>}
        </form>
        <div className='auth-options'>
          <button onClick={()=> viewLogin(false)}>Sign Up</button>
          <button onClick={()=>viewLogin(true)}>Login</button>
        </div>
      </div>
      
    </div>
  )
}

export default Auth
