import { FastifyReply, FastifyRequest } from "fastify";
import { loginIPT, regisIPT } from "../models/user.schema";
import { current, findEmail, getAll, register, searchUser } from "../service/user.service";
import { verifyPassword } from '../pkg/hash';
import { server } from "../server/main";
import prisma from "../pkg/prisma";



export async function  regisHANDLER(req: FastifyRequest<{
    Body: regisIPT
}>, rly: FastifyReply) {
    const body = req.body

    try{
        const user = await register(body);
        return rly.code(201).send(user)
    } catch(e){
        console.log(e)
        return rly.code(500).send({message: 'already account'})
    }
}


async function checkToken(userID: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: {uuid: userID},
        select: {token: true}
    })

    return !!user?.token;
}

async function storeToken(userID: string, token: string | null): Promise<void> {
    await prisma.user.update({
        where: {uuid: userID},
        data: {token}
    })
    
}


export async function loginHANDLER(req: FastifyRequest<{
    Body: loginIPT
}>, rly: FastifyReply) {
    const body = req.body

    const user = await findEmail(body.email)

    if(!user) {
        return rly.code(401).send({msg: 'invalid email or password'})
    }


    const vyPass = verifyPassword({
        VerifyPassword: body.password,
        salt: user.salt,
        hash: user.password
    })

    if(vyPass) {
        const {password,salt,...rest} = user
        const tkn = await checkToken(user.uuid)
        if(tkn){
            return rly.code(401).send({ msg: 'Already logged in' });
        }

        const token = server.jwt.sign(rest);

        await storeToken(user.uuid, token)

        return {token: token}
    }else{
        return rly.code(401).send({msg: 'invalid email or password'})
    }
}

export async function logout(req: FastifyRequest, rly: FastifyReply){
    const userID = req.user.uuid;
    await storeToken(userID, null)
    return rly.code(201).send({ msg: 'Successfully logged out' });
}

export async function currentUser(req: FastifyRequest, rly: FastifyReply) {
    const user = await current()

    const userData = user.find(u => req.user.uuid === u.uuid)


    return rly.code(201).send(userData)
}


export async function getAllUser() {
    const user = await getAll()
    return user
}

export async function sUser(req: FastifyRequest<{Params: {uuid: string}}>, rly: FastifyReply ){
    const body = req.params.uuid
    const search = await searchUser(body)

    if(search){
        rly.code(200).send(search)
    }else{
        rly.code(401).send("user not found")
    }
}

export async function updateUser(req: FastifyRequest, rly: FastifyReply){}