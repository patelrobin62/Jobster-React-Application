import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { logOut } from "./UserSlice";

const identifier=JSON.parse(localStorage.getItem('user'))



const initialState = {
  name: identifier ? identifier.name : "",
  email: identifier ? identifier.email : "",
  lastName: identifier ? identifier.lastName : "",
  location: identifier ? identifier.location : "",
  isLoading: false,
  user:null
};

export const profileUpdate=createAsyncThunk('user/updateUser',async(name,thunkAPI)=>{
    try {
        const {data}=await customFetch.patch('/auth/updateUser',name,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        });
        return data
    } catch (error) {
        if(error.response.status===401){
            thunkAPI.dispatch(logOut())
            return thunkAPI.rejectWithValue('unauthorized logging out')
        }
        
       return thunkAPI.rejectWithValue(error.response.data.msg)
        
    }

})


const ProfileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        handleChange:(state,{payload})=>{
            const {name,value}=payload
            state[name]=value
        }
    },
    extraReducers:{
        [profileUpdate.pending]:(state)=>{
            state.isLoading=true
        },
        [profileUpdate.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            localStorage.setItem('user',JSON.stringify(state.user))
            toast.success('user updated')
        },
        [profileUpdate.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
        }
    }

})

export const {handleChange}=ProfileSlice.actions

export default ProfileSlice.reducer