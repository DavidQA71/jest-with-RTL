import { addTodo, getTodos, type Todo } from './todoService';

describe('todoService', () => {
    const fetchMock = jest.fn();

    beforeEach(() => {
        fetchMock.mockReset();
        (globalThis as any).fetch = fetchMock;
    });

    afterEach(() => {
        delete (globalThis as any).fetch;
    });

    test('getTodos: retorna lista cuando response.ok es true', async () => {
        const mockTodos: Todo[] = [
            { id: 1, title: 'Todo 1', completed: false },
            { id: 2, title: 'Todo 2', completed: true },
        ];

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        await expect(getTodos()).resolves.toEqual(mockTodos);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/todos?_limit=3'
        );
    });

    test('getTodos: lanza error cuando response.ok es false', async () => {
        fetchMock.mockResolvedValueOnce({ ok: false });

        await expect(getTodos()).rejects.toThrow('Error al obtener todos');
    });

    test('addTodo: hace POST y retorna el todo creado', async () => {
        const mockCreated: Todo = { id: 101, title: 'Aprender', completed: false };

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCreated,
        });

        await expect(addTodo('Aprender')).resolves.toEqual(mockCreated);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/todos',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Aprender', completed: false }),
            })
        );
    });

    test('addTodo: lanza error cuando response.ok es false', async () => {
        fetchMock.mockResolvedValueOnce({ ok: false });

        await expect(addTodo('Aprender')).rejects.toThrow('Error al agregar todo');
    });
});

