// Warm ink lines and layered gouache shapes are shared by the map and cards.
function orchardRoundTree(kind){
  const apple=kind==='apple';
  const canopy=apple?'M19 79C3 73 5 54 15 47C7 31 21 17 35 21C43 6 65 10 71 24C90 20 99 40 88 53C100 68 86 85 72 83C59 94 33 91 19 79Z':'M18 77C4 67 9 50 20 44C13 26 27 14 42 19C53 5 74 16 75 29C93 30 98 50 86 59C94 77 72 89 60 84C43 95 24 88 18 77Z';
  const fruitPositions=apple?[[26,48],[58,33],[75,62],[40,73]]:[[25,53],[50,34],[76,56],[51,75]];
  const fruit=fruitPositions.map(([x,y],i)=>apple?`<g transform="translate(${x} ${y}) rotate(${i%2?12:-9})"><path d="M0-5C-8-10-13-2-9 6Q-5 13 0 9Q6 13 10 5C14-4 6-10 0-5Z" fill="#d56f5c" stroke="#a85947" stroke-width=".8"/><path d="M0-5 1-10" stroke="#7e6844" stroke-width="1.8"/><path d="M1-8Q7-14 10-9Q6-5 1-8" fill="#859f61"/><path d="M-6-3q-2 3 0 5" fill="none" stroke="#edb095" stroke-width="1.5" stroke-linecap="round"/></g>`:`<g transform="translate(${x} ${y})"><path d="M-8-5Q-2-10 5-7Q12-2 8 5Q4 12-4 9Q-12 5-8-5Z" fill="#e9b35e" stroke="#b78f4b" stroke-width=".8"/><path d="M0-8Q3-15 9-11Q8-7 0-8" fill="#6f8c60"/><path d="m-5-2 1-1m6 7 1-1" stroke="#f7d691" stroke-width="2" stroke-linecap="round"/></g>`).join('');
  return `<ellipse cx="51" cy="119" rx="27" ry="5" fill="#6b7e5c" opacity=".15"/>
  <path d="M45 63q-2 27-3 43l-7 12 15-5 13 4-8-13 1-41Z" fill="#b49770" stroke="#816e54" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="m49 93-17-21m20 12 15-18m-19 37 1-18" stroke="#967e5c" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="${canopy}" fill="${apple?'#8eac76':'#91ae7b'}" stroke="#687f59" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M15 57q13 10 19 0q18 21 34 1q11 9 21-3q9 20-16 28q-30 14-54-4q-8-10-4-22" fill="#648b66" opacity=".46"/>
  <path d="M20 42q-5-13 11-16q9 4 12-6q14-6 21 4q10 5 9 14q-14-5-20 7q-18-10-33-3" fill="#c2d29b" opacity=".58"/>
  <g fill="none" stroke="#6b8459" stroke-width="1" opacity=".7" stroke-linecap="round"><path d="m25 34 7-4m2 21 6-5m27 1 6-3m-18 21 6-4m-39 4 6-1m31-41 4 2"/></g>
  <g fill="#d5dfb5" opacity=".6"><ellipse cx="22" cy="40" rx="3" ry="1.5" transform="rotate(-25 22 40)"/><ellipse cx="59" cy="53" rx="3" ry="1.5"/><ellipse cx="69" cy="31" rx="2" ry="1.3"/></g>
  ${fruit}<path d="m39 117-5 3m23-5 6 5" fill="none" stroke="#6c8157" stroke-width="1.4" stroke-linecap="round"/>`;
}
document.getElementById('tree-apple').innerHTML=orchardRoundTree('apple');
document.getElementById('tree-orange').innerHTML=orchardRoundTree('orange');
document.getElementById('tree-banana').innerHTML=`
<ellipse cx="50" cy="120" rx="28" ry="5" fill="#6b7e5c" opacity=".15"/>
<path d="M46 40q5 36-8 78l13-5 10 4q-9-40-6-77Z" fill="#b3b27b" stroke="#829061" stroke-width="1.2"/>
<path d="m47 65 8 5m-9 13 10 6m-11 12 10 6" stroke="#d6c99a" stroke-width="3" fill="none"/>
<g stroke="#69885e" stroke-width="1" stroke-linejoin="round"><path d="M51 44Q11 1 5 47q21-15 46-3" fill="#91ad78"/><path d="M51 44Q20-2 43 7q15 10 8 37" fill="#b3c791"/><path d="M51 44Q60-5 82 15q-6 15-31 29" fill="#9ebc87"/><path d="M51 44Q100 12 97 58q-22-22-46-14" fill="#81a078"/><path d="M51 44Q3 44 15 85q13-28 36-41" fill="#6f9575"/><path d="M51 44Q93 43 84 89q-11-30-33-45" fill="#749974"/></g>
<g stroke="#d2d5a7" stroke-width="1.1" fill="none" opacity=".8"><path d="M51 44 14 30m37 14L37 15m14 29 24-25m-24 25 35-5m-35 5L23 69m28-25 25 28"/></g>
<path d="M57 54q12 1 12 13" stroke="#8c9968" stroke-width="3" fill="none"/>
<g fill="#e7c66b" stroke="#ae9659" stroke-width="1"><path d="M59 60q-6 19 5 19q9-1 10-15-7 9-9-4Z"/><path d="M69 61q-4 19 7 17q7-3 7-15-6 10-9-2Z"/></g>
<path d="m35 120 7-4m14 2 7 3" stroke="#849568" stroke-width="1.2"/>`;
document.getElementById('tree-grape').innerHTML=`
<ellipse cx="50" cy="119" rx="32" ry="5" fill="#6b7e5c" opacity=".15"/>
<path d="m19 35-1 82m62-82 2 82M13 43l74 1M13 56l74 2" stroke="#ac9878" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M46 117q2-21 8-37t-6-32q-22-9-26 2m27 2q17-20 30-8" stroke="#938064" stroke-width="4" fill="none" stroke-linecap="round"/>
<g fill="#95ae7b" stroke="#708862" stroke-width="1"><path d="m13 34 9-9 10 6 11-6 6 14-11 14-18-1Z"/><path d="m43 27 11-10 11 7 11-2 7 13-9 16-20-3Z"/><path d="m14 57 12-9 11 7 7 16-15 9-16-12Z"/><path d="m60 55 15-10 14 11-3 17-17 3-12-9Z"/></g>
<path d="m22 35 12 8m23-13 11 9m-43 18 5 12m38-12 9 9" stroke="#c7d4a8" stroke-width="1.2" fill="none"/>
<g fill="#9d85af" stroke="#7d6b8b" stroke-width=".8"><circle cx="29" cy="72" r="5.8"/><circle cx="39" cy="72" r="5.8"/><circle cx="34" cy="81" r="5.8"/><circle cx="34" cy="90" r="4.7"/><circle cx="64" cy="67" r="5.8"/><circle cx="74" cy="67" r="5.8"/><circle cx="69" cy="76" r="5.8"/><circle cx="69" cy="85" r="4.7"/></g>
<g fill="#d1bfd6" opacity=".7"><circle cx="27" cy="70" r="1.4"/><circle cx="37" cy="70" r="1.4"/><circle cx="62" cy="65" r="1.4"/><circle cx="67" cy="74" r="1.4"/></g>`;
