import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PanoramaIcon from '@material-ui/icons/Panorama';


export default function mainListItems(props) {

    const handleToActivitys = (idSubject, subjects) => {
        props.props.props.push('/activitys', { idSubject, subjects });
    };

    return (
        <div>
            <ListItem button onClick={() => handleToActivitys(10, 'Infantil I')}>
                <ListItemIcon>
                    <PanoramaIcon />
                </ListItemIcon>
                <ListItemText primary="Infantil I" />
            </ListItem>

        </div>
    )
};


