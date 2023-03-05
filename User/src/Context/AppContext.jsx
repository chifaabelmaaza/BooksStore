import React, { createContext, useState, useEffect } from 'react';
import instance from "../services/http-common";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {

  const [connected, setConnected] = useState(false)
  const [userType, setUserType] = useState('client')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  function goBase() {
    if (window.location.pathname !== '/home') {
      window.location.href = '/home';
    }
  }

  useEffect(() => {
    if (token) {
      instance.post('/user/check-token', { token })
      .then(response => {
          // console.log(token)
          // console.log(response.data)
          if (response.data.valid) {
            setConnected(true);
            if (response.data.role === 'admin') {
              setUserType('admin')
            }
            else {
              setUserType('client')
            }
            setLoading(false);
          } else {
            setConnected(false);
            setLoading(false);
            // goBase();
          }
        }).catch(error => {
          console.log(error);
          setConnected(false);
          setLoading(false);
          // goBase();
        });
    } else {
      console.log("Token not found")
      setConnected(false);
      setLoading(false);
      // goBase()
    }

  }, [connected, token])

  return (
    <AppContext.Provider value={{ connected, setConnected, userType, setToken }}>
      {
        loading ? <h1>Loading...</h1> : children
      }

    </AppContext.Provider>
  )
}