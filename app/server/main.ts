import fastifyHelmet from "@fastify/helmet"
import fastify, { FastifyReply, FastifyRequest } from "fastify"
import { userSCH } from "../models/user.schema"
import userRoute from "../routes/user.route"
import fastifyJwt, { JWT } from "@fastify/jwt"
import { todosSchemas } from "../models/todolist.schema"
import todosRoute from '../routes/todolist.route';
import { cmtSchemas } from "../models/comment.schema"
import commentRoute from "../routes/comment.route"

export const server = fastify()

declare module "fastify" {
    export interface FastifyInstance{
        authenticate: any;
    }
    interface FastifyRequest {
        jwt: JWT;
    }

}


declare module "@fastify/jwt" {
    interface FastifyJWT{
        user:{
            uuid: string
            name: string
            email: string
        }
    }
}


async function main() {
    server.register(fastifyJwt, {
        secret: "3RilmTZP19sIYX4HOyO7e1t2lJxzqxRSgMKPZFp1xl-EoCK51Rx8SA3N0XElO4aQ",
    })

    server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try{
            await request.jwtVerify()
        }catch(e){
            return reply.send(e);
        }
    })
    server.addHook("preHandler", (req, reply, next) => {
        req.jwt = server.jwt;
        return next();
    });
    server.register(fastifyHelmet, { contentSecurityPolicy: true, xXssProtection: true, global: false })
    
    for(const sch of [...userSCH, ...todosSchemas, ...cmtSchemas]){
        server.addSchema(sch)
    }

    server.register(userRoute, { prefix: "/api/v2"})
    server.register(todosRoute, { prefix: "/api/v2"})
    server.register(commentRoute, { prefix: "/api/v2"})

    try{
        server.listen({port: 8080, host: '0.0.0.0'},)
        console.log(`
        server is running:  http://127.0.0.1:8080/
        `)
    }catch(e){
        process.exit(1)
    }
}

main()