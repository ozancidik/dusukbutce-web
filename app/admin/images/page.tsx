import { redirect } from 'next/navigation';

export default function ImagesRedirectPage() {
  redirect('/admin/gorsel');
  return null;
}
