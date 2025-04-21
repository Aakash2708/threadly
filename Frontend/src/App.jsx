import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Authentication from './Components/Authentication/Authentication';
import HomePage from './Components/HomePage/HomePage';
import { getUserProfile } from './Store/Auth/Action';

const App = () => {
  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={auth.user ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
};

export default App;
