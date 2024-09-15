// src/components/UserCard.js
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const UserCard = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);

  const handleToggleBalance = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Balance</h3>
            <p className="text-lg mt-2">
              {balanceVisible ? "₦1,234.56" : "₦****"}
              <button onClick={handleToggleBalance} className="ml-2 text-black">
                {balanceVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-4">Account Type: Savings</p>
            <p className="text-gray-600 mb-4">Status: Active</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Fund Account
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Transaction History
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
