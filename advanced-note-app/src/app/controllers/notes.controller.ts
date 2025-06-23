import express, { Request, Response } from 'express';
import { Note } from '../models/notes.model';


export const notesRoutes = express.Router()

notesRoutes.post('/create-note', async (req: Request, res: Response) => {
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
        message: 'Note Created Successfully!!',
        note
    })
})

notesRoutes.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find()

    res.status(201).json({
        success: true,
        message: 'Note Created Successfully',
        notes
    })
})

notesRoutes.get('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    // const note = await Note.findOne({_id: noteId})
    const note = await Note.findById(noteId)

    res.status(201).json({
        success: true,
        message: 'Note Created Successfully',
        note
    })
})

notesRoutes.patch('/:noteId', async (req: Request, res: Response) => {
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

notesRoutes.delete('/:noteId', async (req: Request, res: Response) => {
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
