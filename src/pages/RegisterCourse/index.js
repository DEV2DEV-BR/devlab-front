import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Copyright from '../../components/Copyright';
import Course from '../../components/Course';
import pagarme from 'pagarme'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function RegisterCourse(props) {
  const classes = useStyles();
  const [history, setHistory] = useState(props.history);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {

    const card = {
      card_number: '4111111111111111',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
    }

    pagarme.client.connect({ encryption_key: process.env.REACT_APP_PAGARME_STG })
      .then(client => client.transactions.create({
        "amount": 21000,
        "card_number": "4111111111111111",
        "card_cvv": "123",
        "card_expiration_date": "0922",
        "card_holder_name": "Morpheus Fishburne",
        "customer": {
          "external_id": "#3311",
          "name": "Morpheus Fishburne",
          "type": "individual",
          "country": "br",
          "email": "mopheus@nabucodonozor.com",
          "documents": [
            {
              "type": "cpf",
              "number": "30621143049"
            }
          ],
          "phone_numbers": ["+5511999998888", "+5511888889999"],
          "birthday": "1965-01-01"
        },
        "billing": {
          "name": "Trinity Moss",
          "address": {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
          }
        },
        "shipping": {
          "name": "Neo Reeves",
          "fee": 1000,
          "delivery_date": "2000-12-21",
          "expedited": true,
          "address": {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
          }
        },
        "items": [
          {
            "id": "r123",
            "title": "Red pill",
            "unit_price": 10000,
            "quantity": 1,
            "tangible": true
          },
          {
            "id": "b123",
            "title": "Blue pill",
            "unit_price": 10000,
            "quantity": 1,
            "tangible": true
          }
        ]
      }))
      .then(transaction => console.log(transaction))

    // pagarme.client.connect({ encryption_key: 'ek_test_8pEFp6VFhxCp3NwF8j8hoq8rz0okaa' })
    //   .then(client => client.security.encrypt(card))
    //   .then((card_hash) => {
    //     console.log('pagamento')
    //     console.log(card_hash)
    //   })

    return () => {
      setHistory('');
    };
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <div className={classes.appBarSpacer} />
      </div>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            container
            spacing={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Course
              id={props.history.location.state.idCourseFree}
              history={props.history}
            />
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
