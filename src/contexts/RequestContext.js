import React, { createContext, useReducer } from "react";


export const requestContextReducer = (state, action) => {
  switch (action.type) {
    case "newRequest":
      return [ ...state, action.value];
    default:
      return state;
  }
};


export const RequestContext = createContext(null);


export const RequestContextProvider = (props) => {

  const initState = [];


  const [state, requestDispatch] = useReducer(requestContextReducer, initState);


  return (
    <RequestContext.Provider
      value={{
        state,
        requestDispatch
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );

}