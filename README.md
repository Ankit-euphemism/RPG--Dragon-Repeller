# Dragon Repeller RPG

A lightweight browser RPG built with plain HTML, CSS, and JavaScript.

## About The Game

`Dragon Repeller` is a mini text-based adventure where you train your character and prepare for a final dragon battle.

Your objective:
- Earn `XP` and `Gold` by defeating cave monsters.
- Spend gold in the store to buy health and stronger weapons.
- Survive and defeat the dragon to win the game.

## Current Highlights

- Clean and responsive interface for desktop and mobile screens.
- Better readability with improved layout, spacing, and visual hierarchy.
- Touch-friendly controls (larger buttons and stacked actions on small screens).
- Core gameplay remains unchanged.

## Gameplay Features

- Location-based actions (town, store, cave, fight, and special states).
- Player stats tracking: `XP`, `Health`, `Gold`.
- Weapon upgrade and inventory system.
- Randomized combat behavior (hit/miss, damage variation, weapon break chance).
- Win/lose states with instant replay.
- Hidden number mini-game (easter egg).

## Tech Stack

- `index.html` for structure
- `RPG.css` for presentation and responsiveness
- `RPG.js` for game logic and state updates

## Run The Game

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

No installation, package manager, or build step is required.

## How To Play

1. Start at the town square.
2. Visit the store to buy health and better weapons.
3. Enter the cave to fight monsters and farm XP/gold.
4. Return to town and choose `Fight dragon` when ready.
5. Beat the dragon to complete the game.

Quick tip: Try to upgrade your weapon before taking on the dragon.

## Project Structure

```text
.
|-- index.html   # Game layout and UI containers
|-- RPG.css      # Visual design and responsive styles
`-- RPG.js       # Core game logic and state
```

## Notes

- This project is intentionally dependency-free and beginner-friendly.
- UI updates were made without altering gameplay rules or JavaScript behavior.
