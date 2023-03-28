import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import { getAllJobs } from "../Features/AllJobsSlice";
import Job from "./Job";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { jobs, isLoading, totalJobs,numOfPages,page,status,search,sort,jobType} = useSelector((store) => store.allJobs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page,sort,search,jobType,status]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs > 1 ? `${totalJobs} Jobs Found` : `${totalJobs} Job Found`}
      </h5>
      <div className="jobs">
        {jobs.map((item) => {
          return <Job key={item._id} {...item} />;
        })}
      </div>
      {numOfPages>1 && <PageBtnContainer/>}
      
    </Wrapper>
  );
};

export default JobsContainer;
