import { create } from 'zustand'
export const useAuthStore = create ((set)=>({
    authUser:{name:"john",_id:123,age:23},
    isLoggedIn:false,
    isLoading : false,
    login:()=>{
        console.log("we Just Logged in")
        set({ isLoggedIn :true , isLoading: true})
    },
}))