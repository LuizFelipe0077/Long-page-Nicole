import{j as e,r as m,f as _e,g as Ke,u as Ye}from"./react-vendor-CtRno7JJ.js";import{g as me,f as X,i as O,l as Ie,j as Qe,k as Ne,S as ue,h as ye,m as Oe,n as re,o as q,e as Xe,q as Ze,p as Se,u as Je,c as ea,r as aa,s as ta,d as sa}from"./index-DSQpI1W0.js";import{m as na}from"./motion-2MHeRUsF.js";import{e as se,S as ke,d as oa,p as Ae}from"./SupplementFields-C6IPrU49.js";import"./monthGrid-hPO7wY2M.js";const ne=600,Y=160,H=8;function ia({points:a}){if(a.filter(l=>l.rate!==null).length<2)return e.jsx("p",{className:"empty-state",children:"Dados insuficientes para o gráfico ainda."});const i=(ne-H*2)/(a.length-1),r=l=>Y-H-l/100*(Y-H*2),o=a.map((l,u)=>({x:H+u*i,y:l.rate===null?null:r(l.rate)})).filter(l=>l.y!==null),s=o.map((l,u)=>`${u===0?"M":"L"} ${l.x.toFixed(1)} ${l.y.toFixed(1)}`).join(" "),n=`${s} L ${o[o.length-1].x.toFixed(1)} ${Y-H} L ${o[0].x.toFixed(1)} ${Y-H} Z`;return e.jsxs("svg",{viewBox:`0 0 ${ne} ${Y}`,width:"100%",height:Y,preserveAspectRatio:"none",children:[e.jsx("line",{x1:H,y1:r(100),x2:ne-H,y2:r(100),stroke:"var(--line)",strokeWidth:"1"}),e.jsx("line",{x1:H,y1:r(0),x2:ne-H,y2:r(0),stroke:"var(--line)",strokeWidth:"1"}),e.jsx("path",{d:n,fill:"var(--accent)",opacity:"0.12"}),e.jsx("path",{d:s,fill:"none",stroke:"var(--accent)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"})]})}const ee=220,Q=16,z=(ee-Q)/2,oe=Math.PI*z,ra={Excelente:"var(--success)",Boa:"var(--accent)",Moderada:"var(--warning)",Baixa:"var(--warning)",Crítica:"var(--danger)"};function la({value:a,classification:t}){const i=oe-a/100*oe,r=ra[t]||"var(--accent)";return e.jsxs("div",{className:"gauge-wrap",style:{width:ee,height:ee/2+24},children:[e.jsx("svg",{width:ee,height:ee/2+Q,children:e.jsxs("g",{transform:`translate(${Q/2}, ${Q/2})`,children:[e.jsx("path",{d:`M 0 ${z} A ${z} ${z} 0 0 1 ${z*2} ${z}`,fill:"none",stroke:"var(--surface-sunken)",strokeWidth:Q,strokeLinecap:"round"}),e.jsx(na.path,{d:`M 0 ${z} A ${z} ${z} 0 0 1 ${z*2} ${z}`,fill:"none",stroke:r,strokeWidth:Q,strokeLinecap:"round",strokeDasharray:oe,initial:{strokeDashoffset:oe},animate:{strokeDashoffset:i},transition:{duration:.9,ease:[.22,1,.36,1]}})]})}),e.jsxs("div",{className:"gauge-center",children:[e.jsx("span",{className:"display-md",style:{lineHeight:1},children:a}),e.jsx("span",{className:"eyebrow",style:{marginTop:4,color:r},children:t})]})]})}function ca({index:a}){return e.jsxs("div",{className:"surface surface-pad",children:[e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Índice de Adesão"}),e.jsxs("div",{className:"flex items-center gap-6",style:{flexWrap:"wrap"},children:[e.jsx("div",{className:"flex justify-center",style:{flex:"0 0 auto"},children:e.jsx(la,{value:a.value,classification:a.classification})}),e.jsxs("div",{style:{flex:"1 1 220px"},children:[e.jsx("p",{className:"body-sm",style:{marginBottom:"var(--space-4)"},children:"Composição da nota:"}),e.jsx("div",{className:"flex flex-col gap-3",children:a.breakdown.map(t=>e.jsxs("div",{className:"index-breakdown-row",children:[e.jsxs("span",{className:"index-breakdown-label",children:[t.label," ",e.jsxs("span",{style:{color:"var(--ink-faint)"},children:["(",t.weight,"%)"]})]}),e.jsx("span",{className:"index-breakdown-track",children:e.jsx("span",{className:"index-breakdown-fill",style:{width:`${t.value}%`}})}),e.jsx("span",{className:"index-breakdown-value",children:t.value})]},t.label))})]})]})]})}function da({alerts:a}){return a.length===0?e.jsx("p",{className:"empty-state",children:"Nenhum alerta no momento — paciente em dia."}):e.jsx("div",{className:"flex flex-col gap-3",children:a.map((t,i)=>e.jsxs("div",{className:`alert-card ${t.severity}`,children:[e.jsx("span",{className:"alert-icon","aria-hidden":"true",children:t.icon}),e.jsx("span",{className:"body-sm text-ink",children:t.text})]},i))})}const ma={OBSERVACAO:"Observação",REACAO:"Reação",MUDANCA:"Mudança",SOLICITACAO:"Solicitação",RETORNO:"Retorno",CONTATO:"Contato",MUDANCA_PROTOCOLO:"Mudança de protocolo",ORIENTACAO:"Orientação",FEEDBACK:"Feedback"},ua={CONCLUIDO:"✔ Tomou",ATRASADO:"✔ Tomou (atrasado)",PENDENTE:"✖ Não tomou"};function we(a){return new Date(a).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}function pa(a){return a.status==="REVOGADA"?" · revogada":a.usadaEm?" · utilizada":a.ativa?"":" · expirou sem uso"}function ha({days:a,onRevokeLiberacao:t}){const[i,r]=m.useState(null),c=a.filter(o=>o.status!=="future"&&(o.checkins.length>0||o.events.length>0));return c.length===0?e.jsx("p",{className:"empty-state",children:"Nenhum evento registrado no período selecionado."}):e.jsx("div",{children:c.map(o=>{const s=o.date.toDateString(),n=i===s;return e.jsxs("div",{className:"record-day",children:[e.jsxs("div",{className:"timeline-day-row",role:"button",tabIndex:0,"aria-expanded":n,"aria-label":`Dia ${o.dayNumber}`,onClick:()=>r(n?null:s),onKeyDown:l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),r(n?null:s))},children:[e.jsx("span",{className:`timeline-day-dot ${o.visualStatus}`}),e.jsxs("span",{className:"timeline-day-label",children:["Dia ",o.dayNumber," — ",o.date.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long"})]}),o.events.length>0&&e.jsxs("span",{className:"chip chip-warning",children:[o.events.length," evento(s)"]}),e.jsx("span",{"aria-hidden":"true",children:n?"−":"+"})]}),n&&e.jsxs("div",{className:"timeline-day-detail animate-in",children:[o.checkins.map(l=>{var u;return e.jsxs("div",{className:"record-event",children:[e.jsx("span",{className:"record-event-icon",children:"💊"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-ink",children:((u=l.suplemento)==null?void 0:u.nome)||"Suplemento"})," — ",we(l.dataHoraPrescrita),l.dataHoraRealizada&&` · check-in às ${we(l.dataHoraRealizada)}`," · ",ua[l.status]||l.status]})]},l.id)}),o.events.map((l,u)=>e.jsxs("div",{className:"record-event",style:{display:"flex",alignItems:"flex-start",gap:"0.5rem",flexWrap:"wrap"},children:[l.kind==="nota"&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"record-event-icon",children:"📝"}),e.jsxs("span",{children:[e.jsxs("strong",{className:"text-ink",children:[ma[l.tipo]||l.tipo,":"]})," ",l.texto]})]}),l.kind==="permissao"&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"record-event-icon",children:"🔓"}),e.jsxs("span",{style:{flex:"1 1 200px"},children:["Liberação retroativa concedida para o dia ",new Date(l.dataLiberada).toLocaleDateString("pt-BR"),l.motivo&&` — ${l.motivo}`,pa(l)]}),l.ativa&&t&&e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",onClick:p=>{p.stopPropagation(),t(l)},children:"Revogar"})]}),l.kind==="quebra"&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"record-event-icon",children:"⚠️"}),e.jsx("span",{style:{color:"var(--danger)"},children:l.texto})]})]},u))]})]},s)})})}const $e=[{value:"OBSERVACAO",label:"Observação"},{value:"REACAO",label:"Reação"},{value:"MUDANCA",label:"Mudança"},{value:"SOLICITACAO",label:"Solicitação"},{value:"RETORNO",label:"Retorno"}],ie=[{value:"CONTATO",label:"Contato"},{value:"MUDANCA_PROTOCOLO",label:"Mudança de protocolo"},{value:"ORIENTACAO",label:"Orientação"},{value:"FEEDBACK",label:"Feedback"}];function De({pacienteId:a,filterTipos:t,tipoOptions:i=$e,emptyLabel:r="Nenhuma observação registrada ainda.",onNotesChanged:c}){const{showError:o,showToast:s}=me(),n=X(),[l,u]=m.useState([]),[p,x]=m.useState(!0),[b,y]=m.useState(""),[$,v]=m.useState(i[0].value),[h,T]=m.useState(!1),[D,C]=m.useState(null),L=[...$e,...ie],I=t||i.map(d=>d.value),B=()=>{typeof c=="function"&&c()},w=async()=>{x(!0);try{const d=await O.call("listarObservacoesClinicas",{pacienteId:a});u(d.filter(f=>I.includes(f.tipo)))}catch(d){o(d.message)}finally{x(!1)}};m.useEffect(()=>{w()},[a]);const E=()=>{C(null),y(""),v(i[0].value)},R=d=>{C(d.id),y(d.texto),v(d.tipo)},j=async d=>{if(d.preventDefault(),!!b.trim()){T(!0);try{D?(await O.call("editarObservacaoClinica",{observacaoId:D,texto:b,tipo:$}),s({message:"Registro atualizado."})):(await O.call("criarObservacaoClinica",{pacienteId:a,texto:b,tipo:$}),s({message:"Registro salvo."})),E(),await w(),B()}catch(f){o(f.message)}finally{T(!1)}}},W=async d=>{if(await n({title:"Excluir registro",description:"Esta nota será removida permanentemente. Continuar?",confirmLabel:"Excluir",danger:!0})){T(!0);try{await O.call("excluirObservacaoClinica",{observacaoId:d.id}),D===d.id&&E(),s({message:"Registro excluído."}),await w(),B()}catch(g){o(g.message)}finally{T(!1)}}};return e.jsxs("div",{children:[e.jsx("p",{className:"body-sm no-print",style:{marginBottom:"var(--space-4)"},children:"🔒 Visível apenas para a equipe clínica — nunca exibido ao paciente."}),e.jsxs("form",{onSubmit:j,className:"no-print",style:{marginBottom:"var(--space-5)"},children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Tipo"}),e.jsx("select",{className:"field-input",value:$,onChange:d=>v(d.target.value),children:i.map(d=>e.jsx("option",{value:d.value,children:d.label},d.value))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Nota"}),e.jsx("textarea",{className:"field-input",value:b,onChange:d=>y(d.target.value),placeholder:"Registre os detalhes aqui..."})]}),e.jsxs("div",{className:"flex gap-3",style:{flexWrap:"wrap"},children:[e.jsx("button",{type:"submit",className:"btn btn-fill",disabled:h||!b.trim(),children:h?e.jsx("span",{className:"spinner"}):D?"Salvar alteração":"Registrar"}),D&&e.jsx("button",{type:"button",className:"btn btn-ghost",disabled:h,onClick:E,children:"Cancelar edição"})]})]}),p?e.jsx("div",{className:"skeleton",style:{height:60}}):l.length===0?e.jsx("p",{className:"empty-state",children:r}):e.jsx("div",{className:"flex flex-col gap-3",children:l.map(d=>{var f;return e.jsxs("div",{className:"note-card",children:[e.jsxs("div",{className:"flex items-center justify-between",style:{marginBottom:"var(--space-2)",gap:"var(--space-2)",flexWrap:"wrap"},children:[e.jsx("span",{className:"note-type-tag",children:((f=L.find(g=>g.value===d.tipo))==null?void 0:f.label)||d.tipo}),e.jsx("span",{className:"dose-meta",children:new Date(d.createdAt).toLocaleString("pt-BR")})]}),e.jsx("p",{className:"body-sm text-ink",children:d.texto}),e.jsxs("div",{className:"flex gap-2 no-print",style:{marginTop:"var(--space-3)"},children:[e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",disabled:h,onClick:()=>R(d),children:"Editar"}),e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",disabled:h,onClick:()=>W(d),children:"Excluir"})]})]},d.id)})})]})}function Ce(a,t){const i={day:"2-digit",month:"short"};return`${a.toLocaleDateString("pt-BR",i)} – ${t.toLocaleDateString("pt-BR",i)}`}function fa({summary:a}){const t=[{label:"Dias perfeitos",value:a.diasPerfeitos},{label:"Maior sequência",value:`${a.maiorSequencia} dias`},{label:"Suplemento mais negligenciado",value:a.suplementoNegligenciado?`${a.suplementoNegligenciado.nome} (${a.suplementoNegligenciado.taxaAdesao}%)`:"—"},{label:"Melhor horário de adesão",value:a.melhorHorario?`${a.melhorHorario.label} (${a.melhorHorario.rate}%)`:"—"},{label:"Período de maior consistência",value:a.periodoMaiorConsistencia?`${Ce(a.periodoMaiorConsistencia.start,a.periodoMaiorConsistencia.end)} (${a.periodoMaiorConsistencia.rate}%)`:"—"},{label:"Período de maior dificuldade",value:a.periodoMaiorDificuldade?`${Ce(a.periodoMaiorDificuldade.start,a.periodoMaiorDificuldade.end)} (${a.periodoMaiorDificuldade.rate}%)`:"—"}];return e.jsxs("div",{className:"surface surface-pad",children:[e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Resumo Clínico"}),e.jsx("div",{className:"summary-grid",children:t.map(i=>e.jsxs("div",{children:[e.jsx("div",{className:"summary-item-label",children:i.label}),e.jsx("div",{className:"summary-item-value",children:i.value})]},i.label))})]})}function xa(a){return a===null?"var(--surface-sunken)":a>=80?"var(--success)":a>=50?"var(--warning)":"var(--danger)"}function ga({map:a}){return e.jsxs("div",{className:"surface surface-pad",children:[e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Mapa de Consistência"}),a.periods.map(t=>e.jsxs("div",{className:"consistency-row",children:[e.jsx("span",{className:"consistency-label",children:t.label}),e.jsx("span",{className:"consistency-track",children:e.jsx("span",{className:"consistency-fill",style:{width:`${t.rate??0}%`,backgroundColor:xa(t.rate)}})}),e.jsx("span",{className:"consistency-value",children:t.rate===null?"—":`${t.rate}%`})]},t.key)),a.worst&&e.jsxs("p",{className:"body-sm",style:{marginTop:"var(--space-3)"},children:["Maior dificuldade no período da ",e.jsx("strong",{className:"text-ink",children:a.worst.label.toLowerCase()})," (",a.worst.rate,"% de adesão)."]})]})}function ba({days:a}){return e.jsx("div",{className:"heatmap-strip-large",children:a.map(t=>e.jsx("div",{className:`heatmap-square ${t.visualStatus}`,title:`Dia ${t.dayNumber} — ${t.date.toLocaleDateString("pt-BR")}`},t.date.toDateString()))})}function Ee(a,t){const i=(a||"").replace(/\D/g,""),c=`https://wa.me/${i.startsWith("55")?i:`55${i}`}`;return t?`${c}?text=${encodeURIComponent(t)}`:c}function va({patient:a,onEdit:t,onRelease:i,onAddNote:r}){const c=X(),o=a.nome.split(" ")[0],s=`Olá ${o}! Passando para lembrar de manter os check-ins do seu tratamento em dia. Qualquer dúvida, estamos por aqui. 🙂`,n=(y,$,v,h)=>async()=>{await c({title:y,description:$,confirmLabel:v})&&h()},l=n("Abrir WhatsApp",`Abrir uma conversa no WhatsApp com ${o}?`,"Abrir",()=>window.open(Ee(a.telefone),"_blank","noreferrer")),u=n("Editar paciente",`Abrir a edição do cadastro de ${o}?`,"Editar",t),p=n("Liberar edição retroativa",`Abrir a liberação de check-ins retroativos para ${o}?`,"Liberar",i),x=n("Adicionar observação",`Abrir o formulário de observação clínica para ${o}?`,"Adicionar",r),b=n("Enviar lembrete",`Abrir o WhatsApp com uma mensagem de lembrete pronta para ${o}?`,"Abrir",()=>window.open(Ee(a.telefone,s),"_blank","noreferrer"));return e.jsxs("div",{className:"quick-actions quick-actions--column no-print",children:[e.jsx("button",{className:"btn btn-ghost quick-action-btn",onClick:l,children:"💬 WhatsApp"}),e.jsx("button",{className:"btn btn-ghost quick-action-btn",onClick:u,children:"✎ Editar paciente"}),e.jsx("button",{className:"btn btn-ghost quick-action-btn",onClick:p,children:"🔓 Liberar edição"}),e.jsx("button",{className:"btn btn-ghost quick-action-btn",onClick:x,children:"📝 Adicionar observação"}),e.jsx("button",{className:"btn btn-ghost quick-action-btn",onClick:b,children:"🔔 Enviar lembrete"})]})}const ja={"Muito Baixo":"success",Baixo:"success",Moderado:"warning",Alto:"danger",Crítico:"danger"};function Na({risk:a}){const t=ja[a.classification]||"warning";return e.jsxs("div",{className:"surface surface-pad",children:[e.jsxs("div",{className:"flex items-center justify-between",style:{marginBottom:"var(--space-4)"},children:[e.jsx("h2",{className:"display-sm",children:"Risco de Baixa Adesão"}),e.jsx("span",{className:`risk-badge risk-badge--${t}`,children:a.classification})]}),e.jsx("div",{className:"flex flex-col gap-2",children:a.factors.map(i=>e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"body-sm",children:i.label}),e.jsx("span",{className:"dose-meta",children:i.detail})]},i.label))})]})}function ya({tabs:a,active:t,onChange:i}){return e.jsx("div",{className:"tab-bar no-print",role:"tablist",children:a.map(r=>e.jsx("button",{role:"tab","aria-selected":t===r.value,className:`tab-item${t===r.value?" active":""}`,onClick:()=>i(r.value),children:r.label},r.value))})}function Sa({weeks:a}){return a.length===0?e.jsx("p",{className:"empty-state",children:"Sem semanas completas ainda."}):e.jsx("div",{className:"heatmap-strip",children:a.map(t=>e.jsxs("div",{className:"surface metric-card",style:{minWidth:120,flexShrink:0,textAlign:"center"},children:[e.jsxs("div",{className:"eyebrow",children:["Semana ",t.weekNumber]}),e.jsxs("div",{className:"metric-value",style:{marginTop:"var(--space-2)"},children:[t.rate,"%"]})]},t.weekNumber))})}function ka({pacienteId:a,dataInicio:t,dataFim:i,protocoloNome:r}){const{showError:c,showToast:o}=me(),s=X(),[n,l]=m.useState([]),[u,p]=m.useState(!0),[x,b]=m.useState(null),[y,$]=m.useState(se),[v,h]=m.useState(!1),[T,D]=m.useState(se),[C,L]=m.useState(!1),I=()=>{const d=new Date;return{dataInicio:new Date(d.getFullYear(),d.getMonth(),d.getDate()-1).toISOString(),dataFim:new Date(d.getFullYear(),d.getMonth()+1,d.getDate()).toISOString()}},B=async({force:d=!1}={})=>{if(a){p(!0);try{const f=I(),g=await Ie(a,f.dataInicio,f.dataFim,{force:d});l(g.historicoAgrupadoPorSuplemento||[])}catch(f){c(f.message)}finally{p(!1)}}};m.useEffect(()=>{B()},[a]);const w=d=>{b(d.suplementoId),$(oa(d))},E=async()=>{Qe(a),await B({force:!0})},R=async()=>{const d=Ae(y,c);if(d&&!(d.alterarPassado&&!await s({title:"Alterar o passado",description:"Isso pode criar faltas no passado. Continuar?",confirmLabel:"Continuar",danger:!0}))){L(!0);try{const f=await O.call("editarSuplemento",{suplementoId:x,...d}),g=Number(f==null?void 0:f.lembretesGerados)||0,P=Number(f==null?void 0:f.checkinsGerados)||0,V=Number(f==null?void 0:f.xpEstornado)||0,G=Array.isArray(f==null?void 0:f.dosesResetHoje)?f.dosesResetHoje:[],_=Array.isArray(f==null?void 0:f.horariosNovos)?f.horariosNovos.join(", "):"",Z=G.length>0?G.map(U=>`${U.status} ${U.horario}`).join(", "):"nenhuma dose marcada hoje";f!=null&&f.alterarPassado?o({message:`Agenda no passado + hoje resetado (${Z}). Nova: ${_||"—"}. XP estornado: ${V}. ${P} pendente(s) · ${g} lembrete(s). Nota automática no prontuário. Avise a paciente.`}):o({message:`Hoje resetado (${Z}). Nova agenda: ${_||"—"}. XP estornado: ${V}. Passado mantido · ${P} pendente(s) · ${g} lembrete(s). Nota automática no prontuário. Avise a paciente.`}),b(null),await E()}catch(f){c(f.message)}finally{L(!1)}}},j=async d=>{if(await s({title:"Remover suplemento",description:`Remover "${d.nome}" do protocolo deste paciente?`,confirmLabel:"Remover",danger:!0})){L(!0);try{const g=await O.call("removerSuplemento",{suplementoId:d.suplementoId});if(g!=null&&g.alreadyRemoved)o({message:"Suplemento já havia sido removido."});else{const P=Number(g==null?void 0:g.xpEstornado)||0;o({message:P>0?`Suplemento removido. XP estornado: ${P}.`:"Suplemento removido."})}await E()}catch(g){c(g.message)}finally{L(!1)}}},W=async()=>{const d=Ae(T,c);if(!d)return;const{alterarPassado:f,...g}=d;L(!0);try{const P=await O.call("adicionarSuplemento",{pacienteId:a,...g}),V=Number(P==null?void 0:P.lembretesGerados)||0,G=Number(P==null?void 0:P.checkinsGerados)||0;o({message:`Suplemento adicionado · ${V} lembrete(s) · ${G} check-in(s).`}),h(!1),D(se),await E()}catch(P){c(P.message)}finally{L(!1)}};return e.jsxs("div",{style:{borderTop:"var(--hairline) solid var(--line)",paddingTop:"var(--space-5)",marginTop:"var(--space-5)"},children:[e.jsxs("div",{className:"flex items-center justify-between",style:{marginBottom:"var(--space-3)"},children:[e.jsx("h3",{className:"eyebrow",children:"Suplementos e horários"}),!v&&e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",disabled:C,onClick:()=>h(!0),children:"+ Adicionar"})]}),u?e.jsx("div",{className:"skeleton",style:{height:48}}):n.length===0&&!v?e.jsx("p",{className:"body-sm",children:"Nenhum suplemento cadastrado."}):e.jsx("div",{className:"flex flex-col gap-3",children:n.map(d=>x===d.suplementoId?e.jsxs("div",{className:"surface surface-pad",children:[e.jsx(ke,{draft:y,onChange:$,dataInicio:t,dataFim:i,protocoloNome:r,showAlterarPassado:!0}),e.jsxs("div",{className:"flex gap-2 justify-end",children:[e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",disabled:C,onClick:()=>b(null),children:"Cancelar"}),e.jsx("button",{type:"button",className:"btn btn-fill btn-sm",disabled:C,onClick:R,children:C?e.jsx("span",{className:"spinner"}):"Salvar suplemento"})]})]},d.suplementoId):e.jsxs("div",{className:"list-row",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"dose-name",children:[d.nome," — ",d.dosagem]}),e.jsx("div",{className:"dose-meta",children:(d.horarios||[]).join(", ")})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",disabled:C,onClick:()=>w(d),children:"Editar"}),e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",disabled:C,onClick:()=>j(d),children:"Remover"})]})]},d.suplementoId))}),v&&e.jsxs("div",{className:"surface surface-pad",style:{marginTop:"var(--space-3)"},children:[e.jsx(ke,{draft:T,onChange:D,dataInicio:t,dataFim:i,protocoloNome:r}),e.jsxs("div",{className:"flex gap-2 justify-end",children:[e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm",disabled:C,onClick:()=>{h(!1),D(se)},children:"Cancelar"}),e.jsx("button",{type:"button",className:"btn btn-fill btn-sm",disabled:C,onClick:W,children:"Adicionar"})]})]})]})}const Aa={id:"",nome:"",email:"",telefone:"",dataInicio:"",dataFim:"",status:"ATIVO",protocoloNome:"Melasma",novaSenha:""};function wa({open:a,patient:t,onClose:i,onSave:r,onDelete:c}){const o=X(),[s,n]=m.useState(Aa),[l,u]=m.useState(!1),[p,x]=m.useState(!1);m.useEffect(()=>{t&&(n({id:t.id,nome:t.nome,email:t.email,telefone:t.telefone,dataInicio:Ne(t.dataInicio),dataFim:Ne(t.dataFim),status:t.status,protocoloNome:t.protocoloNome||"Melasma",novaSenha:""}),x(!1),u(!1))},[t]);const b=l||p,y=async()=>{if(b)return;await o({title:"Descartar alterações",description:"Suas edições não salvas serão perdidas.",confirmLabel:"Descartar",danger:!0})&&i()},$=async h=>{if(h.preventDefault(),!(b||!await o({title:"Salvar cadastro",description:`Confirma as alterações no cadastro de ${s.nome}? (Horários de suplementos são salvos à parte, em cada suplemento.)`,confirmLabel:"Salvar cadastro"}))){u(!0);try{await r({pacienteId:s.id,nome:s.nome,email:s.email,telefone:s.telefone,status:s.status,dataInicio:ye(s.dataInicio),dataFim:ye(s.dataFim),senha:s.novaSenha||null,protocoloNome:s.protocoloNome})}finally{u(!1)}}},v=async()=>{if(!(b||!await o({title:"Excluir conta",description:`Excluir permanentemente a conta de ${s.nome}? Serão apagados do banco todos os dados dessa conta (protocolo, suplementos, check-ins, lembretes, sessões, push, liberações e observações). Esta ação não pode ser desfeita.`,confirmLabel:"Excluir tudo",danger:!0}))){x(!0);try{await c(s.id)}finally{x(!1)}}};return t?e.jsxs(ue,{open:a,onClose:y,title:"Gerenciar paciente",children:[e.jsxs("form",{onSubmit:$,children:[e.jsxs("fieldset",{disabled:b,style:{border:0,margin:0,padding:0,minInlineSize:0},children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Nome"}),e.jsx("input",{className:"field-input",required:!0,value:s.nome,onChange:h=>n({...s,nome:h.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"E-mail"}),e.jsx("input",{type:"email",className:"field-input",required:!0,value:s.email,onChange:h=>n({...s,email:h.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"WhatsApp"}),e.jsx("input",{type:"tel",className:"field-input",required:!0,value:s.telefone,onChange:h=>n({...s,telefone:h.target.value})})]}),e.jsxs("div",{className:"field-row",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Início"}),e.jsx("input",{type:"date",className:"field-input",required:!0,value:s.dataInicio,onChange:h=>n({...s,dataInicio:h.target.value})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Fim"}),e.jsx("input",{type:"date",className:"field-input",required:!0,value:s.dataFim,onChange:h=>n({...s,dataFim:h.target.value})})]})]}),e.jsxs("div",{className:"field-row",children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Status"}),e.jsxs("select",{className:"field-input",value:s.status,onChange:h=>n({...s,status:h.target.value}),children:[e.jsx("option",{value:"ATIVO",children:"Ativo"}),e.jsx("option",{value:"INATIVO",children:"Inativo"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Protocolo"}),e.jsxs("select",{className:"field-input",value:s.protocoloNome,onChange:h=>n({...s,protocoloNome:h.target.value}),children:[e.jsx("option",{value:"Melasma",children:"Melasma"}),e.jsx("option",{value:"Desinflamação",children:"Desinflamação"})]})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Nova senha (opcional)"}),e.jsx("input",{type:"password",className:"field-input",placeholder:"Deixe em branco para manter",value:s.novaSenha,onChange:h=>n({...s,novaSenha:h.target.value})})]})]}),e.jsxs("div",{className:"flex justify-between",style:{marginTop:"var(--space-5)"},children:[e.jsx("button",{type:"button",className:"btn btn-ghost btn-ghost-danger",disabled:b,onClick:v,children:p?e.jsx("span",{className:"spinner"}):"Excluir conta"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{type:"button",className:"btn btn-ghost",disabled:b,onClick:y,children:"Cancelar"}),e.jsx("button",{type:"submit",className:"btn btn-fill",disabled:b,children:l?e.jsx("span",{className:"spinner"}):"Salvar cadastro"})]})]}),p&&e.jsx("p",{className:"body-sm",style:{marginTop:"var(--space-3)"},children:"Excluindo conta e todos os dados relacionados… aguarde."})]}),e.jsx("div",{style:p?{pointerEvents:"none",opacity:.55}:void 0,children:e.jsx(ka,{pacienteId:s.id,dataInicio:s.dataInicio,dataFim:s.dataFim,protocoloNome:s.protocoloNome})})]}):null}const $a={CONCLUIDO:"✔ Tomou",ATRASADO:"✔ Tomou (atrasado)",PENDENTE:"✖ Não tomou"};function Da(a){return new Date(a).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}function Ca(){const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function Ea(a){const t=new Date(`${a}T00:00:00`),i=new Date(`${a}T00:00:00`);return i.setHours(23,59,59,999),{start:t,end:i}}function Ra({open:a,patientId:t,patientName:i,onClose:r,onSubmit:c}){const o=X(),[s,n]=m.useState(""),[l,u]=m.useState(""),[p,x]=m.useState(!1),[b,y]=m.useState({loading:!1,checkins:[],error:null});m.useEffect(()=>{a&&(n(""),u(""),y({loading:!1,checkins:[],error:null}))},[a,t]),m.useEffect(()=>{if(!s||!t){y({loading:!1,checkins:[],error:null});return}let v=!1;y({loading:!0,checkins:[],error:null});const{start:h,end:T}=Ea(s);return Ie(t,h.toISOString(),T.toISOString()).then(D=>{if(v)return;const C=new Map((D.historicoAgrupadoPorSuplemento||[]).map(I=>[I.suplementoId,I])),L=(D.rawCheckins||[]).map(I=>({...I,suplemento:C.get(I.suplementoId)}));y({loading:!1,checkins:L,error:null})}).catch(D=>{v||y({loading:!1,checkins:[],error:D.message})}),()=>{v=!0}},[s,t]);const $=async v=>{v.preventDefault();const h=new Date(`${s}T00:00:00`).toLocaleDateString("pt-BR");if(await o({title:"Confirmar autorização",description:`Deseja realmente liberar o registro retroativo do dia: ${h} para este paciente? Esta autorização expirará automaticamente em 24 horas.`,confirmLabel:"Confirmar"})){x(!0);try{await c({pacienteId:t,dataLiberada:new Date(`${s}T00:00:00`).toISOString(),motivo:l})}finally{x(!1)}}};return e.jsx(ue,{open:a,onClose:r,title:"Liberar retroativo",description:i?`Paciente: ${i}`:void 0,children:e.jsxs("form",{onSubmit:$,children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Data que será liberada"}),e.jsx("input",{type:"date",className:"field-input",required:!0,max:Ca(),value:s,onChange:v=>n(v.target.value)})]}),s&&e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Resumo dos suplementos deste dia"}),b.loading?e.jsx("div",{className:"skeleton",style:{height:40}}):b.error?e.jsxs("p",{className:"body-sm",children:["Não foi possível carregar o resumo: ",b.error]}):b.checkins.length===0?e.jsx("p",{className:"body-sm",children:"Nenhum suplemento prescrito neste dia."}):e.jsx("div",{className:"surface",style:{padding:"var(--space-3) var(--space-4)"},children:b.checkins.map(v=>{var h;return e.jsxs("div",{className:"day-detail-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"dose-name",children:((h=v.suplemento)==null?void 0:h.nome)||"Suplemento"}),e.jsx("div",{className:"dose-meta",children:Da(v.dataHoraPrescrita)})]}),e.jsx("span",{className:`chip ${v.status==="PENDENTE"?"chip-danger":v.status==="ATRASADO"?"chip-warning":"chip-success"}`,children:$a[v.status]||v.status})]},v.id)})})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{className:"field-label",children:"Motivo da liberação (opcional)"}),e.jsx("textarea",{className:"field-input",placeholder:"Ex: esqueceu de registrar a dose da manhã",value:l,onChange:v=>u(v.target.value)})]}),e.jsx("p",{className:"body-sm",style:{marginBottom:"var(--space-4)"},children:"Esta autorização expirará automaticamente em 24 horas."}),e.jsxs("div",{className:"flex gap-3 justify-end",children:[e.jsx("button",{type:"button",className:"btn btn-ghost",onClick:r,children:"Cancelar"}),e.jsx("button",{type:"submit",className:"btn btn-fill",disabled:p||!s,children:p?e.jsx("span",{className:"spinner"}):"Autorizar"})]})]})})}function Ta(a){if(a.length<2)return 0;const t=a.reduce((r,c)=>r+c,0)/a.length,i=a.reduce((r,c)=>r+(c-t)**2,0)/a.length;return Math.sqrt(i)}function La(a){const t=a.flatMap(i=>i.checkins).filter(i=>i.status!=="PENDENTE"&&i.dataHoraRealizada).sort((i,r)=>new Date(r.dataHoraRealizada)-new Date(i.dataHoraRealizada))[0];return t?Math.floor((new Date-new Date(t.dataHoraRealizada))/864e5):null}function Pa(a,t,i){const r=a,c=Oe(t).map(x=>x.rate),o=c.length<2?100:Math.max(0,100-Math.min(100,Ta(c)*2)),s=(i==null?void 0:i.streakAtual)??0,n=(i==null?void 0:i.maiorStreak)??0,l=n>0?Math.min(100,s/n*100):s>0?100:0,u=Math.round(r*.6+o*.25+l*.15);let p;return u>=90?p="Excelente":u>=75?p="Boa":u>=60?p="Moderada":u>=40?p="Baixa":p="Crítica",{value:u,classification:p,breakdown:[{label:"Adesão geral",value:Math.round(r),weight:60},{label:"Consistência semanal",value:Math.round(o),weight:25},{label:"Sequência",value:Math.round(l),weight:15}]}}function Ia(a,t){const i=a.filter(y=>y.status!=="future"&&y.status!=="idle"),r=i.filter(re).length,c=i.length>0?r/i.length:0,o=(t==null?void 0:t.streakAtual)??0,s=La(a),n=i.slice(-7),l=n.reduce((y,$)=>y+$.checkins.length,0),u=n.reduce((y,$)=>y+$.checkins.filter(v=>v.status==="CONCLUIDO"||v.status==="ATRASADO").length,0),p=Math.round(c*40+(o===0?20:0)+Math.min(30,(s??0)*5)+(l>0&&u<l*.5?10:0)),x=Math.max(0,Math.min(100,p));let b;return x<20?b="Muito Baixo":x<40?b="Baixo":x<60?b="Moderado":x<80?b="Alto":b="Crítico",{value:x,classification:b,factors:[{label:"Dias perdidos no período",detail:`${r} de ${i.length} dias`},{label:"Sequência atual",detail:o===0?"Sem sequência ativa":`${o} dias seguidos`},{label:"Última atividade",detail:s===null?"Sem registros":`há ${s} dia(s)`},{label:"Check-ins últimos 7 dias",detail:l>0?`${u}/${l}`:"Sem doses no período"}]}}const Oa={manha:"Manhã",tarde:"Tarde",noite:"Noite"};function Ma(a){return a>=5&&a<12?"manha":a>=12&&a<18?"tarde":"noite"}function Ba(a){const t={manha:{prescribed:0,done:0},tarde:{prescribed:0,done:0},noite:{prescribed:0,done:0}};for(const s of a)if(s.status!=="future")for(const n of s.checkins){const l=Ma(new Date(n.dataHoraPrescrita).getHours());t[l].prescribed++,(n.status==="CONCLUIDO"||n.status==="ATRASADO")&&t[l].done++}const i=Object.entries(t).map(([s,n])=>({key:s,label:Oa[s],prescribed:n.prescribed,rate:n.prescribed>0?Math.round(n.done/n.prescribed*100):null})),r=i.filter(s=>s.rate!==null),c=r.length?r.reduce((s,n)=>n.rate>s.rate?n:s):null,o=r.length?r.reduce((s,n)=>n.rate<s.rate?n:s):null;return{periods:i,best:c,worst:o}}function Fa(a){const t=a.filter(c=>c.status!=="future");if(t.length<7)return{best:null,worst:null};let i=null,r=null;for(let c=0;c<=t.length-7;c++){const o=t.slice(c,c+7),s=o.reduce((p,x)=>p+x.checkins.length,0);if(s===0)continue;const n=o.reduce((p,x)=>p+x.checkins.filter(b=>b.status==="CONCLUIDO"||b.status==="ATRASADO").length,0),l=Math.round(n/s*100),u={rate:l,start:o[0].date,end:o[6].date};(!i||l>i.rate)&&(i=u),(!r||l<r.rate)&&(r=u)}return{best:i,worst:r}}function za(a,t,i,r){const c=a.filter(p=>p.status==="completed").length,o=(i==null?void 0:i.maiorStreak)??0,s=(t||[]).filter(p=>p.prescrito>0),n=s.length?s.reduce((p,x)=>x.taxaAdesao<p.taxaAdesao?x:p):null,{best:l,worst:u}=Fa(a);return{diasPerfeitos:c,maiorSequencia:o,suplementoNegligenciado:n,melhorHorario:r.best,periodoMaiorConsistencia:l,periodoMaiorDificuldade:u}}function Ha(a,t,i){const r=new Map;for(const o of t||[]){const s=new Date(o.createdAt).toDateString();r.has(s)||r.set(s,[]),r.get(s).push({kind:"nota",...o})}const c=new Map;for(const o of i||[]){const s=new Date(o.concedidaEm).toDateString();c.has(s)||c.set(s,[]),c.get(s).push({kind:"permissao",...o})}return a.map((o,s)=>{const n=o.date.toDateString(),l=[...r.get(n)||[],...c.get(n)||[]],u=a[s-1];return u&&re(o)&&(u.status==="completed"||u.status==="partial")&&l.push({kind:"quebra",texto:"Quebra de sequência — nenhum check-in registrado após um período de adesão."}),{...o,events:l}})}const Me={CONCLUIDO:"Concluído no horário",ATRASADO:"Concluído fora da janela",PENDENTE:"Não realizado"},Re={7:"Últimos 7 dias",15:"Últimos 15 dias",30:"Últimos 30 dias",all:"Todo o tratamento"};function Te(a){return String(a).padStart(2,"0")}function ae(a){if(!a)return"—";const t=a instanceof Date?a:new Date(a);return Number.isNaN(t.getTime())?"—":`${Te(t.getHours())}:${Te(t.getMinutes())}`}function qa(a){if(!a)return"—";const t=a instanceof Date?a:new Date(a);return Number.isNaN(t.getTime())?"—":`${t.toLocaleDateString("pt-BR")} ${ae(t)}`}function N(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function k(a){return`"${(a==null?"":String(a)).replace(/"/g,'""')}"`}function Ua(a){return String(a||"paciente").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase().slice(0,60)||"paciente"}function Wa(a,t){const i=URL.createObjectURL(a),r=document.createElement("a");r.href=i,r.download=t,r.rel="noopener",document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function Le(a){return new Promise(t=>setTimeout(t,a))}function Va({patient:a,dashboard:t,days:i=[],filter:r="all",treatmentStats:c=null,adherenceIndex:o=null,clinicalSummary:s=null,consistencyMap:n=null,weeklyEvolution:l=[],periodStart:u=null,periodEnd:p=null}={}){var D,C,L,I,B;if(!a)throw new Error("Paciente ausente para exportação.");if(!t)throw new Error("Aguarde o carregamento dos dados antes de exportar.");const x=new Date,b=(t.totalConsumido||0)+(t.totalAtrasado||0),y=i.filter(w=>w.status==="completed").length,$=i.filter(re).length,v=i.filter(w=>w.status==="partial").length,h=[];for(const w of i)for(const E of w.checkins||[])h.push({dayNumber:w.dayNumber,date:w.date,dateLabel:w.date.toLocaleDateString("pt-BR"),suplemento:((D=E.suplemento)==null?void 0:D.nome)||"—",dosagem:((C=E.suplemento)==null?void 0:C.dosagem)||"",prescrita:E.dataHoraPrescrita,realizada:E.dataHoraRealizada,status:E.status,statusLabel:Me[E.status]||E.status});const T=(t.historicoAgrupadoPorSuplemento||[]).map(w=>({nome:w.nome,prescrito:w.prescrito??0,consumido:w.consumido??0,atrasado:w.atrasado??0,perdido:w.perdido??0,taxaAdesao:w.taxaAdesao??0}));return{clinicName:"Nicole Carvalho",clinicTagline:"Nutrição Integrativa",reportTitle:"Relatório de Acompanhamento do Tratamento",patient:{id:a.id,nome:a.nome,email:a.email||"",telefone:a.telefone||"",protocoloNome:a.protocoloNome||"Protocolo não definido",dataInicio:a.dataInicio,dataFim:a.dataFim},filter:r,filterLabel:Re[r]||Re.all,periodStart:u,periodEnd:p,periodLabel:u&&p?`${q(u)} a ${q(p)}`:`${q(a.dataInicio)} a ${q(a.dataFim)}`,generatedAt:x,generatedAtLabel:qa(x),treatmentStats:c,metrics:{adesaoGeral:t.taxaAdesaoGeral??0,checkinsRealizados:b,totalPrescrito:t.totalPrescrito??0,perfectDays:y,failedDays:$,partialDays:v,streakAtual:((L=t.gamificacao)==null?void 0:L.streakAtual)??0,maiorStreak:((I=t.gamificacao)==null?void 0:I.maiorStreak)??0,xpTotal:((B=t.gamificacao)==null?void 0:B.xpTotal)??0},adherenceIndex:o,clinicalSummary:s,consistencyMap:n,weeklyEvolution:l,bySupplement:T,checkinRows:h,days:i}}function Ga(a){var c;const t=[];t.push(["Relatório",a.reportTitle].map(k).join(",")),t.push(["Clínica",a.clinicName].map(k).join(",")),t.push(["Paciente",a.patient.nome].map(k).join(",")),t.push(["Protocolo",a.patient.protocoloNome].map(k).join(",")),t.push(["Tratamento",`${q(a.patient.dataInicio)} a ${q(a.patient.dataFim)}`].map(k).join(",")),t.push(["Período exportado",a.periodLabel].map(k).join(",")),t.push(["Filtro",a.filterLabel].map(k).join(",")),t.push(["Gerado em",a.generatedAtLabel].map(k).join(",")),t.push(""),t.push(["RESUMO"].map(k).join(",")),t.push(["Métrica","Valor"].map(k).join(",")),t.push(["Adesão geral (%)",a.metrics.adesaoGeral].map(k).join(",")),t.push(["Check-ins realizados",a.metrics.checkinsRealizados].map(k).join(",")),t.push(["Suplementos programados",a.metrics.totalPrescrito].map(k).join(",")),t.push(["Dias perfeitos",a.metrics.perfectDays].map(k).join(",")),t.push(["Dias parciais",a.metrics.partialDays].map(k).join(",")),t.push(["Dias com falhas",a.metrics.failedDays].map(k).join(",")),t.push(["Sequência atual (dias)",a.metrics.streakAtual].map(k).join(",")),t.push(["Maior sequência (dias)",a.metrics.maiorStreak].map(k).join(",")),a.adherenceIndex&&t.push(["Índice de adesão",`${a.adherenceIndex.value} (${a.adherenceIndex.classification})`].map(k).join(",")),a.treatmentStats&&(t.push(["Dias decorridos do tratamento",a.treatmentStats.elapsed].map(k).join(",")),t.push(["Dias restantes",a.treatmentStats.remaining].map(k).join(",")),t.push(["Progresso do tratamento (%)",a.treatmentStats.percent].map(k).join(","))),t.push(""),t.push(["ADESÃO POR SUPLEMENTO"].map(k).join(",")),t.push(["Suplemento","Programados","No horário","Fora da janela","Não realizados","Adesão (%)"].map(k).join(","));for(const o of a.bySupplement)t.push([o.nome,o.prescrito,o.consumido,o.atrasado,o.perdido,o.taxaAdesao].map(k).join(","));if(t.push(""),(c=a.weeklyEvolution)!=null&&c.length){t.push(["EVOLUÇÃO SEMANAL"].map(k).join(",")),t.push(["Semana","Adesão (%)"].map(k).join(","));for(const o of a.weeklyEvolution)t.push([`Semana ${o.weekNumber}`,Math.round(o.rate)].map(k).join(","));t.push("")}t.push(["DETALHE DOS CHECK-INS"].map(k).join(",")),t.push(["Dia do tratamento","Data","Suplemento","Dosagem","Horário previsto","Horário realizado","Status","Status (descrição)"].map(k).join(","));for(const o of a.checkinRows)t.push([o.dayNumber,o.dateLabel,o.suplemento,o.dosagem,ae(o.prescrita),o.realizada?ae(o.realizada):"",o.status,o.statusLabel].map(k).join(","));const i=`\uFEFF${t.join(`\r
`)}`,r=`relatorio-${Ua(a.patient.nome)}-${a.generatedAt.toISOString().slice(0,10)}.csv`;return Wa(new Blob([i],{type:"text/csv;charset=utf-8"}),r),{filename:r,rowCount:a.checkinRows.length}}function F(a,t){return`<div class="metric"><div class="metric-value">${N(t)}</div><div class="metric-label">${N(a)}</div></div>`}function _a(a){const t=(a.weeklyEvolution||[]).map(s=>`<tr><td>Semana ${N(s.weekNumber)}</td><td class="num">${N(Math.round(s.rate))}%</td></tr>`).join(""),i=(a.bySupplement||[]).map(s=>`
      <tr>
        <td>${N(s.nome)}</td>
        <td class="num">${N(s.prescrito)}</td>
        <td class="num">${N(s.consumido)}</td>
        <td class="num">${N(s.atrasado)}</td>
        <td class="num">${N(s.perdido)}</td>
        <td class="num"><strong>${N(s.taxaAdesao)}%</strong></td>
      </tr>`).join(""),r=(a.days||[]).map(s=>{const n=(s.checkins||[]).map(l=>{var x;const u=Me[l.status]||l.status,p=l.status==="CONCLUIDO"?"ok":l.status==="ATRASADO"?"warn":"miss";return`
        <tr>
          <td>${N(((x=l.suplemento)==null?void 0:x.nome)||"—")}</td>
          <td class="num">${N(ae(l.dataHoraPrescrita))}</td>
          <td class="num">${N(l.dataHoraRealizada?ae(l.dataHoraRealizada):"—")}</td>
          <td><span class="pill pill-${p}">${N(u)}</span></td>
        </tr>`}).join("");return n?`
      <section class="day-block">
        <h3>Dia ${N(s.dayNumber)} · ${N(s.date.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}))}</h3>
        <table>
          <thead>
            <tr><th>Suplemento</th><th>Previsto</th><th>Realizado</th><th>Status</th></tr>
          </thead>
          <tbody>${n}</tbody>
        </table>
      </section>`:""}).join(""),c=a.treatmentStats?`
      <div class="metrics three">
        ${F("Dias decorridos",a.treatmentStats.elapsed)}
        ${F("Dias restantes",a.treatmentStats.remaining)}
        ${F("Progresso",`${a.treatmentStats.percent}%`)}
      </div>`:"",o=a.adherenceIndex?`<p class="lede">Índice de adesão: <strong>${N(a.adherenceIndex.value)}</strong> — ${N(a.adherenceIndex.classification)}.</p>`:"";return`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${N(a.reportTitle)} — ${N(a.patient.nome)}</title>
  <style>
    @page { size: A4; margin: 22mm 20mm 24mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 20px 16px 28px;
      color: #1a1a1a;
      background: #fff;
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet { max-width: 170mm; margin: 0 auto; width: 100%; }
    header.brand {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2.5px solid #1f4a3c;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }
    .brand-name {
      font-size: 18pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #1f4a3c;
      margin: 0;
    }
    .brand-tag {
      margin: 2px 0 0;
      font-size: 9pt;
      color: #5a6b64;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .doc-meta { text-align: right; font-size: 8.5pt; color: #5a6b64; }
    .doc-meta strong { display: block; color: #1a1a1a; font-size: 11pt; margin-bottom: 2px; }
    h1 {
      font-size: 15pt;
      margin: 0 0 6px;
      color: #1a1a1a;
      letter-spacing: -0.01em;
    }
    h2 {
      font-size: 11pt;
      margin: 22px 0 10px;
      padding-bottom: 4px;
      border-bottom: 1px solid #d7e0dc;
      color: #1f4a3c;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    h3 {
      font-size: 10pt;
      margin: 0 0 8px;
      color: #24352f;
      text-transform: capitalize;
    }
    .lede { margin: 0 0 14px; color: #3d4a45; }
    .id-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 24px;
      background: #f4f7f5;
      border: 1px solid #d7e0dc;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 16px;
    }
    .id-item label {
      display: block;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #5a6b64;
      margin-bottom: 2px;
    }
    .id-item div { font-weight: 600; color: #1a1a1a; }
    .metrics {
      display: grid;
      gap: 8px;
      margin: 12px 0 4px;
    }
    .metrics.four { grid-template-columns: repeat(4, 1fr); }
    .metrics.three { grid-template-columns: repeat(3, 1fr); }
    .metric {
      border: 1px solid #d7e0dc;
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
      background: #fff;
    }
    .metric-value {
      font-size: 16pt;
      font-weight: 700;
      color: #1f4a3c;
      line-height: 1.1;
    }
    .metric-label {
      margin-top: 4px;
      font-size: 7.5pt;
      color: #5a6b64;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
    }
    th, td {
      border-bottom: 1px solid #e4ebe7;
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #eef3f0;
      color: #24352f;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 700;
    }
    td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
    .day-block {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 8pt;
      font-weight: 600;
    }
    .pill-ok { background: #e5f4ea; color: #1b6b3a; }
    .pill-warn { background: #fff3d6; color: #8a5b00; }
    .pill-miss { background: #fde8e8; color: #9b1c1c; }
    footer {
      margin-top: 28px;
      padding-top: 10px;
      border-top: 1px solid #d7e0dc;
      font-size: 8pt;
      color: #5a6b64;
    }
    footer .row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    .note {
      margin-top: 8px;
      font-style: italic;
    }
    @media (max-width: 720px) {
      body { padding: 16px 12px 24px; }
      .id-grid { grid-template-columns: 1fr; }
      .metrics.four, .metrics.three { grid-template-columns: 1fr 1fr; }
      header.brand { flex-direction: column; align-items: flex-start; gap: 8px; }
      .doc-meta { text-align: left; }
    }
    @media (max-width: 420px) {
      .metrics.four, .metrics.three { grid-template-columns: 1fr; }
    }
    @media print {
      body { margin: 0; padding: 0; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <header class="brand">
      <div>
        <p class="brand-name">${N(a.clinicName)}</p>
        <p class="brand-tag">${N(a.clinicTagline)}</p>
      </div>
      <div class="doc-meta">
        <strong>Relatório clínico</strong>
        Emitido em ${N(a.generatedAtLabel)}
      </div>
    </header>

    <h1>${N(a.reportTitle)}</h1>
    <p class="lede">Documento preparado para acompanhamento do paciente. Período: <strong>${N(a.periodLabel)}</strong> (${N(a.filterLabel)}).</p>
    ${o}

    <h2>Identificação</h2>
    <div class="id-grid">
      <div class="id-item"><label>Paciente</label><div>${N(a.patient.nome)}</div></div>
      <div class="id-item"><label>Protocolo</label><div>${N(a.patient.protocoloNome)}</div></div>
      <div class="id-item"><label>Início do tratamento</label><div>${N(q(a.patient.dataInicio))}</div></div>
      <div class="id-item"><label>Término previsto</label><div>${N(q(a.patient.dataFim))}</div></div>
    </div>
    ${c}

    <h2>Resumo de adesão</h2>
    <div class="metrics four">
      ${F("Adesão geral",`${a.metrics.adesaoGeral}%`)}
      ${F("Check-ins feitos",a.metrics.checkinsRealizados)}
      ${F("Dias perfeitos",a.metrics.perfectDays)}
      ${F("Sequência atual",`${a.metrics.streakAtual}d`)}
    </div>
    <div class="metrics four" style="margin-top:8px">
      ${F("Programados",a.metrics.totalPrescrito)}
      ${F("Dias com falhas",a.metrics.failedDays)}
      ${F("Dias parciais",a.metrics.partialDays)}
      ${F("Maior sequência",`${a.metrics.maiorStreak}d`)}
    </div>

    <h2>Adesão por suplemento</h2>
    <table>
      <thead>
        <tr>
          <th>Suplemento</th>
          <th class="num">Programados</th>
          <th class="num">No horário</th>
          <th class="num">Fora da janela</th>
          <th class="num">Não feitos</th>
          <th class="num">Adesão</th>
        </tr>
      </thead>
      <tbody>
        ${i||'<tr><td colspan="6">Sem suplementos no período.</td></tr>'}
      </tbody>
    </table>

    ${t?`
    <h2>Evolução semanal</h2>
    <table>
      <thead><tr><th>Semana</th><th class="num">Adesão</th></tr></thead>
      <tbody>${t}</tbody>
    </table>`:""}

    <h2>Histórico detalhado</h2>
    ${r||'<p class="lede">Nenhum check-in no período selecionado.</p>'}

    <footer>
      <div class="row">
        <div>${N(a.clinicName)} · ${N(a.clinicTagline)}</div>
        <div>Paciente: ${N(a.patient.nome)}</div>
      </div>
      <p class="note">Este relatório reflete os registros do aplicativo no momento da emissão. Em caso de dúvida sobre horários ou doses, fale com sua nutricionista.</p>
    </footer>
  </div>
</body>
</html>`}async function Ka(a,{settleMs:t=420,whatsappPhone:i=""}={}){await Le(t);const r=_a(a),c=new Blob([r],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(c),s=window.open(o,"_blank","width=920,height=1100");if(!s)throw URL.revokeObjectURL(o),new Error("O navegador bloqueou a janela do relatório. Permita pop-ups para este site e tente novamente.");await Le(400);try{Xa(s,a,i)}catch{}try{s.focus()}catch{}return setTimeout(()=>URL.revokeObjectURL(o),12e4),{ok:!0,blobUrl:o}}function Ya(a){const t=String(a||"").replace(/\D/g,"");return t?t.startsWith("55")?t:t.length>=10&&t.length<=11?`55${t}`:t:""}function Qa(a){return[`*${a.clinicName}* — Relatório de acompanhamento`,"",`Paciente: ${a.patient.nome}`,`Protocolo: ${a.patient.protocoloNome}`,`Período: ${a.periodLabel}`,"",`Adesão geral: ${a.metrics.adesaoGeral}%`,`Check-ins realizados: ${a.metrics.checkinsRealizados}/${a.metrics.totalPrescrito}`,`Dias perfeitos: ${a.metrics.perfectDays}`,`Sequência atual: ${a.metrics.streakAtual} dias`,a.adherenceIndex?`Índice de adesão: ${a.adherenceIndex.value} (${a.adherenceIndex.classification})`:null,"","Relatório completo gerado no painel clínico. Qualquer dúvida, fale com sua nutricionista."].filter(Boolean).join(`
`)}function Xa(a,t,i){const r=a.document;if(!r||!r.body)return;const c=Ya(i||t.patient.telefone),o=encodeURIComponent(Qa(t)),s=c?`https://wa.me/${c}?text=${o}`:`https://wa.me/?text=${o}`,n=r.createElement("div");n.id="report-toolbar",n.innerHTML=`
    <style>
      #report-toolbar {
        position: sticky; top: 0; z-index: 9999;
        display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
        justify-content: flex-end;
        padding: 10px 14px;
        background: #1f4a3c; color: #fff;
        font-family: "Segoe UI", Arial, sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,.18);
      }
      #report-toolbar .hint {
        margin-right: auto; font-size: 12px; opacity: .9;
      }
      #report-toolbar button, #report-toolbar a.btn {
        appearance: none; border: 0; cursor: pointer;
        background: #fff; color: #1f4a3c; font-weight: 600;
        font-size: 12px; padding: 8px 12px; border-radius: 6px;
        text-decoration: none; display: inline-flex; align-items: center;
      }
      #report-toolbar a.btn.wa { background: #25D366; color: #053b1d; }
      @media print { #report-toolbar { display: none !important; } }
    </style>
    <span class="hint">Relatório pronto — imprima / salve em PDF ou envie pelo WhatsApp</span>
    <button type="button" id="btn-print-pdf">Salvar / Imprimir PDF</button>
    <a class="btn wa" id="btn-wa" href="${s}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
  `,r.body.insertBefore(n,r.body.firstChild);const l=r.getElementById("btn-print-pdf");l&&l.addEventListener("click",()=>{try{a.focus(),a.print()}catch{}})}const Pe=[{value:"7",label:"7 dias"},{value:"15",label:"15 dias"},{value:"30",label:"30 dias"},{value:"all",label:"Todo o tratamento"}],Za=[{value:"geral",label:"Visão Geral"},{value:"clinico",label:"Histórico Clínico"},{value:"intervencoes",label:"Intervenções"}];function Ja(a){return a>=80?{cls:"ok",label:"Em dia"}:a>=60?{cls:"warning",label:"Atenção"}:{cls:"danger",label:"Atrasado"}}function ot(){var xe,ge,be,ve;const{pacienteId:a}=_e(),t=Ke(),i=Ye(),{setThemeClass:r}=Xe(),{showToast:c,showError:o}=me(),s=X(),[n,l]=m.useState(((xe=t.state)==null?void 0:xe.patient)||null),[u,p]=m.useState(!((ge=t.state)!=null&&ge.patient)),[x,b]=m.useState("all"),[y,$]=m.useState("geral"),[v,h]=m.useState([]),[T,D]=m.useState([]),[C,L]=m.useState(!1),[I,B]=m.useState(!1),[w,E]=m.useState(!1);m.useEffect(()=>{window.scrollTo(0,0)},[a]),m.useEffect(()=>{n||O.call("listarPacientes").then(S=>l(S.find(A=>A.id===a)||null)).finally(()=>p(!1))},[a,n]),m.useEffect(()=>(r(n?Ze(n.protocoloNome):""),()=>r("")),[n,r]);const R=m.useMemo(()=>{if(!n)return null;const S=Se(n.dataInicio),A=Se(n.dataFim);if(!S||!A)return null;const M=new Date;if(M.setHours(23,59,59,999),x==="all"){const je=new Date(A.getTime());return je.setHours(23,59,59,999),{start:S,end:je}}const ce=Number(x),te=new Date(Math.max(S.getTime(),M.getTime()-(ce-1)*864e5));te.setHours(0,0,0,0);const de=new Date(Math.min(A.getTime(),M.getTime()));return de.setHours(23,59,59,999),{start:te,end:de<te?te:de}},[n,x]),{data:j,loading:W,error:d}=Je(R?R.start.toISOString():"",R?R.end.toISOString():"",n==null?void 0:n.id),f=()=>{n&&(O.call("listarObservacoesClinicas",{pacienteId:n.id}).then(h).catch(()=>h([])),O.call("listarLiberacoesRetroativas",{pacienteId:n.id}).then(D).catch(()=>D([])))};m.useEffect(f,[n]);const g=m.useMemo(()=>!j||!R||!n?[]:ea(j,n.dataInicio,R.start,R.end),[j,R,n]),P=m.useMemo(()=>Oe(g),[g]),V=m.useMemo(()=>aa(g,30),[g]),G=m.useMemo(()=>ta(g,j==null?void 0:j.gamificacao),[g,j]),_=m.useMemo(()=>j?Pa(j.taxaAdesaoGeral,g,j.gamificacao):null,[j,g]),Z=m.useMemo(()=>j?Ia(g,j.gamificacao):null,[j,g]),U=m.useMemo(()=>Ba(g),[g]),le=m.useMemo(()=>j?za(g,j.historicoAgrupadoPorSuplemento,j.gamificacao,U):null,[j,g,U]),pe=m.useMemo(()=>v.filter(S=>!ie.some(A=>A.value===S.tipo)),[v]),Be=m.useMemo(()=>Ha(g,pe,T),[g,pe,T]),J=m.useMemo(()=>n?sa(n.dataInicio,n.dataFim):null,[n]),Fe=g.filter(S=>S.status==="completed").length,ze=g.filter(re).length,K=!!(n&&j&&!W&&!d),he=()=>Va({patient:n,dashboard:j,days:g,filter:x,treatmentStats:J,adherenceIndex:_,clinicalSummary:le,consistencyMap:U,weeklyEvolution:P,periodStart:R==null?void 0:R.start,periodEnd:R==null?void 0:R.end}),He=async()=>{var A;if(!K){o("Aguarde o carregamento completo dos dados antes de exportar.");return}if(await s({title:"Exportar CSV",description:`Baixar o relatório estruturado de ${n.nome} (${((A=Pe.find(M=>M.value===x))==null?void 0:A.label)||"período atual"})? O arquivo abre corretamente no Excel.`,confirmLabel:"Baixar CSV"}))try{const M=Ga(he());c({message:`CSV gerado (${M.rowCount} check-ins).`})}catch(M){o(M.message||"Não foi possível gerar o CSV.")}},qe=async()=>{if(!K){o("Aguarde o carregamento completo dos dados antes de exportar.");return}if(await s({title:"Exportar PDF",description:`Abrir o relatório profissional de ${n.nome}? Você poderá salvar em PDF ou enviar pelo WhatsApp.`,confirmLabel:"Abrir relatório"}))try{await Ka(he(),{whatsappPhone:n.telefone||""}),c({message:"Relatório aberto. Use Salvar PDF ou WhatsApp na barra superior."})}catch(A){o(A.message||"Não foi possível gerar o PDF.")}},Ue=async S=>{try{const A=await O.call("editarPaciente",S);c({message:A!=null&&A.datasAjustadas?"Paciente atualizado. Datas do protocolo, check-ins e lembretes foram realinhados.":"Paciente atualizado."}),L(!1),l(M=>({...M,...S,id:M.id,dataInicio:(A==null?void 0:A.dataInicio)||S.dataInicio,dataFim:(A==null?void 0:A.dataFim)||S.dataFim}))}catch(A){throw o(`Erro ao salvar: ${A.message}`),A}},We=async()=>{try{await O.call("excluirPaciente",{pacienteId:n.id}),c({message:"Conta excluída. Todos os dados relacionados foram removidos."}),i("/admin")}catch(S){throw o(`Erro ao excluir: ${S.message}`),S}},Ve=async S=>{try{await O.call("liberarRetroativo",S),c({message:"Liberação concedida."}),B(!1),f()}catch(A){o(`Erro ao liberar: ${A.message}`)}},Ge=async S=>{const A=new Date(S.dataLiberada).toLocaleDateString("pt-BR");if(await s({title:"Revogar liberação",description:`Revogar a liberação do dia ${A}? O paciente não poderá mais registrar check-ins retroativos nessa data enquanto a janela estiver aberta.`,confirmLabel:"Revogar",danger:!0}))try{await O.call("revogarLiberacaoRetroativa",{liberacaoId:S.id}),c({message:"Liberação revogada."}),f()}catch(ce){o(`Erro ao revogar: ${ce.message}`)}};if(u)return e.jsx("div",{className:"skeleton",style:{height:200}});if(!n)return e.jsx("p",{className:"empty-state",children:"Paciente não encontrado."});const fe=Ja((j==null?void 0:j.taxaAdesaoGeral)??0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"page-hero",children:[e.jsx("button",{className:"back-link no-print",onClick:()=>i("/admin"),children:"← Voltar para pacientes"}),e.jsxs("header",{className:"flex items-center gap-4",style:{margin:"var(--space-5) 0 0",flexWrap:"wrap"},children:[e.jsx("div",{className:"avatar",children:n.nome.charAt(0).toUpperCase()}),e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("h1",{className:"display-sm",children:n.nome}),e.jsxs("p",{className:"body-sm",children:[n.protocoloNome||"Protocolo não definido"," · ",q(n.dataInicio)," a ",q(n.dataFim)]})]}),e.jsx("span",{className:`status-dot ${fe.cls}`,children:fe.label}),e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm no-print",onClick:He,disabled:!K,title:K?"Baixar relatório CSV":"Aguarde o carregamento dos dados",children:"Exportar CSV"}),e.jsx("button",{type:"button",className:"btn btn-ghost btn-sm no-print",onClick:qe,disabled:!K,title:K?"Gerar relatório PDF":"Aguarde o carregamento dos dados",children:"Exportar PDF"})]}),e.jsx("div",{style:{marginTop:"var(--space-6)"},children:e.jsx(va,{patient:n,onEdit:()=>L(!0),onRelease:()=>B(!0),onAddNote:()=>E(!0)})}),J&&e.jsxs("div",{className:"metric-grid no-print",style:{marginTop:"var(--space-6)"},children:[e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:J.elapsed}),e.jsx("div",{className:"metric-label",children:"Dias decorridos"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:J.remaining}),e.jsx("div",{className:"metric-label",children:"Dias restantes"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsxs("div",{className:"metric-value",children:[J.percent,"%"]}),e.jsx("div",{className:"metric-label",children:"Do tratamento concluído"})]})]})]}),e.jsx(ya,{tabs:Za,active:y,onChange:$}),e.jsx("div",{className:"filter-row no-print",style:{marginBottom:"var(--space-6)"},children:Pe.map(S=>e.jsx("button",{className:x===S.value?"btn btn-fill btn-sm":"btn btn-ghost btn-sm",onClick:()=>b(S.value),children:S.label},S.value))}),d?e.jsxs("p",{className:"empty-state",children:["Não foi possível carregar os dados: ",d.message]}):W?e.jsx("div",{className:"skeleton",style:{height:300}}):e.jsxs(e.Fragment,{children:[y==="geral"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex gap-4",style:{marginBottom:"var(--space-7)",flexWrap:"wrap",alignItems:"stretch"},children:[e.jsx("div",{style:{flex:"1 1 420px"},children:_&&e.jsx(ca,{index:_})}),e.jsx("div",{style:{flex:"1 1 280px"},children:Z&&e.jsx(Na,{risk:Z})})]}),le&&e.jsx("div",{style:{marginBottom:"var(--space-7)"},children:e.jsx(fa,{summary:le})}),e.jsx("div",{style:{marginBottom:"var(--space-7)"},children:e.jsx(ga,{map:U})}),e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Resumo geral"}),e.jsxs("div",{className:"metric-grid",style:{marginBottom:"var(--space-7)"},children:[e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:(j.totalConsumido||0)+(j.totalAtrasado||0)}),e.jsx("div",{className:"metric-label",children:"Check-ins realizados"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:j.totalPrescrito}),e.jsx("div",{className:"metric-label",children:"Suplementos programados"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsxs("div",{className:"metric-value",children:[j.taxaAdesaoGeral,"%"]}),e.jsx("div",{className:"metric-label",children:"Adesão"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:Fe}),e.jsx("div",{className:"metric-label",children:"Dias perfeitos"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:ze}),e.jsx("div",{className:"metric-label",children:"Dias com falhas"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:((be=j.gamificacao)==null?void 0:be.streakAtual)??0}),e.jsx("div",{className:"metric-label",children:"Sequência atual"})]}),e.jsxs("div",{className:"surface metric-card",children:[e.jsx("div",{className:"metric-value",children:((ve=j.gamificacao)==null?void 0:ve.maiorStreak)??0}),e.jsx("div",{className:"metric-label",children:"Maior sequência"})]})]}),e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Alertas"}),e.jsx("div",{style:{marginBottom:"var(--space-7)"},children:e.jsx(da,{alerts:G})}),e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Adesão — últimos 30 dias"}),e.jsx("div",{className:"surface surface-pad",style:{marginBottom:"var(--space-7)"},children:e.jsx(ia,{points:V})}),e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Mapa de calor"}),e.jsx("div",{className:"surface surface-pad",style:{marginBottom:"var(--space-7)"},children:e.jsx(ba,{days:g})}),e.jsx("h2",{className:"display-sm",style:{marginBottom:"var(--space-4)"},children:"Evolução semanal"}),e.jsx("div",{children:e.jsx(Sa,{weeks:P})})]}),y==="clinico"&&e.jsx("div",{className:"surface",style:{padding:"0 var(--space-4)"},children:e.jsx(ha,{days:Be,onRevokeLiberacao:Ge})}),y==="intervencoes"&&e.jsx("div",{className:"surface surface-pad",children:e.jsx(De,{pacienteId:n.id,tipoOptions:ie,filterTipos:ie.map(S=>S.value),emptyLabel:"Nenhuma intervenção registrada ainda.",onNotesChanged:f})})]}),e.jsx(wa,{open:C,patient:n,onClose:()=>L(!1),onSave:Ue,onDelete:We}),e.jsx(Ra,{open:I,patientId:n.id,patientName:n.nome,onClose:()=>B(!1),onSubmit:Ve}),e.jsx(ue,{open:w,onClose:()=>E(!1),title:"Adicionar observação clínica",children:e.jsx(De,{pacienteId:n.id,onNotesChanged:f})})]})}export{ot as default};
