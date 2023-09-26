using Godot;
using System;
using System.Collections.Generic;

public class GameManager : Node
{
	//expose card and card back in editor
	[Export]
	public PackedScene CardScene;

	[Export]
	public PackedScene CardBackScene;

	//keep track of number of cards in dropzone
	public int CardsInDropZone { get; set; }

	//keep track of number of opponent card backs to render
	private List<Panel> opponentCards = new List<Panel>();

	public override void _Ready()
	{
		CardsInDropZone = 0;
		base._Ready();
	}

	//draw cards and emit signal to client object that cards have been drawn
	private void DrawCards()
	{
		for (int i = 0; i < 5; i++)
		{
			Panel card = CardScene.Instance<Panel>();
			card.RectPosition = new Vector2((i * 150) + 25, 825);
			AddChild(card);
		}
		EmitSignal(nameof(CardsDrawn));
	}

	//render opponent cards upon receiving signal from client object
	private void RenderCards()
	{
		for (int i = 0; i < 5; i++)
		{
			Panel card = CardBackScene.Instance<Panel>();
			card.RectPosition = new Vector2((i * 150) + 25, 25);
			AddChild(card);
			opponentCards.Add(card);
		}
	}

	//handle drop signal from client object
	private void RenderDrop()
	{
		if (opponentCards.Count > 0)
		{
			opponentCards[0].QueueFree();
			opponentCards.RemoveAt(0);
		}
		Panel card = CardScene.Instance<Panel>();
		card.RectPosition = new Vector2((CardsInDropZone * 50) + 25, 425);
		AddChild(card);
		CardsInDropZone++;
	}

	//handle card being dropped
	public void Drop()
	{
		CardsInDropZone++;
		EmitSignal(nameof(CardDropped));
	}

	//signal to let client object know cards have been drawn
	[Signal]
	public delegate void CardsDrawn();

	//signal to let client object know card has been dropped
	[Signal]
	public delegate void CardDropped();
}
