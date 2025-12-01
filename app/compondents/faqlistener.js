"use client";
import { useState } from "react";

const FaqListener = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
      <h3
        className={`text-lg font-medium mb-2 ${
          isOpen ? "text-blue-600" : "text-gray-900"
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {question}
      </h3>
      {isOpen && <p className="text-gray-600 mt-2">{answer}</p>}
    </li>
  );
};

export default FaqListener;
