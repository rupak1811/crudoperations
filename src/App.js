import React, { useState, useEffect } from 'react';
import './App.css';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    gender: 'Male',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const usersWithGender = data.map(user => ({ ...user, gender: 'Male' }));
    setUsers(usersWithGender);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateUser(formData.id);
    } else {
      createUser();
    }

    setFormData({
      id: null,
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      gender: 'Male',
    });

    setIsEditing(false);
  };

  const createUser = () => {
    const newUser = { id: Date.now(), ...formData };
    setUsers([newUser, ...users]);
  };

  const updateUser = (id) => {
    setUsers(users.map(user => (user.id === id ? { ...user, ...formData } : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h1>🌟 Colorful User Management System 🌟</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} required />

          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="Male">Male ♂️</option>
            <option value="Female">Female ♀️</option>
          </select>

          <button type="submit" className="create-btn">{isEditing ? 'Update User' : 'Create User'}</button>
          <button type="button" className="reset-btn" onClick={() => {
            setIsEditing(false); 
            setFormData({
              id: null,
              name: '',
              username: '',
              email: '',
              phone: '',
              website: '',
              gender: 'Male',
            });
          }}>Reset</button>
        </form>
      </div>

      <h2>👥 Users List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.gender}</td>
              <td><button className="edit-btn" onClick={() => editUser(user)}>Edit</button></td>
              <td><button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
