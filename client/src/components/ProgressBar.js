import React from 'react'

const ProgressBar = ({progress}) => {
  const generateRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
  };
  return (
    <div className='outer-bar'>
      <div className='inner-bar'
        style = {{width:`${progress}%` , backgroundColor : generateRandomColor()}}
        >

      </div>
      
      
      
    </div>
  )
}

export default ProgressBar
