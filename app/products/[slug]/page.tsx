import { redirect } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default function ProductRedirect({ params }: Props) {
  // Keep legacy /products route in sync with /shop
  redirect(`/shop/${params.slug}`);
}
