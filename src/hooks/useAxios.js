import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import axios from "axios";


export const useAxios = () => {

  const { ErrorDispatch } = useContext(ErrorContext);

  const request = axios.create();

  request.interceptors.request.use(async (req) =>  req);


  request.interceptors.response.use(res => res,
    async (err) => {
        const error = {
            error: true,
            errorMessage: err,
          };
        ErrorDispatch({ type: "populateError", error: error });
    }
  );

  return request;
};
