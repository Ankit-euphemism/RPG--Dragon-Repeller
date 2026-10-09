# Dragon Repeller RPG

A lightweight browser RPG built with plain HTML, CSS, and JavaScript.

## About The Game

`Dragon Repeller` is a mini text-based adventure where you train your character and prepare for a final dragon battle.

Your objective:
- Earn `XP` and `Gold` by defeating cave monsters.
- Spend gold in the store to buy health and stronger weapons.
- Survive and defeat the dragon to win the game.

## Current Highlights

- Mobile-first adventure screen with a clear hero HUD and location heading.
- Health, weapon-tier, and opponent-health meters that follow game state.
- Large action buttons, visible keyboard focus, and reduced-motion support.
- A collapsible play guide with controls and a short strategy tip.
- Plain-language game messages and consistent labels for health, XP, gold, and weapons.
- The existing game rules and browser-only setup remain dependency-free.

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

## New UI: What Changed

- The screen now opens with a clear game title, a hero status panel, the current location, the story, and the available actions.
- The HUD shows XP, health, gold, and weapon tier. Health turns red when low; health, weapon strength, opponent health, and a five-hit momentum streak use compact meters.
- The momentum meter counts successful hits in a row. It resets on a miss and is visual only; it does not change damage.
- Action buttons stay easy to tap on phones. The guide opens in place and explains mouse, touch, and keyboard controls.
- Game messages use short sentences and familiar words. “Play again” replaces “REPLAY?” and “Your health reached zero” replaces “You die.”

## Design Direction and Style Guide

| Token | Color | Use |
| --- | --- | --- |
| Night | `#191626` | Page background |
| Plum | `#282139` | Story panel |
| Parchment | `#FFFAF0` | Main game panel |
| Ink | `#231D31` | Main text |
| Gold | `#F0B64D` | Rewards, focus details, and primary action |
| Green | `#26765D` | Positive action and health meter |
| Red | `#A83238` | Opponent panel |

Typography uses a system sans-serif for controls and body copy, with Georgia for the game title. Icons are small inline symbols; decorative icons are hidden from screen readers. A quest badge adds a game cue without replacing its text label.

Meters always describe a real value: current health, weapon tier, opponent health, or consecutive hits. The momentum meter has a five-hit visual goal and its focusable tooltip and guide say that it does not affect damage. The guide is a keyboard- and touch-friendly disclosure; important instructions do not depend on hover-only tooltips.

**Readability target:** aim for a Flesch–Kincaid grade level of 6–8 for in-game copy. Use short sentences, common words, and the same terms throughout: `Health`, `XP`, `Gold`, `Weapon`, `Opponent`, and `Town square`.

### Style Guide Excerpt

- Spacing: use a small set of even gaps; keep status cards and action groups visually separate.
- Corners: 12–24 px for cards and buttons; use pill shapes only for badges.
- Shadows: one soft shadow below the main game panel; avoid heavy shadows on every card.
- Motion: use brief transitions for meters and button presses. Respect `prefers-reduced-motion`.
- Focus: keep a strong visible outline on every button and the guide summary.
- Touch: buttons are at least 48 px tall and stack on narrow screens.

## Responsive Layout and Accessibility

- **Small screens (up to 700 px):** two-column stat cards, full-width stacked actions, and a one-column guide.
- **Wider screens (701 px and up):** four stat cards and three side-by-side actions.
- **Very narrow screens (up to 380 px):** tighter card spacing and wrapped badges.
- Use `Tab`, then `Enter` or `Space`, to play with a keyboard. Status messages are announced politely; the numbers remain visible beside their meters.
- Color is paired with labels and numbers, so it is not the only way to read a game state.

## Implementation Plan

1. **Screen structure — complete:** add the hero HUD, location heading, opponent panel, story card, actions, and footer guide.
2. **Component styling — complete:** apply the dark-plum and parchment palette, badges, meters, touch targets, and responsive layout.
3. **Accessible copy and behavior — complete:** add live story updates, visible focus, keyboard instructions, reduced-motion support, and simple outcome text.
4. **Manual review — next:** check the layout at phone and desktop widths, play through store/cave/fight/replay states, and review with keyboard and a screen reader.

### Minimal Sprint Scope and Risks

- **Sprint 1:** structure and copy. Keep the existing three-button game flow.
- **Sprint 2:** add responsive styles, stat meters, opponent health, and momentum feedback.
- **Sprint 3:** check focus, screen-reader announcements, reduced motion, contrast, and narrow-screen wrapping.
- **Sprint 4:** play through every location and outcome; fix only UI issues found in review.
- Main risk: extra meters can imply rules that the game does not have. The momentum help text states its meaning and says it does not change damage.
- Asset plan: no new assets are required. If the project later needs custom art, create a small set of local SVG icons and optional town/cave/dragon illustrations. Keep text labels and alt text even when artwork is added. Avoid remote font dependencies.

## Prioritized Change Checklist

- [x] Clarify the title, location, story, stats, and available actions.
- [x] Add status meters for health, weapon tier, enemy health, and hit streak.
- [x] Make buttons touch-friendly and keyboard-visible.
- [x] Add a collapsible play guide with controls and a short tip.
- [x] Standardize action and outcome text.
- [ ] Review the finished layout with a screen reader and on physical mobile devices.

## Sample UI Copy Changes

| Before | Now |
| --- | --- |
| `REPLAY?` | `Play again` |
| `You die.` | `Your health reached zero. Try again to free the town.` |
| `Monster Name` | `Opponent` |
| Long secret-game explanation | `Pick 2 or 8. The game draws 10 numbers from 0 to 10.` |

## How to Review the New UI

1. Open `index.html` in a current browser; no build or install step is needed.
2. Narrow the window to a phone width. Confirm that stat cards stay readable and actions stack into one column.
3. Use `Tab` to reach each action and the guide. Confirm the focus ring is visible and `Enter` or `Space` activates the selected control.
4. Open the store and cave. Check that the location heading and story change with each choice.
5. Start a fight. Check that the opponent health meter follows its number and the momentum meter fills on hits and resets on a miss.
6. Open the guide and read the controls and tip. Check the game with reduced motion enabled in the operating system or browser.

## Example Component Logic

The browser code stays plain HTML, CSS, and JavaScript. The meters read existing game state; the streak meter only reports consecutive hits.

```js
function refreshHud() {
  healthMeter.style.width = `${Math.max(0, Math.min(100, health))}%`;
  weaponText.textContent = weapons[currentWeapon].name;
  weaponMeter.setAttribute("aria-valuenow", currentWeapon + 1);
}

function updateMomentumMeter() {
  const streak = Math.min(hitStreak, 5);
  momentumText.textContent = `Momentum · ${streak}/5`;
  momentumMeter.setAttribute("aria-valuenow", streak);
  momentumMeterFill.style.width = `${(streak / 5) * 100}%`;
}
```

## Project Structure

```text
.
|-- index.html   # Game layout and UI containers
|-- RPG.css      # Visual design and responsive styles
`-- RPG.js       # Core game logic and state
```

## Notes

- This project is intentionally dependency-free and beginner-friendly.
- Game rules and combat values are unchanged. JavaScript now keeps the location heading and HUD meters in sync with game state.
