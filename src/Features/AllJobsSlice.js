import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import customFetch from "../utils/axios"

const initialValues = {
  search: "",
  status: "all",
  statusOptions: ["all","interview", "pending", "declined"],
  type: "all",
  typeOptions: ["all","full-time", "part-time", "remote", "internship"],
  sort:'latest',
  sortOptions:['latest','oldest','A-Z','Z-A']
};

const initialState={
    jobs:[],
    isLoading:false,
    numOfPages:1,
    totalJobs:0,
    stats:{},
    monthlyApplications:[],
    page:1,
    ...initialValues
}


export const getStats=createAsyncThunk('/getStats',async(_,thunkAPI)=>{
  try {
    const {data}=await customFetch.get('/jobs/stats',{
      headers:{
        authorization:`Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    return data
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
})

export const getAllJobs=createAsyncThunk('/getAllJobs',async(name,thunkAPI)=>{
  const {page,status,search,type,sort}=thunkAPI.getState().allJobs
  let url=`/jobs?status=${status}&jobType=${type}&sort=${sort}&page=${page}`
    try {
      if(search){
        url=url+ `&search=${search}`
      }
        const {data}=await customFetch.get(url,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

const AllJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange:(state,{payload})=>{
      const {name,value}=payload
      state[name]=value
    },
    clearFilters:(state)=>{
      return {...state,...initialValues}
    },
    changePage:(state,{payload})=>{
      state.page=payload
     
    }
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      const { jobs, totalJobs, numOfPages } = payload;
      state.jobs = jobs;
      state.isLoading = false;
      state.totalJobs=totalJobs
      state.numOfPages=numOfPages
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getStats.pending]:(state)=>{
      state.isLoading=true
    },
    [getStats.fulfilled]:(state,{payload})=>{
      
       
       state.isLoading=false
       state.stats=payload.defaultStats
       state.monthlyApplications = payload.monthlyApplications;
    },
    [getStats.rejected]:(state,{payload})=>{
      state.isLoading=false;
      toast.error(payload)
    }
  },
});

export const {showLoading,hideLoading,handleChange,clearFilters,changePage}=AllJobsSlice.actions

export default AllJobsSlice.reducer