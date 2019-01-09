import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'bulma-toast';
import './stylesheets/signup.scss';
import validateForm from '../../helpers/signupValidator';
import * as authActions from '../../actions/authActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessages: {
        name: '', email: '', password: '', passwordConfirmation: ''
      },
      formValidity: {
        name: true, email: true, password: true, passwordConfirmation: true
      },
      formValid: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { state } = this;
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    // console.log(e.target.name);
  }

  signup(e) {
    e.preventDefault();
    const { formValidity, name, email, password, passwordConfirmation } = this.state;
    this.setState(validateForm);
    const formHasErrors = Object.keys(formValidity).some(key => formValidity[key] === false);
    if (!formHasErrors) {
      const user = {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      };
      this.props.actions.signup(user)
        .then(() => {
          toast({
            message: 'Logged in successfully',
            type: 'is-success',
            dismissible: true,
            position: 'top-right'
          })
        })
        .catch((error) => {
          toast({
            message: error,
            type: 'is-danger',
            dismissible: true,
            position: 'top-right'
          })
        })
    }
  }
  render() {
    const nameClasses = classNames('input', { 'is-danger': !this.state.formValidity.name });
    const nameErrorClasses = classNames('help is-danger', { 'display-none': this.state.formValidity.name });
    const emailClasses = classNames('input', { 'is-danger': !this.state.formValidity.email });
    const emailErrorClasses = classNames('help is-danger', { 'display-none': this.state.formValidity.email });
    const passwordClasses = classNames('input', { 'is-danger': !this.state.formValidity.password });
    const passwordConfirmationClasses = classNames('input', { 'is-danger': !this.state.formValidity.passwordConfirmation });
    const passwordErrorClasses = classNames('help is-danger', { 'display-none': this.state.formValidity.password });
    const passwordConfirmationErrorClasses = classNames('help is-danger', { 'display-none': this.state.formValidity.passwordConfirmation });
    return (
      <div className="centered-form">
        <form className="is-6" id="signup-form">
          <div className="field">
            <label htmlFor="name" className="label">Name</label>
            <div className="control has-icons-left">
              <input
                type="text"
                name="name"
                className={nameClasses}
                placeholder="Enter you name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-user" />
              </span>
            </div>
            <p className={nameErrorClasses}>{this.state.errorMessages.name}</p>
          </div>
          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <div className="control has-icons-left">
              <input
                type="email"
                name="email"
                className={emailClasses}
                placeholder="Enter you email address"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope" />
              </span>
            </div>
            <p className={emailErrorClasses}>{this.state.errorMessages.email}</p>
          </div>
          <div className="field">
            <label htmlFor="password" className="label">Password</label>
            <div className="control has-icons-left">
              <input
                type="password"
                name="password"
                className={passwordClasses}
                placeholder="Enter your password..."
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"/>
              </span>
            </div>
            <p className={passwordErrorClasses}>{this.state.errorMessages.password}</p>
          </div>
          <div className="field">
            <label htmlFor="password-confirmation" className="label">Password Confirmation</label>
            <div className="control has-icons-left">
              <input
                type="password"
                name="passwordConfirmation"
                className={passwordConfirmationClasses}
                placeholder="Confirm your password"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock" />
              </span>
            </div>
            <p className={passwordConfirmationErrorClasses}>{this.state.errorMessages.passwordConfirmation}</p>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <a className="button is-primary" onClick={this.signup}>
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
