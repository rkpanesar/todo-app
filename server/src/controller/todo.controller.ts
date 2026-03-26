import {Request, Response} from 'express';
import { Todo } from '../models/todo.model';

const mapTodo = (doc: any) => ({
    _id: doc._id.toString(),
    title: doc.title,
    completed: doc.completed,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.getTime() : new Date(doc.createdAt).getTime(),
})

export const getTodos = async(req: Request, res: Response) => {
    const todos = await Todo.find().sort({createdAt: -1});
    res.json(todos.map(mapTodo));
}

export const createTodo = async (req: Request, res: Response) => {
    const {title} = req.body;
    const newTodo = await Todo.create({title});
    res.status(201).json(mapTodo(newTodo));
}

export const updateTodo = async(req: Request, res: Response) => {
    const {id} = req.params;
    const updated = await Todo.findByIdAndUpdate(id, req.body, {new: true});
    res.json(mapTodo(updated));
}

export const deleteTodo = async (req: Request, res: Response) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({message: "Todo delete"});
}