window.pdxGarageAppVersion='8.1-workspace-fix';
const missions=[
 {day:'Day 1',title:'Build the Garage Identity',xp:40,status:'Ready',url:'missions/day-01.html'},
 {day:'Day 2',title:'Prompt Lab: Make AI Useful',xp:50,status:'Ready',url:'missions/day-02.html'},
 {day:'Day 3',title:'AI Can Be Wrong',xp:50,status:'Ready',url:'missions/day-03.html'},
 {day:'Day 4',title:'Personal AI Assistant Setup',xp:45,status:'Ready',url:'missions/day-04.html'},
 {day:'Day 5',title:'Founder Friday: Demo What Worked',xp:60,status:'Ready',url:'missions/day-05.html'},
 {day:'Day 6',title:'Facts vs Claims vs Opinions',xp:55,status:'Ready',url:'missions/day-06.html'},
 {day:'Day 7',title:'Build a Neutral Timeline',xp:60,status:'Ready',url:'missions/day-07.html'},
 {day:'Day 8',title:'Bias Detector',xp:55,status:'Ready',url:'missions/day-08.html'},
 {day:'Day 9',title:'Write Both Sides Fairly',xp:65,status:'Ready',url:'missions/day-09.html'},
 {day:'Day 10',title:'Founder Ethics Brief',xp:75,status:'Ready',url:'missions/day-10.html'},
 {day:'Day 11',title:'Spanish Coach: Vocabulary Builder',xp:50,status:'Ready',url:'missions/day-11.html'},
 {day:'Day 12',title:'Spanish Conversation Bot',xp:55,status:'Ready',url:'missions/day-12.html'},
 {day:'Day 13',title:'Algebra Helper That Teaches',xp:60,status:'Ready',url:'missions/day-13.html'},
 {day:'Day 14',title:'Study Guide Generator',xp:55,status:'Ready',url:'missions/day-14.html'},
 {day:'Day 15',title:'School Tool Demo Day',xp:70,status:'Ready',url:'missions/day-15.html'},
 {day:'Day 16',title:'Basketball Training Coach',xp:55,status:'Ready',url:'missions/day-16.html'},
 {day:'Day 17',title:'Golf Swing Reflection Tool',xp:50,status:'Ready',url:'missions/day-17.html'},
 {day:'Day 18',title:'Habit Dashboard',xp:55,status:'Ready',url:'missions/day-18.html'},
 {day:'Day 19',title:'Video Reflection Prompt',xp:50,status:'Ready',url:'missions/day-19.html'},
 {day:'Day 20',title:'Sports Tech Demo',xp:70,status:'Ready',url:'missions/day-20.html'},
 {day:'Day 21',title:'LEGO Price Estimator',xp:60,status:'Ready',url:'missions/day-21.html'},
 {day:'Day 22',title:'E-bike Comparison Tool',xp:55,status:'Ready',url:'missions/day-22.html'},
 {day:'Day 23',title:'Mini Web Page Builder',xp:65,status:'Ready',url:'missions/day-23.html'},
 {day:'Day 24',title:'Product Critic Mode',xp:55,status:'Ready',url:'missions/day-24.html'},
 {day:'Day 25',title:'Prototype Demo Day',xp:75,status:'Ready',url:'missions/day-25.html'},
 {day:'Day 26',title:'Choose the Final Showcase Build',xp:55,status:'Ready',url:'missions/day-26.html'},
 {day:'Day 27',title:'Build the Story',xp:60,status:'Ready',url:'missions/day-27.html'},
 {day:'Day 28',title:'Polish the Portal',xp:60,status:'Ready',url:'missions/day-28.html'},
 {day:'Day 29',title:'Rehearse + Improve',xp:65,status:'Ready',url:'missions/day-29.html'},
 {day:'Day 30',title:'Final Founder Showcase',xp:100,status:'Ready',url:'missions/day-30.html'}
];
function renderMissions(){const el=document.querySelector('#missionList'); if(!el)return; el.innerHTML=missions.map(m=>`<div class="card mission"><span class="tag">${m.day} · ${m.xp} XP</span><h3>${m.title}</h3><p class="muted">Status: ${m.status}. Complete the build, capture one screenshot, and write one sentence about what worked.</p><a class="btn ghost" href="${m.url}">Open Mission</a></div>`).join('')}
function setYear(){document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear())}
renderMissions();setYear();
function setupMobileMenu(){
  const button=document.querySelector('.mobile-menu');
  const links=document.querySelector('.links');
  if(!button||!links)return;
  button.addEventListener('click',()=>links.classList.toggle('open'));
}
setupMobileMenu();

