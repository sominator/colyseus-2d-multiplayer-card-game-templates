extends Node

const colyseus = preload("res://addons/godot_colyseus/lib/colyseus.gd")
var room: colyseus.Room

#set up basic schema
class GameState extends colyseus.Schema:
	static func define_fields():
		var mySynchronizedProperty = "Hello world"
		return [
			colyseus.Field.new("mySynchronizedProperty", colyseus.STRING, mySynchronizedProperty),
		]

func _ready():
	#set up client
	var client = colyseus.Client.new("ws://localhost:2567")
	var promise = client.join_or_create(GameState, "game")
	yield(promise, "completed")
	if promise.get_state() == promise.State.Failed:
		print("Failed")
		return
	var room: colyseus.Room = promise.get_result()
	room.on_message("server-message").on(funcref(self, "_on_server_message"))
	room.on_message("game-message").on(funcref(self, "_on_game_message"))
	room.on_message("client-request").on(funcref(self, "_on_client_request"))
	self.room = room

#signal to request GameManager to instance player cards
signal draw_cards

#signal to request GameManager to render opponent cards
signal render_cards

#signal to request GameManager to handle dropped card
signal dropped_card

#log server message to console
func _on_server_message(data):
	print(data)
	
#log game message to console
func _on_game_message(data):
	print(data)
	if (data == "cards_drawn"):
		emit_signal("render_cards")
	elif (data == "card_dropped"):
		emit_signal("dropped_card")
				
#log client request to console and draw cards
func _on_client_request(data):
	print (data)
	if (data.kind == "draw"):
		emit_signal("draw_cards")

#send request to server to draw cards on button down
func _on_button_down():
	room.send("client-request", "draw")

#send message to server that cards have been drawn
func _on_cards_drawn():
	room.send("game-message", "cards_drawn")

#send message to server that card has been dropped
func _on_card_dropped():
	room.send("game-message", "card_dropped")
