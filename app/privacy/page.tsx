import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import InfoPage, { InfoBlock } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How Yarn & Bloom handles customer information.' };

export default function PrivacyPage() {
  return <InfoPage eyebrow="Your trust matters" title="Privacy Policy" icon={ShieldCheck} intro="We collect only the information needed to prepare, deliver and support your Yarn & Bloom order.">
    <InfoBlock title="Information we use"><p>When you place an order, we use your name, phone number, email and delivery address to confirm and deliver it. We may also use your message to answer support questions.</p></InfoBlock>
    <InfoBlock title="How we protect it"><p>Your order details are handled for fulfillment and customer care. We do not sell your personal information. Payment and order services use protected server-side connections.</p></InfoBlock>
    <InfoBlock title="Questions"><p>For privacy questions or a request about your information, email <a className="text-[#b5616e] font-semibold hover:underline" href="mailto:hello@yarnandbloom.pk">hello@yarnandbloom.pk</a>.</p></InfoBlock>
  </InfoPage>;
}
