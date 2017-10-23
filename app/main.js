import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Search from './pages/Search.jsx'
import About from './pages/About.jsx'
import PageNav from './components/PageNav.jsx'


ReactDOM.render (
    <Router>
        <div>
            <PageNav />
            <Redirect path="/"  to="/search" />
            <Route path="/search" component={Search}/>
            <Route path="/about" component={About}/>
        </div>
    </Router>,
    document.getElementById('app')
);