import * as Colyseus from 'colyseus.js';

export default class NetworkHandler {
    constructor(scene) {

        scene.client = new Colyseus.Client('ws://localhost:2567');
        this.room;

        scene.client.joinOrCreate("game").then(room => {
            console.log("JOIN SUCCESSFUL");

            this.room = room;

            scene.DeckHandler.dealCard(1000, 860, "cardBack", "playerCard");
            scene.DeckHandler.dealCard(1000, 135, "cardBack", "opponentCard");

            this.room.onMessage("server-message", (message) => {
                console.log("Server message: " + message)
            });

            this.room.onMessage("game-message", (message) => {
                console.log("Game message: " + message)
                if (message === "draw") {
                    console.log("draw");
                    scene.GameHandler.draw("opponentCards");
                }
                else if (message === "drop") {
                    console.log("drop");
                    scene.GameHandler.drop();
                }
            });
        }).catch(e => {
            console.log("JOIN ERROR", e);
        });

        this.sendMessage = (message) => {
            this.room.send("game-message", message)
        };

    }
}