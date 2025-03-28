import { Link, useNavigate } from "react-router-dom";
import { CommonForm } from "../../src/components/common/form";
// You can define this similar to LoginFormComponentDetails
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../store/auth/auth.slice"; // Use appropriate action for reset password
import { Button } from "@/ui/button";
import {
  forgotPasswordFormComponentDetails,
  ResetPasswordFormComponentDetails,
} from "@/config/form";

function ForgotPassword() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (formData.email) {
      dispatch(forgotPassword({ email: formData.email })).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen relative"
      style={{
        backgroundImage: `url('/bro-takes-photos-fQtoEnKkSrE-unsplash.jpg')`, // Path to the image in the public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card w-full flex justify-center max-w-md bg-opacity-30 shadow-2xl p-8 rounded-2xl backdrop-blur-md z-10">
        <div className="card-body space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Forget Your Password
            </h1>
            <p className="text-sm text-neutral text-white">
              Remember your password?
              <Link
                to="/login"
                className="link mx-2 text-white link-primary font-medium"
              >
                Go back to login
              </Link>
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}

          <CommonForm
            formComponentDetails={forgotPasswordFormComponentDetails} // You will need to define this
            formData={formData}
            setFormData={setFormData}
            buttonText="Reset Password"
            onSubmit={handleSubmit}
          />

          <div className="text-center">
            <Link
              to="/register"
              className="link text-white link-primary font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
