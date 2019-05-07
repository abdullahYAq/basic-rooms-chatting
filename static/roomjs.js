document.addEventListener('DOMContentLoaded', () => {

	//connect to websocket
	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
	var roomname = document.querySelector('#rmnm').innerHTML;
	// when connected, configure send
	socket.on('connect', () => {
		
		document.querySelector('#send_msg').onclick = () =>{

			const msg = document.querySelector('#msg_fld').value;
			const user = localStorage.getItem('username');

			const data = {'roomname': roomname, 'username': user, 'msg' : msg};

			socket.emit('msg sent', {'roomname': roomname, 'user': user, 'msg': msg});
			document.querySelector('#msg_fld').value= '';
			return false;

		};
		
	});

	socket.on('chat msg', data => {

		const li = document.createElement('li');
		
		li.innerHTML = <b> + `${data.user}:` + </b> + `${data.chat}`;

		document.querySelector('#msg_lst').append(li);

	});


});