import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BackupIcon from '@material-ui/icons/Backup';
import Functions from '@material-ui/icons/Functions';
import AccountBox from '@material-ui/icons/AccountBox';
import School from '@material-ui/icons/School';
import ListSubheader from '@material-ui/core/ListSubheader';

export default function secondaryListItems(props) {
  const redirectUploadFiles = () => {
    props.props.props.push('/upload-files');
  };

  const redirectHomeWork = () => {
    props.props.props.push('/list-home-work');
  };
  const redirectTeachers = () => {
    props.props.props.push('/teachers');
  };
  const redirectProfile = () => {
    props.props.props.push('/profile');
  };

  const type = localStorage.getItem('userData');

  return (
    <div>
      <ListSubheader inset>Usuário</ListSubheader>
      <ListItem button onClick={() => redirectProfile()}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Minha Conta" />
      </ListItem>
      <ListSubheader inset>Gestão</ListSubheader>
      <ListItem button onClick={() => redirectUploadFiles()}>
        <ListItemIcon>
          <BackupIcon />
        </ListItemIcon>
        <ListItemText primary="Enviar materiais" />
      </ListItem>
      <ListItem button onClick={() => redirectHomeWork()}>
        <ListItemIcon>
          <Functions />
        </ListItemIcon>
        <ListItemText primary="Atividades" />
      </ListItem>

      {type === 'admin' || type === 'management' ? (
        <ListItem button onClick={() => redirectTeachers()}>
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText primary="Professores" />
        </ListItem>
      ) : (
        ''
      )}
    </div>
  );
}
