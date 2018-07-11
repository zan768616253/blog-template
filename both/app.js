import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import renderRoutes from 'react-router-config/renderRoutes'
import Header from './components/navbar/header'

const App = ({ route }) => (
<div>
  <Header />
  {renderRoutes(route.routes)}
</div>
);

App.propTypes = {
  route: PropTypes.object.isRequired,
}

export default App;
