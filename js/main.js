const firebaseConfig={apiKey:"AIzaSyCodGBYdwn382QLxw5JLeHV3BXsua2ekGM",authDomain:"ssaccountmanager.firebaseapp.com",databaseURL:"https://ssaccountmanager-default-rtdb.firebaseio.com",projectId:"ssaccountmanager",storageBucket:"ssaccountmanager.appspot.com",messagingSenderId:"466168946177",appId:"1:466168946177:web:9eac116d7ad70a8c19aa00"};firebase.initializeApp(firebaseConfig);var wrongSymbol="\\/| '\"`~.#$[](){}";function PyArrayed(e){var a="";0<e.length&&(a+="'"+e[0]+"'");for(var t=1;t<e.length;t++)a+="  '"+e[t]+"'";return a}function Exist(e,a){for(var t=0;t<a.length;t++)if(a[t]==e)return!0;return!1}function NameMistake(e){for(var a=0;a<e.length;a++)if(!("a"<=e[a]&&e[a]<="z"||"A"<=e[a]&&e[a]<="Z"||"0"<=e[a]&&e[a]<="9"||"_"==e[a]))return!0;return!1}function PassMistake(e){for(var a=0;a<e.length;a++)if(Exist(e[a],wrongSymbol))return!0;return!1}document.getElementById("id_btn_sin").onclick=async function(){var e=document.getElementById("id_sin_name").value,a=document.getElementById("id_sin_pass").value;e.length<1?alert("Account Name should not be empty!"):a.length<1?alert("Password should not be empty!"):NameMistake(e)?alert("Account Name can only contain letters, numbers and '_'"):PassMistake(a)?alert("Password can't contain "+PyArrayed(wrongSymbol)):firebase.database().ref().child("users").child(e).get().then(e=>{e.exists()?(e=e.val(),a==e.password?(localStorage.setItem("ss47_schooltimetableeditor_user_i",e.id),localStorage.setItem("ss47_schooltimetableeditor_user_n",e.name),window.location="page/main.html"):alert("Неверный пароль!")):alert("Аккаунта не существует!")}).catch(e=>{console.error(e)})};
