import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './Profile.css'; 

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const apiurl = process.env.REACT_APP_API_URL;


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const authToken = localStorage.getItem('auth-token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiurl}/users`, {
          headers: { 'auth-token': authToken },
        });
        setUserData(res.data);
      } catch (err) {
        alert('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [apiurl, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(`${apiurl}/profile`, userData, {
        headers: { 'auth-token': authToken },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Account</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
        </li>
        {/* Add more tabs here like "Addresses", "Payments", etc. */}
      </ul>

      {activeTab === 'profile' && (
        <div>
          <div className="form-group mb-3">
            <label>Name</label>
            <input type="text" className="form-control" placeholder='Dayanand Dubey' name="name" value={userData.name} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder='ddaya2511@gmail.com' name="email" value={userData.email} disabled />
          </div>
          <div className="form-group mb-3">
            <label>Phone</label>
            <input type="text" className="form-control" placeholder='8528952310' name="phone" value={userData.phone} onChange={handleChange} />
          </div>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <p>Your recent orders will be shown here.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
