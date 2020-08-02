import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import pagarme from 'pagarme';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import ConfirmDialog from '../../components/ConfirmDialog';
import Copyright from '../../components/Copyright';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import { format } from '../../util/format';
import { clearCart, getCart, removeItemToCart } from '../../util/utils';
import {
  Body,
  ContainerInformation,
  InternalContainer,
  Main,
  Resume,
  SpaceBar,
  StyledContainer,
  StyledGrid,
} from './styles';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    height: '30px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Checkout(props) {
  useStyles();

  const [coursesData, setCoursesData] = useState(getCart() || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);
  const [render, setRender] = useState(true);
  const [title, setTitle] = useState('');
  const [titleButton, setTitleButton] = useState('');

  const name = useRef(null);
  const [inputName, setInputName] = useState('');

  const cpf = useRef(null);
  const [inputCpf, setInputCpf] = useState('');

  const card = useRef(null);
  const [inputCard, setInputCard] = useState('');

  const month = useRef(null);
  const [inputMonth, setInputMonth] = useState('');

  const year = useRef(null);
  const [inputYear, setInputYear] = useState('');

  useEffect(() => {
    if (render) {
      let total = 0;
      coursesData.forEach((course) => {
        total = parseFloat(course?.price) + total;
      });
      setTotalPrice(total);
      setRender(false);
    }
  }, [render]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveItem = (course) => {
    setOpen(true);
    setRemoveItem(course);
    setTitle(`Remover ${course.name} do carrinho?`);
    setTitleButton('Remover');
  };

  const handleClearCart = () => {
    setOpen(true);
    setTitle('Esvaziar o carrinho?');
    setTitleButton('Esvaziar');
  };

  const confirmClearCart = () => {
    handleClose();
    setRender(true);
    if (removeItem) {
      removeItemToCart(removeItem);
      setRemoveItem(false);
    } else {
      clearCart();
    }
    setCoursesData(getCart() || []);
  };

  // useEffect(() => {
  //   const card = {
  //     card_number: '4111111111111111',
  //     card_holder_name: 'abc',
  //     card_expiration_date: '1225',
  //     card_cvv: '123',
  //   };

  //   pagarme.client
  //     .connect({ encryption_key: process.env.REACT_APP_PAGARME_STG })
  //     .then((client) =>
  //       client.transactions.create({
  //         amount: 21000,
  //         card_number: '4111111111111111',
  //         card_cvv: '123',
  //         card_expiration_date: '0922',
  //         card_holder_name: 'Morpheus Fishburne',
  //         customer: {
  //           external_id: '#3311',
  //           name: 'Morpheus Fishburne',
  //           type: 'individual',
  //           country: 'br',
  //           email: 'mopheus@nabucodonozor.com',
  //           documents: [
  //             {
  //               type: 'cpf',
  //               number: '30621143049',
  //             },
  //           ],
  //           phone_numbers: ['+5511999998888', '+5511888889999'],
  //           birthday: '1965-01-01',
  //         },
  //         billing: {
  //           name: 'Trinity Moss',
  //           address: {
  //             country: 'br',
  //             state: 'sp',
  //             city: 'Cotia',
  //             neighborhood: 'Rio Cotia',
  //             street: 'Rua Matrix',
  //             street_number: '9999',
  //             zipcode: '06714360',
  //           },
  //         },
  //         shipping: {
  //           name: 'Neo Reeves',
  //           fee: 1000,
  //           delivery_date: '2000-12-21',
  //           expedited: true,
  //           address: {
  //             country: 'br',
  //             state: 'sp',
  //             city: 'Cotia',
  //             neighborhood: 'Rio Cotia',
  //             street: 'Rua Matrix',
  //             street_number: '9999',
  //             zipcode: '06714360',
  //           },
  //         },
  //         items: [
  //           {
  //             id: 'r123',
  //             title: 'Red pill',
  //             unit_price: 10000,
  //             quantity: 1,
  //             tangible: true,
  //           },
  //           {
  //             id: 'b123',
  //             title: 'Blue pill',
  //             unit_price: 10000,
  //             quantity: 1,
  //             tangible: true,
  //           },
  //         ],
  //       })
  //     )
  //     .then((transaction) => console.log(transaction));
  // }, []);

  const makePayment = () => {
    console.log(inputName);
  };

  return (
    <StyledContainer>
      <CssBaseline />
      <ResponsiveNavbar history={props?.history} />
      <SpaceBar />
      <Body>
        <Main>
          {coursesData.map((course) => (
            <InternalContainer maxWidth="lg" key={course.id}>
              <StyledGrid
                container
                spacing={3}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Nome no cartão</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira seu nome"
                        ref={name}
                        onBlur={(newContent) => setInputName(newContent)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira o cpf sem pontuação"
                        ref={cpf}
                        onBlur={(newContent) => setInputCpf(newContent)}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Número do cartão</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o número do cartão sem pontuação"
                      ref={card}
                      onBlur={(newContent) => setInputCard(newContent)}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Mês do vencimento</Form.Label>
                      <Form.Control
                        placeholder="XX"
                        type="number"
                        max={12}
                        min={1}
                        ref={month}
                        onBlur={(newContent) => setInputMonth(newContent)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Ano</Form.Label>
                      <Form.Control
                        placeholder="XX"
                        type="number"
                        max={31}
                        min={1}
                        ref={year}
                        onBlur={(newContent) => setInputYear(newContent)}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Button
                    variant="primary"
                    type="button"
                    style={{ width: '100%' }}
                    onClick={() => makePayment()}
                  >
                    Efetuar o pagamento
                  </Button>
                  <p
                    style={{
                      fontSize: '10px',
                      textAlign: 'center',
                      color: '#777171',
                    }}
                  >
                    Nós não salvamos os dados do seu cartão!
                  </p>
                </Form>
              </StyledGrid>
            </InternalContainer>
          ))}
        </Main>
        <Resume>
          <h5 style={{ width: '100%', marginTop: '20px' }}>Resumo do pedido</h5>
          <hr
            style={{
              border: 1,
              borderColor: '#d5d5d5',
              borderStyle: 'solid',
              width: '100%',
            }}
          />
          <ContainerInformation>
            <h6>Total: </h6>
            <h1>{format(totalPrice)}</h1>
          </ContainerInformation>
        </Resume>
      </Body>
      <Box pt={4}>
        <Copyright />
      </Box>

      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        title={title}
        confirm={confirmClearCart}
        titleButton={titleButton}
      />
    </StyledContainer>
  );
}
