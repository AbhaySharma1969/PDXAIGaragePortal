
document.addEventListener('DOMContentLoaded',()=>{
 const q=document.getElementById('searchInput'), out=document.getElementById('searchResults'), filters=document.querySelectorAll('[data-filter]'), index=window.PDX_SEARCH_INDEX||[];
 let active='All';
 function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
 function matched(item,words){const hay=(item.title+' '+item.text+' '+(item.tags||[]).join(' ')).toLowerCase();return words.filter(w=>hay.includes(w)).slice(0,6)}
 function run(){const term=q.value.trim().toLowerCase();const words=term?term.split(/\s+/):[];let rows=index.filter(i=>active==='All'||i.category===active||i.type===active);
  if(words.length){rows=rows.map(item=>{let ms=matched(item,words), title=item.title.toLowerCase();let score=ms.length + words.filter(w=>title.includes(w)).length*3;return {...item,score,ms}}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score)}
  else rows=[];
  out.innerHTML=rows.length?rows.map(r=>`<div class="result-card"><span class="tag">${esc(r.type)} · ${esc(r.category||'')}</span><h3><a href="${r.url}">${esc(r.title)}</a></h3><p class="muted">${esc((r.text||'').slice(0,220))}...</p><div class="match-line">${(r.ms||[]).map(x=>`<span>matched: ${esc(x)}</span>`).join('')}</div></div>`).join(''):'<p class="muted">Type a keyword like LEGO, Python, bias, capstone, prompt, model, or certificate.</p>';
 }
 filters.forEach(b=>b.onclick=()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.filter;run()});
 q.addEventListener('input',run);run();
});
