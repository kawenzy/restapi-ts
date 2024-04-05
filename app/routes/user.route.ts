import { FastifyInstance } from "fastify";
import { $ref } from "../models/user.schema";
import { currentUser, getAllUser, loginHANDLER, logout, regisHANDLER, sUser } from "../mod/user.controller";

async function userRoute(server: FastifyInstance) {

    server.post('/register', {
        schema: {
            body: $ref('schUSER'),
            response: {
                201: $ref('regisRESPON')
            }
        }
    }, regisHANDLER)


    server.post('/login', {
        schema: {
            body: $ref('loginSCH'),
            response: {
                201: $ref('loginRESPON')
            }
        }
    }, loginHANDLER)


    server.delete('/logout',{
        preHandler: [server.authenticate]
    },logout)

    server.get('/currentUser', {
        preHandler: [server.authenticate]
    }, currentUser)

    server.get('/users', {
        preHandler: [server.authenticate]
    }, getAllUser)


    server.get('/user/:uuid', {
        preHandler: [server.authenticate]
    }, sUser)
}

export default userRoute