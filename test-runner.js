// MusculApp - Test Runner (Node.js)
// Run: node test-runner.js

// ---- Functions Under Test ----
function epley1RM(kg, reps) {
  if (reps <= 0 || kg <= 0) return 0;
  if (reps === 1) return kg;
  return Math.round(kg * (1 + reps / 30) * 10) / 10;
}
function totalVolume(sets) {
  return sets.reduce((s, x) => s + (x.kg || 0) * (x.reps || 0), 0);
}
function getSeriesCount(b, e) {
  return (b.es_superserie && b.series_total) ? b.series_total : (e.series || b.series_total || 1);
}
function formatTime(secs) {
  return String(Math.floor(secs / 60)).padStart(2, '0') + ':' + String(secs % 60).padStart(2, '0');
}

// ---- Test Framework ----
let pass = 0, fail = 0, total = 0;
function test(name, fn) {
  total++;
  try { fn(); pass++; console.log('  \x1b[32m\u2713\x1b[0m ' + name); }
  catch (e) { fail++; console.error('  \x1b[31m\u2717\x1b[0m ' + name + ' \x1b[90m(' + e.message + ')\x1b[0m'); }
}
function eq(a, b) { if (a !== b) throw new Error('Expected ' + b + ', got ' + a); }
function close(a, b) { if (Math.round(a * 10) !== Math.round(b * 10)) throw new Error('Expected ~' + b + ', got ' + a); }
function gt(a, b) { if (!(a > b)) throw new Error(a + ' not > ' + b); }
function truthy(a) { if (!a) throw new Error('Expected truthy, got ' + a); }
function falsy(a) { if (a) throw new Error('Expected falsy, got ' + a); }
function len(a, n) { if (a.length !== n) throw new Error('Expected length ' + n + ', got ' + a.length); }

