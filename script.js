/*****************************************************************
 *  MALLA CURRICULAR – INTERACCIÓN
 *  Al hacer clic se aprueba el ramo; si eso satisface los
 *  prerequisitos de otro, lo desbloquea.  Estado persistente
 *  en localStorage.
 *****************************************************************/

const malla = [
  /* ————— PRIMER AÑO ————— */
  {id:'quimica',                       n:'Química y Bioquímica',                  sem:'I semestre',  year:1, pre:[]},
  {id:'mate_biostat',                  n:'Matemática y Bioestadística',           sem:'I semestre',  year:1, pre:[]},
  {id:'etica',                         n:'Ética y Bioética',                      sem:'I semestre',  year:1, pre:[]},
  {id:'sys1',                          n:'Sociedad y Salud 1',                    sem:'I semestre',  year:1, pre:[]},
  {id:'intro_to1',                     n:'Introducción a la TO 1',                sem:'I semestre',  year:1, pre:[]},
  {id:'alfabetizacion',                n:'Alfabetización Académica',              sem:'I semestre',  year:1, pre:[]},

  {id:'histologia',                    n:'Histología y Embriología',              sem:'II semestre', year:1, pre:[]},
  {id:'anatomia',                      n:'Anatomía',                              sem:'II semestre', year:1, pre:[]},
  {id:'biologia',                      n:'Biología y Genética',                   sem:'II semestre', year:1, pre:['mate_biostat','quimica']},
  {id:'sys2',                          n:'Sociedad y Salud 2',                    sem:'II semestre', year:1, pre:['sys1']},
  {id:'intro_to2',                     n:'Introducción a la TO 2',                sem:'II semestre', year:1, pre:['intro_to1']},
  {id:'cfg1',                          n:'CFG / Inglés 1',                        sem:'II semestre', year:1, pre:[]},

  /* ————— SEGUNDO AÑO ————— */
  {id:'salud_publica',                 n:'Salud Pública',                         sem:'III semestre',year:2, pre:['sys2']},
  {id:'fisiologia',                    n:'Fisiología de Sistemas',                sem:'III semestre',year:2, pre:['histologia','anatomia','biologia']},
  {id:'fisica_medica',                 n:'Física Médica',                         sem:'III semestre',year:2, pre:[]},
  {id:'psico_general',                 n:'Psicología General y Evolutiva',        sem:'III semestre',year:2, pre:['etica']},
  {id:'sys3',                          n:'Sociedad y Salud 3',                    sem:'III semestre',year:2, pre:['sys2']},
  {id:'pfto1',                         n:'Principios y Fundamentos TO 1',         sem:'III semestre',year:2, pre:['intro_to2']},
  {id:'cfg2',                          n:'Inglés 1 / CFG',                        sem:'III semestre',year:2, pre:[]},

  {id:'gestion',                       n:'Gestión',                               sem:'IV semestre', year:2, pre:['salud_publica']},
  {id:'fisiopatologia',                n:'Fisiopatología',                        sem:'IV semestre', year:2, pre:['fisiologia']},
  {id:'farmaco',                       n:'Farmacología',                          sem:'IV semestre', year:2, pre:['fisiologia']},
  {id:'socioantropo',                  n:'Socioantropología',                     sem:'IV semestre', year:2, pre:['etica','sys2','psico_general']},
  {id:'sys4',                          n:'Sociedad y Salud 4',                    sem:'IV semestre', year:2, pre:['sys3']},
  {id:'pfto2',                         n:'Principios y Fundamentos TO 2',         sem:'IV semestre', year:2, pre:['pfto1']},
  {id:'creatividad',                   n:'Creatividad',                           sem:'IV semestre', year:2, pre:[]},
  {id:'cfg3',                          n:'Inglés 2 / CFG',                        sem:'IV semestre', year:2, pre:['cfg2']},

  /* ————— TERCER AÑO ————— */
  {id:'neurofisiop',                   n:'Neurofisiopatología',                   sem:'V semestre',  year:3, pre:['histologia','fisiologia']},
  {id:'anatomia_func',                 n:'Anatomía Funcional',                    sem:'V semestre',  year:3, pre:['anatomia']},
  {id:'psico_social',                  n:'Psicología Social y del Trabajo',       sem:'V semestre',  year:3, pre:['psico_general']},
  {id:'sst1',                          n:'Sociedad, Salud y TO 1',                sem:'V semestre',  year:3, pre:['sys4']},
  {id:'modelo_to1',                    n:'Modelos de Intervención TO 1',          sem:'V semestre',  year:3, pre:['pfto2']},
  {id:'ocio',                          n:'Ocio, Tiempo Libre y Juego',            sem:'V semestre',  year:3, pre:[]},
  {id:'cfg4',                          n:'Inglés 3 / CFG',                        sem:'V semestre',  year:3, pre:['cfg3']},

  {id:'salud_mental',                  n:'Salud Mental y Psicopatología',         sem:'VI semestre', year:3, pre:['psico_general','farmaco','neurofisiop']},
  {id:'paradigmas',                    n:'Paradigmas de la Ocupación',            sem:'VI semestre', year:3, pre:['I_y_II_completos']}, // se revisa en código
  {id:'investigacion_salud',          n:'Investigación en Salud',                sem:'VI semestre', year:3, pre:['salud_publica','gestion']},
  {id:'sst2',                          n:'Sociedad, Salud y TO 2',                sem:'VI semestre', year:3, pre:['sst1']},
  {id:'modelo_to2',                    n:'Modelos de Intervención TO 2',          sem:'VI semestre', year:3, pre:['modelo_to1']},
  {id:'narrativa',                     n:'Narrativa, Cotidianeidad y Ocupación',  sem:'VI semestre', year:3, pre:[]},
  {id:'cfg5',                          n:'Inglés 4',                              sem:'VI semestre', year:3, pre:['cfg4']},

  /* ————— CUARTO AÑO ————— */
  {id:'gestion_to',                    n:'Gestión en TO',                         sem:'VII',         year:4, pre:['salud_publica','gestion']},
  {id:'terapias_asistivas',            n:'Terapias Asistivas y Ortótica',         sem:'VII',         year:4, pre:['TODO_3']},   // tercer año aprobado
  {id:'investigacion_to1',            n:'Investigación en TO 1',                 sem:'VII',         year:4, pre:['TODO_3']},
  {id:'bioderecho',                    n:'Bioderecho',                            sem:'VII',         year:4, pre:['TODO_3']},
  {id:'to_educacion',                  n:'TO en Educación',                       sem:'VII',         year:4, pre:['TODO_3']},
  {id:'estrategias1',                  n:'Estrategias de Intervención 1',         sem:'VII',         year:4, pre:['TODO_3']},
  {id:'cfg6',                          n:'Inglés 5',                              sem:'VII',         year:4, pre:['cfg5']},

  {id:'ergonomia',                     n:'Ergonomía y Ayudas Técnicas',           sem:'VIII',        year:4, pre:[]},
  {id:'investigacion_to2',            n:'Investigación en TO 2',                 sem:'VIII',        year:4, pre:['investigacion_to1']},
  {id:'bioetica_to',                   n:'Bioética y TO',                         sem:'VIII',        year:4, pre:['TODO_3']},
  {id:'to_judicial',                   n:'TO en Sistema Judicial',                sem:'VIII',        year:4, pre:['TODO_4']},   // cuarto año aprobado
  {id:'estrategias2',                  n:'Estrategias de Intervención 2',         sem:'VIII',        year:4, pre:['estrategias1']},
  {id:'ocup_med_amb',                  n:'Ocupación y Medio Ambiente',            sem:'VIII',        year:4, pre:[]},
  {id:'cfg7',                          n:'Inglés 6',                              sem:'VIII',        year:4, pre:['cfg6']},

  /* ————— QUINTO AÑO ————— */
  {id:'internado_nna',                 n:'Internado – Niños y Adolescentes',      sem:'IX',          year:5, pre:['TODO_4']},
  {id:'internado_salud_mental',        n:'Internado – Psiquiatría y Salud Mental',sem:'IX',          year:5, pre:['TODO_4']},
  {id:'internado_salud_fisica',        n:'Internado – Salud Física',              sem:'IX',          year:5, pre:['TODO_4']},

  {id:'internado_nna2',                n:'Internado – Niños y Adolescentes',      sem:'X',           year:5, pre:['TODO_4']},
  {id:'internado_salud_mental2',       n:'Internado – Psiquiatría y Salud Mental',sem:'X',           year:5, pre:['TODO_4']},
  {id:'internado_salud_fisica2',       n:'Internado – Salud Física',              sem:'X',           year:5, pre:['TODO_4']},
  {id:'titulacion',                    n:'Actividad Final de Titulación',         sem:'X',           year:5, pre:['TODO_4','internado_nna','internado_salud_mental','internado_salud_fisica']}
];

