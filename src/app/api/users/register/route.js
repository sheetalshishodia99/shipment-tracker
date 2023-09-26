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
        const query = "INSERT INTO users (username, email, password,role) VALUES ($1, $2, $3,$4)";
        const values = [payload.username, payload.email, payload.password, payload.role];
        const rows = await client.query(query, values);
        return NextResponse.json({
            message: "User created successfully",
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}


