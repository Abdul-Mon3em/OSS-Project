import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { getAllByTags, getAll } from "../../services/foodServices";
function Thumbnails() {
  const { Tag } = useParams();
  const [food, setFood] = useState([]);

  useEffect(() => {
    Tag
      ? getAllByTags(Tag).then((data) => setFood(data))
      : getAll().then((data) => setFood(data));
  }, []);
  return (
    <ul className="flex flex-wrap text-[#e72929] justify-center items-center ">
      {!food ? (
        <span className=" justify-center items-center text-2xl ">
          No food found.
        </span>
      ) : (
        food.map((item) => (
          <li key={item.id} className="w-1/4 p-2">
            <Link
              to={`/food/${item.id}`}
              className="h-[22.5rem] w-[20rem] border-solid border-white rounded-2xl m-[.5rem] flex flex-col overflow-hidden shadow-md "
            >
              <img
                src={`${item.imagePath}`}
                alt={item.name}
                className=" object-cover  h-[14.5rem] rounded-lg"
              />

              <div className="p-2 relative ">
                <h2 className="text-lg font-semibold">{item.name}</h2>

                <div className="text-xl text-[#414141] m-1 ">
                  {" "}
                  {item.price}$
                </div>
              </div>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}

export default Thumbnails;
