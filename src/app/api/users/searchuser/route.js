import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";

    export async function GET(request) {
        try {
            let client = await pool.connect();
            let query = `SELECT * FROM users WHERE role = 'driver'`;
            const rows = await client.query(query);
            const userData = rows.rows;
            return NextResponse.json({ data: userData });
        } catch (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
    }