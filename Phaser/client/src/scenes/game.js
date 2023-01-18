import CardHandler from '../helpers/CardHandler';
import DeckHandler from '../helpers/DeckHandler';
import GameHandler from '../helpers/GameHandler';
import InteractiveHandler from '../helpers/InteractiveHandler';
import NetworkHandler from '../helpers/NetworkHandler';
import UIHandler from '../helpers/UIHandler';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {

        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
        this.load.image('cyanPing', 'src/assets/Cyan_Ping3x.png');
        this.load.image('magentaPing', 'src/assets/Magenta_Ping3x.png');
        
    }

    create() {

        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.NetworkHandler = new NetworkHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);

    }

    update() {

    }
}