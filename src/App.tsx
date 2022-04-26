import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";

import './styles/App.css'

import AppMenu from "./components/navigation/AppMenu";
import AppRouter from "./components/navigation/AppRouter";
import {UploadProvider} from "./components/upload/UploadContext";


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
