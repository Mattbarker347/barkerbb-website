# Logo files NOT used by the site

`scripts/build-carriers-page.mjs` only looks in the parent folder, so anything
moved here falls back to a name tile rather than a broken image.

Nothing here is deleted. These are kept so a reversal is a one line move.

| file | why it is here |
|---|---|
| `allstate-benefits.jpg` | Matt, 2026-09-19: "take allstate out completely." Not a bad file. The Standard acquired Allstate's Employer Voluntary Benefits business for about $2B (announced 2024-08-13, closed 2025) and from 2026-01-01 those products sell under The Standard as American Heritage Employer Voluntary Benefits. The Standard is already on the carriers page under Supplemental and Life, so the products are still represented and only the retired brand came off. Nationwide took the level funded medical slot. |

## Resolved

| file | what was wrong | resolved |
|---|---|---|
| `sun-life.png` | The source image was CROPPED: 390x111, the wordmark read "Sun Lif" with the final letter cut off inside the file itself. Caught by screenshot, not by the overflow assertion, which passed. | 2026-09-18. Matt supplied a clean 454x111 file. The cropped copy was deleted and the good one is live. |
