import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../todoModel';
import SingleTodo from './SingleTodo';
import "./style.css";

interface TodosProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedList:Todo[];
    setCompletedList:React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList: React.FC<TodosProps> = ({ todos, setTodos,completedList,setCompletedList }) => {
    return (
        <div className="container">
            <Droppable droppableId='todosList'>
                {
                    (provided, snapshot) => (
                        <div
                          className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            <span className='todos_heading'>
                                Active Tasks
                            </span>
                            {todos?.map((todo,index) =>
                                <SingleTodo todo={todo} todos={todos} key={todo?.id} setTodos={setTodos} index={index}/>
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='completedList'>
                {
                    (provided,snapshot) => (
                        <div 
                        className={`todos  ${
                            snapshot.isDraggingOver ? "dragcomplete" : "remove"
                          }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            <span className='todos_heading'>
                                Completed Tasks
                            </span>
                            {completedList?.map((todo,index) =>
                                <SingleTodo todo={{...todo,isDone:true}} todos={completedList} key={todo?.id} setTodos={setCompletedList} index={index} />
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>
        </div>
    )
}

export default TodoList