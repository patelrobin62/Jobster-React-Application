import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";
import { loginUser, registerUser, toggleIsMember,handleChange } from "../Features/UserSlice";

const Register = () => {
  const {
    inputValues: { name, email, password, isMember },
    user,
  } = useSelector((store) => store.user);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return;
    }
    navigate("/dashboard");
  }, [user]);
const inputChange=(e)=>{
  const {name,value}=e.target;
  const obj={name,value};
  
  dispatch(handleChange(obj))
}
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isMember && !name)) {
      toast.warning("Fill out all fields");
      return;
    }
    if (!isMember) {
      dispatch(registerUser({ name, email, password }));

      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
    }
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{isMember ? "Login" : "Register"}</h3>

        {/* name field */}
        {!isMember && <FormRow type="text" name="name" value={name} inputChange={inputChange} />}
        <FormRow type="email" name="email" value={email} inputChange={inputChange} />
        <FormRow type="password" name="password" value={password} inputChange={inputChange}/>

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          {isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            className="member-btn"
            onClick={() => dispatch(toggleIsMember())}
          >
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