/*  ——————————————————————————————————————————————  */
/*                LOGÍSTICA BÁSICA                  */
/*  ——————————————————————————————————————————————  */

const cont = document.getElementById('malla');
const stored = JSON.parse(localStorage.getItem('mallaTO')||'{}');

/* — Construye estructura HTML — */
function build(){
  // agrupar por semestre preservando orden
  const semestres = [...new Set(malla.map(c=>`${c.year}-${c.sem}`))];

  semestres.forEach(key=>{
    const [year,sem] = key.split('-');
    const box = document.createElement('div');
    box.className='semestre';
    box.innerHTML=`<h2>${year}° Año – ${sem}</h2><div class="cursos"></div>`;
    const grid = box.querySelector('.cursos');
    malla.filter(c=>`${c.year}-${c.sem}`===key).forEach(c=>{
      const div=document.createElement('div');
      div.className='curso';
      div.id=c.id;
      div.textContent=c.n;
      if(c.pre.length){
        const tip='Prerrequisitos:\n- '+c.pre.filter(p=>!p.startsWith('TODO')).map(id=>name(id)).join('\n- ');
        div.dataset.tip=tip;
      }
      grid.appendChild(div);
    });
    cont.appendChild(box);
  });
}

/* — Devuelve nombre a partir de id — */
function name(id){
  const f=malla.find(x=>x.id===id);
  return f?f.n:id;
}

