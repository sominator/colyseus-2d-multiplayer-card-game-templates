import { Room } from "@colyseus/core";
import { GameState } from "./schema/GameState.js";

export class Game extends Room {

    //suppoort only 2 clients connected
    maxClients = 2;

    //determine what should happen when a room is created
    onCreate(options) {

        console.log("Game Room created!", options);

        //set a custom state from a created schema
        this.setState(new GameState());

        //when a message is received of type "message," broadcast it with the type "server-message" to all clients
        this.onMessage("message", (client, message) => {
            console.log("Game Room received message from", client.sessionId, ":", message);
            this.broadcast("server-message", `(${client.sessionId} ${message}`);
        });


        //when a message is received of type "game-message," broadcast it with the type "game-message" to all clients except for the one that sent it
        this.onMessage("game-message", (client, message) => {
            this.broadcast("game-message", message, { except: client });
        });

    }

    //determine what should happen when a client joins
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        this.broadcast("server-message", `${client.sessionId} joined.`);
    }

    //determine what should happen when a client leaves
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        this.broadcast("server-message", `${client.sessionId} left.`);
    }

    //determine what should happen when a room is closed
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
