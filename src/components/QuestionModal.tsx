import { useState } from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Heart, Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValentineDay, formatDateForComparison, unlockDay } from '@/lib/valentineData';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: ValentineDay;
  onUnlock: () => void;
}

const QuestionModal = ({ isOpen, onClose, day, onUnlock }: QuestionModalProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [textAnswer, setTextAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setError('');
    
    if (day.answerType === 'date') {
      if (!date) {
        setError('Please select a date 📅');
        return;
      }
      const formattedDate = formatDateForComparison(date);
      if (formattedDate === day.correctAnswer) {
        handleSuccess();
      } else {
        setError('Hmm, that\'s not right... Try again, my love! 💭');
      }
    } else {
      if (!textAnswer.trim()) {
        setError('Please enter your answer 💝');
        return;
      }
      if (textAnswer.toLowerCase().trim() === day.correctAnswer.toLowerCase()) {
        handleSuccess();
      } else {
        setError('That\'s not it... Think harder, Vampire! 🤔');
      }
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
    unlockDay(day.id + 1);
    setTimeout(() => {
      onUnlock();
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setDate(undefined);
    setTextAnswer('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-rose-deep/30 max-w-md mx-auto overflow-visible">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center flex items-center justify-center gap-2">
            {success ? (
              <>
                <Unlock className="w-6 h-6 text-gold animate-heartbeat" />
                <span className="gold-shimmer">Unlocked!</span>
              </>
            ) : (
              <>
                <Lock className="w-6 h-6 text-rose-light" />
                <span className="text-gradient">Secret Question</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {success ? (
            <div className="text-center animate-fade-in-up">
              <Heart className="w-16 h-16 text-primary mx-auto mb-4 animate-heartbeat" />
              <p className="font-script text-2xl text-foreground mb-2">{day.unlockMessage}</p>
              <p className="text-muted-foreground">Opening next day...</p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-4xl mb-4">{day.emoji}</p>
                <p className="font-script text-xl text-rose-light mb-2">
                  To unlock the next day...
                </p>
                <p className="text-lg text-foreground font-medium">
                  {day.question}
                </p>
              </div>

              {day.answerType === 'date' ? (
                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full max-w-[280px] justify-start text-left font-normal border-rose-deep/30 hover:bg-secondary",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-rose-light" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[100]" align="center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto bg-card rounded-lg border border-border")}
                        captionLayout="dropdown-buttons"
                        fromYear={2020}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Input
                    type="text"
                    placeholder="Type your answer..."
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    className="max-w-[280px] border-rose-deep/30 bg-secondary/50 focus:ring-primary"
                  />
                </div>
              )}

              {error && (
                <p className="text-center text-destructive text-sm animate-fade-in-up">
                  {error}
                </p>
              )}

              <div className="flex justify-center">
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-rose-deep hover:opacity-90 transition-opacity px-8"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Submit Answer
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionModal;
