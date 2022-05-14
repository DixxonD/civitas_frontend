import React from 'react';
import Home from "../../pages/Home"
import Files from "../../pages/Files"
import NotFound from "../../pages/NotFound"

import {
    Routes,
    Route,
} from "react-router-dom";
import UploadCenter from "../../pages/UploadCenter";
import StorageConfig from "../../pages/StorageConfig";


function AppRouter(){
    return (
        <Routes>
            <Route  path='/' element={<Home/>}/>
            <Route  path='/files' element={<Files/>}/>
            <Route  path='/upload' element={<UploadCenter/>}/>
            <Route  path='/addLocalStorage' element={<StorageConfig/>}/>
            <Route  path='*' element={<NotFound/>}/>
        </Routes>
    )
}
export default AppRouter