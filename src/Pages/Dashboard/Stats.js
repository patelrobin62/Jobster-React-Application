import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChartsContainer, Loading, StatsContainer } from '../../components'
import { getStats } from '../../Features/AllJobsSlice'

 const Stats = () => {
  const dispatch=useDispatch()
  const {isLoading,monthlyApplications}=useSelector((store)=>store.allJobs)
  console.log(monthlyApplications)


  useEffect(()=>{
    dispatch(getStats())
  },[])

  if(isLoading){
    return <Loading center/>
  }
  return (
    <>
    <StatsContainer/>
    {monthlyApplications.length>0 && <ChartsContainer/>}

    </>
  )
}

export default Stats
