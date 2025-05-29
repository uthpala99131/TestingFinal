import React, { useState, useEffect } from 'react';

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

  const [spareParts, setSpareParts] = useState([]); // State to hold spare parts data
  const [technicians, setTechnicians] = useState([]); // State to hold technicians data

  // Fetch spare parts from the backend
  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/spareparts');
        const data = await response.json();
        setSpareParts(data.data); // Assuming the backend returns data in this format
      } catch (error) {
        console.error('Error fetching spare parts:', error);
      }
    };
    fetchSpareParts();
  }, []);

  // Fetch technicians from the backend
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/technicians');
        const data = await response.json();
        setTechnicians(data.data); // Assuming the backend returns data in this format
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };
    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically set the spare part price if a spare part is selected
    if (name === 'sparePartName') {
      const selectedSparePart = spareParts.find((part) => part.name === value);
      setFormData((prev) => ({
        ...prev,
        sparePartName: value,
        sparePartPrice: selectedSparePart ? selectedSparePart.price : ''
      }));
    }
    // Automatically fill technician details if a technician is selected
    else if (name === 'technicianName') {
      const selectedTechnician = technicians.find((tech) => tech.name === value);
      setFormData((prev) => ({
        ...prev,
        technicianName: value,
        technicianPhone: selectedTechnician ? selectedTechnician.phoneNum : '',
        technicianSalary: selectedTechnician ? selectedTechnician.salary : ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
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
            <select
              name="sparePartName"
              value={formData.sparePartName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Spare Part</option>
              {spareParts.map((part) => (
                <option key={part._id} value={part.name}>
                  {part.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Spare Part Price (Rs)</label>
            <input
              type="number"
              name="sparePartPrice"
              value={formData.sparePartPrice}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Name</label>
            <select
              name="technicianName"
              value={formData.technicianName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Technician</option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech.name}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technician Phone</label>
            <input
              type="text"
              name="technicianPhone"
              value={formData.technicianPhone}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Future services</label>
            <textarea
              name="technicianReview"
              value={formData.technicianReview}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg"
            ></textarea>
            <textarea
              name="technicianReview"
              value={formData.technicianReview}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg"
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