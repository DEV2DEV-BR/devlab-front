import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import pagarme from 'pagarme';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import Copyright from '../../components/Copyright';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import { format } from '../../util/format';
import { notify } from '../../util/toast';
import { getCart } from '../../util/utils';
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

  const [inputName, setInputName] = useState('');
  const [inputCpf, setInputCpf] = useState('');
  const [inputCard, setInputCard] = useState('');
  const [inputMonth, setInputMonth] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [inputCod, setInputCod] = useState('');

  useEffect(() => {
    if (render) {
      let total = 0;
      coursesData.forEach((course) => {
        total = parseFloat(course?.price) + total;
      });
      setTotalPrice(total);
      setRender(false);
    }
    getAllItems();
  }, [render]);

  const getAllItems = () => {
    const allItems = JSON.parse(localStorage.getItem('localCart'));

    const formattedItems = allItems.map(
      (item) => item.id
      // {
      //   id: item.id,
      //   title: item.name,
      //   unit_price: item.price,
      //   quantity: 1,
      //   tangible: true,
      // }
    );

    console.log(formattedItems);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (
      inputName !== '' &&
      inputCpf !== '' &&
      inputCard !== '' &&
      inputMonth !== '' &&
      inputYear !== '' &&
      inputCod !== ''
    ) {
      pagarme.client
        .connect({ encryption_key: process.env.REACT_APP_PAGARME_STG })
        .then((client) =>
          client.transactions.create({
            amount: 21000,
            card_number: `${inputCard}`,
            card_holder_name: `${inputName}`,
            card_expiration_date: `${inputMonth + inputYear}`,
            card_cvv: `${inputCod}`,
            customer: {
              external_id: '#3311',
              name: `${inputName}`,
              type: 'individual',
              country: 'br',
              email: 'mopheus@nabucodonozor.com',
              documents: [
                {
                  type: 'cpf',
                  number: `${inputCpf}`,
                },
              ],
              phone_numbers: [],
              birthday: '1965-01-01',
            },
            items: [
              {
                id: 'r123',
                title: 'Red pill',
                unit_price: 10000,
                quantity: 1,
                tangible: true,
              },
              {
                id: 'b123',
                title: 'Blue pill',
                unit_price: 10000,
                quantity: 1,
                tangible: true,
              },
            ],
          })
        )
        .then((transaction) => console.log(transaction));
    } else {
      notify('Preencha todos os campos!', 1000, 'error');
    }
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
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Nome no cartão</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira seu nome"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira o cpf sem pontuação"
                        value={inputCpf}
                        onChange={(e) => setInputCpf(e.target.value)}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Número do cartão</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o número do cartão sem pontuação"
                      value={inputCard}
                      onChange={(e) => setInputCard(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Mês</Form.Label>
                      <Form.Control
                        placeholder="XX"
                        type="number"
                        max={12}
                        min={1}
                        value={inputMonth}
                        onChange={(e) => setInputMonth(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Ano</Form.Label>
                      <Form.Control
                        placeholder="XX"
                        type="number"
                        max={31}
                        min={1}
                        value={inputYear}
                        onChange={(e) => setInputYear(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Cód. Seg</Form.Label>
                      <Form.Control
                        placeholder="XXX"
                        type="number"
                        minLength={3}
                        min={0}
                        max={999}
                        value={inputCod}
                        onChange={(e) => setInputCod(e.target.value)}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: '100%' }}
                    // onClick={() => makePayment()}
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
    </StyledContainer>
  );
}
