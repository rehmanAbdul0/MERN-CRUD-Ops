import React from "react";
import { Link } from "react-router-dom";

const ItemCard = (props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <Link to={`/item/${props.obj.id}`} className="block hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          {/* Image Section */}
          {/* <img
            src={props.obj.picture}
            alt={props.obj.name}
            className="w-24 h-24 object-cover rounded mr-4"
          /> */}

          {/* Content Section */}
            <p className="text-sm text-gray-600 mb-1">
              <b>ID:</b> {props.obj.id}
            </p>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {props.obj.description}
            </h3>

            <p className="text-sm text-gray-600 mb-1">
              {props.obj.availability ? "In Stock" : "Out of Stock"}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              {props.obj.category}
            </p>

            <p className="text-sm text-gray-600">
              {props.obj.price}
            </p>

            <p className="text-sm text-gray-600">
              {props.obj.rating}
            </p>

            <p className="text-sm text-gray-600">
              {props.obj.stock}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;