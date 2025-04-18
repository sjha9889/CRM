import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPackages, deletePackage } from '../services/packageService';

const ViewPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        setPackages(packages.filter(pkg => pkg._id !== id));
      } catch (err) {
        console.error('Failed to delete package:', err);
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading packages...</div>;
  if (error) return <div className="alert alert-danger mt-5">Error: {error}</div>;

  return (
    <div className="content-wrapper" style={{ marginLeft: '0', padding: '20px' }}>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="page-title mb-0">Packages</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Packages</li>
                  </ol>
                </nav>
              </div>
              <div>
                <button className="btn btn-outline-primary mr-2">
                  <i className="fas fa-download mr-1"></i> Download
                </button>
                <Link to="/add-package" className="btn btn-primary">
                  <i className="fas fa-plus mr-1"></i> Add Package
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: '5%' }}>ID</th>
                        <th style={{ width: '15%' }}>Package Name</th>
                        <th style={{ width: '10%' }}>Type</th>
                        <th style={{ width: '10%' }}>Location</th>
                        <th style={{ width: '10%' }}>Price</th>
                        <th style={{ width: '15%' }}>Address</th>
                        <th style={{ width: '10%' }}>Session</th>
                        <th style={{ width: '10%' }}>Created</th>
                        <th style={{ width: '10%' }}>Updated</th>
                        <th style={{ width: '15%' }} className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg) => (
                        <tr key={pkg._id}>
                          <td>{pkg._id.substring(0, 6)}...</td>
                          <td>
                            <Link to={`/package-details/${pkg._id}`} className="text-primary">
                              {pkg.Package_name}
                            </Link>
                          </td>
                          <td>{pkg.Package_type}</td>
                          <td>{pkg.Package_location}</td>
                          <td>${pkg.Package_price}</td>
                          <td>{pkg.address}</td>
                          <td>{new Date(pkg.createdAt).getFullYear()}</td>
                          <td>{new Date(pkg.createdAt).toLocaleDateString()}</td>
                          <td>{new Date(pkg.updatedAt).toLocaleDateString()}</td>
                          <td className="text-center">
                            <div className="btn-group" role="group">
                              <Link 
                                to={`/edit-package/${pkg._id}`}
                                className="btn btn-sm btn-outline-success mr-1"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(pkg._id)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
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
      </div>
    </div>
  );
};

export default ViewPackages;