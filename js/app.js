const missions=[
 {day:'Day 1',title:'Build the Garage Identity',xp:40,status:'Ready',url:'missions/day-01.html'},
 {day:'Day 2',title:'Prompt Lab: Make AI Useful',xp:50,status:'Ready',url:'missions/day-02.html'},
 {day:'Day 3',title:'AI Can Be Wrong',xp:50,status:'Ready',url:'missions/day-03.html'},
 {day:'Day 4',title:'Personal AI Assistant Setup',xp:45,status:'Ready',url:'missions/day-04.html'},
 {day:'Day 5',title:'Founder Friday: Demo What Worked',xp:60,status:'Ready',url:'missions/day-05.html'}
];
function renderMissions(){const el=document.querySelector('#missionList'); if(!el)return; el.innerHTML=missions.map(m=>`<div class="card mission"><span class="tag">${m.day} · ${m.xp} XP</span><h3>${m.title}</h3><p class="muted">Status: ${m.status}. Complete the build, capture one screenshot, and write one sentence about what worked.</p><a class="btn ghost" href="${m.url}">Open Mission</a></div>`).join('')}
function setYear(){document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear())}
renderMissions();setYear();