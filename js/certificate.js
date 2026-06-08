
document.addEventListener('DOMContentLoaded',()=>{
 const S=window.PDXStore, done=S?S.done():new Set(JSON.parse(localStorage.getItem('pdx_done')||'[]'));
 document.getElementById('certName').textContent=S?S.activeName():'Student Founder';
 document.getElementById('certDate').textContent=new Date().toLocaleDateString();
 document.getElementById('certProgress').textContent=done.size+'/30 missions completed';
 document.getElementById('certNote').textContent=done.size>=30?'Full completion certificate earned.':'Milestone certificate preview. Complete all 30 missions for the final certificate.';
 document.getElementById('printCert').onclick=()=>window.print();
});
