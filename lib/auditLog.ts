import AuditLog from '@/models/AuditLog';

/**
 * Admin panelindeki kritik bir işlemi kayıt altına alır (kim, ne zaman, neye,
 * ne yaptı). connectDB() çağıranın sorumluluğunda — bu fonksiyon zaten
 * bağlı bir bağlantı olduğunu varsayar. Loglama başarısız olursa asıl
 * işlemi engellememek için hatayı yutar, sadece console'a yazar.
 */
export async function logAdminAction(params: {
  adminEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: Record<string, unknown>;
}) {
  try {
    await AuditLog.create({
      adminEmail: params.adminEmail,
      action: params.action,
      targetType: params.targetType,
      targetId: params.targetId,
      details: params.details,
    });
  } catch (error) {
    console.error('Audit log kaydı başarısız:', error);
  }
}
