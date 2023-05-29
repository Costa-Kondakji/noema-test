
import React, { createContext, useReducer, useEffect } from "react";


export const errorReducer = (state, action) => {
  switch (action.type) {
    case "populateError":
      return {
        error: action.error.error,
        errorMessage: action.error.errorMessage,
      }
    default:
      return state;
  }
};


export const ErrorContext = createContext(null);


export const ErrorContextProvider = (props) => {

  const initState = {
    error: false,
    errorMessage: "",
  };


  const [errorState, ErrorDispatch] = useReducer(errorReducer, initState);

  useEffect(() => {

  }, []);

  return (
    <ErrorContext.Provider
      value={{
        errorState,
        ErrorDispatch
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );

}