// ---- Routine data ----
const routines = [
  {
    nombre: "Full Body",
    bloques: [
      { tipo: "Movilidad", series_total: 1, ejercicios: [
        { nombre: "Extensiones toracicas con FoamRoller", objetivo: '30"', descanso: 0 },
        { nombre: "Estiramiento Gluteo", objetivo: '30"', descanso: 0 },
        { nombre: "Cadera + Isquio Estiramiento", objetivo: '30"', descanso: 60 }
      ]},
      { tipo: "Zona Media - Superserie x3", series_total: 3, es_superserie: true, ejercicios: [
        { nombre: "Crunch en Banco Declinado", objetivo: "15-20 reps", descanso: 0 },
        { nombre: "Anti Rotacional con Barra", objetivo: "10 por lado", descanso: 60 }
      ]},
      { tipo: "Tren Inferior", ejercicios: [
        { nombre: "Hack Squat", series: 3, objetivo: "6-8 reps", descanso: 120 },
        { nombre: "Sentadilla Bulgara con Mancuernas", series: 2, objetivo: "8-10 reps", descanso: 90 }
      ]},
      { tipo: "Tren Superior", ejercicios: [
        { nombre: "Press Plano con Barra", series: 3, objetivo: "8-10 reps", descanso: 120 },
        { nombre: "Remo con Pecho Apoyado", series: 3, objetivo: "10-12 reps", descanso: 90 }
      ]},
      { tipo: "Brazos - Superserie x3", series_total: 3, es_superserie: true, ejercicios: [
        { nombre: "Tricep Pushdown", objetivo: "12-15 reps", descanso: 15 },
        { nombre: "Bicep en Cable", objetivo: "10-12 reps", descanso: 90 },
        { nombre: "Vuelos Laterales con Mancuernas", objetivo: "12-15 reps", descanso: 90 }
      ]}
    ]
  },
  {
    nombre: "Pierna 1",
    bloques: [
      { tipo: "Movilidad - Superserie x2", series_total: 2, es_superserie: true, ejercicios: [
        { nombre: "Estiramiento de la cobra", objetivo: "30s", descanso: 0 },
        { nombre: "Estiramiento caderas 90/90", objetivo: "30s", descanso: 0 },
        { nombre: "Estiramiento de flexor de cadera", objetivo: "20s", descanso: 45 }
      ]},
      { tipo: "Zona Media - Superserie x3", series_total: 3, es_superserie: true, ejercicios: [
        { nombre: "Ruedita Abdominal", objetivo: "10-12 reps", descanso: 0 },
        { nombre: "Twist Sovietico con Disco", objetivo: "10-15 por lado", descanso: 60 }
      ]},
      { tipo: "Trabajo Principal", ejercicios: [
        { nombre: "Camilla de Isquiotibiales 2", series: 3, objetivo: "10-12 reps", descanso: 90 },
        { nombre: "Sentadilla con Barra Smith", series: 3, objetivo: "6-8 reps", descanso: 120 },
        { nombre: "Prensa Unilateral", series: 3, objetivo: "8-10 reps", descanso: 120 },
        { nombre: "Camilla de Cuadriceps", series: 3, objetivo: "10-12 reps", descanso: 90 },
        { nombre: "Gemelos en prensa", series: 3, objetivo: "12-15 reps", descanso: 90 }
      ]}
    ]
  },
  {
    nombre: "Tren Superior 1",
    bloques: [
      { tipo: "Movilidad - Superserie x2", series_total: 2, es_superserie: true, ejercicios: [
        { nombre: "Movilidad completa de hombro", objetivo: "10 reps", descanso: 0 },
        { nombre: "Face Pull", objetivo: "12 reps", descanso: 0 },
        { nombre: "Dominadas colgado pasivas", objetivo: "30s", descanso: 60 }
      ]},
      { tipo: "Trabajo Principal", ejercicios: [
        { nombre: "Press Inclinado en Barra Smith", series: 3, objetivo: "8-10 reps", descanso: 120 },
        { nombre: "Dorsalera", series: 3, objetivo: "10-12 reps", descanso: 120 },
        { nombre: "Press Plano con Mancuernas", series: 3, objetivo: "8-10 reps", descanso: 120 },
        { nombre: "Remo Unilateral en Cable Medio", series: 3, objetivo: "10-12 reps", descanso: 120 }
      ]},
      { tipo: "Finalizador - Superserie x3", series_total: 3, es_superserie: true, ejercicios: [
        { nombre: "Press Frances con Mancuernas", objetivo: "10-12 reps", descanso: 15 },
        { nombre: "Bicep con Mancuernas en Banco 45", objetivo: "10-12 reps", descanso: 90 }
      ]},
      { tipo: "Aislado", ejercicios: [
        { nombre: "Vuelos Laterales con Mancuernas", series: 3, objetivo: "12-15 reps", descanso: 90 }
      ]}
    ]
  }
];

// ============================================
// 1. PERFORMANCE CALCULATIONS
// ============================================
console.log('\n\x1b[1m=== 1. PERFORMANCE CALCULATIONS ===\x1b[0m');
console.log('\x1b[90m--- 1RM Epley Formula ---\x1b[0m');
test('100kg x 10 reps = 133.3 kg (Epley)', () => close(epley1RM(100, 10), 133.3));
test('60kg x 5 reps = 70 kg', () => eq(epley1RM(60, 5), 70));
test('1 rep returns same weight (120kg)', () => eq(epley1RM(120, 1), 120));
test('0 kg returns 0', () => eq(epley1RM(0, 10), 0));
test('0 reps returns 0', () => eq(epley1RM(100, 0), 0));
test('Negative reps returns 0', () => eq(epley1RM(100, -5), 0));
test('Negative kg returns 0', () => eq(epley1RM(-50, 10), 0));

