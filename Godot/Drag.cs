using Godot;
using System;

public class Drag : Panel
{
	//create private variables to store initial data
	private bool _mouseIn = false;
	private bool _isDragging = false;
	private bool _isOverDropZone = false;
	private Vector2 _startPosition;
	private GameManager _gm;

	public override void _Ready()
	{
		//store start position and locate GameManager
		_startPosition = RectPosition;
		_gm = GetParent<GameManager>();
	}

	public override void _Process(float delta)
	{
		if (_mouseIn)
		{
			//handle dragging and render card over other game objects
			if (Input.IsActionPressed("left_click"))
			{
				_isDragging = true;	
				Vector2 _mousePosition = new Vector2(GetViewport().GetMousePosition());
				RectPosition = new Vector2(_mousePosition.x - 40, _mousePosition.y - 40);
				GetParent().MoveChild(this, GetParent().GetChildCount());
			}
			//handle dropping or return card to start position if not over dropzone
			if (Input.IsActionJustReleased("left_click"))
			{ 
				_isDragging = false;
				if (_isOverDropZone)
				{
					RectPosition = new Vector2((_gm.CardsInDropZone * 50) + 25, 425);
					_gm.Drop();
				}
				else
				{
					RectPosition = _startPosition;
				}
			}
		}
		base._Process(delta);
	}

	//handle mouse enter signal
	private void OnMouseEntered()
	{
		if (_isDragging) return;
		_mouseIn = true;
	}
	//handle mouse exit signal
	private void OnMouseExited()
	{
		_mouseIn = false;
	}
	//handle enter collision with dropzone signal
	private void OnArea2DEntered(object area)
	{
		_isOverDropZone = true;
	}
	//handle exit collision with dropzone signal
	private void OnArea2DExited(object area)
	{
		_isOverDropZone = false;
	}
}
