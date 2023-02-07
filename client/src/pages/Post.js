import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Form, Button } from 'react-bootstrap';


function App() {
	const history = useHistory()
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [picture, setPicture] = useState(null)
    const [text, setText] = useState('')

    async function createPost(event) {
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('date', date)
        formData.append('picture', picture)
        formData.append('text', text)

        const response = await fetch('http://localhost:1337/api/post', {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            body: formData
        })

	    const data = await response.json()

        if (data.status === 'ok') {
            history.push('/dashboard')
        }
    }

return (
	<Container fluid>
		<Row>
			<h1>Create Post</h1>
		</Row>
		<Row>
			<Form onSubmit={createPost}>
                 <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter the post name" value={name}
                            onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Select date</Form.Label>
                    <Form.Control type="date"  value={date}
                            onChange={(e) => setDate(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPicture">
                    <Form.Label>Upload picture</Form.Label>
                    <Form.Control type="file" placeholder="Upload" name="picture" onChange={(e) => setPicture(e.target.files[0])} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>Write some content</Form.Label>
                    <Form.Control type="text" placeholder="..." value={text}
                        onChange={(e) => setText(e.target.value)}/>
                </Form.Group>
                <Button variant="success" type="submit">Create</Button>
            </Form>
 		</Row>
 		</Container>
 	)
 }

 export default App
