import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure you have axios installed

const AmountSpentComponent = ({ amountSpent }) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  //   const [amountInINR, setAmountInINR] = useState(0);
  const [amountInINR, setAmountInINR] = useState(amountSpent);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = 1000;
        // const response = await axios.get(
        //   "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
        // );
        setExchangeRate(response.data.ethereum.inr);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (exchangeRate > 0) {
      const convertedAmount = amountSpent * exchangeRate; // Convert Ether to INR
      setAmountInINR(convertedAmount);
    }
  }, [exchangeRate, amountSpent]);

  return (
    <div>
      <span className="font-semibold text-cyan-400">amountSpent: </span>
      {/* <span className="text-orange-200">{amountInINR.toFixed(2)} ₹</span> */}
      <span className="text-orange-200">{amountInINR} eth</span>
    </div>
  );
};

export default AmountSpentComponent;
