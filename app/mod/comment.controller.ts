import { FastifyReply, FastifyRequest } from "fastify";
import { cmtIPT, cmtUP } from "../models/comment.schema";
import { cmtCt, delCmt, findPost, upcmt, uscmt } from "../service/comment.service";




export async function cmtHandler(req: FastifyRequest<{ Body: cmtIPT, Params: { postId: string } }>, rly: FastifyReply){
    try{
        const body = req.body
        const params = req.params.postId
        const search = await findPost(params)
        if(!search){
            return rly.code(404).send({msg: "content not found"})
        }
        const cmt = await cmtCt({
            ...body,
            userCmId: req.user.uuid,
            postId: params
        })
        return rly.code(201).send(cmt)
    } catch(e) {
        return rly.code(401).send({msg: "sending messgae failed"})
    }
}


export async function delComment(req: FastifyRequest<{Params: {cuid: string}}>, rly: FastifyReply) {
    const params = req.params.cuid
    const user = req.user.uuid
    const cmt = await uscmt(params)

    if(!cmt){
        return rly.code(404).send({msg: "not found"})
    }

    if(user !== cmt.userCmId) {
        return rly.code(401).send({msg: "This is not your comment"})
    }

    await delCmt(params)
    return rly.code(200).send({msg: 'comment has been deleted'})
}

export async function updtCmt(req: FastifyRequest<{Body: cmtUP, Params: {cuid: string}}>, rly: FastifyReply) {
    const body = req.body
    const params = req.params.cuid
    const user = req.user.uuid
    const cmt = await uscmt(params)

    if(!cmt){
        return rly.code(404).send({msg: 'not found'})
    }

    if(user !== cmt.userCmId) {
        return rly.code(401).send({msg: "this is not your comment"})
    }
    await upcmt(params, body)
    return rly.code(201).send({msg: 'succesfully deleted the  comment'})
}