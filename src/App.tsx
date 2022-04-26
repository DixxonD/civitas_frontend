import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import { NotificationsProvider } from '@mantine/notifications';

import './styles/App.css'

import AppMenu from "./components/navigation/AppMenu";
import AppRouter from "./components/navigation/AppRouter";
import {UploadProvider} from "./components/upload/UploadContext";


function App() {
  return (
    <>
        <Router>
            <NotificationsProvider>
            <UploadProvider>
                <div className="content">
                    <AppMenu/>
                    <AppRouter/>
                </div>
            </UploadProvider>
            </NotificationsProvider>
        </Router>
    </>
  );
}

export default App;
