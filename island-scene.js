// An illustrated island: the paths used to draw roads also keep the trees off them.
const islandElement = document.querySelector('.island');
// Simplified Xiaoliuqiu-inspired coastline: broad northeast, tapered southwest.
const landShape = 'M672 45C694 40 714 53 720 70C726 87 737 95 751 104C784 128 812 160 816 209C821 247 818 282 800 313C786 338 759 346 736 357L663 390C630 405 604 423 583 444C558 469 548 501 531 530C510 561 487 589 466 626C453 648 451 668 435 687C415 718 378 729 349 736C327 743 307 741 290 734C278 722 274 713 268 713C254 723 237 719 223 705C206 685 197 663 201 638C205 608 229 590 252 574C281 554 304 537 313 511C323 485 318 461 331 437C337 412 355 393 371 372C356 353 348 332 343 310L337 284C371 267 404 247 440 225C494 187 544 153 593 119C616 98 645 84 672 45Z';
const roadPaths = [
  'M693 103C719 108 740 121 755 144C771 165 777 187 777 211C792 271 754 308 696 333C630 359 572 394 548 439C516 483 502 527 470 569C438 609 419 649 386 680C354 709 309 711 274 682C245 657 252 623 282 602C331 566 356 536 362 496C369 452 396 417 429 392C410 365 393 338 393 309C440 279 487 246 540 209C592 174 640 135 693 103Z',
  'M755 144Q771 126 790 139'
];
// Different-sized, irregular plots follow the coast instead of dividing the
// island into equal quarters. These polygons also assign each fruit species.
const orchardZones=[
  {kind:'apple',color:'#bed0a0',points:[[170,40],[655,40],[630,140],[645,230],[610,300],[567,334],[510,400],[426,430],[170,430]]},
  {kind:'orange',color:'#d0d5a3',points:[[655,40],[950,40],[950,390],[700,450],[567,334],[610,300],[645,230],[630,140]]},
  {kind:'banana',color:'#a7c7a0',points:[[170,430],[426,430],[468,475],[450,550],[482,610],[415,800],[170,800]]},
  {kind:'grape',color:'#b9c4a4',points:[[426,430],[510,400],[567,334],[700,450],[950,390],[950,800],[415,800],[482,610],[450,550],[468,475]]}
];
function insideOrchard(x,y,points){
  let inside=false;
  for(let i=0,j=points.length-1;i<points.length;j=i++){
    const [xi,yi]=points[i], [xj,yj]=points[j];
    if((yi>y)!==(yj>y) && x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
  }
  return inside;
}
const homes = [
  {x:388,y:367,color:'#d46e50'}, {x:369,y:492,color:'#759b94'},
  {x:290,y:683,color:'#d6a443'}, {x:472,y:584,color:'#c66c65'},
  {x:740,y:289,color:'#6b98aa'}, {x:626,y:189,color:'#d59952'}
];
const mapDefinitions = `<defs>
  <linearGradient id="land-color" x2=".2" y2="1"><stop stop-color="#bed48a"/><stop offset="1" stop-color="#7daf6c"/></linearGradient>
  <linearGradient id="road-color" x2="0" y2="1"><stop stop-color="#89918a"/><stop offset="1" stop-color="#737e7b"/></linearGradient>
  <pattern id="asphalt-grain" width="13" height="11" patternUnits="userSpaceOnUse"><circle cx="3" cy="2" r=".5" fill="#e0e4d8" opacity=".3"/><circle cx="9" cy="8" r=".6" fill="#36494b" opacity=".17"/></pattern>
  <radialGradient id="leaf-soft"><stop stop-color="#9acb67"/><stop offset=".65" stop-color="#5f9e4c"/><stop offset="1" stop-color="#347548"/></radialGradient>
  <radialGradient id="apple-soft" cx=".3" cy=".25"><stop stop-color="#ff9a79"/><stop offset=".45" stop-color="#ef5c4c"/><stop offset="1" stop-color="#b83340"/></radialGradient>
  <radialGradient id="orange-soft" cx=".3" cy=".25"><stop stop-color="#ffe18a"/><stop offset=".5" stop-color="#ffb43b"/><stop offset="1" stop-color="#e28423"/></radialGradient>
  <radialGradient id="grape-soft" cx=".3" cy=".25"><stop stop-color="#be9bd9"/><stop offset="1" stop-color="#76529f"/></radialGradient>
  <pattern id="grass-specks" width="43" height="37" patternUnits="userSpaceOnUse"><path d="m9 26 2-4 2 4m19-14 2-4 2 4" fill="none" stroke="#578445" stroke-opacity=".23" stroke-width="1.5"/></pattern>
  <clipPath id="land-clip"><path d="${landShape}"/></clipPath>
  <symbol id="island-home" viewBox="0 0 100 105">
    <ellipse cx="51" cy="95" rx="45" ry="7" fill="#355c42" opacity=".14"/>
    <path d="M18 41h64v42H18Z" fill="#fffaf0" stroke="#9fa89a" stroke-width="1.2"/>
    <path d="M72 41h10v42H72Z" fill="#dfdfc9"/>
    <path d="M10 42 29 17h43l19 25-4 7H12Z" fill="currentColor" stroke="#6b7d72" stroke-width="1.4"/>
    <path d="m29 21-12 20m22-20-7 20m18-20-2 20m14-20 4 20m5-20 11 20" fill="none" stroke="#ffffff" stroke-opacity=".25" stroke-width="1.4"/>
    <path d="M12 47h75" stroke="#e6dab6" stroke-width="3"/>
    <rect x="40" y="55" width="18" height="27" rx="1.5" fill="#689b9b"/><path d="M49 58v21" stroke="#b8d4c7" stroke-width="1.3"/>
    <g fill="#a6ced0" stroke="#779a95" stroke-width="1.2"><rect x="23" y="55" width="12" height="14"/><rect x="64" y="55" width="12" height="14"/></g>
    <path d="M20 55v15m18-15v15m23-15v15m18-15v15" stroke="#548c96" stroke-width="3"/>
    <path d="m19 57 3 0m-3 4h3m-3 4h3m14-8h3m-3 4h3m-3 4h3m22-8h3m-3 4h3m-3 4h3m14-8h3m-3 4h3m-3 4h3" stroke="#cee1d4" stroke-width=".8"/>
    <path d="M10 82h79v9H10Z" fill="#b39770"/><path d="M13 85h72m-72 3h72" stroke="#d4c5a2" stroke-width="1"/>
    <path d="M15 50v33m69-33v33M11 76h22m30 0h25m-72 0v7m9-7v7m43-7v7m10-7v7" stroke="#ebe8d1" stroke-width="2.5"/>
    <path d="M39 94h21" stroke="#d1c4a5" stroke-width="4" stroke-linecap="round"/>
    <path d="M7 82q1-12 4-23" fill="none" stroke="#9c8e62" stroke-width="3"/><path d="M11 61Q-4 48 0 69q4-8 11-8Q9 41 22 50q-9 3-11 11Q31 51 23 70q-3-9-12-9" fill="#719d76"/>
    <path d="M87 87h8l-1 6h-6Z" fill="#d69e7f"/><path d="M91 88v-7m0 2-4-4m4 3 4-4" stroke="#7e9e68" stroke-width="2"/>
  </symbol>
  <symbol id="island-truck" viewBox="0 0 100 65">
    <ellipse cx="49" cy="54" rx="42" ry="7" fill="#385643" opacity=".22"/>
    <rect x="9" y="24" width="47" height="26" rx="3" fill="#749e9e" stroke="#3b6870" stroke-width="2"/>
    <path d="M57 17h20l16 18v15H56Z" fill="#e88b61" stroke="#ab654e" stroke-width="2"/>
    <path d="M62 22h13l9 12H62Z" fill="#c8e8e2"/><path d="M9 36h45" stroke="#a6c5b7" stroke-width="2"/>
    <g fill="#dbb575" stroke="#9c7f52"><rect x="15" y="12" width="16" height="15"/><rect x="33" y="12" width="16" height="15"/></g>
    <g fill="#e58a41"><circle cx="19" cy="14" r="3"/><circle cx="27" cy="14" r="3"/></g><g fill="#d5584e"><circle cx="37" cy="14" r="3"/><circle cx="45" cy="14" r="3"/></g>
    <g fill="#37525b" stroke="#fbf0d7" stroke-width="3"><circle cx="27" cy="50" r="8"/><circle cx="77" cy="50" r="8"/></g>
    <rect x="87" y="38" width="6" height="5" fill="#fff3b9"/>
  </symbol>
  <symbol id="island-farmer" viewBox="0 0 50 85">
    <ellipse cx="25" cy="79" rx="18" ry="4" fill="#385643" opacity=".2"/>
    <path d="m17 56-2 20m17-20 3 20" stroke="#3d687e" stroke-width="9" stroke-linecap="round"/>
    <path d="m14 38-7 16m29-16 7 13" stroke="#e5b492" stroke-width="7" stroke-linecap="round"/>
    <rect x="13" y="32" width="24" height="28" rx="7" fill="#f3da91"/>
    <path d="M18 36v15h14V36m-15 9v16h17V45" fill="#6c9693"/>
    <circle cx="25" cy="23" r="11" fill="#efbf99"/>
    <ellipse cx="25" cy="15" rx="22" ry="5" fill="#d9af64"/><path d="M14 15 17 3h16l3 12" fill="#eed28c"/><path d="M16 11h18" stroke="#a57f43" stroke-width="3"/>
    <circle cx="21" cy="24" r="1"/><circle cx="29" cy="24" r="1"/>
  </symbol>
</defs>`;
// Paint each layer across the entire network before the next layer. At the
// port's T-junction the asphalt joins seamlessly, without stacked road edges.
const roadArtwork = `<g class="road-network" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <g stroke="#53724b" opacity=".2" transform="translate(0 2)">${roadPaths.map(d=>`<path d="${d}" stroke-width="24"/>`).join('')}</g>
  <g stroke="#d8d0b7" stroke-width="22">${roadPaths.map(d=>`<path d="${d}"/>`).join('')}</g>
  <g stroke="#f5efda" stroke-width="19">${roadPaths.map(d=>`<path d="${d}"/>`).join('')}</g>
  <g stroke="url(#road-color)" stroke-width="16">${roadPaths.map(d=>`<path class="road-route" d="${d}"/>`).join('')}</g>
  <g stroke="url(#asphalt-grain)" stroke-width="16">${roadPaths.map(d=>`<path d="${d}"/>`).join('')}</g>
  <path d="${roadPaths[0]}" stroke="#e9dfad" stroke-width="1.4" stroke-dasharray="9 14"/>
  <path d="m768 131 6 6" stroke="#f5efda" stroke-width="2"/>
</g>`;
const port = `<g class="little-port" role="img" aria-label="小港口、木棧橋、停泊漁船與碼頭倉庫">
  <g transform="translate(790 139) rotate(-58) translate(-888 -457)">
  <path d="m888 467 43 26 38 93-23 10-39-91-37-20Z" fill="#447d86" opacity=".18" transform="translate(0 8)"/>
  <path d="m888 457 43 26 38 93-23 10-39-91-37-20Z" fill="#bc9366" stroke="#8b704f" stroke-width="3"/>
  <path d="m918 485-17 8m24 9-17 8m24 9-17 8m24 9-17 8m24 9-17 8m24 9-17 8" stroke="#e6c797" stroke-width="3"/>
  <path d="m936 540 54-20 5 15-53 20" fill="#b68d61" stroke="#8b704f" stroke-width="2"/>
  <g fill="#715b43"><circle cx="889" cy="458" r="4"/><circle cx="929" cy="484" r="4"/><circle cx="946" cy="583" r="4"/><circle cx="970" cy="576" r="4"/></g>
  <g transform="translate(957 551) rotate(-22)"><ellipse cx="0" cy="14" rx="17" ry="28" fill="#488d9b" opacity=".25"/><path d="M0-18Q-22 6-12 34Q0 45 12 34Q22 6 0-18Z" fill="#f8edcf" stroke="#527e87" stroke-width="2"/><path d="M0-8Q-12 5-8 24h16Q12 5 0-8Z" fill="#d67c5e"/><path d="M-7 6H7" stroke="#f9dcb3" stroke-width="4"/></g>
  <g transform="translate(906 560) rotate(-25)"><path d="M0-16Q-17 6-10 30Q0 39 10 30Q17 6 0-16Z" fill="#f5f1d6" stroke="#618f9a" stroke-width="2"/><path d="M-6 2H6v18H-6Z" fill="#7cabb2"/></g>
  <g fill="#bc9866" stroke="#92734e"><rect x="889" y="435" width="13" height="12"/><rect x="904" y="440" width="13" height="12"/></g>
  </g>
  <use href="#island-home" x="748" y="154" width="58" height="62" color="#7c9eac"/>
</g>`;
islandElement.innerHTML = `<svg class="island-illustration" viewBox="140 0 800 820" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="小琉球島形靈感的水果島鳥瞰圖，含四座果園、環島道路、海島住宅與東北側小港口">
${mapDefinitions}
<g fill="none" stroke="#edf8eb" stroke-linecap="round" opacity=".55"><path d="M35 210q20 7 40 0m830-106q20 7 40 0M67 558q20 7 40 0m650 106q28 8 55 0M922 363q24 7 48 0"/><path d="M100 610q25 7 50 0m708 31q25 7 50 0M700 48q20 6 40 0" opacity=".6"/></g>
<path d="${landShape}" fill="none" stroke="#86c3c0" stroke-width="42" opacity=".35"/>
<path d="${landShape}" fill="#4c8f94" opacity=".19" transform="translate(1 17)"/>
<path d="${landShape}" fill="#a6bd86" stroke="#dfd6ae" stroke-width="25" transform="translate(0 10)"/>
<path d="${landShape}" fill="url(#land-color)" stroke="#eee4bf" stroke-width="20"/>
<g class="coastal-rocks" fill="#a7afa0" stroke="#8b9c93" stroke-width="1.2">
  <path d="m320 330 13-7 11 7-3 12-15 2Z"/><path d="m305 345 8-5 7 7-2 7-10 1Z"/>
  <path d="m535 550 12-8 14 7-3 11-16 2Z"/><path d="m557 563 8-5 9 6-3 7-11-1Z"/>
  <path d="m252 742 12-5 9 7-5 7-13-1Z"/>
</g>
<g class="bay-ripples" fill="none" stroke="#edf8ee" stroke-width="2" opacity=".6" stroke-linecap="round">
  <path d="M543 122q27-17 48-36M831 241q4 24-4 46M566 486q-9 26-19 37M304 445q-8 19-8 40M309 764q24 7 47-3"/>
</g>
<g clip-path="url(#land-clip)">
<g class="orchard-zones" opacity=".62">${orchardZones.map(zone=>`<polygon data-zone="${zone.kind}" points="${zone.points.map(p=>p.join(',')).join(' ')}" fill="${zone.color}"/>`).join('')}</g>
<path d="${landShape}" fill="url(#grass-specks)"/>
<g class="orchard-boundaries" fill="none" stroke="#eef0ce" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M655 40Q618 136 645 230Q635 293 567 334Q534 380 510 400T426 430L170 430"/><path d="M426 430Q479 462 458 516T482 610L415 800"/><path d="M567 334Q628 394 700 450L950 390"/></g>
${roadArtwork}<g class="orchard-planting"></g></g>
<g class="village-homes" role="img" aria-label="六棟白牆、百葉窗與木露台的海島住宅">${homes.map(h=>`<g><use href="#island-home" x="${h.x-28}" y="${h.y-57}" width="56" height="60" color="${h.color}"/></g>`).join('')}</g>
${port}
<use href="#island-truck" x="535" y="166" width="50" height="33" transform="rotate(-33 560 190)"/>
<use href="#island-farmer" x="512" y="288" width="24" height="41"/>
<use href="#island-farmer" x="426" y="477" width="24" height="41"/>
</svg>
<button class="map-pin pin-apple" data-orchard="apple" aria-label="查看蘋果園"><b>蘋果園</b><span>北風坡 ↗</span></button>
<button class="map-pin pin-orange" data-orchard="orange" aria-label="查看橘子園"><b>橘子園</b><span>暖陽灣 ↗</span></button>
<button class="map-pin pin-banana" data-orchard="banana" aria-label="查看香蕉園"><b>香蕉園</b><span>南風田 ↗</span></button>
<button class="map-pin pin-grape" data-orchard="grape" aria-label="查看葡萄園"><b>葡萄園</b><span>石階谷 ↗</span></button>
<span class="village-label">島民的家</span><span class="port-label">小港口 ⚓</span>`;

const coastGeometry=islandElement.querySelector('#land-clip path');
function isOnIsland(x,y,margin=0){
  if(!coastGeometry.isPointInFill(new DOMPoint(x,y))) return false;
  if(margin===0) return true;
  return [[margin,0],[-margin,0],[0,margin],[0,-margin]].every(([dx,dy])=>coastGeometry.isPointInFill(new DOMPoint(x+dx,y+dy)));
}
const roadSamples = [...islandElement.querySelectorAll('.road-route')].flatMap(path => {
  const length = path.getTotalLength();
  return Array.from({length:Math.ceil(length/8)+1},(_,i)=>path.getPointAtLength(Math.min(i*8,length)));
});
const planting = islandElement.querySelector('.orchard-planting');
// Seeded dart throwing creates varied spacing rather than visible rows.
let orchardSeed=527193;
function orchardRandom(){orchardSeed=(Math.imul(1664525,orchardSeed)+1013904223)>>>0;return orchardSeed/4294967296;}
const plantedTrees=[];
const speciesCounts={apple:0,orange:0,banana:0,grape:0};
const homePaths=homes.map(home=>{
  const start={x:home.x,y:home.y+5};
  const end=roadSamples.reduce((best,p)=>Math.hypot(p.x-start.x,p.y-start.y)<Math.hypot(best.x-start.x,best.y-start.y)?p:best,roadSamples[0]);
  return {start,end};
});
const pathSamples=homePaths.flatMap(({start,end})=>Array.from({length:11},(_,i)=>({x:start.x+(end.x-start.x)*i/10,y:start.y+(end.y-start.y)*i/10})));
const drivewayGroup=document.createElementNS('http://www.w3.org/2000/svg','g');
drivewayGroup.setAttribute('class','village-driveways');
drivewayGroup.innerHTML=homePaths.map(({start,end})=>`<path d="M${start.x} ${start.y}Q${start.x} ${(start.y+end.y)/2} ${end.x} ${end.y}" fill="none" stroke="#d5c19a" stroke-width="8" stroke-linecap="round"/><path d="M${start.x} ${start.y}Q${start.x} ${(start.y+end.y)/2} ${end.x} ${end.y}" fill="none" stroke="#ecdfbe" stroke-width="5" stroke-linecap="round"/>`).join('');
planting.before(drivewayGroup);
for(let attempt=0;attempt<18000 && plantedTrees.length<94;attempt++){
  const px=205+orchardRandom()*612;
  const py=90+orchardRandom()*645;
  const scale=.77+orchardRandom()*.2;
  const gap=34+orchardRandom()*12;
  if(!isOnIsland(px,py,10)||!isOnIsland(px,py-27,22)) continue;
  if(roadSamples.some(p=>Math.hypot(p.x-px,p.y-(py-15))<27)) continue;
  if(pathSamples.some(p=>Math.hypot(p.x-px,p.y-(py-12))<18)) continue;
  if(homes.some(h=>Math.abs(px-h.x)<36 && Math.abs(py-h.y+10)<44)) continue;
  if(px>739 && py<220) continue;
  if(plantedTrees.some(t=>Math.hypot(t.x-px,(t.y-py)*1.05)<(gap+t.gap)/2)) continue;
  const kind=orchardZones.find(zone=>insideOrchard(px,py,zone.points))?.kind;
  if(!kind) continue;
  if(speciesCounts[kind]>=26) continue;
  speciesCounts[kind]++;
  plantedTrees.push({x:px,y:py,kind,scale,gap,angle:orchardRandom()*10-5});
}
plantedTrees.sort((a,b)=>a.y-b.y);
planting.innerHTML=plantedTrees.map(t=>`<use class="planted-tree" data-kind="${t.kind}" data-x="${t.x.toFixed(2)}" data-y="${t.y.toFixed(2)}" href="#tree-${t.kind}" x="${t.x-24*t.scale}" y="${t.y-60*t.scale}" width="${48*t.scale}" height="${62*t.scale}" transform="rotate(${t.angle} ${t.x} ${t.y})"/>`).join('');
document.querySelector('.island-wrap').insertAdjacentHTML('beforeend','<div class="island-legend"><span>🌳 四座果園</span><span>⌂ 六戶人家</span><span>⚓ 海岸小港</span></div>');
