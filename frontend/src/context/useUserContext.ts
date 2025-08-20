import { useContext } from "react"
import { UserContext } from "./context"

export const useUserContext=()=>{
    const context=useContext(UserContext)

    if(!context){
        throw new Error ("usercontext is not defined")
    }
    return context
}