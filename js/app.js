
function setupMobileMenu(){const b=document.querySelector('.mobile-menu'),l=document.querySelector('.links');if(b&&l)b.onclick=()=>l.classList.toggle('open')}
function setYear(){document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear())}
document.addEventListener('DOMContentLoaded',()=>{setupMobileMenu();setYear()});
