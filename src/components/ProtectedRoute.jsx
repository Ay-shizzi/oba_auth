/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation(); // To preserve the location for redirection

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsVerified(user.emailVerified);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  return isVerified ? Element : <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;
