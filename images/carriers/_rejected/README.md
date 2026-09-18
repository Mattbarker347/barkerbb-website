# Rejected logo source files

Files here are NOT used by the site. `scripts/build-carriers-page.mjs` only looks
in the parent folder, so anything moved here falls back to a name tile, which
looks deliberate rather than broken.

Currently empty.

## Resolved

| file | what was wrong | resolved |
|---|---|---|
| `sun-life.png` | The source image was CROPPED: 390x111, wordmark read "Sun Lif" with the final letter cut off at the edge of the file itself. Caught by screenshot, not by the overflow assertion, which passed. | 2026-09-18. Matt supplied a clean 454x111 file. The cropped copy was deleted and the good one is live.
