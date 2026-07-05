# Trad-O: The Protein Translation Game

**Trad-O** is a premium, arcade-style browser game prototype that gamifies the biological process of **protein translation**. It combines Tetris-like spatial awareness and drop mechanics with molecular biology.

## Gameplay Scenario

In living cells, a ribosome reads an **mRNA (messenger RNA)** sequence codon by codon to build a **polypeptide chain (protein)**. It does this by matching each codon to a complementary anticodon on a **tRNA (transfer RNA)** molecule, which carries the corresponding amino acid.

In **Trad-O**, you are the Ribosome:
1.  **A sequence of mRNA codons** scrolls horizontally at the bottom of the screen.
2.  **tRNA shuttles** spawn at the top of the screen, carrying a specific amino acid cargo (e.g., *Methionine (Met)*, *Phenylalanine (Phe)*, *Valine (Val)*).
3.  Each tRNA displays its **anticodon** sequence (e.g., `UAC`).
4.  Your job is to move the falling tRNA horizontally and drop it onto its **complementary codon** on the scrolling mRNA strand (e.g., tRNA `UAC` binds to mRNA `AUG`).

### Base Pairing Rules (Bonding Rules)
*   **A** (Adenine) binds to **U** (Uracil)
*   **U** (Uracil) binds to **A** (Adenine)
*   **G** (Guanine) binds to **C** (Cytosine)
*   **C** (Cytosine) binds to **G** (Guanine)

If you pair them correctly, the tRNA docks, the amino acid is added to the growing peptide chain at the top of the screen, and you score points! If you mismatch, the tRNA disintegrates, and the ribosome loses integrity (health).

---

## Controls

*   **Move Left / Right**: `Left Arrow` / `Right Arrow` (or slide your mouse/trackpad left and right).
*   **Drop tRNA**: `Down Arrow` / `Spacebar` (or left-click / tap on the canvas).
*   **Pause / Resume**: Press the `P` key (or click the **Pause System** button).
*   **Audio Controls**: Toggle sound effects using the **Mute Audio** button.

---

## Codon to Amino Acid Chart

Use this chart as a quick reference during gameplay (also visible in the left sidebar):

| tRNA Anticodon | mRNA Codon | Amino Acid | Description |
| :--- | :--- | :--- | :--- |
| **UAC** | **AUG** | **Met** | Methionine (Start Codon) |
| **AAA** | **UUU** | **Phe** | Phenylalanine |
| **CAG** | **GUC** | **Val** | Valine |
| **GGU** | **CCA** | **Pro** | Proline |
| **UUU** | **AAA** | **Lys** | Lysine |
| **CUG** | **GAC** | **Asp** | Aspartic Acid |
| **AGC** | **UCG** | **Ser** | Serine |

---

## Technical Details

*   **Core**: HTML5 Canvas, Vanilla CSS3, Modern JavaScript (ES6+).
*   **Aesthetics**: Glassmorphism HUD, CSS grid, glowing particle simulations, responsive layout, custom digital fonts.
*   **Sound**: Procedural audio synthesized dynamically using the browser's native **Web Audio API** (no heavy external assets required).
*   **Physics**: Quadratic Bezier curve projectile animations for amino acid docking, Verlet/wave physics for the polypeptide chain sway, and linear collision bounds.

## How to Play

Simply open `index.html` in any modern web browser.
1.  Double-click `index.html` or run a local HTTP server:
    ```bash
    # If python is installed
    python -n http.server 8000
    ```
2.  Press **Initialize Protocol** to start.
3.  Aim, pair, and build your protein!
