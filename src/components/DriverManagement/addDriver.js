"use client"
import React, { useState, useEffect } from "react";
import { Form, Modal } from 'antd';
import axios from "axios";
export default function AddDriver({ showDriverFormModal, setShowDriverFormModal, reloadData, selectDriver }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: 'driver',
        vehiclenumber: '',
        licensenumber: '',
        contactnumber: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = null;
            if (selectDriver) {
                formData.id = selectDriver.driverid;
                response = await axios.put(`/api/driver/modify`, formData);
                if (response.status == 200) {
                    setShowDriverFormModal(false)
                    reloadData();

                } else {
                    console.error('Driver add failed.');
                }
            } else {
                response = await axios.post("/api/driver/driverRegistration", formData);
                console.log(response)
                alert(response.data.message);
                if (response.status == 200) {
                    setShowDriverFormModal(false)
                    reloadData();

                } else {
                    console.error('Driver add failed.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (selectDriver) {
            try {
                setFormData({
                    username: selectDriver.username || '',
                    email: selectDriver.email || '',
                    licensenumber: selectDriver.licensenumber || '',
                    vehiclenumber: selectDriver.vehiclenumber || '',
                    contactnumber: selectDriver.contactnumber || '', 
                });

            } catch (error) {
                console.error('Error parsing date:', error);
            }
        }
    }, [selectDriver]);

    return (
        <Modal
            open={showDriverFormModal}
            centered
            footer={[
                <button
                    key="cancel"
                    onClick={() => setShowDriverFormModal(false)}
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>,
                <button
                    key="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save
                </button>
            ]}
        >
            <h1 className="text-center text-xl mb-3 uppercase">Add a new Driver</h1>
            <div className="w-full max-w-xs mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">User Name</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="User name"
                            value={formData.username}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Id</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Number</label>
                        <input
                            type="text"
                            name="vehiclenumber"
                            placeholder="vehicle Number"
                            value={formData.vehiclenumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">licence Number</label>
                        <input
                            type="text"
                            name="licensenumber"
                            placeholder="licence Number"
                            value={formData.licensenumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
                        <input
                            type="text"
                            name="contactnumber"
                            placeholder="Contact Number"
                            value={formData.contactnumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );

}