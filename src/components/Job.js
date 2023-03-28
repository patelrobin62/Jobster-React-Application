import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment/moment';
import { deleteJob, setEdit } from '../Features/JobSlice';


const Job = ({_id,position,company,jobLocation,jobType,createdAt,status}) => {
  const dispatch=useDispatch();
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.substr(0, 1)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company.toUpperCase()}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo text={jobLocation} icon={<FaLocationArrow />} />
          <JobInfo text={jobType} icon={<FaBriefcase />} />
          <JobInfo text={moment(createdAt).format('MMM Do, YYYY')} icon={<FaCalendarAlt />} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to="/dashboard/addJob" className="btn edit-btn" onClick={()=>dispatch(setEdit({_id,position,company,jobLocation,jobType,status}))}>
              Edit
            </Link>
            <button type="button" className="btn delete-btn" onClick={()=>dispatch(deleteJob(_id))}>
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job