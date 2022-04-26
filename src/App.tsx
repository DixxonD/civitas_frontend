import React, {useEffect, useState} from 'react';
import './styles/App.css'
import AppMenu from "./components/navigation/AppMenu";

import {
    BrowserRouter as Router,
} from "react-router-dom";
import AppRouter from "./components/navigation/AppRouter";
import {UploadProvider} from "./components/UploadContext";


function App() {
  return (
    <>
        <Router>
            <UploadProvider>
                <div className="content">
                    <AppMenu/>
                    <AppRouter/>
                </div>
            </UploadProvider>
        </Router>
    </>
  );
}

export default App;
