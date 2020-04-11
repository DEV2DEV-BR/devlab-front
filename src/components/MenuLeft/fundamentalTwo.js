import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountBox from '@material-ui/icons/AccountBox';
import HistoryIcon from '@material-ui/icons/ClearAll';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import FunctionsIcon from '@material-ui/icons/Functions';
import LanguageIcon from '@material-ui/icons/Language';
import PanoramaIcon from '@material-ui/icons/Panorama';
import PetsIcon from '@material-ui/icons/Pets';
import PublicIcon from '@material-ui/icons/Public';
import SportsIcon from '@material-ui/icons/Sports';
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
      <ListItem button onClick={() => handleToActivitys(6, 'Arte')}>
        <ListItemIcon>
          <PanoramaIcon />
        </ListItemIcon>
        <ListItemText primary="Arte" />
      </ListItem>
      <ListItem button onClick={() => handleToActivitys(5, 'Ciências')}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Ciências" />
      </ListItem>
      <ListItem button onClick={() => handleToActivitys(7, 'Educação Física')}>
        <ListItemIcon>
          <SportsIcon />
        </ListItemIcon>
        <ListItemText primary="Educação Física" />
      </ListItem>
      <ListItem button onClick={() => handleToActivitys(4, 'Geografia')}>
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="Geografia" />
      </ListItem>
      <ListItem button onClick={() => handleToActivitys(3, 'História')}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="História" />
      </ListItem>
      <ListItem button onClick={() => handleToActivitys(8, 'Inglês')}>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary="Inglês" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleToActivitys(1, 'Língua Portuguesa')}
      >
        <ListItemIcon>
          <FontDownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Lingua Portuguesa" />
      </ListItem>
      <ListItem button onClick={() => handleToActivitys(2, 'Matemática')}>
        <ListItemIcon>
          <FunctionsIcon />
        </ListItemIcon>
        <ListItemText primary="Matemática" />
      </ListItem>
    </div>
  );
}
