(() => {
  const dialog=document.getElementById('harvestGame');
  const get=id=>document.getElementById(id);
  const orchards={
    apple:{name:'蘋果',title:'蘋果園',accent:'#be6959',soft:'#f8e5d5'},
    orange:{name:'橘子',title:'橘子園',accent:'#cb9845',soft:'#f9edce'},
    banana:{name:'香蕉',title:'香蕉園',accent:'#a3a04c',soft:'#f2efcb'},
    grape:{name:'葡萄',title:'葡萄園',accent:'#9872a6',soft:'#eee3f2'}
  };
  const storageKey='fruit-island.harvest.v1';
  let records={};
  try{const stored=JSON.parse(localStorage.getItem(storageKey)||'{}');if(stored&&typeof stored==='object'&&!Array.isArray(stored))records=stored;}catch{}
  let kind='apple',phase='ready',score=0,picked=0,combo=0,remaining=30000,deadline=0,timer=null,returnFocus=null;
  let fruits=[];
  function fruitArt(type,ripe){
    const main=ripe?{apple:'#dc7561',orange:'#edb24d',banana:'#e6c96e',grape:'#9b76b0'}[type]:'#99b37a';
    const line=ripe?{apple:'#b65b49',orange:'#bd8d3b',banana:'#b49c52',grape:'#795c8d'}[type]:'#748c5c';
    const shapes={
      apple:`<path d="M42 24C24 10 9 29 17 49C23 64 31 66 40 60C51 68 64 58 68 45C76 21 58 12 42 24Z"/><path d="M42 25q-2-12 5-19" fill="none" stroke="#867148" stroke-width="4"/><path d="M44 16Q55 0 64 13Q58 24 44 16Z" fill="#8ba56b" stroke="#6f8d58"/>`,
      orange:`<path d="M15 40C15 13 62 8 68 37C76 71 12 78 15 40Z"/><path d="M40 16Q39 2 54 5Q59 17 40 16Z" fill="#849f64" stroke="#6f8d58"/><path d="M25 31q-4 5-3 11" fill="none" stroke="#f7e2a2" stroke-width="3" stroke-linecap="round"/>`,
      banana:`<path d="M18 18Q17 64 62 40Q50 72 28 66Q0 62 10 20Z"/><path d="M32 12Q35 47 70 27Q66 53 43 55Q16 52 24 15Z"/><path d="m13 19 4-6m10 3 4-6" stroke="#8b8652" stroke-width="4" fill="none"/>`,
      grape:`<g>${[[28,26],[45,23],[59,32],[24,42],[42,40],[55,48],[33,55],[46,60],[38,70]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10"/>`).join('')}</g><path d="M43 20q0-12 9-16" fill="none" stroke="#81945f" stroke-width="4"/><path d="M42 16Q21-3 18 16Q27 28 42 16Z" fill="#91ad70" stroke="#718c56"/>`
    };
    return `<svg viewBox="0 0 84 84" aria-hidden="true"><g fill="${main}" stroke="${line}" stroke-width="1.3" stroke-linejoin="round">${shapes[type]}</g></svg>`;
  }
  function best(){return Number.isFinite(records[kind])?records[kind]:0;}
  function hud(){
    get('harvestTime').textContent=`${Math.ceil(remaining/1000)} 秒`;
    get('harvestScore').textContent=`${score} 分`;
    get('harvestCount').textContent=`${picked} / 12`;
    get('harvestBest').textContent=`${best()} 分`;
    get('harvestProgress').setAttribute('aria-valuenow',String(picked));
    get('harvestProgressFill').style.width=`${Math.min(100,picked/12*100)}%`;
  }
  function feedback(message){get('harvestFeedback').textContent=message;}
  function cover(title,text,label){get('harvestCoverTitle').textContent=title;get('harvestCoverText').textContent=text;get('harvestStart').textContent=label;get('harvestCover').hidden=false;get('harvestSlots').inert=true;}
  function renderFruit(index){
    const fruit=fruits[index],button=get('harvestSlots').children[index];
    button.className=`harvest-fruit${fruit.ripe?' is-ripe':''}${fruit.picked?' is-picked':''}`;
    button.disabled=fruit.picked;
    button.setAttribute('aria-label',`${fruit.ripe?'採收成熟的':'未熟的'}${orchards[kind].name}，第 ${index+1} 顆`);
    button.innerHTML=fruitArt(kind,fruit.ripe)+`<span>${fruit.picked?'已放進果籃':fruit.ripe?'成熟':'未熟'}</span>`;
  }
  function newFruit(forceRipe=false){return{ripe:forceRipe||Math.random()<.62,picked:false,age:0,ripenAfter:1800+Math.random()*2500,replaceAfter:500+Math.random()*500};}
  function prepareField(){
    get('harvestSlots').replaceChildren();
    fruits=Array.from({length:12},(_,i)=>{const fruit=newFruit(i<6);if(i>=10)fruit.ripe=false;return fruit;});
    fruits.forEach((_,i)=>{const button=document.createElement('button');button.type='button';button.addEventListener('click',()=>pick(i));get('harvestSlots').append(button);renderFruit(i);});
  }
  function finish(){
    clearInterval(timer);timer=null;phase='finished';
    const previous=best();
    if(score>previous){records[kind]=score;try{localStorage.setItem(storageKey,JSON.stringify(records));}catch{}}
    hud();get('harvestPause').disabled=true;
    const won=picked>=12;
    cover(won?'滿滿一籃，收成成功！':'今天的採果時間到！',`你採到了 ${picked} 顆${orchards[kind].name}，獲得 ${score} 分。${score>previous?'這是你在這座果園的新紀錄！':won?'果農已經把你的收成裝上小貨車。':'再試一次，成熟的果實還在等你。'}`,'再玩一次');
    feedback(won?'採收完成！也可以離開遊戲，去別座果園挑戰。':'這次的收成已結算。');
    get('harvestStart').focus({preventScroll:true});
  }
  let lastTick=0;
  function tick(){
    if(phase!=='playing')return;
    const now=performance.now(),elapsed=Math.min(1000,now-lastTick);lastTick=now;
    remaining=Math.max(0,deadline-now);hud();
    if(remaining<=0){finish();return;}
    fruits.forEach((fruit,i)=>{fruit.age+=elapsed;if(fruit.picked&&fruit.age>=fruit.replaceAfter){fruits[i]=newFruit();renderFruit(i);}else if(!fruit.picked&&!fruit.ripe&&fruit.age>=fruit.ripenAfter){fruit.ripe=true;renderFruit(i);}});
  }
  function pick(index){
    if(phase!=='playing')return;
    if(performance.now()>=deadline){remaining=0;finish();return;}
    const fruit=fruits[index];if(fruit.picked)return;
    if(!fruit.ripe){score=Math.max(0,score-5);combo=0;get('harvestSlots').children[index].classList.add('is-wrong');feedback('這顆還沒熟，留在樹上再長一會兒。−5 分');hud();return;}
    picked++;combo++;score+=10;fruit.picked=true;fruit.age=0;
    let message=`香甜的${orchards[kind].name}放進果籃！+10 分`;
    if(combo%3===0){score+=5;message=`連續採對 ${combo} 顆！這顆 +10 分，連採再加 5 分。`;}
    renderFruit(index);feedback(message);hud();
    if(picked>=12){remaining=Math.max(0,deadline-performance.now());finish();return;}
    // Keep keyboard play inside the fruit field after a picked button disables.
    const next=[...get('harvestSlots').children].find((b,i)=>i!==index&&!b.disabled);
    if(next)next.focus({preventScroll:true});
  }
  function start(){
    clearInterval(timer);phase='playing';score=0;picked=0;combo=0;remaining=30000;
    prepareField();get('harvestCover').hidden=true;get('harvestSlots').inert=false;get('harvestPause').disabled=false;get('harvestPause').textContent='暫停遊戲';
    deadline=performance.now()+remaining;lastTick=performance.now();timer=setInterval(tick,100);hud();feedback('開始囉！找出「成熟」的水果，採滿 12 顆就過關。');
    get('harvestSlots').children[0].focus({preventScroll:true});
  }
  function pause(){
    if(phase!=='playing')return;
    remaining=Math.max(0,deadline-performance.now());clearInterval(timer);timer=null;phase='paused';hud();
    cover('果園休息一下',`已採 ${picked} 顆，還有 ${Math.ceil(remaining/1000)} 秒。準備好了再繼續。`,'繼續採果');get('harvestPause').textContent='繼續遊戲';get('harvestStart').focus({preventScroll:true});
  }
  function resume(){
    if(phase!=='paused')return;
    phase='playing';deadline=performance.now()+remaining;lastTick=performance.now();timer=setInterval(tick,100);get('harvestCover').hidden=true;get('harvestSlots').inert=false;get('harvestPause').textContent='暫停遊戲';feedback('繼續收成，成熟的水果等你來採！');
    [...get('harvestSlots').children].find(b=>!b.disabled)?.focus({preventScroll:true});
  }
  function cleanup(){clearInterval(timer);timer=null;phase='closed';document.body.classList.remove('harvest-open');returnFocus?.focus({preventScroll:true});}
  window.openHarvestGame=key=>{
    if(!orchards[key])return;
    clearInterval(timer);timer=null;kind=key;phase='ready';score=0;picked=0;combo=0;remaining=30000;
    returnFocus=document.activeElement;
    dialog.style.setProperty('--harvest-accent',orchards[kind].accent);dialog.style.setProperty('--fruit-soft',orchards[kind].soft);
    get('harvestTitle').textContent=`${orchards[kind].title}・採果小挑戰`;
    get('harvestCoverArt').innerHTML=treeArtwork(kind);
    get('harvestScenery').innerHTML=treeArtwork(kind)+treeArtwork(kind)+treeArtwork(kind);
    prepareField();hud();get('harvestPause').disabled=true;get('harvestPause').textContent='暫停遊戲';
    cover('今天的收成，交給你！',`和果農一起採${orchards[kind].name}！點選標示「成熟」的果實，30 秒內裝滿 12 顆；標示「未熟」的要再等等。`,'開始採果');
    feedback('果農已經準備好果籃，等你一起收成。');
    document.body.classList.add('harvest-open');if(!dialog.open)dialog.showModal();get('harvestStart').focus({preventScroll:true});
  };
  get('harvestStart').addEventListener('click',()=>phase==='paused'?resume():start());
  get('harvestPause').addEventListener('click',()=>phase==='playing'?pause():resume());
  get('harvestClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('cancel',event=>{event.preventDefault();dialog.close();});dialog.addEventListener('close',cleanup);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});window.addEventListener('pagehide',cleanup);
})();
