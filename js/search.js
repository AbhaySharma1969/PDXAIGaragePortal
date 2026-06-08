
document.addEventListener('DOMContentLoaded',()=>{
 const q=document.getElementById('searchInput'), out=document.getElementById('searchResults'), index=window.PDX_SEARCH_INDEX||[];
 function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
 function run(){const term=q.value.trim().toLowerCase();if(!term){out.innerHTML='<p class="muted">Type a keyword like LEGO, Python, bias, capstone, product, agent, or Teachable Machine.</p>';return}const words=term.split(/\s+/);const results=index.map(item=>{const hay=(item.title+' '+item.type+' '+item.text).toLowerCase();let score=0;words.forEach(w=>{if(item.title.toLowerCase().includes(w))score+=5;if(hay.includes(w))score+=1});return {...item,score}}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score);out.innerHTML=results.length?results.map(r=>`<div class="result-card"><span class="tag">${esc(r.type)}</span><h3><a href="${r.url}">${esc(r.title)}</a></h3><p class="muted">${esc((r.text||'').slice(0,220))}...</p></div>`).join(''):'<p class="muted">No results found. Try a broader keyword.</p>'}
 q.addEventListener('input',run);run();
});
