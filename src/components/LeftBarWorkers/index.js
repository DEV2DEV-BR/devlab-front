import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FilterList } from '@material-ui/icons/';
import React, { useState } from 'react';
import { ContentTypes, LeftBar, StyledButton, StyledHr } from './styles';

export default function LeftBarWorkers() {
  const [recruiterCheck, setRecruiterCheck] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChangeCheckBox = () => {
    setRecruiterCheck(!recruiterCheck);
  };

  return (
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
  );
}
