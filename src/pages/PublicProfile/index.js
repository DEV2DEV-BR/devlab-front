import { IconButton, Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Edit } from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Capa from '../../assets/capa.jpg';
import ProfileItems from '../../components/ProfileItems';
import VisualFeedback from '../../components/VisualFeedback';
import { Skeleton } from '@material-ui/lab';
import { Save, Clear } from '@material-ui/icons';
import {
  Body,
  DivTabPannel,
  LeftBar,
  StyledAvatar,
  StyledBanner,
  StyledChip,
  StyledContainer,
  StyledContentTop,
  StyledTabs,
} from './styles';
import { notify } from '../../util/toast';
import MessageUpdateImage from '../../components/MessageUpdateImage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <DivTabPannel
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </DivTabPannel>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function PublicProfile(props) {
  const theme = useTheme();
  const [load, setLoad] = React.useState(true);
  const [value, setValue] = useState(0);
  const [stateName, setName] = useState('');
  const [stateJobRole, setJobRole] = useState('');
  const [stateCity, setCity] = useState('');
  const [stateEmail, setStateEmail] = useState('');
  const [stateCellphone, setStateCellphone] = useState('');
  const [stateState, setState] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [option, setOption] = useState('');
  const [stateAboutMe, setStateAboutMe] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [image, setImage] = useState(null);
  const [progressLoad, setProgressLoad] = useState(false);
  const fileRef = useRef();
  const [
    stateProfessionalExperience,
    setStateProfessionalExperience,
  ] = useState(null);
  const [stateSkills, setStateSkills] = useState(null);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if (props.match) {
      const { email } = props.match.params;

      if (email === localStorage.getItem('@jacode-email')) {
        setEnableEdit(true);
      }

      const db = firebase.firestore();

      const usersRef = db.collection('users');

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          usersRef
            .where('email', '==', email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                setName(doc.data().name);
                setPreviewImage(doc.data().profileImage);
                setOldImage(doc.data().profileImage);
                setJobRole(doc.data().jobRole);
                setCity(doc.data().city);
                setState(doc.data().state);
                setStateEmail(doc.data().email);
                setStateCellphone(doc.data().cellphone);
                setStateAboutMe(doc.data().aboutMe);
                setStateProfessionalExperience(
                  doc.data().professionalExperience
                );
                setStateSkills(doc.data().skills);
                setLoad(false);
              });
            });
        }
      });
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleEdit = (option) => {
    setModalShow(true);
    setOption(option);
  };
  const handleClose = () => {
    setModalShow(false);
  };

  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image) {
        var reader = new FileReader();

        reader.onload = function () {
          setPreviewImage(reader.result);
        };

        reader.readAsDataURL(image);
      }
      setImage(image);
    }
  };

  const confirmUpdateImage = () => {
    if (image !== null) {
      setProgressLoad(true);
      const db = firebase.firestore();
      var userRef = db.collection('users').doc(localStorage.getItem('user'));

      const storage = firebase.storage();

      const uploadTask = storage
        .ref(`profiles/${localStorage.getItem('@jacode-email')}/${image.name}`)
        .put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref(`profiles/${localStorage.getItem('@jacode-email')}`)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              userRef
                .update({
                  profileImage: url,
                })
                .then(function () {
                  notify('Imagem atualizada!', 1000, 'success');
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                  notify('Falha ao atualizar os dados!', 1000, 'error');
                });

              setProgressLoad(false);
              setImage(null);
            });
        }
      );
    }
  };

  return (
    <>
      <StyledContainer>
        <LeftBar>
          <StyledAvatar
            src={previewImage}
            onClick={() => {
              enableEdit && document.getElementById('file').click();
            }}
            enableEdit
          />
          {enableEdit && image == null ? (
            <i style={{ fontSize: 10, marginBottom: 20, marginTop: 10 }}>
              Clique na imagem para selecionar uma nova foto
            </i>
          ) : (
            <div>
              <Tooltip title="Limpar" placement="bottom-start">
                <IconButton
                  aria-label="save"
                  onClick={() => {
                    setPreviewImage(oldImage);
                    setImage(null);
                  }}
                  disabled={progressLoad}
                >
                  <Clear />
                </IconButton>
              </Tooltip>
              <Tooltip title="Salvar" placement="bottom">
                <IconButton
                  aria-label="save"
                  onClick={() => confirmUpdateImage()}
                  disabled={progressLoad}
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <hr />
          <input
            type="file"
            id="file"
            onChange={handleChangeAvatar}
            ref={fileRef}
            style={{ visibility: 'hidden', height: 0, margin: 0, padding: 0 }}
          />
          <h5>{stateName}</h5>
          <b>{stateJobRole || 'Desenvolvedor'}</b>
          <hr />
          <h5>Skills</h5>
          {load ? (
            <>
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
            </>
          ) : stateSkills ? (
            stateSkills
          ) : (
            <VisualFeedback
              subDescription={
                enableEdit
                  ? 'Adicione linguagens e frameworks'
                  : 'Esse usuário ainda não preencheu as informações!'
              }
            />
          )}
          {enableEdit && (
            <Tooltip title="Adicionar/Editar" placement="bottom">
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit('skills')}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )}
          <hr />
          <h5>Contato</h5>

          {load ? (
            <>
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
              <Skeleton
                variant="rect"
                width={200}
                height={10}
                style={{ margin: 5 }}
              />
            </>
          ) : stateEmail || stateCellphone ? (
            <ul>
              <li>{stateEmail}</li>
              <li>{stateCellphone}</li>
              <li>
                {stateState}, {stateCity}
              </li>
            </ul>
          ) : (
            <VisualFeedback
              subDescription={
                enableEdit
                  ? 'Adicione linguagens e frameworks'
                  : 'Esse usuário ainda não preencheu as informações!'
              }
            />
          )}
        </LeftBar>
        <Body>
          <StyledContentTop>
            <StyledBanner src={Capa} />
            <StyledTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width StyledTabs example"
            >
              <Tab label="Bio" {...a11yProps(0)} />
              <Tab label="Experiências profissionais" {...a11yProps(1)} />
            </StyledTabs>
          </StyledContentTop>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{ width: '100%', height: '100%' }}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <h4>Sobre Mim</h4>
              {load ? (
                <>
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                </>
              ) : (
                enableEdit && (
                  <Tooltip title="Adicionar/Editar" placement="bottom">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit('aboutMe')}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                )
              )}

              {load ? (
                <>
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                  <Skeleton variant="rect" height={10} style={{ margin: 5 }} />
                </>
              ) : stateAboutMe ? (
                stateAboutMe
              ) : (
                <VisualFeedback
                  subDescription={
                    enableEdit
                      ? 'Escreva sobre você para que os recrutadores te conheçam melhor!'
                      : 'Esse usuário ainda não preencheu as informações'
                  }
                />
              )}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <h4>Experiencias</h4>
              {enableEdit && (
                <Tooltip title="Adicionar/Editar" placement="bottom">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit('professionalExperience')}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
              {stateProfessionalExperience ? (
                stateProfessionalExperience
              ) : (
                <VisualFeedback
                  subDescription={
                    enableEdit
                      ? 'Ao adicionar experiências profissionais você aumenta muito as suas chances de ser contratado.'
                      : 'Esse usuário ainda não preencheu as informações'
                  }
                />
              )}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <StyledChip
                avatar={<Avatar>J</Avatar>}
                label="Javascript"
                clickable
                color="primary"
                // onDelete={handleDelete}
                deleteIcon={<FaceIcon />}
                variant="outlined"
              />
              <StyledChip
                avatar={<Avatar>J</Avatar>}
                label="Java"
                clickable
                color="primary"
                // onDelete={handleDelete}
                deleteIcon={<FaceIcon />}
                variant="outlined"
              />
              <StyledChip
                avatar={<Avatar>R</Avatar>}
                label="React"
                clickable
                color="primary"
                // onDelete={handleDelete}
                deleteIcon={<FaceIcon />}
                variant="outlined"
              />
              <StyledChip
                avatar={<Avatar>N</Avatar>}
                label="Node JS"
                clickable
                color="primary"
                // onDelete={handleDelete}
                deleteIcon={<FaceIcon />}
                variant="outlined"
              />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              Cursos que estou inscrito
            </TabPanel>
          </SwipeableViews>
        </Body>
      </StyledContainer>
      <ProfileItems
        modalShow={modalShow}
        handleClose={handleClose}
        option={option}
      />
    </>
  );
}
