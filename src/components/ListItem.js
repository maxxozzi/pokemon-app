import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link as RouterLink} from 'react-router-dom';

export default function ListItemLink(props) {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
          <RouterLink to={to} {...itemProps} ref={ref} />
        )),
      [to],
    );
  
    return (
      <ListItem button component={renderLink}>
        <ListItemIcon style={{color: '#fff'}}>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    );
  }