
import './App.css';
import ToDoList from './ToDoList';
//state is used for rerendering
//usereff to refference items in html
//useEffect-localstorage
import React, { useState, useRef , useEffect} from 'react';
//npm i uuid (generating random ids library)npm install uuid
const { v4: uuidv4 } = require('uuid');

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  //todos=every todo in our state list
  //setTodos= function we call to update todos
const [todos, setTodos] = useState([/*'todo 1', 'todo 2' */])
const todoNameRef = useRef()
//loading todos
useEffect(()=>{
const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
if (storedTodos) setTodos(storedTodos)
}, [])
//useffect takes functions as parameters
//we call first func when something changes based on an array
useEffect(() => {
localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function toggleTodo(id){
  const newTodos=[...todos]
  const todo= newTodos.find(todo=> todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)

}

function handleAddTodo (e){
const name = todoNameRef.current.value
if (name === '') return
setTodos(prevTodos => {
  return [...prevTodos,{ id: uuidv4(),name:name, complete:false}]
})
//for clearing input after sending
todoNameRef.current.value = null;
}

function handleClearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}
  return (
    //jsx can't return more than 1 element so we wrap in an empty element
    <>
<ToDoList todos={todos} toggleTodo={toggleTodo}/>
<input ref={todoNameRef} type="text" />
<button onClick={handleAddTodo}>Add Todo</button>
<button onClick={handleClearTodos}>Clear Completed ToDos</button>
<div>{todos.filter(todo => !todo.complete).length} left ToDos</div>
</>
  )
}

export default App;
