"use client"
import React, { useState, useEffect } from "react";
import { Form, Modal } from 'antd';
import axios from "axios";

export default function Addshipment({ showShipmentFormModal, setShowShipmentFormModal, reloadData, selectShipment }) {
    const [formData, setFormData] = useState({
        customername: '',
        destinationaddress: '',
        shipmentstatus: '',
        assigneddriverid: '',
        planneddeliverydate: '',
    });
    const [userData, setUserData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get("/api/users/searchuser");
                const responseData = response.data.data;
                if (Array.isArray(responseData)) {
                    setUserData(responseData);
                } else {
                }
            } catch (error) {
            }
        }

        fetchUserData();
    }, []);


    useEffect(() => {
        const filtered = userData.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, userData]);
    
    useEffect(() => {
        if (selectShipment) {
            try {
                const plannedDeliveryDate = new Date(selectShipment.planneddeliverydate);

                if (!isNaN(plannedDeliveryDate)) {
                    setFormData({
                        customername: selectShipment.customername || '',
                        destinationaddress: selectShipment.destinationaddress || '',
                        shipmentstatus: selectShipment.shipmentstatus || '',
                        assigneddriverid: selectShipment.assigneddriverid || '',
                        planneddeliverydate: plannedDeliveryDate.toISOString().split('T')[0] || '',
              
                    });
                } else {
                }
            } catch (error) {
            }
        }
    }, [selectShipment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleUserSelect = (selectedUserId, selectedUserName) => {
        console.log(selectedUserId,selectedUserName,'datatatattataaaaaaaaaaaaaaaaaaa')
        setFormData({
            ...formData,
            assigneddriverid: selectedUserId,
            assigneddrivername: selectedUserName,
        });
        setSearchQuery(""); 
        setIsDropdownOpen(false); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = null;
            if (selectShipment) {
                formData.id = selectShipment.shipmentid;
                response = await axios.put(`/api/shipment/shipmentid`, formData);
                console.log('yteyyreetteetuer')
                if (response.status == 200) {
                    reloadData();
                    setShowShipmentFormModal(false)
                } else {
                }
            } else {
                response = await axios.post("/api/shipment/addshipment", formData);
                alert(response.data.message);
                if (response.status == 200) {
                    reloadData();
                    setShowShipmentFormModal(false)
                } else {
                }
            }
        } catch (error) {
        }
    };

    return (
        <Modal
            open={showShipmentFormModal}
            centered
            footer={[
                <button
                    key="cancel"
                    onClick={() => setShowShipmentFormModal(false)}
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
            <h1 className="text-center text-xl mb-3 uppercase">Add a new Shipment</h1>
            <div className="w-full max-w-xs mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
                        <input
                            type="text"
                            name="customername"
                            placeholder="Customer name"
                            value={formData.customername}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Destination address</label>
                        <input
                            type="text"
                            name="destinationaddress"
                            placeholder="Destination address"
                            value={formData.destinationaddress}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Shipment status</label>
                        <select
                            name="shipmentstatus"
                            value={formData.shipmentstatus}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Shipment Status</option>
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Assigned Driver
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for a driver"
                                name='assigneddriverid'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsDropdownOpen(true)} // Open the dropdown when input is focused
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {isDropdownOpen && filteredUsers.length > 0 && (
                               <ul className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg">
                               {filteredUsers.map((user) => (
                                   <li
                                       key={user.id}
                                       onClick={() => handleUserSelect(user.driverid, user.username)}
                                       className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                   >
                                    {`${user.username}`}
                                   </li>
                               ))}
                           </ul>
                           
                            )}
                            {isDropdownOpen && filteredUsers.length === 0 && (
                                <p className="text-red-500 text-xs mt-2">
                                    No matching users found.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Planned Delivery Date</label>
                        <input
                            type="date"
                            name="planneddeliverydate"
                            placeholder="Planned Delivery Date"
                            value={formData.planneddeliverydate}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
