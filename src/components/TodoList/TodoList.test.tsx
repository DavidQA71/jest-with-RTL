import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';
import { addTodo, getTodos, type Todo } from '../../services/todoService';

jest.mock('../../services/todoService'); // mockeamos el módulo del servicio para controlar las respuestas en los tests

const mockedGetTodos = getTodos as jest.MockedFunction<typeof getTodos>;
const mockedAddTodo = addTodo as jest.MockedFunction<typeof addTodo>;

const createdTodo: Todo = { id: 999, title: 'Aprender testing', completed: false };

const setup = () => {
    const user = userEvent.setup();
    render(<TodoList />);

    return {
        user,
        title: screen.getByRole('heading', { name: /todo list/i }),
        input: screen.getByPlaceholderText(/add a new todo/i),
        addButton: screen.getByRole('button', { name: /add todo/i }),
    };
};

describe('TodoList', () => {
    beforeEach(() => {
        // antes de cada test, devolvemos por defecto una lista vacía de todos
        mockedGetTodos.mockResolvedValue([]);
        mockedAddTodo.mockResolvedValue(createdTodo);
    });

    afterEach(() => {
        // limpiamos el estado de los mocks para que cada test sea independiente
        jest.clearAllMocks();
    });

    test('debería renderizar el componente (UI simple)', () => {
        const { title, input, addButton } = setup();

        expect(title).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    test('debería permitir añadir un todo (interacción usuario)', async () => {
        const { user, input, addButton } = setup();

        await user.type(input, 'Aprender testing');
        await user.click(addButton);

        expect(await screen.findByText('Aprender testing')).toBeInTheDocument();
        expect(input).toHaveValue('');
        expect(await screen.findByRole('status')).toHaveTextContent('Todo agregado con exito');
    });

    test('debería mostrar mensaje de error si falla el endpoint al agregar', async () => {
        mockedAddTodo.mockRejectedValueOnce(new Error('Error al agregar el todo'));

        const { user, input, addButton } = setup();

        await user.type(input, 'Aprender testing');
        await user.click(addButton);

        expect(screen.queryByText('Aprender testing')).not.toBeInTheDocument();
        expect(await screen.findByRole('status')).toHaveTextContent('Error al agregar el todo');
    });

    test('debería mostrar los todos obtenidos del servicio (mock de datos)', async () => {
        // en este test concreto, simulamos que el servicio devuelve dos todos
        mockedGetTodos.mockResolvedValueOnce([
            { id: 1, title: 'Todo 1', completed: false },
            { id: 2, title: 'Todo 2', completed: true },
        ]);

        render(<TodoList />); // renderizamos el componente que internamente llama a getTodos

        expect(mockedGetTodos).toHaveBeenCalled(); // comprobamos que el servicio se haya invocado al montar el componente

        expect(await screen.findByText('Todo 1')).toBeInTheDocument();
        expect(await screen.findByText('Todo 2')).toBeInTheDocument();
    });
});

