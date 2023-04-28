import './ToDo.css';
import React from 'react';
import InputField from '../Bottom part/Input';

function ToDo() {
    return (
    <div className='Main'>
        <h1 className='h1'>To-Do List</h1>
        <InputField/>     
    </div>);
}
export default ToDo;