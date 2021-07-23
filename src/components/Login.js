import React, {useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router";

const initialValues = {
  username:'',
  password:''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const {push} = useHistory();

  const [login, setLogin] = useState(initialValues)

  //replace with error state
  const [error, setError] = useState('')

  //onChange handler

  const handleChange = e =>{
    setLogin({
      ...login, [e.target.name] : e.target.value
    })
  }
  //post api 

  const loginHandler = e =>{
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', login)
    .then(res=>{
      console.log('here;',res)
      localStorage.setItem('token', res.data.payload)
      //push here
      push('/protectedbubble')
    })
    .catch(err =>{
      console.log(err)
    })

    //error message
    if (login.username==='' || login.password==='') {
      setError('Both fields required')
    } else if(login.username!=='Lambda' || login.password!=='School') {
      setError('Incorrect username or password')
    }
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>

        <form onSubmit={loginHandler}>
          <label htmlFor='username'/> Username: 
          <input
          type= 'text'
          name='username'
          value={login.username}
          onChange={handleChange}
          data-testid='username'
          />

          <label htmlFor='password'/> Password:  
          <input
          type= 'password'
          name='password'
          value={login.password}
          onChange={handleChange}
          data-testid='password'
          />      
          <button>Log In</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"