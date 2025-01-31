import { Link, useNavigate } from "react-router-dom";
import { CommonForm } from "../../src/components/common/form";
import { LoginFormComponentDetails } from "../config/form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthUser } from "../../store/auth/auth.slice";
import { isValid } from "zod";
import { Button } from "@/ui/button";

function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const isValidPassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
        formData.password
      );
    const formdatas = {
      ...formData,
      email: formData.email.toLowerCase(),
    };
    // console.log(Formdata);
    if (formData.password.length >= 8 && isValidPassword) {
      dispatch(AuthUser(formdatas)).then((res) => {
        console.log(res);
        if (res?.payload?.success) {
          navigate("/home");
        } else {
          setError(res?.payload?.error);
        }
      });
    } else {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }
  };
  console.log(error);

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
        <div className="card-body  space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-neutral text-white">
              Don't have an account?
              <Link
                to="/register"
                className="link mx-2 text-white link-primary font-medium"
              >
                Create an account
              </Link>
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}

          <CommonForm
            formComponentDetails={LoginFormComponentDetails}
            formData={formData}
            setFormData={setFormData}
            buttonText="Sign In"
            onSubmit={handleSubmit}
          />

          <div className="text-center">
            <Button
              className="link text-white link-primary text-sm"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
