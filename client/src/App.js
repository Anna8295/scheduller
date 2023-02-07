import React from 'react'
import {Container} from 'react-bootstrap'; 
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Post from './pages/Post'
import posting from './pages/posting'

const App = () => {
	return (
		<Container fluid>
			<BrowserRouter>
				<Route path="/login" exact component={Login} />
				<Route path="/" exact component={Register} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/post" exact component={Post} />
				<Route path="/posting" exact component={posting} />
			</BrowserRouter>
		</Container>
	)
}

export default App
