import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    let client = await pool.connect();
    let payload = await request.json();
    try {

        let query1 = "SELECT * FROM users WHERE email = $1"
        let values1 = [payload.email]
        const userExists = await client.query(query1, values1);
        if (userExists.rowCount >= 1) {
            return NextResponse.json({
                message: "user Already created",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        payload.password = hashedPassword;

        const query = `WITH inserted_driver AS (
            INSERT INTO drivers (vehiclenumber, licensenumber, contactnumber)
            VALUES ($5, $6, $7)
            RETURNING driverid
          )
          INSERT INTO users (username, email, password, role, driverid)
          VALUES ($1, $2, $3, $4, (SELECT driverid FROM inserted_driver))
          `;
        const values = [payload.username, payload.email, payload.password, payload.role, payload.vehiclenumber, payload.licensenumber, payload.contactnumber]
        const rows = await client.query(query, values);
        return NextResponse.json({
            message: "Driver created successfully",
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}


export async function GET(request) {
    try {
        let client = await pool.connect();
        let query = `SELECT drivers.*, users.*
        FROM drivers
        INNER JOIN users ON drivers.driverid = users.driverid`;
        const rows = await client.query(query);

        const shipmentData = rows.rows.map((row) => {
            const hashedPassword = bcrypt.hashSync(row.password, 10);
            return {
                ...row,
                password: hashedPassword,
            };
        });

        return NextResponse.json({ data: shipmentData });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}




