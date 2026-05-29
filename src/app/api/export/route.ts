// src/app/api/export/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Export handled client-side' });
}