import {Request, Response} from 'express';
import { Todo } from '../models/todo.model';

export const getTodos = async(req: Request, res: Response) => {
    const todos = await Todo.find().sort({createdAt: -1});
    res.json(todos);
}

export const createTodo = async (req: Request, res: Response) => {
    const {title} = req.body;
    const newTodo = await Todo.create({title});
    res.status(201).json(newTodo);
}

export const updateTodo = async(req: Request, res: Response) => {
    const {id} = req.params;
    const updated = await Todo.findByIdAndUpdate(id, req.body, {new: true});
    res.json(updated);
}

export const deleteTodo = async (req: Request, res: Response) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({message: "Todo delete"});
}