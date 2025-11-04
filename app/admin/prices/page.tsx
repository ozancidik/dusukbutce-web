import { redirect } from 'next/navigation';

export default function PricesRedirectPage() {
  redirect('/admin/fiyat');
  return null;
}
