import React from "react";
import { Routes, Route } from 'react-router-dom';
import IssueDetailsPage from "./pages/IssueDetailPage/IssueDetailPage";
import IssueListPage from "./pages/IssueListPage/IssueListPage";
import { Navbar } from "./pages/Navbar/Navbar";



const Routing = () => {
    return (
        <div>
            <Navbar/>
          <Routes>
             <Route path={"/"} element={<IssueListPage />} />
             <Route path={'/issue/:issueNum'}element={<IssueDetailsPage/>} />

          </Routes>
        </div>
    )
}

export default Routing;