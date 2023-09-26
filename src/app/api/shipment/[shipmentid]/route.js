import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
export async function PUT(request) {
    let client = await pool.connect();
    try{
        let payload = await request.json();
        const values = [payload.customername, payload.destinationaddress, payload.shipmentstatus, payload.assigneddriverid,payload.id]
        const query = 'UPDATE shipments SET customername = $1, destinationaddress = $2, shipmentstatus = $3, assigneddriverid = $4 WHERE shipmentid = $5';
        const result = await client.query(query, values);
        return NextResponse.json({
            message: "Shipment updated",
        });
    } catch(error){
        return NextResponse.json({ message: error.message }, { status: 400 })

    }
}

export async function DELETE(request, {params}) {
    let client = await pool.connect();
    try {
        const values = [params.shipmentid];
        const query = 'delete from shipments where  shipmentid = $1';
        const result = await client.query(query, values);
        return NextResponse.json({
            message: "Shipment deleted successfully",
        });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
