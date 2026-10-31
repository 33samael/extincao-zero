(() => {
"use strict";
const root=document.querySelector(".ez-app"); if(!root)return;
const reveals=root.querySelectorAll(".reveal");
if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
 const ob=new IntersectionObserver((entries,observer)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
 reveals.forEach((el,i)=>{el.style.transitionDelay=`${i%4*65}ms`;ob.observe(el)});
}else reveals.forEach(el=>el.classList.add("visible"));

const steps=[...root.querySelectorAll(".journey-step")],progress=root.querySelector("#journeyProgress");
function journeyActive(el){steps.forEach(s=>{let active=s===el;s.classList.toggle("active",active);s.setAttribute("aria-expanded",String(active))});let i=steps.indexOf(el);if(progress)progress.style.width=(i/(steps.length-1)*100)+"%"}
steps.forEach(s=>{s.addEventListener("click",()=>journeyActive(s));s.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();journeyActive(s)}})});

const mechanics={
 habitat:["bi-puzzle-fill","Monte o habitat","Entenda como água, alimento, abrigo e vegetação se relacionam e sustentam a vida de uma espécie."],
 species:["bi-search","Identifique a espécie","Observe silhuetas, cores, sons, pegadas e comportamentos para levantar hipóteses. Ao concluir, consulte uma ficha educativa da espécie."],
 biome:["bi-globe-americas","Proteja o bioma","Compare decisões que podem prejudicar ou favorecer o ambiente e explore as consequências de cada escolha."],
 track:["bi-binoculars-fill","Rastreie o animal","Siga marcas, pegadas, alimentos e indícios para conversar sobre território, deslocamento e comportamento animal."],
 threats:["bi-shield-exclamation","Combata as ameaças","Reconheça situações relacionadas a queimadas, desmatamento, caça, poluição e urbanização e avalie alternativas de conservação."]
};
const cards=[...root.querySelectorAll(".mechanic-card")];
cards.forEach(card=>card.addEventListener("click",()=>{cards.forEach(c=>{let active=c===card;c.classList.toggle("selected",active);c.setAttribute("aria-pressed",String(active))});const d=mechanics[card.dataset.key];if(!d)return;root.querySelector("#detailIcon").className="bi "+d[0];root.querySelector("#detailTitle").textContent=d[1];root.querySelector("#detailText").textContent=d[2]}));

const investigation=[...root.querySelectorAll(".investigation-step")];
if("IntersectionObserver"in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)investigation.forEach(s=>s.classList.toggle("active",s===e.target))}),{rootMargin:"-35% 0px -45% 0px"});investigation.forEach(s=>io.observe(s))}

const tabs=[...root.querySelectorAll(".book-tab")],panels=[...root.querySelectorAll(".book-panel")],book=root.querySelector("#bookObject");let bookIndex=0;
function setBook(i){bookIndex=(i+tabs.length)%tabs.length;tabs.forEach((t,n)=>{let active=n===bookIndex;t.classList.toggle("active",active);t.setAttribute("aria-selected",String(active));panels[n].hidden=!active});root.querySelector("#bookPage").textContent=String(bookIndex+1).padStart(2,"0")+" / 04";book.classList.add("turn");setTimeout(()=>book.classList.remove("turn"),450)}
tabs.forEach((t,i)=>t.addEventListener("click",()=>setBook(i)));root.querySelector("#bookPrev").addEventListener("click",()=>setBook(bookIndex-1));root.querySelector("#bookNext").addEventListener("click",()=>setBook(bookIndex+1));

const people=[
{name:"Aurora",title:"Exploradora da Biodiversidade",role:"EXPLORADORA DA BIODIVERSIDADE",story:"Aurora cresceu cercada por histórias sobre animais brasileiros e desenvolveu grande curiosidade pela natureza. Ela percorre os biomas registrando espécies, observando comportamentos e ajudando a construir o Livro do Explorador.",skill:"Observação e registro de descobertas",skillIcon:"bi-eye-fill",quote:"“Cada detalhe da natureza conta uma história.”",icon:"bi-binoculars-fill",art:""},
{name:"Íris",title:"Pesquisadora de Campo",role:"PESQUISADORA DE CAMPO",story:"Íris é apaixonada por dados, ciência e conservação. Ela estuda os impactos das atividades humanas sobre os biomas e transforma as informações coletadas durante as missões em conhecimento acessível.",skill:"Análise de dados e investigação científica",skillIcon:"bi-graph-up-arrow",quote:"“Entender o problema é o primeiro passo para resolvê-lo.”",icon:"bi-journal-text",art:"iris"},
{name:"Caio",title:"Guardião dos Biomas",role:"GUARDIÃO DOS BIOMAS",story:"Caio conhece os desafios enfrentados pelas comunidades e pela fauna brasileira. Ele acredita que a preservação depende de educação, participação coletiva e escolhas cotidianas que respeitem os ambientes naturais.",skill:"Estratégia de conservação e resolução de desafios",skillIcon:"bi-shield-check",quote:"“Preservar não é um gesto isolado, é uma escolha diária.”",icon:"bi-shield-fill-check",art:"caio"}
];
let personIndex=0;const choices=[...root.querySelectorAll(".character-choice")];
function setPerson(i){personIndex=(i+people.length)%people.length;const p=people[personIndex];choices.forEach((c,n)=>{let active=n===personIndex;c.classList.toggle("active",active);c.setAttribute("aria-selected",String(active))});root.querySelector("#characterName").textContent=p.name;root.querySelector("#characterTitle").textContent=p.title;root.querySelector("#characterRole").textContent=p.role;root.querySelector("#characterStory").textContent=p.story;root.querySelector("#characterSkill").textContent=p.skill;root.querySelector("#characterSkillIcon").className="bi "+p.skillIcon;root.querySelector("#characterQuote").textContent=p.quote;root.querySelector("#characterBigIcon").className="bi "+p.icon;root.querySelector("#characterArt").className="character-art "+p.art;root.querySelector("#characterDots").textContent=["●","○","○"].map((v,n)=>n===personIndex?"●":"○").join(" ")}
choices.forEach((c,i)=>c.addEventListener("click",()=>setPerson(i)));root.querySelector("#characterPrev").addEventListener("click",()=>setPerson(personIndex-1));root.querySelector("#characterNext").addEventListener("click",()=>setPerson(personIndex+1));
})();