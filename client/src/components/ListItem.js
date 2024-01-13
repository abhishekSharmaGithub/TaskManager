import React from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'

const ListItem = ({task}) => {
  return (
    <li className='listitem'>
      <div className='info-container'>
      <TickIcon/>
      <p>{task.title}</p>
      {/* <p>{task.id}</p> */}
      <ProgressBar/>
      </div>
      <div className='button-container'>
        <button className='edit'>EDIT</button>
        <button className='delete'>DELETE</button>
      </div>
      
    </li>
  )
}

export default ListItem
