import {
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import LoadingImage from '../../assets/loading.gif';
import Copyright from '../../components/Copyright';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import VisualFeedback from '../../components/VisualFeedback';
import { format } from '../../util/format';
import {
  Body,
  Checkout,
  InternalContainer,
  Main,
  StyledBadge,
  StyledButton,
  StyledContainer,
  StyledFormControl,
  StyledGrid,
  StyledImage,
  ContainerInformation,
  StyledItem,
} from './styles';
import { getCart } from '../../util/utils';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Cart(props) {
  const classes = useStyles();

  const [coursesData, setCoursesData] = useState(getCart() || []);

  useEffect(() => {}, []);

  return (
    <StyledContainer>
      <CssBaseline />
      <ResponsiveNavbar history={props?.history} />
      <div className={classes.appBarSpacer} />
      <Body>
        <Main>
          {coursesData.length === 0 && (
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
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <StyledImage
                          src={course.image || LoadingImage}
                          alt="course"
                        />
                        <StyledItem>
                          <p>{course.name}</p>
                          <p>{course.duration} Horas</p>
                        </StyledItem>
                      </div>
                      <div>
                        <Tooltip title="Retirar do carrinho" placement="bottom">
                          <IconButton aria-label="delete" onClick={() => {}}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>

                        <StyledBadge>
                          {format(course.price)}
                          <LoyaltyIcon style={{ marginTop: 10 }} />
                        </StyledBadge>
                      </div>
                    </StyledGrid>
                  </Grid>
                </StyledFormControl>
              </StyledGrid>
            </InternalContainer>
          ))}
        </Main>
        <Checkout>
          <h5 style={{ width: '100%' }}>Resumo do pedido</h5>
          <ContainerInformation>
            <h6>1 </h6>
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
            <h1>R$ 59,90</h1>
          </ContainerInformation>
          <StyledButton fullWidth variant="contained" color="secondary">
            Finalizar a compra
          </StyledButton>
        </Checkout>
      </Body>
      <Box pt={4}>
        <Copyright />
      </Box>
    </StyledContainer>
  );
}
