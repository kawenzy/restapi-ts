import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";



const dtUSER = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error:  "Invalid type of Email"
    }).email(),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Invalid format for Name"
    }),
}

const schUSER = z.object({
    ...dtUSER,
    password:  z.string({
        required_error: "password is required",
        invalid_type_error: 'password error'
    })
})


const regisRESPON = z.object({
    uuid: z.string(),
    ...dtUSER
})


const loginSCH = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error:  "Invalid type of Email"
    }).email(),
    password:  z.string({
        required_error: "password is required",
        invalid_type_error: 'password error'
    })
})


const loginRESPON = z.object({
    token: z.string()
})

const updateSch = z.object({
    ...dtUSER,
    password:  z.string({
        required_error: "password is required",
        invalid_type_error: 'password error'
    })
})

const updateRes = z.object({
    message :z.string()
})

export type regisIPT = z.infer<typeof schUSER>
export type loginIPT = z.infer<typeof loginSCH>
export type updateIPT = z.infer<typeof updateSch>

const models = {
    schUSER,
    regisRESPON,
    loginSCH,
    loginRESPON,
    updateSch,
    updateRes
}

export const {schemas: userSCH, $ref} = buildJsonSchemas(models, {$id: "userSCH"})