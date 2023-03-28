import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Features/UserSlice'
import profileReducer from './Features/ProfileSlice'
import JobReducer from './Features/JobSlice'
import allJobsReducer from './Features/AllJobsSlice'


const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        jobs:JobReducer,
        allJobs:allJobsReducer
    }

})

export default store