
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear());
  const b=document.querySelector('.mobile-menu'),l=document.querySelector('.links'); if(b&&l)b.onclick=()=>l.classList.toggle('open');
  const store=window.PDXStore;
  const current=store?store.get('current','1'):(localStorage.getItem('pdx_current')||'1');
  document.querySelectorAll('[data-continue]').forEach(a=>a.href='mission-player.html?mission='+current);
  document.querySelectorAll('[data-current-label]').forEach(e=>e.textContent='Mission '+current);
  let done=[]; try{done=[...(store?store.done():new Set(JSON.parse(localStorage.getItem('pdx_done')||'[]')))]}catch(e){}
  document.querySelectorAll('[data-done-count]').forEach(e=>e.textContent=done.length);
  document.querySelectorAll('[data-progress-percent]').forEach(e=>e.textContent=Math.round(done.length/30*100)+'%');
  const active=store?store.active():'default';
  document.querySelectorAll('[data-profile-label]').forEach(e=>e.textContent=active==='default'?'Guest':active);
});
