import React, { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';

const App = () =>{
  const [tasks,setTasks] = useState(null)
  const userEmail = 'abhishek@gmail.com'
  const authToken = false;
  const getData = async () =>{
    try{
      const response = await fetch(`http://localhost:8001/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);

    }catch(err){
      console.log(err);

    }
  }

  const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date));

  useEffect(()=> {
    if(authToken){
      getData()
    }
  } ,[])




  return (
    <div className='app'>
      {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listName={' 🏇🏻 To Do List '} task={tasks} getData={getData}/>
      {sortedTasks?.map((task)=> <ListItem key = {task.id} task={task} getData={getData}/>)}
      </>
}
    </div>
  )
}

export default App;
