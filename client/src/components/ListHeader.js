import React, { useState } from 'react'
import Modal from './Modal';

const ListHeader = ({listName}) => {
  const [showModal,setShowModal] = useState(false);

    const signOut=() =>{
        console.log(1);
    }
  return (
    <div className='list-header'>

        <h1>{listName}</h1>
        <div className="button-container">
        <button className="create" onClick={()=> setShowModal(true)}>Add Task</button>
        <button className="signout" onClick={signOut}>Sign Out</button>
        </div>
        {showModal&&<Modal mode={'create'} setShowModal={setShowModal}/>}
      
    </div>
  )
}

export default ListHeader
