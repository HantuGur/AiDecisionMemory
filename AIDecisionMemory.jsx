import { useState, useEffect } from "react";

const CATEGORIES = ["Karier", "Keuangan", "Relasi", "Bisnis", "Kesehatan", "Lainnya"];
const EMOTIONS = [
  { value: 1, label: "Sangat Tertekan" },
  { value: 2, label: "Tertekan" },
  { value: 3, label: "Netral" },
  { value: 4, label: "Tenang" },
  { value: 5, label: "Sangat Tenang" },
];
const SCORES = [
  { value: 1, label: "Jauh lebih buruk dari ekspektasi" },
  { value: 2, label: "Sedikit lebih buruk" },
  { value: 3, label: "Sesuai ekspektasi" },
  { value: 4, label: "Lebih baik dari dugaan" },
  { value: 5, label: "Jauh melampaui ekspektasi" },
];
const CAT_META = {
  Karier:    { dot: "#7b9e8a", bg: "#f0f5f2", text: "#3a5c4a" },
  Keuangan:  { dot: "#9e8a5a", bg: "#f5f2ec", text: "#5c4a2a" },
  Relasi:    { dot: "#9e7a8a", bg: "#f5f0f2", text: "#5c3a4a" },
  Bisnis:    { dot: "#7a8a9e", bg: "#f0f2f5", text: "#3a4a5c" },
  Kesehatan: { dot: "#7a9e9e", bg: "#f0f5f5", text: "#2a5050" },
  Lainnya:   { dot: "#9a9a8a", bg: "#f3f3f0", text: "#4a4a3a" },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.r{background:#f7f5f0;color:#2c2a24;min-height:100vh;font-family:'DM Sans',sans-serif;font-size:15px;line-height:1.65;}
.hd{padding:.9rem 1.5rem;border-bottom:1px solid #e8e4db;display:flex;align-items:center;gap:.75rem;background:#faf9f6;position:sticky;top:0;z-index:10;}
.logo{font-family:'Lora',Georgia,serif;font-size:16px;color:#3a5c4a;letter-spacing:-.1px;}
.logodot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#7b9e8a;margin-right:7px;vertical-align:middle;}
.nav{display:flex;gap:2px;margin-left:auto;}
.nb{background:transparent;border:none;color:#9a9488;cursor:pointer;font-size:13px;padding:5px 12px;border-radius:20px;font-family:'DM Sans',sans-serif;font-weight:400;transition:all .15s;}
.nb:hover{color:#2c2a24;background:#eeeae0;}
.nb.on{color:#3a5c4a;background:#e2ede8;font-weight:500;}
.pg{padding:1.75rem 1.5rem;max-width:640px;margin:0 auto;padding-bottom:5rem;}
.ttl{font-family:'Lora',Georgia,serif;font-size:22px;font-weight:400;color:#1e1c18;margin-bottom:.2rem;letter-spacing:-.3px;}
.sub{font-size:13px;color:#9a9488;margin-bottom:1.75rem;font-weight:300;}
.sg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:1.75rem;}
.sc{background:#faf9f6;border:1px solid #e8e4db;border-radius:12px;padding:.9rem;text-align:center;}
.sn{font-size:24px;font-family:'Lora',Georgia,serif;font-weight:400;color:#3a5c4a;line-height:1;margin-bottom:3px;}
.sl{font-size:11px;color:#b0aa9e;text-transform:uppercase;letter-spacing:.5px;font-weight:400;}
.card{background:#faf9f6;border:1px solid #e8e4db;border-radius:14px;padding:1rem 1.1rem;margin-bottom:.5rem;cursor:pointer;transition:all .2s;}
.card:hover{border-color:#c8c2b5;background:#fdfcfa;}
.ct{font-size:15px;color:#1e1c18;margin-bottom:.5rem;line-height:1.5;font-weight:400;}
.meta{display:flex;gap:6px;align-items:center;flex-wrap:wrap;}
.tag{font-size:11px;padding:3px 9px;border-radius:20px;font-weight:400;letter-spacing:.1px;}
.dt{font-size:12px;color:#b0aa9e;}
.bp{background:#3a5c4a;border:none;color:#f0f5f2;padding:10px 22px;border-radius:22px;font-size:14px;font-weight:500;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
.bp:hover{background:#2e4a3a;}
.bp:disabled{background:#c8c2b5;color:#faf9f6;cursor:not-allowed;}
.bg{background:transparent;border:1px solid #d8d2c8;color:#6a6458;padding:9px 18px;border-radius:22px;font-size:14px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
.bg:hover{border-color:#a8a29a;color:#2c2a24;background:#f3f1ec;}
.fg{margin-bottom:1.25rem;}
.lb{display:block;font-size:12px;color:#9a9488;margin-bottom:7px;letter-spacing:.2px;font-weight:400;}
.inp{width:100%;background:#fdfcfa;border:1px solid #dedad2;border-radius:10px;color:#1e1c18;font-size:15px;padding:10px 13px;font-family:'DM Sans',sans-serif;font-weight:300;transition:border-color .15s;resize:vertical;line-height:1.6;}
.inp:focus{outline:none;border-color:#7b9e8a;}
.inp::placeholder{color:#c8c2b5;font-weight:300;}
.catg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}
.co{background:#faf9f6;border:1px solid #e8e4db;border-radius:9px;color:#9a9488;padding:9px 6px;text-align:center;cursor:pointer;font-size:13px;transition:all .15s;font-family:'DM Sans',sans-serif;font-weight:400;}
.co:hover{border-color:#c8c2b5;color:#2c2a24;}
.co.on{border-color:#7b9e8a;color:#3a5c4a;background:#edf3ef;}
.er{display:flex;gap:5px;flex-wrap:wrap;}
.eb{flex:1;min-width:80px;background:#faf9f6;border:1px solid #e8e4db;border-radius:9px;color:#9a9488;padding:8px 6px;text-align:center;cursor:pointer;font-size:12px;transition:all .15s;font-family:'DM Sans',sans-serif;line-height:1.35;font-weight:400;}
.eb.on{border-color:#7b9e8a;color:#3a5c4a;background:#edf3ef;}
.dv{border:none;border-top:1px solid #e8e4db;margin:1.5rem 0;}
.cb{background:#fdfcfa;border:1px solid #e2ede8;border-radius:12px;padding:.9rem 1.1rem;margin-bottom:.5rem;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all .15s;}
.cb:hover{border-color:#7b9e8a;background:#f5faf7;}
.cdn{width:8px;height:8px;border-radius:50%;background:#7b9e8a;flex-shrink:0;}
.pb{background:#fdfcfa;border:1px solid #e8e4db;border-radius:12px;padding:1.2rem 1.3rem;font-size:14px;line-height:1.85;color:#4a4840;white-space:pre-wrap;font-weight:300;}
.fab{position:fixed;bottom:1.5rem;right:1.5rem;background:#3a5c4a;border:none;color:#f0f5f2;width:52px;height:52px;border-radius:50%;font-size:24px;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;z-index:100;}
.fab:hover{background:#2e4a3a;transform:scale(1.05);}
.em{text-align:center;padding:3.5rem 1.5rem;color:#b0aa9e;}
.inf{background:#f5f3ee;border:1px solid #e8e4db;border-radius:10px;padding:12px 14px;}
.pr{height:2px;background:#e8e4db;border-radius:2px;overflow:hidden;margin-top:10px;}
.prb{height:100%;background:#7b9e8a;border-radius:2px;animation:ld 1.8s ease-in-out infinite;}
@keyframes ld{0%{width:5%}50%{width:80%}100%{width:95%}}
.rs{display:flex;flex-direction:column;gap:5px;}
.ro{background:#faf9f6;border:1px solid #e8e4db;border-radius:10px;color:#9a9488;padding:10px 14px;text-align:left;cursor:pointer;font-size:14px;font-family:'DM Sans',sans-serif;transition:all .15s;display:flex;align-items:center;gap:10px;font-weight:400;}
.ro:hover{border-color:#c8c2b5;color:#2c2a24;}
.ro.on{border-color:#7b9e8a;color:#3a5c4a;background:#edf3ef;}
.rv{font-size:12px;min-width:16px;color:inherit;font-weight:500;}
.ff{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:1.2rem;}
.fb{background:transparent;border:1px solid #e8e4db;color:#b0aa9e;padding:4px 10px;border-radius:20px;font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;font-weight:400;}
.fb:hover{color:#2c2a24;border-color:#c8c2b5;}
.fb.on{color:#3a5c4a;border-color:#7b9e8a;background:#edf3ef;}
.gi{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:1.1rem;}
.gc{background:#faf9f6;border:1px solid #e8e4db;border-radius:10px;padding:10px 12px;}
.gk{font-size:11px;color:#b0aa9e;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;font-weight:400;}
.gv{font-size:14px;color:#4a4840;font-weight:300;}
.oc-good{background:#edf5f0;border:1px solid #b8d9c4;border-radius:12px;padding:1rem 1.1rem;}
.oc-bad{background:#f5eeee;border:1px solid #d9b8b8;border-radius:12px;padding:1rem 1.1rem;}
.pill-pend{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:#7b9e8a;background:#edf3ef;padding:2px 8px;border-radius:20px;}
.pill-good{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:#3a7055;background:#e0f0e8;padding:2px 8px;border-radius:20px;}
.pill-bad{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:#7a3535;background:#f0e0e0;padding:2px 8px;border-radius:20px;}
.pill-wait{font-size:11px;color:#c0b8aa;background:#f0ede6;padding:2px 8px;border-radius:20px;}
.sect{font-size:11px;color:#b0aa9e;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.75rem;font-weight:400;}
.statg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:1.5rem;}
`;

function fmt(iso){return new Date(iso).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"});}
function daysAgo(iso){return Math.floor((Date.now()-new Date(iso))/86400000);}
function needsCheckin(d){return !d.outcome&&daysAgo(d.createdAt)>=30;}
function emotionLabel(v){return EMOTIONS.find(e=>e.value===v)?.label||"—";}

function DecisionCard({d,onClick}){
  const days=daysAgo(d.createdAt);
  const pending=needsCheckin(d);
  const cm=CAT_META[d.category]||CAT_META.Lainnya;
  return(
    <div className="card" onClick={onClick}>
      <div className="ct">{d.decision}</div>
      <div className="meta">
        <span className="tag" style={{background:cm.bg,color:cm.text}}>
          <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:cm.dot,marginRight:4,verticalAlign:"middle"}}/>
          {d.category}
        </span>
        <span className="dt">{fmt(d.createdAt)}</span>
        {d.outcome?(d.outcome.score>=3?<span className="pill-good">✓ positif</span>:<span className="pill-bad">✗ negatif</span>):pending?<span className="pill-pend">● check-in</span>:<span className="pill-wait">{days}h lalu</span>}
      </div>
    </div>
  );
}

function Dashboard({decisions,go,pick}){
  const evaled=decisions.filter(d=>d.outcome);
  const good=evaled.filter(d=>d.outcome.score>=3);
  const acc=evaled.length>0?Math.round((good.length/evaled.length)*100):null;
  const pending=decisions.filter(needsCheckin);
  return(
    <div>
      <div style={{marginBottom:"1.75rem"}}>
        <div className="ttl">Keputusanmu, <em style={{fontStyle:"italic",color:"#7b9e8a"}}>tercatat.</em></div>
        <div className="sub">Tempat yang tenang untuk menyimpan dan belajar dari setiap pilihan penting.</div>
      </div>
      <div className="sg">
        <div className="sc"><div className="sn">{decisions.length}</div><div className="sl">Keputusan</div></div>
        <div className="sc"><div className="sn">{evaled.length}</div><div className="sl">Dievaluasi</div></div>
        <div className="sc"><div className="sn">{acc!==null?`${acc}%`:"—"}</div><div className="sl">Akurasi</div></div>
      </div>
      {pending.length>0&&(<>
        <div className="sect">Menunggu refleksimu ({pending.length})</div>
        {pending.map(d=>(
          <div key={d.id} className="cb" onClick={()=>{pick(d);go("checkin");}}>
            <div className="cdn"/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:"14px",color:"#2c2a24",marginBottom:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.decision}</div>
              <div style={{fontSize:"12px",color:"#b0aa9e"}}>{daysAgo(d.createdAt)} hari yang lalu</div>
            </div>
            <div style={{fontSize:"18px",color:"#c8c2b5",flexShrink:0}}>›</div>
          </div>
        ))}
        <hr className="dv"/>
      </>)}
      {decisions.length>0?(<>
        <div className="sect">Terbaru</div>
        {decisions.slice(0,5).map(d=><DecisionCard key={d.id} d={d} onClick={()=>{pick(d);go("detail");}}/>)}
        {decisions.length>5&&<button className="bg" style={{width:"100%",marginTop:".35rem"}} onClick={()=>go("history")}>Lihat semua {decisions.length} keputusan</button>}
        <div style={{marginTop:"1.5rem"}}>
          <button className="bg" style={{width:"100%",fontSize:"13px",borderStyle:"dashed"}} onClick={()=>go("pattern")}>◈ Lihat pola keputusanmu</button>
        </div>
      </>):(
        <div className="em">
          <div style={{fontSize:"32px",marginBottom:".75rem",opacity:.3}}>◎</div>
          <div style={{fontFamily:"'Lora',serif",fontSize:"17px",color:"#6a6458",marginBottom:"8px"}}>Mulai dengan satu keputusan</div>
          <div style={{fontSize:"14px",marginBottom:"1.75rem",color:"#b0aa9e",fontWeight:300,lineHeight:1.7}}>Tidak perlu keputusan besar. Cukup satu hal<br/>yang ingin kamu ingat dan pelajari.</div>
          <button className="bp" onClick={()=>go("new")}>Catat keputusan pertama</button>
        </div>
      )}
    </div>
  );
}

function NewDecision({onSave,onBack}){
  const[form,setForm]=useState({decision:"",category:"",emotion:null,reasons:"",expectation:""});
  const[saving,setSaving]=useState(false);
  const valid=form.decision.trim()&&form.category&&form.emotion&&form.reasons.trim();
  async function handleSave(){if(!valid)return;setSaving(true);await onSave(form);setSaving(false);onBack();}
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"1.75rem"}}>
        <button className="bg" style={{padding:"7px 14px"}} onClick={onBack}>←</button>
        <div>
          <div className="ttl" style={{marginBottom:0,fontSize:"19px"}}>Keputusan baru</div>
          <div style={{fontSize:"12px",color:"#b0aa9e",fontWeight:300}}>Catat selagi konteksnya masih segar</div>
        </div>
      </div>
      <div className="fg">
        <label className="lb">Apa keputusannya? *</label>
        <textarea className="inp" rows={3} placeholder="Tulis keputusannya dengan jelas — bayangkan menjelaskan ke diri sendiri setahun lagi." value={form.decision} onChange={e=>setForm(p=>({...p,decision:e.target.value}))}/>
      </div>
      <div className="fg">
        <label className="lb">Kategori *</label>
        <div className="catg">
          {CATEGORIES.map(c=>{const cm=CAT_META[c];return(
            <button key={c} className={`co ${form.category===c?"on":""}`}
              style={form.category===c?{borderColor:cm.dot,color:cm.text,background:cm.bg}:{}}
              onClick={()=>setForm(p=>({...p,category:c}))}>{c}</button>
          );})}
        </div>
      </div>
      <div className="fg">
        <label className="lb">Kondisi emosional saat ini *</label>
        <div className="er">
          {EMOTIONS.map(e=><button key={e.value} className={`eb ${form.emotion===e.value?"on":""}`} onClick={()=>setForm(p=>({...p,emotion:e.value}))}>{e.label}</button>)}
        </div>
      </div>
      <div className="fg">
        <label className="lb">Alasan utama *</label>
        <textarea className="inp" rows={3} placeholder="2–3 alasan terkuat. Jujur ke diri sendiri — ini hanya untuk kamu." value={form.reasons} onChange={e=>setForm(p=>({...p,reasons:e.target.value}))}/>
      </div>
      <div className="fg">
        <label className="lb">Ekspektasi hasil <span style={{color:"#c8c2b5"}}>(opsional)</span></label>
        <textarea className="inp" rows={2} placeholder="Apa yang kamu harapkan terjadi dalam 30–90 hari ke depan?" value={form.expectation} onChange={e=>setForm(p=>({...p,expectation:e.target.value}))}/>
      </div>
      <div style={{display:"flex",gap:"10px",marginTop:"1.5rem"}}>
        <button className="bg" onClick={onBack}>Batal</button>
        <button className="bp" style={{flex:1}} disabled={!valid||saving} onClick={handleSave}>{saving?"Menyimpan…":"Simpan ke memory"}</button>
      </div>
    </div>
  );
}

function History({decisions,go,pick}){
  const[filter,setFilter]=useState("semua");
  const filters=["semua","pending","evaluated",...CATEGORIES];
  const filtered=decisions.filter(d=>{
    if(filter==="semua")return true;
    if(filter==="pending")return needsCheckin(d);
    if(filter==="evaluated")return!!d.outcome;
    return d.category===filter;
  });
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"1.5rem"}}>
        <button className="bg" style={{padding:"7px 14px"}} onClick={()=>go("dashboard")}>←</button>
        <div className="ttl" style={{marginBottom:0,fontSize:"19px"}}>Semua keputusan</div>
      </div>
      <div className="ff">
        {filters.map(f=><button key={f} className={`fb ${filter===f?"on":""}`} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
      </div>
      {filtered.length===0?<div className="em" style={{padding:"2rem 0"}}><div style={{color:"#b0aa9e",fontSize:"14px"}}>Tidak ada keputusan dengan filter ini.</div></div>:filtered.map(d=><DecisionCard key={d.id} d={d} onClick={()=>{pick(d);go("detail");}}/>)}
    </div>
  );
}

function Detail({d,go,onCheckin}){
  const pending=needsCheckin(d);
  const cm=CAT_META[d.category]||CAT_META.Lainnya;
  const days=daysAgo(d.createdAt);
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"1.5rem"}}>
        <button className="bg" style={{padding:"7px 14px"}} onClick={()=>go("dashboard")}>←</button>
        <span className="tag" style={{background:cm.bg,color:cm.text}}>
          <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:cm.dot,marginRight:4,verticalAlign:"middle"}}/>
          {d.category}
        </span>
      </div>
      <div style={{fontFamily:"'Lora',Georgia,serif",fontSize:"20px",lineHeight:1.5,color:"#1e1c18",marginBottom:"1.25rem"}}>{d.decision}</div>
      <div className="gi">
        <div className="gc"><div className="gk">Tanggal</div><div className="gv">{fmt(d.createdAt)}</div></div>
        <div className="gc"><div className="gk">Kondisi emosi</div><div className="gv" style={{color:d.emotion<=2?"#9a5555":d.emotion>=4?"#3a7055":"#6a6458"}}>{emotionLabel(d.emotion)}</div></div>
      </div>
      <div style={{marginBottom:"1rem"}}>
        <div className="gk" style={{marginBottom:"7px"}}>Alasan utama</div>
        <div className="inf" style={{fontSize:"14px",color:"#5a5448",lineHeight:1.75,fontWeight:300}}>{d.reasons}</div>
      </div>
      {d.expectation&&<div style={{marginBottom:"1rem"}}>
        <div className="gk" style={{marginBottom:"7px"}}>Ekspektasi</div>
        <div className="inf" style={{fontSize:"14px",color:"#5a5448",lineHeight:1.75,fontStyle:"italic",fontWeight:300}}>"{d.expectation}"</div>
      </div>}
      <hr className="dv"/>
      {d.outcome?(
        <div className={d.outcome.score>=3?"oc-good":"oc-bad"}>
          <div style={{fontSize:"11px",color:d.outcome.score>=3?"#3a7055":"#7a3535",textTransform:"uppercase",letterSpacing:".4px",marginBottom:"7px",fontWeight:500}}>{d.outcome.score>=3?"✓ Outcome positif":"✗ Outcome tidak sesuai"}</div>
          <div style={{fontSize:"14px",color:"#4a4840",lineHeight:1.75,fontWeight:300}}>{d.outcome.reflection}</div>
          <div style={{fontSize:"12px",color:"#b0aa9e",marginTop:"8px"}}>Dievaluasi {fmt(d.outcome.evaluatedAt)}</div>
        </div>
      ):pending?(
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"14px",color:"#9a9488",marginBottom:"1rem",fontWeight:300,lineHeight:1.6}}>Sudah {daysAgo(d.createdAt)} hari sejak keputusan ini.<br/>Saatnya merefleksikan hasilnya.</div>
          <button className="bp" onClick={onCheckin}>Mulai refleksi</button>
        </div>
      ):(
        <div style={{textAlign:"center",padding:".9rem",color:"#b0aa9e",fontSize:"13px",border:"1px dashed #e8e4db",borderRadius:"10px",fontWeight:300}}>Check-in tersedia setelah 30 hari · {Math.max(0,30-days)} hari lagi</div>
      )}
    </div>
  );
}

function Checkin({d,onSave,onBack}){
  const[form,setForm]=useState({score:null,reflection:""});
  const[saving,setSaving]=useState(false);
  async function handleSave(){if(!form.score||!form.reflection.trim())return;setSaving(true);await onSave(d.id,{outcome:{...form,evaluatedAt:new Date().toISOString()}});setSaving(false);onBack();}
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"1.5rem"}}>
        <button className="bg" style={{padding:"7px 14px"}} onClick={onBack}>←</button>
        <div>
          <div className="ttl" style={{marginBottom:0,fontSize:"19px"}}>Refleksi keputusan</div>
          <div style={{fontSize:"12px",color:"#b0aa9e",fontWeight:300}}>{daysAgo(d.createdAt)} hari yang lalu</div>
        </div>
      </div>
      <div className="inf" style={{fontFamily:"'Lora',serif",fontSize:"15px",color:"#6a6458",marginBottom:"1.5rem",lineHeight:1.65,fontStyle:"italic"}}>"{d.decision}"</div>
      <div className="fg">
        <label className="lb">Bagaimana hasilnya dibanding ekspektasimu?</label>
        <div className="rs">
          {SCORES.map(s=><button key={s.value} className={`ro ${form.score===s.value?"on":""}`} onClick={()=>setForm(p=>({...p,score:s.value}))}><span className="rv">{s.value}</span>{s.label}</button>)}
        </div>
      </div>
      <div className="fg" style={{marginTop:"1.2rem"}}>
        <label className="lb">Apa yang sebenarnya terjadi?</label>
        <textarea className="inp" rows={4} placeholder="Ceritakan hasilnya. Apakah alasanmu dulu tepat? Apa yang tidak kamu antisipasi?" value={form.reflection} onChange={e=>setForm(p=>({...p,reflection:e.target.value}))}/>
      </div>
      <button className="bp" style={{width:"100%"}} disabled={!form.score||!form.reflection.trim()||saving} onClick={handleSave}>{saving?"Menyimpan…":"Simpan refleksi"}</button>
    </div>
  );
}

function PatternReport({decisions,onBack}){
  const[report,setReport]=useState(null);
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState(null);

  async function generate(){
    setLoading(true);setErr(null);setReport(null);
    const summary=decisions.map((d,i)=>`Keputusan ${i+1}: ${d.decision}\nKategori: ${d.category} | Emosi: ${emotionLabel(d.emotion)} | ${fmt(d.createdAt)}\nAlasan: ${d.reasons}\nEkspektasi: ${d.expectation||"tidak dicatat"}\n${d.outcome?`Outcome (skor ${d.outcome.score}/5): ${d.outcome.reflection}`:"Belum dievaluasi"}`).join("\n\n---\n\n");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Kamu adalah teman refleksi yang bijak, hangat, dan jujur. Analisis histori keputusan berikut dan buat laporan pola personal.\n\n${summary}\n\nBuat laporan dalam Bahasa Indonesia dengan nada yang tenang, suportif, tapi tetap jujur dan berbasis data nyata.\n\nFormat:\n\n**POLA YANG MUNCUL:**\n[2-3 pola konkret dan spesifik dari data ini]\n\n**KONDISI YANG PERLU DIWASPADAI:**\n[Kondisi di mana keputusanmu cenderung meleset]\n\n**APA YANG BERJALAN BAIK:**\n[Area di mana keputusanmu konsisten tepat]\n\n**PERTANYAAN UNTUK DIRENUNGKAN:**\n[2 pertanyaan refleksi dari pola nyata di atas]\n\nJangan generik. Berpijak hanya pada data yang ada.`}]})});
      const data=await res.json();
      setReport(data.content?.find(b=>b.type==="text")?.text||"Analisis tidak tersedia.");
    }catch{setErr("Gagal menghubungi AI. Coba lagi.");}
    setLoading(false);
  }

  useEffect(()=>{if(decisions.length>=3)generate();},[]);
  const evaled=decisions.filter(d=>d.outcome);
  const good=evaled.filter(d=>d.outcome.score>=3);
  const acc=evaled.length>0?Math.round((good.length/evaled.length)*100):null;
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"1.5rem"}}>
        <button className="bg" style={{padding:"7px 14px"}} onClick={onBack}>←</button>
        <div>
          <div className="ttl" style={{marginBottom:0,fontSize:"19px"}}>Pola keputusanmu</div>
          <div style={{fontSize:"12px",color:"#b0aa9e",fontWeight:300}}>Analisis personal berbasis histori nyata</div>
        </div>
      </div>
      <div className="statg">
        <div className="sc"><div className="sn">{decisions.length}</div><div className="sl">Total</div></div>
        <div className="sc"><div className="sn">{acc!==null?`${acc}%`:"—"}</div><div className="sl">Akurasi</div></div>
        <div className="sc"><div className="sn">{decisions.filter(d=>d.emotion<=2).length}</div><div className="sl">Saat tertekan</div></div>
        <div className="sc"><div className="sn">{evaled.length}</div><div className="sl">Dievaluasi</div></div>
      </div>
      {decisions.length<3?(
        <div className="em" style={{padding:"2rem 0"}}>
          <div style={{fontSize:"28px",marginBottom:".75rem",opacity:.3}}>◌</div>
          <div style={{fontFamily:"'Lora',serif",fontSize:"16px",color:"#6a6458",marginBottom:"8px"}}>Butuh sedikit lebih banyak data</div>
          <div style={{fontSize:"13px",fontWeight:300,color:"#b0aa9e"}}>Tambahkan minimal 3 keputusan untuk analisis pola.</div>
        </div>
      ):loading?(
        <div style={{textAlign:"center",padding:"2.5rem 1.5rem"}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:"16px",color:"#6a6458",marginBottom:"12px",fontStyle:"italic"}}>Membaca pola keputusanmu…</div>
          <div style={{fontSize:"13px",color:"#b0aa9e",marginBottom:"12px",fontWeight:300}}>Ini butuh sebentar</div>
          <div className="pr"><div className="prb"/></div>
        </div>
      ):err?(
        <div><div style={{color:"#9a5555",fontSize:"14px",marginBottom:"1rem"}}>{err}</div><button className="bg" onClick={generate}>Coba lagi</button></div>
      ):report?(
        <div>
          <div className="pb">
            {report.split("**").map((part,i)=>i%2===1?<strong key={i} style={{color:"#3a5c4a",fontWeight:500}}>{part}</strong>:<span key={i}>{part}</span>)}
          </div>
          <button className="bg" style={{width:"100%",marginTop:"1rem",fontSize:"13px"}} onClick={generate}>↻ Generate ulang</button>
        </div>
      ):null}
    </div>
  );
}

export default function App(){
  const[view,setView]=useState("dashboard");
  const[decisions,setDecisions]=useState([]);
  const[sel,setSel]=useState(null);
  const[ready,setReady]=useState(false);

  useEffect(()=>{
    (async()=>{
      try{
        const list=await window.storage.list("dec:");
        const arr=[];
        for(const key of list.keys){try{const item=await window.storage.get(key);if(item)arr.push(JSON.parse(item.value));}catch{}}
        arr.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        setDecisions(arr);
      }catch{setDecisions([]);}
      setReady(true);
    })();
  },[]);

  async function saveDecision(form){
    const id=`dec:${Date.now()}`;
    const d={...form,id,createdAt:new Date().toISOString()};
    await window.storage.set(id,JSON.stringify(d));
    setDecisions(p=>[d,...p]);
  }

  async function updateDecision(id,updates){
    const d=decisions.find(x=>x.id===id);if(!d)return;
    const updated={...d,...updates};
    await window.storage.set(id,JSON.stringify(updated));
    setDecisions(p=>p.map(x=>x.id===id?updated:x));
  }

  if(!ready)return(<><style>{CSS}</style><div className="r" style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}><div style={{color:"#b0aa9e",fontFamily:"'Lora',serif",fontSize:"14px",fontStyle:"italic"}}>Memuat memory…</div></div></>);

  return(
    <>
      <style>{CSS}</style>
      <div className="r">
        <header className="hd">
          <div className="logo"><span className="logodot"/>Decision Memory</div>
          <nav className="nav">
            {[{id:"dashboard",label:"Beranda"},{id:"history",label:"Histori"},{id:"pattern",label:"Pola"}].map(n=>(
              <button key={n.id} className={`nb ${view===n.id?"on":""}`} onClick={()=>setView(n.id)}>{n.label}</button>
            ))}
          </nav>
        </header>
        <main className="pg">
          {view==="dashboard"&&<Dashboard decisions={decisions} go={setView} pick={setSel}/>}
          {view==="new"&&<NewDecision onSave={saveDecision} onBack={()=>setView("dashboard")}/>}
          {view==="history"&&<History decisions={decisions} go={setView} pick={setSel}/>}
          {view==="detail"&&sel&&<Detail d={sel} go={setView} onCheckin={()=>setView("checkin")}/>}
          {view==="checkin"&&sel&&<Checkin d={sel} onSave={updateDecision} onBack={()=>setView("dashboard")}/>}
          {view==="pattern"&&<PatternReport decisions={decisions} onBack={()=>setView("dashboard")}/>}
        </main>
        {(view==="dashboard"||view==="history")&&<button className="fab" onClick={()=>setView("new")}>+</button>}
      </div>
    </>
  );
}
