using Colyseus.Schema;

public partial class GameState : Schema
{
    [Type(0, "string")]
    public string mySynchronizedProperty = "Hello world";
}
