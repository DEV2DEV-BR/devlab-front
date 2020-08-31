import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import PropTypes from 'prop-types';
import React from 'react';
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
  const [value, setValue] = React.useState(0);

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
          <StyledAvatar src="https://avatars0.githubusercontent.com/u/11825532?s=460&u=3c1c36dee0c91de191a65427a48cd38ef156b30d&v=4" />
          <h5>Daniel de Andrade Lopes</h5>
          <b>Frontend Developer at Fix</b>
          <p>@danieldeandradelopes</p>
          <p style={{ color: '#000000' }}>
            Developer: Mobile Android, React Native, React JS, NodeJS,
            Javascript, PHP, Bootstrap, HTML5 e CSS3 and NOW Flutter Dev. ;)
          </p>
          <hr />
          <h5>Contato</h5>
          <ul>
            <li>danieldeandradelopes@gmail.com</li>
            <li>(018) 99745-5866</li>
            <li>www.jacode.com.br</li>
          </ul>
        </LeftBar>
        <Body>
          <StyledContentTop>
            <StyledBanner src="https://media-exp1.licdn.com/dms/image/C4D16AQG0pbkcpS2YSQ/profile-displaybackgroundimage-shrink_200_800/0?e=1604534400&v=beta&t=WAZfq-r1UFWOZdyn9WpLPV2VN1IERrZN02ezSqyw_no" />
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
              <Tab label="Skills e Linguagens" {...a11yProps(2)} />
              <Tab label="Cursos feitos" {...a11yProps(3)} />
            </StyledTabs>
          </StyledContentTop>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <h4>Sobre Mim</h4>
              <p>
                Sempre que tenho um novo desafio é aí que estou feliz, pois,
                quando um novo desafio é proposto, novos conhecimentos virão,
                bem como aprendizados de forma rápida imersiva. O mais
                interessante de ser um programador é descobrir todos os dias que
                sabe muitas coisas e ainda existe muito mais para se aprender.
              </p>
              <hr />
              <h4>Educação</h4>
              <b>Faculdade de Tecnologia de Presidente Prudente</b>
              <p>2013 - 2016</p>
              <p>
                Atualmente estou em processo de construção de um aplicativo em
                Java, para fins de conclusão de curso, entre outros projetos
                realizados para as demais disciplinas.
              </p>
              <hr />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <h4>Experiencias</h4>
              <b>Eventials</b>
              <p>Frontend Developer</p>
              <p>02/2020 - 08/2020</p>
              <p>
                Na Eventials tive a grata oportunidade de trabalhar com muitas
                tecnologias, algumas delas são:
              </p>
              <p>
                - Javascript - React - GoLang - Python - Django - Aws - Jenkins
                - Git Além de ter atuado de forma alternada entre a equipe como
                Scrum Master.
              </p>
              <hr />
              <b>V-Lab Health</b>
              <p>Frontend Developer</p>
              <p>02/2020 - 08/2020</p>
              <p>
                A V-Lab me proporcionou trabalhar com diversas tecnologias,
                algumas delas são:
              </p>
              <p>- Javascript - React - Aws - ECS - S3</p>
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
