import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { SongContext } from '../Providers/SongContext';
import './auth.css'

const SignUpForm = () => {
  const {setCurrentSong} = useContext(SongContext)
  setCurrentSong('')

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confEmail, setConfEmail] = useState('');
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');

  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailConfError, setEmailConfError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [dayError, setDayError] = useState('')
  const [yearError, setYearError] = useState('');
  const [genderError, setGenderError] = useState('')

  useEffect(() => {
    if (!year || year < 1900 || year > 9999) return setYearError('Enter a valid year.')
    setYearError('')
  }, [year])

  useEffect(() => {
    if (!username) return setUserError('Enter a name for your profile')
    setUserError('')
  }, [username])

  useEffect(() => {
    if (!email) return setEmailError('You need to enter your email.');
    if (!email.includes('@')) return setEmailError("This email is invalid. Make sure it's written like example@email.com");
    setEmailError('')
  }, [email])

  useEffect(() => {
    if (confEmail !== email) return setEmailConfError("The email addresses don't match.")
    if (!confEmail) return setEmailConfError('You need to confirm your email')
    setEmailConfError('')
  }, [confEmail, email])

  useEffect(() => {
    if (!password.length) return setPasswordError('You need to enter a password.')
    if (password.length < 8) return setPasswordError('Your password is too short.')
    setPasswordError('')
  }, [password])

  useEffect(() => {
    if (!month) return setMonthError('Select your birth month.')
    setMonthError('')
  }, [month])

  useEffect(() => {
    if (!day || day <= 0 || day > 31) return setDayError('Enter a valid day of the month.')
    setDayError('')
  }, [day])



  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if(!gender) return setGenderError('Select your gender')
    if (email === confEmail) {
      const data = await dispatch(signUp(username, email, password, month, day, year, gender));
      if (data) {
        setErrors(data)
      }
      return <Redirect to='/'/>
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);

  };

  const updateEmail = (e) => {
    setEmail(e.target.value);

  };
  const updateConfEmail = (e) => {
    setConfEmail(e.target.value);

  };

  const updatePassword = (e) => {
    setPassword(e.target.value);

  };

  const updateMonth = (e) => {
    setMonth(e.target.value)


  };

  const updateDay = (e) => {
    setDay(e.target.value)

  };

  const updateYear = (e) => {
    setYear(e.target.value)

  }


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className='form'>
      <div id='logo'>Dotify</div>
      <h1>Sign up for free to start listening</h1>
      <p id='label'>Sign up with your email address</p>
      <ul>
        {errors.map(error => (
          <li key={error} className='error'>
            {error}
          </li>
        ))}
      </ul>
      <div>
        <label>What's your email?</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Enter your email.'
          className={emailError ? 'input-error': ''}
        ></input>
        {emailError && <p className='error'>{emailError}</p>}
      </div>
      <div>
        <label>Confirm your email</label>
        <input
          type='text'
          name='email'
          onChange={updateConfEmail}
          value={confEmail}
          placeholder='Enter your email again.'
          className={emailConfError ? 'input-error': ''}
        ></input>
        {emailConfError && <p className='error'>{emailConfError}</p>}
      </div>
      <div>
        <label>Create a password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Create a password.'
          className={passwordError ? 'input-error': ''}
        ></input>
        {passwordError && <p className='error'>{passwordError}</p>}
      </div>
      <div>
        <label>What should we call you?</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='Enter a profile name.'
          className={userError ? 'input-error': ''}
        ></input>
        {(userError && <p className='error'>{userError}</p>) || <p>This appears on your profile.</p>}
      </div>
      <div>
        <label>What's your date of birth?</label>
        <div className='birthday'>
          <div id='month'>
            <label>Month</label>
            <select name='month' defaultValue={month} onChange={updateMonth} className={monthError ? 'input-error': ''}>
              <option value={''} disabled={true}>Month</option>
              <option value={'January'}>January</option>
              <option value={'February'}>February</option>
              <option value={'March'}>March</option>
              <option value={'April'}>April</option>
              <option value={'May'}>May</option>
              <option value={'June'}>June</option>
              <option value={'July'}>July</option>
              <option value={'August'}>August</option>
              <option value={'September'}>September</option>
              <option value={'October'}>October</option>
              <option value={'November'}>November</option>
              <option value={'December'}>December</option>
            </select>
          </div>
          <div id='day'>
            <label>Day</label>
            <input
              type='number'
              placeholder='DD'
              value={day}
              onChange={updateDay}
              className={dayError ? 'input-error': ''}
            >
            </input>
          </div>
          <div id='year'>
            <label>Year</label>
            <input
              type='number'
              placeholder='YYYY'
              value={year}
              onChange={updateYear}
              className={yearError ? 'input-error': ''}
            />
          </div>

        </div>
        <div>
          {monthError && <p className='error'>{monthError}</p>}
          {dayError && <p className='error'>{dayError}</p>}
          {yearError && <p className='error'>{dayError}</p>}
        </div>
      </div>
      <div >
        <p>What's your gender?</p>
        <div id='gender-radio'>
          <span>
            <input type='radio' name='gender' id='male' value='male' className='radio' onChange={e => {setGender(e.target.value); setGenderError('')}} />
            <label for='male'>Male</label>
          </span>
          <span>
            <input type='radio' name='gender' id='female' value='female' className='radio' onChange={e => {setGender(e.target.value); setGenderError('')}} />
            <label for='female'>Female</label>
          </span>
          <span>
            <input type='radio' name='gender' id='non-binary' value='non-binary' className='radio' onChange={e => {setGender(e.target.value); setGenderError('')}} />
            <label for='non-binary'>Non-binary</label>
          </span>
          <span>
            <input type='radio' name='gender' id='other' value='other' className='radio' onChange={e => {setGender(e.target.value); setGenderError('')}} />
            <label for='other'>Other</label>
          </span>
          <span>
            <input type='radio' name='gender' id='prefer' value='prefer' className='radio' onChange={e => {setGender(e.target.value); setGenderError('')}} />
            <label for='prefer'>Prefer not to say</label>
          </span>
        </div>
      </div>
      <div>
        <button type='submit' id='sign-up-submit' disabled={userError || emailError || emailConfError || passwordError || monthError || dayError || yearError || genderError}>Sign Up</button>
      </div>
      <div>
        <p id='try-login'>Have an account? <Link to='/login'>Log In</Link>.</p>
      </div>
    </form>
  );
};

export default SignUpForm;
