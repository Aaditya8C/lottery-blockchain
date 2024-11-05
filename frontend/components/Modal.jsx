import React, { useState } from "react";
import PopupContainer from "./PopupContainer";
import { useRouter } from "next/navigation";

const Modal = ({ setIsModalOpen, connectWallet }) => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      localStorage.setItem("userName", name); // Store the name in localStorage
      connectWallet(); // Call the connectWallet function
      // onClose(); // Close the modal
      setIsModalOpen(false);
      router.push("/dashboard");
    }
  };

  return (
    <PopupContainer closeBtn setPopup={setIsModalOpen}>
      <div className="bg-cyan-700 w-[90vw] md:w-[30vw] rounded-md shadow-lg py-8 lg:px-10 px-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold mb-4 text-white">Enter Your Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-4 text-black"
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
            {/* <button
            type="button"
            onClick={setIsModalOpen}
            className="bg-gray-300 text-black font-semibold px-4 py-2 rounded hover:bg-gray-400 transition-all duration-200"
          >
            Cancel
          </button> */}
          </div>
        </form>
      </div>
    </PopupContainer>
  );
};

export default Modal;
