
document.addEventListener('DOMContentLoaded',()=>{
 const S=window.PDXStore, done=S?S.done():new Set(JSON.parse(localStorage.getItem('pdx_done')||'[]'));
 const profile=S?S.active():'Guest';
 document.getElementById('certName').textContent=profile==='default'?'Student Founder':profile;
 document.getElementById('certDate').textContent=new Date().toLocaleDateString();
 document.getElementById('certProgress').textContent=done.size+'/30 missions completed';
 const note=document.getElementById('certNote');
 note.textContent=done.size>=30?'Eligible for full completion certificate.':'Milestone certificate preview. Complete all 30 missions for final completion.';
 document.getElementById('printCert').onclick=()=>window.print();
});
