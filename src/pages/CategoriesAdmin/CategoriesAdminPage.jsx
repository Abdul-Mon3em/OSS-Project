import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DeleteFoodId,
  getAll,
  getAllTags,
  search,
} from "../../services/foodServices";
import Search from "../../component/Search";
import { toast } from "react-toastify";

function CategoriesAdminPage() {
  const [foods, setFoods] = useState();
  const { searchTerm } = useParams();
  useEffect(() => {
    LoadFoods();
  }, [searchTerm]);
  const LoadFoods = async () => {
    const foods = searchTerm ? await search(searchTerm) : await getAllTags();
    setFoods(foods);
  };
  const DeleteFood = async (food) => {
    const confirmed = window.confirm("Are you sure you want to delete");
    if (!confirmed) return;
    await DeleteFoodId(food.id);
    toast.success(`"${food.name}"had beed deleted`);
    setFoods(foods.filter((f) => f.id !== food.id));
  };
  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Foods</h1>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Search SearchRoute={"/admin/foods/"} defaultRoute={"/admin/foods"} />
        </div>
        <Link
          to="/admin/addcategory"
          className="bg-red-800 text-white rounded-full px-4 py-2 font-medium mb-4 inline-block hover:bg-red-900"
        >
          Add Category +
        </Link>
      </div>
      <div className="space-y-4">
        {foods &&
          foods.map((food) => (
            <div
              key={food.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={food.imagePath}
                  alt={food.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <Link
                  to={`/food/${food.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {food.name}
                </Link>
              </div>
              <div className="text-gray-700">${food.price}</div>
              <div className="flex space-x-4">
                <Link
                  to={`/admin/editcategory/${food.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => DeleteFood(food)}
                  className="text-blue-600 hover:underline"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CategoriesAdminPage;
