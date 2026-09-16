const palette = ['#82d1bb', '#e5b983', '#87b5dc', '#bdc58d', '#b7a6df', '#dda5b1'];

function makeAnimatedGrid(element, count, columns, className) {
    if (!element) return;
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < count; index += 1) {
        const cell = document.createElement('span');
        const row = Math.floor(index / columns);
        const column = index % columns;
        const snakePosition = row % 2 === 0 ? column : columns - 1 - column;
        const shouldFill = (index * 7 + row * 3) % 11 > 2;
        cell.className = className;
        if (shouldFill) cell.classList.add('will-fill');
        cell.style.setProperty('--cell-color', palette[Math.floor(row / 2) % palette.length]);
        cell.style.setProperty('--delay', `${-7.2 + (row * columns + snakePosition) * 0.018}s`);
        fragment.appendChild(cell);
    }
    element.appendChild(fragment);
}

makeAnimatedGrid(document.getElementById('hero-grid'), 210, 30, 'hero-cell');
makeAnimatedGrid(document.getElementById('final-grid'), 140, 20, 'final-cell');

const yearGrid = document.getElementById('year-grid');
if (yearGrid) {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 365; index += 1) {
        const cell = document.createElement('span');
        cell.className = 'year-cell';
        cell.style.setProperty('--cell-color', '#82d1bb');
        cell.style.setProperty('--delay', `${Math.min(1.5, index * 0.004)}s`);
        fragment.appendChild(cell);
    }
    yearGrid.appendChild(fragment);
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const previewVideo = document.querySelector('.film video');
if (previewVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const source = previewVideo.querySelector('source[data-src]');
                if (source) {
                    source.src = source.dataset.src;
                    source.removeAttribute('data-src');
                    previewVideo.load();
                }
                previewVideo.play().catch(() => {});
            } else {
                previewVideo.pause();
            }
        });
    }, { rootMargin: '320px 0px' });
    videoObserver.observe(previewVideo);
}

if (yearGrid) {
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-filled');
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });
    gridObserver.observe(yearGrid);
}

const screenBase = document.documentElement.dataset.screenBase || 'assets/screens/';
const translatedModesElement = document.getElementById('mode-translations');
const translatedModes = translatedModesElement ? JSON.parse(translatedModesElement.textContent) : {};

const modes = {
    week: {
        image: `${screenBase}07-weekly-view.png`,
        alt: 'HabitBit weekly habit grid on iPhone',
        kicker: 'This week',
        title: 'Make the next checkmark obvious.',
        description: 'A focused weekly board keeps today close without hiding the rhythm you are building.'
    },
    year: {
        image: `${screenBase}01-yearly-view.png`,
        alt: 'HabitBit yearly habit grid on iPhone',
        kicker: 'The whole year',
        title: 'See consistency before you feel it.',
        description: 'Zoom out and every ordinary day becomes part of a larger pattern. Missed days stay honest; returned days still count.'
    },
    detail: {
        image: `${screenBase}06-habit-history.png`,
        alt: 'HabitBit habit history and calendar on iPhone',
        kicker: 'Your history',
        title: 'Look back without losing today.',
        description: 'Open any habit to review its streak, calendar and completion history, or correct a past day with a tap.'
    }
};

Object.entries(translatedModes).forEach(([mode, copy]) => {
    if (modes[mode]) Object.assign(modes[mode], copy);
});

const modeImage = document.getElementById('mode-image');
const modeKicker = document.getElementById('mode-kicker');
const modeTitle = document.getElementById('mode-title');
const modeDescription = document.getElementById('mode-description');

document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
        const next = modes[button.dataset.mode];
        if (!next || button.getAttribute('aria-selected') === 'true') return;
        document.querySelectorAll('[data-mode]').forEach((item) => item.setAttribute('aria-selected', String(item === button)));
        modeImage.classList.add('is-changing');
        window.setTimeout(() => {
            modeImage.src = next.image;
            modeImage.alt = next.alt;
            modeKicker.textContent = next.kicker;
            modeTitle.textContent = next.title;
            modeDescription.textContent = next.description;
            modeImage.classList.remove('is-changing');
        }, 180);
    });
});

const currentYear = document.getElementById('current-year');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
