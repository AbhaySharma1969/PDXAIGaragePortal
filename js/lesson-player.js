
(function(){
const missions=window.PDX_MISSIONS||[],$=id=>document.getElementById(id);
let current=Number(new URLSearchParams(location.search).get("mission")||localStorage.getItem("pdx_current")||1);if(!current||current<1||current>missions.length)current=1;let stage=0;
function doneSet(){try{return new Set(JSON.parse(localStorage.getItem("pdx_done")||"[]"))}catch(e){return new Set()}}
function mark(n){const d=doneSet();d.add(n);localStorage.setItem("pdx_done",JSON.stringify([...d].sort((a,b)=>a-b)))}
function m(){return missions[current-1]}function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function save(){localStorage.setItem("pdx_current",String(current));localStorage.setItem("pdx_reflect_"+current,$("reflection")?.value||"")}
function stageName(i){return ["Learn","Check","Practice","Build","Reflect"][i]}
function render(){
 const x=m(),done=doneSet();localStorage.setItem("pdx_current",String(current));document.title=`Mission ${x.day}: ${x.title} | PDX AI Garage`;
 $("counter").textContent=`Mission ${x.day} of ${missions.length}`;$("title").textContent=x.title;$("goal").textContent=x.artifact;$("module").textContent=`Week ${x.week}: ${x.module}`;$("time").textContent=x.time;$("skill").textContent=`Skill: ${x.skill}`;$("complete").textContent=done.has(x.day)?"Completed":"In progress";$("complete").className="pill "+(done.has(x.day)?"done":"");$("bar").style.width=Math.round(x.day/missions.length*100)+"%";
 $("concept").textContent=x.concept;$("quizQuestion").textContent=x.quiz.q;$("quizOptions").innerHTML=x.quiz.options.map((o,i)=>`<button class="quiz-option" data-i="${i}">${esc(o)}</button>`).join("");$("prompt").textContent=x.prompt;$("taskList").innerHTML=x.tasks.map((t,i)=>`<label class="task"><input type="checkbox"><span>${esc(t)}</span></label>`).join("");$("artifact").textContent=x.artifact;$("reflectList").innerHTML=x.reflection.map(q=>`<li>${esc(q)}</li>`).join("");$("reflection").value=localStorage.getItem("pdx_reflect_"+x.day)||"";
 $("map").innerHTML=missions.map(item=>`<a class="mission-dot ${item.day===x.day?'active':''} ${done.has(item.day)?'done':''}" href="mission-player.html?mission=${item.day}">${item.day}</a>`).join("");
 $("prev").href=`mission-player.html?mission=${Math.max(1,x.day-1)}`;$("prev").style.visibility=x.day===1?"hidden":"visible";$("next").href=x.day===missions.length?"showcase.html":`mission-player.html?mission=${x.day+1}`;$("next").textContent=x.day===missions.length?"Showcase":`Next Mission ${x.day+1}`;
 stage=0;renderStage();bindQuiz();
}
function renderStage(){document.querySelectorAll(".lesson-card").forEach((el,i)=>el.classList.toggle("active",i===stage));document.querySelectorAll(".step").forEach((el,i)=>el.classList.toggle("active",i===stage));$("stageLabel").textContent=`Step ${stage+1}: ${stageName(stage)}`}
function bindQuiz(){document.querySelectorAll(".quiz-option").forEach(btn=>btn.onclick=()=>{const ok=Number(btn.dataset.i)===m().quiz.answer;document.querySelectorAll(".quiz-option").forEach(b=>b.classList.remove("correct","wrong"));btn.classList.add(ok?"correct":"wrong");$("quizFeedback").textContent=ok?m().quiz.why:"Not quite. Try another choice. The best answer keeps you thinking and building.";if(ok)document.querySelectorAll(".step")[1].classList.add("done")})}
document.addEventListener("DOMContentLoaded",()=>{$("copy").onclick=async()=>{try{await navigator.clipboard.writeText($("prompt").textContent);$("copy").textContent="Copied!";setTimeout(()=>$("copy").textContent="Copy Prompt",1200)}catch(e){$("copy").textContent="Select + copy"}};document.querySelectorAll("[data-step]").forEach(btn=>btn.onclick=()=>{stage=Number(btn.dataset.step);renderStage();scrollTo({top:0,behavior:"smooth"})});document.querySelectorAll("[data-next]").forEach(btn=>btn.onclick=()=>{stage=Math.min(4,stage+1);renderStage();scrollTo({top:0,behavior:"smooth"})});$("finish").onclick=()=>{save();mark(m().day);render();stage=4;renderStage()};$("reflection").oninput=save;render()});
})();
