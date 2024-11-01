"use client";
import React from "react";
import { Medal, Trophy } from "lucide-react";
import classNames from "classnames";

const Winners = ({ winners }) => {
  const positions = [
    { place: "1st", prize: winners.first, starColor: "text-yellow-600" },
    { place: "2nd", prize: winners.second, starColor: "text-gray-600" },
    { place: "3rd", prize: winners.third, starColor: "text-red-400" },
  ];

  return (
    <div className="text-center p-14 bg-gray-100 rounded-lg shadow-xl mt-8 m-24">
      <h2 className="text-3xl font-bold text-orange-600">🎉 Winners 🎉</h2>
      <Trophy className="text-yellow-500 mt-4 mx-auto" size={50} />
      {positions.map(({ place, prize, starColor }, index) => (
        <div
          key={index}
          className="flex justify-center items-center bg-white rounded-md shadow-lg my-5 p-4 w-fit mx-auto"
        >
          <Medal
            className={classNames("mr-3 animate-pulse", starColor)}
            size={24}
          />
          <span className="text-lg font-semibold text-blue-600">
            {place} Place:
          </span>
          <span className="text-lg ml-3">{prize || "TBA"}</span>
        </div>
      ))}
      <p className="text-xl font-bold text-orange-600 mt-6">
        Congratulations to All Winners! 🎉
      </p>
    </div>
  );
};

export default Winners;
