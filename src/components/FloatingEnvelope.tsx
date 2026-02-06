import { useState } from 'react';
import { getRandomMessage } from '@/lib/valentineData';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Mail, Heart } from 'lucide-react';

interface FloatingEnvelopeProps {
  delay?: number;
  position: { left: string; top: string };
}

const FloatingEnvelope = ({ delay = 0, position }: FloatingEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage(getRandomMessage());
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="absolute z-10 p-2 transition-all duration-300 hover:scale-125 cursor-pointer animate-flutter group"
        style={{
          left: position.left,
          top: position.top,
          animationDelay: `${delay}s`,
        }}
        aria-label="Open message"
      >
        <div className="relative">
          <Mail className="w-6 h-6 text-rose-light opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          <Heart className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-heartbeat" />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-card border-rose-deep/30 max-w-sm mx-auto">
          <DialogTitle className="sr-only">Message for you</DialogTitle>
          <div className="text-center py-6 px-4">
            <div className="mb-4">
              <Heart className="w-8 h-8 text-primary mx-auto animate-heartbeat" />
            </div>
            <p className="font-script text-2xl text-foreground leading-relaxed">
              {message}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <span className="text-rose-light">💕</span>
              <span className="text-gold">✨</span>
              <span className="text-rose-light">💕</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingEnvelope;
