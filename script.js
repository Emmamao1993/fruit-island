const data = {
  apple: {eyebrow:'01 · 北風坡', title:'蘋果園的清脆日常', text:'清晨的霧從北側山坳升起，海風替果實降溫。這裡的蘋果在日夜溫差裡慢慢長大，入口先是清爽，接著才浮出細緻的甜。', season:'09—11', light:'偏冷涼', taste:'清脆', emoji:'🍎', label:'北風坡 / 01'},
  orange: {eyebrow:'02 · 暖陽灣', title:'橘子園的午後香氣', text:'橘子樹沿著暖陽灣的坡地排列，午後的光線穿過葉片，將酸度與甜度調成剛好的比例。靠近時，空氣裡總有一點明亮的柑橘香。', season:'12—02', light:'溫暖向陽', taste:'酸甜', emoji:'🍊', label:'暖陽灣 / 02'},
  grape: {eyebrow:'03 · 石階谷', title:'葡萄園的慢慢攀爬', text:'石階谷的藤蔓順著地形向上，白天吸收岩石的熱，夜裡把風留在果粉表面。每一串葡萄，都帶著坡地特有的深色香氣。', season:'07—09', light:'乾燥通風', taste:'馥郁', emoji:'🍇', label:'石階谷 / 03'},
  banana: {eyebrow:'04 · 南風田', title:'香蕉園的金色長葉', text:'南風田的香蕉樹喜歡陽光，也喜歡海風。寬大的葉片把熱氣攔在果串之外，讓香蕉在溫暖的日子裡慢慢累積柔軟的甜。', season:'06—10', light:'溫暖濕潤', taste:'柔甜', emoji:'🍌', label:'南風田 / 04'}
};
const $ = (id) => document.getElementById(id);
function showOrchard(key){
  const item=data[key];
  document.querySelectorAll('[data-card]').forEach(card=>card.classList.toggle('selected',card.dataset.card===key));
  $('detailEyebrow').textContent=item.eyebrow; $('detailTitle').textContent=item.title; $('detailText').textContent=item.text;
  $('detailSeason').textContent=item.season; $('detailLight').textContent=item.light; $('detailTaste').textContent=item.taste;
  $('detailVisual').innerHTML=treeArtwork(key,treeLabels[key])+`<small>${item.label}</small>`;
  document.querySelector('.detail').scrollIntoView({behavior:'smooth',block:'center'});
}
document.querySelectorAll('[data-orchard]').forEach(el=>el.addEventListener('click',()=>showOrchard(el.dataset.orchard)));
$('textSize').addEventListener('change',(e)=>{document.body.classList.remove('large','xlarge');if(e.target.value!=='normal')document.body.classList.add(e.target.value);});
$('tourBtn').addEventListener('click',()=>{showOrchard('apple');toast('導覽開始：先從北風坡的蘋果園出發。');});
$('overviewBtn').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
$('seasonBtn').addEventListener('click',()=>toast('當季提示：現在是秋季，北風坡的蘋果正準備採收。'));
$('motionBtn').addEventListener('click',(e)=>{e.currentTarget.classList.toggle('active');toast(e.currentTarget.classList.contains('active')?'風景已暫停':'風景重新流動');});
$('helpBtn').addEventListener('click',()=>toast('點選地圖上的果樹或下方卡片，就能閱讀四座果園的故事。'));
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
