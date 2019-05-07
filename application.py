import os
import json
import requests
from flask import Flask, session, request, render_template, redirect, url_for
from flask_socketio import SocketIO, emit
from gevent import monkey
monkey.patch_all()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

users = []

channels = []

roomChat = {"roomChat": }

@app.route("/", methods=['GET', 'POST'])
def index():
	# add the users and the room
	if (request.method == 'POST'):
		user = request.form.get('name')
		users.append(user)
		room = request.form.get('room')
		channels.append(room)
		return render_template("index.html", user = user, channels = channels)
	return render_template("index.html", channels = channels)


@app.route("/<roomname>")
def rooms(roomname):
	# to prevent creating by url
	if roomname not in channels:
		raise "No such a room"

	return render_template('rooms.html', roomname = roomname)


@socketio.on("msg sent")
def msg(data):
	chat = data["msg"]
	user = data["user"]
	room = data["roomname"]

	emit("chat msg", {"chat": chat, "user":user}, broadcast=True)