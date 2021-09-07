const firebaseConfig = {
    apiKey: "AIzaSyA7Mikp72erxl1u5HvrK2jx8EpOJQbt7T8",
    authDomain: "schooltimetableeditor.firebaseapp.com",
    databaseURL: "https://schooltimetableeditor-default-rtdb.firebaseio.com",
    projectId: "schooltimetableeditor",
    storageBucket: "schooltimetableeditor.appspot.com",
    messagingSenderId: "72416096529",
    appId: "1:72416096529:web:848557d64cc192c711dcb0"
};
firebase.initializeApp(firebaseConfig);

var username = localStorage.getItem("ss47_schooltimetableeditor_username");
var classid = localStorage.getItem("ss47_schooltimetableeditor_classid");
var day = "";
var cday = "";
var cid = "";

var list_teacher = [];
var list_subject = [];


document.getElementById("id_class_id").innerHTML = classid;

UpdateLessonLists();

/*firebase.database().ref('users/' + username + "/classes/" + classid).set({
	"name": sname
});*/

function Mass (a) {
	var tl = [];
	var c = "";
	for (var i = 0; i < a.length; i++) {
		if (a[i] == '%') {
			tl.push(c);
			c = "";
		}else {
			c += a[i];
		}
	}
	return tl;
}

function Exist (a, b) {
	for (var i = 0; i < b.length; i++) {
		if (a == b[i]) {
			return true;
		}
	}
	return false;
}

function Part (m, l, r, s) {
	var tl = [];
	for (var i = l; i < r; i += s) {
		tl.push(m[i]);
	}
	return tl;
}



async function UpdateList_Subjects () {

	await firebase.database().ref().child("users").child(username).child("subjects").get().then((snapshot) => {
		if (snapshot.exists()) {

			var tlist = [];

			var l = JsonToList(snapshot.val());

			for (var i = 0; i < l.length; i++) {
				tlist.push(l[i][0]);
			}

			list_subject = tlist;

	  	}else {

	  		list_subject = [];

	  	}
	}).catch((error) => {
		console.error(error);
	});

}

async function UpdateList_Teachers () {

	await firebase.database().ref().child("users").child(username).child("teachers").get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var tlist = [];

			var l = JsonToList(snapshot.val());

			for (var i = 0; i < l.length; i++) {
				tlist.push(l[i][0]);
			}

			list_teacher = tlist;

	  	}else {

	  		list_teacher = [];

	  	}
	}).catch((error) => {
		console.error(error);
	});

}



async function UpdateLessonLists () {
	var dl = ["monday", "tuesday", "wednesday", "thirsday", "friday", "saturday", "sunday"];
	var ll = [];

	await UpdateList_Teachers();
	await UpdateList_Subjects();

	firebase.database().ref().child("users").child(username).child("classes").child(classid).get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			for (var zi = 0; zi < l.length; zi++) {
				if (l[zi][0] != "name") {
					var cur_day = l[zi][0];
					var lst = Mass(l[zi][1]._list);
					var slist = Part(lst, 0, lst.length, 2);
					var tlist = Part(lst, 1, lst.length, 2);
					var content = document.getElementById("id_list_" + cur_day);

					var html = "";

					for (var i = 0; i < slist.length; i++) {

						var temp_t = "";
						var temp_s = "";

						temp_t += tlist[i];
						temp_s += slist[i];

						if (!Exist(temp_t, list_teacher)) {
							temp_t = "не выбран";
						}

						if (!Exist(temp_s, list_subject)) {
							temp_s = "не выбран";
						}

						html += `<tr><th scope="row">` + (i + 1) + `</th><td></td><td>` + temp_s + `</td><td>` + temp_t + `</td><td><div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" onclick="PressedChangeLesson(\'` + cur_day + `\', \'` + (i + 1) + `\')">Изменить</button>
  <button type="button" class="btn btn-danger" onclick="RemoveSubject(\'` + cur_day + `\', \'` + (i + 1) + `\')">Удалить</button>
</div></td></tr>`;

					}

					content.innerHTML = html;

				}
			}

	  	}else {

	  		document.getElementById("id_select_1").innerHTML = "";

	  	}
	}).catch((error) => {
		console.error(error);
	});

}


function JsonToList (j_o) {
	var json_data = j_o;
	var tl = [];
	for(var i in json_data)
	    tl.push([i, json_data[i]]);
	return tl;
}

document.getElementById("id_btn_back").onclick = function () {
	localStorage.setItem("ss47_schooltimetableeditor_username", username);
	window.location = "../../main.html";
}

function Rus (word) {
	if (word == "monday") {
		return "Понедельник";
	}
	if (word == "tuesday") {
		return "Вторник";
	}
	if (word == "wednesday") {
		return "Среда";
	}
	if (word == "thursday") {
		return "Четверг";
	}
	if (word == "friday") {
		return "Пятница";
	}
	if (word == "saturday") {
		return "Суббота";
	}
	if (word == "sunday") {
		return "Воскресенье";
	}
}

