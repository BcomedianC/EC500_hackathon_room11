import React from "react";
import '../assets/styles/App.css';
import HomePage from './HomePage';
import Header from '../components/Header';
import { SnackbarProvider } from 'notistack';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  port: 5000,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        port: action.payload.port,
      };
    case "logout":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <SnackbarProvider maxSnack={2}>
        <div className="App">
          <Header isLoggedIn={!state.isAuthenticated ? false : true}/>
          <HomePage />
        </div>
      </SnackbarProvider>
    </AuthContext.Provider>
  );
}

export default App;
