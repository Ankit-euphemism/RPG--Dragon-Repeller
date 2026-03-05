# Dragon Repeller RPG

A small browser-based RPG built with plain HTML, CSS, and JavaScript.

## Overview

In this game, you start in town and prepare to defeat a dragon by:
- Buying health and stronger weapons from the store
- Fighting monsters in the cave to gain XP and gold
- Managing inventory and survivability before the final fight

The game runs entirely in the browser with no dependencies or build step.

## Features

- Stateless UI controls that change by location (town, store, cave, fight, etc.)
- Player stats: XP, Health, Gold
- Weapon progression and inventory system
- Combat system with random hit/miss and weapon break chance
- Win/lose states with replay support
- Hidden number-picking mini-game (easter egg)

## Tech Stack

- HTML (`index.html`)
- CSS (`RPG.css`)
- Vanilla JavaScript (`RPG.js`)

## Run Locally

1. Clone or download this repository.
2. Open `index.html` in your browser.

No installation is required.

## How to Play

1. Start in the town square.
2. Visit the store to buy health and weapons.
3. Go to the cave and defeat weaker monsters to gain XP and gold.
4. Return to town and choose `Fight dragon` when ready.
5. Defeat the dragon to win.

Tip: Upgrading weapons early makes later fights much easier.

## Project Structure

```text
.
|-- index.html   # Game layout and controls
|-- RPG.css      # Styling
`-- RPG.js       # Game logic and state
```
