import * as schema from "@colyseus/schema";

//define custom state schema
export class GameState extends schema.Schema {
  constructor() {
    super();
    this.mySynchronizedProperty = "Hello world";
  }
}

schema.defineTypes(GameState, {
  mySynchronizedProperty: "string",
});
