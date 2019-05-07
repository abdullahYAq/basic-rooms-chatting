//document.addEventListener('DOMContentLoaded', () => {

	/*document.querySelector('#add_new_user').onsubmit = function () {
		
		let username = document.querySelector('#usernm').value;
		localStorage.setItem('username', username);

			
	};

});*/

	
// save the user name in the local storage.
	
document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#add_new_user').onsubmit = function () {
		
		let username = document.querySelector('#usernm').value;
		localStorage.setItem('username', username);

	};

	if (localStorage.getItem('username')) {
		
		//remove the form if the user is saved
		var parent = document.getElementById('add_username');
		var child = document.getElementById('add_new_user');
		parent.removeChild(child);

		// add hello for user name insted of the form
		var p = document.createElement('p');
		var name = localStorage.getItem('username');
		var node = document.createTextNode(`hello ${name}`);
		p.appendChild(node);
		 
		//p.innerHTML = `hello, ${name} !`;
		document.querySelector('#hello').appendChild(p);
		

		
		//p.innerHTML = `hello ${localStorage.getItem(username)}`;

	};
	

});	



	
	