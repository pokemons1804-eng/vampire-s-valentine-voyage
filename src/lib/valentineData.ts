export interface ValentineDay {
  id: number;
  name: string;
  date: Date;
  emoji: string;
  description: string;
  question: string;
  answerType: 'date' | 'text';
  correctAnswer: string;
  unlockMessage: string;
  color: string;
}

export const VALENTINE_DAYS: ValentineDay[] = [
  {
    id: 1,
    name: "Rose Day",
    date: new Date(2026, 1, 7), // Feb 7, 2026
    emoji: "🌹",
    description: "For my beautiful Vampire, a rose as red as my love for you",
    question: "When did I propose you to marry me?",
    answerType: 'date',
    correctAnswer: "2024-12-29",
    unlockMessage: "You remembered our special moment, Khushi! 💍",
    color: "from-rose-deep to-primary"
  },
  {
    id: 2,
    name: "Propose Day",
    date: new Date(2026, 1, 8), // Feb 8, 2026
    emoji: "💍",
    description: "Shrishti, every day I choose you again and again",
    question: "Our scooty ride in Lucknow?",
    answerType: 'date',
    correctAnswer: "2021-08-19",
    unlockMessage: "That adventurous ride with you, Vampire! 🛵",
    color: "from-pink-soft to-rose-light"
  },
  {
    id: 3,
    name: "Chocolate Day",
    date: new Date(2026, 1, 9), // Feb 9, 2026
    emoji: "🍫",
    description: "Khushi, you're sweeter than any chocolate",
    question: "When did I meet you after coming from Bangalore?",
    answerType: 'date',
    correctAnswer: "2025-01-16",
    unlockMessage: "I couldn't wait to see you, Shrishti! ✈️",
    color: "from-burgundy to-rose-deep"
  },
  {
    id: 4,
    name: "Teddy Day",
    date: new Date(2026, 1, 10), // Feb 10, 2026
    emoji: "🧸",
    description: "My cute little Vampire, soft and cuddly like a teddy",
    question: "When did we go to Bithoor?",
    answerType: 'date',
    correctAnswer: "2026-01-22",
    unlockMessage: "Our beautiful day at Bithoor, Khushi! 🏛️",
    color: "from-gold to-gold-shimmer"
  },
  {
    id: 5,
    name: "Promise Day",
    date: new Date(2026, 1, 11), // Feb 11, 2026
    emoji: "🤞",
    description: "Shrishti, I promise to love you forever",
    question: "When did I say that I love you?",
    answerType: 'date',
    correctAnswer: "2026-02-04",
    unlockMessage: "Those three magical words for you, Vampire! ❤️",
    color: "from-rose-light to-pink-soft"
  },
  {
    id: 6,
    name: "Hug Day",
    date: new Date(2026, 1, 12), // Feb 12, 2026
    emoji: "🤗",
    description: "Khushi, your hugs feel like home",
    question: "When did you buy me shoes?",
    answerType: 'date',
    correctAnswer: "2025-06-25",
    unlockMessage: "You spoil me so much, Shrishti! 👟",
    color: "from-rose-blush to-rose-light"
  },
  {
    id: 7,
    name: "Kiss Day",
    date: new Date(2026, 1, 13), // Feb 13, 2026
    emoji: "💋",
    description: "Vampire, your kisses are my favorite",
    question: "What did I bring you from Goa?",
    answerType: 'text',
    correctAnswer: "bracelet",
    unlockMessage: "That special bracelet from Goa, Khushi! 🌊",
    color: "from-primary to-rose-deep"
  },
  {
    id: 8,
    name: "Valentine's Day",
    date: new Date(2026, 1, 14), // Feb 14, 2026
    emoji: "❤️",
    description: "Shrishti, you are my forever Valentine",
    question: "When did I give you the first gift?",
    answerType: 'date',
    correctAnswer: "2025-05-27",
    unlockMessage: "The beginning of our gifts, Vampire! 🎁",
    color: "from-primary via-rose-deep to-burgundy"
  }
];

export const ENVELOPE_MESSAGES = [
  "padh le bhai 📚",
  "excersize karo malik 💪",
  "spicy noodles nhi khaane hain 🍜",
  "poore din call kyu chalani hai 📱",
  "video on karle 📹",
  "earphone khareed lo 🎧",
  "phone he chutiya hai 📵",
  "baal achhe lag rahe 💇‍♀️",
  "muu mat fulaao 😤",
  "yellow color ka sweater tmpe accha lag raha 💛",
  "hatt be 😏",
  "inhaler kaha hai mera 💨",
  "moti hain aap boht 🐷",
  "bhai kitne pimples hain 😅",
  "makeup nhi khareedna hai 💄",
  "aankhe acchi hai 👀",
  "awaaj acchi hai 🎤",
  "call chalte chalte nhi sona hai 😴",
  "muu se haath hatao 🤭",
  "tmhari side profile acchi lagti hai ✨",
  "kitna overthink karti hai 🧠",
  "overthink karna band kardo 🛑",
  "padhai kar jaake 📖",
  "gaana sunao koi 🎵",
  "ghar k kaam kar liya karo 🏠",
  "apni image acchi karlo 😎",
  "mature bano bhai 🧐",
  "bachpana chor do 👶"
];

export const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * ENVELOPE_MESSAGES.length);
  return ENVELOPE_MESSAGES[randomIndex];
};

export const formatDateForComparison = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isDayAvailable = (dayDate: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(dayDate);
  checkDate.setHours(0, 0, 0, 0);
  return today >= checkDate;
};

export const getUnlockedDays = (): number[] => {
  const stored = localStorage.getItem('valentine_unlocked_days');
  if (stored) {
    return JSON.parse(stored);
  }
  return [1]; // First day is always unlocked
};

export const unlockDay = (dayId: number): void => {
  const unlocked = getUnlockedDays();
  if (!unlocked.includes(dayId)) {
    unlocked.push(dayId);
    localStorage.setItem('valentine_unlocked_days', JSON.stringify(unlocked));
  }
};

export const isDayUnlocked = (dayId: number): boolean => {
  return getUnlockedDays().includes(dayId);
};
