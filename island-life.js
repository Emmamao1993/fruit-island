(() => {
  const scene=document.querySelector('.island-illustration');
  const defs=scene.querySelector('defs');
  defs.insertAdjacentHTML('beforeend',`<symbol id="delivery-truck" viewBox="0 0 76 38">
    <ellipse cx="37" cy="22" rx="32" ry="13" fill="#24423b" opacity=".13"/>
    <g fill="#45595a"><rect x="12" y="3" width="10" height="7" rx="2"/><rect x="12" y="29" width="10" height="7" rx="2"/><rect x="53" y="3" width="10" height="7" rx="2"/><rect x="53" y="29" width="10" height="7" rx="2"/></g>
    <rect x="7" y="8" width="36" height="23" rx="3" fill="#789a8c" stroke="#52786c" stroke-width="1.3"/>
    <rect x="11" y="11" width="27" height="17" rx="1" fill="#c6ac7d" stroke="#a68b64" stroke-width="1"/>
    <path d="M24 11v17m-13-8h27" stroke="#a68b64" stroke-width="1"/>
    <g fill="#cf7661"><circle cx="17" cy="15" r="3"/><circle cx="30" cy="24" r="3"/></g><g fill="#deb45f"><circle cx="30" cy="15" r="3"/><circle cx="17" cy="24" r="3"/></g>
    <path d="M43 7h17l9 7v11l-9 7H43Z" fill="#d88f6b" stroke="#aa7359" stroke-width="1.3"/>
    <path d="m51 11 9 2v13l-9 2Z" fill="#b9d8d1" stroke="#7e9d98" stroke-width="1"/>
    <path d="M45 12h4v14h-4" fill="#e9bb94"/><path d="M65 13v12" stroke="#f8e4b7" stroke-width="2"/>
    <rect x="68" y="13" width="3" height="5" rx="1" fill="#fff4ce"/><rect x="68" y="22" width="3" height="5" rx="1" fill="#fff4ce"/>
    <path d="M49 5V2m0 32v3" stroke="#a06e52" stroke-width="3" stroke-linecap="round"/>
  </symbol>`);
  const staticTruck=scene.querySelector('use[href="#island-truck"]');
  const delivery=document.createElementNS('http://www.w3.org/2000/svg','g');
  delivery.setAttribute('class','delivery-truck');delivery.setAttribute('role','img');delivery.setAttribute('aria-label','載著水果、沿環島道路行駛的小貨車');
  const route=scene.querySelector('.road-route').getAttribute('d');
  delivery.innerHTML=`<use href="#delivery-truck" x="-19" y="-9.5" width="38" height="19"/><animateMotion id="truckJourney" dur="48s" repeatCount="indefinite" rotate="auto" calcMode="paced" path="${route}"/>`;
  if(staticTruck)staticTruck.replaceWith(delivery);else scene.append(delivery);

  scene.querySelectorAll('use[href="#island-farmer"]').forEach(node=>node.remove());
  const workerLayer=document.createElementNS('http://www.w3.org/2000/svg','g');workerLayer.setAttribute('class','working-farmers');
  const fruitColors={apple:'#d87764',orange:'#deb05f',banana:'#d3bf66',grape:'#9876ac'};
  const workers=[];
  for(const kind of ['apple','orange','banana','grape']){
    const trees=plantedTrees.filter(t=>t.kind===kind);
    if(!trees.length)continue;
    const center=trees.reduce((a,t)=>({x:a.x+t.x/trees.length,y:a.y+t.y/trees.length}),{x:0,y:0});
    const candidates=[...trees].sort((a,b)=>Math.hypot(a.x-center.x,a.y-center.y)-Math.hypot(b.x-center.x,b.y-center.y));
    const chosen=[];
    for(const tree of candidates){
      const x=tree.x+17,y=tree.y+4;
      if(!isOnIsland(x,y,12)||roadSamples.some(p=>Math.hypot(p.x-x,p.y-y)<17))continue;
      if(homes.some(h=>Math.abs(h.x-x)<30&&Math.abs(h.y-y)<36))continue;
      if(chosen.some(t=>Math.hypot(t.x-x,t.y-y)<48))continue;
      chosen.push({x,y});if(chosen.length===2)break;
    }
    // A farmer remains visible in even the smallest orchard.
    if(!chosen.length)chosen.push({x:trees[0].x+13,y:trees[0].y+3});
    chosen.forEach(({x,y},i)=>{
      const name={apple:'蘋果園',orange:'橘子園',banana:'香蕉園',grape:'葡萄園'}[kind];
      const duration=(3.3+i*.6+workers.length*.13).toFixed(2);
      workers.push(`<g class="working-farmer" data-orchard-worker="${kind}" role="img" aria-label="${name}中採果、整理果籃的果農" transform="translate(${x-10} ${y-31}) scale(.43)">
        <ellipse cx="24" cy="75" rx="20" ry="4" fill="#45634e" opacity=".18"/>
        <path d="m17 53-2 17m16-17 3 17" fill="none" stroke="#64838b" stroke-width="8" stroke-linecap="round"/>
        <path d="M13 32h23v24H13Z" fill="#eee0ad"/><path d="M17 32v12h15V32m-16 9v17h18V41" fill="#7e9f94"/>
        <g><path d="M15 36 1 24" stroke="#dcaf8a" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="23" r="4" fill="${fruitColors[kind]}"/><animateTransform attributeName="transform" type="rotate" values="-15 15 36;32 15 36;32 15 36;-15 15 36" keyTimes="0;.4;.6;1" dur="${duration}s" repeatCount="indefinite"/></g>
        <g><path d="m33 36 10 15" stroke="#dcaf8a" stroke-width="6" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" values="0 33 36;-12 33 36;0 33 36" dur="${duration}s" repeatCount="indefinite"/></g>
        <circle cx="24" cy="22" r="10" fill="#e5b994"/><path d="M12 14 16 3h17l4 12" fill="#dfc48c" stroke="#b49a64" stroke-width="1"/><ellipse cx="24" cy="15" rx="21" ry="4" fill="#d2b173"/>
        <path d="M16 10h18" stroke="#9e8756" stroke-width="2"/><circle cx="21" cy="23" r="1" fill="#737058"/><circle cx="28" cy="23" r="1" fill="#737058"/>
        <path d="M38 56h22l-2 17H40Z" fill="#be9c70" stroke="#927c55" stroke-width="1.5"/><path d="M39 61h20m-18 5h17" stroke="#dec396" stroke-width="1.5"/>
        <g fill="${fruitColors[kind]}"><circle cx="43" cy="56" r="4"/><circle cx="50" cy="54" r="4"/><circle cx="57" cy="56" r="4"/></g>
      </g>`);
    });
  }
  workerLayer.innerHTML=workers.join('');scene.append(workerLayer);

  const waveLayer=document.createElementNS('http://www.w3.org/2000/svg','g');waveLayer.setAttribute('class','living-sea');waveLayer.setAttribute('aria-hidden','true');
  const waves=[[220,180],[390,88],[810,355],[680,520],[180,455],[170,730],[540,755],[830,70],[205,290],[640,675],[840,610],[300,135],[130,610]];
  waveLayer.innerHTML=waves.map(([x,y],i)=>`<g transform="translate(${x} ${y})"><g opacity=".42" fill="none" stroke="#f2faf1" stroke-width="1.8" stroke-linecap="round"><path d="M-25 0q12 5 25 0t25 0M-14 11q10 4 21 0"/><animateTransform attributeName="transform" type="translate" values="-5 1;5 -2;-5 1" dur="${5+i%4}s" begin="-${i%5}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".2;.65;.2" dur="${5+i%4}s" begin="-${i%5}s" repeatCount="indefinite"/></g></g>`).join('');
  // Paint waves under the land so none appear inside the orchards.
  scene.querySelector('defs').after(waveLayer);
  const waterOutline=scene.querySelector('path[stroke="#86c3c0"]');
  waterOutline?.insertAdjacentHTML('beforeend','<animate attributeName="opacity" values=".22;.4;.22" dur="7s" repeatCount="indefinite"/>');
  const control=document.getElementById('motionBtn');
  let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function updateMotion(){
    if(paused)scene.pauseAnimations();else scene.unpauseAnimations();
    control.classList.toggle('active',paused);control.setAttribute('aria-pressed',String(paused));
    control.innerHTML=paused?'▶ <span>繼續風景</span>':'Ⅱ <span>暫停風景</span>';
    scene.dataset.motion=paused?'paused':'playing';
  }
  window.toggleIslandMotion=()=>{paused=!paused;updateMotion();return paused;};
  updateMotion();
})();
