import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { hideLoading, showLoading,getAllJobs } from "./AllJobsSlice";
import { logOut } from "./UserSlice";

const identifier=JSON.parse(localStorage.getItem('user'))

const initialState={
    isLoading:false,
    position:'',
    company:'',
    jobLocation:identifier?identifier.location:'',
    jobTypeOptions:['full-time','part-time','remote','internship'],
    jobType:'full-time',
    statusOptions:['interview','declined','pending'],
    status:'pending',
    isEditing:false,
    editJobID:''
}

export const createJob=createAsyncThunk('/createUser',async(job,thunkAPI)=>{
    try {
        const { data } = await customFetch.post("/jobs", job, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        return data;
        
    } catch (error) {
        if(error.response.status===401){
            toast.error('unauthorized user');
            thunkAPI.dispatch(logOut())
        }
        return thunkAPI.rejectWithValue(error.response.data.msg)
        
    }
    
})

export const deleteJob=createAsyncThunk('/deleteJob',async(id,thunkAPI)=>{
    thunkAPI.dispatch(showLoading())
    const {data}=await customFetch.delete(`/jobs/${id}`,{
        headers:{
            authorization:`Bearer ${thunkAPI.getState().user.user.token}`
        }
    })
    if(data){
        thunkAPI.dispatch(hideLoading())
        thunkAPI.dispatch(getAllJobs())
    }
})

export const editJob=createAsyncThunk('/editJob',async(job,thunkAPI)=>{
    try {
        const id = thunkAPI.getState().jobs.editJobID;
        const { data } = await customFetch.patch(`/jobs/${id}`,job,{
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        if(data){
            thunkAPI.dispatch(clearValues())
        }
        return data;
        
    } catch (error) {
        if(error.response.status===401){
            thunkAPI.dispatch(logOut())
            return thunkAPI.rejectWithValue('Unauthorized user')

        }
        return thunkAPI.rejectWithValue(error.response.data.msg)
        
    }
    
})

const jobSlice=createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange:(state,{payload})=>{
            const {name,value}=payload;
            state[name]=value
        },
        clearValues:(state)=>{
           return {...initialState}

        },
       setEdit:(state,{payload})=>{
        const {_id,position,company,jobLocation,jobType,status}=payload
        state.isEditing=true
        state.editJobID=_id
        state.position=position
        state.company=company
        state.jobLocation=jobLocation
        state.jobType=jobType
        state.status=status
        
       }

    },
    extraReducers:{
        [createJob.pending]:(state)=>{
            state.isLoading=true
        },
        [createJob.fulfilled]:(state)=>{
            state.isLoading=false
            toast.success('Job created successfully')
            
        },
        [createJob.rejected]:(state,{payload})=>{
           
            state.isLoading=false
            toast.error(payload)
        },
        [editJob.pending]:(state)=>{
            state.isLoading=true
        },
        [editJob.fulfilled]:(state)=>{
            state.isLoading=false
            state.isEditing=false
            state.editJobID=''
            toast.success('edit successful')
        },
        [editJob.rejected]:(state,{payload})=>{
            state.isLoading=false
            state.isEditing=false
            state.editJobID=''
            toast.error(payload)
        }
    }
})

export const {handleChange,clearValues,setEdit}=jobSlice.actions

export default jobSlice.reducer