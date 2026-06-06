const missions=[
 {day:'Day 1',title:'Build the Garage Identity',xp:40,status:'Ready'},
 {day:'Day 2',title:'Prompt Lab: Make AI Useful',xp:50,status:'Ready'},
 {day:'Day 3',title:'LEGO Case File: Facts vs Claims',xp:60,status:'Ready'},
 {day:'Day 4',title:'Spanish AI Coach',xp:45,status:'Ready'},
 {day:'Day 5',title:'Basketball + Golf Training Bot',xp:55,status:'Ready'}
];
function renderMissions(){const el=document.querySelector('#missionList'); if(!el)return; el.innerHTML=missions.map(m=>`<div class="card mission"><span class="tag">${m.day} · ${m.xp} XP</span><h3>${m.title}</h3><p class="muted">Status: ${m.status}. Complete the build, capture one screenshot, and write one sentence about what worked.</p></div>`).join('')}
function setYear(){document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear())}
renderMissions();setYear();
