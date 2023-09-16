import React, { useState } from "react";

function ShowPassword({ password,copied, handleCopy }) {
  
  return (
    <div className="flex flex-row  gap-2 items-center align-middle justify-center rounded-lg bg-gray-300 border border-black px-2 py-1 mt-4">
      <h1>{password}</h1>
      <button
        className={`${copied ? 'bg-green-500' :'bg-blue-500'} text-white py-1 px-2 rounded-lg`}
        onClick={handleCopy}
        disabled={copied}
      >
        {copied ? "Copied" : 'Copy'}
      </button>
    </div>
  );
}

export default ShowPassword;
