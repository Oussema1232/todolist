
import React, {useState,useReducer } from 'react';
import './App.css';

function reducer(state,action){
  switch (action.type){
    case "add-todo":
      return{
        todos:[{text:action.value,delete:false,complete:false},...state.todos]
      };
      case "toggle":
        return{
          todos: state.todos.map((todo,index)=>
            index===action.index?{
              ...todo,
              complete:!todo.complete
            }:
            todo
          )   
        };
        case "delete":
          return{
            todos: state.todos.map((todo,index)=>
            (
              index===action.index?{
                ...todo,
                delete:!todo.delete
              }:
              todo
            ))
          }
        default:
          return state;
          
  }
}

function App(){
  const [{todos},dispatch]=useReducer(reducer,{todos:[]});
  const [value,setValue]=useState("");
  
return(
  <div className="App">
    <form onSubmit={
      (e)=>{
        e.preventDefault();
        setValue("");
      }
    }>
    <input value={value} onChange={
    (e)=>setValue(e.target.value)}/>
    <button value={value} onClick={()=>dispatch({type:"add-todo",value})}>Add</button>
    </form>
    
      {todos.map((todo,index)=>(
        <div>
        <div key={todo.text}
        onClick={()=>dispatch({type:"toggle",index})}
        style={{
          textDecoration:todo.complete? "line-through":"",
          userSelect:"none",
          display:todo.delete?"none":"inline-block",
          width:100 
        }}>
          {todo.text}</div>
          {!(todo.delete)?<button value={todo.text} onClick={()=>dispatch({type:"delete",index})}>X</button>:""}
          </div>
      ))}
    
  </div>
);}

export default App;
