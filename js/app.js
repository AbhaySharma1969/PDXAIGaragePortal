
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear());
  const b=document.querySelector('.mobile-menu'), l=document.querySelector('.links');
  if(b&&l)b.onclick=()=>l.classList.toggle('open');
  const S=window.PDXStore;
  const current=S?S.get('current','1'):(localStorage.getItem('pdx_current')||'1');
  document.querySelectorAll('[data-continue]').forEach(a=>a.href='mission-player.html?mission='+current);
  document.querySelectorAll('[data-current-label]').forEach(e=>e.textContent='Mission '+current);
  let done=[]; try{done=[...(S?S.done():new Set(JSON.parse(localStorage.getItem('pdx_done')||'[]')))]}catch(e){}
  document.querySelectorAll('[data-done-count]').forEach(e=>e.textContent=done.length);
  document.querySelectorAll('[data-progress-percent]').forEach(e=>e.textContent=Math.round(done.length/30*100)+'%');
  document.querySelectorAll('[data-profile-label]').forEach(e=>e.textContent=S?S.activeName():'Guest');
});
