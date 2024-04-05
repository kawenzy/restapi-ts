import { FastifyInstance } from "fastify";
import { $ref } from "../models/todolist.schema";
import { currentTodos, delTPS, getAlTodos, sTodos, todosHANDLER, updateHandler } from "../mod/todolist.controller";



async function todosRoute(server: FastifyInstance){
    server.post('/todos/create',{
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createTodos'),
            response: {
                201: $ref('resTodos')
            }
        }
    },todosHANDLER)


    server.get('/todos/all', {
        preHandler: [server.authenticate]
    },getAlTodos)

    server.get('/todos/:title', {
        preHandler: [server.authenticate]
    }, sTodos)

    server.delete('/todos/trash/:cuid',{
        preHandler: [server.authenticate]
    }, delTPS)

    server.put('/todos/update/:cuid', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('updTodos'),
            response: {
                200: $ref('updResTodos')
            }
        }
    },updateHandler)

    server.get('/currentUser/todos', {
        preHandler: [server.authenticate],
    },currentTodos)
}

export default todosRoute