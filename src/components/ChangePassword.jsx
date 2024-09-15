import React, { useState } from "react";
import { auth } from "../firebase";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate for navigation

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;

      // Re-authenticate the user before changing the password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Change the password
      await updatePassword(user, newPassword);

      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setNewPassword("");
      setCurrentPassword("");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to change password. Check your current password.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 w-full p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h2 className="text-xl font-semibold">Change Password</h2>
            <form
              className="w-full max-w-xs mt-8"
              onSubmit={handleChangePassword}
            >
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              <div className="relative mt-5">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                disabled={loading}
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </form>
            <button
              onClick={() => navigate(-1)}
              className="mt-5 text-indigo-500 hover:text-indigo-700 focus:outline-none"
            >
              Back
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
