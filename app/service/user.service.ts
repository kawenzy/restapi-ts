import { regisIPT, updateIPT } from "../models/user.schema";
import { hassPassword } from "../pkg/hash";
import prisma from "../pkg/prisma";




export async function register(ipt: regisIPT) {
    const { password, ...rest } = ipt
    const { hash, salt } = hassPassword(password)
    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash }
    })

    return user;
}


export async function findEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    })
}

// export async function update(ipt: updateIPT) {
//     const {password, ...rest} = ipt
//     const {} =
// }



export async function getAll() {
    return prisma.user.findMany({
        select: {
            name: true,
            uuid: true,
            email: true
        }
    })
}

export async function current() {
    return prisma.user.findMany({
        select: {
            uuid: true,
            password: true,
            name: true,
            email: true
        }
    })
}

export async function searchUser(uuid: string) {
    return prisma.user.findUnique({
        where: {
            uuid
        },
        select: {
            name: true,
            email: true,
            uuid: true
        }
    })
}