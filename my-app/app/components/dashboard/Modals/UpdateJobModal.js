// components/dashboard/Modals/UpdateJobModal.js
import React, { useState } from 'react';

const UpdateJobModal = ({ job, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    status: job?.status || '',
    sparePartName: job?.sparePartName || '',
    sparePartPrice: job?.sparePartPrice || '',
    technicianName: job?.technicianName || '',
    technicianPhone: job?.technicianPhone || '',
    technicianSalary: job?.technicianSalary || '',
    technicianReview: job?.technicianReview || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const updatedJob = await response.json();
      onUpdate(updatedJob.data); // Pass the updated job back to the parent
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
        <h2 className="text-xl font-bold mb-4">Update Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Spare Part Name</label>
            <input
              type="text"
              name="sparePartName"
              value={formData.sparePartName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Spare Part Price (₹)</label>
            <input
              type="number"
              name="sparePartPrice"
              value={formData.sparePartPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Name</label>
            <input
              type="text"
              name="technicianName"
              value={formData.technicianName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Phone</label>
            <input
              type="text"
              name="technicianPhone"
              value={formData.technicianPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Salary (₹)</label>
            <input
              type="number"
              name="technicianSalary"
              value={formData.technicianSalary}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Review</label>
            <textarea
              name="technicianReview"
              value={formData.technicianReview}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-black transition-colors bg-white border border-black rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobModal;