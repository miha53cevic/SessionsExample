import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Index from './Index';
import User from './User';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter basename='/SessionsExample/'>
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