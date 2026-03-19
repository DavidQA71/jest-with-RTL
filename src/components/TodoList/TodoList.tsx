import { useState, useEffect } from 'react';
import { addTodo, getTodos, type Todo } from '../../services/todoService';


const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error(error);
        }
        };
    
        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        const title = newTodo.trim();
        if (!title) return;

        try {
            setFeedback(null);
            setIsError(false);

            const createdTodo = await addTodo(title);
            setTodos((prev) => [...prev, createdTodo]);
            setNewTodo('');

            setFeedback('Todo agregado con exito');
        } catch {
            setIsError(true);
            setFeedback('Error al agregar el todo');
        }
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

            {feedback && (
                <p role="status" aria-live="polite" data-testid="feedback" className={isError ? 'error' : ''}>
                    {feedback}
                </p>
            )}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    ); 
}

export default TodoList;