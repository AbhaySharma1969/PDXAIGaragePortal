
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear());
  const b=document.querySelector('.mobile-menu'),l=document.querySelector('.links');if(b&&l)b.onclick=()=>l.classList.toggle('open');
  const cont=document.querySelectorAll('[data-continue]');
  const current=localStorage.getItem('pdx_current')||'1';
  cont.forEach(a=>a.href='mission-player.html?mission='+current);
  document.querySelectorAll('[data-current-label]').forEach(e=>e.textContent='Mission '+current);
});
