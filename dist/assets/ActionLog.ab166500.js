import{_ as $,c as z,u as P,A as S,b as J,r as d,R as K,I as A,v as T,s as D,x as N,N as Q,O as X,d as Y,e as Z,U as ee,V as te,W as le,g as f,h as n,i,w as s,D as y,l as ae,n as L,o as r,F as B,C as R,G as p,p as oe}from"./index.78a19e89.js";/* empty css                     *//* empty css              *//* empty css               */const ne={class:"w-full h-full flex flex-col p-6"},ie={class:"w-full h-1/12 flex justify-start items-center"},se=oe(" Search"),re={class:"w-full h-11/12 flex flex-col justify-center items-center overflow-auto"},ue=["onClick"],ce={key:0,class:"flex flex-col"},de={key:1,class:"flex flex-col"},pe={key:2,class:"flex flex-col"},_e=n("span",null," - ",-1),fe=[_e],ve={class:"w-full h-1/12 flex justify-center items-center"},ge={__name:"ActionLog",setup(me){const F=z(),{fixPrefitList:U,fixLoading:g,tableRowClassName:j}=P(),{prefitList:C,originShowPath:I}=S(P()),{loginAdmin:V}=S(J()),m=d([]),k=d([]),h=d(1e3),v=d(null),w=d(),u=d(null),b=d(null),O=async()=>{v.value=null,k.value=A(w.value).filter(t=>h.value!==1e3?t.permissions===h.value:t).map(t=>({val:t._id,opt:t.name}))},q=async()=>{let t=null;if(v.value){g(!0),t=w.value.filter(l=>l._id===v.value)[0];let o=[];for(let l=0;l<t.action_log.length;l++){const a=t.action_log[l],x=o.findIndex(c=>c.path===a.detail.path);x===-1?o.push({path:a.detail.path,target:[a.detail.target]}):o[x].target.push(a.detail.target)}let _=[];for(let l=0;l<o.length;l++){const a=o[l];_=[..._,...(await T(a.path,D({tokenReq:V.value.account,token:N("cinoT"),limit:100,page:0,filter:{_id:a.target}}))).list]}for(let l=0;l<t.action_log.length;l++)t.action_log[l].detail.target=_.find(a=>a._id===t.action_log[l].detail.target);t.action_log=t.action_log.sort((l,a)=>new Date(a.time)-new Date(l.time)),g(!1)}u.value=t,u.value&&(b.value=u.value.action_log.slice(0,10))},G=t=>b.value=u.value.action_log.slice((t-1)*10,t*10),H=t=>F.push(`/configurationHub/${I.value.find(o=>o.name===t).path}`);return K(async()=>{g(!0),C.value.length||await U(),m.value=A(C.value),m.value=[{val:1e3,opt:"All"},...m.value],w.value=(await T("admin",D({tokenReq:V.value.account,token:N("cinoT"),limit:1e3,page:0,filter:{status:0}}))).list,k.value=A(w.value).map(t=>({val:t._id,opt:t.name})),g(!1)}),(t,o)=>{const _=Q,l=X,a=Y,x=Z,c=ee,M=te,W=le;return r(),f("div",ne,[n("header",ie,[i(a,{label:"Prefit :",style:{"margin-bottom":"30px",width:"20em"},class:"form-label"},{default:s(()=>[i(l,{modelValue:h.value,"onUpdate:modelValue":o[0]||(o[0]=e=>h.value=e),placeholder:"Select",onChange:O},{default:s(()=>[(r(!0),f(B,null,R(m.value,e=>(r(),y(_,{key:e.val,value:e.val,label:e.opt},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),i(a,{label:"Admin :",style:{"margin-bottom":"30px",width:"20em"},class:"form-label"},{default:s(()=>[i(l,{modelValue:v.value,"onUpdate:modelValue":o[1]||(o[1]=e=>v.value=e),placeholder:"Select"},{default:s(()=>[(r(!0),f(B,null,R(k.value,e=>(r(),y(_,{key:e.val,value:e.val,label:e.opt},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),i(x,{class:"mb-7",onClick:q},{default:s(()=>[se]),_:1})]),n("main",re,[b.value?(r(),y(M,{key:0,data:b.value,border:"","header-cell-style":{"text-align":"center"},"row-style":ae(j),height:"690"},{default:s(()=>[i(c,{align:"center",prop:"time",label:"Time",width:"250","show-overflow-tooltip":!0,sortable:""}),i(c,{align:"center",prop:"type",label:"Action",width:"150","show-overflow-tooltip":!0},{default:s(e=>[n("span",null,p(e.row.type==="E"?"Edit":e.row.type==="L"?"Download":"Add"),1)]),_:1}),i(c,{align:"center",prop:"detail.path",label:"Action Path",width:"150","show-overflow-tooltip":!0},{default:s(e=>[n("p",{class:"hover:text-blue-500 cursor-pointer",onClick:he=>{var E;return H((E=e.row.detail)==null?void 0:E.path)}},p(e.row.detail.path),9,ue)]),_:1}),i(c,{align:"center",prop:"detail.target",label:"Target",width:"250","show-overflow-tooltip":!0},{default:s(e=>[n("span",null,p(e.row.detail.target.name),1)]),_:1}),i(c,{align:"center",prop:"detail.target",label:"Detail","show-overflow-tooltip":!0},{default:s(e=>[e.row.type==="L"?(r(),f("div",ce,[n("span",null," Product : "+p(e.row.detail.product),1),n("span",null," Version : "+p(e.row.detail.target_version),1)])):e.row.type==="E"?(r(),f("div",de,[n("span",null,"Origin : "+p(e.row.detail.from),1),n("span",null,"New : "+p(e.row.detail.to),1)])):e.row.type==="A"?(r(),f("div",pe,fe)):L("v-if",!0)]),_:1})]),_:1},8,["data","row-style"])):L("v-if",!0),n("div",ve,[u.value?(r(),y(W,{key:0,background:"",layout:"prev, pager, next",total:u.value.action_log.length,"page-count":Math.ceil(u.value.action_log.length/10),onCurrentChange:G,"page-size":10},null,8,["total","page-count"])):L("v-if",!0)])])])}}},ke=$(ge,[["__file","/Users/erichong/Desktop/WFH/partner-portal/src/views/ActionLog.vue"]]);export{ke as default};