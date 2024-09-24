import React from "react";
import "animate.css";

const CategoryFilter = ({ initialFacts, categories, setCurrCategory }) => {
  return (
    <div>
      <aside>
        <ul>
          <li className="mb-8">
            <button
              onClick={() => {
                setCurrCategory("all");
              }}
              className="btn btn-all-categories "
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.name} className="mb-4">
              <button
                //   className="px-[60px] py-[20px] text-xl border-none rounded-full bg-blue-600 bg-gradient-to-br from-[#3b82f6] via-[#ef4444] to-[#eab308]"
                className="btn"
                style={{ backgroundColor: cat.color }}
                onClick={() => {
                  setCurrCategory(cat.name);
                }}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default CategoryFilter;
