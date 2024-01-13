import React, { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';

const App = () =>{
  const [tasks,setTasks] = useState(null)
  const userEmail = 'abhishek@gmail.com'
  const getData = async () =>{
    try{
      const response = await fetch(`http://localhost:8001/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
      // console.log(json);


    }catch(err){
      console.log(err);

    }
  }

  const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date));

  useEffect(()=> getData ,[])




  return (
    <div className='app'>
      <ListHeader listName={' 🏇🏻 To Do List '}/>
      {sortedTasks?.map((task)=> <ListItem key = {task.id} task={task}/>)}
    </div>
  )
}

export default App;
