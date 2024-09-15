import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import "@passageidentity/passage-elements/passage-auth";

const SignUp = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [biometricSetup, setBiometricSetup] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { email, password } = formState;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      toast.success("Check your email to verify your account.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });

      // Enable biometric setup after sign-up
      setBiometricSetup(true);
    } catch (err) {
      handleFirebaseErrors(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseErrors = (err) => {
    let errorMessage = "An error occurred.";
    if (err.code === "auth/email-already-in-use") {
      errorMessage = "Email already in use.";
    } else if (err.code === "auth/invalid-email") {
      errorMessage = "Invalid email format.";
    } else if (err.code === "auth/weak-password") {
      errorMessage = "Password is too weak. Please use a stronger password.";
    }
    setError(errorMessage);
    toast.error(errorMessage);
  };

  const handleBiometricRegister = async () => {
    try {
      toast.success("Biometric registration complete!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error("Biometric registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src="./logo.png" className="w-80 mx-auto" alt="Logo" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-bold">Sign Up</h1>
            <div className="w-full flex-1 mt-8">
              {!biometricSetup ? (
                <form
                  onSubmit={handleSignUp}
                  className="flex flex-col items-center"
                >
                  <input
                    name="fullName"
                    className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm mt-5"
                    type="text"
                    placeholder="Full Name"
                    value={formState.fullName}
                    onChange={handleInputChange}
                  />
                  <input
                    name="email"
                    className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm mt-5"
                    type="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                  <div className="relative mt-5 w-full">
                    <input
                      name="password"
                      className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formState.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                    disabled={loading}
                  >
                    <span>{loading ? "Signing Up..." : "Sign Up"}</span>
                  </button>
                </form>
              ) : (
                <div className="w-full flex-1 mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Set up Biometric Authentication
                  </h2>
                  <passage-auth
                    app-id="odOE1SXlwwanNfCLPKydmTYe"
                    auth="signup"
                    onComplete={handleBiometricRegister}
                  ></passage-auth>
                </div>
              )}
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </div>
              <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by Oba&apos;s
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>
                and its{" "}
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
