import { cmtIPT, cmtUP } from "../models/comment.schema";
import prisma from "../pkg/prisma";


export async function cmtCt(data: cmtIPT & {userCmId: string, postId: string}){
    return prisma.comment.create({
        data
    })
}

export async function findPost(postId: string){
    return prisma.comment.findMany({
        where: {postId}
    })
}

export async function delCmt(cuid: string) {
    return prisma.comment.delete({
        where: {
            cuid
        },
        select: {
            userCmId: true
        }
    })
}

export async function uscmt(cuid:string){
    return prisma.comment.findUnique({
        where: {
            cuid
        },
        select: { userCmId : true }
    })
}

export async function upcmt(cuid: string, ipt: cmtUP) {
    const {message} = ipt
    const cmt = await prisma.comment.update({
        where: {cuid},
        data: {message: message}
    })
    return cmt
}