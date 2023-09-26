// pages/components/Shipments.js
"use client"
import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, Card } from "antd";
import Addshipment from './addshipment';
import axios from 'axios';

export default function Shipments() {
    const [showShipmentFormModal, setShowShipmentFormModal] = useState(false);
    const [shipment, setShipment] = useState([]);
    const [selectShipment, setSelectShipment] = useState(null);
    const columns = [
        {
            title: 'Shipment ID',
            dataIndex: 'shipmentid',
            key: 'shipmentid',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customername',
            key: 'customername',
        },
        {
            title: 'Destination Address',
            dataIndex: 'destinationaddress',
            key: 'destinationaddress',
        },
        {
            title: 'Shipment Status',
            dataIndex: 'shipmentstatus',
            key: 'shipmentstatus',
        },
        {
            title: 'Assigned Driver ID',
            dataIndex: 'assigneddriverid',
            key: 'assigneddriverid',
        },
        {
            title: 'Planned Delivery Date',
            dataIndex: 'planneddeliverydate',
            key: 'planneddeliverydate',
        },
        {
            title: 'Actual Delivery Date',
            dataIndex: 'actualdeliverydate',
            key: 'actualdeliverydate',
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
                    title="Are you sure you want to delete this shipment?"
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    okButtonProps={{ type: 'danger' }}
                    cancelText="No"
                >
                    <Button type="link" className="text-red-500 hover:text-red-700">
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const getdata = async () => {
        try {
            const response = await axios.get('/api/shipment/addshipment');
            if (Array.isArray(response.data.data)) {
                setShipment(response.data.data);
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

    const handleEdit = (record) => {
        setSelectShipment(record);
        setShowShipmentFormModal(true);
    };

    const handleDelete = async (record) => {
        try {
            const response = await axios.delete(`/api/shipment/${record.shipmentid}`);
            if (response.status === 200) {
                setShipment((prevShipment) => prevShipment.filter((shipment) => shipment.shipmentid !== record.shipmentid));
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    const pendingShipments = shipment.filter(item => item.shipmentstatus === 'Pending');
    const deliveredShipments = shipment.filter(item => item.shipmentstatus === 'Delivered');

    return (
        <>
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <Button
                    type="primary"
                    className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                    onClick={() => { setSelectShipment(null); setShowShipmentFormModal(true); }}
                >
                    Add Shipment
                </Button>
            </div>
            {showShipmentFormModal && (
                <Addshipment setShowShipmentFormModal={setShowShipmentFormModal} showShipmentFormModal={showShipmentFormModal} selectShipment={selectShipment} reloadData={getdata} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-blue-500 text-white p-1 rounded-lg shadow-lg">
                    <p className="text-base font-semibold">Pending Shipments</p>
                    <p className="text-lg">{pendingShipments.length}</p>
                </Card>

                <Card className="bg-green-500 text-white p-1 rounded-lg shadow-lg">
                    <p className="text-base font-semibold">Delivered Shipments</p>
                    <p className="text-lg">{deliveredShipments.length}</p>
                </Card>
            </div>

            <Table dataSource={shipment} columns={columns} rowKey="shipmentid" className="w-full mt-4">
            </Table>
        </div>
        </>
    );
}



