import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
Search.defaultProps = {
  SearchRoute: "/search/",
  defaultRoute: "/",
  placeholder: " Search Food Mine ",
};
function Search({ SearchRoute, defaultRoute, placeholder }) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const search = () => {
    term ? navigate(SearchRoute + term) : navigate(defaultRoute);
  };

  useEffect(() => {
    setTerm(searchTerm ?? "");
  }, [searchTerm]);

  return (
    <div className="flex justify-center p-4  ">
      <input
        type="text"
        placeholder={placeholder}
        className="border-2 border-gray-300 px-4 py-2 rounded-l-md "
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && search()}
        value={term}
      />
      <button
        onClick={search}
        className="bg-red-500 text-white px-4 py-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
