import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return ({ value: action.val, isValid: action.val.includes('@') }) // state 아니고 action...
  } // action의 type이 'USER_INPUT'일 때만 이 코드 실행
  if (action.type === 'INPUT_BLUR') {
    return ({ value: state.value, isValid: state.value.includes('@') }) // 얘는 최신의 state...
  }
  return ({ value: '', isValid: false }) // 위에 적은 action에 해당하지 않는 경우 이 코드 실행
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return ({ value: action.val, isValid: action.val.trim().length > 6 })
  }
  if (action.type === 'INPUT_BLUR') {
    return ({ value: state.value, isValid: state.value.trim().length > 6 })
  }
  return ({ value: '', isValid: false })
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', // 입력 값
    isValid: null, // value와 isValid로 된 객체 // emailState의 초기 state를 정해준 것 // false로 주면 안 됨
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '', // 입력 값
    isValid: null, // value와 isValid로 된 객체 // emailState의 초기 state를 정해준 것 // false로 주면 안 됨
  });

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!') // 순서 확인 위해
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     ); // 로그인 버튼 활성화를 위한 유효성 검사
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP'); // 순서 확인 위해
  //     clearTimeout(identifier); // 타이머 삭제
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value }); // action // type, val 등 작명 자유(객체 요소에 접근하기 위함임)

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    )
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    )
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' }); // 처음부터 객체 형태 썼으니 그 형식 지킴 // but 이 상황에선 인풋 값에 접근할 필요 없어 val 필요 없는데, 이럴 경우 val 안 써줘도 괜찮
  }; // blur event 발생 시 유효성 검사

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.isValid);
    dispatchPassword({ type: 'INPUT_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
