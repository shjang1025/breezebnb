import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider, useSelector } from 'react-redux'
import configureStore from './store/store.js'
import { restoreSession } from './utils/csrfUtils.js'
import { postSession, deleteSession, postUser } from './utils/sessionApiUtils.js'
import { createUser, loginUser, logoutUser, selectCurrentUser } from './store/sessionReducer.js'

const intializeApp = () => {
  const store = configureStore();
  window.store = store
  // window.postUser = postUser
  // window.postSession = postSession
  // window.deleteSession = deleteSession
  // window.createUser = createUser;
  // window.loginUser = loginUser;
  // window.logoutUser = logoutUser;
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

restoreSession().then(intializeApp);
