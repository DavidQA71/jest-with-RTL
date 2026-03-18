## Jest + React Testing Library – Demo

Este proyecto es un ejemplo sencillo de cómo escribir tests unitarios de componentes React usando **Jest** y **React Testing Library** (RTL), incluyendo interacción de usuario y mocks de servicios que llaman a APIs externas.

### Tecnologías

- React + TypeScript
- Jest
- React Testing Library
- @testing-library/user-event
- JSONPlaceholder (API pública de prueba)

### Estructura relevante

- `src/components/Counter/Counter.tsx`  
  Componente de contador simple.

- `src/components/Counter/Counter.test.tsx`  
  - Test de **UI simple**: comprueba que se renderizan el texto y el botón.  
  - Test de **interacción de usuario**: usa `user-event` para hacer click en el botón y verificar que el contador se incrementa.

- `src/components/TodoList/TodoList.tsx`  
  Componente que:
  - Carga una lista de todos desde un servicio (`getTodos`).
  - Permite añadir un nuevo todo mediante un input y un botón.

- `src/services/todoService.ts`  
  Servicio que llama a la API de JSONPlaceholder:  
  `https://jsonplaceholder.typicode.com/todos?_limit=3`.

- `src/components/TodoList/TodoList.test.tsx`  
  - Test de **UI simple**: verifica título, input y botón.  
  - Test de **interacción de usuario**: escribe en el input, hace click en “Add Todo” y comprueba que se añade el ítem.  
  - Test de **componente que consume datos**:  
    - `jest.mock('../../services/todoService')` para mockear el servicio.  
    - `mockedGetTodos.mockResolvedValueOnce(...)` para simular respuesta de la API.  
    - Comprueba que se muestran los textos de los todos mockeados.

- `src/setupTests.ts`  
  - Importa `@testing-library/jest-dom` para disponer de matchers adicionales como `toBeInTheDocument`.

### Scripts

- `npm test`  
  Ejecuta Jest en modo watch (según la configuración del proyecto).

- `npm run test:coverage`  
  Ejecuta los tests y genera el reporte de coverage en consola y en la carpeta `coverage/`.