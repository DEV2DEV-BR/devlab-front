import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddToQueue from '@material-ui/icons/AddToQueue';
import BackupIcon from '@material-ui/icons/Backup';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import School from '@material-ui/icons/School';
import React from 'react';

export default function secondaryListItems(props) {
  const redirectCreateCourse = () => {
    props.props.props.push('/create-course');
  };
  const redirectAddClasses = () => {
    props.props.props.push('/add-classes');
  };
  const redirectListCourses = () => {
    props.props.props.push('/list-my-courses');
  };

  const type = localStorage.getItem('userData');

  return (
    <div>
      {/* <ListSubheader inset>Usuário</ListSubheader>
      <ListItem button onClick={() => redirectProfile()}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Minha Conta" />
      </ListItem> */}
      <ListSubheader inset>Gerenciar Cursos</ListSubheader>
      <ListItem button onClick={() => redirectCreateCourse()}>
        <ListItemIcon>
          <AddToQueue />
        </ListItemIcon>
        <ListItemText primary="Criar Curso" />
      </ListItem>
      {/* <ListItem button onClick={() => redirectAddClasses()}>
        <ListItemIcon>
          <BackupIcon />
        </ListItemIcon>
        <ListItemText primary="Adicionar Aulas" />
      </ListItem> */}
      <ListSubheader inset>Meus Cursos</ListSubheader>
      <ListItem button onClick={() => redirectListCourses()}>
        <ListItemIcon>
          <FormatListNumbered />
        </ListItemIcon>
        <ListItemText primary="Meus Cursos" />
      </ListItem>
    </div>
  );
}
