import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '+243999166980'; // Replace with your actual WhatsApp number
  const message = 'Bonjour, je souhaite en savoir plus sur vos services.';
  
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5C] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  );
}