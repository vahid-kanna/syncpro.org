# SyncPro — brand assets

All vector files are outlined: the wordmark is converted to paths, so nothing
depends on Geist being installed. What you see here is what renders in a browser,
Figma, Word, Illustrator, Keynote or a laser cutter.

## The mark

An S built from a single orthogonal path — enter top-right, left along the top
rail, down the left side, right through the middle, down the right side, out
along the bottom rail. Read as a letter it says SyncPro. Read as a diagram it is
a finish-to-start activity path, which is the one shape every project-controls
engineer already has in their head.

Geometry, if you need to redraw it: a 24-unit grid, path inset by half the stroke
so the ink occupies 4..20, stroke 2.8, round caps and joins.

```
M18.6 5.4 H5.4 V12 H18.6 V18.6 H5.4
```

## Files

| File | Use |
|---|---|
| `syncpro-logo-horizontal.svg` | The default. Mark plus wordmark. |
| `syncpro-logo-horizontal-mono.svg` | Same, one colour. For single-colour print. |
| `syncpro-logo-stacked.svg` | Square-ish spaces: avatars, slide covers, merch. |
| `syncpro-wordmark.svg` | Wordmark alone, "Sync" ink and "Pro" amber. |
| `syncpro-wordmark-mono.svg` | Wordmark alone, one colour. |
| `syncpro-mark-amber.svg` | The mark on graphite and other dark surfaces. |
| `syncpro-mark-white.svg` | The mark on photography or on brand colour. |
| `syncpro-mark-graphite.svg` | The mark on white and light grey. |
| `syncpro-icon.svg` | Rounded tile, 512 master. Site and app use. |
| `syncpro-icon-square.svg` | Full bleed, 512. For anything that masks. |
| `syncpro-icon-maskable.svg` | Full bleed with 22% padding for Android's circular crop. |
| `favicon.svg` | Browser tab. |
| `favicon-16.png` `favicon-32.png` `favicon-48.png` | Raster tabs, transparent corners. |
| `apple-touch-icon.png` | 180px, opaque, for iOS home screen. |
| `icon-512.png` `icon-maskable-512.png` | PWA manifest icons. |

## Colour

Pulled verbatim from the product design system so the mark and the app cannot
drift apart.

| | Hex | Contrast |
|---|---|---|
| Graphite | `#0C0E11` | primary surface |
| Ink | `#F3F5F7` | 15.2:1 on graphite |
| Amber | `#F0A83A` | 9.6:1 on graphite — **2.0:1 on white** |
| Steel | `#5896E0` | data only, never branding |

Amber is a dark-background accent. On white it measures 2.0:1, which is why the
favicon is a tile rather than a bare mark, and why the mark has a graphite
variant. Do not use amber on a light background.

## Rules

- **Clear space.** x = the height of the mark. Nothing comes inside it.
- **Minimum sizes.** Mark 16px. Horizontal lockup 96px wide. Stacked 64px wide.
- **Scale proportionally.** Never stretch or condense.
- **One flat colour.** No gradients, glows, bevels or drop shadows. The mark is a
  stroke, not a fill, so it converts to a single colour without redrawing.
- **Do not rotate.** The rails are orthogonal on purpose; a tilted S reads as a
  soft curve and loses the path metaphor.

## Regenerating

The SVGs are generated, not hand-drawn. The generator outlines Geist from Google
Fonts (which serves it as a variable font — one latin woff2 covering wght
100–900, which must be instanced before the outlines are read) and the PNGs are
rasterised with Pillow at 4x. Ask Rey to re-run it if the mark or the type
weight changes.
