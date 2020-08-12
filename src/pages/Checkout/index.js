import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import pagarme from 'pagarme';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import Copyright from '../../components/Copyright';
import { format } from '../../util/format';
import { notify } from '../../util/toast';
import { getCart, updateLocalStorageMyCourses } from '../../util/utils';
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
import firebase from 'firebase';

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

  const [coursesData] = useState(getCart() || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [render, setRender] = useState(true);

  const [inputName, setInputName] = useState('Morpheus Fishburne');
  const [inputCpf, setInputCpf] = useState('00000000000');
  const [inputCard, setInputCard] = useState('4111111111111111');
  const [inputMonth, setInputMonth] = useState('09');
  const [inputYear, setInputYear] = useState('22');
  const [inputCod, setInputCod] = useState('123');

  useEffect(() => {
    if (render) {
      let total = 0;
      coursesData.forEach((course) => {
        total = parseFloat(course?.price) + total;
      });
      setTotalPrice(total);
      setRender(false);
    }
  }, []);

  const getAllItems = () => {
    const array = JSON.parse(localStorage.getItem('localCart')).map((item) => [
      {
        id: item.id,
        title: item.name,
        unit_price: parseFloat(item.price),
        quantity: 1,
        tangible: true,
      },
    ]);

    return array[0];
  };

  const handleEnrrol = async () => {
    const courses = getCart();
    const db = firebase.firestore();

    courses.map(
      async (course) =>
        await db
          .collection('users')
          .doc(localStorage.getItem('user'))
          .update({
            myCourses: firebase.firestore.FieldValue.arrayUnion(course.id),
          })
          .then(() => {
            updateLocalStorageMyCourses(props);
          })
    );
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
              // email: `${EMAIL_USER}`,
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
            items: getAllItems(),
          })
        )
        .then((transaction) => {
          if (transaction?.status === 'authorized') {
            notify('Pagamento efetuado com sucesso!', 2000, 'success');
            handleEnrrol();
          } else {
            notify('O seu pagamento não foi aprovado!', 2000, 'error');
            props.history.push('/cart');
          }
        })
        .catch(() => {
          notify('Verifique os dados informados!', 2000, 'error');
        });
    } else {
      notify('Preencha todos os campos!', 1000, 'error');
    }
  };

  return (
    <StyledContainer>
      <CssBaseline />
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
