import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ClienteForm = ({ show, handleClose, onSave }) => {
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    nascimento: Yup.date().required('Data de Nascimento é obrigatória'),
    cep: Yup.string().required('CEP é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      nascimento: '',
      cep: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Chama a função onSave passada como prop
      onSave(values);
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Cliente</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome"
              {...formik.getFieldProps('nome')}
            />
            {formik.touched.nome && formik.errors.nome && (
              <div className="text-danger">{formik.errors.nome}</div>
            )}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </Form.Group>
          <Form.Group controlId="formNascimento">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              {...formik.getFieldProps('nascimento')}
            />
            {formik.touched.nascimento && formik.errors.nascimento && (
              <div className="text-danger">{formik.errors.nascimento}</div>
            )}
          </Form.Group>
          <Form.Group controlId="formCep">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o CEP"
              {...formik.getFieldProps('cep')}
            />
            {formik.touched.cep && formik.errors.cep && (
              <div className="text-danger">{formik.errors.cep}</div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ClienteForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ClienteForm;
