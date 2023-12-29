import React from 'react';
import axios from '../utils/axios';
// import navigate from router-dom
import { useNavigate } from 'react-router-dom';

const handleSubmit = async (values, { setSubmitting }) => {

  try {
    const response = await axios.post('/api/auth/register', values);
    console.log(response.data.message);
  } catch (error) {
    console.log(error.response.data.message);
  }
  setSubmitting(false);
};

const SignupForm = () => {
    // useNavigate hook
    const navigate = useNavigate();
  const [values, setValues] = React.useState({

      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        handleSubmit(values, setSubmitting);
      }
    }, [errors]);

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
    const handleBlur = () => {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }

    const validate = (values) => {
      let errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      if (!values.username) {
        errors.username = 'Username is required';
      }
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
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
      return errors;
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);
      // server code endpoint for /api/auth/register for reference:
      // router.post('/register', async (req, res) => {
      //   const { username, email, password } = req.body;
      const { username, email, password } = values;
      try {
        const response = await axios.post('/api/auth/register', { username, email, password });
        console.log(response.data.message);
      } catch (error) {
        console.log(error.response.data.message);
      }
      navigate('/signin');
      setSubmitting(true);
    }

    return (
      <div className="container">
        <h1 className="text-center">Sign Up</h1>
        <form onSubmit={(e) => {handleSubmit(e)}}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={`form-control ${errors.username && 'is-invalid'}`}
              type="text"
              name="username"
              id="username"
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={`form-control ${errors.email && 'is-invalid'}`}
              type="email"
            name="email"
            id="email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={`form-control ${errors.password && 'is-invalid'}`}
            type="password"
            name="password"
            id="password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <button disabled={isSubmitting} type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;