# Rejected logo source files

Files here are NOT used by the site. `scripts/build-carriers-page.mjs` only looks
in the parent folder, so anything moved here falls back to a name tile, which
looks deliberate rather than broken.

| file | why | what fixes it |
|---|---|---|
| `sun-life.png` | The SOURCE IMAGE IS CROPPED. It is 390x111 and the wordmark reads "Sun Lif", the final letter is cut off at the right edge of the file itself. Confirmed by opening the file on its own, and by measuring the tile: the image rendered 151x43 inside 153px of space with even margins, so nothing on the page was clipping it. | Re-save a full copy from Sun Life's producer portal and drop it in as `images/carriers/sun-life.png`, then re-run the build script. |
