import React from 'react';
import { connect } from 'react-redux';

import './Nav.css';

const Nav = ({ auth }) => (
  <nav className='Nav'>
    <span>top nav appears on every page</span>

    {auth.data ? <span>Hello {auth.data.username}</span> : null}
  </nav>
);

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(Nav);
