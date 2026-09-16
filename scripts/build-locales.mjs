import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const localeData = JSON.parse(fs.readFileSync(path.join(scriptDir, 'translations.json'), 'utf8'));

const english = {
  title: 'HabitBit - Simple Visual Habit Tracker for iPhone',
  meta: 'HabitBit is a simple visual habit tracker for iPhone. Build daily routines with progress grids, reminders, widgets, streaks and focus sessions.',
  og: 'A simple daily habit tracker and routine planner with weekly, monthly and yearly progress grids.',
  schema: 'HabitBit is a simple visual habit tracker and routine planner for iPhone with daily check-ins, weekly, monthly and yearly progress grids, reminders, widgets, streak statistics and a focus timer.',
  navFeatures: 'Features', navHow: 'How it works', navGet: 'Get the app',
  heroEye: 'HabitBit for iPhone', heroTitle: 'The simple visual habit tracker for iPhone.',
  heroBody: 'Build daily habits without the clutter. Check in with one tap, then see your routine, streaks and progress across a week, a month or an entire year.',
  downloadOn: 'Download on the', heroNote: 'No account required. Your habit records stay on your device.', seeYear: 'See the year',
  proofEye: 'The idea behind HabitBit', proofTitle: 'A year should look like something.',
  proofBody: 'Motivation is difficult to remember. Progress is easier to trust when every day leaves a mark.', proofCaption: 'small decisions, made visible',
  filmEye: 'Designed around the return.', filmTitle: 'One tap today.<br>The whole story tomorrow.',
  experienceEye: 'One habit. Three distances.', experienceTitle: 'Stay close to today.<br>Zoom out when you need perspective.',
  week: 'Week', year: 'Year', history: 'History', thisWeek: 'This week',
  weekTitle: 'Make the next checkmark obvious.', weekBody: 'A focused weekly board keeps today close without hiding the rhythm you are building.',
  statsEye: 'Patterns, not pressure', statsTitle: 'Understand what helps you return.',
  statsBody: 'See streaks, completion rates and longer-term patterns without turning your routine into a spreadsheet.',
  stats1: 'Current and best streaks', stats2: 'Completion trends and distribution', stats3: 'Weekly, monthly and yearly context',
  focusEye: 'From intention to focus', focusTitle: 'Give the habit a place to happen.',
  focusBody: 'Use the built-in focus timer when a checkmark needs more than a tap. Set the duration, begin, and return to your board when the work is done.',
  widgetEye: 'Present at the right moment', widgetTitle: 'Your habits do not have to hide inside an app.',
  widgetBody: 'Home screen and lock screen widgets keep the next action visible. Reminders can be scheduled for the days and times that fit the habit.',
  howEye: 'A visual system for consistency', howTitle: 'How HabitBit works.',
  howBody: 'HabitBit is a simple daily habit tracker and routine planner for iPhone. It turns one-tap check-ins into clear weekly, monthly and yearly progress grids, helping you follow streaks and goals without adding complexity to your routine.',
  step1: 'Create your habits', step1Body: 'Choose a name, icon, colour, schedule and optional reminder for each routine you want to build.',
  step2: 'Check in each day', step2Body: 'Mark a habit complete with one tap. Every completion becomes a square in its visual history.',
  step3: 'See the pattern', step3Body: 'Switch between weekly, monthly and yearly views to understand streaks, missed days and long-term consistency.',
  privacyEye: 'Private by default', privacyTitle: 'Your habits are personal.<br>They can stay that way.',
  privacyBody: 'HabitBit does not require an account. Habit names, notes and completion records stay locally on your device.',
  account: 'Account', notRequired: 'Not required', habitRecords: 'Habit records', stored: 'Stored on device', analytics: 'Usage analytics', disabled: 'Disabled in the current release', readPrivacy: 'Read the full privacy policy',
  faqEye: 'Good to know', faqTitle: 'Questions before your first checkmark.',
  q1: 'What is HabitBit?', a1: 'HabitBit is a simple visual habit tracker and routine planner for iPhone. Daily check-ins build into weekly, monthly and yearly grids, making routines, streaks and long-term progress easier to see.',
  q2: 'Do I need an account?', a2: 'No. You can start tracking without creating an account. Habit records are stored locally on your device.',
  q3: 'What can I track?', a3: 'HabitBit works as a daily habit tracker, streak tracker, goal tracker and routine planner for exercise, reading, hydration, study, mindfulness or any repeated action. Each habit can have its own icon, color, schedule and reminder.',
  q4: 'Does it include widgets, reminders and a focus timer?', a4: 'Yes. HabitBit includes home screen and lock screen widgets, scheduled reminders and a Pomodoro-style focus timer.',
  q5: 'Is HabitBit free?', a5: 'HabitBit is free to download and use. Optional Pro purchases unlock unlimited habits, advanced statistics, Pro widgets, file export and import, and additional theme colors. Available plans and local prices are shown in the app.',
  reviewsEye: 'Early App Store feedback', reviewsTitle: 'Built for routines that last.', ratings: '5 ratings on the App Store',
  review1Title: 'Useful!', review1: '“It helps me keep up with my daily routines. Great.”',
  review2Title: 'Congratulations', review2: '“An app that will make my life easier. Thank you.”',
  review3Title: 'Spectacular!', review3: '“I didn\'t expect those results at the very beginning!”',
  verified: 'Verified App Store review', reviewsNote: 'Verified reviews published on the App Store.',
  finalTitle: 'Start with one square.', finalBody: 'The rest is what you return for.',
  privacy: 'Privacy', terms: 'Terms', support: 'Support', madeBy: 'Made by Alpsu Dilbilir.'
};

