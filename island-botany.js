const botanicalDefinitions=`
<symbol id="coastal-palm" viewBox="0 0 100 128">
  <ellipse cx="51" cy="121" rx="25" ry="5" fill="#6e846b" opacity=".13"/>
  <path d="M43 119q17-47 6-79l8-2q13 42-4 81Z" fill="#baaa81" stroke="#908563" stroke-width="1.2"/>
  <path d="m51 55 8 2m-7 10 9 2m-8 10 9 2m-11 10 9 2m-12 9 8 3" stroke="#dfd0a5" stroke-width="2"/>
  <g stroke="#6b8d69" stroke-width="1"><path d="M52 43Q6 7 5 54q18-26 47-11" fill="#91ac81"/><path d="M52 43Q22-1 46 9q11 12 6 34" fill="#b3c397"/><path d="M52 43Q64-7 86 21q-16 3-34 22" fill="#9db58a"/><path d="M52 43Q102 19 94 62q-17-27-42-19" fill="#7f9e7c"/><path d="M52 43Q7 44 20 87q10-33 32-44" fill="#749974"/><path d="M52 43Q92 45 81 88q-7-31-29-45" fill="#85a37b"/></g>
  <g fill="#9d916e" stroke="#877956" stroke-width="1"><circle cx="51" cy="47" r="5"/><circle cx="59" cy="48" r="5"/><circle cx="55" cy="55" r="4.5"/></g>
</symbol>
<symbol id="coastal-tree" viewBox="0 0 100 128">
  <ellipse cx="49" cy="118" rx="30" ry="5" fill="#6e846b" opacity=".15"/>
  <path d="M46 55q5 27-5 61l11-4 10 5q-12-34-7-62Z" fill="#b4a183" stroke="#8f816b" stroke-width="1.2"/>
  <path d="m50 95-21-27m24 12 16-19" fill="none" stroke="#a38d70" stroke-width="4"/>
  <path d="M12 72Q-2 56 15 42Q4 23 28 23Q39 4 58 18Q80 6 85 32Q105 37 92 60Q99 80 74 83Q52 98 34 84Q14 88 12 72" fill="#91aba1" stroke="#6b8c80" stroke-width="1.3"/>
  <path d="M14 62q17 6 23-5q14 16 26 1q17 10 29-4q4 22-19 28q-22 12-38 2q-22 4-21-22" fill="#6c9385" opacity=".45"/>
  <path d="M21 34q9-10 21-5q15-12 25-3" fill="none" stroke="#bdcbbb" stroke-width="5" stroke-linecap="round"/>
  <path d="m22 51 7-4m23-8 6 2m14 22 7-3m-38 17 6-3" stroke="#6a8d7a" stroke-width="1.2"/>
</symbol>
<symbol id="coastal-shrub" viewBox="0 0 70 44">
  <ellipse cx="34" cy="38" rx="28" ry="4" fill="#7d8b6d" opacity=".15"/>
  <path d="M7 33Q0 19 16 17Q17 0 33 11Q48-2 54 16Q72 17 62 35Q37 46 7 33" fill="#a2b387" stroke="#819569" stroke-width="1"/>
  <path d="M13 22q12 6 20-2m7-4 8 5m-24 11 9 2" fill="none" stroke="#c7d2a4" stroke-width="2" stroke-linecap="round"/>
</symbol>
<symbol id="coastal-flowers" viewBox="0 0 55 48">
  <g fill="none" stroke="#95a173" stroke-width="1.4"><path d="M17 42 12 16m15 27 5-25m7 26 7-13M22 43 6 30"/><path d="m16 30-7-5m20 6 9-6m-14 15 10-4"/></g>
  <g fill="#e5d2b1"><path d="M8 12q0-7 5-2q7-4 5 2q6 5-1 5q-3 7-6 1q-8 2-3-6"/><path d="M28 15q0-7 5-2q7-4 5 2q6 5-1 5q-3 7-6 1q-8 2-3-6"/></g>
  <g fill="#d6a59a"><circle cx="45" cy="27" r="4"/><circle cx="5" cy="29" r="3.5"/></g><g fill="#c9ab6b"><circle cx="13" cy="15" r="1.8"/><circle cx="33" cy="18" r="1.8"/></g>
</symbol>
<symbol id="coastal-grass" viewBox="0 0 50 34">
  <path d="M25 31Q3 19 6 10q12 6 19 21Q13 4 21 2q7 11 4 29Q30 4 39 7q0 16-14 24Q42 16 47 20q-6 10-22 11" fill="#acb885" stroke="#8d9e72" stroke-width=".7"/>
</symbol>`;
islandElement.querySelector('defs').insertAdjacentHTML('beforeend',botanicalDefinitions);
const botanyLayer=document.createElementNS('http://www.w3.org/2000/svg','g');
botanyLayer.setAttribute('class','island-botany');
botanyLayer.setAttribute('role','img');
botanyLayer.setAttribute('aria-label','果園邊緣與海岸的椰子樹、海濱喬木、灌木和野花');
planting.before(botanyLayer);
const otherPlants=[];
for(let attempt=0;attempt<18000 && otherPlants.length<50;attempt++){
  const x=205+orchardRandom()*612,y=90+orchardRandom()*645;
  // Reserve a first pass for coastal trees, then fill smaller planting pockets.
  const large=otherPlants.length<7 && attempt<5000;
  if(!isOnIsland(x,y,15)||!isOnIsland(x,y-(large?32:9),large?27:14)) continue;
  if(large && isOnIsland(x,y,66)) continue;
  if(x>739&&y<220) continue;
  if(roadSamples.some(p=>Math.hypot(p.x-x,p.y-(y-(large?16:4)))<(large?37:24))) continue;
  if(pathSamples.some(p=>Math.hypot(p.x-x,p.y-y)<17)) continue;
  if(homes.some(h=>Math.abs(x-h.x)<48&&Math.abs(y-h.y+10)<53)) continue;
  if(plantedTrees.some(t=>Math.hypot(t.x-x,t.y-y)<(large?42:22))) continue;
  if(otherPlants.some(p=>Math.hypot(p.x-x,p.y-y)<(large||p.large?45:22))) continue;
  const variant=large?(otherPlants.length%3?'coastal-palm':'coastal-tree'):['coastal-shrub','coastal-flowers','coastal-grass'][otherPlants.length%3];
  otherPlants.push({x,y,large,variant});
}
botanyLayer.innerHTML=otherPlants.sort((a,b)=>a.y-b.y).map(p=>{
  const width=p.large?48:21+orchardRandom()*9,height=p.large?62:width*.7;
  return `<use class="native-plant" href="#${p.variant}" x="${p.x-width/2}" y="${p.y-height}" width="${width}" height="${height}"/>`;
}).join('');
