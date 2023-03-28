import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";



const initialState={
    inputValues:{
        name:'',
        email:'',
        password:'',
        isMember:false,
    },
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    isLoading:true,
    isSidebarOpen:true,
    showLogout:false,

}

export const registerUser=createAsyncThunk('/registerUser',async(user,thunkAPI)=>{
    try {
        const { data } = await customFetch.post("auth/register", user);
        return data;
        
    } catch (error) {
        thunkAPI.rejectWithValue(error.data.message)
    }
    

})
export const loginUser=createAsyncThunk('loginUser',async(user,thunkAPI)=>{
    try {
        const { data } = await customFetch.post('/auth/login',user);
        return data
        
    } catch (error) {
        thunkAPI.rejectWithValue(error.data.message)
        
    }
})


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
     handleChange:(state,{payload})=>{
        const {name,value}=payload;
        state.inputValues[name]=value

     },
     toggleIsMember:(state)=>{
        state.inputValues.isMember=!state.inputValues.isMember
     },
     toggleSidebar:(state)=>{
        state.isSidebarOpen=!state.isSidebarOpen
        
     },
     toggleLogout:(state)=>{
        state.showLogout=!state.showLogout
     },
     logOut:(state)=>{
        state.user=null
        state.showLogout=false
        toast.success('Logout successful')
        localStorage.removeItem('user')
     },
     closeSidebar:(state)=>{
        state.isSidebarOpen=false
     }
     
    },
    extraReducers:{
        [registerUser.pending]:(state)=>{
            state.isLoading=true
        },
        [registerUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            localStorage.setItem("user", JSON.stringify(user));
            toast.success(`hello ${user.name}`)
            
            
        },
        [registerUser.rejected]:(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload)
        },
        [loginUser.pending]:(state)=>{
            state.isLoading=true;
        },
        [loginUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            localStorage.setItem('user',JSON.stringify(user))
            toast.success(`hello ${user.name}`)
        },
        [loginUser.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
        }

    }
})

export const {handleChange,toggleIsMember,toggleSidebar,toggleLogout,logOut,closeSidebar}=userSlice.actions


export default userSlice.reducer