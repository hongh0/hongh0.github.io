# Omni-Diffusion-Distill — project page

Static site (no build step) served by GitHub Pages from the repo root.

## Adding results

All content lives in [`static/data/content.js`](static/data/content.js). Put images under
`static/images/…` and reference them by relative path. Any empty string renders as a
"coming soon" placeholder.

| Section | Key in `content.js` | Fields |
|---|---|---|
| Hero buttons | `links` | `paper`, `arxiv`, `code`, `model` (empty = "soon" badge) |
| Decoding race | `race` | `t2i.image`, `i2i.image` (revealed under the tiles), `mmu.answer` |
| Latency bars | `speed` | measured seconds / steps / NFE per task |
| Gallery | `gallery.t2i / edit / control / mmu` | see the commented example in each list |
| Comparison | `comparison.t2i / edit / mmu` | `results.{teacher_full, teacher_few, t3d, dimo, cdlm, ours}` |
| Score table | `scores` | overall scores per benchmark |

For text comparisons, wrap words in `[[…]]` to mark them red (repeated or wrong) and
`{{…}}` to mark them green (correct).

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
