import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState(null);

    useEffect(() => {
        const json = localStorage.getItem('todos');
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem('todos', json);
        }
    }, [todos]);

    // Function to create todo
    function handleSubmit(e) {
        e.preventDefault();

        let todo = document.getElementById('todoAdd').value; // Get the value from todoAdd input field
        const newTodo = {
            // Create a new todo object
            id: new Date().getTime(), // Set the id to the current time
            text: todo.trim(), // Set the text to the value from the input field
            completed: false, // Initialize status to false
        };

        if (newTodo.text.length > 0) {
            // Check if the input field is not empty
            setTodos([...todos].concat(newTodo)); // Add the new todo to the todos array
        } else {
            alert('Enter Valid Task'); // Alert the user if the input field is empty
        }

        document.getElementById('todoAdd').value = ''; // Clear the input field
    }

    // Function to delete todo
    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id); // Filter out the todo with the id to be deleted
        setTodos(updatedTodos); // Set to updated todos
    }

    // Function to toggle complete
    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            // Map through the todos array
            if (todo.id === id) {
                // If the todo id matches the id to be toggled
                todo.completed = !todo.completed; // Toggle the completed status
            }
            return todo; // Return the todo
        });
        setTodos(updatedTodos); // Set to updated todos
    }

    // Function to edit todo
    function submitEdits(newtodo) {
        const updatedTodos = [...todos].map((todo) => {
            // Map through the todos array
            if (todo.id === newtodo.id) {
                // If the todo id matches the id to be edited
                todo.text = document.getElementById(newtodo.id).value; // Set the text to the new value
            }
            return todo; // Return the todo
        });
        setTodos(updatedTodos); // Set to updated todos
        setTodoEditing(null); // Set editing to null
    }

    return (
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" id="todoAdd" />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => (
                <div key={todo.id} className="todo">
                    <div className="todo-text">
                        {/* Add checkbox for toggle complete */}
                        <input
                            type="checkbox"
                            id="completed"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />

                        {/* if it is edit mode, display input box, else display text */}
                        {todo.id === todoEditing ? (
                            <input
                                type="text"
                                id={todo.id}
                                defaultValue={todo.text}
                            />
                        ) : (
                            <div>{todo.text}</div>
                        )}
                    </div>
                    <div className="todo-actions">
                        {/* if it is edit mode, allow submit edit, else allow edit */}
                        {todo.id === todoEditing ? (
                            <button onClick={() => submitEdits(todo)}>
                                Submit Edits
                            </button>
                        ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>
                                Edit
                            </button>
                        )}

                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default App;
