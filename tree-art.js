// Shared vector artwork keeps every tree visible from crown to roots.
const treeSymbols = `<svg class="tree-definitions" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
<linearGradient id="tree-leaves" x2="1" y2="1"><stop stop-color="#78bc58"/><stop offset="1" stop-color="#277348"/></linearGradient>
<linearGradient id="tree-bark" x2="1"><stop stop-color="#ae7548"/><stop offset="1" stop-color="#75492e"/></linearGradient>
<symbol id="tree-apple" viewBox="0 0 100 128">
<ellipse cx="50" cy="119" rx="29" ry="7" fill="#2a6448" opacity=".22"/>
<path d="M44 66h13l-1 40 10 12-16-4-15 5 9-15Z" fill="url(#tree-bark)"/>
<path d="m49 91-20-20m23 13 19-21" fill="none" stroke="#805535" stroke-width="7" stroke-linecap="round"/>
<path d="M22 82C-1 70 8 44 21 40 14 17 40 7 51 18 68 2 88 25 82 40 104 52 95 80 78 83 62 96 39 92 22 82Z" fill="url(#tree-leaves)" stroke="#397f46" stroke-width="2"/>
<path d="M22 39q4-17 20-13M64 24q12 1 13 10" fill="none" stroke="#b0d87a" stroke-width="5" stroke-linecap="round"/>
<g fill="#e94943" stroke="#b92c35" stroke-width="1.4"><path d="M22 54c-10-6-15 8-6 14 4 3 7 0 10-3 8-8 3-14-4-11Z"/><path d="M56 42c-10-6-15 8-6 14 4 3 7 0 10-3 8-8 3-14-4-11Z"/><path d="M73 65c-10-6-15 8-6 14 4 3 7 0 10-3 8-8 3-14-4-11Z"/><path d="M41 73c-10-6-15 8-6 14 4 3 7 0 10-3 8-8 3-14-4-11Z"/></g>
<g stroke="#62472d" stroke-width="2.5"><path d="m22 55 1-5m33-7 1-5m16 28 1-5m-33 13 1-5"/></g>
</symbol>
<symbol id="tree-orange" viewBox="0 0 100 128">
<ellipse cx="50" cy="119" rx="29" ry="7" fill="#2a6448" opacity=".22"/>
<path d="M44 67h13l-1 39 10 12-16-4-15 5 9-15Z" fill="url(#tree-bark)"/>
<path d="m49 93-20-22m23 14 19-22" fill="none" stroke="#805535" stroke-width="7" stroke-linecap="round"/>
<path d="M15 75C-1 54 13 38 22 38 14 14 38 7 51 19 70 4 90 26 83 43 104 56 92 80 78 82 60 95 32 91 15 75Z" fill="url(#tree-leaves)" stroke="#397f46" stroke-width="2"/>
<path d="M25 33q9-14 20-8" fill="none" stroke="#b0d87a" stroke-width="5" stroke-linecap="round"/>
<g fill="#ffa52c" stroke="#e27b17" stroke-width="2"><circle cx="24" cy="55" r="8"/><circle cx="51" cy="37" r="8"/><circle cx="74" cy="58" r="8"/><circle cx="47" cy="77" r="8"/></g>
<g fill="#b8dc80"><ellipse cx="27" cy="46" rx="5" ry="2" transform="rotate(-20 27 46)"/><ellipse cx="54" cy="28" rx="5" ry="2"/><ellipse cx="77" cy="49" rx="5" ry="2"/></g>
</symbol>
<symbol id="tree-banana" viewBox="0 0 100 128">
<ellipse cx="50" cy="119" rx="30" ry="7" fill="#2a6448" opacity=".22"/>
<path d="M45 42q3 37-9 77l17-5 9 5q-10-47-8-77Z" fill="#92ac50" stroke="#638d43" stroke-width="2"/>
<path d="m46 78 10 8m-12 8 11 7" stroke="#d9d78c" stroke-width="4"/>
<g fill="#45934d" stroke="#2b7746" stroke-width="1.5"><path d="M50 43Q3 2 4 54q19-21 46-11Z"/><path d="M50 43Q16-3 43 5q18 7 7 38Z"/><path d="M50 43Q58-4 80 10q9 12-30 33Z"/><path d="M50 43Q104 14 96 62q-15-25-46-19Z"/><path d="M50 43Q0 46 17 84q5-27 33-41Z"/><path d="M50 43Q98 43 82 87q-6-28-32-44Z"/></g>
<path d="m50 43-32-8m32 8 31-3m-31 3 1-24" stroke="#acd272" stroke-width="2" fill="none"/>
<path d="M57 52q13 4 12 19" fill="none" stroke="#5c7840" stroke-width="4"/>
<g stroke="#d9a427" stroke-width="1.5" fill="#ffda4b"><path d="M59 59q-6 17 4 20 9 1 12-14-8 9-10-5Z"/><path d="M68 61q-3 19 8 18 8-2 7-16-5 11-10-2Z"/></g>
</symbol>
<symbol id="tree-grape" viewBox="0 0 100 128">
<ellipse cx="50" cy="119" rx="33" ry="7" fill="#2a6448" opacity=".22"/>
<path d="M18 36v82m63-82v82M12 44h76M12 58h76" stroke="#ab8054" stroke-width="6" stroke-linecap="round"/>
<path d="M48 116q-2-24 6-42T43 47q-22-8-24 3m27 0q17-21 34-7" fill="none" stroke="#765235" stroke-width="6" stroke-linecap="round"/>
<g fill="url(#tree-leaves)" stroke="#398046" stroke-width="1.5"><path d="m14 34 9-9 9 6 10-7 6 16-11 14-17-1Z"/><path d="m43 25 9-9 10 7 12-2 9 14-7 18-21-4Z"/><path d="m16 56 10-7 12 7 4 15-13 8-15-10Z"/><path d="m62 52 13-9 13 10-2 18-17 4-11-10Z"/></g>
<g fill="#8150aa" stroke="#633a8c" stroke-width="1.5"><circle cx="30" cy="72" r="6"/><circle cx="40" cy="72" r="6"/><circle cx="35" cy="81" r="6"/><circle cx="35" cy="90" r="5"/><circle cx="64" cy="66" r="6"/><circle cx="74" cy="66" r="6"/><circle cx="69" cy="75" r="6"/><circle cx="69" cy="84" r="5"/></g>
</symbol></defs></svg>`;
document.body.insertAdjacentHTML('afterbegin', treeSymbols);
function treeArtwork(kind, label = '') {
  return `<svg class="whole-tree" viewBox="0 0 100 128" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}><use href="#tree-${kind}"/></svg>`;
}
const treeLabels = {apple:'結滿蘋果的完整蘋果樹',orange:'結滿橘子的完整橘子樹',banana:'長著香蕉的完整香蕉樹',grape:'結滿葡萄的完整葡萄藤與藤架'};
for (const kind of Object.keys(treeLabels)) {
  document.querySelectorAll(`.grove-${kind} i`).forEach(node => {node.innerHTML = treeArtwork(kind);});
  document.querySelector(`.pin-${kind}`).innerHTML = treeArtwork(kind, treeLabels[kind]);
  document.querySelector(`.fruit-icon.${kind}`).innerHTML = treeArtwork(kind, treeLabels[kind]);
}
document.getElementById('detailVisual').innerHTML = treeArtwork('apple', treeLabels.apple) + '<small>北風坡 / 01</small>';