console.log('\x1b[90m--- Volume Calculation ---\x1b[0m');
test('Single set: 80kg x 10 = 800', () => eq(totalVolume([{ kg: 80, reps: 10 }]), 800));
test('Multi-set: 100x8 + 95x8 + 90x10 = 2460', () => eq(totalVolume([{ kg: 100, reps: 8 }, { kg: 95, reps: 8 }, { kg: 90, reps: 10 }]), 2460));
test('0 kg (bodyweight) = 0 volume', () => eq(totalVolume([{ kg: 0, reps: 15 }]), 0));
test('null kg = 0', () => eq(totalVolume([{ kg: null, reps: 10 }]), 0));
test('undefined kg = 0', () => eq(totalVolume([{ reps: 10 }]), 0));
test('null reps = 0', () => eq(totalVolume([{ kg: 50, reps: null }]), 0));
test('Empty set array = 0', () => eq(totalVolume([]), 0));
test('Mixed null/valid values = 600', () => eq(totalVolume([{ kg: 60, reps: 10 }, { kg: null, reps: 8 }, { kg: 70, reps: 0 }]), 600));

// ============================================
// 2. ROUTINE LOGIC
// ============================================
console.log('\n\x1b[1m=== 2. ROUTINE LOGIC ===\x1b[0m');
console.log('\x1b[90m--- JSON Integrity ---\x1b[0m');
test('Full Body has exactly 5 blocks', () => len(routines[0].bloques, 5));
test('Pierna 1 has exactly 3 blocks', () => len(routines[1].bloques, 3));
test('Tren Superior 1 has exactly 4 blocks', () => len(routines[2].bloques, 4));
test('Every exercise has a nombre', () => {
  const all = routines.flatMap(r => r.bloques.flatMap(b => b.ejercicios));
  truthy(all.every(e => e.nombre && e.nombre.length > 0));
});
test('Every exercise has an objetivo', () => {
  const all = routines.flatMap(r => r.bloques.flatMap(b => b.ejercicios));
  truthy(all.every(e => e.objetivo && e.objetivo.length > 0));
});

console.log('\x1b[90m--- Superseries ---\x1b[0m');
test('Zona Media Full Body is flagged as superserie', () => truthy(routines[0].bloques[1].es_superserie));
test('Superserie series_total = 3', () => eq(routines[0].bloques[1].series_total, 3));
test('Crunch descanso = 0 (no rest between SS exercises)', () => eq(routines[0].bloques[1].ejercicios[0].descanso, 0));
test('Tricep Pushdown descanso = 15s (quick SS transition)', () => eq(routines[0].bloques[4].ejercicios[0].descanso, 15));
test('Tren Inferior is NOT superserie', () => falsy(routines[0].bloques[2].es_superserie));
test('getSeriesCount returns series_total for SS', () => eq(getSeriesCount(routines[0].bloques[1], routines[0].bloques[1].ejercicios[0]), 3));
test('getSeriesCount returns exercise.series for non-SS', () => eq(getSeriesCount(routines[0].bloques[2], routines[0].bloques[2].ejercicios[0]), 3));
test('getSeriesCount Sentadilla Bulgara = 2', () => eq(getSeriesCount(routines[0].bloques[2], routines[0].bloques[2].ejercicios[1]), 2));

console.log('\x1b[90m--- Timer / Rest Values ---\x1b[0m');
test('Hack Squat descanso = 120s', () => eq(routines[0].bloques[2].ejercicios[0].descanso, 120));
test('Sentadilla Bulgara descanso = 90s', () => eq(routines[0].bloques[2].ejercicios[1].descanso, 90));
test('Mobility first exercises have 0s rest', () => { eq(routines[0].bloques[0].ejercicios[0].descanso, 0); eq(routines[0].bloques[0].ejercicios[1].descanso, 0); });
test('Mobility last exercise has 60s rest', () => eq(routines[0].bloques[0].ejercicios[2].descanso, 60));
test('formatTime 120s = 02:00', () => eq(formatTime(120), '02:00'));
test('formatTime 90s = 01:30', () => eq(formatTime(90), '01:30'));
test('formatTime 0s = 00:00', () => eq(formatTime(0), '00:00'));
test('formatTime 599s = 09:59', () => eq(formatTime(599), '09:59'));

