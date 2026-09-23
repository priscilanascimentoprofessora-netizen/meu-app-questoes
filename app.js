const seed=[
{id:'2017-1',subject:'Legislação',topic:'LDB / Educação Especial',exam:'IFSP Gestão 2017',text:'Segundo a LDB, o atendimento educacional especializado gratuito aos estudantes com deficiência, transtornos globais do desenvolvimento e altas habilidades ou superdotação deve ocorrer:',A:'obrigatoriamente na rede regular de ensino.',B:'preferencialmente na rede regular de ensino.',C:'obrigatoriamente em classes, escolas ou serviços especializados.',D:'preferencialmente em classes, escolas ou serviços especializados.',answer:'B'},
{id:'2017-3',subject:'Legislação',topic:'Lei 11.892/2008',exam:'IFSP Gestão 2017',text:'De acordo com os artigos 7º e 8º da Lei nº 11.892/2008, assinale a alternativa correta sobre os percentuais mínimos de vagas dos Institutos Federais.',A:'30% para educação técnica e 20% para licenciaturas.',B:'30% para educação técnica e 20% para tecnologia.',C:'50% para educação técnica e 20% para licenciaturas/formação pedagógica.',D:'50% para educação técnica e 20% para cursos superiores de tecnologia.',answer:'C'},
{id:'2017-5',subject:'Legislação',topic:'Lei 8.112/1990 / Deveres',exam:'IFSP Gestão 2017',text:'Considerando o art. 116 da Lei nº 8.112/1990, assinale a alternativa que apresenta três deveres do servidor:',A:'exercer com zelo; cumprir ordens irrestritamente; promover manifestação de apreço.',B:'observar normas legais; atender com presteza ao público; manter conduta compatível com a moralidade administrativa.',C:'ser assíduo; atender requisições da Receita; cometer atribuições estranhas a outro servidor.',D:'ser leal à administração; promover a urbanidade; investigar irregularidades.',answer:'B'},
{id:'2022-1',subject:'Pedagógicos',topic:'Teorias de Currículo / Pós-colonialismo',exam:'IFSP Gestão 2022',text:'Segundo Tomaz Tadeu da Silva, na perspectiva pós-colonialista do currículo, assinale a alternativa correta:',A:'A análise pós-colonial garante posição privilegiada ao sujeito imperial europeu.',B:'A análise limita-se às relações entre metrópoles e ex-colônias.',C:'A teoria pós-colonial e outros movimentos reivindicam inclusão de formas culturais, experiências e identidades marginalizadas.',D:'Deve-se construir currículo neutro, sem marcas de colonizador e colonizado.',answer:'C'},
{id:'2022-2',subject:'Pedagógicos',topic:'Multiculturalismo',exam:'IFSP Gestão 2022',text:'Sobre multiculturalismo, segundo Tomaz Tadeu da Silva, assinale a alternativa correta:',A:'A ambiguidade do multiculturalismo não impede que represente importante instrumento de luta política.',B:'As desigualdades educacionais são mitigadas por um currículo comum.',C:'É possível aferir objetivamente superioridade entre culturas.',D:'Um currículo centrado apenas em tolerância e convivência harmoniosa esgota a perspectiva multiculturalista.',answer:'A'},
{id:'2022-3',subject:'Legislação',topic:'Lei 11.892/2008 / Finalidades dos IFs',exam:'IFSP Gestão 2022',text:'Assinale a alternativa que apresenta uma finalidade/característica expressa no art. 6º da Lei nº 11.892/2008:',A:'Desenvolver programas de extensão apenas para novos negócios locais.',B:'Ofertar cursos superiores de tecnologia especificamente em Informática.',C:'Ofertar prioritariamente licenciaturas em todas as áreas.',D:'Promover produção, desenvolvimento e transferência de tecnologias sociais, especialmente voltadas à preservação do meio ambiente.',answer:'D'}];
let custom=JSON.parse(localStorage.getItem('customQuestions')||'[]');let history=JSON.parse(localStorage.getItem('history')||'{}');let queue=[],idx=0,selected=null,current=null;
const all=()=>[...seed,...custom];
function showPage(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));if(id==='home')renderHome();if(id==='performance')renderPerformance()}
function renderHome(){let h=Object.values(history),answered=h.length,correct=h.filter(x=>x.correct).length,wrong=h.filter(x=>!x.correct).length;document.getElementById('totalAnswered').textContent=answered;document.getElementById('accuracy').textContent=answered?Math.round(correct/answered*100)+'%':'0%';document.getElementById('wrongCount').textContent=wrong;let today=new Date().toISOString().slice(0,10),n=h.filter(x=>x.date===today).length;document.getElementById('todayCount').textContent=n;document.getElementById('bar').style.width=Math.min(n/20*100,100)+'%';let subjects=[...new Set(all().map(q=>q.subject))];document.getElementById('subjects').innerHTML=subjects.map(s=>`<button class='chip' onclick='startStudy(${JSON.stringify(s)})'>${s}</button>`).join('')}
function startStudy(mode){let qs=all();if(mode==='wrong')qs=qs.filter(q=>history[q.id]&&!history[q.id].correct);else if(mode!=='all')qs=qs.filter(q=>q.subject===mode);if(!qs.length){alert('Ainda não há questões nesse grupo.');return}queue=[...qs].sort(()=>Math.random()-.5);idx=0;showPage('quiz');loadQuestion()}
function loadQuestion(){selected=null;current=queue[idx];document.getElementById('quizSubject').textContent=current.subject;document.getElementById('quizProgress').textContent=`Questão ${idx+1} de ${queue.length}`;document.getElementById('tags').innerHTML=`<span class='tag'>${current.exam||'Questão própria'}</span><span class='tag'>${current.topic||'Sem assunto'}</span>`;document.getElementById('questionText').textContent=current.text;let letters=['A','B','C','D','E'].filter(k=>current[k]);document.getElementById('options').innerHTML=letters.map(k=>`<button class='option' data-letter='${k}'><span class='letter'>${k}</span><span>${current[k]}</span></button>`).join('');document.querySelectorAll('.option').forEach(b=>b.onclick=()=>{if(document.getElementById('nextBtn').hidden===false)return;document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');selected=b.dataset.letter;document.getElementById('confirmBtn').disabled=false});document.getElementById('feedback').innerHTML='';document.getElementById('confirmBtn').hidden=false;document.getElementById('confirmBtn').disabled=true;document.getElementById('nextBtn').hidden=true}
document.getElementById('confirmBtn').onclick=()=>{if(!selected)return;let correct=selected===current.answer;history[current.id]={correct,chosen:selected,date:new Date().toISOString().slice(0,10),subject:current.subject};localStorage.setItem('history',JSON.stringify(history));document.querySelectorAll('.option').forEach(b=>{if(b.dataset.letter===current.answer)b.classList.add('correct');if(b.dataset.letter===selected&&!correct)b.classList.add('wrong')});document.getElementById('feedback').innerHTML=correct?"<span class='ok'>✓ Resposta correta!</span>":`<span class='no'>✕ Resposta incorreta. Gabarito: ${current.answer}</span>`;document.getElementById('confirmBtn').hidden=true;document.getElementById('nextBtn').hidden=false};
document.getElementById('nextBtn').onclick=()=>{idx++;if(idx>=queue.length){showPage('home');alert('Treino concluído!');}else loadQuestion()};
document.getElementById('addForm').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),q={id:'u-'+Date.now()};for(let [k,v] of f.entries())q[k]=v.trim();custom.push(q);localStorage.setItem('customQuestions',JSON.stringify(custom));e.target.reset();document.getElementById('saveMsg').innerHTML="<p class='ok'>✓ Questão salva. Ela já está disponível para estudo.</p>";renderHome()};
function renderPerformance(){let box=document.getElementById('performanceList'),subjects=[...new Set(all().map(q=>q.subject))];box.innerHTML=subjects.map(s=>{let hs=Object.values(history).filter(h=>h.subject===s),c=hs.filter(h=>h.correct).length,p=hs.length?Math.round(c/hs.length*100):0;return `<div class='performance-row'><b>${s}</b><span>${c}/${hs.length} acertos · ${p}%</span></div>`}).join('')||'<p>Responda algumas questões para ver seu desempenho.</p>'}

function exportBackup(){
  const backup={
    app:'Meu Treino de Questões',
    version:2,
    exportedAt:new Date().toISOString(),
    customQuestions:custom,
    history:history
  };
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const date=new Date().toISOString().slice(0,10);
  a.href=url;a.download=`backup-meu-treino-${date}.json`;
  document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  document.getElementById('backupMsg').innerHTML="<p class='ok'>✓ Backup criado. Guarde o arquivo em um local seguro.</p>";
}
function importBackupFile(file){
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(!data || !Array.isArray(data.customQuestions) || typeof data.history!=='object' || data.history===null) throw new Error('formato');
      if(!confirm('Importar este backup? As questões próprias e o histórico atuais deste aparelho serão substituídos.')) return;
      custom=data.customQuestions;
      history=data.history;
      localStorage.setItem('customQuestions',JSON.stringify(custom));
      localStorage.setItem('history',JSON.stringify(history));
      renderHome();renderPerformance();
      document.getElementById('backupMsg').innerHTML=`<p class='ok'>✓ Backup restaurado: ${custom.length} questões próprias e ${Object.keys(history).length} registros de resposta.</p>`;
    }catch(err){
      document.getElementById('backupMsg').innerHTML="<p class='no'>✕ Este arquivo não parece ser um backup válido do aplicativo.</p>";
    }
  };
  reader.readAsText(file);
}
document.getElementById('exportBtn').onclick=exportBackup;
document.getElementById('importFile').onchange=e=>{const file=e.target.files[0];if(file)importBackupFile(file);e.target.value='';};

document.getElementById('resetBtn').onclick=()=>{if(confirm('Deseja realmente apagar todo o histórico de respostas?')){history={};localStorage.removeItem('history');renderPerformance();renderHome()}};
document.querySelectorAll('nav button[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page));document.querySelector("nav button[data-action='study']").onclick=()=>startStudy('all');
let deferredPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBtn').hidden=false});document.getElementById('installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById('installBtn').hidden=true}};
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');renderHome();
