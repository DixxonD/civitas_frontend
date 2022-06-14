import React from 'react';
import Home from "../../pages/Home"
import Files from "../../pages/Files"
import NotFound from "../../pages/NotFound"

import {
    Routes,
    Route,
} from "react-router-dom";
import LocalStorageGuides from "../../pages/LocalStorageGuides";
import RemoteStorageGuides from "../../pages/RemoteStorageGuides";

/**
 * Manages Routing
 */
function AppRouter(){
    return (
        <Routes>
            <Route  path='/' element={<Home/>}/>
            <Route  path='/files' element={<Files/>}/>
            <Route  path='/addLocalStorage' element={<LocalStorageGuides/>}/>
            <Route  path='/addRemoteStorage' element={<RemoteStorageGuides/>}/>
            <Route  path='*' element={<NotFound/>}/>
        </Routes>
    )
}
export default AppRouter