function PressedAddLesson (cur_day) {
	document.getElementById("exampleModalLabel").innerHTML = "Добавить Урок (" + Rus(cur_day) + ")";

	day = "";
	day += cur_day;

	firebase.database().ref().child("users").child(username).child("subjects").get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			var html = "";

			html += "<option>не выбран</option>";

			for (var i = 0; i < l.length; i++) {
				html += "<option>" + l[i][0] + "</option>";
			}

			document.getElementById("id_select_1").innerHTML = html;

	  	}else {

	  		console.log("Existance: 0");

	  		document.getElementById("id_select_1").innerHTML = "";

	  	}
	}).catch((error) => {
		console.error(error);
	});

	firebase.database().ref().child("users").child(username).child("teachers").get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			var html = "";

			html += "<option>не выбран</option>";

			for (var i = 0; i < l.length; i++) {
				html += "<option>" + l[i][0] + "</option>";
			}

			document.getElementById("id_select_2").innerHTML = html;

	  	}else {

	  		console.log("Existance: 0");

	  		document.getElementById("id_select_2").innerHTML = "";

	  	}
	}).catch((error) => {
		console.error(error);
	});


}


function LessonExistIn (a, b) {
	var c = "";
	var nm = 0;
	for (var i = 0; i < b.length; i++) {
		if (b[i] == '%') {
			nm++;
			if (nm % 2 == 1 && a == c) {
				return true;
			}
			c = "";
		}else {
			c += b[i];
		}
	}
	return false;
}


function DeleteLessonFrom (a, b) {
	var c = "";
	var new_list = "";
	var del_t = 0;
	for (var i = 0; i < b.length; i++) {
		if (b[i] == '%') {
			nm++;
			if (nm % 2 == 1) {
				if (c == a) {
					del_t = 2;
				}
				if (del_t <= 0) {
					new_list += c + "%";
				}else {
					del_t--;
				}
			}else {
				if (del_t <= 0) {
					new_list += c + "%";
				}else {
					del_t--;
				}
			}
			c = "";
		}else {
			c += b[i];
		}
	}
	return new_list;
}


document.getElementById("id_btn_add_science").onclick = function () {
	var sname = document.getElementById("id_select_1").value;
	var tname = document.getElementById("id_select_2").value;

	var cur = "";


	firebase.database().ref().child("users").child(username).child("classes").child(classid).child(day).get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			cur += l[0][1];

			cur += sname + "%" + tname + "%";

			firebase.database().ref('users/' + username + "/classes/" + classid + "/" + day).set({
				"_list": cur
			});

			UpdateLessonLists();

	  	}else {

	  		cur += sname + "%" + tname + "%";

			firebase.database().ref('users/' + username + "/classes/" + classid + "/" + day).set({
				"_list": cur
			});

			UpdateLessonLists();

	  	}
	}).catch((error) => {
		console.error(error);
	});

}

function PressedChangeLesson (p_day, p_id) {

	cday = p_day;
	cid = p_id;

	document.getElementById("exampleModalLabelSecond").innerHTML = "Изменить Урок (" + Rus(p_day) + " > урок " + p_id + ")";

	firebase.database().ref().child("users").child(username).child("subjects").get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			var html = "";

			html += "<option>не выбран</option>";

			for (var i = 0; i < l.length; i++) {
				html += "<option>" + l[i][0] + "</option>";
			}

			document.getElementById("id_select_3").innerHTML = html;

	  	}else {

	  		console.log("Existance: 0");

	  		document.getElementById("id_select_3").innerHTML = "";

	  	}
	}).catch((error) => {
		console.error(error);
	});

	firebase.database().ref().child("users").child(username).child("teachers").get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			var html = "";

			html += "<option>не выбран</option>";

			for (var i = 0; i < l.length; i++) {
				html += "<option>" + l[i][0] + "</option>";
			}

			document.getElementById("id_select_4").innerHTML = html;

	  	}else {

	  		console.log("Existance: 0");

	  		document.getElementById("id_select_4").innerHTML = "";

	  	}
	}).catch((error) => {
		console.error(error);
	});

}


document.getElementById("id_btn_change_science").onclick = function () {
	var new_l = document.getElementById("id_select_3").value;
	var new_t = document.getElementById("id_select_4").value;

	firebase.database().ref().child("users").child(username).child("classes").child(classid).child(cday).get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			var ll = "";
			ll += l[0][1];

			var index = parseInt(cid);

			var tm = Mass(ll);

			tm[index * 2 - 2] = new_l;
			tm[index * 2 - 1] = new_t;

			ll = "";

			for (var i = 0; i < tm.length; i++) {
				ll += tm[i] + "%";
			}

			firebase.database().ref('users/' + username + "/classes/" + classid + "/" + cday).set({
				"_list": ll
			});

			UpdateLessonLists();

	  	}else {



	  	}
	}).catch((error) => {
		console.error(error);
	});

}

function RemoveSubject (p_day, p_id) {

	firebase.database().ref().child("users").child(username).child("classes").child(classid).child(p_day).get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var l = JsonToList(snapshot.val());

			var ll = "";
			ll += l[0][1];

			var tm = Mass(ll);

			var nm = [];

			var index = parseInt(p_id);

			for (var i = 0; i < tm.length; i++) {
				if (i != index * 2 - 2 && i != index * 2 - 1) {
					nm.push(tm[i]);
				}
			}

			ll = "";

			for (var i = 0; i < nm.length; i++) {
				ll += nm[i] + "%";
			}

			firebase.database().ref('users/' + username + "/classes/" + classid + "/" + p_day).set({
				"_list": ll
			});

			UpdateLessonLists();

	  	}else {



	  	}
	}).catch((error) => {
		console.error(error);
	});

}


/*

<tr><th scope="row">1</th><td></td><td>physics</td><td>Ачилов</td><td><div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Изменить</button>
  <button type="button" class="btn btn-danger">Удалить</button>
</div></td></tr>

*/