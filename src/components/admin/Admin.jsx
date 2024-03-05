import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5 text-center' style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '30px' }}>
      <h2>Welcome to Admin Panel</h2>
      <hr/>
      <div className="list-group">
        <Link to={"/existing-rooms"} className="list-group-item list-group-item-action btn-hotel" style={{ marginBottom: '5px' }}>Manage Rooms</Link>
        <Link to={"/existing-bookings"} className="list-group-item list-group-item-action btn-hotel" style={{ marginBottom: '5px' }}>Manage Bookings</Link>
        <Link to={"/existing-roles"} className="list-group-item list-group-item-action btn-hotel" style={{ marginBottom: '5px' }}>Manage Roles</Link>
        <Link to={"/existing-users"} className="list-group-item list-group-item-action btn-hotel" style={{ marginBottom: '5px' }}>Manage Users</Link>
      </div>
    </section>
  )
}

export default Admin
