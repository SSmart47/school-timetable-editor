const firebaseConfig={apiKey:"AIzaSyA7Mikp72erxl1u5HvrK2jx8EpOJQbt7T8",authDomain:"schooltimetableeditor.firebaseapp.com",databaseURL:"https://schooltimetableeditor-default-rtdb.firebaseio.com",projectId:"schooltimetableeditor",storageBucket:"schooltimetableeditor.appspot.com",messagingSenderId:"72416096529",appId:"1:72416096529:web:848557d64cc192c711dcb0"};firebase.initializeApp(firebaseConfig);var science_name="[]",teacher_name="[]",username=localStorage.getItem("ss47_schooltimetableeditor_username");function haveSpace(e){for(var t=0;t<e.length;t++)if(" "==e[t])return!0;return!1}function haveK(e){for(var t=0;t<e.length;t++)if("%"==e[t]||"'"==e[t]||'"'==e[t]||"/"==e[t]||"#"==e[t]||"."==e[t]||"$"==e[t]||"["==e[t]||"]"==e[t])return!0;return!1}function JsonToList(e){var t,a=e,n=[];for(t in a)n.push([t,a[t]]);return n}function UpdateList(){firebase.database().ref().child("users").child(username).child("teachers").get().then(e=>{if(e.exists()){for(var t=document.getElementById("id_list_1"),a=JsonToList(e.val()),n="",o=0;o<a.length;o++){for(var r=a[o][0],s=JsonToList(a[o][1].teach_sub),c="",d=0;d<s.length;d++){var i=s[d][0];c+='<a class="dropdown-item" onclick="DeleteSubjectFromTeacher(\''+r+"', '"+i+'\')" href="#" data-toggle="modal" data-target="#exampleModal3">'+i+"</a>"}n+='<tr><th scope="row">'+(o+1)+"</th>",n+="<td>"+r+"</td>",n+="<td>",n+='<div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Предметы</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">',n+=c,n+='<div class="dropdown-divider"></div><a class="dropdown-item" href="#" onclick="AddSubjectToTeacher(\''+r+"')\" ",n+='data-toggle="modal" data-target="#exampleModal2">Добавить предмет</a></div></div>',n+="</td>",n+='<td><button class="btn btn-danger" onclick="RemoveSubject(\''+r+"')\">Удалить</button></td>",n+="</tr>"}t.innerHTML=n}else console.log("Exist: 0"),document.getElementById("id_list_1").innerHTML=""}).catch(e=>{console.error(e)})}UpdateList();username=localStorage.getItem("ss47_schooltimetableeditor_username");function RemoveSubject(e){firebase.database().ref("users/"+username+"/teachers/"+e).remove(),console.log('Removed: "'+e+'"'),UpdateList()}function DeleteSubjectFromTeacher(e,t){document.getElementById("exampleModalLabelThird").innerHTML='"'+e+'" > "'+t+'"',teacher_name=e,science_name=t}function AddSubjectToTeacher(e){document.getElementById("exampleModalLabelSecond").innerHTML="Добавить новый предмет учителю<br>("+e+")",teacher_name="",teacher_name+=e,firebase.database().ref().child("users").child(username).child("subjects").get().then(e=>{if(e.exists()){for(var t=JsonToList(e.val()),a="",n=0;n<t.length;n++)a+="<option>"+t[n][0]+"</option>";document.getElementById("id_select_1").innerHTML=a}else console.log("Existance: 0"),document.getElementById("id_select_1").innerHTML=""}).catch(e=>{console.error(e)})}document.getElementById("id_btn_back").onclick=function(){localStorage.setItem("ss47_schooltimetableeditor_username",username),window.location="../../main.html"},document.getElementById("id_btn_add_science").onclick=function(){var t=document.getElementById("id_science_name").value;""!=t?haveK(t)?alert("Имя учителя не должно содержать символы ' / \" . # $ [ ] %"):firebase.database().ref().child("users").child(username).child("teachers").child(t).get().then(e=>{e.exists()?alert("Учитель с таким именем уже есть в списке!"):(firebase.database().ref("users/"+username+"/teachers/"+t).set({name:t}),UpdateList())}).catch(e=>{console.error(e)}):alert('Заполните поле "Имя учителя"!')},document.getElementById("btn_add_science_to_teacher").onclick=function(){var e=document.getElementById("id_select_1").value;""!=e?(firebase.database().ref("users/"+username+"/teachers/"+teacher_name+"/teach_sub/"+e).set({name:e}),UpdateList()):alert("Предмет не выбран!")},document.getElementById("btn_remove_science_from_teacher").onclick=function(){firebase.database().ref("users/"+username+"/teachers/"+teacher_name+"/teach_sub/"+science_name).remove(),UpdateList()};