$(document).ready(function(){const a=$("#param-form"),b=$("#arg1"),c=$("#arg2"),d=$("#arg1-icon"),e=$("#arg2-icon"),f=$("#currentThemeIcon"),g=a.find("button[type=\"submit\"]");let h,i,j=!1,k=!1,l="",m="",n=!1;const o=["modem","modemfirmware","odm","product","system","system_ext","vendor"],p=(a,b)=>{let c;return(...d)=>{clearTimeout(c),c=setTimeout(()=>a.apply(this,d),b)}},q=a=>null!==a&&""!==a,r=()=>{const a=b.val()&&c.val()&&!b.hasClass("is-invalid")&&!c.hasClass("is-invalid");g.prop("disabled",!a)},s=(a,b,c,d)=>(clearTimeout(d),c||(a.removeClass("d-none").attr("data-bs-original-title",b).tooltip("show"),c=!0),c),t=(a,b)=>(clearTimeout(b),a.addClass("d-none").tooltip("dispose"),!1),u=()=>{const a=b.val().toLowerCase();return""===a?(b.removeClass("is-invalid"),j=t(d,h,j),!1):o.includes(a)?(b.addClass("is-invalid"),h=setTimeout(()=>{j=s(d,"Invalid partition name. The name cannot be one of the following: "+o.join(", ")+".",j,h)},1e3),!1):(b.removeClass("is-invalid"),j=t(d,h,j),!0)},v=()=>{const a=c.val();return""===a?(c.removeClass("is-invalid"),k=t(e,i,k),!1):/^(http:\/\/|https:\/\/)/.test(a)?(c.removeClass("is-invalid"),k=t(e,i,k),!0):(c.addClass("is-invalid"),i=setTimeout(()=>{k=s(e,"Please enter a valid URL starting with http:// or https://.",k,i)},1e3),!1)},w=p(u,300),x=p(v,300);b.on("input",()=>{w(),r()}),c.on("input",()=>{x(),r()});const y=()=>{const a=new URLSearchParams(window.location.search),b=a.get("p"),c=a.get("u");if(q(b)&&q(c)){$("#arg1").val(b),$("#arg2").val(c);const a=u(),d=v();r(),a&&d&&z(b,c)}else $("#arg1").val(""),$("#arg2").val(""),r(),A()};window.addEventListener("popstate",function(){const a=new URLSearchParams(window.location.search),b=a.get("p"),c=a.get("u");q(b)&&q(c)?y():($("#arg1").val(""),$("#arg2").val(""),r(),A())}),a.on("submit",function(a){if(a.preventDefault(),!u()||!v())return;const b=$("#arg1").val(),c=$("#arg2").val(),d=`/dump?p=${encodeURIComponent(b)}&u=${encodeURIComponent(c)}`;history.pushState(null,"",d),z(b,c)});const z=(b,c)=>{if(!u()||!v())return;$("#output-section").removeClass("hidden"),g.addClass("hidden"),$("#status").addClass("hidden").html(""),$("#error").addClass("hidden").html(""),$("#file").addClass("hidden"),$("#file-name").html(""),$("#loading-bar").removeClass("hidden"),a.find("input").addClass("disabled").prop("disabled",!0);const d=new EventSource(`/stream?p=${encodeURIComponent(b)}&u=${encodeURIComponent(c)}`);d.onmessage=function(a){if("SCRIPT_FINISHED"===a.data)d.close(),$("#loading-bar").addClass("hidden"),$("#status").addClass("hidden").html("");else if(a.data.startsWith("STATUS:"))l+=a.data.substring(7).trim();else if(a.data.startsWith("STATUS_END"))$("#status").removeClass("hidden").html(l.trim().replace(/(<br>\s*){2,}/g,"<br>")),l="";else if(a.data.startsWith("ERROR:"))n=!0,m+=a.data.substring(6).trim()+"<br>";else if(a.data.startsWith("ERROR_END"))n=!1,$("#error").html("<span class=\"error-icon\">&#x26A0;</span>"+m.trim()).removeClass("hidden"),$("#loading-bar").addClass("hidden"),m="";else if(a.data.startsWith("FILE:")){const b=a.data.substring(5).trim(),c=b.split("/").pop();$("#file-name").html(c).off("click").on("click",function(){window.location.href=`/download/${c}`}),$("#file").removeClass("hidden"),$("#loading-bar").addClass("hidden"),$("#status").addClass("hidden").html(""),setTimeout(()=>{window.location.href=`/download/${c}`},100)}else n?m+=a.data.trim()+"<br>":l+=a.data.trim()+"<br>"},d.onerror=function(){$("#error").html("<span class=\"error-icon\">&#x26A0;</span>An error occurred.").removeClass("hidden"),$("#loading-bar").addClass("hidden"),d.close()}},A=()=>{$("#output-section").addClass("hidden"),g.removeClass("hidden"),$("#status").addClass("hidden").html(""),$("#error").addClass("hidden").html(""),$("#file").addClass("hidden"),$("#file-name").html(""),$("#loading-bar").addClass("hidden"),a.find("input").removeClass("disabled").prop("disabled",!1),a.removeClass("was-validated")},B=a=>{const b="system"===a?"fa-adjust":"light"===a?"fa-sun":"fa-moon";f.attr("class",`fas ${b}`)},C=a=>{document.body.setAttribute("data-theme","system"===a?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":a),B(a)},D=()=>localStorage.getItem("theme")||"system",E=a=>localStorage.setItem("theme",a),F=()=>C(D());$("#themeToggle").on("click",function(a){a.preventDefault();const b=D(),c="light"===b?"dark":"dark"===b?"system":"light";E(c),C(c)}),F(),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",F),y()});