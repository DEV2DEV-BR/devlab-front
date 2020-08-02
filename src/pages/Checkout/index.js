import { Box, CssBaseline, Grid, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import React, { useEffect, useState } from 'react';
import LoadingImage from '../../assets/loading.gif';
import ConfirmDialog from '../../components/ConfirmDialog';
import Copyright from '../../components/Copyright';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import VisualFeedback from '../../components/VisualFeedback';
import { customizations } from '../../configs/customizations';
import { format } from '../../util/format';
import { clearCart, getCart, removeItemToCart } from '../../util/utils';
import pagarme from 'pagarme';
import {
  Body,
  ContainerDescritption,
  ContainerInformation,
  ContainerPrice,
  InternalContainer,
  Main,
  Resume,
  SpaceBar,
  StyledBadge,
  StyledButton,
  StyledContainer,
  StyledFormControl,
  StyledGrid,
  StyledImage,
  StyledItem,
} from './styles';

export default function Checkout(props) {
  const [coursesData, setCoursesData] = useState(getCart() || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);
  const [render, setRender] = useState(true);
  const [title, setTitle] = useState('');
  const [titleButton, setTitleButton] = useState('');

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

  useEffect(() => {
    const card = {
      card_number: '4111111111111111',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
    };

    pagarme.client
      .connect({ encryption_key: process.env.REACT_APP_PAGARME_STG })
      .then((client) =>
        client.transactions.create({
          amount: 21000,
          card_number: '4111111111111111',
          card_cvv: '123',
          card_expiration_date: '0922',
          card_holder_name: 'Morpheus Fishburne',
          customer: {
            external_id: '#3311',
            name: 'Morpheus Fishburne',
            type: 'individual',
            country: 'br',
            email: 'mopheus@nabucodonozor.com',
            documents: [
              {
                type: 'cpf',
                number: '30621143049',
              },
            ],
            phone_numbers: ['+5511999998888', '+5511888889999'],
            birthday: '1965-01-01',
          },
          billing: {
            name: 'Trinity Moss',
            address: {
              country: 'br',
              state: 'sp',
              city: 'Cotia',
              neighborhood: 'Rio Cotia',
              street: 'Rua Matrix',
              street_number: '9999',
              zipcode: '06714360',
            },
          },
          shipping: {
            name: 'Neo Reeves',
            fee: 1000,
            delivery_date: '2000-12-21',
            expedited: true,
            address: {
              country: 'br',
              state: 'sp',
              city: 'Cotia',
              neighborhood: 'Rio Cotia',
              street: 'Rua Matrix',
              street_number: '9999',
              zipcode: '06714360',
            },
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
  }, []);

  return (
    <StyledContainer>
      <CssBaseline />
      <ResponsiveNavbar history={props?.history} />
      <SpaceBar />
      <Body>
        <Main>
          {coursesData?.length === 0 && (
            <VisualFeedback
              description="seu carrinho está vazio!"
              subDescription="volte para a loja e veja nossas opções!"
            />
          )}
          {coursesData.map((course) => (
            <InternalContainer maxWidth="lg" key={course.id}>
              <StyledGrid container spacing={3}>
                <StyledFormControl variant="outlined" fullWidth>
                  <Grid container spacing={2}>
                    <StyledGrid
                      item
                      xs={12}
                      style={{ justifyContent: 'space-between' }}
                    >
                      <ContainerDescritption>
                        <StyledImage
                          src={course.image || LoadingImage}
                          alt="course"
                        />
                        <StyledItem>
                          <p>{course.name}</p>
                          <p>{course.duration} Horas</p>
                        </StyledItem>
                      </ContainerDescritption>
                      <ContainerPrice>
                        <Tooltip title="Retirar do carrinho" placement="bottom">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveItem(course)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>

                        <StyledBadge>
                          {format(course.price)}
                          <LoyaltyIcon style={{ marginTop: 10 }} />
                        </StyledBadge>
                      </ContainerPrice>
                    </StyledGrid>
                  </Grid>
                </StyledFormControl>
              </StyledGrid>
            </InternalContainer>
          ))}
        </Main>
        <Resume>
          <h5 style={{ width: '100%', marginTop: '20px' }}>Resumo do pedido</h5>
          <ContainerInformation>
            <h6>{coursesData?.length} </h6>
            <h6>Curso (s) adicionado(s) </h6>
          </ContainerInformation>
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
          <StyledButton
            fullWidth
            variant="contained"
            onClick={() => {}}
            style={{ backgroundColor: `${customizations?.secondaryColor}` }}
          >
            Finalizar a compra
          </StyledButton>

          <StyledButton
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => handleClearCart()}
          >
            Esvaziar carrinho
          </StyledButton>
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
