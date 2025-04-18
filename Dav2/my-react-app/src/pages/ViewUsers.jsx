import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../services/userService';
import { toast } from 'react-toastify';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
          toast.error('Please login to view users');
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    loadUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  if (loading) return <div className="text-center py-5">Loading users...</div>;
  if (error) return <div className="alert alert-danger m-3">{error}</div>;

  return (
    <div className="content-wrapper" style={{ marginLeft: '0', padding: '20px' }}>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="page-title mb-0">Users</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Users</li>
                  </ol>
                </nav>
              </div>
              <div>
                <button className="btn btn-outline-primary mr-2">
                  <i className="fas fa-download mr-1"></i> Download
                </button>
                <Link to="/add-user" className="btn btn-primary">
                  <i className="fas fa-plus mr-1"></i> Add User
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
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id.substring(0, 8)}</td>
                          <td>
                            <h3 className="table-avatar">
                              <Link to={`/user-details/${user._id}`}>
                                <h6>{user.name}</h6>
                              </Link>
                            </h3>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-secondary'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${user.active ? 'badge-success' : 'badge-danger'}`}>
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="text-right">
                            <div className="actions">
                              <Link
                                to={`/edit-user/${user._id}`}
                                className="btn btn-sm bg-success-light mr-2"
                                title="Edit"
                              >
                                <i className="fas fa-edit mr-1"></i> Edit
                              </Link>
                              <button
                                className="btn btn-sm bg-danger-light"
                                title="Delete"
                                onClick={() => handleDelete(user._id)}
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

export default ViewUsers;