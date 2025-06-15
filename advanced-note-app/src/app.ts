import express, {Application, Request, Response} from 'express'
import { model, Schema } from 'mongoose';

const app: Application = express();

app.use(express.json())

// "   Hello World  "       //trim
const noteSchema = new Schema({
    // title: String,
    title: {type: String, required: true, trim: true},
    content: {type: String, default: ''},
    category: {
        type: String,
        enum: ['personal', 'work', 'study', 'other'],
        default: 'personal'
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: {type: String, required: true},
        color: {type: String, default: 'gray'}
    }
})

const Note = model('Note', noteSchema)

app.post('/notes/create-note', async (req: Request, res: Response) => {
    const body = req.body;


    // Approach - 1 of creating a data
    // const myNote = new Note({
    //     title: 'Learning Nodejs',
    //     tags: {
    //         label: 'database'
    //     }
    // })

    // await myNote.save()



    // Approach - 2
    const note = await Note.create(body)

    res.status(201).json({
        success: true,
        message: 'Note Created Successfully',
        note
    })
})

app.get('/notes', async (req: Request, res: Response) => {
    const notes = await Note.find()

    res.status(201).json({
        success: true,
        message: 'Note Created Successfully',
        notes
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Note App')
})

export default app;