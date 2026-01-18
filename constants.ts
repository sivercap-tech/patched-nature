import { Category, Stimulus, StimulusType } from './types';

// Supabase Configuration
export const SUPABASE_URL = "https://gqulzoctsltwxmzvofwv.supabase.co"; 
export const SUPABASE_KEY = "sb_publishable_alcHOMdoEOvJmuSvwEeeoQ_HnbodgT3";

// Bashkir Words
export const BASHKIR_WORDS = [
  "Юрта", "Сабантуй", "Тюбетейка", "Агидель", "Урал-Батыр", 
  "Бешмет", "Кумыс", "Курай", "Бешбармак"
];

// Russian Words
export const RUSSIAN_WORDS = [
  "Шапка-ушанка", "Квас", "Пельмени", "Балалайка", "Изба", 
  "Илья Муромец", "Волга", "Масленица", "Кокошник"
];

const mountainModules = import.meta.glob('./images/mountain_*.jpg', { eager: true, import: 'default' });
const swampModules = import.meta.glob('./images/swamp_*.jpg', { eager: true, import: 'default' });

// Helper to sort images numerically (e.g. horse_1, horse_2, ..., horse_10)
const getSortedImages = (modules: Record<string, unknown>) => {
  return Object.entries(modules)
    .sort(([keyA], [keyB]) => {
      // Extract the number from the filename
      const numA = parseInt(keyA.match(/_(\d+)\./)?.[1] || '0');
      const numB = parseInt(keyB.match(/_(\d+)\./)?.[1] || '0');
      return numA - numB;
    })
    .map(([_, url]) => url as string);
};

export const MOUNTAIN_IMAGES = getSortedImages(mountainModules);
export const SWAMP_IMAGES = getSortedImages(swampModules);

// Fallback / Debugging
if (MOUNTAIN_IMAGES.length === 0) {
  console.warn("No mountain images found! Check that files exist in ./images/mountain*.jpg");
}
if (SWAMP_IMAGES.length === 0) {
  console.warn("No swamp images found! Check that files exist in ./images/swamp*.jpg");
}

// Generate Stimuli Pool
export const STIMULI_POOL: Stimulus[] = [
  ...BASHKIR_WORDS.map((w, i) => ({ id: `bash_${i}`, content: w, type: StimulusType.WORD, category: Category.BASHKIR })),
  ...RUSSIAN_WORDS.map((w, i) => ({ id: `rus_${i}`, content: w, type: StimulusType.WORD, category: Category.RUSSIAN })),
  ...MOUNTAIN_IMAGES.map((url, i) => ({ id: `mountain_${i}`, content: url, type: StimulusType.IMAGE, category: Category.MOUNTAIN })),
  ...SWAMP_IMAGES.map((url, i) => ({ id: `swamp_${i}`, content: url, type: StimulusType.IMAGE, category: Category.SWAMP })),
];
