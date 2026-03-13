// MusculApp - Diego Flores - Premium Fitness Tracker PWA
// ======================================================

const App = (() => {
  // ---- SVG ICONS (Lucide-style, strokeWidth 1.5) ----
  const ICONS = {
    dumbbell: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.4 14.4L9.6 9.6"/><path d="M18.657 21.485a2 2 0 01-2.829 0l-.707-.707a2 2 0 010-2.829l3.535-3.535a2 2 0 012.829 0l.707.707a2 2 0 010 2.829l-3.535 3.535z"/><path d="M5.343 2.515a2 2 0 012.829 0l.707.707a2 2 0 010 2.829L5.343 9.586a2 2 0 01-2.829 0l-.707-.707a2 2 0 010-2.829l3.536-3.535z"/></svg>',
    leg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 11-4 0z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 104 0z"/><path d="M16 17h4"/><path d="M4 13h4"/></svg>',
    muscle: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.409 13.017A5 5 0 0122 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 013 3 2 2 0 01-2 2c-1.105 0-1.64-.444-2-1"/><path d="M15 14a5 5 0 00-7.584 2"/><path d="M9.964 6.825C8.019 7.977 9.5 13 8 15"/></svg>',
    flame: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>',
    zap: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    target: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    trophy: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>',
    star: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    heart: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 00-7.65 0L12 5.36l-.77-.78a5.4 5.4 0 00-7.65 7.65l.77.77L12 20.65l7.65-7.65.77-.77a5.4 5.4 0 000-7.65z"/></svg>',
    chevronRight: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>',
    chevronLeft: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M15 19l-7-7 7-7"/></svg>',
    plus: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>',
    edit: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    copy: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
    x: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    check: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>',
    checkCircle: '<svg class="w-6 h-6 check-pop" fill="none" viewBox="0 0 24 24" stroke="#10b981" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3" stroke-width="2"/></svg>',
    circle: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#52525b" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>',
    chart: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>',
    download: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    upload: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    clock: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    arrowUp: '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>',
    arrowDown: '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
    user: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  };

  const ROUTINE_ICONS = [
    { key: 'dumbbell', label: 'Pesas' },
    { key: 'leg', label: 'Pierna' },
    { key: 'muscle', label: 'Fuerza' },
    { key: 'flame', label: 'Fuego' },
    { key: 'zap', label: 'Rayo' },
    { key: 'target', label: 'Target' },
    { key: 'trophy', label: 'Trofeo' },
    { key: 'star', label: 'Estrella' },
    { key: 'heart', label: 'Cardio' },
  ];

  // ---- DEFAULT DATA ----
  const defaultRoutines = [
    {
      id: 'r1', nombre: "Full Body", descripcion: "Trabajo de cuerpo completo", icono: "dumbbell",
      bloques: [
        { id:'b1', tipo:"Movilidad", series_total:1, ejercicios:[
          {nombre:"Extensiones torácicas con FoamRoller",objetivo:'30"',descanso:0},
          {nombre:"Estiramiento Gluteo",objetivo:'30"',descanso:0},
          {nombre:"Cadera + Isquio Estiramiento",objetivo:'30"',descanso:60}
        ]},
        { id:'b2', tipo:"Zona Media - Superserie x3", series_total:3, es_superserie:true, ejercicios:[
          {nombre:"Crunch en Banco Declinado",objetivo:"15-20 reps",descanso:0},
          {nombre:"Anti Rotacional con Barra",objetivo:"10 por lado",descanso:60}
        ]},
        { id:'b3', tipo:"Tren Inferior", ejercicios:[
          {nombre:"Hack Squat",series:3,objetivo:"6-8 reps",descanso:120},
          {nombre:"Sentadilla Bulgara con Mancuernas",series:2,objetivo:"8-10 reps",descanso:90}
        ]},
        { id:'b4', tipo:"Tren Superior", ejercicios:[
          {nombre:"Press Plano con Barra",series:3,objetivo:"8-10 reps",descanso:120},
          {nombre:"Remo con Pecho Apoyado",series:3,objetivo:"10-12 reps",descanso:90}
        ]},
        { id:'b5', tipo:"Brazos - Superserie x3", series_total:3, es_superserie:true, ejercicios:[
          {nombre:"Tricep Pushdown",objetivo:"12-15 reps",descanso:15},
          {nombre:"Bicep en Cable",objetivo:"10-12 reps",descanso:90},
          {nombre:"Vuelos Laterales con Mancuernas",objetivo:"12-15 reps",descanso:90}
        ]}
      ]
    },
    {
      id: 'r2', nombre: "Pierna 1", descripcion: "Día de pierna completo", icono: "leg",
      bloques: [
        { id:'b6', tipo:"Movilidad - Superserie x2", series_total:2, es_superserie:true, ejercicios:[
          {nombre:"Estiramiento de la cobra",objetivo:"30s",descanso:0},
          {nombre:"Estiramiento caderas 90/90",objetivo:"30s",descanso:0},
          {nombre:"Estiramiento de flexor de cadera",objetivo:"20s",descanso:45}
        ]},
        { id:'b7', tipo:"Zona Media - Superserie x3", series_total:3, es_superserie:true, ejercicios:[
          {nombre:"Ruedita Abdominal",objetivo:"10-12 reps",descanso:0},
          {nombre:"Twist Sovietico con Disco",objetivo:"10-15 por lado",descanso:60}
        ]},
        { id:'b8', tipo:"Trabajo Principal", ejercicios:[
          {nombre:"Camilla de Isquiotibiales 2",series:3,objetivo:"10-12 reps",descanso:90},
          {nombre:"Sentadilla con Barra Smith",series:3,objetivo:"6-8 reps",descanso:120},
          {nombre:"Prensa Unilateral",series:3,objetivo:"8-10 reps",descanso:120},
          {nombre:"Camilla de Cuadriceps",series:3,objetivo:"10-12 reps",descanso:90},
          {nombre:"Gemelos en prensa",series:3,objetivo:"12-15 reps",descanso:90}
        ]}
      ]
    },
    {
      id: 'r3', nombre: "Tren Superior 1", descripcion: "Torso completo", icono: "muscle",
      bloques: [
        { id:'b9', tipo:"Movilidad - Superserie x2", series_total:2, es_superserie:true, ejercicios:[
          {nombre:"Movilidad completa de hombro",objetivo:"10 reps",descanso:0},
          {nombre:"Face Pull",objetivo:"12 reps",descanso:0},
          {nombre:"Dominadas colgado pasivas",objetivo:"30s",descanso:60}
        ]},
        { id:'b10', tipo:"Trabajo Principal", ejercicios:[
          {nombre:"Press Inclinado en Barra Smith",series:3,objetivo:"8-10 reps",descanso:120},
          {nombre:"Dorsalera",series:3,objetivo:"10-12 reps",descanso:120},
          {nombre:"Press Plano con Mancuernas",series:3,objetivo:"8-10 reps",descanso:120},
          {nombre:"Remo Unilateral en Cable Medio",series:3,objetivo:"10-12 reps",descanso:120}
        ]},
        { id:'b11', tipo:"Finalizador - Superserie x3", series_total:3, es_superserie:true, ejercicios:[
          {nombre:"Press Frances con Mancuernas",objetivo:"10-12 reps",descanso:15},
          {nombre:"Bicep con Mancuernas en Banco 45°",objetivo:"10-12 reps",descanso:90}
        ]},
        { id:'b12', tipo:"Aislado", ejercicios:[
          {nombre:"Vuelos Laterales con Mancuernas",series:3,objetivo:"12-15 reps",descanso:90}
        ]}
      ]
    }
  ];

  // ---- STATE ----
  let state = {
    screen: 'home',
    tab: 'train',
    activeRoutine: null,
    workoutData: {},
    workoutStart: null,
    editingRoutine: null,
    editingIndex: -1,
  };
  let timerInterval = null, timerSeconds = 0, chartInstance = null;
  let idCounter = Date.now();
  const uid = () => 'id_' + (idCounter++);

  // ---- STORAGE ----
  const HISTORY_KEY = 'musculapp_history';
  const ROUTINES_KEY = 'musculapp_routines';
  const USER_KEY = 'musculapp_user';
  const getHistory = () => JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
  const saveHistory = (h) => localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  function getUserName() { return localStorage.getItem(USER_KEY) || 'Diego Flores'; }
  function saveUserName(n) { localStorage.setItem(USER_KEY, n); }
  function getRoutines() {
    const s = localStorage.getItem(ROUTINES_KEY);
    if (s) return JSON.parse(s);
    saveRoutines(defaultRoutines);
    return JSON.parse(JSON.stringify(defaultRoutines));
  }
  const saveRoutines = (r) => localStorage.setItem(ROUTINES_KEY, JSON.stringify(r));
  function getLastSession(name) {
    const r = (getHistory()[name] || []);
    return r.length ? r[r.length - 1] : null;
  }
  function saveWorkoutToHistory() {
    const h = getHistory(), date = new Date().toISOString();
    for (const [name, sets] of Object.entries(state.workoutData)) {
      const done = sets.filter(s => s.done);
      if (!done.length) continue;
      if (!h[name]) h[name] = [];
      h[name].push({ fecha: date, rutina: state.activeRoutine.nombre, series: done.map(s => ({ kg: s.kg, reps: s.reps })) });
      if (h[name].length > 30) h[name] = h[name].slice(-30);
    }
    saveHistory(h);
  }

  // ---- HELPERS ----
  const $ = id => document.getElementById(id);
  const html = (el, c) => { el.innerHTML = c; };
  const esc = s => s.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  const escId = s => s.replace(/[^a-zA-Z0-9]/g, '_');
  function epley1RM(kg, reps) { if (reps <= 0 || kg <= 0) return 0; if (reps === 1) return kg; return Math.round(kg * (1 + reps / 30) * 10) / 10; }
  function totalVolume(sets) { return sets.reduce((s, x) => s + (x.kg || 0) * (x.reps || 0), 0); }
  function formatTime(secs) { return `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`; }
  function getSeriesCount(b, e) { return (b.es_superserie && b.series_total) ? b.series_total : (e.series || b.series_total || 1); }
  function getIcon(key) { return ICONS[key] || ICONS.dumbbell; }

  // ---- TIMER ----
  function startTimer(seconds) {
    stopTimer(); timerSeconds = seconds;
    $('timer-banner').classList.remove('hidden');
    $('timer-text').textContent = formatTime(timerSeconds);
    timerInterval = setInterval(() => {
      timerSeconds--;
      if (timerSeconds <= 0) { stopTimer(); if (navigator.vibrate) navigator.vibrate([200, 100, 200]); return; }
      $('timer-text').textContent = formatTime(timerSeconds);
    }, 1000);
  }
  function stopTimer() { if (timerInterval) clearInterval(timerInterval); timerInterval = null; const b = $('timer-banner'); if (b) b.classList.add('hidden'); }
  function skipTimer() { stopTimer(); }

  // ---- TAB BAR ----
  function updateTabBar(activeTab, visible = true) {
    const bar = $('tab-bar');
    if (!visible) { bar.classList.add('hidden'); return; }
    bar.classList.remove('hidden');
    ['train', 'evolution', 'profile'].forEach(t => {
      const el = $(`tab-${t}`);
      if (t === activeTab) { el.className = el.className.replace('tab-inactive', '').replace('tab-active', '') + ' tab-active'; }
      else { el.className = el.className.replace('tab-active', '').replace('tab-inactive', '') + ' tab-inactive'; }
    });
  }
  function switchTab(tab) {
    state.tab = tab;
    if (tab === 'train') renderHome();
    else if (tab === 'evolution') renderEvolution();
    else if (tab === 'profile') renderProfile();
  }

  // ===========================================================
  // HOME (Entrenar)
  // ===========================================================
  function renderHome() {
    state.screen = 'home'; state.activeRoutine = null; state.workoutData = {}; state.editingRoutine = null; stopTimer();
    updateTabBar('train');
    const rutinas = getRoutines();
    const h = getHistory();
    const totalSets = Object.values(h).reduce((s, a) => s + a.length, 0);

    html($('app'), `
      <div class="fade-in pb-24" style="padding-top: calc(var(--safe-top, 0px) + 20px);">
        <div class="px-6 pb-6">
          <p class="text-zinc-500 text-xs font-medium tracking-widest uppercase">Bienvenido</p>
          <h1 class="text-[26px] font-bold tracking-tight mt-1">${getUserName()}</h1>
          ${totalSets > 0 ? `<p class="text-zinc-600 text-xs font-light mt-2">${totalSets} registros · ${Object.keys(h).length} ejercicios trackeados</p>` : ''}
        </div>

        <div class="px-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-zinc-500 text-[11px] font-semibold tracking-[.15em] uppercase">Mis Rutinas</h2>
            <button onclick="App.newRoutine()" class="flex items-center gap-1.5 text-emerald-400 text-xs font-medium min-h-[44px] active:opacity-70 transition-opacity">
              ${ICONS.plus} Nueva
            </button>
          </div>

          <div class="space-y-3">
            ${rutinas.map((r, i) => `
              <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl card-depth overflow-hidden fade-in stagger-${Math.min(i + 1, 3)}">
                <button onclick="App.startWorkout(${i})" class="w-full p-5 text-left active:bg-white/[.02] transition-colors">
                  <div class="flex items-center gap-4">
                    <div class="w-11 h-11 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-400 flex-shrink-0">
                      ${getIcon(r.icono)}
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-[15px] tracking-tight">${r.nombre}</h3>
                      <p class="text-zinc-500 text-xs font-light mt-0.5">${r.descripcion}</p>
                      <p class="text-zinc-600 text-[11px] font-light mt-1.5">${r.bloques.length} bloques · ${r.bloques.reduce((s, b) => s + b.ejercicios.length, 0)} ejercicios</p>
                    </div>
                    <div class="text-zinc-700">${ICONS.chevronRight}</div>
                  </div>
                </button>
                <div class="flex items-center justify-end gap-1 px-4 pb-3 -mt-1">
                  <button onclick="App.editRoutine(${i})" class="p-2.5 rounded-lg text-zinc-600 active:bg-zinc-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Editar">${ICONS.edit}</button>
                  <button onclick="App.duplicateRoutine(${i})" class="p-2.5 rounded-lg text-zinc-600 active:bg-zinc-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Duplicar">${ICONS.copy}</button>
                  <button onclick="App.deleteRoutineConfirm(${i})" class="p-2.5 rounded-lg text-zinc-600 active:bg-zinc-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Eliminar">${ICONS.trash}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        ${getRecentExercises().length > 0 ? `
        <div class="px-6 mt-8">
          <h2 class="text-zinc-500 text-[11px] font-semibold tracking-[.15em] uppercase mb-3">Reciente</h2>
          <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl card-depth divide-y divide-zinc-800/40">
            ${getRecentExercises().map(ex => `
              <button onclick="App.showHistoryModal('${esc(ex.nombre)}')" class="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-white/[.02] transition first:rounded-t-2xl last:rounded-b-2xl">
                <div>
                  <p class="text-sm font-medium">${ex.nombre}</p>
                  <p class="text-zinc-600 text-[11px] font-light">${new Date(ex.fecha).toLocaleDateString('es-AR', { day:'numeric', month:'short' })} · ${ex.series.length} series</p>
                </div>
                <div class="text-zinc-700">${ICONS.chevronRight}</div>
              </button>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    `);
  }

  function getRecentExercises() {
    const h = getHistory(), all = [];
    for (const [name, records] of Object.entries(h)) {
      if (records.length) all.push({ nombre: name, ...records[records.length - 1] });
    }
    return all.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
  }

  // ===========================================================
  // EVOLUTION (Progreso)
  // ===========================================================
  function renderEvolution() {
    state.screen = 'evolution'; updateTabBar('evolution');
    const h = getHistory();
    const exercises = Object.entries(h).filter(([, r]) => r.length > 0).map(([name, records]) => {
      const last = records[records.length - 1];
      let best1RM = 0;
      records.forEach(r => r.series.forEach(s => { const rm = epley1RM(s.kg, s.reps); if (rm > best1RM) best1RM = rm; }));
      const maxKg = Math.max(...records.flatMap(r => r.series.map(s => s.kg)));
      return { name, records, last, best1RM, maxKg, sessions: records.length };
    }).sort((a, b) => b.best1RM - a.best1RM);

    const totalVol = exercises.reduce((s, e) => s + e.records.reduce((ss, r) => ss + totalVolume(r.series), 0), 0);

    html($('app'), `
      <div class="fade-in pb-24" style="padding-top: calc(var(--safe-top, 0px) + 20px);">
        <div class="px-6 pb-6">
          <h1 class="text-[26px] font-bold tracking-tight">Progreso</h1>
          <p class="text-zinc-500 text-xs font-light mt-1">Tu evolución en el tiempo</p>
        </div>

        ${exercises.length === 0 ? `
          <div class="px-6 py-20 text-center">
            <div class="text-zinc-700 mb-4 flex justify-center">${ICONS.chart.replace('w-4 h-4', 'w-12 h-12')}</div>
            <p class="text-zinc-500 text-sm">Aún no hay datos de entrenamiento</p>
            <p class="text-zinc-600 text-xs mt-1">Completá tu primera sesión para ver tu progreso</p>
          </div>
        ` : `
          <!-- KPIs -->
          <div class="px-6 grid grid-cols-3 gap-3 mb-6">
            <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
              <p class="text-xl font-bold tracking-tight">${exercises.length}</p>
              <p class="text-zinc-600 text-[10px] font-medium uppercase tracking-wider mt-1">Ejercicios</p>
            </div>
            <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
              <p class="text-xl font-bold tracking-tight text-emerald-400">${exercises.reduce((s, e) => s + e.sessions, 0)}</p>
              <p class="text-zinc-600 text-[10px] font-medium uppercase tracking-wider mt-1">Sesiones</p>
            </div>
            <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
              <p class="text-xl font-bold tracking-tight">${totalVol > 9999 ? (totalVol/1000).toFixed(0) + 'k' : totalVol}</p>
              <p class="text-zinc-600 text-[10px] font-medium uppercase tracking-wider mt-1">Vol. total</p>
            </div>
          </div>

          <!-- Exercise List -->
          <div class="px-6">
            <h2 class="text-zinc-500 text-[11px] font-semibold tracking-[.15em] uppercase mb-3">Por ejercicio</h2>
            <div class="space-y-2">
              ${exercises.map(ex => `
                <button onclick="App.showHistoryModal('${esc(ex.name)}')" class="w-full bg-zinc-900/40 border border-zinc-800/60 rounded-xl card-depth px-4 py-3.5 text-left active:bg-white/[.02] transition flex items-center justify-between">
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium truncate">${ex.name}</p>
                    <p class="text-zinc-600 text-[11px] font-light mt-0.5">${ex.sessions} sesiones · max ${ex.maxKg}kg</p>
                  </div>
                  <div class="flex items-center gap-3 flex-shrink-0 ml-3">
                    <div class="text-right">
                      <p class="text-emerald-400 text-sm font-semibold tabular-nums">${ex.best1RM}</p>
                      <p class="text-zinc-600 text-[10px]">1RM est.</p>
                    </div>
                    <div class="text-zinc-700">${ICONS.chevronRight}</div>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        `}
      </div>
    `);
  }

  // ===========================================================
  // PROFILE (Perfil)
  // ===========================================================
  function renderProfile() {
    state.screen = 'profile'; updateTabBar('profile');
    const h = getHistory();
    const totalSets = Object.values(h).reduce((s, a) => s + a.reduce((ss, r) => ss + r.series.length, 0), 0);
    const totalSessions = Object.values(h).reduce((s, a) => s + a.length, 0);

    html($('app'), `
      <div class="fade-in pb-24" style="padding-top: calc(var(--safe-top, 0px) + 20px);">
        <div class="px-6 pb-6 text-center">
          <div class="w-20 h-20 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            ${ICONS.user.replace('w-5 h-5', 'w-8 h-8')}
          </div>
          <h1 class="text-xl font-bold tracking-tight">${getUserName()}</h1>
          <p class="text-zinc-500 text-xs font-light mt-1">Fitness Tracker Personal</p>
          <button onclick="App.editProfileName()" class="mt-3 text-emerald-400/70 text-xs font-medium active:text-emerald-400 transition min-h-[44px] inline-flex items-center gap-1">
            ${ICONS.edit} Editar nombre
          </button>
        </div>

        <div class="px-6 grid grid-cols-2 gap-3 mb-6">
          <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
            <p class="text-2xl font-bold">${totalSessions}</p>
            <p class="text-zinc-600 text-[10px] font-medium uppercase tracking-wider mt-1">Sesiones</p>
          </div>
          <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
            <p class="text-2xl font-bold">${totalSets}</p>
            <p class="text-zinc-600 text-[10px] font-medium uppercase tracking-wider mt-1">Series totales</p>
          </div>
        </div>

        <div class="px-6 space-y-2">
          <h2 class="text-zinc-500 text-[11px] font-semibold tracking-[.15em] uppercase mb-3">Datos</h2>
          <button onclick="App.showExportModal()" class="w-full bg-zinc-900/40 border border-zinc-800/60 rounded-xl card-depth px-4 py-4 text-left active:bg-white/[.02] transition flex items-center gap-4">
            <div class="text-zinc-400">${ICONS.download}</div>
            <div>
              <p class="text-sm font-medium">Exportar Datos</p>
              <p class="text-zinc-600 text-[11px] font-light">Descargar backup JSON completo</p>
            </div>
          </button>
          <button onclick="App.importData()" class="w-full bg-zinc-900/40 border border-zinc-800/60 rounded-xl card-depth px-4 py-4 text-left active:bg-white/[.02] transition flex items-center gap-4">
            <div class="text-zinc-400">${ICONS.upload}</div>
            <div>
              <p class="text-sm font-medium">Importar Datos</p>
              <p class="text-zinc-600 text-[11px] font-light">Restaurar desde archivo JSON</p>
            </div>
          </button>
        </div>

        <div class="px-6 mt-10 mb-6 text-center">
          <p class="text-zinc-600 text-[10px] font-light">&copy; ${new Date().getFullYear()} Diego Flores. Todos los derechos reservados.</p>
          <a href="mailto:dfv1663@gmail.com" class="text-zinc-500 text-[10px] font-light hover:text-emerald-400 transition">dfv1663@gmail.com</a>
        </div>
      </div>
    `);
  }

  // ===========================================================
  // EDITOR (Create / Edit Routine)
  // ===========================================================
  function newRoutine() {
    state.editingIndex = -1;
    state.editingRoutine = { id: uid(), nombre: '', descripcion: '', icono: 'dumbbell', bloques: [] };
    state.screen = 'editor'; renderEditor();
  }
  function editRoutine(i) {
    state.editingIndex = i;
    state.editingRoutine = JSON.parse(JSON.stringify(getRoutines()[i]));
    state.editingRoutine.bloques.forEach(b => { if (!b.id) b.id = uid(); });
    state.screen = 'editor'; renderEditor();
  }
  function duplicateRoutine(i) {
    const r = getRoutines(), c = JSON.parse(JSON.stringify(r[i]));
    c.id = uid(); c.nombre += ' (copia)'; c.bloques.forEach(b => { b.id = uid(); });
    r.push(c); saveRoutines(r); renderHome();
  }
  function deleteRoutineConfirm(i) {
    showConfirmModal(`Eliminar "${getRoutines()[i].nombre}"`, 'El historial se mantiene.', () => { const r = getRoutines(); r.splice(i, 1); saveRoutines(r); renderHome(); }, null, 'Eliminar');
  }

  function renderEditor() {
    const r = state.editingRoutine, isNew = state.editingIndex === -1;
    updateTabBar('train', false);

    html($('app'), `
      <div class="fade-in" style="padding-top: calc(var(--safe-top, 0px) + 8px);">
        <div class="px-4 flex items-center justify-between sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-30 py-3 border-b border-zinc-800/30">
          <button onclick="App.cancelEditor()" class="w-10 h-10 rounded-xl flex items-center justify-center active:bg-zinc-800 transition min-h-[44px] min-w-[44px] text-zinc-400">${ICONS.chevronLeft}</button>
          <h1 class="font-semibold text-base tracking-tight">${isNew ? 'Nueva Rutina' : 'Editar Rutina'}</h1>
          <button onclick="App.saveEditor()" class="text-emerald-400 font-semibold text-sm min-h-[44px] px-2 active:opacity-70 transition-opacity">Guardar</button>
        </div>

        <div class="px-5 py-6 space-y-6 pb-32">
          <!-- Info -->
          <div class="flex gap-4 items-start">
            <button onclick="App.toggleIconPicker()" id="icon-btn" class="w-14 h-14 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 card-depth flex items-center justify-center text-zinc-400 flex-shrink-0 active:bg-zinc-800 transition">
              ${getIcon(r.icono)}
            </button>
            <div class="flex-1 space-y-3">
              <input type="text" id="ed-nombre" value="${esc(r.nombre)}" placeholder="Nombre de la rutina"
                class="w-full bg-transparent border-b border-zinc-700/50 px-1 py-2.5 text-base font-semibold placeholder:text-zinc-700 focus:border-emerald-500/50 focus:outline-none transition min-h-[44px]">
              <input type="text" id="ed-desc" value="${esc(r.descripcion)}" placeholder="Descripción (opcional)"
                class="w-full bg-transparent border-b border-zinc-800/40 px-1 py-2 text-sm font-light text-zinc-400 placeholder:text-zinc-700 focus:border-emerald-500/50 focus:outline-none transition min-h-[44px]">
            </div>
          </div>
          <div id="icon-picker" class="hidden">
            <div class="grid grid-cols-5 gap-2 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-4">
              ${ROUTINE_ICONS.map(ic => `
                <button onclick="App.pickIcon('${ic.key}')" class="flex flex-col items-center gap-1 p-2.5 rounded-xl transition ${r.icono === ic.key ? 'bg-emerald-500/10 ring-1 ring-emerald-500/50' : 'active:bg-zinc-800'}">
                  <span class="text-zinc-400">${getIcon(ic.key)}</span>
                  <span class="text-[9px] text-zinc-600">${ic.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Blocks -->
          <div class="space-y-4">
            <h2 class="text-zinc-500 text-[11px] font-semibold tracking-[.15em] uppercase">Bloques</h2>
            ${r.bloques.map((b, bi) => renderEditorBloque(b, bi)).join('')}
            <button onclick="App.addBlock()" class="w-full border border-dashed border-zinc-700/40 rounded-2xl py-4 flex items-center justify-center gap-2 text-zinc-500 text-sm font-light active:bg-zinc-900/30 transition min-h-[44px]">
              ${ICONS.plus} Agregar Bloque
            </button>
          </div>

          ${!isNew ? `<button onclick="App.deleteFromEditor()" class="w-full py-4 text-red-400/60 text-sm font-light active:text-red-400 transition min-h-[44px]">Eliminar esta rutina</button>` : ''}
        </div>
      </div>
    `);
  }

  function renderEditorBloque(b, bi) {
    const isSS = b.es_superserie;
    return `
      <div class="bg-zinc-900/40 border ${isSS ? 'border-sky-500/20' : 'border-zinc-800/60'} rounded-2xl card-depth overflow-hidden ${isSS ? 'ss-accent' : ''}" id="block-${bi}">
        <div class="px-4 py-3 border-b border-zinc-800/30">
          <div class="flex items-center gap-2 mb-3">
            <input type="text" value="${esc(b.tipo)}" placeholder="Nombre del bloque" onchange="App.updateBlock(${bi},'tipo',this.value)"
              class="flex-1 bg-transparent border-b border-zinc-700/30 px-1 py-2 text-sm font-semibold placeholder:text-zinc-700 focus:border-sky-500/50 focus:outline-none transition min-h-[44px]">
            <button onclick="App.removeBlock(${bi})" class="w-10 h-10 rounded-lg flex items-center justify-center text-red-400/40 active:text-red-400 active:bg-red-500/10 transition min-h-[44px] min-w-[44px]">${ICONS.trash}</button>
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 min-h-[44px] cursor-pointer">
              <input type="checkbox" ${isSS ? 'checked' : ''} onchange="App.updateBlock(${bi},'es_superserie',this.checked)"
                class="w-4 h-4 rounded bg-zinc-800 border-zinc-600 text-sky-500 focus:ring-sky-500 focus:ring-offset-0">
              <span class="text-xs text-zinc-500 font-light">Superserie</span>
            </label>
            ${isSS ? `<div class="flex items-center gap-2">
              <span class="text-[11px] text-zinc-600">Series:</span>
              <input type="number" inputmode="numeric" value="${b.series_total || 3}" min="1" max="10" onchange="App.updateBlock(${bi},'series_total',parseInt(this.value)||3)"
                class="w-12 input-minimal text-xs">
            </div>` : ''}
          </div>
        </div>
        <div class="divide-y divide-zinc-800/20">
          ${b.ejercicios.map((e, ei) => renderEditorExercise(bi, e, ei, b)).join('')}
        </div>
        <button onclick="App.addExercise(${bi})" class="w-full py-3 flex items-center justify-center gap-1.5 text-emerald-400/70 text-xs font-medium active:bg-zinc-800/30 transition min-h-[44px] border-t border-zinc-800/20">
          ${ICONS.plus.replace('w-5 h-5', 'w-3.5 h-3.5')} Ejercicio
        </button>
      </div>`;
  }

  function renderEditorExercise(bi, e, ei, b) {
    const showS = !b.es_superserie;
    return `<div class="px-4 py-3 space-y-2">
      <div class="flex items-center gap-2">
        <div class="flex flex-col gap-0.5 mr-0.5">
          ${ei > 0 ? `<button onclick="App.moveExercise(${bi},${ei},-1)" class="w-7 h-7 rounded flex items-center justify-center text-zinc-600 active:text-zinc-300 transition">${ICONS.arrowUp}</button>` : '<div class="w-7 h-7"></div>'}
          ${ei < b.ejercicios.length - 1 ? `<button onclick="App.moveExercise(${bi},${ei},1)" class="w-7 h-7 rounded flex items-center justify-center text-zinc-600 active:text-zinc-300 transition">${ICONS.arrowDown}</button>` : '<div class="w-7 h-7"></div>'}
        </div>
        <input type="text" value="${esc(e.nombre)}" placeholder="Nombre del ejercicio" onchange="App.updateExercise(${bi},${ei},'nombre',this.value)"
          class="flex-1 bg-transparent border-b border-zinc-800/30 px-1 py-2 text-sm font-medium placeholder:text-zinc-700 focus:border-emerald-500/50 focus:outline-none transition min-h-[44px]">
        <button onclick="App.removeExercise(${bi},${ei})" class="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-700 active:text-red-400 transition min-h-[44px] min-w-[44px]">${ICONS.x}</button>
      </div>
      <div class="grid ${showS ? 'grid-cols-3' : 'grid-cols-2'} gap-3 pl-9">
        <div><label class="text-[9px] text-zinc-600 uppercase tracking-widest font-medium">Objetivo</label>
          <input type="text" value="${esc(e.objetivo || '')}" placeholder="8-10 reps" onchange="App.updateExercise(${bi},${ei},'objetivo',this.value)" class="input-minimal text-xs"></div>
        <div><label class="text-[9px] text-zinc-600 uppercase tracking-widest font-medium">Descanso</label>
          <input type="number" inputmode="numeric" value="${e.descanso || 0}" min="0" step="5" onchange="App.updateExercise(${bi},${ei},'descanso',parseInt(this.value)||0)" class="input-minimal text-xs"></div>
        ${showS ? `<div><label class="text-[9px] text-zinc-600 uppercase tracking-widest font-medium">Series</label>
          <input type="number" inputmode="numeric" value="${e.series || 3}" min="1" max="10" onchange="App.updateExercise(${bi},${ei},'series',parseInt(this.value)||3)" class="input-minimal text-xs"></div>` : ''}
      </div>
    </div>`;
  }

  // Editor actions
  function readEditorFields() { const n = $('ed-nombre'), d = $('ed-desc'); if (n) state.editingRoutine.nombre = n.value; if (d) state.editingRoutine.descripcion = d.value; }
  function toggleIconPicker() { $('icon-picker').classList.toggle('hidden'); }
  function pickIcon(key) { readEditorFields(); state.editingRoutine.icono = key; renderEditor(); }
  function updateBlock(bi, f, v) {
    readEditorFields(); state.editingRoutine.bloques[bi][f] = v;
    if (f === 'es_superserie' && v && !state.editingRoutine.bloques[bi].series_total) state.editingRoutine.bloques[bi].series_total = 3;
    if (f === 'es_superserie' || f === 'series_total') renderEditor();
  }
  function addBlock() { readEditorFields(); state.editingRoutine.bloques.push({ id: uid(), tipo: '', ejercicios: [{ nombre: '', objetivo: '', descanso: 60, series: 3 }] }); renderEditor(); setTimeout(() => { const bs = document.querySelectorAll('[id^="block-"]'); if (bs.length) bs[bs.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100); }
  function removeBlock(bi) { readEditorFields(); state.editingRoutine.bloques.splice(bi, 1); renderEditor(); }
  function addExercise(bi) { readEditorFields(); state.editingRoutine.bloques[bi].ejercicios.push({ nombre: '', objetivo: '', descanso: 60, series: 3 }); renderEditor(); }
  function removeExercise(bi, ei) { readEditorFields(); const b = state.editingRoutine.bloques[bi]; b.ejercicios.length <= 1 ? state.editingRoutine.bloques.splice(bi, 1) : b.ejercicios.splice(ei, 1); renderEditor(); }
  function moveExercise(bi, ei, dir) { readEditorFields(); const ex = state.editingRoutine.bloques[bi].ejercicios, ni = ei + dir; if (ni < 0 || ni >= ex.length) return; [ex[ei], ex[ni]] = [ex[ni], ex[ei]]; renderEditor(); }
  function updateExercise(bi, ei, f, v) { readEditorFields(); state.editingRoutine.bloques[bi].ejercicios[ei][f] = v; }
  function cancelEditor() { updateTabBar('train'); renderHome(); }
  function saveEditor() {
    readEditorFields(); const r = state.editingRoutine;
    if (!r.nombre.trim()) { showToast('Ingresá un nombre'); $('ed-nombre')?.focus(); return; }
    r.bloques = r.bloques.filter(b => { b.ejercicios = b.ejercicios.filter(e => e.nombre.trim()); return b.ejercicios.length > 0 && b.tipo.trim(); });
    if (!r.bloques.length) { showToast('Agregá al menos un bloque'); return; }
    const all = getRoutines();
    state.editingIndex === -1 ? all.push(r) : (all[state.editingIndex] = r);
    saveRoutines(all); showToast(state.editingIndex === -1 ? 'Rutina creada' : 'Guardado'); updateTabBar('train'); renderHome();
  }
  function deleteFromEditor() { showConfirmModal(`Eliminar "${state.editingRoutine.nombre}"`, 'No se puede deshacer.', () => { if (state.editingIndex >= 0) { const r = getRoutines(); r.splice(state.editingIndex, 1); saveRoutines(r); } updateTabBar('train'); renderHome(); }, null, 'Eliminar'); }

  // ===========================================================
  // WORKOUT
  // ===========================================================
  function startWorkout(i) {
    const r = getRoutines()[i]; state.screen = 'workout'; state.activeRoutine = r; state.workoutStart = Date.now(); state.workoutData = {};
    updateTabBar('train', false);
    r.bloques.forEach(b => b.ejercicios.forEach(e => {
      const c = getSeriesCount(b, e), ls = getLastSession(e.nombre), sets = [];
      for (let j = 0; j < c; j++) { const p = ls && ls.series[j]; sets.push({ kg: p ? p.kg : 0, reps: p ? p.reps : 0, done: false, ph_kg: p ? p.kg : '', ph_reps: p ? p.reps : '' }); }
      state.workoutData[e.nombre] = sets;
    }));
    renderWorkout();
  }

  function renderWorkout() {
    const r = state.activeRoutine;
    html($('app'), `
      <div class="fade-in" style="padding-top: calc(var(--safe-top, 0px) + 8px);">
        <div class="px-4 flex items-center justify-between sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-30 py-3 border-b border-zinc-800/30">
          <button onclick="App.confirmExit()" class="w-10 h-10 rounded-xl flex items-center justify-center active:bg-zinc-800 transition min-h-[44px] min-w-[44px] text-zinc-400">${ICONS.chevronLeft}</button>
          <div class="text-center">
            <h1 class="font-semibold text-base tracking-tight">${r.nombre}</h1>
            <p class="text-zinc-600 text-[11px] font-light" id="workout-elapsed">${getElapsed()}</p>
          </div>
          <button onclick="App.finishWorkout()" class="text-emerald-400 font-semibold text-sm min-h-[44px] px-2 active:opacity-70 transition-opacity">Finalizar</button>
        </div>
        <div class="px-4 py-4 space-y-4 pb-28">
          ${r.bloques.map((b, bi) => renderWorkoutBlock(b, bi)).join('')}
        </div>
      </div>
    `);
    tickElapsed();
  }

  function tickElapsed() { if (state.screen !== 'workout') return; const el = $('workout-elapsed'); if (el) el.textContent = getElapsed(); setTimeout(tickElapsed, 1000); }
  function getElapsed() { if (!state.workoutStart) return ''; const e = Math.floor((Date.now() - state.workoutStart) / 1000); return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, '0')}`; }

  function renderWorkoutBlock(b, bi) {
    const isSS = b.es_superserie;
    return `
      <div class="bg-zinc-900/40 border ${isSS ? 'border-sky-500/15' : 'border-zinc-800/50'} rounded-2xl card-depth overflow-hidden ${isSS ? 'ss-accent' : ''}">
        <div class="px-4 py-3 border-b border-zinc-800/20 flex items-center gap-2">
          <h2 class="font-medium text-[13px] text-zinc-400 tracking-tight">${b.tipo}</h2>
          ${isSS ? '<span class="text-[9px] bg-sky-500/10 text-sky-400/80 px-2 py-0.5 rounded-full font-medium tracking-wider">SS</span>' : ''}
        </div>
        <div class="${isSS ? 'divide-y divide-sky-500/5' : 'divide-y divide-zinc-800/20'}">
          ${b.ejercicios.map(e => renderWorkoutExercise(b, e)).join('')}
        </div>
      </div>`;
  }

  function renderWorkoutExercise(b, e) {
    const sets = state.workoutData[e.nombre] || [], allDone = sets.length > 0 && sets.every(s => s.done);
    return `
      <div class="px-4 py-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-[13px] tracking-tight ${allDone ? 'text-emerald-400/80' : 'text-zinc-200'}">${e.nombre}</p>
            <p class="text-zinc-600 text-[11px] font-light mt-0.5">${e.objetivo}${e.descanso > 0 ? ` · ${e.descanso}s` : ''}</p>
          </div>
          <button onclick="App.showHistoryModal('${esc(e.nombre)}')" class="p-2 rounded-lg text-zinc-600 active:text-zinc-300 active:bg-zinc-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center">${ICONS.chart}</button>
        </div>
        ${sets.length > 0 ? `
        <div class="space-y-2">
          <div class="grid grid-cols-[28px_1fr_1fr_36px] gap-3 text-[9px] text-zinc-700 uppercase tracking-[.2em] font-medium pl-1">
            <span>Set</span><span class="text-center">Kg</span><span class="text-center">Reps</span><span></span>
          </div>
          ${sets.map((s, si) => `
            <div class="grid grid-cols-[28px_1fr_1fr_36px] gap-3 items-center ${s.done ? 'opacity-40' : ''}">
              <span class="text-[11px] text-zinc-600 font-light text-center">${si + 1}</span>
              <input type="number" inputmode="decimal" step="0.5" id="kg-${escId(e.nombre)}-${si}" value="${s.kg || ''}" placeholder="${s.ph_kg || '—'}"
                onchange="App.updateSet('${esc(e.nombre)}',${si},'kg',this.value)" class="input-minimal ${s.done ? 'done' : ''}">
              <input type="number" inputmode="numeric" id="reps-${escId(e.nombre)}-${si}" value="${s.reps || ''}" placeholder="${s.ph_reps || '—'}"
                onchange="App.updateSet('${esc(e.nombre)}',${si},'reps',this.value)" class="input-minimal ${s.done ? 'done' : ''}">
              <button onclick="App.toggleSet('${esc(e.nombre)}',${si},${e.descanso || 0})"
                class="w-9 h-9 rounded-full flex items-center justify-center transition-all mx-auto min-h-[44px] min-w-[44px]">${s.done ? ICONS.checkCircle : ICONS.circle}</button>
            </div>
          `).join('')}
        </div>` : '<p class="text-zinc-700 text-xs font-light italic">Sin series</p>'}
      </div>`;
  }

  function updateSet(name, i, f, v) { if (state.workoutData[name]?.[i]) state.workoutData[name][i][f] = parseFloat(v) || 0; }
  function toggleSet(name, i, descanso) {
    if (!state.workoutData[name]?.[i]) return;
    state.workoutData[name].forEach((s, j) => {
      const kg = document.getElementById(`kg-${escId(name)}-${j}`), rp = document.getElementById(`reps-${escId(name)}-${j}`);
      if (kg) s.kg = parseFloat(kg.value) || 0; if (rp) s.reps = parseFloat(rp.value) || 0;
    });
    const set = state.workoutData[name][i]; set.done = !set.done;
    if (set.done && descanso > 0) startTimer(descanso);
    renderWorkout();
  }
  function confirmExit() {
    const has = Object.values(state.workoutData).some(s => s.some(x => x.done));
    if (has) showConfirmModal('Salir del entrenamiento', 'Los datos completados se guardarán.', () => { saveWorkoutToHistory(); updateTabBar('train'); renderHome(); }, () => { updateTabBar('train'); renderHome(); }, 'Guardar y salir', 'Descartar');
    else { updateTabBar('train'); renderHome(); }
  }
  function finishWorkout() {
    const has = Object.values(state.workoutData).some(s => s.some(x => x.done));
    if (!has) { showConfirmModal('Sin datos', 'No hay series completadas.', () => { closeModal(); updateTabBar('train'); renderHome(); }, null, 'OK'); return; }
    for (const [name, sets] of Object.entries(state.workoutData)) sets.forEach((s, i) => {
      const kg = document.getElementById(`kg-${escId(name)}-${i}`), rp = document.getElementById(`reps-${escId(name)}-${i}`);
      if (kg) s.kg = parseFloat(kg.value) || s.kg; if (rp) s.reps = parseFloat(rp.value) || s.reps;
    });
    saveWorkoutToHistory(); stopTimer(); renderSummary();
  }

  // ===========================================================
  // SUMMARY
  // ===========================================================
  function renderSummary() {
    state.screen = 'summary'; updateTabBar('train', false);
    const elapsed = state.workoutStart ? Math.floor((Date.now() - state.workoutStart) / 1000) : 0;
    let tVol = 0, tSets = 0; const exSum = [];
    for (const [name, sets] of Object.entries(state.workoutData)) {
      const done = sets.filter(s => s.done); if (!done.length) continue;
      tSets += done.length; const v = totalVolume(done); tVol += v;
      const mk = Math.max(...done.map(s => s.kg)), mr = Math.max(...done.map(s => s.reps));
      exSum.push({ name, sets: done, vol: v, rm: epley1RM(mk, mr) });
    }

    html($('app'), `
      <div class="fade-in" style="padding-top: calc(var(--safe-top, 0px) + 24px);">
        <div class="px-6">
          <div class="text-center mb-8">
            <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">${ICONS.checkCircle.replace('w-6 h-6', 'w-8 h-8')}</div>
            <h1 class="text-xl font-bold tracking-tight">Entrenamiento Completado</h1>
            <p class="text-zinc-500 text-xs font-light mt-1.5">${state.activeRoutine.nombre} · ${new Date().toLocaleDateString('es-AR', { day:'numeric', month:'short' })}</p>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-8">
            <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
              <p class="text-xl font-bold">${Math.floor(elapsed / 60)}<span class="text-xs text-zinc-500 font-light ml-0.5">min</span></p>
              <p class="text-zinc-600 text-[10px] uppercase tracking-wider mt-1">Duración</p>
            </div>
            <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
              <p class="text-xl font-bold">${tSets}</p>
              <p class="text-zinc-600 text-[10px] uppercase tracking-wider mt-1">Series</p>
            </div>
            <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 text-center card-depth">
              <p class="text-xl font-bold">${tVol > 999 ? (tVol/1000).toFixed(1)+'k' : tVol}</p>
              <p class="text-zinc-600 text-[10px] uppercase tracking-wider mt-1">Volumen</p>
            </div>
          </div>
          <div class="space-y-2 mb-8">
            ${exSum.map(ex => `
              <div class="bg-zinc-900/40 border border-zinc-800/60 rounded-xl card-depth px-4 py-3">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-[13px] font-medium">${ex.name}</p>
                  ${ex.rm > 0 ? `<span class="text-emerald-400/80 text-[11px] font-medium">1RM: ${ex.rm}kg</span>` : ''}
                </div>
                <div class="flex gap-1.5 flex-wrap">
                  ${ex.sets.map(s => `<span class="text-[11px] bg-zinc-800/60 text-zinc-400 px-2 py-1 rounded-md font-light">${s.kg} × ${s.reps}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="App.updateTabBar('train');App.renderHome()" class="w-full bg-zinc-900/60 border border-zinc-800/60 card-depth text-zinc-200 font-medium rounded-2xl py-4 text-sm active:bg-zinc-800 transition min-h-[44px] mb-8">Volver al Inicio</button>
        </div>
      </div>
    `);
  }

  // ===========================================================
  // MODALS
  // ===========================================================
  function showModal(content) {
    const o = $('modal-overlay'), mc = $('modal-content');
    mc.innerHTML = '<div class="sm:hidden flex justify-center pt-3 pb-1"><div class="w-10 h-1 rounded-full bg-zinc-600"></div></div>' + content;
    o.classList.remove('hidden'); o.classList.add('flex');
    o.onclick = e => { if (e.target === o) closeModal(); };
  }
  function closeModal() { $('modal-overlay').classList.add('hidden'); $('modal-overlay').classList.remove('flex'); if (chartInstance) { chartInstance.destroy(); chartInstance = null; } }

  function showConfirmModal(title, msg, onOk, onAlt, okText = 'Confirmar', altText = null) {
    const isDel = okText === 'Eliminar';
    showModal(`<div class="p-6">
      <h3 class="font-semibold text-base mb-2">${title}</h3>
      <p class="text-zinc-500 text-sm font-light mb-6">${msg}</p>
      <div class="space-y-2">
        <button onclick="App._ok()" class="w-full ${isDel ? 'bg-red-500/80 active:bg-red-500' : 'bg-emerald-500/80 active:bg-emerald-500'} text-white font-medium rounded-xl py-3 text-sm transition min-h-[44px]">${okText}</button>
        ${altText ? `<button onclick="App._alt()" class="w-full bg-zinc-800/80 text-zinc-300 font-medium rounded-xl py-3 text-sm active:bg-zinc-700 transition min-h-[44px]">${altText}</button>` : ''}
        <button onclick="App.closeModal()" class="w-full text-zinc-600 font-light py-3 text-sm min-h-[44px]">Cancelar</button>
      </div>
    </div>`);
    App._ok = () => { closeModal(); onOk?.(); };
    App._alt = () => { closeModal(); onAlt?.(); };
  }

  function showHistoryModal(name) {
    const records = getHistory()[name] || [];
    let content = '';
    if (records.length > 0) {
      let best = 0; records.forEach(r => r.series.forEach(s => { const rm = epley1RM(s.kg, s.reps); if (rm > best) best = rm; }));
      const last = records[records.length - 1], lv = totalVolume(last.series), mk = Math.max(...records.flatMap(r => r.series.map(s => s.kg)));
      content = `
        <div class="grid grid-cols-3 gap-2 mb-5">
          <div class="bg-zinc-800/50 rounded-xl p-3 text-center"><p class="text-base font-bold text-emerald-400">${best}</p><p class="text-zinc-600 text-[9px] uppercase tracking-widest mt-0.5">1RM Est.</p></div>
          <div class="bg-zinc-800/50 rounded-xl p-3 text-center"><p class="text-base font-bold">${mk}</p><p class="text-zinc-600 text-[9px] uppercase tracking-widest mt-0.5">Max Kg</p></div>
          <div class="bg-zinc-800/50 rounded-xl p-3 text-center"><p class="text-base font-bold">${lv}</p><p class="text-zinc-600 text-[9px] uppercase tracking-widest mt-0.5">Últ. Vol.</p></div>
        </div>
        ${records.length > 1 ? '<div class="mb-5 bg-zinc-800/30 rounded-xl p-3"><canvas id="history-chart" height="160"></canvas></div>' : ''}
        <div class="space-y-2">
          <h4 class="text-zinc-600 text-[9px] font-semibold uppercase tracking-[.2em]">Últimas sesiones</h4>
          ${records.slice(-5).reverse().map(r => `<div class="bg-zinc-800/30 rounded-xl px-3 py-2.5">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[11px] text-zinc-500 font-light">${new Date(r.fecha).toLocaleDateString('es-AR', { day:'numeric', month:'short', year:'numeric' })}</span>
              <span class="text-[10px] text-zinc-600">${r.rutina}</span>
            </div>
            <div class="flex gap-1.5 flex-wrap">${r.series.map(s => `<span class="text-[11px] bg-zinc-700/50 text-zinc-300 px-1.5 py-0.5 rounded font-light">${s.kg}×${s.reps}</span>`).join('')}</div>
          </div>`).join('')}
        </div>`;
    } else {
      content = '<p class="text-zinc-600 text-sm font-light py-12 text-center">Sin historial</p>';
    }

    showModal(`<div class="p-5">
      <div class="flex items-center justify-between mb-5">
        <h3 class="font-semibold text-[15px] pr-4 tracking-tight">${name}</h3>
        <button onclick="App.closeModal()" class="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 active:bg-zinc-800 transition min-h-[44px] min-w-[44px]">${ICONS.x}</button>
      </div>
      ${content}
    </div>`);
    if (records.length > 1) setTimeout(() => renderChart(records), 150);
  }

  function renderChart(records) {
    const c = document.getElementById('history-chart'); if (!c) return;
    const last = records.slice(-10);
    const labels = last.map(r => { const d = new Date(r.fecha); return `${d.getDate()}/${d.getMonth() + 1}`; });
    const kgData = last.map(r => Math.max(...r.series.map(s => s.kg)));
    const volData = last.map(r => totalVolume(r.series));
    if (chartInstance) chartInstance.destroy();

    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 160);
    grad.addColorStop(0, 'rgba(16,185,129,.15)');
    grad.addColorStop(1, 'rgba(16,185,129,0)');

    chartInstance = new Chart(c, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Max Kg', data: kgData, borderColor: '#10b981', backgroundColor: grad, tension: 0.4, fill: true, pointRadius: 3, pointBackgroundColor: '#10b981', borderWidth: 1.5, yAxisID: 'y' },
          { label: 'Volumen', data: volData, borderColor: 'rgba(14,165,233,.5)', tension: 0.4, fill: false, pointRadius: 2, pointBackgroundColor: '#0ea5e9', borderWidth: 1, borderDash: [4, 4], yAxisID: 'y1' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: true, position: 'top', labels: { color: '#52525b', font: { size: 9, family: 'Inter' }, boxWidth: 8, padding: 12 } },
          tooltip: { backgroundColor: '#18181b', titleColor: '#e4e4e7', bodyColor: '#a1a1aa', borderColor: '#27272a', borderWidth: 1, cornerRadius: 10, padding: 12, titleFont: { size: 11 }, bodyFont: { size: 10 } }
        },
        scales: {
          x: { grid: { color: 'rgba(39,39,42,.3)', drawTicks: false }, ticks: { color: '#3f3f46', font: { size: 9 }, padding: 6 }, border: { display: false } },
          y: { position: 'left', grid: { color: 'rgba(39,39,42,.2)', drawTicks: false }, ticks: { color: '#10b981', font: { size: 9 }, padding: 6 }, border: { display: false } },
          y1: { position: 'right', grid: { display: false }, ticks: { color: '#0ea5e9', font: { size: 9 }, padding: 6 }, border: { display: false } }
        }
      }
    });
  }

  function editProfileName() {
    showModal(`<div class="p-6">
      <h3 class="font-semibold text-base mb-4">Editar Nombre</h3>
      <input type="text" id="profile-name-input" value="${esc(getUserName())}" placeholder="Tu nombre"
        class="w-full bg-transparent border-b-2 border-zinc-700/50 px-1 py-3 text-lg font-semibold placeholder:text-zinc-700 focus:border-emerald-500/50 focus:outline-none transition min-h-[44px] text-center">
      <div class="space-y-2 mt-6">
        <button onclick="App.saveProfileName()" class="w-full bg-emerald-500/80 text-white font-medium rounded-xl py-3 text-sm active:bg-emerald-500 transition min-h-[44px]">Guardar</button>
        <button onclick="App.closeModal()" class="w-full text-zinc-600 font-light py-3 text-sm min-h-[44px]">Cancelar</button>
      </div>
    </div>`);
    setTimeout(() => { const inp = $('profile-name-input'); if (inp) { inp.focus(); inp.select(); } }, 200);
  }

  function saveProfileName() {
    const inp = $('profile-name-input');
    const name = inp ? inp.value.trim() : '';
    if (!name) { showToast('Ingresá un nombre'); return; }
    saveUserName(name);
    closeModal();
    showToast('Nombre actualizado');
    renderProfile();
  }

  function showExportModal() {
    const h = getHistory(), all = { history: h, routines: getRoutines() };
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    showModal(`<div class="p-6">
      <h3 class="font-semibold text-base mb-1">Exportar Datos</h3>
      <p class="text-zinc-500 text-xs font-light mb-5">${Object.keys(h).length} ejercicios · ${getRoutines().length} rutinas</p>
      <a href="${url}" download="musculapp_${new Date().toISOString().slice(0,10)}.json" onclick="setTimeout(()=>App.closeModal(),500)"
        class="w-full bg-emerald-500/80 text-white font-medium rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 active:bg-emerald-500 transition min-h-[44px]">
        ${ICONS.download} Descargar Backup
      </a>
    </div>`);
  }

  function importData() {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json';
    inp.onchange = e => { const f = e.target.files[0]; if (!f) return;
      const rd = new FileReader(); rd.onload = ev => { try {
        const d = JSON.parse(ev.target.result), hd = d.history || (d.routines ? {} : d), rt = d.routines || null;
        if (hd && typeof hd === 'object') { const c = getHistory(); for (const [n, recs] of Object.entries(hd)) { if (!Array.isArray(recs)) continue; if (!c[n]) c[n] = []; c[n] = c[n].concat(recs); const seen = new Set(); c[n] = c[n].filter(r => { if (seen.has(r.fecha)) return false; seen.add(r.fecha); return true; }); } saveHistory(c); }
        if (rt && Array.isArray(rt)) { const cr = getRoutines(), ids = new Set(cr.map(r => r.id)); rt.forEach(r => { if (!ids.has(r.id)) cr.push(r); }); saveRoutines(cr); }
        closeModal(); showToast('Importado'); renderHome();
      } catch { showToast('Archivo inválido'); } };
      rd.readAsText(f);
    }; inp.click();
  }

  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-zinc-800/90 backdrop-blur-xl text-zinc-100 text-xs font-medium px-5 py-3 rounded-2xl shadow-lg z-[60] fade-in border border-zinc-700/30';
    setTimeout(() => { if (t) t.remove(); }, 2500);
  }

  // ---- INIT ----
  function init() {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
    renderHome();
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();

  return {
    renderHome, startWorkout, updateSet, toggleSet, confirmExit, finishWorkout,
    showHistoryModal, showExportModal, closeModal, skipTimer, importData,
    newRoutine, editRoutine, duplicateRoutine, deleteRoutineConfirm, cancelEditor, saveEditor, deleteFromEditor,
    toggleIconPicker, pickIcon, updateBlock, addBlock, removeBlock, addExercise, removeExercise, moveExercise, updateExercise,
    switchTab, updateTabBar, renderEvolution, renderProfile, editProfileName, saveProfileName,
    _ok: () => {}, _alt: () => {},
  };
})();
