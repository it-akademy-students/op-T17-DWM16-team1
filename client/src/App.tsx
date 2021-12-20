import './App.css';
import { MainScreen } from './components/screen/main';
import { Landing } from './components/screen/landing';
import { Test } from './components/screen/test'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PlaidAuth } from './components/auth/plaid-auth';
import { SignInForm } from './components/auth/signin-form';
import { Login } from './components/auth/login-form';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainScreen/> }/>
        <Route path='/plaid' element={ <PlaidAuth/> }/>
        <Route path='/test' element={ <Test/> }/>
        <Route path='/register' element={ <SignInForm/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/landing' element= { <Landing/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;