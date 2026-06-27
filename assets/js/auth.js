
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp,
  collection, addDoc, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const state = { user:null, profile:null, progress:null, notes:[] };
const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);

function isConfigured(){
  return firebaseConfig && firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("PASTE_");
}
function showMessage(el, msg, type="success"){
  if(!el) return;
  el.className = type === "error" ? "error" : "success";
  el.textContent = msg;
  el.classList.remove("hidden");
}
function rankForXP(xp){
  if(xp >= 500) return "Garage Builder";
  if(xp >= 250) return "AI Investigator";
  if(xp >= 100) return "Builder Recruit";
  return "New Builder";
}
async function ensureProfile(user){
  const ref = doc(db, "builders", user.uid);
  const snap = await getDoc(ref);
  if(!snap.exists()){
    await setDoc(ref, {
      uid:user.uid,
      email:user.email,
      displayName:user.displayName || "",
      role:"builder",
      createdAt:serverTimestamp(),
      updatedAt:serverTimestamp(),
      xp:0,
      identity:"",
      missions:{},
      cohort:"Founding Cohort 2026"
    });
  }
  const fresh = await getDoc(ref);
  return fresh.data();
}
async function loadNotes(user){
  const q = query(collection(db, "builders", user.uid, "notes"), orderBy("createdAt","desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map(d=>({id:d.id, ...d.data()}));
}
async function refresh(){
  if(!state.user) return;
  state.profile = await ensureProfile(state.user);
  state.notes = await loadNotes(state.user);
  render();
}
function render(){
  const p = state.profile || {};
  const xp = p.xp || 0;
  const missions = p.missions || {};
  document.body.classList.toggle("authed", !!state.user);
  $$("[data-user-email]").forEach(el=>el.textContent = state.user?.email || "");
  $$("[data-user-name]").forEach(el=>el.textContent = p.displayName || state.user?.displayName || "Builder");
  $$("[data-xp]").forEach(el=>el.textContent = xp);
  $$("[data-rank]").forEach(el=>el.textContent = rankForXP(xp));
  $$("[data-identity]").forEach(el=>el.textContent = p.identity || "Not chosen yet");
  $$("[data-mission-count]").forEach(el=>el.textContent = Object.keys(missions).length);
  $$("[data-progress]").forEach(el=>el.style.width = Math.min(100, Math.round(xp/600*100)) + "%");
  $$("[data-complete-id]").forEach(el=>{
    const id = el.getAttribute("data-complete-id");
    el.classList.toggle("done", !!missions[id]);
  });
  const notesEl = $("[data-notes]");
  if(notesEl){
    notesEl.innerHTML = state.notes.length ? state.notes.map(n=>`
      <div class="card-mini">
        <strong>${escapeHtml(n.title || "Builder Reflection")}</strong>
        <p class="small">${n.createdAt?.toDate ? n.createdAt.toDate().toLocaleString() : ""}</p>
        <p>${escapeHtml(n.text || "")}</p>
      </div>`).join("") : "<p>No notebook entries yet. Your first reflection will appear here.</p>";
  }
}
function escapeHtml(str){return String(str).replace(/[&<>"']/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[s]));}
function requireAuth(){
  if(document.body.dataset.requiresAuth === "true" && !state.user){
    window.location.href = "auth.html?redirect=" + encodeURIComponent(location.pathname.split("/").pop() || "dashboard.html");
  }
}
async function completeMission(id, xpAward){
  if(!state.user){ window.location.href = "auth.html"; return; }
  const ref = doc(db, "builders", state.user.uid);
  const p = state.profile || await ensureProfile(state.user);
  const missions = p.missions || {};
  if(!missions[id]){
    missions[id] = true;
    await updateDoc(ref, {missions, xp:(p.xp||0)+xpAward, updatedAt:serverTimestamp()});
    await refresh();
  }
}
async function saveNote(title, selector){
  if(!state.user){ window.location.href = "auth.html"; return; }
  const input = $(selector);
  const text = input?.value?.trim();
  if(!text) return;
  await addDoc(collection(db, "builders", state.user.uid, "notes"), {
    title, text, createdAt:serverTimestamp()
  });
  input.value = "";
  await refresh();
}
async function setIdentity(identity){
  if(!state.user){ window.location.href = "auth.html"; return; }
  await updateDoc(doc(db, "builders", state.user.uid), {identity, updatedAt:serverTimestamp()});
  await refresh();
}

document.addEventListener("DOMContentLoaded", ()=>{
  if(!isConfigured()){
    const warn = document.createElement("div");
    warn.className = "notice";
    warn.style.margin = "16px auto";
    warn.style.maxWidth = "1100px";
    warn.textContent = "Firebase is not configured yet. Edit assets/js/firebase-config.js before real login works.";
    document.body.prepend(warn);
  }

  const signup = $("#signupForm");
  if(signup){
    signup.addEventListener("submit", async (e)=>{
      e.preventDefault();
      const msg = $("#authMsg");
      try{
        const name = $("#signupName").value.trim();
        const email = $("#signupEmail").value.trim();
        const pass = $("#signupPassword").value;
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(cred.user, {displayName:name});
        await setDoc(doc(db, "builders", cred.user.uid), {
          uid:cred.user.uid,email,displayName:name,role:"builder",
          builderAge:$("#builderAge").value.trim(),
          interests:$("#builderInterests").value.trim(),
          cohort:"Founding Cohort 2026",
          xp:0, identity:"", missions:{},
          createdAt:serverTimestamp(),updatedAt:serverTimestamp()
        });
        showMessage(msg, "Account created. Redirecting to your Builder Dashboard...");
        setTimeout(()=>location.href="dashboard.html", 900);
      }catch(err){ showMessage(msg, err.message, "error"); }
    });
  }

  const login = $("#loginForm");
  if(login){
    login.addEventListener("submit", async (e)=>{
      e.preventDefault();
      const msg = $("#authMsg");
      try{
        await signInWithEmailAndPassword(auth, $("#loginEmail").value.trim(), $("#loginPassword").value);
        const params = new URLSearchParams(location.search);
        location.href = params.get("redirect") || "dashboard.html";
      }catch(err){ showMessage(msg, err.message, "error"); }
    });
  }

  $$("[data-signout]").forEach(btn=>btn.addEventListener("click", async()=>{ await signOut(auth); location.href="index.html"; }));
  $$("[data-complete]").forEach(btn=>btn.addEventListener("click", ()=>completeMission(btn.getAttribute("data-complete"), parseInt(btn.getAttribute("data-xp-award")||"25"))));
  $$("[data-save-note]").forEach(btn=>btn.addEventListener("click", ()=>saveNote(btn.getAttribute("data-note-title")||"Builder Reflection", btn.getAttribute("data-save-note"))));
  $$("[data-identity-choice]").forEach(btn=>btn.addEventListener("click", ()=>setIdentity(btn.getAttribute("data-identity-choice"))));

  onAuthStateChanged(auth, async (user)=>{
    state.user = user;
    if(user) await refresh();
    else { render(); requireAuth(); }
  });
});
