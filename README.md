# Trad-O: The Protein Translation Game

**Trad-O** is a premium, arcade-style browser game prototype that gamifies the biological process of **protein translation**. It combines Tetris-like spatial awareness and drop mechanics with molecular biology.

---

## Gameplay Mechanics

In living cells, a ribosome reads an **mRNA (messenger RNA)** sequence codon by codon to build a **polypeptide chain (protein)**. It does this by matching each codon to a complementary anticodon on a **tRNA (transfer RNA)** molecule, which carries the corresponding amino acid.

In **Trad-O**, you control the ribosomal docking sequence:
1. **Scrolling mRNA Strand**: A train of mRNA codons scrolls horizontally at the bottom of the screen.
2. **tRNA Shuttle**: A transfer RNA shuttle spawns at the top carrying a specific amino acid cargo (e.g., *Met*, *Phe*, *Val*). It displays its three-letter **anticodon** sequence (e.g., `UAC`).
3. **Out-of-Order Docking**: You can match the falling tRNA onto *any* complementary codon currently scrolling on screen (e.g., tRNA `UAC` binds to mRNA `AUG` base pairing: `A-U`, `G-C`).
4. **HUD Polypeptide Chain**: Correctly matched residues spawn a Bezier curve canvas projectile that flies up to dock with the jiggling, physics-based polypeptide progress chain in the header, lighting up empty circles for that specific amino acid type.
5. **Level Completion**: Each of the 20 levels requires synthesizing a real human protein (e.g. Defensin-6, Hepcidin) fetched from NCBI databases. The protein length increases by 1 amino acid per level (from 100 up to 119 aa).

### Dynamic Difficulty & Active Spawning Pools
* **Start of Level**: Spawns only the codons for the **3 most frequent** amino acids in the target protein, minimizing the active pool size.
* **Progressing Level**: Every 2 matches unlocks additional amino acid types and codon synonyms, raising complexity.
* **End of Level**: Once an amino acid's requirement is met, its codons are removed from the spawning pool, naturally narrowing down the anticodon space as you approach completion.

---

## Features

### 1. Translation Queue (Left Panel)
Replaces static reference tables with a dynamic, Tetris-like preview queue:
* **CURRENT CARGO**: Shows details for the falling tRNA.
* **NEXT CARGO**: Shows details for the next scheduled tRNA.
* **Slide-Up Animation**: Consuming the current tRNA triggers a smooth sliding transition, shifting the next cargo up into the active slot while slide-fading a new one in at the bottom.

### 2. Level Milestones (Every 20 Residues)
To break up the long length of 100+ aa sequences:
* Reaching a multiple of 20 translated residues awards a score bonus of `1000 * level`.
* Triggers a widescreen text overlay banner ("MILESTONE COMPLETED!") and three large colorful particle explosions on canvas.

### 3. Procedural Audio & Background Music
All sounds are synthesized dynamically using the browser's native **Web Audio API**:
* **Sound Effects**: Distinct frequencies for SPAWN, MATCH, MISMATCH, MILESTONE, and GAMEOVER.
* **Hypnotic BGM**: A synthesized chiptune loop blending a soft triangle-wave Tetris melody (*Korobeiniki*) with a deep sine-wave arpeggiating sub-bassline in A minor.
* **Dual Mute Controls**: Separate buttons to toggle Sound Effects (SFX) and Background Music (BGM) independently in the right panel.

### 4. High-Score Leaderboard (Top 10)
Competitive local scoreboard stored in the browser's `localStorage`:
* Eligible players (who haven't used auto-play) entering the top 10 can record their name (max 9 characters).
* Rank #1 is automatically synced with the High Score HUD indicator.

### 5. Developer Auto-Play AI
* **Auto Activation**: Toggled by typing the keyboard sequence **`auto`** while playing. An indicator reads `● AI ASSIST PROTOCOL ACTIVE`.
* **Inactivity Demo**: If the player remains idle on the start screen for 30 seconds, the game starts in `● SYSTEM DEMO ACTIVE` mode. Pressing any key or clicking the canvas exits the demo back to the start menu.
* **Simulated Errors**: The AI features a 15% random error rate, intentionally targeting mismatching blocks now and then to test shield depletion.

---

## Controls

* **Move Left / Right**: `Left Arrow` / `Right Arrow` (or WASD / slide mouse).
* **Drop tRNA**: `Down Arrow` / `Spacebar` (or left-click canvas).
* **Pause / Resume**: Press the `P` key (or click the **Pause System** button).
* **Exit / Reset**: Press `Escape` (ESC) to reset the game state and return to the main menu overlay.
* **Audio SFX Toggle**: Click the **Mute SFX** button.
* **Audio BGM Toggle**: Click the **BGM: On/Off** button.
* **AI Play Trigger**: Type **`auto`** during play.

---

## Technical Architecture

* **Verlet Integration Polypeptide**: The visual chain at the top simulates spring tension and jiggles on docking.
* **Framerate-Independent Physics**: Velocities, gravity, and transitions are scaled using a delta-time (`dt / 16.667`) algorithm, ensuring identical game speeds across 60Hz (Safari) and 120Hz/144Hz (Chrome) displays.
* **Browser Autoplay Compliance**: Suspended AudioContexts are resumed on first user click gesture.

---

## How to Play

### 1. Direct Play (Recommended / Easiest)
You do not need to install anything or run a local server. Simply:
1. Download or clone this repository.
2. Double-click the **[index.html](index.html)** file to open it directly in any modern web browser (Chrome, Firefox, Safari, Edge).
3. Click **Initialize Protocol** and start playing!

### 2. Run Locally via HTTP Server (Optional)
If you prefer to run the game through a local HTTP server:
1. Open a terminal and navigate to the project directory:
   ```bash
   cd path/to/trad-o
   ```
2. Start a static local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open [http://localhost:8000](http://localhost:8000) in your web browser.
4. Click **Initialize Protocol** to begin!
