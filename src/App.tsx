import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import { NotificationsProvider } from '@mantine/notifications';

import './styles/App.css'

import AppMenu from "./components/navigation/AppMenu";
import AppRouter from "./components/navigation/AppRouter";
import {UploadProvider} from "./components/upload/UploadContext";
import {ExplorerProvider} from "./components/fileExplorer/ExplorerContext";
import {ExplorerModalProvider} from "./components/fileExplorer/modals/ExplorerModalContext";


function App() {
  return (
    <>
        <Router>
            <NotificationsProvider>
            <UploadProvider>
                <ExplorerProvider>
                    <ExplorerModalProvider>
                    <div className="content">
                        <AppMenu/>
                        <AppRouter/>
                    </div>
                    </ExplorerModalProvider>
                </ExplorerProvider>
            </UploadProvider>
            </NotificationsProvider>
        </Router>
    </>
  );
}

export default App;
