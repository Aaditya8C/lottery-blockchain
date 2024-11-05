// Layout Component (e.g., MainLayout.js)
"use client";
import React, { useContext } from "react";
import Loader from "./Loader"; // Import the Loader component
import { TransactionContext } from "./context";

const MainLayout = ({ children }) => {
  const { isLoading } = useContext(TransactionContext); // Access the loading state

  return (
    <div>
      {isLoading && <Loader />} {/* Show the Loader if isLoading is true */}
      {children}
    </div>
  );
};

export default MainLayout;
