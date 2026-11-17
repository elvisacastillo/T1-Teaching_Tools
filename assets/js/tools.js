/* ============================================================
   Herramientas de Ingeniería Vial — filtro, búsqueda y utilidades
   Autor: Dr. Elvis A. Castillo-Camarena, Ph.D.
   ============================================================ */
(function () {
  'use strict';

  var grid   = document.getElementById('grid');
  var search = document.getElementById('search');
  var chips  = Array.prototype.slice.call(document.querySelectorAll('.chip[data-cat]'));
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');
  var resetEl = document.getElementById('reset');

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.tool-card'));
  var total = cards.length;
  var activeCat = 'all';

  /* Quita acentos y pasa a minúsculas para que "diseno" encuentre "diseño". */
  function normalize(s) {
    return (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /* Texto buscable de cada tarjeta: se calcula una sola vez. */
  cards.forEach(function (card) {
    var title = card.querySelector('h3');
    var desc  = card.querySelector('p');
    card._haystack = normalize(
      (title ? title.textContent : '') + ' ' +
      (desc ? desc.textContent : '') + ' ' +
      (card.getAttribute('data-keys') || '')
    );
  });

  function apply() {
    var q = normalize(search ? search.value.trim() : '');
    var terms = q ? q.split(/\s+/) : [];
    var shown = 0;

    cards.forEach(function (card) {
      var okCat = activeCat === 'all' || card.getAttribute('data-cat') === activeCat;
      var okText = terms.every(function (t) { return card._haystack.indexOf(t) !== -1; });
      var visible = okCat && okText;

      card.hidden = !visible;
      if (visible) shown++;
    });

    if (countEl) {
      countEl.textContent = shown === total
        ? total + ' herramientas'
        : shown + ' de ' + total + ' herramientas';
    }
    if (emptyEl) emptyEl.classList.toggle('show', shown === 0);
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeCat = chip.getAttribute('data-cat');
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      apply();
    });
  });

  if (search) {
    search.addEventListener('input', apply);
    /* Escape limpia la búsqueda sin tener que borrar a mano. */
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { search.value = ''; apply(); }
    });
  }

  if (resetEl) {
    resetEl.addEventListener('click', function () {
      if (search) search.value = '';
      activeCat = 'all';
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', c.getAttribute('data-cat') === 'all' ? 'true' : 'false');
      });
      apply();
      if (search) search.focus();
    });
  }

  apply();

  /* Año dinámico en el pie */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
