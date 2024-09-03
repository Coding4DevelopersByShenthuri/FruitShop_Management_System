import React, { useState } from "react";

const AddFruit: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {
      productName: "",
      description: "",
      price: "",
      stock: "",
    };
    let isValid = true;

    if (!formData.productName) {
      newErrors.productName = "Product name is required";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
      isValid = false;
    }

    if (!formData.stock) {
      newErrors.stock = "Stock is required";
      isValid = false;
    } else if (isNaN(Number(formData.stock))) {
      newErrors.stock = "Stock must be a number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted with data:", formData);
      // Add your submission logic here (e.g., send data to backend)
      setFormData({
        productName: "",
        description: "",
        price: "",
        stock: "",
      });
      setErrors({
        productName: "",
        description: "",
        price: "",
        stock: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 font-semibold">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.productName ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-semibold">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700 font-semibold">
              Stock
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.stock ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Fruit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFruit;