const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// const url = process.env.MONGODB_URI
const url = 'mongodb+srv://kaganakcelikschool:password-ftodo@cluster0.yuu5jhp.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0'

console.log('connecting to', url)

mongoose.connect(url)
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

const userSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		notes: [
			{
				content: String,
				done: Boolean,
			}
		]
	}
)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		returnedObject.notes = returnedObject.notes.map(note => {return {content: note.content, done: note.done, id: note._id.toString()}})
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('User', userSchema)