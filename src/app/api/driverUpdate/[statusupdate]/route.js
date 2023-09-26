import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
export async function PUT(request,{params}) {
    let client = await pool.connect();
    try{
        let payload = await request.json();
        const values = [payload.shipmentstatus,params.statusupdate,payload.assigneddriverid]
        const query = 'UPDATE shipments SET shipmentstatus = $1,  actualdeliverydate = CURRENT_DATE WHERE shipmentid = $2 and assigneddriverid = $3';
        const result = await client.query(query, values);
        return NextResponse.json({
            message: "driver updated",
        });
    } catch(error){
        return NextResponse.json({ message: error.message }, { status: 400 })

    }
}