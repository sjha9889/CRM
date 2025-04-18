import React, { useState } from 'react';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    Package_name: '',
    Package_type: '',
    Package_location: '',
    Package_price: '',
    Package_feature: '',
    address: '',
    imageCover: null
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Package_name) newErrors.Package_name = 'Package name is required';
    if (!formData.Package_type) newErrors.Package_type = 'Package type is required';
    if (!formData.Package_location) newErrors.Package_location = 'Location is required';
    if (!formData.Package_price || isNaN(formData.Package_price)) 
      newErrors.Package_price = 'Valid price is required';
    if (!formData.address) newErrors.address = 'Description is required';
    if (!formData.imageCover) newErrors.imageCover = 'Cover image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    setServerError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Package_name', formData.Package_name);
      formDataToSend.append('Package_type', formData.Package_type);
      formDataToSend.append('Package_location', formData.Package_location);
      formDataToSend.append('Package_price', formData.Package_price);
      formDataToSend.append('Package_feature', formData.Package_feature);
      formDataToSend.append('duration', '7'); // Default duration
      formDataToSend.append('maxGroupSize', '10'); // Default group size
      formDataToSend.append('address', formData.address);
      formDataToSend.append('imageCover', formData.imageCover);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/packages', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Server returned non-JSON response');
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create package');
      }

      const data = await response.json();
      alert('Package created successfully!');
      
      // Reset form
      setFormData({
        Package_name: '',
        Package_type: '',
        Package_location: '',
        Package_price: '',
        Package_feature: '',
        address: '',
        imageCover: null
      });
      setErrors({});

    } catch (error) {
      console.error('Error:', error);
      setServerError(
        error.message.includes('<!DOCTYPE html>') 
          ? 'Server error occurred' 
          : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card mt-4">
          <div className="card-body">
            <div className="card-title"><h4>Add Package</h4></div>
            {serverError && <div className="alert alert-danger">{serverError}</div>}
            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Package Name *</label>
                  <input
                    type="text"
                    name="Package_name"
                    value={formData.Package_name}
                    onChange={handleChange}
                    className={`form-control ${errors.Package_name ? 'is-invalid' : ''}`}
                  />
                  {errors.Package_name && <div className="invalid-feedback">{errors.Package_name}</div>}
                </div>

                <div className="form-group col-md-6">
                  <label>Package Type *</label>
                  <select
                    name="Package_type"
                    value={formData.Package_type}
                    onChange={handleChange}
                    className={`form-control ${errors.Package_type ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Type</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Family">Family</option>
                    <option value="Solo">Solo</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                  {errors.Package_type && <div className="invalid-feedback">{errors.Package_type}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Location *</label>
                  <select
                    name="Package_location"
                    value={formData.Package_location}
                    onChange={handleChange}
                    className={`form-control ${errors.Package_location ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Location</option>
                    <option value="Goa">Goa</option>
                    <option value="Manali">Manali</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andaman">Andaman</option>
                  </select>
                  {errors.Package_location && <div className="invalid-feedback">{errors.Package_location}</div>}
                </div>

                <div className="form-group col-md-6">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="Package_price"
                    value={formData.Package_price}
                    onChange={handleChange}
                    className={`form-control ${errors.Package_price ? 'is-invalid' : ''}`}
                  />
                  {errors.Package_price && <div className="invalid-feedback">{errors.Package_price}</div>}
                </div>
              </div>

              <div className="form-group">
                <label>Main Feature *</label>
                <input
                  type="text"
                  name="Package_feature"
                  value={formData.Package_feature}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="E.g., Beach Access, Mountain View, etc."
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  rows="4"
                ></textarea>
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>

              <div className="form-group">
                <label>Package Cover Image *</label>
                <input
                  type="file"
                  name="imageCover"
                  onChange={handleChange}
                  className={`form-control-file ${errors.imageCover ? 'is-invalid' : ''}`}
                  accept="image/*"
                />
                {errors.imageCover && (
                  <div className="invalid-feedback d-block">{errors.imageCover}</div>
                )}
              </div>

              <div className="form-footer mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;




