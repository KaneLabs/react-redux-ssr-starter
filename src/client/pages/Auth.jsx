import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions';

class Login extends React.Component {
  state = { username: '', password: '' };

  usernameChange = e => this.setState({ username: e.target.value });
  passwordChange = e => this.setState({ password: e.target.value });

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.props.history.push('/')
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    const { login } = this.props;

    login(username, password);
  }

  render() {
    const { username, password } = this.state;
    const { loading, error, data } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        {loading ? <p>loading...</p> : null}

        {error ? <p>{error}</p> : null}

        {data ? <p>Logged in as {data.username}</p> : null}

        <input onChange={this.usernameChange} value={username} />
        <input onChange={this.passwordChange} value={password} />

        <button type='submit'>Submit</button>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps, { login })(Login);
