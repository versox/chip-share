(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,a){e.exports=a(34)},23:function(e,t,a){},27:function(e,t,a){},29:function(e,t,a){},34:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(17),o=a.n(r),l=(a(23),a(2)),i=a(3),c=a(6),u=a(4),m=a(5),h=a(37),p=a(36),d=a(12),g=a(8),b=a.n(g),v=(a(27),a(29),{ROOT_PATH:"/ryerson/chip-share"}),f={registerCaptcha:function(){var e=new XMLHttpRequest;e.open("GET",v.ROOT_PATH+"api/user/register",!0);var t=new Promise(function(t,a){e.onreadystatechange=function(){4===e.readyState&&(200===e.status?t(e.response):a(e.response))}});return e.send(),t},register:function(e,t,a,n){console.log(n);var s=new XMLHttpRequest;return s.open("POST",v.ROOT_PATH+"api/user/register",!1),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify({name:e,username:t,password:a,captcha:n})),201===s.status?"Success":s.response},login:function(e,t){var a=new XMLHttpRequest;if(a.open("POST",v.ROOT_PATH+"api/user/login",!1),a.setRequestHeader("Content-Type","application/json"),a.send(JSON.stringify({username:e,password:t})),200===a.status){var n=JSON.parse(a.response);return d.set("name",n.name||"unknown",{expires:1/48}),d.set("token",n.token,{expires:1/48}),d.set("secret",n.refreshSecret,{expires:1/48}),"Success"}return a.response},createSong:function(e){var t=d.get("token");if(void 0!==t){var a=new XMLHttpRequest;if(a.open("POST",v.ROOT_PATH+"api/songs/create",!1),a.setRequestHeader("Content-Type","application/json"),a.setRequestHeader("Authorization",t),a.send(JSON.stringify(e)),console.log(a.response),200===a.status)return a.response.id}else console.log("not logged in!")},getSongs:function(e){var t,a=new XMLHttpRequest;return t=void 0===e?v.ROOT_PATH+"api/songs":v.ROOT_PATH+"api/songs/get?userId="+e,a.open("GET",t,!1),a.send(),JSON.parse(a.response)},getSong:function(e,t){var a=new XMLHttpRequest;t=t||"/full",a.open("GET",v.ROOT_PATH+"api/songs/"+e+t,!0);var n=new Promise(function(e,t){a.onreadystatechange=function(){4===a.readyState&&(200===a.status?e(a.response):t(a.response))}});return a.send(),n}},y=function e(t){Object(l.a)(this,e),this.track=void 0===!t?t:{blocks:[1],settings:{typeId:1,metadata:"123ab"}}},E=["off","on","start","end","mid"],k={off:0,on:1,start:2,end:3,mid:4},O=function(e,t){for(var a=0;a<e.length;a++){for(var n=e[a],s=[],r=0;r<n.length;r++){var o=n[r];s.push({type:E[o],clickF:function(){"off"===this.type?this.type="on":this.type="off"},startF:function(){this.type="start"},endF:function(){this.type="end"},midF:function(){this.type="mid"}})}t.push(s)}},N=function(){function e(t){if(Object(l.a)(this,e),this.block=[],void 0!==t)O(t.data,this.block);else for(var a=0;a<12;a++){for(var n=[],s=0;s<16;s++)n.push({type:"off",clickF:function(){"off"===this.type?this.type="on":this.type="off"},startF:function(){this.type="start"},endF:function(){this.type="end"},midF:function(){this.type="mid"}});this.block.push(n)}}return Object(i.a)(e,[{key:"convertToData",value:function(){for(var e=[],t=0;t<this.block.length;t++){for(var a=this.block[t],n=[],s=0;s<a.length;s++){var r=a[s].type;n.push(k[r])}e.push(n)}return e}}]),e}(),j=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];function C(e){var t=new Date;if(t.getDate()===e.getDate()&&t.getMonth()===e.getMonth()&&t.getFullYear()===e.getFullYear()){var a=Math.floor((t-e)/6e4),n=Math.floor(a/60),s=a%60,r="hour";if(n>1&&(r+="s"),0===s)return n+" "+r+"  ago";var o="minute";return s>1&&(o+="s"),0===n?s+" "+o+" ago":n+" "+r+" and "+s+" "+o+" ago"}return j[e.getMonth()]+" "+e.getDate()+", "+e.getFullYear()}var T=function(){function e(t){Object(l.a)(this,e),this.blocks=[],this.tracks=[],void 0!==t?(this.name=t.name,this.bpm=t.bpm,this.blockLength=t.blockLength,this.createDate=new Date(t.createDate),this.updateDate=new Date(t.updateDate),this.author=t.user.name,this.username=t.user.username,this.id=t.id):(this.name="awesome song",this.bpm=120,this.blockLength=1),this.setKey(),this.loaded=!1}return Object(i.a)(e,[{key:"setKey",value:function(e,t){this.freq=e||"C",this.keyType=t||"Maj",this.key=[],this.key[11]=this.freq+"3";for(var a="Maj"===t?[2,2,1,2,2,2,1,2,2,1,2]:[2,1,2,2,1,2,2,2,1,2,2],n=10,s=0;n>=0;n--,s++)this.key[n]=b.a.Frequency(this.key[n+1]).transpose(a[s]);this.synth&&this.synth.releaseAll()}},{key:"load",value:function(e){if(this.blocks.push(null),void 0===this.id||void 0===e)this.blocks.push(new N),this.tracks.push(new y);else{for(var t=0;t<e.instruments.length;t++)this.tracks.push(new y(e.instruments[t]));for(var a=1;a<=this.blockLength;a++){var n=new N(e.blocks[a]);this.blocks.push(n)}}this.activeBlock=this.blocks[1].block,this.loaded=!0}},{key:"start",value:function(){var e=this;b.a.Transport.cancel(),this.synth=new b.a.PolySynth(6,b.a.Synth).toMaster(),this.synth.triggerAttackRelease("C4","4n"),b.a.Transport.loopEnd=this.blockLength+"m",b.a.Transport.loop=!0,b.a.Transport.bpm.value=this.bpm,this.count=0,this.loop=new b.a.Loop(function(t){for(var a=0;a<12;a++)switch(e.activeBlock[a][e.count].type){case"on":e.synth.triggerAttackRelease(e.key[a],"16n",t);break;case"start":e.synth.triggerAttack(e.key[a],t);break;case"end":e.synth.triggerRelease(e.key[a],t)}e.count>=15?e.count=0:e.count++},"16n").start()}},{key:"play",value:function(){b.a.Transport.start()}},{key:"pause",value:function(){b.a.Transport.stop(),this.synth.releaseAll()}},{key:"save",value:function(){if(void 0===this.id)f.createSong(this.getSendableSong())}},{key:"getSendableSong",value:function(){for(var e={name:this.name,bpm:this.bpm,blockLength:this.blockLength,instruments:this.tracks.map(function(e){return e.track}),blocks:{}},t=1;t<=this.blocks.length-1;t++)e.blocks[t]={data:this.blocks[t].convertToData()};return e}},{key:"getFormattedCreate",value:function(){return C(this.createDate)}},{key:"getFormattedUpdate",value:function(){return C(this.updateDate)}},{key:"hasBeenUpdated",value:function(){return!(Math.abs(this.createDate-this.updateDate)<50)}}]),e}(),S=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).selectedTrack=0,a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"addTrack",value:function(){}},{key:"setName",value:function(e){this.name=e}},{key:"setBPM",value:function(e){this.bpm=e,b.a.Transport.bpm.value=this.bpm}}]),t}(T),w=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(e){return s.a.createElement("div",{id:"instrEdit"},s.a.createElement("span",null,"Instrument "),s.a.createElement("select",null,s.a.createElement("option",null,"Instrument 1"),s.a.createElement("option",null,"Instrument 2"),s.a.createElement("option",null,"Instrument 3")),s.a.createElement("br",null),s.a.createElement("span",null,"Drive "),s.a.createElement("input",{type:"number"}),s.a.createElement("input",{type:"range"}),s.a.createElement("br",null),s.a.createElement("span",null,"Value 2 "),s.a.createElement("input",{type:"number"}),s.a.createElement("input",{type:"range"}),s.a.createElement("br",null),s.a.createElement("span",null,"Value 3 "),s.a.createElement("input",{type:"number"}),s.a.createElement("input",{type:"range"}))}}]),t}(n.Component),M=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state=e.tile,a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"onMouseMove",value:function(e){}},{key:"onMouseDown",value:function(e){this.props.dragger.active=this.props.line,this.props.dragger.start=this}},{key:"onMouseUp",value:function(e){this.props.line===this.props.dragger.active&&(this.props.dragger.start===this?this.state.clickF():(this.props.dragger.start.state.startF(),this.props.dragger.start.forceUpdate(),this.state.endF()),this.forceUpdate()),this.props.dragger.active=null}},{key:"render",value:function(){return s.a.createElement("div",{class:"tile "+this.state.type,onMouseDown:this.onMouseDown.bind(this),onMouseUp:this.onMouseUp.bind(this),onMouseMove:this.onMouseMove.bind(this)})}}]),t}(n.Component),P=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){for(var e=[],t=0;t<16;t++)e.push(s.a.createElement(M,{tile:this.props.line[t],line:this.props.lineNum,dragger:this.props.dragger}));return s.a.createElement("div",{class:"line"},e)}}]),t}(n.Component),R=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).dragger={active:-1,start:null},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){for(var e=[],t=0;t<12;t++)e.push(s.a.createElement(P,{line:this.props.block[t],lineNum:t,dragger:this.dragger}));return s.a.createElement("div",{id:"blockEdit"},e)}}]),t}(n.Component),A=a(13),x=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null)}}]),t}(n.Component),D=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"remove",value:function(){this.props.remove(this)}},{key:"render",value:function(){return s.a.createElement("div",{className:"track"},s.a.createElement("h1",{onClick:this.remove.bind(this)},this.props.id),s.a.createElement(x,null))}}]),t}(n.Component),H=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).id=1,a.state={tracks:[s.a.createElement(D,{id:"0",remove:a.removeTrack.bind(Object(A.a)(Object(A.a)(a)))})]},a.offset=0,a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"addTrack",value:function(){var e=this.state.tracks.slice(0);e.push(s.a.createElement(D,{id:this.id,remove:this.removeTrack.bind(this)})),this.setState(function(t){return{tracks:e}}),this.id++}},{key:"removeTrack",value:function(e){this.setState(function(t){return{tracks:t.tracks.filter(function(t){return!(e.props.id===t.props.id)})}})}},{key:"render",value:function(){return s.a.createElement("div",null,this.state.tracks,s.a.createElement("h1",{onClick:this.addTrack.bind(this)},"Create track"))}}]),t}(n.Component),I=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={playing:!1,error:!1,name:"",bpm:120,key:"",keyType:""},a.keysArray=["C","D","E","F","G","A","B"],a.keyOptions=a.keysArray.map(function(e){return s.a.createElement("option",null,e)}),a.ready=!1,a.songId=e.match.params.id,"new"===a.songId?(a.song=new S,a.song.load(),a.song.start(),a.ready=!0):void 0!==a.songId&&f.getSong(a.songId).then(function(e){return JSON.parse(e)}).then(function(e){a.song=new S(e),a.song.load(e),a.song.start(),a.ready=!0,a.setState({name:a.song.name,bpm:a.song.bpm,key:a.song.freq,keyType:a.song.keyType}),a.forceUpdate()}).catch(function(e){a.state.error=!0,a.state.errComp=s.a.createElement("h1",null," Could not load song: ",e," ")}),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){0}},{key:"handleToggle",value:function(){this.setState(function(e){return{playing:!e.playing}}),this.state.playing?this.song.pause():this.song.play()}},{key:"onSave",value:function(e){e.preventDefault(),this.song.save()}},{key:"onChange",value:function(e){var t={},a=e.target.value;switch(e.target.id){case"name":this.song.setName(a);break;case"bpm":""!=a&&(a<1?a=1:a>500&&(a=500),this.song.setBPM(a));break;case"keyType":this.song.setKey(this.state.key,a);break;case"key":this.song.setKey(a,this.state.keyType)}t[e.target.id]=a,this.setState(t)}},{key:"render",value:function(){var e=this;return this.state.error?this.state.errComp:this.song&&this.ready?s.a.createElement("div",{class:"editor"},s.a.createElement("div",{class:"editor-header"},s.a.createElement("span",{class:"header-left"},s.a.createElement("i",{onClick:this.handleToggle.bind(this),class:"fa "+(this.state.playing?"fa-stop":"fa-play")}),s.a.createElement("div",{class:"header-controls"},s.a.createElement("span",null,"BPM "),s.a.createElement("input",{value:this.state.bpm,id:"bpm",onChange:function(t){return e.onChange(t)},type:"number"}),s.a.createElement("span",null,"Key "),s.a.createElement("select",{id:"key",value:this.state.key,onChange:function(t){return e.onChange(t)}},this.keyOptions),s.a.createElement("select",{onChange:function(t){return e.onChange(t)},id:"keyType",value:this.state.keyType},s.a.createElement("option",null,"Maj"),s.a.createElement("option",null,"min")))),s.a.createElement("div",{class:"song-name"},s.a.createElement("form",{onSubmit:function(t){return e.onSave(t)}},s.a.createElement("input",{required:!0,onChange:function(t){return e.onChange(t)},value:this.state.name,id:"name",type:"text",placeholder:"untitled",class:"name-input"}),s.a.createElement("input",{type:"submit",value:"Save",className:"btn btn-success"})))),s.a.createElement("div",{class:"row"},s.a.createElement(w,null),s.a.createElement(R,{block:this.song.activeBlock})),s.a.createElement(H,null)):s.a.createElement("div",null," ")}}]),t}(n.Component),F=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).slide1={backgroundImage:"url(/assets/Slide1.png)"},a.slide2={backgroundImage:"url(/assets/Slide2.png)"},a.slide3={backgroundImage:"url(/assets/Slide3.png)"},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("header",null,s.a.createElement("div",{id:"carouselExampleIndicators",className:"carousel slide","data-ride":"carousel"},s.a.createElement("ol",{className:"carousel-indicators"},s.a.createElement("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"0",className:"active"}),s.a.createElement("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"1"}),s.a.createElement("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"2"})),s.a.createElement("div",{className:"carousel-inner",role:"listbox"},s.a.createElement("div",{className:"carousel-item active",style:this.slide1},s.a.createElement("div",{class:"slide"},s.a.createElement("h1",{class:"slide-cap"},"Create 8-Bit Music in Just Minutes"),s.a.createElement("button",{type:"button",className:"btn btn-light carousel-button"},"View The Tutorial"))),s.a.createElement("div",{className:"carousel-item",style:this.slide2},s.a.createElement("div",{class:"slide"},s.a.createElement("h1",{class:"slide-cap"},"Perfect For Retro-Style Games"),s.a.createElement("button",{type:"button",className:"btn btn-light carousel-button"},"Listen To Example Songs"))),s.a.createElement("div",{className:"carousel-item",style:this.slide3},s.a.createElement("div",{class:"slide"},s.a.createElement("h1",{class:"slide-cap"},"Get Started With Our Free Chiptune Editor"),s.a.createElement("button",{type:"button",className:"btn btn-light carousel-button"},"Create a New Song")))),s.a.createElement("a",{className:"carousel-control-prev",href:"#carouselExampleIndicators",role:"button","data-slide":"prev"},s.a.createElement("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),s.a.createElement("span",{className:"sr-only"},"Previous")),s.a.createElement("a",{className:"carousel-control-next",href:"#carouselExampleIndicators",role:"button","data-slide":"next"},s.a.createElement("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),s.a.createElement("span",{className:"sr-only"},"Next")))),s.a.createElement("div",{className:"container content"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-lg-9 col-md-8"},s.a.createElement("h3",null,"Popular Songs"),s.a.createElement("ul",{className:"song-list"},s.a.createElement("li",null,s.a.createElement("div",{className:"song-header",style:{background:"#00ff9545"}},s.a.createElement("button",{className:"btn btn-light playback-btn play-btn"}),s.a.createElement("div",{className:"song-title"},"Sample Song"),s.a.createElement("div",{className:"play-progress",style:{width:"60%"}}),s.a.createElement("div",{className:"buttons-container"},s.a.createElement("button",{className:"btn btn-light"},s.a.createElement("i",{className:"fa fa-pencil"})),s.a.createElement("button",{className:"btn btn-light"},s.a.createElement("i",{className:"fa fa-trash"})))),s.a.createElement("div",{className:"song-body"},s.a.createElement("div",{className:"song-dates"},s.a.createElement("span",{className:"song-creation-date"},"Created November 15, 2018"),s.a.createElement("span",{className:"song-update-date"},"Updated November 16, 2018")),s.a.createElement("a",{href:"#",className:"song-artist"},s.a.createElement("div",{className:"name"},"Artist Name"),s.a.createElement("div",{className:"username"},"@johnsmith")))),s.a.createElement("li",null,s.a.createElement("div",{className:"song-header",style:{background:"#cc00ff45"}},s.a.createElement("button",{className:"btn btn-light playback-btn pause-btn"}),s.a.createElement("div",{className:"song-title"},"Best Song Ever"),s.a.createElement("div",{className:"play-progress",style:{width:"30%"}})),s.a.createElement("div",{className:"song-body"},s.a.createElement("div",{className:"song-dates"},s.a.createElement("span",{className:"song-creation-date"},"Created October 29, 2018")),s.a.createElement("a",{href:"#",className:"song-artist"},s.a.createElement("div",{className:"name"},"Another Artist"),s.a.createElement("div",{className:"username"},"@XxXusernameXxX")))))),s.a.createElement("div",{className:"col-lg-3 col-md-4"},s.a.createElement("h3",null,"About"),s.a.createElement("p",null,"Chip Share is a chiptune song editor right on your browser! It is developed using ",s.a.createElement("a",{href:"https://reactjs.org/"},"ReactJS")," as a front-end framework and ",s.a.createElement("a",{href:"https://expressjs.com/"},"Express")," back-end framework."),s.a.createElement("p",null,"The project is the result of a school project collectively developed by Jake, Carson, Mishel, and Alex at Ryerson University, Toronto, Canada.")))))}}]),t}(n.Component),L=a(38),q=a(35),_=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={user:"",pass:"",alertComponent:null},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"onSubmit",value:function(e){e.preventDefault();var t=f.login(this.state.user,this.state.pass),a="Success"===t?s.a.createElement(L.a,{to:"/profile"}):s.a.createElement("div",{class:"alert alert-danger",role:"alert"},t);this.setState({alertComponent:a})}},{key:"onChange",value:function(e){var t={};t[e.target.id]=e.target.value,this.setState(t)}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("form",{onSubmit:function(t){return e.onSubmit(t)},class:"form-signin"},s.a.createElement("h1",null,"Please sign in"),s.a.createElement("label",{for:"user",class:"sr-only"},"Username"),s.a.createElement("input",{value:this.state.user,onChange:function(t){return e.onChange(t)},type:"text",id:"user",class:"form-control",placeholder:"Username",required:!0,autofocus:!0}),s.a.createElement("label",{for:"pass",class:"sr-only"},"Password"),s.a.createElement("input",{value:this.state.pass,onChange:function(t){return e.onChange(t)},type:"password",id:"pass",class:"form-control",placeholder:"Password",required:!0}),s.a.createElement("button",{class:"btn btn-lg btn-primary btn-block",type:"submit"},"Sign in"),s.a.createElement("h3",null,"Don't have an account?"),s.a.createElement(q.a,{to:"/register"},"Register Here")),this.state.alertComponent)}}]),t}(n.Component),B=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={name:"",user:"",pass:"",capt:"",alertComponent:null,captcha:s.a.createElement("h1",null," LOADING CAPTCHA! ")},f.registerCaptcha().then(function(e){return JSON.parse(e)}).then(function(e){var t=(new DOMParser).parseFromString(e.captcha.image,"text/xml").firstChild;console.log(t);var n=s.a.createElement("svg",{dangerouslySetInnerHTML:{__html:t.innerHTML}});a.key=e.captcha.key,a.setState({captcha:n})}).catch(function(e){console.log(e)}),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"onSubmit",value:function(e){e.preventDefault();var t,a=f.register(this.state.name,this.state.user,this.state.pass,{key:this.key,answer:this.state.capt});"Success"===a?(f.login(this.state.user,this.state.pass),t=s.a.createElement(L.a,{to:"/profile"})):t=s.a.createElement("div",{class:"alert alert-danger",role:"alert"},a),this.setState({alertComponent:t})}},{key:"onChange",value:function(e){var t={};t[e.target.id]=e.target.value,this.setState(t)}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("form",{onSubmit:function(t){return e.onSubmit(t)},class:"form-signin"},s.a.createElement("h1",null,"Register"),s.a.createElement("input",{value:this.state.name,onChange:function(t){return e.onChange(t)},type:"text",id:"name",class:"form-control",placeholder:"Name",required:!0,autofocus:!0}),s.a.createElement("input",{value:this.state.user,onChange:function(t){return e.onChange(t)},type:"text",id:"user",class:"form-control",placeholder:"Username",required:!0}),s.a.createElement("input",{value:this.state.pass,onChange:function(t){return e.onChange(t)},type:"password",id:"pass",class:"form-control",placeholder:"Password",required:!0}),this.state.captcha,s.a.createElement("input",{value:this.state.capt,onChange:function(t){return e.onChange(t)},type:"text",id:"capt",class:"form-control",placeholder:"Captcha Text",required:!0}),s.a.createElement("button",{class:"btn btn-lg btn-primary btn-block",type:"submit"},"Register"),s.a.createElement("h3",null,"Already have an account?"),s.a.createElement(q.a,{to:"/login"},"Login Here")),this.state.alertComponent)}}]),t}(n.Component),U=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={redirect:!1,to:"",playBtn:"play-btn",playing:!1},a.song=e.song,a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"onEdit",value:function(){var e=this.song.id||"";this.setState({redirect:!0,to:"/editor/"+e})}},{key:"onPlayPause",value:function(){var e=this;this.state.playing?(this.setState({playBtn:"play-btn",playing:!1}),this.song.pause()):(this.song.loaded||f.getSong(this.song.id).then(function(e){return JSON.parse(e)}).then(function(t){e.song.load(t),e.song.start()}).catch({}),this.setState({playBtn:"pause-btn",playing:!0}),this.song.play())}},{key:"render",value:function(){var e=this;return this.state.redirect?s.a.createElement(L.a,{to:this.state.to}):s.a.createElement("li",null,s.a.createElement("div",{className:"song-header",style:{background:"#00ff9545"}},s.a.createElement("button",{onClick:function(){return e.onPlayPause()},className:"btn btn-light playback-btn "+this.state.playBtn}),s.a.createElement("div",{className:"song-title"},this.song.name),s.a.createElement("div",{className:"play-progress",style:{width:"60%"}}),s.a.createElement("div",{className:"buttons-container"},s.a.createElement("button",{onClick:function(){return e.onEdit()},className:"btn btn-light"},s.a.createElement("i",{className:"fa fa-pencil"})),s.a.createElement("button",{className:"btn btn-light"},s.a.createElement("i",{className:"fa fa-trash"})))),s.a.createElement("div",{className:"song-body"},s.a.createElement("div",{className:"song-dates"},s.a.createElement("span",{className:"song-creation-date"},"Created ",this.song.getFormattedCreate()),s.a.createElement("span",{className:"song-update-date"},this.song.hasBeenUpdated()?"Updated "+this.song.getFormattedUpdate():"")),s.a.createElement("a",{href:"#",className:"song-artist"},s.a.createElement("div",{className:"name"},this.song.author),s.a.createElement("div",{className:"username"},"@",this.song.username))))}}]),t}(n.Component),J=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){for(var e=[],t=f.getSongs(),a=0;a<t.length;a++)e.push(s.a.createElement(U,{song:new T(t[a])}));return s.a.createElement("div",null,s.a.createElement("h1",{class:"account-name"},"Account Name"),s.a.createElement("div",{class:"container"},s.a.createElement("h3",null,"My Songs"),s.a.createElement("hr",null),s.a.createElement("ul",{className:"song-list"},e)))}}]),t}(n.Component),X=function(e){function t(e){var a;return Object(l.a)(this,t),a=Object(c.a)(this,Object(u.a)(t).call(this,e)),console.log(Object({NODE_ENV:"production",PUBLIC_URL:"/ryerson/chip-share"})),console.log(v.ROOT_PATH),a.itemNames=["Create","My Songs","Community"],a.destination=[v.ROOT_PATH+"editor/new",v.ROOT_PATH+"profile",v.ROOT_PATH+""],a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.itemNames.map(function(t,a){return s.a.createElement("li",{className:"nav-item",key:a},s.a.createElement("a",{href:e.destination[a],className:"nav-link "},e.itemNames[a]))});return s.a.createElement("div",{className:"App"},s.a.createElement(h.a,{basename:v.ROOT_PATH},s.a.createElement("div",null,s.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark fixed-top"},s.a.createElement("div",{className:"container"},s.a.createElement("a",{className:"navbar-brand",href:v.ROOT_PATH},"Chip Share"),s.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarResponsive","aria-controls":"navbarResponsive","aria-expanded":"false","aria-label":"Toggle navigation"},s.a.createElement("span",{className:"navbar-toggler-icon"})),s.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarResponsive"},s.a.createElement("ul",{className:"navbar-nav mr-auto"},t),s.a.createElement(p.a,{path:"/",component:function(){var e=d.get("name");return s.a.createElement("ul",{className:"navbar-nav ml-auto"},void 0===e?s.a.createElement("a",{class:"nav-link",href:v.ROOT_PATH+"login"},"Log In / Register"):s.a.createElement("li",{class:"nav-item dropdown"},s.a.createElement("a",{class:"nav-link dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Logged in as: ",e),s.a.createElement("div",{class:"dropdown-menu","aria-labelledby":"navbarDropdown"},s.a.createElement("a",{class:"dropdown-item",href:"#"},"Profile"),s.a.createElement("a",{class:"dropdown-item",href:"#"},"Options"),s.a.createElement("div",{class:"dropdown-divider"}),s.a.createElement("a",{class:"dropdown-item",href:"#"},"Log Out"))))}})))),s.a.createElement(p.a,{path:"/",exact:!0,component:F}),s.a.createElement(p.a,{path:"/editor",component:I}),s.a.createElement(p.a,{path:"/editor/:id",component:I}),s.a.createElement(p.a,{path:"/login",component:_}),s.a.createElement(p.a,{path:"/register",component:B}),s.a.createElement(p.a,{path:"/profile",component:J}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,2,1]]]);
//# sourceMappingURL=main.e0e63d05.chunk.js.map