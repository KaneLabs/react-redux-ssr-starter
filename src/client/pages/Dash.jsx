import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HelloWorld extends React.Component {
  renderHelloMessage = (auth) => {
    if (auth.data) {
      return (
        <h1>Hello {auth.data.username}</h1>
      );
    }

    return (
      <Link to='/auth'>I dont recognize you. Sign In?</Link>
    );
  }

  render() {
    return (
      this.renderHelloMessage(this.props.auth)
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, null)(HelloWorld);
