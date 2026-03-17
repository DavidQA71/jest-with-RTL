//importamos las funciones de testing library
//render es para renderizar el componente y screen es para obtener el elemento por el texto o el rol
//userEvent es para simular eventos del usuario
import { render, screen } from '@testing-library/react';
import Counter from './Counter';
import userEvent from '@testing-library/user-event';

//el setup es para configurar los componentes para los tests, esto se hace para evitar repetir crear el componente en cada test
//en vez de setup se puede poner algun nombre mas descriptivo como renderCounterComponent
const setup = () => {
    //inicializamos el userEvent
    const user = userEvent.setup();
    //renderizamos el componente
    render(<Counter />);

    return {
        user,
        //el screen.getByText es para obtener el elemento por el texto
        count: screen.getByText(/count:/i),
        //el role es para obtener el elemento por el rol, en este caso el boton de incremento
        //el name es para obtener el nombre accesible, puede ser texto, aria-label, etc.
        incrementButton: screen.getByRole('button', { name: /increment/i }),
    };
};


//en los tests ya no hace falta utilizar render o userEvent, ya que ya se configuraron en el setup
//el describe es para agrupar los tests 
describe('Counter', () => {
    test('should render the counter', () => {
        const { count, incrementButton } = setup();
        //el render es para renderizar el componente pero ya no es necesario porque ya se renderizo en el setup
        //render(<Counter />);

        expect(count).toBeInTheDocument();
        //el expect es para verificar que el elemento existe en el documento
        expect(incrementButton).toBeInTheDocument();
    });

    //el test es para verificar que el contador se incrementa
    test('should increment the counter', async () => {
        //obtenemos el user y el incrementButton del setup
        const { count, incrementButton, user } = setup();
        
        await user.click(incrementButton);
        //el expect es para verificar que el elemento existe en el documento
        expect(count).toHaveTextContent('1');
    });
});

//para correr se usa el comando npm test, no hace falta ejecutar npm run dev