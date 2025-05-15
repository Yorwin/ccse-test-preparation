import React from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/homepage/HomePage';
import ProfilePage from './pages/ProfilePage';
import TestSimulation from './pages/testsimulation/TestSimulation';
import Settings from './pages/settings/Settings';
import ModulePractice from './pages/modulepractice/ModulePractice';
import Results from './pages/results/Results';
import Recommendations from './pages/recommendations/Recommendations';
import Root from './pages/Root';
import AuthLayout from './pages/authpages/AuthLayout';
import LoginPage from './pages/authpages/LoginPage';
import RegisterPage from './pages/authpages/RegisterPage';
import RecoverPasswordPage from './pages/recover-password/RecoverPasswordPage';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='auth/' element={<AuthLayout />}>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
    </Route>

    <Route path='/recover-password' element={<RecoverPasswordPage />}/>

    <Route path='/' element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path='profile' element={<ProfilePage />} />
      <Route path='test-simulation' element={<TestSimulation />} />
      <Route path='settings' element={<Settings />} />
      <Route path='module-practice' element={<ModulePractice />} />
      <Route path='results' element={<Results />} />
      <Route path='recommendations' element={<Recommendations />} />
    </Route>
  </>
));

function App() {
  return <>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </>;
}

export default App;
