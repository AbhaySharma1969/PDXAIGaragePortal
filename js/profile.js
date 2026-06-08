
document.addEventListener('DOMContentLoaded',()=>{
 const S=window.PDXStore, list=document.getElementById('profileList'), form=document.getElementById('profileForm'), name=document.getElementById('profileName');
 function render(){const profiles=S.profiles();document.getElementById('activeProfile').textContent=S.activeName();list.innerHTML=(profiles.length?profiles:[{id:'default',name:'Guest'}]).map(p=>`<div class="profile-row"><span><strong>${p.name}</strong><br><span class="muted">${p.id==='default'?'No profile yet':p.id}</span></span><button class="btn small" data-id="${p.id}">Use</button></div>`).join('');document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{S.setActive(b.dataset.id);location.reload()})}
 form.onsubmit=e=>{e.preventDefault();const n=name.value.trim();if(!n)return;const id=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-'+Date.now().toString().slice(-4);const profiles=S.profiles();profiles.push({id,name:n,created:new Date().toISOString()});S.saveProfiles(profiles);S.setActive(id);name.value='';render()};render();
});
