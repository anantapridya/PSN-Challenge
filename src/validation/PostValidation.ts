import * as yup from 'yup'

export const postSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required('Field is required'),
    email: yup.string().email('Invalid email format').required('Field is required'),
    body: yup.string().required('Field is required')
})

export type PostSchema = yup.InferType<typeof postSchema>