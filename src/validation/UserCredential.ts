import * as yup from 'yup'

export const userSchema = yup.object({
    username: yup.string().required('Field is required'),
    password: yup.string().required('Field is required')
})

export type UserSchema = yup.InferType<typeof userSchema>