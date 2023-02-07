import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Form, Button } from 'react-bootstrap';

function App() {
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}

	const routeChange = () =>{ 
		let path = `/`; 
		history.push(path);
	}

	return (
		<Container fluid>
		<Row>
			<h1>Sign In</h1>
		</Row>
		<Row>
			<Form onSubmit={loginUser}>
				<Form.Group className="mb-3" controlId="formEmail">
					<Form.Label>Email adress</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" value={email}
						onChange={(e) => setEmail(e.target.value)}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPassword">
				<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password}
						onChange={(e) => setPassword(e.target.value)}/>
				</Form.Group>
				<Button variant="success" type="submit">Sign In</Button>
			</Form>
		</Row>
		<Row>
			<p>
				<h4>Don't have an account? <Button variant="primary" onClick={routeChange}>Sign up here!</Button></h4>
			</p>
		</Row>
		</Container>
	)
}

export default App
