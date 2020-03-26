import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import FunctionsIcon from '@material-ui/icons/Functions';
import PublicIcon from '@material-ui/icons/Public';
import PanoramaIcon from '@material-ui/icons/Panorama';
import SportsIcon from '@material-ui/icons/Sports';
import LanguageIcon from '@material-ui/icons/Language';
import PetsIcon from '@material-ui/icons/Pets';
import HistoryIcon from '@material-ui/icons/ClearAll';


export default function mainListItems(props) {

    const handleToActivitys = (typeUser, idSubject, subjects) => {
        props.props.props.push('/activitys', { typeUser, subjects });
    };


    return (
        <div>
            <ListItem button onClick={() => handleToActivitys(1, 6, 'Arte')}>
                <ListItemIcon>
                    <PanoramaIcon />
                </ListItemIcon>
                <ListItemText primary="Arte" />
            </ListItem>
            <ListItem button onClick={() => handleToActivitys(1, 5, 'Ciências')}>
                <ListItemIcon>
                    <PetsIcon />
                </ListItemIcon>
                <ListItemText primary="Ciências" />
            </ListItem>
            <ListItem button onClick={() => handleToActivitys(1, 7, 'Educação Física')}>
                <ListItemIcon>
                    <SportsIcon />
                </ListItemIcon>
                <ListItemText primary="Educação Física" />
            </ListItem>
            <ListItem button onClick={() => handleToActivitys(1, 4, 'Geografia')}>
                <ListItemIcon>
                    <PublicIcon />
                </ListItemIcon>
                <ListItemText primary="Geografia" />
            </ListItem>
            <ListItem button onClick={() => handleToActivitys(1, 3, 'História')}>
                <ListItemIcon>
                    <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="História" />
            </ListItem>
            <ListItem button onClick={() => handleToActivitys(1, 8, 'Inglês')}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Inglês" />
            </ListItem>
            <ListItem button onClick={() => handleToActivitys(1, 1, 'Língua Portuguesa')}>
                <ListItemIcon>
                    <FontDownloadIcon />
                </ListItemIcon>
                <ListItemText primary="Lingua Portuguesa" />
            </ListItem>
            <ListItem button onClick={() => handleToActivitys(1, 2, 'Matemática')}>
                <ListItemIcon>
                    <FunctionsIcon />
                </ListItemIcon>
                <ListItemText primary="Matemática" />
            </ListItem>


        </div>
    )
};


