import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/ChartsContainer';
import AreaChart from './AreaChart';
import BarChart from './BarChart';

const ChartsContainer = () => {
    const [barCharts,setBarCharts]=useState(true)
    const {monthlyApplications:data}=useSelector((store)=>store.allJobs);
  return (
    <Wrapper>
        <h4>Monthly applications</h4>
        <button type='button' onClick={()=>setBarCharts(!barCharts)}>
            {barCharts?'Area Chart':'Bar Charts'}
        </button>
        {barCharts?<BarChart data={data}/>:<AreaChart data={data}/>}
    </Wrapper>
  )
}

export default ChartsContainer