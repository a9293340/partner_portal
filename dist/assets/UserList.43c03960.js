import{_ as m,A as p,b as e,u as _,g as l,i as u,o as d}from"./index.4e1bca5f.js";import{E as h}from"./EditTable.9a70e7fe.js";/* empty css             *//* empty css              *//* empty css                     *//* empty css               */import"./dayjs.min.a2fdbd0c.js";const f={class:"user-list"},w={__name:"UserList",setup(y){const{loginAdmin:s}=p(e()),{getCreatorList:o}=_(),{loginAction:a}=e(),n=["name","company","account","password","email"],i=["permissions","status"],r=[{key:"name",width:150},{key:"company",width:150},{key:"email",width:210},{key:"account",width:150}],c=async t=>{await o(),t.account===s.value.account&&a(t)};return(t,g)=>(d(),l("div",f,[u(h,{"router-type":0,path:"admin",title:"Edit Admin","normal-keys":r,"has-remove":!1,"show-input":n,"show-select":i,onRow:c})]))}},b=m(w,[["__scopeId","data-v-99646f29"],["__file","/Users/erichong/Desktop/WFH/partner-portal/src/views/ConfigurationHub/UserList.vue"]]);export{b as default};
