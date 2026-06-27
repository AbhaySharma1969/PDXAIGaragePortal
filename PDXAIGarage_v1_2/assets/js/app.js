
const PDX = {
  key:'pdx_ai_garage_v12',
  get(){
    try { return JSON.parse(localStorage.getItem(this.key)) || {xp:0, missions:{}, notes:[], identity:null}; }
    catch(e){ return {xp:0, missions:{}, notes:[], identity:null}; }
  },
  set(data){ localStorage.setItem(this.key, JSON.stringify(data)); this.render(); },
  complete(id, xp=25){
    const data=this.get();
    if(!data.missions[id]){ data.missions[id]=true; data.xp=(data.xp||0)+xp; }
    this.set(data);
  },
  note(title, text){
    const data=this.get();
    if(text && text.trim()){
      data.notes.unshift({title, text:text.trim(), date:new Date().toLocaleString()});
      this.set(data);
    }
  },
  identity(value){
    const data=this.get(); data.identity=value; this.set(data);
  },
  render(){
    const data=this.get();
    document.querySelectorAll('[data-xp]').forEach(el=>el.textContent=data.xp||0);
    const count=Object.keys(data.missions||{}).length;
    document.querySelectorAll('[data-mission-count]').forEach(el=>el.textContent=count);
    document.querySelectorAll('[data-rank]').forEach(el=>{
      el.textContent = data.xp >= 300 ? 'Garage Builder' : data.xp >= 150 ? 'AI Investigator' : data.xp >= 50 ? 'Builder Recruit' : 'New Builder';
    });
    document.querySelectorAll('[data-progress]').forEach(el=>el.style.width=Math.min(100, Math.round((data.xp||0)/400*100))+'%');
    document.querySelectorAll('[data-complete-id]').forEach(el=>{
      const id=el.getAttribute('data-complete-id');
      if(data.missions && data.missions[id]) el.classList.add('done');
    });
    const notes = document.querySelector('[data-notes]');
    if(notes){
      notes.innerHTML = (data.notes||[]).map(n=>`<div class="card-mini"><strong>${escapeHtml(n.title)}</strong><p class="small">${escapeHtml(n.date)}</p><p>${escapeHtml(n.text)}</p></div>`).join('') || '<p>No notebook entries yet. Your first reflection will appear here.</p>';
    }
    const identity = document.querySelector('[data-identity]');
    if(identity) identity.textContent = data.identity || 'Not chosen yet';
  }
};
function escapeHtml(str){return String(str).replace(/[&<>"']/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[s]));}
document.addEventListener('DOMContentLoaded', ()=>{
  PDX.render();
  document.querySelectorAll('[data-complete]').forEach(btn=>{
    btn.addEventListener('click',()=> PDX.complete(btn.getAttribute('data-complete'), parseInt(btn.getAttribute('data-xp-award')||'25')));
  });
  document.querySelectorAll('[data-identity-choice]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('[data-identity-choice]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      PDX.identity(btn.getAttribute('data-identity-choice'));
    });
  });
  document.querySelectorAll('[data-save-note]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const target = document.querySelector(btn.getAttribute('data-save-note'));
      PDX.note(btn.getAttribute('data-note-title')||'Builder Reflection', target?.value || '');
      if(target) target.value='';
    });
  });
});
