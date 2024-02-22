import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState(null);

    // Add the handlesubmit code here
    let handlesubmit = (e) => {
        e.preventDefault();

        let todo = document.getElementById('todoAdd').value;
        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false
        };
        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
        } else {
            alert('Enter valid Task');
        }

        document.getElementById('todoAdd').value = "";
    }


    // Add the deleteToDo code here
    let deleteTodo = (id) => {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }


    // Add the toggleComplete code here
    let toggleComplete = (id) => {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        })
        setTodos(updatedTodos);
    }


    // Add the submitEdits code here
    let submitEdits = (newTodo) => {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === newTodo.id) {
                todo.text = document.getElementById(newTodo.id).value;
            }
            return todo;
        })
        setTodos(updatedTodos);
        setTodoEditing(null)
    }

    useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        } 
    }, [todos])


    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handlesubmit}>
                <input type="text" align="right" id='todoAdd' />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) =>
                <div className="todo" key={todo.id}>
                    <div className="todo-text">
                        {/* add checkbox for toggle complete*/}
                        <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
                        {/* if edit mode display input, else display text*/}
                        {todo.id === todoEditing ?
                            (<input type="text" id={todo.id} defaultValue={todo.text} />) :
                            (<div>{todo.text}</div>)
                        }
                    </div>
                    <div className="todo-actions">
                        {todo.id === todoEditing ?
                            (<button onClick={() => submitEdits(todo)}>Submit Edits</button>) :
                            (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)

                        }
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>)}
        </div>
    );
};
export default App;
