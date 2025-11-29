// Advanced calculator logic - supports scientific ops, memory, history
const displayEl = document.getElementById('display');
const historyEl = document.getElementById('history');
let current = '';
let memory = 0;
let lastExpression = '';

function updateDisplay() {
  displayEl.value = current || '0';
  historyEl.textContent = lastExpression;
}

function safeEval(expr) {
  try {
    return Function('"use strict";return (' + expr + ')')();
  } catch (e) {
    return 'Error';
  }
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;
    if (val) {
      current += val;
      updateDisplay();
    } else if (action) {
      handleAction(action);
    }
  });
});

function handleAction(action) {
  if (action === 'clear') {
    current = '';
    updateDisplay();
    return;
  }
  if (action === 'back') {
    current = current.slice(0, -1);
    updateDisplay();
    return;
  }
  if (action === 'percent') {
    try {
      const val = parseFloat(current);
      if (!isNaN(val)) {
        current = (val / 100).toString();
      }
    } catch (e) {}
    updateDisplay();
    return;
  }
  if (action === 'equals') {
    if (!current) return;
    const expr = current.replace(/×/g, '*').replace(/÷/g, '/');
    const res = safeEval(expr);
    lastExpression = current + ' = ' + res;
    current = String(res);
    updateDisplay();
    return;
  }
  if (action === 'mplus') {
    const v = parseFloat(current) || 0;
    memory += v;
    showTemp('M=' + memory);
    return;
  }
  if (action === 'mrec') {
    current += String(memory);
    updateDisplay();
    return;
  }
  if (action === 'mclear') {
    memory = 0;
    showTemp('MC');
    return;
  }
  if (action === 'sqrt') {
    const v = parseFloat(current) || 0;
    current = String(Math.sqrt(v));
    updateDisplay();
    return;
  }
  if (action === 'pow') {
    const base = parseFloat(current) || 0;
    const exp = parseFloat(prompt('Enter exponent (y) for x^y:')) || 0;
    current = String(Math.pow(base, exp));
    updateDisplay();
    return;
  }
  if (action === 'log') {
    const v = parseFloat(current) || 0;
    current = v > 0 ? String(Math.log10(v)) : 'Error';
    updateDisplay();
    return;
  }
  if (action === 'sin') {
    const v = parseFloat(current) || 0;
    current = String(Math.sin(v * Math.PI / 180));
    updateDisplay();
    return;
  }
  if (action === 'cos') {
    const v = parseFloat(current) || 0;
    current = String(Math.cos(v * Math.PI / 180));
    updateDisplay();
    return;
  }
  if (action === 'tan') {
    const v = parseFloat(current) || 0;
    current = String(Math.tan(v * Math.PI / 180));
    updateDisplay();
    return;
  }
}

function showTemp(text) {
  historyEl.textContent = text;
  setTimeout(()=>{ historyEl.textContent = lastExpression; }, 1200);
}

updateDisplay();
