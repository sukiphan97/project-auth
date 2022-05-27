import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import Main from 'components/Main'
import Login from 'components/Login'
import Error from 'components/Error'

import user from 'reducers/user'
import thoughts from 'reducers/thoughts'

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer
})

const store = configureStore({ reducer });


export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Main /> }/>
          <Route path='/login' element={ <Login /> }/>
          <Route path='*' element={ <Error /> }/>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
