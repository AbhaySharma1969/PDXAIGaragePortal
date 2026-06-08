
window.PDXStore = {
  profiles(){try{return JSON.parse(localStorage.getItem('pdx_profiles')||'[]')}catch(e){return[]}},
  saveProfiles(p){localStorage.setItem('pdx_profiles',JSON.stringify(p))},
  active(){return localStorage.getItem('pdx_active_profile')||'default'},
  activeName(){const id=this.active(); if(id==='default')return 'Guest'; const p=this.profiles().find(x=>x.id===id); return p?p.name:id},
  setActive(id){localStorage.setItem('pdx_active_profile',id)},
  prefix(){return 'pdx_'+this.active()+'_'},
  get(k,d){return localStorage.getItem(this.prefix()+k) ?? d},
  set(k,v){localStorage.setItem(this.prefix()+k,v)},
  done(){try{return new Set(JSON.parse(this.get('done','[]')))}catch(e){return new Set()}},
  setDone(n){const d=this.done();d.add(n);this.set('done',JSON.stringify([...d].sort((a,b)=>a-b)))}
};
