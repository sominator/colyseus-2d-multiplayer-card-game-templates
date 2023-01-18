using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public GameObject PlayerCard;
    public GameObject OpponentCard;
    public GameObject OpponentCardBack;
    public GameObject PlayerArea;
    public GameObject OpponentArea;
    public GameObject DropZone;

    private List<GameObject> opponentCards = new List<GameObject>();

    public void Draw(string type)
    {
        for (int i = 0; i < 5; i++)
        {
            if (type == "PlayerCards")
            {
                GameObject card = Instantiate(PlayerCard, new Vector2(0, 0), Quaternion.identity);
                card.transform.SetParent(PlayerArea.transform, false);
            }
            else if (type == "OpponentCards")
            {
                GameObject card = Instantiate(OpponentCardBack, new Vector2(0, 0), Quaternion.identity);
                card.transform.SetParent(OpponentArea.transform, false);
                opponentCards.Add(card);
            }
        }
    }

    public void Drop()
    {
        GameObject card = Instantiate(OpponentCard, new Vector2(0,0), Quaternion.identity);
        card.transform.SetParent(DropZone.transform, false);
        if (opponentCards.Count > 0)
        {
            Destroy(opponentCards[0]);
            opponentCards.RemoveAt(0);
        }
    }
}
