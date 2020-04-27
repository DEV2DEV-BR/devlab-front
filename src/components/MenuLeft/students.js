import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountBox from '@material-ui/icons/AccountBox';
import PanoramaIcon from '@material-ui/icons/Panorama';
import React from 'react';

export default function mainListItems(props) {
  const handleToMyCourses = () => {
    props.props.props.push('/activitys');
  };
  const redirectProfile = () => {
    props.props.props.push('/profile');
  };

  return (
    <div>
      <ListSubheader inset>Minha Conta</ListSubheader>
      <ListItem button onClick={() => redirectProfile()}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
      <ListSubheader inset>Estudos</ListSubheader>
      <ListItem button onClick={() => handleToMyCourses()}>
        <ListItemIcon>
          <PanoramaIcon />
        </ListItemIcon>
        <ListItemText primary="Meus Cursos" />
      </ListItem>

    </div>
  );
}