function setupCopyButtons(){
  document.querySelectorAll('[data-copy-target]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const target=document.getElementById(btn.dataset.copyTarget);
      if(!target)return;
      const text=target.innerText || target.textContent;
      try{await navigator.clipboard.writeText(text); btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy',1200);}
      catch(e){btn.textContent='Select + copy';}
    });
  });
}
function setupQuizzes(){
  document.querySelectorAll('.quiz-card').forEach(card=>{
    const feedback=card.querySelector('.feedback');
    card.querySelectorAll('.quiz-option').forEach(option=>{
      option.addEventListener('click',()=>{
        card.querySelectorAll('.quiz-option').forEach(o=>o.classList.remove('correct','wrong'));
        const correct=option.dataset.correct==='true';
        option.classList.add(correct?'correct':'wrong');
        if(feedback) feedback.textContent = correct ? 'Correct. AI is useful, but human judgment stays in charge.' : 'Not quite. Try again and look for the answer that keeps human judgment involved.';
      });
    });
  });
}
function setupPromptBuilder(){
  const btn=document.getElementById('buildPromptBtn');
  const input=document.getElementById('promptInput');
  const output=document.getElementById('promptOutput');
  const copy=document.getElementById('copyBuiltPrompt');
  if(!btn||!input||!output)return;
  btn.addEventListener('click',()=>{
    const idea=input.value.trim() || '[describe your goal here]';
    output.textContent=`Act as a practical AI learning coach.\n\nMy goal/context: ${idea}\n\nYour task:\n1. Ask up to 3 clarifying questions if needed.\n2. Give a clear step-by-step answer.\n3. Use simple 9th-grade language.\n4. Include one example.\n5. Warn me about anything I should verify.\n6. End with one action I can take today.\n\nFormat your answer as: Summary, Steps, Example, Check/Verify, Next Action.`;
  });
  if(copy){
    copy.addEventListener('click', async ()=>{
      try{await navigator.clipboard.writeText(output.textContent); copy.textContent='Copied!'; setTimeout(()=>copy.textContent='Copy Built Prompt',1200);}catch(e){}
    });
  }
}
function setupVerificationLab(){
  const btn=document.getElementById('verifyBtn');
  const input=document.getElementById('verifyInput');
  const output=document.getElementById('verifyOutput');
  const copy=document.getElementById('copyVerify');
  if(!btn||!input||!output)return;
  btn.addEventListener('click',()=>{
    const claim=input.value.trim() || '[paste AI answer here]';
    output.textContent=`Verification checklist for:\n${claim}\n\n1. Break the answer into separate claims.\n2. Mark each claim Green, Yellow, or Red.\n3. For Yellow claims, find a reliable source before trusting.\n4. For Red claims, do not use until verified by strong evidence.\n5. Rewrite the final answer with uncertainty clearly labeled.\n\nCopy this into AI:\nBreak this into claims and label each Green, Yellow, or Red. Tell me what evidence is needed for every Yellow or Red claim.`;
  });
  if(copy){copy.addEventListener('click', async ()=>{try{await navigator.clipboard.writeText(output.textContent); copy.textContent='Copied!'; setTimeout(()=>copy.textContent='Copy Checklist',1200);}catch(e){}});}
}
function setupPrototypePlanner(){
  const btn=document.getElementById('prototypeBtn');
  const input=document.getElementById('prototypeInput');
  const output=document.getElementById('prototypeOutput');
  const copy=document.getElementById('copyPrototype');
  if(!btn||!input||!output)return;
  btn.addEventListener('click',()=>{
    const idea=input.value.trim() || '[prototype idea]';
    output.textContent=`Prototype build plan\n\nIdea: ${idea}\n\n1. User: Who is this for?\n2. Problem: What problem does it solve?\n3. Inputs: What information does the tool need?\n4. Output: What should the tool produce?\n5. AI role: Should AI be a coach, analyst, builder, or critic?\n6. Test case: Try one realistic example.\n7. Weakness: What could be wrong or missing?\n8. Version 2: What should improve next?`;
  });
  if(copy){copy.addEventListener('click', async ()=>{try{await navigator.clipboard.writeText(output.textContent); copy.textContent='Copied!'; setTimeout(()=>copy.textContent='Copy Build Plan',1200);}catch(e){}});}
}
setupCopyButtons();
setupQuizzes();
setupPromptBuilder();
setupVerificationLab();
setupPrototypePlanner();

