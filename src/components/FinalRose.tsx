import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { isDayUnlocked, VALENTINE_DAYS } from '@/lib/valentineData';

const FinalRose = () => {
  const [allCompleted, setAllCompleted] = useState(false);
  const [showRose, setShowRose] = useState(false);

  useEffect(() => {
    // Check if all days are unlocked (day 8 being completed means all questions answered)
    const checkCompletion = () => {
      const lastDay = VALENTINE_DAYS[VALENTINE_DAYS.length - 1];
      // If day 8 is unlocked AND its question has been answered (we check localStorage for a completion flag)
      const completed = localStorage.getItem('valentine_completed') === 'true';
      setAllCompleted(completed);
      if (completed) {
        setTimeout(() => setShowRose(true), 500);
      }
    };

    checkCompletion();
    window.addEventListener('storage', checkCompletion);
    return () => window.removeEventListener('storage', checkCompletion);
  }, []);

  // Also expose a way to mark as complete
  useEffect(() => {
    if (isDayUnlocked(9)) {
      localStorage.setItem('valentine_completed', 'true');
      setAllCompleted(true);
      setTimeout(() => setShowRose(true), 500);
    }
  }, []);

  if (!allCompleted) return null;

  return (
    <div className="mt-16 text-center animate-fade-in-up">
      <div className="glass-card romantic-glow rounded-3xl p-12 max-w-lg mx-auto border-gold/30 relative overflow-hidden">
        {/* Background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/10" />
        
        <div className="relative z-10">
          <div className="flex justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-gold animate-shimmer" />
            <Heart className="w-8 h-8 text-primary animate-heartbeat fill-current" />
            <Sparkles className="w-6 h-6 text-gold animate-shimmer" />
          </div>

          {showRose && (
            <div className="animate-fade-in-up">
              <span className="text-8xl block mb-6 animate-float">🌹</span>
              
              <h2 className="font-display text-3xl text-foreground mb-4">
                You Did It, My Love!
              </h2>
              
              <p className="font-script text-2xl text-rose-light mb-4">
                This rose is for you, Vampire 🖤
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                You remembered all our special moments together. 
                Thank you for being my Khushi, my Shrishti, my everything.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <span className="text-2xl animate-heartbeat">❤️</span>
                <span className="text-2xl animate-float delay-200">💕</span>
                <span className="text-2xl animate-heartbeat delay-300">💖</span>
                <span className="text-2xl animate-float delay-500">💗</span>
                <span className="text-2xl animate-heartbeat delay-700">❤️</span>
              </div>

              <p className="font-script text-xl text-gold mt-6">
                Forever Yours ✨
              </p>
            </div>
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 text-gold animate-sparkle">✨</div>
        <div className="absolute top-4 right-4 text-rose-light animate-sparkle delay-300">💕</div>
        <div className="absolute bottom-4 left-4 text-rose-light animate-sparkle delay-500">💕</div>
        <div className="absolute bottom-4 right-4 text-gold animate-sparkle delay-700">✨</div>
      </div>
    </div>
  );
};

export default FinalRose;
