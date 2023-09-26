import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
export async function PUT(request) {
    let client = await pool.connect();
    try {
        let payload = await request.json();
        console.log(payload, 'tetysytstysytsdytsdtysdsdttydstyd')
        const values = [payload.username, payload.email, payload.licensenumber, payload.contactnumber, payload.id]
        console.log(values, 'tetetetwwyte tetsts valyeeugjbj')
        const query = `WITH updated_user AS (
            UPDATE users
            SET username = $1, email = $2
            WHERE driverid = $5
            RETURNING driverid
          )
          UPDATE drivers
          SET licensenumber = $3, contactnumber = $4
          WHERE driverid IN (SELECT driverid FROM updated_user)`;

        const result = await client.query(query, values);
        return NextResponse.json({
            message: "driver updated",
        });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 })

    }
}

export async function DELETE(request, { params }) {
    let client = await pool.connect();
    try {
        const query = `WITH deleted_users AS (
                    DELETE FROM users
                    WHERE driverid = $1
                    RETURNING *
                ),
                deleted_drivers AS (
                    DELETE FROM drivers
                    WHERE driverid = $1
                    RETURNING *
                )
                SELECT 1`;

        const result = await client.query(query, values);
        return NextResponse.json({
            message: "driver deleted",
        });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function GET(request,{params}) {
    try {
        let client = await pool.connect();        
        const value =[params.modify]
        let query = `select * from shipments where assigneddriverid=$1`;
        const rows = await client.query(query,value);
        const DriverShipmenData = rows.rows; 
        return NextResponse.json({ data: DriverShipmenData });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}


