import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Copyright from '../../components/Copyright';
import ResponsiveNavbar from '../../components/NavbarDashboard';
import {
  Body,
  LeftBar,
  StyledAvatar,
  StyledContentTop,
  StyledContainer,
  StyledTabs,
  StyledBanner,
  StyledChip,
} from './styles';
import Capa from '../../assets/capa.jpg'
import JoditEditor from 'jodit-react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
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
  const [value, setValue] = useState(0);
  const [stateName, setName] = useState('');
  const [stateProfileImage, setProfileImage] = useState('');
  const [stateJobRole, setJobRole] = useState('');
  const [stateCity, setCity] = useState('');
  const [stateEmail, setStateEmail] = useState('');
  const [stateCellphone, setStateCellphone] = useState('');
  const [stateState, setState] = useState('');
  const [stateAboutMe, setStateAboutMe] = useState('');
  const [stateProfessionalExperience, setStateProfessionalExperience] = useState('');
  const [stateSkills, setStateSkills] = useState('');

  const config = {
    readonly: true,
    toolbar: false,
    // fullsize: false,
    // disablePlugins: true,
    // inline: true,
    sourceEditor: 'area',
  };

  useEffect(() => {
    if (props.location) {
      const { name, profileImage, jobRole, city, state, email, cellphone, aboutMe, professionalExperience, skills } = props.location.state;
      setName(name);
      setProfileImage(profileImage);
      setJobRole(jobRole);
      setCity(city)
      setState(state)
      setStateEmail(email)
      setStateCellphone(cellphone)
      setStateAboutMe(aboutMe)
      setStateProfessionalExperience(professionalExperience)
      setStateSkills(skills)

      console.log(professionalExperience)
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <ResponsiveNavbar />
      <StyledContainer>
        <LeftBar>
          <StyledAvatar src={stateProfileImage} />
          <h5>{stateName}</h5>
          <b>{stateJobRole || 'Desenvolvedor'}</b>
          <JoditEditor
            value={stateSkills || 'Linguagens de programação diversas'}
            config={config}
          />

          <hr />
          <h5>Contato</h5>
          <ul>
            <li>{stateEmail}</li>
            <li>{stateCellphone}</li>
            <li>{stateState}, {stateCity}</li>
          </ul>
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
              {/* <Tab label="Skills e Linguagens" {...a11yProps(2)} /> */}
              {/* <Tab label="Cursos feitos" {...a11yProps(3)} /> */}
            </StyledTabs>
          </StyledContentTop>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >



            <TabPanel value={value} index={0} dir={theme.direction}>
              <h4>Sobre Mim</h4>
              <JoditEditor
                value={stateAboutMe || 'Sou um programador apaixonado pelas tecnologias com que trabalho!'}
                config={config}

              />
              <hr />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <h4>Experiencias</h4>
              <JoditEditor
                value={stateProfessionalExperience || 'TESTES'}
                config={config}
              />
              <hr />
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

          <Copyright />
        </Body>
      </StyledContainer>
    </>
  );
}
