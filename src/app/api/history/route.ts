import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
    try {
        await dbConnect();
        const collection = mongoose.connection.collection("mycollection");
        const data = await collection.find({}).toArray();

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
    }
}
