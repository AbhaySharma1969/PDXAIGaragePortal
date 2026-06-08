
(function(){
const M=window.PDX_MISSIONS||[],$=id=>document.getElementById(id),S=window.PDXStore;
let cur=Number(new URLSearchParams(location.search).get("mission")||(S?S.get("current","1"):localStorage.getItem("pdx_current"))||1);
if(!cur||cur<1||cur>M.length)cur=1;let stage=0,ok=false,used=false;
function done(){try{return S?S.done():new Set(JSON.parse(localStorage.getItem("pdx_done")||"[]"))}catch(e){return new Set()}}
function mark(n){if(S)S.setDone(n);else{let d=done();d.add(n);localStorage.setItem("pdx_done",JSON.stringify([...d]))}}
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function getR(n){return S?S.get("reflect_"+n,""):localStorage.getItem("pdx_reflect_"+n)||""}
function setR(n,v){S?S.set("reflect_"+n,v):localStorage.setItem("pdx_reflect_"+n,v)}
function set(id,v){if($(id))$(id).textContent=v||""}
function stepName(i){return["Learn","Check","Ask AI","Build","Reflect"][i]}
function render(){
 let x=M[cur-1],d=done(); S?S.set("current",String(cur)):localStorage.setItem("pdx_current",String(cur));
 document.title=`Mission ${x.day}: ${x.title} | PDX AI Garage`;
 set("counter",`Mission ${x.day} of ${M.length}`);set("title",x.title);set("goal",x.artifact);set("module",`Week ${x.week}: ${x.module}`);set("time",x.time);set("skill",`Focus: ${x.skill}`);set("complete",d.has(x.day)?"Done":"In progress");
 if($("complete"))$("complete").className="pill "+(d.has(x.day)?"done":""); if($("bar"))$("bar").style.width=Math.round(x.day/M.length*100)+"%";
 ["objective","concept","warmup","miniLab","evidenceCheck","qualityBar","artifact","artifactTemplate"].forEach(k=>set(k,x[k]));
 if($("vocab"))$("vocab").innerHTML=Object.keys(x.vocab||{}).map(k=>`<div class="panel"><strong>${esc(k)}</strong><span class="muted">${esc(x.vocab[k])}</span></div>`).join("");
 set("quizQuestion",x.quiz.q); if($("quizOptions"))$("quizOptions").innerHTML=x.quiz.options.map((o,i)=>`<button class="quiz-option" data-i="${i}">${esc(o)}</button>`).join("");
 set("prompt",x.prompt); if($("resourceLink")){$("resourceLink").href=x.resourceUrl||"#";$("resourceLink").textContent=x.resourceLabel||"Open resource"}
 if($("taskList"))$("taskList").innerHTML=x.tasks.map(t=>`<label class="task"><input type="checkbox" class="taskBox"><span>${esc(t)}</span></label>`).join("");
 if($("reflectList"))$("reflectList").innerHTML=x.reflection.map(r=>`<span>${esc(r)}</span>`).join(""); if($("reflection"))$("reflection").value=getR(x.day);
 if($("map"))$("map").innerHTML=M.map(m=>`<a class="mission-dot ${m.day===x.day?'active':''} ${d.has(m.day)?'done':''}" href="mission-player.html?mission=${m.day}">${m.day}</a>`).join("");
 if($("prev")){$("prev").href=`mission-player.html?mission=${Math.max(1,x.day-1)}`;$("prev").style.visibility=x.day===1?"hidden":"visible"}
 if($("next")){$("next").href=x.day===M.length?"certificate.html":`mission-player.html?mission=${x.day+1}`;$("next").textContent=x.day===M.length?"Certificate":`Next Mission ${x.day+1}`}
 ["checkNext","practiceNext","buildNext"].forEach(id=>{if($(id))$(id).disabled=true}); if($("completion"))$("completion").classList.remove("show");
 stage=0;show();bind();
}
function show(){document.querySelectorAll(".lesson-card").forEach((e,i)=>e.classList.toggle("active",i===stage));document.querySelectorAll(".step").forEach((e,i)=>e.classList.toggle("active",i===stage));set("stageLabel",`Step ${stage+1}: ${stepName(stage)}`)}
function go(n){stage=Math.max(0,Math.min(4,n));show();scrollTo({top:0,behavior:"smooth"})}
function bind(){ok=false;used=false;document.querySelectorAll(".quiz-option").forEach(b=>b.onclick=()=>{let good=Number(b.dataset.i)===M[cur-1].quiz.answer;document.querySelectorAll(".quiz-option").forEach(x=>x.classList.remove("correct","wrong"));b.classList.add(good?"correct":"wrong");set("quizFeedback",good?M[cur-1].quiz.why:"Not quite. Try again.");if(good){ok=true;if($("checkNext"))$("checkNext").disabled=false}});document.querySelectorAll(".taskBox").forEach(b=>b.onchange=()=>{let all=[...document.querySelectorAll(".taskBox")].every(x=>x.checked);if($("buildNext"))$("buildNext").disabled=!all})}
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll("[data-next]").forEach(b=>b.onclick=()=>go(stage+1));document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>go(Number(b.dataset.step)));if($("checkNext"))$("checkNext").onclick=()=>ok&&go(2);if($("copy"))$("copy").onclick=async()=>{try{await navigator.clipboard.writeText($("prompt").textContent);$("copy").textContent="Copied!";used=true;if($("practiceNext"))$("practiceNext").disabled=false;setTimeout(()=>$("copy").textContent="Copy Prompt",1200)}catch(e){$("copy").textContent="Select + copy"}};if($("usedPrompt"))$("usedPrompt").onclick=()=>{used=true;if($("practiceNext"))$("practiceNext").disabled=false};if($("practiceNext"))$("practiceNext").onclick=()=>used&&go(3);if($("buildNext"))$("buildNext").onclick=()=>go(4);if($("finish"))$("finish").onclick=()=>{if($("reflection"))setR(cur,$("reflection").value||"");mark(cur);if($("completion"))$("completion").classList.add("show");set("complete","Done");if($("complete"))$("complete").className="pill done"};if($("reflection"))$("reflection").oninput=()=>setR(cur,$("reflection").value||"");render()})
})();