const badgeRules=[
  {id:'prompt_builder',name:'Prompt Builder',desc:'Complete any 3 missions from Days 1–5.',min:3,days:[1,2,3,4,5]},
  {id:'ai_detective',name:'AI Detective',desc:'Complete 3 LEGO investigation missions from Days 6–10.',min:3,days:[6,7,8,9,10]},
  {id:'school_toolmaker',name:'School Tool Maker',desc:'Complete 3 school tool missions from Days 11–15.',min:3,days:[11,12,13,14,15]},
  {id:'sports_tech',name:'Sports Tech Builder',desc:'Complete 3 sports/habit missions from Days 16–20.',min:3,days:[16,17,18,19,20]},
  {id:'prototype_builder',name:'Prototype Builder',desc:'Complete 3 mini-app missions from Days 21–25.',min:3,days:[21,22,23,24,25]},
  {id:'founder_showcase',name:'Founder Showcase',desc:'Complete the final showcase sprint from Days 26–30.',min:5,days:[26,27,28,29,30]}
];
function getProgress(){
  try{return JSON.parse(localStorage.getItem('pdxGarageProgressV1'))||[];}catch(e){return [];}
}
function saveProgress(data){localStorage.setItem('pdxGarageProgressV1',JSON.stringify(data));}
function missionNumber(dayText){const m=String(dayText).match(/\d+/);return m?parseInt(m[0],10):0;}
function completedDays(data){return new Set(data.filter(x=>x.status==='Completed').map(x=>missionNumber(x.day)));}
function earnedBadges(data){
  const done=completedDays(data);
  return badgeRules.filter(rule=>rule.days.filter(d=>done.has(d)).length>=rule.min);
}
function missionByNumber(n){return (typeof missions!=='undefined'?missions:[]).find(m=>missionNumber(m.day)===n);}
function setupWorkspace(){
  const form=document.getElementById('missionLogForm');
  const daySelect=document.getElementById('missionDay');
  const statusEl=document.getElementById('missionStatus');
  const artifactEl=document.getElementById('artifactName');
  const xpEl=document.getElementById('xpEarned');
  const reflectionEl=document.getElementById('reflection');
  if(daySelect && typeof missions!=='undefined'){
    daySelect.innerHTML=missions.map(m=>`<option value="${m.day}">${m.day}: ${m.title}</option>`).join('');
    const setSuggestedXp=()=>{const m=missionByNumber(missionNumber(daySelect.value)); if(m && xpEl) xpEl.value=m.xp;};
    daySelect.addEventListener('change',setSuggestedXp);
    setSuggestedXp();
  }
  const fill=document.getElementById('fillTodayBtn');
  if(fill){fill.addEventListener('click',()=>{const m=missionByNumber(missionNumber(daySelect.value)); if(m){xpEl.value=m.xp; if(!artifactEl.value) artifactEl.value=m.title+' artifact';}});}
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=getProgress();
      const entry={id:Date.now(),date:new Date().toLocaleDateString(),day:daySelect.value,status:statusEl.value,artifact:artifactEl.value.trim(),xp:Number(xpEl.value||0),reflection:reflectionEl.value.trim()};
      data.unshift(entry); saveProgress(data);
      form.reset();
      if(daySelect && missions.length){daySelect.value=missions[0].day;}
      renderWorkspace();
    });
  }
  document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderSavedLogs(btn.dataset.filter);
  }));
  const exportBtn=document.getElementById('exportProgressBtn');
  if(exportBtn){exportBtn.addEventListener('click',()=>{const box=document.getElementById('exportBox'); if(box) box.textContent=JSON.stringify(getProgress(),null,2);});}
  const clearBtn=document.getElementById('clearProgressBtn');
  if(clearBtn){clearBtn.addEventListener('click',()=>{if(confirm('Clear local PDX AI Garage progress on this device?')){localStorage.removeItem('pdxGarageProgressV1');renderWorkspace();}});}
  renderWorkspace();
}
function renderWorkspace(){
  const data=getProgress();
  const xp=data.reduce((sum,e)=>sum+Number(e.xp||0),0);
  const done=data.filter(e=>e.status==='Completed').length;
  const artifacts=data.filter(e=>e.artifact).length;
  const badges=earnedBadges(data);
  const xpEl=document.getElementById('workspaceXp'); if(xpEl) xpEl.textContent=xp;
  const doneEl=document.getElementById('workspaceDone'); if(doneEl) doneEl.textContent=done;
  const artEl=document.getElementById('workspaceArtifacts'); if(artEl) artEl.textContent=artifacts;
  const badgeEl=document.getElementById('workspaceBadges'); if(badgeEl) badgeEl.textContent=badges.length;
  const percent=Math.min(100,Math.round((completedDays(data).size/30)*100));
  const pct=document.getElementById('progressPercent'); if(pct) pct.textContent=percent+'%';
  const ring=document.getElementById('progressRing'); if(ring) ring.style.background=`conic-gradient(var(--brand) ${percent*3.6}deg, rgba(255,255,255,.12) 0deg)`;
  const earned=document.getElementById('earnedBadges');
  if(earned){earned.innerHTML=badges.length?badges.map(b=>`<span class="badge badge-earned">${b.name}</span>`).join(''):'<span class="muted">No badges yet. Complete missions to earn badges.</span>';}
  renderSavedLogs();
  renderArtifactVault();
  renderBadgeBoard();
}
function renderSavedLogs(filter='all'){
  const el=document.getElementById('savedLogs'); if(!el)return;
  let data=getProgress();
  if(filter!=='all') data=data.filter(e=>e.status===filter);
  if(!data.length){el.innerHTML='<div class="workspace-empty">No mission logs yet. Save your first mission log above.</div>';return;}
  el.innerHTML=data.map(e=>`<div class="saved-entry"><div class="meta"><span class="status-chip ${e.status==='Completed'?'complete-chip':''}">${e.status}</span><span class="status-chip">${e.day}</span><span class="status-chip">${e.xp} XP</span><span class="status-chip">${e.date}</span></div><h3>${escapeHtml(e.artifact)}</h3><p class="muted">${escapeHtml(e.reflection)}</p></div>`).join('');
}
function renderArtifactVault(){
  const el=document.getElementById('artifactVault'); if(!el)return;
  const data=getProgress().filter(e=>e.artifact);
  if(!data.length){el.innerHTML='<div class="workspace-empty">No artifacts saved yet. Log a mission in the Workspace to fill the vault.</div>';return;}
  el.innerHTML=data.map(e=>`<div class="vault-card"><span class="tag">${e.day}</span><h3>${escapeHtml(e.artifact)}</h3><p class="muted">${escapeHtml(e.reflection)}</p><div class="meta"><span class="status-chip ${e.status==='Completed'?'complete-chip':''}">${e.status}</span><span class="status-chip">${e.xp} XP</span></div></div>`).join('');
}
function renderBadgeBoard(){
  const el=document.getElementById('badgeBoard'); if(!el)return;
  const data=getProgress();
  const earnedIds=new Set(earnedBadges(data).map(b=>b.id));
  const done=completedDays(data);
  el.innerHTML=badgeRules.map(rule=>{
    const count=rule.days.filter(d=>done.has(d)).length;
    const earned=earnedIds.has(rule.id);
    return `<div class="card ${earned?'badge-earned':'badge-locked'}"><span class="tag">${earned?'Earned':'Locked'}</span><h3>${rule.name}</h3><p class="muted">${rule.desc}</p><div class="progress"><div class="bar" style="width:${Math.min(100,Math.round((count/rule.min)*100))}%"></div></div><p class="muted">${count}/${rule.min} required missions complete</p></div>`;
  }).join('');
}
function escapeHtml(str){return String(str||'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
setupWorkspace();
