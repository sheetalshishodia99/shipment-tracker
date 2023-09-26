import jwt from "jsonwebtoken";
import pool from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        let client = await pool.connect();
        let payload = await request.json();
        const query = "SELECT * FROM shipments";
        const values = [payload.email];
        const result = await client.query(query, values);
        client.release();

        if (result.rows.length === 1) {
            const user = result.rows[0];

            let password1 = payload.password.toString();
            let password2 = user.password.toString();

            const validPassword = await bcrypt.compare(password1, password2);

            if (validPassword) {
                const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
                });

                const response = NextResponse.json({ result: "Successfully Login", success: true }, { status: 201 });
                response.cookies.set("token", token, {
                    path: "/",
                    httpOnly: false,
                });
                return response;
            } else {
                return NextResponse.json({ result: "Invalid password", success: false }, { status: 401 });
            }
        } else {
            return NextResponse.json({ result: "User not found", success: false }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
