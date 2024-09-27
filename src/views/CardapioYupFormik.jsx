import { useEffect, useState } from 'react';
import ComprasTable from '../components/ComprasTable';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const CardapioYupFormik = () => {
  const schema = Yup.object().shape({
    titulo: Yup.string().trim().min(1).max(10).required(),
    descricao: Yup.string().trim().min(1).max(20).required(),
  });

  let [produtos, setProdutos] = useState([]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  let formData = {
    titulo: '',
    descricao: '',
    valor: '',
    imagemUrl: '',
  };

  useEffect(() => {
    console.log('Carregando produtos!');
    fetch('http://localhost:3000/produtos', { method: 'GET' })
      .then((res) => {
        res.json().then((data) => {
          setProdutos([...data]);
        });
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    console.log('Modifiquei o produto!');
  }, [produtos]);

  const handleSubmit = (values) => {
    // Enviar dados para a tabela.
    let novoProduto = { ...values };

    // Enviar os dados para o servidor de backend.
    fetch('http://localhost:3000/produtos', {
      method: 'POST',
      body: JSON.stringify(novoProduto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Cadastro efetuado com sucesso!');

        setProdutos([...produtos, novoProduto]);

        // Fechar modal.
        setShow(false);
      })
      .catch((error) => {
        console.log('Problemas a vista!');
      });
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        +
      </Button>

      <ComprasTable produtos={produtos}></ComprasTable>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Produto</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {/* Título */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Título</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.titulo}
                type="text"
                placeholder="Digite o título"
                name="titulo"
              />

              <span>{formik.errors.titulo}</span>
            </Form.Group>
            {/* Decrição */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.descricao}
                type="text"
                placeholder="Digite a descrição"
                name="descricao"
              />
              <span>{formik.errors.descricao}</span>
            </Form.Group>
            {/* Valor */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.valor}
                type="text"
                placeholder="Digite o valor"
                name="valor"
              />
            </Form.Group>
            {/* Imagem */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.imagemUrl}
                type="text"
                placeholder="Digite o endereço da imagem."
                name="imagemUrl"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow} type="button">
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CardapioYupFormik;