const alternates = [
  ['en', 'https://www.habitbit.app/'], ['tr', 'https://www.habitbit.app/tr/'], ['de', 'https://www.habitbit.app/de/'],
  ['fr', 'https://www.habitbit.app/fr/'], ['es', 'https://www.habitbit.app/es/'], ['it', 'https://www.habitbit.app/it/'],
  ['pt-BR', 'https://www.habitbit.app/pt-br/'], ['ja', 'https://www.habitbit.app/ja/'], ['ko', 'https://www.habitbit.app/ko/'],
  ['zh-Hans', 'https://www.habitbit.app/zh-hans/']
];

function buildLocale(locale) {
  const { lang, path: localePath, menu, ogLocale, copy, modes } = locale;
  const missing = Object.keys(english).filter((key) => !(key in copy));
  if (missing.length) throw new Error(`${lang}: missing translations: ${missing.join(', ')}`);

  let html = source;
  const standaloneLabels = new Set(['week', 'year', 'history']);
  const replacements = Object.keys(english)
    .filter((key) => !standaloneLabels.has(key))
    .sort((a, b) => english[b].length - english[a].length);
  for (const key of replacements) html = html.replaceAll(english[key], copy[key]);

  html = html
    .replaceAll('>Week<', `>${copy.week}<`)
    .replaceAll('>Year<', `>${copy.year}<`)
    .replaceAll('>History<', `>${copy.history}<`)
    .replace('>Skip to content<', `>${locale.skip}<`)
    .replace('aria-label="Primary navigation"', `aria-label="${copy.navFeatures}"`)
    .replace('aria-label="Explore HabitBit"', `aria-label="${copy.seeYear}"`)
    .replace('aria-label="A 365-day habit grid filling over time"', `aria-label="${copy.proofTitle}"`)
    .replace('aria-label="HabitBit views"', `aria-label="${copy.experienceEye}"`)
    .replace('aria-label="HabitBit features"', `aria-label="${copy.navFeatures}"`)
    .replace('aria-label="View HabitBit ratings and reviews on the App Store"', `aria-label="${copy.reviewsTitle}"`)
    .replaceAll('aria-label="5 out of 5 stars"', 'aria-label="5 / 5"')
    .replace('<html lang="en" data-screen-base="assets/screens/">', `<html lang="${lang}" data-screen-base="../assets/screens/${localePath}/">`)
    .replace('<link rel="canonical" href="https://www.habitbit.app/">', `<link rel="canonical" href="https://www.habitbit.app/${localePath}/">`)
    .replace('<meta property="og:site_name" content="HabitBit">', `<meta property="og:site_name" content="HabitBit">\n    <meta property="og:locale" content="${ogLocale}">`)
    .replace('<meta property="og:url" content="https://www.habitbit.app/">', `<meta property="og:url" content="https://www.habitbit.app/${localePath}/">`)
    .replaceAll('https://www.habitbit.app/assets/screens/02-habit-overview.png', `https://www.habitbit.app/assets/screens/${localePath}/02-habit-overview.png`)
    .replace('content="HabitBit visual habit tracker showing habit grids on iPhone"', `content="${locale.filmAlt}"`)
    .replace('"url": "https://www.habitbit.app/"', `"url": "https://www.habitbit.app/${localePath}/"`)
    .replace('"inLanguage": "en"', `"inLanguage": "${lang}"`)
    .replace('<summary aria-label="Choose language">EN</summary>', `<summary aria-label="${locale.chooseLanguage}">${menu}</summary>`)
    .replace(/<video muted loop playsinline preload="none" poster="assets\/screens\/02-habit-overview\.png" aria-label="[^"]+">\s*<source data-src="assets\/habitbit-app-preview-v2\.mp4" type="video\/mp4">\s*<\/video>/, `<img class="film-media" src="../assets/screens/${localePath}/02-habit-overview.png" alt="${locale.filmAlt}" width="1320" height="2868" loading="lazy">`)
    .replaceAll('href="habitbit.png"', 'href="../habitbit.png"')
    .replaceAll('src="habitbit.png"', 'src="../habitbit.png"')
    .replaceAll('href="styles.css?v=9"', 'href="../styles.css?v=9"')
    .replaceAll('src="app.js?v=4"', 'src="../app.js?v=4"')
    .replaceAll('href="privacy.html"', 'href="../privacy.html"')
    .replaceAll('href="tos.html"', 'href="../tos.html"')
    .replace('alt="HabitBit weekly habit grid on iPhone"', `alt="${modes.week.alt}"`)
    .replace('alt="HabitBit statistics showing streaks and completion distribution"', `alt="${copy.statsTitle}"`)
    .replace('alt="HabitBit focus timer for a journaling habit"', `alt="${copy.focusTitle}"`)
    .replace('alt="HabitBit widgets on the iPhone home and lock screens"', `alt="${copy.widgetTitle}"`)
    .replaceAll('aria-label="Download HabitBit on the App Store"', `aria-label="${copy.navGet}: HabitBit"`)
    .replace(/(href|src|poster)="assets\/screens\//g, `$1="../assets/screens/${localePath}/`);

  const modeJson = JSON.stringify(modes).replaceAll('<', '\\u003c');
  html = html.replace('    <script src="../app.js?v=4" defer></script>', `    <script type="application/json" id="mode-translations">${modeJson}</script>\n    <script src="../app.js?v=4" defer></script>`);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      [copy.q1, copy.a1], [copy.q2, copy.a2], [copy.q3, copy.a3], [copy.q4, copy.a4], [copy.q5, copy.a5]
    ].map(([name, answer]) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)];
  if (jsonLdBlocks.length !== 2) throw new Error(`${lang}: expected two JSON-LD blocks`);
  const softwareSchemaText = jsonLdBlocks[0][0].match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const softwareSchema = JSON.parse(softwareSchemaText);
  softwareSchema.featureList = [copy.weekBody, copy.stats1, copy.widgetBody, copy.stats2, copy.focusTitle, copy.privacyBody];
  softwareSchema.softwareRequirements = 'iOS / iPhone';
  softwareSchema.offers.description = copy.a5;
  const localizedSoftware = `    <script type="application/ld+json">\n    ${JSON.stringify(softwareSchema, null, 2).replaceAll('\n', '\n    ')}\n    </script>`;
  const localizedFaq = `    <script type="application/ld+json">\n    ${JSON.stringify(faqSchema, null, 2).replaceAll('\n', '\n    ')}\n    </script>`;
  html = html.replace(jsonLdBlocks[0][0], localizedSoftware).replace(jsonLdBlocks[1][0], localizedFaq);

  const outputDir = path.join(root, localePath);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
}

for (const locale of localeData) buildLocale(locale);

const allUrls = alternates.map(([, url]) => url);
const alternateLinks = alternates.map(([lang, url]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>`).join('\n');
const localizedEntries = allUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n${alternateLinks}\n    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.habitbit.app/"/>\n    <lastmod>2026-09-16</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${url === 'https://www.habitbit.app/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${localizedEntries}\n  <url><loc>https://www.habitbit.app/privacy.html</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>\n  <url><loc>https://www.habitbit.app/tos.html</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);

console.log(`Generated ${localeData.length} localized pages and sitemap.xml`);
