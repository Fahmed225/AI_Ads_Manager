import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// update isAuthenicated from redux store once successfully logged in
import { setAuthenticated } from '../actions/authActions';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid email format';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setLoginError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // update isAuthenicated from redux store once successfully logged in
        dispatch(setAuthenticated(true));
        navigate('/dashboard');
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to login');
      }
    } catch (error) {
      setErrors({ ...errors, form: error.message });
      setLoginError(error.message);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p>{errors.email}</p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p>{errors.password}</p>
        <button type="submit" disabled={isSubmitting}>Sign In</button>
      </form>
      {loginError && <div className="alert alert-danger">{loginError}</div>}
    </div>
  );
};

export default SignIn;
