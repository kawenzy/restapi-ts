import { FastifyInstance } from "fastify";
import { $ref } from "../models/comment.schema";
import { cmtHandler, delComment, updtCmt } from "../mod/comment.controller";


async function commentRoute(server: FastifyInstance){
    server.post("/comment/:postId", {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('crtMsg'),
            response: {
                201: $ref('resMsg')
            }
        }
    },cmtHandler)

    server.delete("/comment/del/:cuid", {
        preHandler: [server.authenticate]
    }, delComment)

    server.put("/comment/up/:cuid",{
        preHandler: [server.authenticate]
    }, updtCmt)
}


export default commentRoute