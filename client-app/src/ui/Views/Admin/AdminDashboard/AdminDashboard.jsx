import React from 'react';

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
                        <a className="admin__option" href="/">Add User</a>
                        <a className="admin__option" href="/">View Users</a>
                    </div>
                    <div className="admin__section-option-container">
                        <h2 className="admin__section-heading">Manage Products</h2>
                        <a className="admin__option" href="/">Add Product</a>
                        <a className="admin__option" href="/">View Products</a>
                        <a className="admin__option" href="/">Add Material</a>
                        <a className="admin__option" href="/">Add Category</a>
                    </div>
                </div>
            </div>
        </main>
    );
} 

export default AdminDashboard;