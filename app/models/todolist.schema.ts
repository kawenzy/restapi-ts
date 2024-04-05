import { z } from "zod";
import { buildJsonSchemas } from 'fastify-zod';



const dTodos = {
    title: z.string({
        required_error: "title is required",
        invalid_type_error:  "Invalid type of title"
    }),
    content: z.string({
        required_error: "content is required",
        invalid_type_error: "Invalid format for content"
    }),
}

const reqTodos = {
    cuid: z.string(),
    createAt: z.string(),
    updateAt: z.string()
}

const createTodos = z.object({
    ...dTodos,
})

const resTodos = z.object({
    ...dTodos,
    ...reqTodos
})

const updTodos = z.object({
    ...dTodos
})

const updResTodos = z.object({
    ...dTodos,
    ...reqTodos
})

export type todosIPT = z.infer<typeof createTodos>
export type updateTodos = z.infer<typeof updTodos>

const models = {
    createTodos,
    resTodos,
    updTodos,
    updResTodos
}

export const {schemas: todosSchemas, $ref} = buildJsonSchemas(models, {$id: 'todosShemas'})