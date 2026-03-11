// Country flag mapping
const COUNTRY_FLAGS = {
  japan: '🇯🇵',
  'united states': '🇺🇸',
  mexico: '🇲🇽',
  england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  france: '🇫🇷',
  europe: '🇪🇺',
  spain: '🇪🇸',
  'latin america': '🌎',
  'west africa': '🌍',
  'south korea': '🇰🇷',
  korea: '🇰🇷',
  argentina: '🇦🇷',
  russia: '🇷🇺',
  china: '🇨🇳',
  philippines: '🇵🇭',
  indonesia: '🇮🇳🇩',
  india: '🇮🇳',
  brazil: '🇧🇷',
  portugal: '🇵🇹',
  'south africa': '🇿🇦',
  scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  ireland: '🇮🇪',
  unknown: '🌐',
  global: '🌍',
};

export function getFlag(country) {
  const lower = country.toLowerCase();
  for (const [key, flag] of Object.entries(COUNTRY_FLAGS)) {
    if (lower.includes(key)) return flag;
  }
  return '🌐';
}

export const DANGER_LABELS = ['', 'Low', 'Moderate', 'High', 'Severe', 'Extreme'];
export const DANGER_COLORS = ['', '#4a7c59', '#b8a039', '#c47e1e', '#c43030', '#8b1a1a'];

export function formatCategory(cat) {
  const map = {
    classic: 'Classic',
    'internet-era': 'Internet-Era',
    'modern-viral': 'Modern Viral',
  };
  return map[cat] || cat;
}

export function extractYear(yearStr) {
  if (!yearStr) return 9999;
  const match = yearStr.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 9999;
}

export function simplifyCountry(country) {
  return country.split('/')[0].split('(')[0].trim();
}
