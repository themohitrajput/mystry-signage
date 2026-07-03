import { MessageCircle } from 'lucide-react';

// Floating WhatsApp CTA. Opens WhatsApp (app or web) with a pre-filled
// message, using the number from admin-editable contact settings.
export default function WhatsAppButton({ number }) {
  const cleanNumber = (number || import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
  if (!cleanNumber) return null;

  const message = encodeURIComponent("Hi Mystry Signage! I'd like to enquire about signage for my business.");
  const href = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
}
