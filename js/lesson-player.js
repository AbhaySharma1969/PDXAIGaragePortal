
(function(){
const missions = window.PDX_MISSIONS || [];
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
let current = Number(params.get("mission") || localStorage.getItem("pdx_current") || 1);
if(!current || current < 1 || current > missions.length) current = 1;
let stage = 0;
const stages = ["learn","check","practice","build","reflect"];
function doneSet(){try{return new Set(JSON.parse(localStorage.getItem("pdx_done")||"[]"))}catch(e){return new Set()}}
function setDone(n){const d=doneSet();d.add(n);localStorage.setItem("pdx_done",JSON.stringify([...d].sort((a,b)=>a-b)))}
function m(){return missions[current-1]}
function save(){localStorage.setItem("pdx_current", String(current))}
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(){
  const x=m(), done=doneSet(); save();
  document.title = `Mission ${x.day}: ${x.title} | PDX AI Garage`;
  $("counter").textContent = `Mission ${x.day} of ${missions.length}`;
  $("title").textContent = x.title;
  $("goal").textContent = `Today’s build: ${x.artifact}`;
  $("meta").innerHTML = `<span class="status-pill">Week ${x.week}: ${x.module}</span><span class="status-pill">${x.time}</span><span class="status-pill">Skill: ${x.skill}</span><span class="status-pill ${done.has(x.day)?'done':''}">${done.has(x.day)?'Completed':'In progress'}</span>`;
  $("bar").style.width = Math.round(x.day/missions.length*100)+"%";
  $("concept").textContent = x.concept;
  $("quizQuestion").textContent = x.quiz.q;
  $("quizOptions").innerHTML = x.quiz.options.map((o,i)=>`<button class="quiz-option" data-i="${i}">${esc(o)}</button>`).join("");
  $("prompt").textContent = x.prompt;
  $("taskList").innerHTML = x.tasks.map((t,i)=>`<label class="task-check"><input type="checkbox" data-task="${i}"><span>${esc(t)}</span></label>`).join("");
  $("artifact").textContent = x.artifact;
  $("reflectQuestions").innerHTML = x.reflection.map(q=>`<li>${esc(q)}</li>`).join("");
  $("reflection").value = localStorage.getItem("pdx_reflect_"+x.day)||"";
  $("map").innerHTML = missions.map(item=>`<a class="mission-dot ${item.day===x.day?'active':''} ${done.has(item.day)?'done':''}" href="mission-player.html?mission=${item.day}">${item.day}</a>`).join("");
  $("prev").style.visibility = x.day===1 ? "hidden":"visible";
  $("prev").href = `mission-player.html?mission=${Math.max(1,x.day-1)}`;
  $("next").href = x.day===missions.length ? "showcase.html" : `mission-player.html?mission=${x.day+1}`;
  $("next").textContent = x.day===missions.length ? "Showcase" : `Next Mission ${x.day+1}`;
  stage = 0; renderStage();
  bindQuiz();
}
function renderStage(){
  document.querySelectorAll(".lesson-stage").forEach((el,i)=>el.classList.toggle("active", i===stage));
  document.querySelectorAll(".stage-tab").forEach((el,i)=>el.classList.toggle("active", i===stage));
}
function bindQuiz(){
 document.querySelectorAll(".quiz-option").forEach(btn=>{
  btn.onclick=()=>{
    const isRight = Number(btn.dataset.i)===m().quiz.answer;
    document.querySelectorAll(".quiz-option").forEach(b=>b.classList.remove("correct","wrong"));
    btn.classList.add(isRight?"correct":"wrong");
    $("quizFeedback").textContent = isRight ? m().quiz.why : "Not quite. Try again. Look for the answer where you still do the thinking.";
    if(isRight){ document.querySelectorAll(".stage-tab")[1].classList.add("done");}
  };
 });
}
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".stage-tab").forEach((btn,i)=>btn.onclick=()=>{stage=i;renderStage()});
  document.querySelectorAll("[data-next-stage]").forEach(btn=>btn.onclick=()=>{stage=Math.min(4,stage+1);renderStage();scrollTo({top:0,behavior:"smooth"})});
  $("copy").onclick = async()=>{try{await navigator.clipboard.writeText($("prompt").textContent);$("copy").textContent="Copied!";setTimeout(()=>$("copy").textContent="Copy Prompt",1200)}catch(e){$("copy").textContent="Select + copy"}};
  $("reflection").oninput=()=>localStorage.setItem("pdx_reflect_"+m().day,$("reflection").value);
  $("finish").onclick=()=>{localStorage.setItem("pdx_reflect_"+m().day,$("reflection").value);setDone(m().day);render();stage=4;renderStage()};
  $("reset").onclick=()=>{if(confirm("Clear local progress on this device?")){Object.keys(localStorage).filter(k=>k.startsWith("pdx_")).forEach(k=>localStorage.removeItem(k));current=1;history.replaceState(null,"","mission-player.html?mission=1");render()}};
  render();
});
})();
