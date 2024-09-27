import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ListaClientes = ({ clientes }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.nascimento}</td>
              <td>{cliente.cep}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

ListaClientes.propTypes = {
  clientes: PropTypes.array.isRequired,
};

export default ListaClientes;
