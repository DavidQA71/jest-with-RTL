import { useState } from 'react';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        const newItem = {
            id: todos.length + 1,
            title: newTodo,
            completed: false
        };
        setTodos([...todos, newItem]);
        setNewTodo('');
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input 
                type="text" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
                placeholder='Add a new todo' />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    ); 
}

export default TodoList;