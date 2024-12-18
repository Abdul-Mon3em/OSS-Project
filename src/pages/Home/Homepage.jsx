import React, { useEffect, useReducer, useState } from "react";
import Thumbnails from "../../component/Thumbnails";
import {
  search,
  getAll,
  getAllTags,
  getAllByTags,
} from "../../services/foodServices";
import Search from "../../component/Search";
import Tags from "../../component/Tags";
import MasterPanner from "../../component/MasterPanner";
import AdditionPanners from "../../component/AdditionPanners";
import ImageSlider from "../../component/SwiperImage";
import Footer from "../../component/Footer";

function Homepage() {
  const [food, setfood] = useState([]);
  const [tags, settag] = useState([]);

  useEffect(() => {
    getAll().then((food) => setfood(food));
    getAllTags().then((tag) => settag(tag));
  }, []);

  return (
    <>
      <div className=" flex gap-10 m-[70px] ">
        <Tags tags={tags} />
        <MasterPanner />
      </div>
      <AdditionPanners />
      <ImageSlider food={food} />

      <Footer />
    </>
  );
}

export default Homepage;
