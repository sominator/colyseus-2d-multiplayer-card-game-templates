using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Colyseus;
using System.Threading.Tasks;

public class NetworkManager : MonoBehaviour
{
    public GameObject GameManager;
    private static ColyseusClient _client = null;
    private static ColyseusRoom<GameState> _room = null;

    public void Initialize()
    {
        _client = new ColyseusClient($"ws://localhost:2567");
    }

    private async void Start()
    {
        Initialize();
        await JoinOrCreateGame();
        _room.OnMessage<string>("server-message", (message) => {
            Debug.Log("Server message: " + message);
        });

        _room.OnMessage<string>("game-message", (message) => {
            Debug.Log("Game message: " + message);
            if (message == "draw")
            {
                Debug.Log("draw");
                GameManager.GetComponent<GameManager>().Draw("OpponentCards");
            }
            else if (message == "drop")
            {
                Debug.Log("drop");
                GameManager.GetComponent<GameManager>().Drop();
            }
        });
    }

    public async Task JoinOrCreateGame()
    {
        _room = await _client.JoinOrCreate<GameState>("game");
    }

    public void SendMessage(string type)
    {
        _room.Send("game-message", type);
    }
    
}
