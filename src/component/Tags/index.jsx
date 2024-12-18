import React from "react";
import { Link } from "react-router-dom";

function Tags({ tags, forFoodPage }) {
  return (
    <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {forFoodPage ? "Food Tags" : "Categories"}
      </h2>
      <ul className="space-y-3">
        {tags.map((tag, index) => (
          <li key={index}>
            <Link
              to={`/tags/${tag.id}`}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-[#4472C4] transition duration-200"
            >
              <span className="text-gray-700 font-medium">{tag.name}</span>
              <img
                src={tag.imagePath}
                alt={tag.name}
                className="w-10 h-10 object-cover rounded-full"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;
