webpackJsonp([0],{DX5Z:function(s,t){},GfL1:function(s,t){},NHnr:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("7+uW"),i={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{attrs:{id:"Home"}},[t("p",[this._v(this._s(this.title))]),this._v(" "),t("router-link",{attrs:{to:"/select"}},[t("button",[this._v("我懂了，来吧")])])],1)},staticRenderFns:[]};var o=e("VU/8")({name:"Home",data:function(){return{title:"想知道你有多鬼畜吗？"}},methods:{},computed:{}},i,!1,function(s){e("zL6E")},"data-v-6913602d",null).exports,a={name:"Select",data:function(){return{questionArray:[{question:"哪个对你来说是美好的下午？",picAurl:"./static/1a.jpg",picBurl:"./static/1b.jpg",bgColor:"#5b67b0",textColor:"#ffb400"},{question:"哪个对你来说是难忘的派对？",picAurl:"./static/2a.jpg",picBurl:"./static/2b.jpg",bgColor:"#4ca697",textColor:"#ffcc00"},{question:"一个惬意的周末应该怎样度过？",picAurl:"./static/3a.jpg",picBurl:"./static/3b.jpg",bgColor:"#ffd243",textColor:"#00b0ff"},{question:"在一个晴朗的冬日，你想去哪里走走？",picAurl:"./static/4a.jpg",picBurl:"./static/4b.jpg",bgColor:"#faa744",textColor:"#c10000"},{question:"你觉得哪个场景里的气氛更危险？",picAurl:"./static/5a.jpg",picBurl:"./static/5b.jpg",bgColor:"#76b447",textColor:"#ff8400"},{question:"你觉得谁更快乐？",picAurl:"./static/6a.jpg",picBurl:"./static/6b.jpg",bgColor:"#0c5eae",textColor:"#ffa000"},{question:"你觉得谁比较能打？",picAurl:"./static/7a.jpg",picBurl:"./static/7b.jpg",bgColor:"#67c3eb",textColor:"#ffc300"},{question:"你觉得谁见到的事情更严重？",picAurl:"./static/8a.jpg",picBurl:"./static/8b.jpg",bgColor:"#cb0b1b",textColor:"#00d2ff"}],answerArray:[],standard:6,scoreI:0,scoreS:0,scoreM:0,sectionA:"",sectionB:"",progress:1,result:{id:1,name:"鬼畜孩子"},dots:[]}},methods:{setValue:function(){this.$emit("getdata",this.questionArray)},next:function(){this.progress<8?(this.progress++,console.log("现在是第"+this.progress+"个问题，")):(this.$router.push({name:"result",params:{result:this.result}}),this.getResult(),alert(this.result.name))},countA:function(){var s="";switch(this.progress){case 1:this.scroeI+=2,s="I+2";break;case 2:this.scoreM+=1,s="M+1";break;case 3:this.scoreS+=3,s="S+3";break;case 4:this.scoreM+=1,s="M+1";break;case 5:this.scoreM+=3,s="M+3";break;case 6:this.scoreI+=2,s="I+2";break;case 7:this.scoreM+=1,s="M+1";break;case 8:this.scoreS+=2,s="S+2"}var t={};t.questionNo=this.progress,t.selection="A",t.status=s,this.answerArray.push(t),console.log("progress:"+this.progress+"--scoreI:"+this.scoreI+"--scoreS:"+this.scoreS+"--scoreM:"+this.scoreM)},countB:function(){var s="";switch(this.progress){case 1:this.scroeM+=1,s="M+1";break;case 2:this.scoreI+=2,s="I+2";break;case 3:this.scoreI+=1,s="I+1";break;case 4:this.scoreS+=3,s="S+3";break;case 5:this.scoreS+=2,s="S+2";break;case 6:this.scoreM+=5,s="M+5";break;case 7:this.scoreI+=1,s="I+1";break;case 8:this.scoreI+=4,s="I+4"}var t={};t.questionNo=this.progress,t.selection="A",t.status=s,this.answerArray.push(t),console.log("progress:"+this.progress+"--scoreI:"+this.scoreI+"--scoreS:"+this.scoreS+"--scoreM:"+this.scoreM)},getResult:function(){this.scoreI<=this.standard&&this.scoreM<=this.standard&&this.scoreS<=this.standard?(this.result.id=1,this.result.name="鬼畜孩子"):this.scoreI>this.standard&&this.scoreM<=this.standard&&this.scoreS<=this.standard?(this.result.id=1,this.result.name="鬼畜孩子"):this.scoreI<=this.standard&&this.scoreM>this.standard&&this.scoreS<=this.standard?(this.result.id=2,this.result.name="肤浅的鬼畜少年"):this.scoreI>this.standard&&this.scoreM>this.standard&&this.scoreS<=this.standard?(this.result.id=2,this.result.name="肤浅的鬼畜少年"):this.scoreI<=this.standard&&this.scoreM>this.standard&&this.scoreS>this.standard?(this.result.id=3,this.result.name="略有些鬼畜的青年人"):this.scoreI>this.standard&&this.scoreM<=this.standard&&this.scoreS>this.standard?(this.result.id=3,this.result.name="略有些鬼畜的青年人"):this.scoreI<=this.standard&&this.scoreM<=this.standard&&this.scoreS>this.standard?(this.result.id=4,this.result.name="最不鬼畜的成年人"):this.scoreI>this.standard&&this.scoreM>this.standard&&this.scoreS>this.standard&&(this.result.id=5,this.result.name="万里挑一的鬼畜之王"),console.log("test result:"+this.result.name)}},props:["this.result"],computed:{},created:function(){console.log("现在是第"+this.progress+"个问题，"),console.log("progress:"+this.progress+"--scoreI:"+this.scoreI+"--scoreS:"+this.scoreS+"--scoreM:"+this.scoreM),this.dots[99]=0}},c={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{style:{backgroundColor:s.questionArray[s.progress-1].bgColor},attrs:{id:"Select"},on:{created:s.setValue}},[e("p",{style:{color:s.questionArray[s.progress-1].textColor},attrs:{id:"question"}},[s._v(s._s(s.questionArray[s.progress-1].question))]),s._v(" "),e("div",{staticClass:"section"},[e("transition",{attrs:{name:"bounce"}},[e("img",{attrs:{id:"picA",src:s.questionArray[s.progress-1].picAurl,alt:""},on:{click:function(t){s.next(),s.countA()}}})])],1),s._v(" "),e("div",{staticClass:"section"},[e("img",{attrs:{id:"picB",src:s.questionArray[s.progress-1].picBurl,alt:""},on:{click:function(t){s.next(),s.countB()}}})]),s._v(" "),e("p",{attrs:{id:"progress"}},[s._v(s._s(s.progress)+"/8")])])},staticRenderFns:[]};var n=e("VU/8")(a,c,!1,function(s){e("DX5Z")},"data-v-35fa454a",null).exports,h={name:"Result",data:function(){return{title:"来看看你的鬼畜本质"}},methods:{},computed:{},created:function(){alert(this.$route.params.result.name)}},u={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{attrs:{id:"Result"}},[t("p",[this._v(this._s(this.title))]),this._v(" "),t("p",{attrs:{id:"result"}},[this._v(this._s(this.$route.params.result.name))])])},staticRenderFns:[]};var l=e("VU/8")(h,u,!1,function(s){e("U3fT")},"data-v-6b53b8bd",null).exports,d={name:"App",components:{Select:n}},p={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var g=e("VU/8")(d,p,!1,function(s){e("GfL1")},null,null).exports,f=e("/ocq");r.a.config.productionTip=!1,r.a.use(f.a);var b=new f.a({routes:[{path:"/",component:o},{name:"select",path:"/select",component:n},{name:"result",path:"/result",component:l}],mode:"hash"});new r.a({el:"#app",router:b,components:{App:g},template:"<App/>"})},U3fT:function(s,t){},zL6E:function(s,t){}},["NHnr"]);
//# sourceMappingURL=app.f40b115cefdd62a7c293.js.map