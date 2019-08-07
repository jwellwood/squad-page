import React from 'react';
import { Switch } from 'react-router-dom';
import './Resources/css/app.css';
import Layout from './Hoc/Layout';
import Home from './Components/home';
import SignIn from './Components/signin';

import Dashboard from './Components/admin/Dashboard';
import PrivateRoute from './Components/authRoutes/PrivateRoute';
import PublicRoutes from './Components/authRoutes/PublicRoutes';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/AddEditMatch';
import AddEditPlayers from './Components/admin/players/AddEditPlayers';
import AdminPlayers from './Components/admin/players';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';
import NotFound from './Components/ui/NotFound';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path="/players/add_player"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoute
          {...props}
          path="/players/add_player/:id"
          exact
          component={AddEditPlayers}
        />
        <PublicRoutes
          {...props}
          path="/players"
          exact
          component={AdminPlayers}
        />
        <PrivateRoute
          {...props}
          path="/matches/edit_match/"
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path="/matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />

        <PublicRoutes
          {...props}
          path="/matches"
          exact
          component={AdminMatches}
        />
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />

        <PublicRoutes
          {...props}
          restricted={true}
          path="/signin"
          exact
          component={SignIn}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/team"
          exact
          component={TheTeam}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/the_matches"
          exact
          component={TheMatches}
        />
        <PublicRoutes {...props} restricted={false} component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
