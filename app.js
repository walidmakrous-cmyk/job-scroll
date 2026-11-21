const demoJobs = [
 {id:1,title:"Assistant administratif",company:"Annonce de démonstration",city:"Toulouse (31)",contract:"CDI",sector:"Administration",desc:"Aide à la gestion quotidienne, suivi des dossiers et accueil des clients.",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",keywords:"bureau secrétariat gestion",url:"https://candidat.francetravail.fr/offres/recherche"},
 {id:2,title:"Développeur web junior",company:"Annonce de démonstration",city:"Lyon (69)",contract:"Alternance",sector:"Informatique",desc:"Participe à la création de sites et d'applications web au sein d'une équipe.",image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",keywords:"informatique code web",url:"https://candidat.francetravail.fr/offres/recherche"},
 {id:3,title:"Préparateur de commandes",company:"Annonce de démonstration",city:"Lille (59)",contract:"Intérim",sector:"Logistique",desc:"Préparation, contrôle et emballage de commandes dans un entrepôt.",image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900",keywords:"logistique stock manutention",url:"https://candidat.francetravail.fr/offres/recherche"},
 {id:4,title:"Vendeur conseil",company:"Annonce de démonstration",city:"Bordeaux (33)",contract:"CDD",sector:"Commerce",desc:"Accueille les clients, conseille et participe à la bonne tenue du magasin.",image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900",keywords:"vente commerce magasin",url:"https://candidat.francetravail.fr/offres/recherche"},
 {id:5,title:"Aide à domicile",company:"Annonce de démonstration",city:"Nantes (44)",contract:"CDI",sector:"Services",desc:"Accompagne les personnes dans les gestes du quotidien et les activités.",image:"https://images.unsplash.com/photo-1576765608866-5b51046452b5?w=900",keywords:"service aide social",url:"https://candidat.francetravail.fr/offres/recherche"},
 {id:6,title:"Commis de cuisine",company:"Annonce de démonstration",city:"Montpellier (34)",contract:"CDD",sector:"Restauration",desc:"Participe à la préparation des plats et au maintien de la cuisine.",image:"https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900",keywords:"cuisine restauration",url:"https://candidat.francetravail.fr/offres/recherche"}
];
const $ = s => document.querySelector(s);
let view="jobs", authMode="signup", supabase=null;
const favorites = new Set(JSON.parse(localStorage.getItem("job-scroll-favorites")||"[]"));
const config=window.JOB_SCROLL_CONFIG||{};
if(window.supabase && config.supabaseUrl?.startsWith("https://") && !config.supabaseUrl.includes("TON-PROJET") && config.supabaseAnonKey && !config.supabaseAnonKey.startsWith("TA_CLE")) {
  supabase=window.supabase.createClient(config.supabaseUrl,config.supabaseAnonKey);
}
function saveFavorites(){localStorage.setItem("job-scroll-favorites",JSON.stringify([...favorites]));$("#fav-count").textContent=favorites.size}
function render(){
 const q=$("#search").value.trim().toLowerCase(), loc=$("#location").value.trim().toLowerCase(), contract=$("#contract").value;
 let list=demoJobs.filter(j=>(!q||`${j.title} ${j.company} ${j.sector} ${j.keywords}`.toLowerCase().includes(q))&&(!loc||j.city.toLowerCase().includes(loc))&&(!contract||j.contract===contract));
 if(view==="favorites") list=list.filter(j=>favorites.has(j.id));
 $("#view-title").textContent=view==="favorites"?"Tes offres enregistrées":"Des opportunités pour toi";
 $("#view-eyebrow").textContent=view==="favorites"?"À retrouver":"À découvrir";
 $("#results-count").textContent=`${list.length} offre${list.length>1?"s":""}`;
 $("#demo-notice").classList.toggle("hidden",view==="favorites"&&list.length===0);
 $("#jobs").innerHTML=list.map(j=>`<article class="job-card">
  <div class="job-photo" style="background-image:url('${j.image}')"><span class="job-tag">${j.sector}</span><button class="favorite ${favorites.has(j.id)?"saved":""}" data-fav="${j.id}" aria-label="Ajouter aux favoris">${favorites.has(j.id)?"★":"☆"}</button></div>
  <div class="job-body"><div class="company">${j.company}</div><h3>${j.title}</h3><div class="job-meta"><span>⌖ ${j.city}</span><span>${j.contract}</span></div><p class="job-desc">${j.desc}</p><div class="job-actions"><a class="primary-btn" href="${j.url}" target="_blank" rel="noopener">Voir les offres similaires ↗</a></div></div>
 </article>`).join("");
 $("#empty").classList.toggle("hidden",list.length!==0);
 $("#jobs").classList.toggle("hidden",list.length===0);
}
$("#jobs").addEventListener("click",e=>{const b=e.target.closest("[data-fav]");if(!b)return;const id=Number(b.dataset.fav);favorites.has(id)?favorites.delete(id):favorites.add(id);saveFavorites();render()});
["search","location","contract"].forEach(id=>$("#"+id).addEventListener(id==="contract"?"change":"input",render));
$("#reset").addEventListener("click",()=>{$("#search").value="";$("#location").value="";$("#contract").value="";render()});
document.querySelectorAll(".nav-btn").forEach(b=>b.addEventListener("click",()=>{view=b.dataset.view;document.querySelectorAll(".nav-btn").forEach(x=>x.classList.toggle("active",x===b));render()}));
$("#account-open").addEventListener("click",()=>$("#account-dialog").showModal());
$("#auth-form").addEventListener("submit",async e=>{e.preventDefault();const msg=$("#auth-message");if(!supabase){msg.textContent="Les comptes ne sont pas encore activés. Configure Supabase dans config.js puis recharge la page.";return}const email=$("#email").value,password=$("#password").value;$("#auth-submit").disabled=true;try{const result=authMode==="signup"?await supabase.auth.signUp({email,password}):await supabase.auth.signInWithPassword({email,password});if(result.error)throw result.error;msg.textContent=authMode==="signup"?"Compte créé. Vérifie ta boîte e-mail si la confirmation est activée.":"Connexion réussie."}catch(err){msg.textContent=err.message||"Une erreur est survenue."}finally{$("#auth-submit").disabled=false}});

