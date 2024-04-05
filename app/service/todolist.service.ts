import { todosIPT, updateTodos } from "../models/todolist.schema";
import prisma from "../pkg/prisma";



export async function create(data: todosIPT & {authorId: string}){
    return prisma.todolist.create({
        data
    })
}

export async function todosAll(){
    return prisma.todolist.findMany({
        select: {
            cuid: true,
            title: true,
            content: true,
            createAt: true,
            updateAt: true,
            author:{
                select: {
                    name:true,
                    email: true,
                    uuid: true,
                }
            },
            comments: {
                select: {
                    cuid: true,
                    message: true,
                    createAt: true,
                    updateAt: true,
                    userCm: {
                        select: {
                            uuid: true,
                            name: true,
                            email: true,
                        }
                    }
                    
                }
            }
        }
    })
}

export async function searchTodos(title: string){
    return prisma.todolist.findMany({
        where: {
            title
        },
        select: {
            cuid: true,
            title: true,
            content: true,
            createAt: true,
            updateAt: true,
            author:{
                select: {
                    name:true,
                    email: true,
                    uuid: true,
                }
            },
            comments: {
                select: {
                    cuid: true,
                    message: true,
                    createAt: true,
                    updateAt: true,
                    userCm: {
                        select: {
                            uuid: true,
                            name: true,
                            email: true,
                        }
                    }
                    
                }
            }
        }
    })
}

export async function delTodos(cuid: string){
    return prisma.todolist.delete({
        where:{
            cuid
        },
        select: {
            authorId: true,
        }
    })
}

export async function getTodos(cuid: string) {
    return prisma.todolist.findUnique({
        where: {
            cuid
        },
        select: {authorId: true}
    })
}

export async function updTd(cuid: string, ipt: updateTodos){
    const {content, title} = ipt
    const todos = await prisma.todolist.update({
        where: { cuid },
        data: {title: title, content: content}
    })
    return todos
}

export async function curTodos(){
    return prisma.todolist.findMany({
        select: {
            authorId: true,
            content: true,
            title: true,
            cuid: true,
            createAt: true,
            updateAt: true,
            _count: true,
            comments: true,
        },
    })
}

export async function usTs() {
    return prisma.todolist.findMany({
        select: {
            authorId: true
        }
    })
}