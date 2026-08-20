import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AuditLog from '@/models/AuditLog';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../utils/requireAdmin';
import { parsePagination } from '@/lib/pagination';

export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();

    const { searchParams } = new URL(request.url);
    const { page, limit } = parsePagination(searchParams, 50, 100);
    const targetId = searchParams.get('targetId');

    const query: Record<string, unknown> = {};
    if (targetId) query.targetId = targetId;

    const [logs, total] = await Promise.all([
      AuditLog.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      AuditLog.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      logs,
      total,
      page,
      limit,
    });
  } catch (error) {
    if (error instanceof AdminAuthError) return handleAdminAuthError(error);
    console.error('Audit log fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'İşlem geçmişi alınamadı' },
      { status: 500 }
    );
  }
}
