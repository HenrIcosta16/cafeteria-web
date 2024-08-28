import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './templates/Layout';
import NoPage from './views/NoPage';
import Home from './views/Home';
import Cardapio from './views/Cardapio';
import Login from './views/Login';

//modelo de rotas atualizado
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    elementError: <NoPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'cardapio', element: <Cardapio /> },
      { path: 'login', element: <Login /> }, 
    ]
  },
]);


export default Router;




/*codigo anterior

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Cardapio from './views/Cardapio';
import Login from './views/Login';


function App() {
  return (

    //metodo antigo
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cardapio" element={<Cardapio />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/
