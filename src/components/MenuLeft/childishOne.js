import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PanoramaIcon from '@material-ui/icons/Panorama';
import AccountBox from '@material-ui/icons/AccountBox';
import ListSubheader from '@material-ui/core/ListSubheader';

export default function mainListItems(props) {
  const handleToActivitys = (idSubject, subjects) => {
    props.props.props.push('/activitys', { idSubject, subjects });
  };

  const redirectProfile = () => {
    props.props.props.push('/profile');
  };

  return (
    <div>
      <ListSubheader inset>Usuário</ListSubheader>
      <ListItem button onClick={() => redirectProfile()}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Minha Conta" />
      </ListItem>
      <ListSubheader inset>Disciplinas</ListSubheader>
      <ListItem button onClick={() => handleToActivitys(10, 'Infantil I')}>
        <ListItemIcon>
          <PanoramaIcon />
        </ListItemIcon>
        <ListItemText primary="Infantil I" />
      </ListItem>
    </div>
  );
}
