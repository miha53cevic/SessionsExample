import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Index from './Index';
import User from './User';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
    return (
        // Using HashRouter because GithubPages returns 404 not found
        // when trying to access links directly otherwise
        <BrowserRouter>
            <React.StrictMode>
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/user' element={<User />} />
                </Routes>
            </React.StrictMode>
        </BrowserRouter>
    );
};

ReactDOM.render(
    <App />, document.getElementById('root')
);