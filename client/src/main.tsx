import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Index from './Index';
import User from './User';
import { Route, Routes, HashRouter } from 'react-router-dom';

function App() {
    return (
        // Using HashRouter because GithubPages returns 404 not found
        // when trying to access links directly otherwise
        <HashRouter basename='/'>
            <React.StrictMode>
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/user' element={<User />} />
                </Routes>
            </React.StrictMode>
        </HashRouter>
    );
};

ReactDOM.render(
    <App />, document.getElementById('root')
);