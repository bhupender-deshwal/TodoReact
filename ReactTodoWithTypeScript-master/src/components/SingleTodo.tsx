import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../todoModel';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import "./style.css";
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index:number,
    key: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos,index }) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo?.todo)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      inputRef.current?.focus()
    }, [edit])
    

    const handleEdit = (id: number) => {
        setEdit(true)
    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id))
    }
    const handleDone = (id: number) => {
        setTodos(todos.map((t) => t.id === id ?
            { ...t, isDone: !t.isDone } : t
        ))     
    }
    const handleSubmit = (e:React.FormEvent,id:number) => {
        e.preventDefault();
        setTodos(
            todos.map((t)=> (t.id===id?{...todo,todo:editTodo}:t))
        )
        setEdit(false)
    }
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided)=>(
                    <form className='single_todos' onSubmit={(e)=>{handleSubmit(e,todo.id)}}
                    ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                    {edit?
                    <input value={editTodo}
                    ref={inputRef}
                     onChange={(e)=>setEditTodo(e.target.value)}
                     className='single_todos_text'
                     />:
        
                    todo.isDone ?
                        <s className="single_todos_text">
                            {todo.todo}
                        </s>
                        :
                        <span className="single_todos_text">
                            {todo.todo}
                        </span>
                    }
        
                    <div>
                        <span className="icon" onClick={() => handleEdit(todo.id)}><AiFillEdit /></span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
                        <span className="icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
                    </div>
        
                </form>
                )
            }
      
        </Draggable>
    )
}

export default SingleTodo