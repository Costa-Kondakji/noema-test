import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './Components/Header/Header';
import Requests from './Components/Requests/Requests';
import RequestList from './Components/RequestList/RequestList';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file


function App(props) {

  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/create" element={<Requests />} />
        <Route path="/requests" element={<RequestList />} />
        <Route
          path="*"
          element={<Navigate to="create" replace={true} />}
        />
      </Routes>
    </BrowserRouter>




  );
}

export default App;
