import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountBox from '@material-ui/icons/AccountBox';
import PanoramaIcon from '@material-ui/icons/Panorama';
import React from 'react';

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
      <ListItem button onClick={() => handleToActivitys(11, 'Infantil II')}>
        <ListItemIcon>
          <PanoramaIcon />
        </ListItemIcon>
        <ListItemText primary="Infantil II" />
      </ListItem>
    </div>
  );
}