/* — Calcula si un curso está aprobado — */
function isApproved(id){return stored[id];}

/* — Verifica si todos los prerequisitos están cumplidos — */
function prereqOk(cur){
  // reglas especiales
  if(cur.pre.includes('I_y_II_completos')){
    const first2 = malla.filter(c=>c.year<3).every(c=>isApproved(c.id));
    return first2;
  }
  if(cur.pre.includes('TODO_3')){
    return malla.filter(c=>c.year===3).every(c=>isApproved(c.id));
  }
  if(cur.pre.includes('TODO_4')){
    return malla.filter(c=>c.year===4).every(c=>isApproved(c.id));
  }
  // regla general
  return cur.pre.every(p=>isApproved(p));
}

/* — Pinta estados (bloqueado/aprobado) — */
function paint(){
  malla.forEach(c=>{
    const el=document.getElementById(c.id);
    el.classList.remove('bloqueado','aprobado');
    if(isApproved(c.id)) el.classList.add('aprobado');
    else if(!prereqOk(c)) el.classList.add('bloqueado');
  });
}

/* — Click en curso — */
function clickCurso(e){
  if(!e.target.classList.contains('curso')) return;
  const id=e.target.id;
  stored[id]=!stored[id];
  localStorage.setItem('mallaTO',JSON.stringify(stored));
  paint();
}

/* — Resetear — */
document.getElementById('btn‑reset').onclick=()=>{
  if(confirm('¿Seguro que desea reiniciar su progreso?')){
    localStorage.removeItem('mallaTO');
    location.reload();
  }
};

/* — Inicialización — */
build();
paint();
cont.addEventListener('click',clickCurso);
