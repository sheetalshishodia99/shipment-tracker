"use client"
import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm } from "antd";
import AddDriver from './addDriver';
import axios from 'axios';
export default function Driver() {
    const [showDriverFormModal, setShowDriverFormModal] = useState(false);
    const [Driver, setDriver] = useState([]);
    const [selectDriver, setSelectDriver] = useState(null);

    const columns = [
        {
            title: 'Driver ID',
            dataIndex: 'driverid',
            key: 'driverid',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactnumber',
            key: 'contactnumber',
        },
        {
            title: 'License Number',
            dataIndex: 'licensenumber',
            key: 'licensenumber',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'User ID',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: 'Vehicle Number',
            dataIndex: 'vehiclenumber',
            key: 'vehiclenumber',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() => handleEdit(record)}
                >
                    Edit
                </Button>
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this driver?"
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    type='primary'
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        border: '1px solid blue',
                    }}
                    cancelText="No"
                >
                    <Button type="link">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    const handleEdit = (record) => {
        setSelectDriver(record)
        setShowDriverFormModal(true)
        console.log("Edit Driver:", record);
    };

    const handleDelete = async (record) => {
        try {
            console.log(record)
            const response = await axios.delete(`/api/driver/${record.driverid}`);
            if (response.status === 200) {
                setDriver((prevDriver) => prevDriver.filter((Driver) => Driver.driverid !== record.driverid));
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const getdata = async () => {
        try {
            const response = await axios.get('/api/driver/driverRegistration');
            if (Array.isArray(response.data.data)) {
                setDriver(response.data.data);
            } else {
                console.error('Data from the API is not an array:', response.data.data);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className="p-4">
            <div className='flex justify-end mb-4'>
                <Button
                    type='primary'
                    className="bg-blue-500 text-white border-blue-500"
                    onClick={() => { setShowDriverFormModal(true) }}
                >
                    Add Driver
                </Button>
            </div>
            {showDriverFormModal && (
                <AddDriver setShowDriverFormModal={setShowDriverFormModal} showDriverFormModal={showDriverFormModal}
                selectDriver={selectDriver} reloadData={getdata} />
            )}
            <Table dataSource={Driver} columns={columns} rowKey="driverid" />
        </div>
    );
}