import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "react-loaders";

export const UserProtected = ({ children }) => {
  const { user, sessionLoading } = useSelector((state) => state.auth);

  if (sessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader type="ball-beat" active={true} />
      </div>
    );
  }

  if (user && user.login) {
    return children;
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};


