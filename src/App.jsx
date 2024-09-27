import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Login from './views/Login';
import CardapioYupFormik from './views/CardapioYupFormik';
import ListaClientes from './views/ListaClientes';
import ClienteForm from './components/ClienteForm';
//para rodar produtos basta inserir http://localhost:5176/cardapio quando o banco estiver ativado

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = (novoCliente) => {
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoCliente),
    })
      .then((response) => response.json())
      .then((clienteSalvo) => {
        setClientes((prevClientes) => [...prevClientes, clienteSalvo]);
        handleClose();
      })
      .catch((error) => console.error('Erro ao salvar cliente:', error));
  };

  useEffect(() => {
    fetch('http://localhost:3000/clientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Erro ao buscar clientes:', error));
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NoPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'cardapio',
          element: <CardapioYupFormik />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'clientes',
          element: (
            <div>
              <h1>Clientes</h1>
              <button className="btn btn-primary" onClick={handleShow}>
                +
              </button>
              <ListaClientes clientes={clientes} />
              <ClienteForm show={showModal} handleClose={handleClose} onSave={handleSave} />
            </div>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
