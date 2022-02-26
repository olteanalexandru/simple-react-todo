//use rfc to create main template
import React from "react"
import Todo from "./Todo"
export default function ToDoList({todos,toggleTodo}) {
    return (
     todos.map(todo =>{
         //key allows react to only rerender element that are changed
         return < Todo key={todo.id} toggleTodo={toggleTodo}  todo={todo} />
     })
    )
}
