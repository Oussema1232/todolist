import React, { useState, useReducer, useEffect } from "react";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [
          { text: action.value, complete: false, deleted: false },
          ...state.todos,
        ],
      };

    case "toggle":
      return {
        todos: state.todos.map((todo, i) =>
          i === action.index
            ? {
                ...todo,
                complete: !todo.complete,
              }
            : todo
        ),
      };

    case "delete":
      return {
        todos: state.todos.map((todo, i) =>
          i === action.index
            ? {
                ...todo,
                deleted: !todo.deleted,
              }
            : todo
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] }, () => {
    const update = localStorage.getItem("todos");
    return update ? { todos: JSON.parse(update) } : { todos: [] };
  });
  const [value, setValue] = useState("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <h2 className="title">todo or not todo</h2>
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="inputfield"
        />
        <button
          onClick={() => {
            if (value !== "") {
              dispatch({ type: "add-todo", value });
              setValue("");
            }
          }}
          className="buttonadd"
        >
          Add
        </button>
      </form>

      {todos.map((todo, index) => (
        <div
          style={{
            display: todo.deleted ? "none" : "flex",
            justifyContent: "space-between",
            border: "5px solid #eee",
            paddingLeft: 10,
            width: "700px",
            alignSelf: "center",
            fontFamily: "Baloo Paaji 2, cursive",
            marginBottom: 6,
            backgroundColor: "darkslategrey",
            userSelect: "none",
          }}
        >
          <div
            key={todo.text}
            onClick={() => dispatch({ type: "toggle", index })}
            style={{
              textDecoration: todo.complete ? "line-through" : "",
              textDecorationColor: "black",
              color: "white",
              cursor: "pointer",
              fontSize: "large",
              minHeight: 35,
              maxHeight: 50,
              overflow: "auto",
            }}
          >
            {todo.text}
          </div>
          <button
            onClick={() => dispatch({ type: "delete", index })}
            className="buttondelete"
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