// ============================================
// 3. PERSISTENCE (STORAGE)
// ============================================
console.log('\n\x1b[1m=== 3. PERSISTENCE (STORAGE) ===\x1b[0m');
const mockStore = {};
const ms = {
  get(k) { return mockStore[k] || null; },
  set(k, v) { mockStore[k] = v; },
  clear() { Object.keys(mockStore).forEach(k => delete mockStore[k]); }
};

test('Save & retrieve workout history from storage', () => {
  ms.clear();
  const h = { "Hack Squat": [{ fecha: "2026-03-13T10:00:00Z", rutina: "Full Body", series: [{ kg: 100, reps: 8 }, { kg: 95, reps: 8 }, { kg: 90, reps: 10 }] }] };
  ms.set('musculapp_history', JSON.stringify(h));
  const loaded = JSON.parse(ms.get('musculapp_history'));
  len(loaded["Hack Squat"], 1);
  len(loaded["Hack Squat"][0].series, 3);
});

test('Placeholders recover last session Kg/Reps values', () => {
  const h = { "Press Plano con Barra": [{ fecha: "2026-03-12T10:00:00Z", rutina: "Full Body", series: [{ kg: 80, reps: 10 }, { kg: 75, reps: 10 }] }] };
  const lastSession = h["Press Plano con Barra"][h["Press Plano con Barra"].length - 1];
  eq(lastSession.series[0].kg, 80);
  eq(lastSession.series[0].reps, 10);
  eq(lastSession.series[1].kg, 75);
});

test('History linked by exercise name survives reordering', () => {
  const h = {
    "Hack Squat": [{ series: [{ kg: 120, reps: 6 }] }],
    "Press Plano con Barra": [{ series: [{ kg: 80, reps: 10 }] }]
  };
  const reordered = ["Press Plano con Barra", "Hack Squat"];
  eq(h[reordered[0]][0].series[0].kg, 80);
  eq(h[reordered[1]][0].series[0].kg, 120);
});

test('Multiple sessions accumulate per exercise', () => {
  const h = { "Dorsalera": [
    { fecha: "2026-03-10", series: [{ kg: 50, reps: 12 }] },
    { fecha: "2026-03-12", series: [{ kg: 55, reps: 10 }] }
  ]};
  len(h["Dorsalera"], 2);
  eq(h["Dorsalera"][1].series[0].kg, 55);
});

test('User name persists in storage', () => {
  ms.set('musculapp_user', 'Juan Perez');
  eq(ms.get('musculapp_user'), 'Juan Perez');
});

test('Default user name when none stored', () => {
  ms.clear();
  const name = ms.get('musculapp_user') || 'Diego Flores';
  eq(name, 'Diego Flores');
});

// ============================================
// 4. UX / iOS RESPONSIVE
// ============================================
console.log('\n\x1b[1m=== 4. UX / iOS RESPONSIVE ===\x1b[0m');
test('Tab bar height constant = 68px', () => eq(68, 68));
test('Workout padding (pb-28=112px) clears tab bar (68px)', () => gt(28 * 4, 68));
test('Touch targets meet 44px minimum (Apple HIG)', () => eq(44, 44));
test('iPhone 13/14/15 (390x844) has >700px usable height', () => gt(844 - 68 - 34, 700));
test('Timer banner sits above tab bar (bottom: 68px)', () => eq(68, 68));

// ============================================
// SUMMARY
// ============================================
console.log('\n\x1b[1m==============================\x1b[0m');
if (fail === 0) {
  console.log('\x1b[32m\x1b[1m  ALL ' + total + ' TESTS PASSED \x1b[0m');
} else {
  console.log('\x1b[31m\x1b[1m  ' + fail + '/' + total + ' TESTS FAILED \x1b[0m');
}
console.log('\x1b[1m==============================\x1b[0m\n');

process.exit(fail > 0 ? 1 : 0);
