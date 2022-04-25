import React from 'react';
import './styles/App.css'
import AppMenu from "./components/navigation/AppMenu";

import {
    BrowserRouter as Router,
} from "react-router-dom";
import AppRouter from "./components/navigation/AppRouter";

function App() {
  return (
      <Router>
        <div className="content">
            <AppMenu/>
            <AppRouter/>
        </div>
      </Router>
  );
}

export default App;
