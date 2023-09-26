import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    try {
        let client = await pool.connect();
        let payload = await request.json();        
        const value =[payload.driverid]
        let query = `select * from shipments where assigneddriverid=$1`;
        const rows = await client.query(query,value);
        return NextResponse.json({ data: shipmentData });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}