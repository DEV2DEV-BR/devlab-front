import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FilterList } from '@material-ui/icons/';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Copyright from '../../components/Copyright';
import {
  Body,
  ContentTypes,
  LeftBar,
  StyledBanner,
  StyledContainer,
  StyledContentTop,
  StyledHr,
  StyledButton,
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

export default function RecruiterArea(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [recruiterCheck, setRecruiterCheck] = useState(false);

  const handleChangeCheckBox = () => {
    setRecruiterCheck(!recruiterCheck);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <StyledContainer>
        <LeftBar>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <FilterList />
            <h4>Filtros</h4>
          </div>
          <StyledHr />
          <span>Perfil</span>
          <ContentTypes>
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Backend"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Frontend"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="FullStack"
            />
          </ContentTypes>
          <StyledHr />
          <span>Skills</span>
          <ContentTypes>
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="HTML"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="CSS"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Javascript"
            />
          </ContentTypes>
          <ContentTypes>
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Android"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="PHP"
            />
          </ContentTypes>
          <StyledHr />
          <span>Frameworks</span>
          <ContentTypes>
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Wordpress"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Firebase"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="React"
            />
          </ContentTypes>
          <ContentTypes>
            <FormControlLabel
              control={
                <Checkbox
                  checked={recruiterCheck}
                  onChange={handleChangeCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Node"
            />
          </ContentTypes>

          <StyledHr />

          <StyledButton fullWidth variant="contained">
            Aplicar filtros
          </StyledButton>
        </LeftBar>
        <Body>
          <StyledContentTop>
            <StyledBanner src="https://media-exp1.licdn.com/dms/image/C4D16AQG0pbkcpS2YSQ/profile-displaybackgroundimage-shrink_200_800/0?e=1604534400&v=beta&t=WAZfq-r1UFWOZdyn9WpLPV2VN1IERrZN02ezSqyw_no" />
          </StyledContentTop>

          <Copyright />
        </Body>
      </StyledContainer>
    </>
  );
}
