const mongoose = require('mongoose')

const Post = new mongoose.Schema(
	{
		name: { type: String, required: true },
		date: { type: Date, required: true },
		picture: { type: String, required: true },
        text: { type: String, required: true },
        author: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{ collection: 'post-data' }
)

const model = mongoose.model('PostData', Post)

module.exports = model