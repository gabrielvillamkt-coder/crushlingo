const KEY = 'crushlingo:v1';
const today = () => new Date().toISOString().slice(0, 10);
const dayDiff = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

const defaults = { xp: 0, streak: 0, lastDay: null, completed: [] };

export function load() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(KEY)) };
  } catch {
    return { ...defaults };
  }
}

function save(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

export function currentStreak() {
  const s = load();
  if (!s.lastDay) return 0;
  return dayDiff(s.lastDay, today()) > 1 ? 0 : s.streak;
}

export function completeLesson(id, xp) {
  const s = load();
  s.xp += xp;
  if (!s.completed.includes(id)) s.completed.push(id);
  if (s.lastDay !== today()) {
    s.streak = s.lastDay && dayDiff(s.lastDay, today()) === 1 ? s.streak + 1 : 1;
    s.lastDay = today();
  }
  save(s);
  return s;
}

export function reset() {
  save({ ...defaults });
}
