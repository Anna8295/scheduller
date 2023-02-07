import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Form, Button } from 'react-bootstrap';
import jwt from 'jsonwebtoken'
import FacebookLogin from "react-facebook-login";
import axios from "axios";

function App() {
    const history = useHistory()
    const [accessToken, setAccessToken] = useState("");
    // eslint-disable-next-line 
    const [user, setUser] = useState('')
    const [page, setPage] = useState('')

    const [postData, setPostData] = useState([])

    const responseFacebook = response => {
        setAccessToken(response.accessToken);
    };

    async function getPage(event) {
      event.preventDefault()
      const formData = new FormData()
        formData.append('page', page)
    } 

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

    const postRandomQuote = () => {
        axios
          .post(`https://graph.facebook.com/${page}/feed?message=${postData.text}&access_token=${accessToken}`, {
            message: postData.text,
            access_token:
              accessToken
          })
          .then(
            res => {
              const result = res.data;
              console.log(result);
              alert("Success!");
            },
            error => {
              console.log(error);
            }
          );
      };

    return (
      <Container fluid>
		<Row>
			<h1>Posting</h1>
		</Row>
        <Row>
        <FacebookLogin
        appId="886520189261457"
        fields="name,email,picture"
        callback={responseFacebook}
        />
        </Row>
		<Row>
			<Form onSubmit={getPage}>
                 <Form.Group className="mb-3" controlId="formPage">
                    <Form.Label>Page ID</Form.Label>
                    <Form.Control type="name" placeholder="Enter the page ID" value={page}
                            onChange={(e) => setPage(e.target.value)}/>
                </Form.Group>
                <Button variant="success" type="submit" >Get page ID</Button>
            </Form>
 		</Row>
        <Row>
            <Button variant="success" type="submit" onClick={postRandomQuote()}>POST!</Button>
        </Row>
 		</Container>
    )
}
export default App