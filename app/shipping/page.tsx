import type { Metadata } from 'next';
import { PackageCheck } from 'lucide-react';
import InfoPage, { InfoBlock } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Shipping Policy', description: 'Yarn & Bloom delivery information.' };

export default function ShippingPage() {
  return <InfoPage eyebrow="Delivery details" title="Shipping Policy" icon={PackageCheck} intro="We pack every handmade piece carefully so it reaches you looking as lovely as when it left our studio.">
    <InfoBlock title="Delivery time"><p>Ready-to-ship orders usually arrive within <strong>3–7 business days</strong> across Pakistan. Custom orders need 5–10 business days before delivery.</p></InfoBlock>
    <InfoBlock title="Delivery charges"><p>Delivery is free on orders above Rs. 3,000. A standard delivery fee of Rs. 250 applies to smaller orders.</p></InfoBlock>
    <InfoBlock title="A little note"><p>Please provide a complete address and an active phone number. Our delivery partner may contact you before arrival, so someone should be available to receive the parcel.</p></InfoBlock>
  </InfoPage>;
}
