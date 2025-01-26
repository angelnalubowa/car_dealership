import React from 'react';

function CarForm() {
  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add a Car</h1>
      <form>
        <label className="block mb-2">
          <span className="text-gray-700">Car Model</span>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter car model"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Price</span>
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter price"
          />
        </label>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CarForm;