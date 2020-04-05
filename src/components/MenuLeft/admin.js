import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BackupIcon from "@material-ui/icons/Backup";
import ListSubheader from "@material-ui/core/ListSubheader";

export default function secondaryListItems(props) {
  const redirectUploadFiles = () => {
    props.props.props.push("/upload-files");
  };

  return (
    <div>
      <ListSubheader inset>Upload de arquivos</ListSubheader>
      <ListItem button onClick={() => redirectUploadFiles()}>
        <ListItemIcon>
          <BackupIcon />
        </ListItemIcon>
        <ListItemText primary="Enviar materiais" />
      </ListItem>
    </div>
  );
}
