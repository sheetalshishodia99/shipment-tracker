import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request) {
    let client = await pool.connect();
    let payload = await request.json();

    try {
        const query = "INSERT INTO shipments (customername, destinationaddress, shipmentstatus,assigneddriverid,planneddeliverydate,actualdeliverydate) VALUES ($1, $2, $3,$4,$5,$6)";
        const values = [payload.customername, payload.destinationaddress, payload.shipmentstatus, payload.assigneddriverid,
        payload.planneddeliverydate,payload.actualdeliverydate];
        const rows = await client.query(query, values);
        return NextResponse.json({
            message: "Shipment created successfully",
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function GET(request) {
    try {
        let client = await pool.connect();
        let query = 'select * from shipments';
        const rows = await client.query(query);
        const shipmentData = rows.rows;
        return NextResponse.json({ data: shipmentData });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}



