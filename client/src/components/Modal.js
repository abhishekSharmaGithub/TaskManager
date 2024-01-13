import React, { useState } from 'react'

const Modal = ({mode,setShowModal}) => {

  const editMode = mode==="edit"?true:false
  const [data,setData] = useState({
    user_email:"",
    title:"",
    progress:"",
    date:editMode?"":new Date()
  })
  const changeHandler = (e)=>{
    const {name,value}=e.target

    setData(data => ({
      ...data,
      [name]:value
    }))

    console.log(data);

  }
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title'>
          <h3>
            Lets {mode} your task 
          </h3>
          <button onClick={()=>setShowModal(false)}>X</button>
        </div>
        <form>

        <input
        required
        maxLength={30}
        name="title"
        value={data.title}
        placeholder='input your task'
        onChange={changeHandler} 
        />
        <br/>
        <label style={{fontSize : "16px"}}for="range">Drag to select current progress</label>
        <input
        required
        type = "range"
        min="0"
        max="100"
        name='progress'
        value={data.progress}
        onChange={changeHandler}
        />
        <input className = {mode} type = "submit"/>
   
        </form>
        </div>     
    </div>
  )
}

export default Modal
