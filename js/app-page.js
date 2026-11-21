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
{name:"Rufino",title:"Jovem Escoteiro",role:"JOVEM ESCOTEIRO",story:"Rufino é um jovem aventureiro cheio de energia, curioso e apaixonado pelos animais. Durante uma de suas caminhadas pela floresta, encontrou Senhor Fred, um escoteiro veterano que dedicou sua vida à proteção da fauna brasileira. O encontro inesperado acabou unindo seus destinos: ao conhecer a história e a missão de Fred, Rufino aceita seu legado e assume o desafio de se tornar um novo protetor da natureza. Ao lado de seu mentor, embarca em uma jornada de descobertas e aprendizados, contando também com a ajuda de Elisa, uma cientista de campo que surge inesperadamente para orientá-lo nos momentos mais difíceis.",skill:"Coragem, curiosidade e dedicação à proteção dos animais.",skillIcon:"bi-heart-fill",quote:"“Não importa o tamanho do desafio, sempre existe algo que podemos fazer para proteger a natureza.”",portrait:"assets/img/rufino-perfil.png",art:""},
{name:"Senhor Fred",title:"Escoteiro Veterano",role:"ESCOTEIRO VETERANO",story:"Senhor Fred dedicou grande parte de sua vida à exploração dos biomas brasileiros e à proteção dos animais ameaçados de extinção. Com muitos anos de experiência, tornou-se um verdadeiro conhecedor da natureza. Porém, com a idade, já não consegue participar das expedições como antigamente. Por isso, decidiu passar seu legado adiante, confiando a Rufino a missão de continuar seu trabalho. Mesmo sem estar sempre na linha de frente, Fred acompanha o jovem aventureiro, compartilhando seus ensinamentos, conselhos e experiências para ajudá-lo a crescer e se tornar um grande protetor da natureza.",skill:"Experiência em exploração, sobrevivência e conservação ambiental.",skillIcon:"bi-shield-check",quote:"“A verdadeira aventura não termina quando deixamos de explorar, mas quando ensinamos alguém a continuar.”",portrait:"assets/img/fred-perfil.png",art:"fred"},
{name:"Elisa",title:"Cientista de Campo",role:"CIENTISTA DE CAMPO",story:"Elisa é uma cientista dedicada à investigação e conservação da fauna brasileira. Ela percorre os diferentes biomas do país estudando espécies ameaçadas de extinção, seus habitats e os riscos que enfrentam. Gentil e paciente, acompanha o aventureiro durante as missões, oferecendo pistas e informações valiosas quando ele precisa de ajuda para desvendar os mistérios da natureza.",skill:"Conhecimento da fauna brasileira e orientação científica.",skillIcon:"bi-graph-up-arrow",quote:"“Toda espécie tem uma história. Basta aprender a observar para descobri-la.”",portrait:"assets/img/elisa-perfil.png",art:"elisa"}
];
let personIndex=0;const choices=[...root.querySelectorAll(".character-choice")];
function setPerson(i){personIndex=(i+people.length)%people.length;const p=people[personIndex];choices.forEach((c,n)=>{let active=n===personIndex;c.classList.toggle("active",active);c.setAttribute("aria-selected",String(active))});root.querySelector("#characterName").textContent=p.name;root.querySelector("#characterTitle").textContent=p.title;root.querySelector("#characterRole").textContent=p.role;root.querySelector("#characterStory").textContent=p.story;root.querySelector("#characterSkill").textContent=p.skill;root.querySelector("#characterSkillIcon").className="bi "+p.skillIcon;root.querySelector("#characterQuote").textContent=p.quote;const portrait=root.querySelector("#characterPortrait");portrait.src=p.portrait;portrait.alt="Retrato de "+p.name;root.querySelector("#characterArt").className="character-art "+p.art;root.querySelector("#characterDots").textContent=["●","○","○"].map((v,n)=>n===personIndex?"●":"○").join(" ")}
choices.forEach((c,i)=>c.addEventListener("click",()=>setPerson(i)));root.querySelector("#characterPrev").addEventListener("click",()=>setPerson(personIndex-1));root.querySelector("#characterNext").addEventListener("click",()=>setPerson(personIndex+1));
})();