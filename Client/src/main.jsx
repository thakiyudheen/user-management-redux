import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './redux/app/store.jsx'
import {Provider} from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom';
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <App />
          </Router>
    </Provider>
  </React.StrictMode>,
)
