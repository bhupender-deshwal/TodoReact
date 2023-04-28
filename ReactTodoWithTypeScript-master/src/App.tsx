import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import "./App.css";
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './todoModel';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedList, setCompletedList] = useState<Todo[]>([])

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos,{id:Date.now(),todo,isDone:false}]);
      setTodo('');
    }
  }
  const handleDragEnd =(result:DropResult)=>{
    const{source,destination}=result
    
    if(!destination)
    return;
    if(source.droppableId ===destination.droppableId && source.index ===destination.index){
      return
    }
    let add;
    let active=todos;
   let complete=completedList;

    if(source.droppableId==="todosList"){
      add= active[source.index];
      active.splice(source.index,1)
    }else{
      add= complete[source.index];
      complete.splice(source.index,1)
    }

    if(destination.droppableId==="todosList"){
      active.splice(destination.index,0,add)
    }else{
      complete.splice(destination.index,0,add)
    }
setCompletedList(complete)
setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} 
      completedList={completedList}
      setCompletedList={setCompletedList}
      />
    </div>
    </DragDropContext>
  )
}

export default App
