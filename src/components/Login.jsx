/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoEyeOffOutline, IoEyeOutline, IoFingerPrint } from "react-icons/io5";
import { Slide, ToastContainer, toast } from "react-toastify";
import "@passageidentity/passage-elements/passage-auth"; // Import Passage Web Component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBiometricLogin, setIsBiometricLogin] = useState(false); // State to handle biometric login flow
  const [biometricLoading, setBiometricLoading] = useState(false); // Biometric login loading state
  const navigate = useNavigate();

  // Firebase Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      navigate("/home");
    } catch (err) {
      setError(err.message);
      toast.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // Passage Biometric Login
  const handleBiometricLoginComplete = () => {
    setBiometricLoading(false);
    toast.success("Fingerprint authenticated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    navigate("/home");
  };

  const handleBiometricLoginError = () => {
    setBiometricLoading(false);
    toast.error("Biometric login failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src="./logo.png" className="w-80 mx-auto" alt="Logo" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-bold">Login</h1>
            <div className="w-full flex-1 mt-8">
              {!isBiometricLogin ? (
                // Email/Password Login Form
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col items-center"
                >
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="relative mt-5 w-full">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loading}
                  >
                    <span>{loading ? "Logging In..." : "Login"}</span>
                  </button>
                </form>
              ) : (
                // Passage Biometric Login
                <div className="w-full mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Use Biometric Authentication
                  </h2>
                  <passage-auth
                    app-id="odOE1SXlwwanNfCLPKydmTYe"
                    auth="signin"
                    onComplete={handleBiometricLoginComplete} // Trigger on successful biometric login
                    onError={handleBiometricLoginError} // Error handler for biometric login
                  ></passage-auth>
                  {biometricLoading && (
                    <div className="mt-5 text-gray-500">Authenticating...</div>
                  )}
                </div>
              )}

              {/* Biometric login button */}
              <button
                onClick={() => {
                  setIsBiometricLogin(!isBiometricLogin);
                  setBiometricLoading(true); // Start loading on biometric login start
                }}
                className="mt-5 w-full flex justify-center"
              >
                <IoFingerPrint className="text-6xl border-2 border-indigo-500 rounded-full p-2" />
              </button>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Don&apos;t have an account? <Link to="/">Sign Up</Link>
                </div>
              </div>
              <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by Oba&apos;s
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>
                and its
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
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

export default Login;
