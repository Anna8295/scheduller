import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import jwt from 'jsonwebtoken'
import moment from "moment"
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
	const history = useHistory()
	const [user, setUser] = useState('')
	const [postData, setPostData] = useState([])

	async function getPostData() {
		const req = await fetch('http://localhost:1337/api/post', {
			headers:{
				'x-access-token': localStorage.getItem('token'),
			}
		})

		const data = await req.json()
		console.log(data)
		if(data.status === 'ok'){
			setPostData(data.posts)
		} else {
			alert(data.error)
		}
	}
	
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			console.log(user)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
				setUser(user)
				getPostData()
			}
		}
	}, [history])

	const logOut = (user) =>{ 
		localStorage.removeItem('token')
		history.replace('/login')
	}

	const routeChange = () =>{ 
		let path = `/post`; 
		history.push(path);
	}

	const routeChange2 = () =>{ 
		let path = `/posting`; 
		history.push(path);
	}

	return (
		<Container fluid>
			<Row> 
				<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>{user.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
						<Card.Text>
						Welcome {user.name}, 
						this application will help you schedule your Facebook social media content.
						</Card.Text>
							<Button variant="danger" onClick={logOut}>Log Out</Button>
							<Button variant="primary" onClick={routeChange}>Create Post</Button>
					</Card.Body>
				</Card>
			</Row>
			{postData?.map((post, i) => (
			<Row xs={1} md={2} className="g-4" key={i}>
				<Col>
					<Card>
						<Card.Header>Upload on date: {moment(post.date).format('L')}</Card.Header>
						<Card.Img variant="top" src={`http://localhost:1337/${post.picture}`} />
						<Card.Body>
						<Card.Title>{post.name}</Card.Title>
						<Card.Text>
							{post.text}
						</Card.Text>
						<Button variant="success" onClick={routeChange2}>Uplaod to FB</Button>
						</Card.Body>
					</Card>
        		</Col>
			</Row>
			))}
		</Container>
	)
}

export default Dashboard
