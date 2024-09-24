import React from "react";
import factosLogo from "./img/factor-logo.svg";

const Header = ({ showForm, setShowForm }) => {
  return (
    <div>
      <header className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between ">
          <div className="flex gap-4 items-center">
            <img src={factosLogo} />
            <h1 className="font-bold text-white text-5xl">Factos</h1>
          </div>

          <button
            className="text-white py-[16px] px-[33px] rounded-full bg-[#F49C4B] text-3xl"
            onClick={() => setShowForm((show) => !show)}
          >
            {showForm ? "Close" : "Share a fact"}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
