import {z} from "zod"

export const signinInput=z.object({
    name:z.string().regex(/^[A-Za-z\s]+$/,"name must contain only letters and spaces"),
    password:z.string().min(6).refine((value)=>{
        return /[A-Z]/.test(value) && 
        /[a-z]/.test(value) &&
        /[\d]/.test(value) &&
        /[@$%!#&*?]/.test(value),
        {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
    }),
    mobile_number:z.string().regex(/^\d{10}$/, "Mobile number must contain exactly 10 digits")
})
