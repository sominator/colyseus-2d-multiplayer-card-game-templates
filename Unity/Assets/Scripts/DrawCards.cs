using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DrawCards : MonoBehaviour
{
    public GameObject GameManager;
    public NetworkManager NetworkManager;

    public void OnClick()
    {
        GameManager.GetComponent<GameManager>().Draw("PlayerCards");
        NetworkManager.GetComponent<NetworkManager>().SendMessage("draw");
    }
}
