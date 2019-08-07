import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase';

const AdminNav = () => {
  const links = [
    { title: 'Matches', linkTo: '/matches' },
    { title: 'Add Match', linkTo: '/matches/edit_match' },
    { title: 'Players', linkTo: '/players' },
    { title: 'Add Player', linkTo: '/players/add_player' },
  ];

  const style = {
    color: '#fff',
    fontWeight: 300,
    borderBottom: '1px solid #353535',
  };

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('signout');
        },
        error => {
          console.log(error);
        },
      );
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={() => logoutHandler()}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;
