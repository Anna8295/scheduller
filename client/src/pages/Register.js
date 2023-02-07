import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Form, Button } from 'react-bootstrap';

function App() {
	const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/dashboard')
		}
	}

	const routeChange = () =>{ 
		let path = `/login`; 
		history.push(path);
	  }

	return (
		<Container fluid>
			<Row>
				<h1>Sign up</h1>
			</Row>
			<Row>
				<Form onSubmit={registerUser}>
					<Form.Group className="mb-3" controlId="formName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="name" placeholder="Enter nema" value={name}
							onChange={(e) => setName(e.target.value)}/>
					</Form.Group>
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
					<Button variant="success" type="submit">Sign up</Button>
				</Form>
			</Row>
			<Row>
				<p>
					<h4>Already have an account? <Button variant="primary" onClick={routeChange}>Sign In</Button></h4>
				</p>
			</Row>

		</Container>
	)
}

export default App


