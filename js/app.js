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
