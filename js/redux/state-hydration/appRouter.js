// AppRouter.js
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connectRoute } from 'react-router-redux';
import ProfilePage from './ProfilePage';
import DashboardPage from './DashboardPage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route 
        path="/profile" 
        render={(props) => (
          <AsyncRoute 
            component={ProfilePage}
            loadData={() => loadRouteData('profile')}
            {...props}
          />
        )} 
      />
      <Route 
        path="/dashboard" 
        render={(props) => (
          <AsyncRoute 
            component={DashboardPage}
            loadData={() => loadRouteData('dashboard')}
            {...props}
          />
        )} 
      />
      {/* Add more routes */}
    </Switch>
  </Router>
);

// Higher-order component for data loading
const AsyncRoute = ({ component: Component, loadData, ...rest }) => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  
  React.useEffect(() => {
    loadData().then(() => setDataLoaded(true));
  }, [loadData]);
  
  return dataLoaded ? <Component {...rest} /> : <LoadingSpinner />;
};

export default AppRouter;