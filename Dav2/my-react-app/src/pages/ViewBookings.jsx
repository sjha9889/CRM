import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookings, deleteBooking } from '../services/bookingService';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id);
        setBookings(bookings.filter(booking => booking._id !== id));
      } catch (err) {
        console.error('Failed to delete booking:', err);
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading bookings...</div>;
  if (error) return <div className="alert alert-danger mt-5">Error: {error}</div>;

  return (
    <div className="content-wrapper" style={{ marginLeft: '0', padding: '20px' }}>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="page-title mb-0">Bookings</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Bookings</li>
                  </ol>
                </nav>
              </div>
              <div>
                <button className="btn btn-outline-primary mr-2">
                  <i className="fas fa-download mr-1"></i> Download
                </button>
                <Link to="/add-booking" className="btn btn-primary">
                  <i className="fas fa-plus mr-1"></i> Add Booking
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
                  <table className="table table-hover table-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th>Booking ID</th>
                        <th>User Name</th>
                        <th>Package</th>
                        <th>Price</th>
                        <th>Booking Date</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking._id.substring(0, 8)}...</td>
                          <td>
                            <h3 className="table-avatar">
                              <Link to={`/booking-details/${booking._id}`}>
                                <h6>{booking.user?.name || 'Unknown User'}</h6>
                              </Link>
                            </h3>
                          </td>
                          <td>{booking.package?.name || 'Unknown Package'}</td>
                          <td>${booking.price}</td>
                          <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                          <td className="text-right">
                            <div className="actions">
                              <Link
                                to={`/edit-booking/${booking._id}`}
                                className="btn btn-sm bg-success-light mr-2"
                                title="Edit"
                              >
                                <i className="fas fa-edit mr-1"></i> Edit
                              </Link>
                              <button
                                className="btn btn-sm bg-danger-light"
                                title="Delete"
                                onClick={() => handleDelete(booking._id)}
                              >
                                <i className="fas fa-trash-alt mr-1"></i> Delete
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

export default ViewBookings;