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