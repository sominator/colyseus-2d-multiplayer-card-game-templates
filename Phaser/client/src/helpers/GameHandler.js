export default class GameHandler {
    constructor(scene) {

        this.playerCards = [];
        this.opponentCards = [];

        this.draw = (type) => {
            if (type === "playerCards") {
                for (let i = 0; i < 5; i++) {
                    let card = this.playerCards.push(scene.DeckHandler.dealCard(155 + (i * 155), 860, "ping", "playerCard"));
                }
            } else if (type === "opponentCards") {

                for (let i = 0; i < 5; i++) {
                    let card = this.opponentCards.push(scene.DeckHandler.dealCard(155 + (i * 155), 135, "cardBack", "opponentCard"));
                }
            }
        }

        this.drop = () => {
            this.opponentCards.shift().destroy();
            scene.DeckHandler.dealCard((scene.dropZone.x - 350) + (scene.dropZone.data.values.cards * 50), scene.dropZone.y, "ping", "opponentCard");
            scene.dropZone.data.values.cards++;
        }
    }
}