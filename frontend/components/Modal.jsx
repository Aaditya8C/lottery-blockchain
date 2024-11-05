import React, { useState } from "react";

const Modal = ({ onClose, connectWallet }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      localStorage.setItem("userName", name); // Store the name in localStorage
      connectWallet(); // Call the connectWallet function
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Enter Your Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            placeholder="Your Name"
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition-all duration-200"
            >
              Connect Wallet
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black font-semibold px-4 py-2 rounded hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
