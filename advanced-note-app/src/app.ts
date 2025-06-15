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
}, {
    versionKey: false,
    timestamps: true
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

app.get('/notes/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    // const note = await Note.findOne({_id: noteId})
    const note = await Note.findById(noteId)

    res.status(201).json({
        success: true,
        message: 'Note Created Successfully',
        note
    })
})



app.patch('/notes/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const updatedBody = req.body;
    // const note = await Note.updateOne({_id: noteId}, updatedBody, {new: true})
    // const note = await Note.findOneAndUpdate({_id: noteId}, updatedBody, {new: true})
    const note = await Note.findByIdAndUpdate(noteId, updatedBody, {new: true})

    res.status(201).json({
        success: true,
        message: 'Note Updated Successfully',
        note
    })
})


app.delete('/notes/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const note = await Note.findByIdAndDelete(noteId)
    // const note2 = await Note.deleteOne({_id: noteId})
    // const note3 = await Note.findOneAndDelete({_id: noteId})

    res.status(201).json({
        success: true,
        message: 'Note Updated Successfully',
        note
    })
})


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Note App')
})

export default app;