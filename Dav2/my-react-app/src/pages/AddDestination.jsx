import React, { useState, useEffect } from 'react';
import { createDestination, getDestinations } from '../services/destinationService';

const AddDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    imagePreview: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch destinations on component mount
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await getDestinations();
        setDestinations(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.name && formData.image) {
        setLoading(true);
        const newDestination = await createDestination(formData);
        
        // Update local state with the new destination from backend
        setDestinations([...destinations, newDestination]);
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          image: null,
          imagePreview: ''
        });
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">Error: {error}</div>;

  return (
    <div className="content-wrapper" style={{ marginLeft: '0', padding: '20px' }}>
      <div className="row">
        {/* Add Destination Form */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h5>Add Destination</h5>
            </div>
            <div className="card-body">
              <form id="destinationForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="destinationName">Destination Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="destinationName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="destinationDescription">Description</label>
                  <textarea
                    className="form-control"
                    id="destinationDescription"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="destinationImage">Destination Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="destinationImage"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {formData.imagePreview && (
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                    />
                  )}
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Destination'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Destination List */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h5>Destination List</h5>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((destination, index) => (
                    <tr key={destination._id}>
                      <td>{index + 1}</td>
                      <td>{destination.name}</td>
                      <td>
                        {destination.images && destination.images.length > 0 && (
                          <img
                            src={`http://localhost:3000/img/destinations/${destination.images[0]}`}
                            className="destination-image"
                            alt={`Image of ${destination.name}`}
                            style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDestination;