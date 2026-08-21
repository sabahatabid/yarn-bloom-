import type { Metadata } from 'next';
import Link from 'next/link';
import { UserRound, ArrowRight } from 'lucide-react';
import InfoPage, { InfoBlock } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'My Account', description: 'Yarn & Bloom customer account.' };

export default function AccountPage() {
  return <InfoPage eyebrow="Welcome back" title="My Account" icon={UserRound} intro="Your Yarn & Bloom account area is ready for order updates and customer care.">
    <InfoBlock title="Shopping as a guest"><p>Your COD orders can be placed without creating an account. Keep your order number handy for delivery updates.</p><Link href="/account/orders" className="inline-flex items-center gap-2 mt-4 text-[#b5616e] font-semibold hover:underline">Track an order <ArrowRight size={16} /></Link></InfoBlock>
    <InfoBlock title="Need help?"><p>For order assistance, email <a className="text-[#b5616e] font-semibold hover:underline" href="mailto:hello@yarnandbloom.pk">hello@yarnandbloom.pk</a> and include your order number.</p></InfoBlock>
  </InfoPage>;
}
