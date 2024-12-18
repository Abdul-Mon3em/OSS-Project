import React from "react";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import NotFound from "../../component/NotFound";

function CartPage() {
  const { cart, RemoveItem, ChangedCartItem } = useCart();
  console.log(cart);
  return (
    <div className="flex justify-center p-4">
      {cart.items.length == 0 ? (
        <NotFound message={"The Cart is Empty!"} />
      ) : (
        <div className="w-full max-w-4xl border rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li
                key={item.food.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`${item.food.imagePath}`}
                    alt={item.food.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <Link
                    to={`/food/${item.food.id}`}
                    className="text-lg font-semibold text-purple-700"
                  >
                    {item.food.name}
                  </Link>
                </div>

                <button
                  className="text-[#4472C4] hover:text-[#4472a4]"
                  onClick={() => RemoveItem(item.food.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8   items-center border-t pt-4">
            <div className="text-lg font-semibold text-center">
              <div>Count: {cart.TotalCount}</div>
              <div>Price: ${cart.TotalPrice}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
