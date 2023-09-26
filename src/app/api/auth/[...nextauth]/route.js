import pool from "../../../../config/dbConfig";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    let client = await pool.connect();
                    const query = "SELECT * FROM users WHERE email = $1";
                    const values = [email];
                    const result = await client.query(query, values);

                    if (!result || result.rows.length === 0) {
                        return null;
                    }

                    const user = result.rows[0];
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }
            
                    return { ...user, role: user.role };
                } catch (error) {
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },

    session: {
        strategy: "jwt",
        session: async (session, user) => {
            if (user && user.role) {
                session.userRole = user.role;
            }
            return Promise.resolve(session);
        },
    },
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
