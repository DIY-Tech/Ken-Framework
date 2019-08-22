import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    
    return(
        <main>
            <div className="admin__container">
                <div className="admin__heading-container">
                    <h1 className="admin__heading">ADMIN DASHBOARD</h1>
                </div>
                <div className="admin__option-container">
                    <div className="admin__section-option-container">
                        <h2 className="admin__section-heading">Manage Users</h2>
                        <Link className="admin__option" to="/Add-Distributor">Add User</Link>
                        <Link className="admin__option" to="/View-Distributors">View Users</Link>
                    </div>
                    <div className="admin__section-option-container">
                        <h2 className="admin__section-heading">Manage Products</h2>
                        <Link className="admin__option" to="/Product-Form">Add Product</Link>
                        <Link className="admin__option" to="/">View Products</Link>
                        <Link className="admin__option" to="/Add-Material-Category">Add Materials, Categories, Colors</Link>
                    </div>
                </div>
            </div>
        </main>
    );
} 

export default AdminDashboard;