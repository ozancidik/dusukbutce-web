import { redirect } from 'next/navigation';

export default function ProductsRedirectPage() {
  redirect('/admin/urunler');
  return null;
}