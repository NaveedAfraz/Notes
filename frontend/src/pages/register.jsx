import { Card, CardContent } from "../ui/card";
import { CommonForm } from "../../src/components/common/form";
import { SignupFormComponentDetails } from "../config/form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateUser } from "../../store/auth/auth.slice";

function Register() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateUser(formData)).then((res) => {
      console.log(res);
      if (res?.payload?.message) {
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen relative"
        style={{
          backgroundImage: `url('/bro-takes-photos-fQtoEnKkSrE-unsplash.jpg')`, // Path to the image in the public folder
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card className="bg-opacity-30 shadow-2xl  p-5 rounded-2xl backdrop-blur-md z-10 border-none ">
          <CardContent className="flex flex-col items-center justify-center w-full flex-1 px-20 mx-1">
            <h2 className="text-4xl font-bold text-white sm:text-3xl my-4">
              Register
            </h2>
            <p className="text-white text-sm mt-2 my-4">
              <span className="text-white">Already have an account?</span>
              <Link className="mx-1.5 text-white" to="/login">
                Login in
              </Link>
            </p>
            <CommonForm
              formComponentDetails={SignupFormComponentDetails}
              formData={formData}
              setFormData={setFormData}
              buttonText="Log In"
              onSubmit={handleSubmit}
            ></CommonForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Register;
