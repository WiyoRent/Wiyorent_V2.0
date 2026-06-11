
// Catch-all route that wires NextAuth's GET/POST handlers (sign in, sign out,
// callbacks, session, etc.) up to /api/auth/*
import { handlers } from "@/auth"
export const { GET, POST } = handlers
