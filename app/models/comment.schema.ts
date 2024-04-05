import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";



const msg = {
    message: z.string(),
}

const reqmsg = {
    cuid: z.string(),
    createAt: z.string(),
    updateAt: z.string()
}

const crtMsg = z.object({
    ...msg
})

const resMsg = z.object({
    ...msg,
    ...reqmsg
})

const updMsg = z.object({
    ...msg
})

const resUpd = z.object({
    ...msg,
    ...reqmsg
})

export type cmtIPT = z.infer<typeof crtMsg>
export type cmtUP = z.infer<typeof updMsg>

const models = { 
    crtMsg,
    resMsg,
    updMsg,
    resUpd
}

export const {schemas: cmtSchemas,$ref} = buildJsonSchemas(models, {$id: "cmtSchemas"})