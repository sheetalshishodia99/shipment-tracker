// NavBar.js
"use client"
// NavBar.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Select } from 'antd';
import Header from '../components/driverHeader';
import { format } from 'date-fns';

const { Option } = Select;

const DriverView = (session) => {
  const [shipmentData, setShipmentData] = useState([]);
  let userId = session.session.user;

  useEffect(() => {
    // Fetch shipment data from the API when the component mounts
    async function fetchData() {
      try {
        const response = await axios.get(`/api/driver/${userId.driverid}`);
        if (Array.isArray(response.data.data)) {
          setShipmentData(response.data.data);
        } else {
          console.error('Data from the API is not an array:', response.data.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
  };

  const handleEdit = async (record, status) => {
    try {
      const response = await axios.put(`/api/driverUpdate/${record.shipmentid}`, {
        shipmentstatus: status,
        assigneddriverid: record.assigneddriverid,
      });

      if (response.data.success) {
        // Update the shipment status in the local state
        const updatedShipmentData = shipmentData.map((shipment) => {
          if (shipment.shipmentid === record.shipmentid) {
            return { ...shipment, shipmentstatus: status };
          }
          return shipment;
        });

        // Update the state with the new shipment data
        setShipmentData(updatedShipmentData);
      } else {
        console.error('Failed to update shipment status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating shipment status:', error.message);
    }
  };

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
      title: 'Status Update',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => (
        <Select
          defaultValue={record.shipmentstatus} // Set the default value to the shipment status from API
          style={{ width: 120 }}
          onChange={(value) => handleEdit(record, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
  ];

  // Filter only pending shipments
  const pendingShipments = shipmentData.filter((shipment) => shipment.shipmentstatus === 'pending');

  return (
    <>
      <Header onLogout={handleLogout} />
      <Table
        columns={columns}
        dataSource={pendingShipments}
        rowKey={(record) => record.shipmentid.toString()} // Set a unique row key
      />
    </>
  );
};

export default DriverView;


