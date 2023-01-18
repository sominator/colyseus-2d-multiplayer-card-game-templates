export default class InteractiveHandler {
    constructor(scene) {

        scene.cardPreview = null;

        scene.dealCards.on('pointerdown', () => {
            scene.GameHandler.draw("playerCards");
            scene.NetworkHandler.sendMessage("draw");
        })

        scene.dealCards.on('pointerover', () => {
            scene.dealCards.setColor('#ff69b4');
        })

        scene.dealCards.on('pointerout', () => {
            scene.dealCards.setColor('#00ffff')
        })

        scene.input.on('pointerover', (event, gameObjects) => {
            let pointer = scene.input.activePointer;
            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview = scene.add.image(pointer.worldX, pointer.worldY, gameObjects[0].data.values.sprite).setScale(0.5, 0.5);
            };
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview.setVisible(false);
            };
        });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        scene.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff69b4);
            scene.children.bringToTop(gameObject);
            scene.cardPreview.setVisible(false);
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            scene.dropZone.data.values.cards++;
            scene.input.setDraggable(gameObject, false);
            scene.NetworkHandler.sendMessage("drop");
        })

    }
}