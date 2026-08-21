import type { Metadata } from 'next';
import { RefreshCcw } from 'lucide-react';
import InfoPage, { InfoBlock } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Returns & Exchange', description: 'Yarn & Bloom returns and exchange policy.' };

export default function ReturnsPage() {
  return <InfoPage eyebrow="Our promise" title="Returns & Exchange" icon={RefreshCcw} intro="We want your Yarn & Bloom experience to feel just right. Here is how we can help if something goes wrong.">
    <InfoBlock title="Damaged or incorrect orders"><p>Contact us within <strong>48 hours of delivery</strong> with your order number and clear photos. We will review the issue and arrange a suitable replacement or resolution.</p></InfoBlock>
    <InfoBlock title="Customized pieces"><p>Because personalized pieces are made especially for you, customized orders are generally not eligible for return or exchange unless they arrive damaged or incorrect.</p></InfoBlock>
    <InfoBlock title="Start a request"><p>Email <a className="text-[#b5616e] font-semibold hover:underline" href="mailto:hello@yarnandbloom.pk">hello@yarnandbloom.pk</a> with your order details. Please keep the item and its original packaging until we respond.</p></InfoBlock>
  </InfoPage>;
}
