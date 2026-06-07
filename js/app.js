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
