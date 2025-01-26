import React from 'react';

function Dashboard() {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary text-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-4xl font-bold">124</p>
        </div>
        <div className="bg-secondary text-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Available Cars</h2>
          <p className="text-4xl font-bold">53</p>
        </div>
        <div className="bg-primary text-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Ongoing Trips</h2>
          <p className="text-4xl font-bold">7</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;