import React, { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'

const ListItem = ({task,getData}) => {
  const [showModal,setShowModal] = useState(false);

  const deleteData = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
      });
      if(response.status===200){
        getData();
      }
    }catch(err){
      console.error(err);
    }
  }
  return (
    <li className='listitem'>
      <div className='info-container'>
      <TickIcon/>
      <p className='title'>{task.title}</p>
      {/* <p>{task.id}</p> */}
      <ProgressBar progress={task.progress}/>
      </div>
      <div className='button-container'>
        <button className='edit' onClick={( ) => setShowModal(true)}>EDIT</button>
        <button className='delete' onClick={deleteData}>DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
      
    </li>
  )
}

export default ListItem
