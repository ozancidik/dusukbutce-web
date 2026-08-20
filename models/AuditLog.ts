import mongoose from 'mongoose';

// Admin panelinde yapılan kritik işlemlerin (kim, ne zaman, neye, ne yaptı)
// izini tutar. Önceki durumda sadece son durum (submission.status) tutulup
// kim/ne zaman değiştirdi bilgisi kalıcı olarak kayıp gidiyordu.
const auditLogSchema = new mongoose.Schema({
  adminEmail: { type: String, required: true },
  action: { type: String, required: true }, // örn. "submission_offer", "submission_delete"
  targetType: { type: String, required: true }, // örn. "submission", "product"
  targetId: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed }, // işleme özel ek veri (tutar, sebep vb.)
  createdAt: { type: Date, default: Date.now }
});

auditLogSchema.index({ targetType: 1, targetId: 1 });
auditLogSchema.index({ createdAt: -1 });

export default mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
