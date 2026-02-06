import { useState } from 'react';
import { format } from 'date-fns';
import { Heart, Lock, Sparkles, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValentineDay, isDayAvailable, isDayUnlocked } from '@/lib/valentineData';
import QuestionModal from './QuestionModal';

interface DayCardProps {
  day: ValentineDay;
  isFirst: boolean;
  onUnlock: () => void;
}

const DayCard = ({ day, isFirst, onUnlock }: DayCardProps) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const available = isDayAvailable(day.date);
  const unlocked = isDayUnlocked(day.id);
  const canAnswer = available && unlocked;
  const nextDayUnlocked = isDayUnlocked(day.id + 1);
  const isCompleted = nextDayUnlocked || day.id === 8;
  const isLast = day.id === 8;

  const getCardState = () => {
    if (!available) return 'locked-date';
    if (!unlocked) return 'locked-question';
    if (isCompleted) return 'completed';
    return 'active';
  };

  const cardState = getCardState();

  return (
    <>
      <div
        className={cn(
          "relative group transition-all duration-500",
          cardState === 'active' && "transform hover:scale-105"
        )}
      >
        <div
          className={cn(
            "glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-500",
            cardState === 'completed' && "romantic-glow border-gold/30",
            cardState === 'active' && "romantic-glow border-primary/40 cursor-pointer",
            cardState === 'locked-date' && "opacity-40 grayscale",
            cardState === 'locked-question' && "opacity-60"
          )}
          onClick={() => {
            if (canAnswer && !isCompleted) {
              setShowQuestion(true);
            }
          }}
        >
          {/* Background gradient */}
          <div
            className={cn(
              "absolute inset-0 opacity-20 bg-gradient-to-br",
              day.color
            )}
          />

          {/* Lock overlay for unavailable days */}
          {cardState === 'locked-date' && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl z-10">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Opens on {format(day.date, 'MMM d')}
                </p>
              </div>
            </div>
          )}

          {/* Lock overlay for locked questions */}
          {cardState === 'locked-question' && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl z-10">
              <div className="text-center">
                <Lock className="w-8 h-8 text-rose-light mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Answer previous question first
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="relative z-0">
            {/* Emoji and Day Name */}
            <div className="text-center mb-4">
              <span className="text-5xl mb-3 block animate-float" style={{ animationDelay: `${day.id * 0.2}s` }}>
                {day.emoji}
              </span>
              <h3 className="font-display text-xl text-foreground mb-1">
                {day.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {format(day.date, 'MMMM d, yyyy')}
              </p>
            </div>

            {/* Description */}
            <p className="font-script text-lg text-rose-light text-center mb-4">
              {day.description}
            </p>

            {/* Status indicator */}
            <div className="flex justify-center">
              {cardState === 'completed' ? (
                <div className="flex items-center gap-2 text-gold">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Completed</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              ) : cardState === 'active' ? (
                <div className="flex items-center gap-2 text-primary animate-heartbeat">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">Tap to unlock next</span>
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              ) : null}
            </div>
          </div>

          {/* Sparkle decorations for completed */}
          {cardState === 'completed' && (
            <>
              <div className="absolute top-2 right-2 text-gold animate-sparkle">✨</div>
              <div className="absolute bottom-2 left-2 text-gold animate-sparkle delay-300">✨</div>
            </>
          )}
        </div>
      </div>

      <QuestionModal
        isOpen={showQuestion}
        onClose={() => setShowQuestion(false)}
        day={day}
        onUnlock={onUnlock}
      />
    </>
  );
};

export default DayCard;
