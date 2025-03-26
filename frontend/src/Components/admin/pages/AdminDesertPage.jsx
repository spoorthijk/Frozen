import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDesertPage.css';

const AdminDesertPage = () => {
  const [deserts, setDeserts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    flavor: '',
    price: '',
    size: '',
    description: '',
    photo: '',
    featured: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDeserts();
  }, []);

  const fetchDeserts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/deserts');
      setDeserts(response.data.data);
    } catch (error) {
      console.log('Error fetching deserts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/admin/deserts/${editId}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/admin/deserts', formData);
      }
      fetchDeserts();
      resetForm();
    } catch (error) {
      console.log('Error submitting form:', error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      flavor: '',
      price: '',
      size: '',
      description: '',
      photo: '',
      featured: false,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (desert) => {
    setFormData({
      name: desert.name,
      flavor: desert.flavor,
      price: desert.price,
      size: desert.size,
      description: desert.description,
      photo: desert.photo,
      featured: desert.featured,
    });
    setIsEditing(true);
    setEditId(desert._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/deserts/${id}`);
      fetchDeserts();
    } catch (error) {
      console.error('Error deleting desert:', error);
    }
  };

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Admin Desert Page</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="admin-input"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="flavor"
          placeholder="Flavor"
          className="admin-input"
          value={formData.flavor}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="admin-input"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <select
          name="size"
          className="admin-select"
          value={formData.size}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="admin-textarea"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          className="admin-input"
          value={formData.photo}
          onChange={handleInputChange}
          required
        />
        <label className="admin-checkbox-label">
          Featured:
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit" className="admin-submit-btn">
          {isEditing ? 'Update Desert' : 'Create Desert'}
        </button>
      </form>

      <h2 className="admin-page-subtitle">Desert List</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Flavor</th>
            <th>Price</th>
            <th>Size</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deserts.map((desert) => (
            <tr key={desert._id}>
              <td>{desert.name}</td>
              <td>{desert.flavor}</td>
              <td>{desert.price}</td>
              <td>{desert.size}</td>
              <td>{desert.description}</td>
              <td><img src={desert.photo} alt={desert.name} /></td>
              <td>{desert.featured ? 'Yes' : 'No'}</td>
              <td className="admin-action-buttons">
                <button className="admin-edit-btn" onClick={() => handleEdit(desert)}>Edit</button>
                <button className="admin-delete-btn" onClick={() => handleDelete(desert._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDesertPage;
