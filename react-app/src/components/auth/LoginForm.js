import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'))
    if(data) {
      setErrors(data);
    }
  }

  function handleRedirect() {
    history.push('/signup')
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div id='login-header'><h1>Dotify</h1></div>
      <form onSubmit={onLogin} className='form'>
        <p id='label'>To continue, log in to Dotify</p>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className='error'>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />

        </div>
        <div>
          <button type='submit' className='login-button'>Login</button>
        </div>
        <div>
          <button onClick={demo} className='login-button'>Demo User</button>
        </div>
      </form>
      <div id='try-signup'>
        <p>Don't have an account?</p>
        <button onClick={handleRedirect}>Sign up for Dotify</button>
      </div>
    </div>
  );
};

export default LoginForm;
