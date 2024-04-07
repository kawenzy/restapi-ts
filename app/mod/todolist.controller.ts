import { FastifyReply, FastifyRequest } from "fastify";
import { todosIPT, updateTodos } from "../models/todolist.schema";
import { create, curTodos, delTodos, getTodos, searchTodos, todosAll, updTd } from "../service/todolist.service";

    

    export async function todosHANDLER(req:FastifyRequest<{
        Body: todosIPT
    }>, rly:FastifyReply){
        try{
        const todos = await create({
            ...req.body,
            authorId: req.user.uuid
        })
        return rly.code(200).send(todos)
    }
        catch(e){
            rly.code(500).send({msg: "already title"})
        }
    }


    export async function getAlTodos() {
        const todos = await todosAll()
        return todos
    } 

    export async function sTodos(req: FastifyRequest<{Params: {title: string}}>, rly: FastifyReply){
        const body = req.params.title
        const search = await searchTodos(body)
        if(search){
            rly.code(200).send(search)
        }else{
            rly.code(404).send({msg: 'user not found'})
        }
    }

    export async function delTPS(req: FastifyRequest<{Params: {cuid: string}}>, rly: FastifyReply){
        const body = req.params.cuid
        const user = req.user.uuid
        const todos = await getTodos(body)

        if(!todos){
            return rly.code(404).send({msg: 'not found content'})
        }

        if(user !== todos.authorId){
            return rly.code(401).send({ msg: `It's not your todo` });
        }

        await delTodos(body)
        return rly.code(200).send({ msg: 'Successfully deleted the todo' });
        
    }


    export async function updateHandler(req: FastifyRequest<{Body: updateTodos, Params: {cuid: string}}>, rly: FastifyReply){
        const body = req.body
        const params = req.params.cuid
        const user = req.user.uuid
        const todos = await getTodos(params)
        if(!todos) {
            return rly.code(404).send({msg: " not found "})
        }

        if(user !== todos.authorId){
            return rly.code(401).send({msg: "This is not your content"})
        }

        const updsTd = await updTd(params,body)
        return rly.code(200).send(updsTd)
    }

    export async function currentTodos(req: FastifyRequest, rly: FastifyReply){
        const todos = await curTodos()
        
        const userTodos = todos.find(u => req.user.uuid === u.authorId)
        if(!userTodos) {
            return rly.code(404).send({msg: "You don't make a todolist"}) 
        }
        return rly.code(201).send(userTodos)
    }