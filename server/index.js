const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Post = require('./models/post.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const path = require('path');

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './picture')))

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0:27017/fb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'picture'))
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
})
  
const upload = multer({
    storage: storage,
})

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.post('/api/post', upload.single('picture'), async (req, res) => {
	console.log(req.file)
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
		await Post.create({
			name: req.body.name,
			date: req.body.date,
			picture: req.file.filename,
			text: req.body.text,
			author: user._id 
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Something missing' })
	}
})

app.get('/api/post', async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
		const posts = await Post.find({'author': user})

		return res.json({ status: 'ok', posts })
	} catch (err) {
		res.json({ status: 'error', error: 'Something missing' })
	}
})



app.listen(1337, () => {
	console.log('Server started on 1337')
})
