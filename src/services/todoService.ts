export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
    
    if (!response.ok) {
        throw new Error('Error al obtener todos');
    }

    return response.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
    });

    if (!response.ok) {
        throw new Error('Error al agregar todo');
    }

    return response.json();
};