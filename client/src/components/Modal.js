import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

const Modal = ({mode,setShowModal,task,getData}) => {

  const editMode = mode==="edit"?true:false
  const [cookies,SetCookie,removeCookie] = useCookies(null);

  const [data,setData] = useState({
    user_email: editMode ? task.user_email:cookies.Email,
    title:editMode ? task.title:'',
    progress:editMode ? task.progress:50,
    date:editMode ? task.date:new Date() 
  })

  const editData =  async() => {
    // e.preventDefault();
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      })

      if(response.status===200){
        setShowModal(false);
        getData();
      }

    }catch(err){
      console.error(err);
    }
  }

  const postData = async() => {
    // e.preventDefault();
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status===200){
        setShowModal(false);
        getData();
    
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const changeHandler = (e)=>{
    const {name,value}=e.target

    setData(data => ({
      ...data,
      [name]:value
    }))


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
        <label style={{fontSize : "16px"}} htmlFor="range">Drag to select current progress</label>
        <input
        required
        type = "range"
        id="range"
        min="0"
        max="100"
        name='progress'
        value={data.progress}
        onChange={changeHandler}
        />
        <input className = {mode} type = "submit" onClick={editMode?editData:postData}/>
        </form> 
        </div>     
    </div>
  )
}

export default Modal
