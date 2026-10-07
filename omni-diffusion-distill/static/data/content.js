/*
 * All page content lives here. Edit this file to add results; no HTML changes needed.
 *
 * Image paths are relative to the repo root, e.g. "static/images/gallery/t2i_01.jpg".
 * Any empty string ("") renders as a "coming soon" placeholder tile.
 */
window.SITE = {
  links: {
    paper: "",   // PDF or OpenReview link
    arxiv: "",   // e.g. "https://arxiv.org/abs/xxxx.xxxxx"
    code: "",    // e.g. "https://github.com/<org>/omni-diffusion-distill"
    model: "",   // e.g. "https://huggingface.co/<org>/omni-diffusion-distill"
  },

  // Hero background: each cycle decodes one of these images, tile by tile, in 8 random steps.
  hero: {
    images: [
      "static/images/results/t2i/p02_ours.jpg",
      "static/images/results/t2i/p08_ours.jpg",
      "static/images/results/t2i/p05_ours.jpg",
      "static/images/results/t2i/p13_ours.jpg",
      "static/images/results/t2i/p04_ours.jpg",
      "static/images/results/t2i/p01_ours.jpg",
    ],
  },

  // Personal homepages; an empty string shows the name without a link.
  authors: {
    "Hong Huang": "https://hongh0.github.io/",
    "Chenhongyi Yang": "https://chenhongyiyang.github.io/",
    "Junzhe Sun": "https://scholar.google.com/citations?user=wyi0bX0AAAAJ&hl=en",
    "Animesh Sinha": "http://animesh-sinha.com/",
    "Wuyang Chen": "https://scholar.google.com/citations?user=RHOcEtsAAAAJ&hl=en",
    "Yifan Jiang": "https://yifanjiang19.github.io/",
  },

  // Wall-clock latency per output on one A100 (Table "Inference Cost per Output").
  speed: [
    { task: "Text-to-Image",  key: "t2i", teacher: { steps: 128, nfe: 256, sec: 106.4 }, ours: { steps: 8,  nfe: 8,  sec: 5.84 }, speedup: 18.2 },
    { task: "Image Editing",  key: "i2i", teacher: { steps: 128, nfe: 384, sec: 79.6 },  ours: { steps: 8,  nfe: 8,  sec: 2.28 }, speedup: 34.9 },
    { task: "Understanding",  key: "mmu", teacher: { steps: 512, nfe: 512, sec: 80.7 },  ours: { steps: 64, nfe: 64, sec: 3.81 }, speedup: 21.2 },
  ],

  // Decoding race: each lane reveals its own final output.
  race: {
    t2i: { prompt: "A photo of a purple suitcase and an orange pizza", teacher: "static/images/results/t2i/p02_teacher_full.jpg", ours: "static/images/results/t2i/p02_ours.jpg" },
    i2i: { source: "static/images/results/edit/e06_source.jpg", instruction: "Replace the seaplane in the image with a hot air balloon.", teacher: "static/images/results/edit/e06_teacher_full.jpg", ours: "static/images/results/edit/e06_ours.jpg" },
    mmu: { image: "static/images/results/mmu/q3.jpg", question: "Please describe the image.",
           teacher: "The image depicts a large airplane flying in a clear blue sky. The airplane is predominantly white with red and yellow accents.",
           ours: "A image shows a airplane flying through a blue sky." },
  },

  // ---------- Gallery: our results only (8 image steps / 64 text steps) ----------
  gallery: {
  "t2i": [
    {
      "image": "static/images/results/t2i/p01_ours.jpg",
      "prompt": "A photo of a wine glass above a kite"
    },
    {
      "image": "static/images/results/t2i/p02_ours.jpg",
      "prompt": "A photo of a purple suitcase and an orange pizza"
    },
    {
      "image": "static/images/results/t2i/p03_ours.jpg",
      "prompt": "A photo of a red stop sign and a blue book"
    },
    {
      "image": "static/images/results/t2i/p04_ours.jpg",
      "prompt": "... a bustling cityscape, during the golden hour of sunset, stands an enormous trombone ... Around its base, people and vehicles move about ..."
    },
    {
      "image": "static/images/results/t2i/p05_ours.jpg",
      "prompt": "A vibrant lavender backpack with a plush triceratops head peeking out from the top ... resting against a pale wooden bench... scattered crayons and … childlike drawings."
    },
    {
      "image": "static/images/results/t2i/p06_ours.jpg",
      "prompt": "... spells out the word 'DRAW' using an array of artist pencils ... pastel color palette... a serene blue background..."
    },
    {
      "image": "static/images/results/t2i/p07_ours.jpg",
      "prompt": "... an 18th-century French castle crafted from white stone... Bottom windows resemble triumphal arches ... Wispy clouds float in a clear blue sky."
    },
    {
      "image": "static/images/results/t2i/p08_ours.jpg",
      "prompt": "... ice palace rises with translucent LEGO bricks... Penguin workers in tiny hard hats... carrying icy-blue bricks... with a soft turquoise hue... Each brick... matte texture... their orange beaks and feet... with faint northern lights..."
    },
    {
      "image": "static/images/results/t2i/p09_ours.jpg",
      "prompt": "On the park bench at dusk... books and two apples. One of the books is open and the apple is on the left side of the book."
    },
    {
      "image": "static/images/results/t2i/p10_ours.jpg",
      "prompt": "The man on the left counts the three paintings on the wall with a confused look, but the friend on his right happily points to the fourth painting …"
    },
    {
      "image": "static/images/results/t2i/p11_ours.jpg",
      "prompt": "In the ink painting style, a lonely swordsman stood on the edge of a cliff, facing the strong wind. His face had no expression, but his eyes were filled with endless sadness."
    },
    {
      "image": "static/images/results/t2i/p12_ours.jpg",
      "prompt": "In the ink painting style, a thirsty crow stands next to a water bottle, thinking about how to drink the water at the bottom of the bottle. There are a few small stones scattered next to the water bottle."
    },
    {
      "image": "static/images/results/t2i/p13_ours.jpg",
      "prompt": "An intricate culinary creation, a map of the United States crafted entirely out of assorted sushi pieces, is displayed on a large, round white plate... on a dark wooden table... a tall glass of red wine to its right... of rice, seaweed, and various fish."
    },
    {
      "image": "static/images/results/t2i/p14_ours.jpg",
      "prompt": "In a dimly lit room during twilight, a sleek, white toothbrush with angular bristles rests against... computer monitor... casting long shadows on the desk. ... monitor's base reflects a faint shimmer..."
    },
    {
      "image": "static/images/results/t2i/p15_ours.jpg",
      "prompt": "1girl, solo, upper body, falling leaves, hand up, looking at viewer, open mouth, chinese hairpin, long hair, hair ornament, hair stick, high ponytail, ponytail, cleavage cutout, china dress, chinese clothes, clothing cutout, dress, highres, monochrome, leaf, anime"
    },
    {
      "image": "static/images/results/t2i/p16_ours.jpg",
      "prompt": "A metallic rose that is not fully bloomed is higher than a blooming fabric rose."
    }
  ],
  "edit": [
    {
      "source": "static/images/results/edit/e01_source.jpg",
      "output": "static/images/results/edit/e01_ours.jpg",
      "instruction": "Add a deer standing near the edge of the snow-covered forest on the right side of the image, close to the leaning tree.",
      "type": "Add"
    },
    {
      "source": "static/images/results/edit/e02_source.jpg",
      "output": "static/images/results/edit/e02_ours.jpg",
      "instruction": "Replace the priest in the image with a large cactus plant.",
      "type": "Replace"
    },
    {
      "source": "static/images/results/edit/e03_source.jpg",
      "output": "static/images/results/edit/e03_ours.jpg",
      "instruction": "Change the castle-like structure in the picture from a garden setting to a bustling cityscape with skyscrapers.",
      "type": "Background"
    },
    {
      "source": "static/images/results/edit/e04_source.jpg",
      "output": "static/images/results/edit/e04_ours.jpg",
      "instruction": "Transfer the image into a Lego-brick stop-motion diorama style.",
      "type": "Style"
    },
    {
      "source": "static/images/results/edit/e05_source.jpg",
      "output": "static/images/results/edit/e05_ours.jpg",
      "instruction": "Add a small wooden cabin to the left side of the image, near the tree, blending naturally with the landscape.",
      "type": "Add"
    },
    {
      "source": "static/images/results/edit/e06_source.jpg",
      "output": "static/images/results/edit/e06_ours.jpg",
      "instruction": "Replace the seaplane in the image with a hot air balloon.",
      "type": "Replace"
    },
    {
      "source": "static/images/results/edit/e07_source.jpg",
      "output": "static/images/results/edit/e07_ours.jpg",
      "instruction": "Change the luxury boat color to red.",
      "type": "Adjust"
    },
    {
      "source": "static/images/results/edit/e08_source.jpg",
      "output": "static/images/results/edit/e08_ours.jpg",
      "instruction": "Transfer the image into an ornate steampunk brass-engraving style.",
      "type": "Style"
    },
    {
      "source": "static/images/results/edit/e09_source.jpg",
      "output": "static/images/results/edit/e09_ours.jpg",
      "instruction": "Add a bee on the flower center in the lower-left foreground.",
      "type": "Add"
    },
    {
      "source": "static/images/results/edit/e10_source.jpg",
      "output": "static/images/results/edit/e10_ours.jpg",
      "instruction": "Replace the dog in the lower right foreground of the image with a large wolf.",
      "type": "Replace"
    },
    {
      "source": "static/images/results/edit/e11_source.jpg",
      "output": "static/images/results/edit/e11_ours.jpg",
      "instruction": "Change the large stone pedestal … to a smooth dark gray texture.",
      "type": "Adjust"
    },
    {
      "source": "static/images/results/edit/e12_source.jpg",
      "output": "static/images/results/edit/e12_ours.jpg",
      "instruction": "Change the grassy meadow in the background to a beach setting.",
      "type": "Background"
    }
  ],
  "control": [
    {
      "condition": "static/images/results/control/c1_condition.jpg",
      "output": "static/images/results/control/c1_ours.jpg",
      "type": "Subject-driven",
      "prompt": "Seen from the inside looking out, it offers panoramic city views through large windows, filled with passengers seated comfortably …."
    },
    {
      "condition": "static/images/results/control/c2_condition.jpg",
      "output": "static/images/results/control/c2_ours.jpg",
      "type": "Subject-driven",
      "prompt": "Gracefully set on a grassy hill during an outdoor concert, it's framed against a vivid sunset, the silhouettes of musicians and audience adding …."
    },
    {
      "condition": "static/images/results/control/c3_condition.jpg",
      "output": "static/images/results/control/c3_ours.jpg",
      "type": "Depth",
      "prompt": "Perched elegantly on a marble countertop, it resides amidst an evening dinner party scene, with candles flickering softly and guests mingling …."
    },
    {
      "condition": "static/images/results/control/c4_condition.jpg",
      "output": "static/images/results/control/c4_ours.jpg",
      "type": "Canny",
      "prompt": "Amidst a bustling street market, it dangles from a vendor's stall, surrounded by colorful trinkets and vibrant fabrics …."
    }
  ],
  "mmu": [
    {
      "image": "static/images/results/mmu/q1.jpg",
      "question": "How many types of drinks are there in the fridge?",
      "answer": "There are two types of drinks in the fridge."
    },
    {
      "image": "static/images/results/mmu/q2.jpg",
      "question": "Where was this photo taken?",
      "answer": "This photo was taken in a mountainous region Japan a lake. The presence includes a lake surrounded calm water, and a large mountain visible in the background."
    },
    {
      "image": "static/images/results/mmu/q3.jpg",
      "question": "Please describe the image.",
      "answer": "A image shows a airplane flying through a blue sky."
    }
  ]
},

  // ---------- Comparison: same prompt, every method ----------
  // Column order and labels. NFE = decoding steps x forward passes per step.
  // Each example shows only the methods present in its `results`.
  methods: [
    { key: "teacher_full", label: "Teacher",            sub: "full-step", nfe: { t2i: "128×2", edit: "128×3", control: "128×3", mmu: "512" } },
    { key: "teacher_few",  label: "Teacher",            sub: "few-step",  nfe: { t2i: "8×2",   edit: "8×3",   control: "8×3",   mmu: "64" } },
    { key: "t3d",          label: "T3D",                sub: "",          nfe: { t2i: "8×1",   edit: "8×1",   control: "8×1",   mmu: "64" } },
    { key: "dimo",         label: "Di[M]O",             sub: "",          nfe: { t2i: "8×1",   edit: "8×1",   control: "8×1",   mmu: "64" } },
    { key: "cdlm",         label: "CDLM",               sub: "",          nfe: { t2i: "8×1",   edit: "8×1",   control: "8×1",   mmu: "64" } },
    { key: "ours",         label: "Omni-Diffusion-Distill", sub: "ours",  nfe: { t2i: "8×1",   edit: "8×1",   control: "8×1",   mmu: "64" } },
  ],
  // Text answers: [[...]] = repeated/incorrect (red), {{...}} = correct (green).
  comparison: {
  "t2i": [
    {
      "prompt": "A photo of a wine glass above a kite",
      "results": {
        "ours": "static/images/results/t2i/p01_ours.jpg",
        "t3d": "static/images/results/t2i/p01_t3d.jpg",
        "dimo": "static/images/results/t2i/p01_dimo.jpg",
        "cdlm": "static/images/results/t2i/p01_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p01_teacher_full.jpg"
      }
    },
    {
      "prompt": "A photo of a purple suitcase and an orange pizza",
      "results": {
        "ours": "static/images/results/t2i/p02_ours.jpg",
        "t3d": "static/images/results/t2i/p02_t3d.jpg",
        "dimo": "static/images/results/t2i/p02_dimo.jpg",
        "cdlm": "static/images/results/t2i/p02_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p02_teacher_full.jpg"
      }
    },
    {
      "prompt": "A photo of a red stop sign and a blue book",
      "results": {
        "ours": "static/images/results/t2i/p03_ours.jpg",
        "t3d": "static/images/results/t2i/p03_t3d.jpg",
        "dimo": "static/images/results/t2i/p03_dimo.jpg",
        "cdlm": "static/images/results/t2i/p03_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p03_teacher_full.jpg"
      }
    },
    {
      "prompt": "... a bustling cityscape, during the golden hour of sunset, stands an enormous trombone ... Around its base, people and vehicles move about ...",
      "results": {
        "ours": "static/images/results/t2i/p04_ours.jpg",
        "t3d": "static/images/results/t2i/p04_t3d.jpg",
        "dimo": "static/images/results/t2i/p04_dimo.jpg",
        "cdlm": "static/images/results/t2i/p04_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p04_teacher_full.jpg"
      }
    },
    {
      "prompt": "A vibrant lavender backpack with a plush triceratops head peeking out from the top ... resting against a pale wooden bench... scattered crayons and … childlike drawings.",
      "results": {
        "ours": "static/images/results/t2i/p05_ours.jpg",
        "t3d": "static/images/results/t2i/p05_t3d.jpg",
        "dimo": "static/images/results/t2i/p05_dimo.jpg",
        "cdlm": "static/images/results/t2i/p05_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p05_teacher_full.jpg"
      }
    },
    {
      "prompt": "... spells out the word 'DRAW' using an array of artist pencils ... pastel color palette... a serene blue background...",
      "results": {
        "ours": "static/images/results/t2i/p06_ours.jpg",
        "t3d": "static/images/results/t2i/p06_t3d.jpg",
        "dimo": "static/images/results/t2i/p06_dimo.jpg",
        "cdlm": "static/images/results/t2i/p06_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p06_teacher_full.jpg"
      }
    },
    {
      "prompt": "... an 18th-century French castle crafted from white stone... Bottom windows resemble triumphal arches ... Wispy clouds float in a clear blue sky.",
      "results": {
        "ours": "static/images/results/t2i/p07_ours.jpg",
        "t3d": "static/images/results/t2i/p07_t3d.jpg",
        "dimo": "static/images/results/t2i/p07_dimo.jpg",
        "cdlm": "static/images/results/t2i/p07_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p07_teacher_full.jpg"
      }
    },
    {
      "prompt": "... ice palace rises with translucent LEGO bricks... Penguin workers in tiny hard hats... carrying icy-blue bricks... with a soft turquoise hue... Each brick... matte texture... their orange beaks and feet... with faint northern lights...",
      "results": {
        "ours": "static/images/results/t2i/p08_ours.jpg",
        "t3d": "static/images/results/t2i/p08_t3d.jpg",
        "dimo": "static/images/results/t2i/p08_dimo.jpg",
        "cdlm": "static/images/results/t2i/p08_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p08_teacher_full.jpg"
      }
    },
    {
      "prompt": "On the park bench at dusk... books and two apples. One of the books is open and the apple is on the left side of the book.",
      "results": {
        "ours": "static/images/results/t2i/p09_ours.jpg",
        "t3d": "static/images/results/t2i/p09_t3d.jpg",
        "dimo": "static/images/results/t2i/p09_dimo.jpg",
        "cdlm": "static/images/results/t2i/p09_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p09_teacher_full.jpg"
      }
    },
    {
      "prompt": "The man on the left counts the three paintings on the wall with a confused look, but the friend on his right happily points to the fourth painting …",
      "results": {
        "ours": "static/images/results/t2i/p10_ours.jpg",
        "t3d": "static/images/results/t2i/p10_t3d.jpg",
        "dimo": "static/images/results/t2i/p10_dimo.jpg",
        "cdlm": "static/images/results/t2i/p10_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p10_teacher_full.jpg"
      }
    },
    {
      "prompt": "In the ink painting style, a lonely swordsman stood on the edge of a cliff, facing the strong wind. His face had no expression, but his eyes were filled with endless sadness.",
      "results": {
        "ours": "static/images/results/t2i/p11_ours.jpg",
        "t3d": "static/images/results/t2i/p11_t3d.jpg",
        "dimo": "static/images/results/t2i/p11_dimo.jpg",
        "cdlm": "static/images/results/t2i/p11_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p11_teacher_full.jpg"
      }
    },
    {
      "prompt": "In the ink painting style, a thirsty crow stands next to a water bottle, thinking about how to drink the water at the bottom of the bottle. There are a few small stones scattered next to the water bottle.",
      "results": {
        "ours": "static/images/results/t2i/p12_ours.jpg",
        "t3d": "static/images/results/t2i/p12_t3d.jpg",
        "dimo": "static/images/results/t2i/p12_dimo.jpg",
        "cdlm": "static/images/results/t2i/p12_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p12_teacher_full.jpg"
      }
    },
    {
      "prompt": "An intricate culinary creation, a map of the United States crafted entirely out of assorted sushi pieces, is displayed on a large, round white plate... on a dark wooden table... a tall glass of red wine to its right... of rice, seaweed, and various fish.",
      "results": {
        "ours": "static/images/results/t2i/p13_ours.jpg",
        "t3d": "static/images/results/t2i/p13_t3d.jpg",
        "dimo": "static/images/results/t2i/p13_dimo.jpg",
        "cdlm": "static/images/results/t2i/p13_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p13_teacher_full.jpg"
      }
    },
    {
      "prompt": "In a dimly lit room during twilight, a sleek, white toothbrush with angular bristles rests against... computer monitor... casting long shadows on the desk. ... monitor's base reflects a faint shimmer...",
      "results": {
        "ours": "static/images/results/t2i/p14_ours.jpg",
        "t3d": "static/images/results/t2i/p14_t3d.jpg",
        "dimo": "static/images/results/t2i/p14_dimo.jpg",
        "cdlm": "static/images/results/t2i/p14_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p14_teacher_full.jpg"
      }
    },
    {
      "prompt": "1girl, solo, upper body, falling leaves, hand up, looking at viewer, open mouth, chinese hairpin, long hair, hair ornament, hair stick, high ponytail, ponytail, cleavage cutout, china dress, chinese clothes, clothing cutout, dress, highres, monochrome, leaf, anime",
      "results": {
        "ours": "static/images/results/t2i/p15_ours.jpg",
        "t3d": "static/images/results/t2i/p15_t3d.jpg",
        "dimo": "static/images/results/t2i/p15_dimo.jpg",
        "cdlm": "static/images/results/t2i/p15_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p15_teacher_full.jpg"
      }
    },
    {
      "prompt": "A metallic rose that is not fully bloomed is higher than a blooming fabric rose.",
      "results": {
        "ours": "static/images/results/t2i/p16_ours.jpg",
        "t3d": "static/images/results/t2i/p16_t3d.jpg",
        "dimo": "static/images/results/t2i/p16_dimo.jpg",
        "cdlm": "static/images/results/t2i/p16_cdlm.jpg",
        "teacher_full": "static/images/results/t2i/p16_teacher_full.jpg"
      }
    }
  ],
  "edit": [
    {
      "source": "static/images/results/edit/e01_source.jpg",
      "type": "Add",
      "instruction": "Add a deer standing near the edge of the snow-covered forest on the right side of the image, close to the leaning tree.",
      "results": {
        "ours": "static/images/results/edit/e01_ours.jpg",
        "t3d": "static/images/results/edit/e01_t3d.jpg",
        "dimo": "static/images/results/edit/e01_dimo.jpg",
        "cdlm": "static/images/results/edit/e01_cdlm.jpg",
        "teacher_full": "static/images/results/edit/e01_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e02_source.jpg",
      "type": "Replace",
      "instruction": "Replace the priest in the image with a large cactus plant.",
      "results": {
        "ours": "static/images/results/edit/e02_ours.jpg",
        "t3d": "static/images/results/edit/e02_t3d.jpg",
        "dimo": "static/images/results/edit/e02_dimo.jpg",
        "cdlm": "static/images/results/edit/e02_cdlm.jpg",
        "teacher_full": "static/images/results/edit/e02_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e03_source.jpg",
      "type": "Background",
      "instruction": "Change the castle-like structure in the picture from a garden setting to a bustling cityscape with skyscrapers.",
      "results": {
        "ours": "static/images/results/edit/e03_ours.jpg",
        "dimo": "static/images/results/edit/e03_dimo.jpg",
        "t3d": "static/images/results/edit/e03_t3d.jpg",
        "cdlm": "static/images/results/edit/e03_cdlm.jpg",
        "teacher_full": "static/images/results/edit/e03_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e04_source.jpg",
      "type": "Style",
      "instruction": "Transfer the image into a Lego-brick stop-motion diorama style.",
      "results": {
        "ours": "static/images/results/edit/e04_ours.jpg",
        "t3d": "static/images/results/edit/e04_t3d.jpg",
        "dimo": "static/images/results/edit/e04_dimo.jpg",
        "cdlm": "static/images/results/edit/e04_cdlm.jpg",
        "teacher_full": "static/images/results/edit/e04_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e05_source.jpg",
      "type": "Add",
      "instruction": "Add a small wooden cabin to the left side of the image, near the tree, blending naturally with the landscape.",
      "results": {
        "ours": "static/images/results/edit/e05_ours.jpg",
        "dimo": "static/images/results/edit/e05_dimo.jpg",
        "teacher_full": "static/images/results/edit/e05_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e06_source.jpg",
      "type": "Replace",
      "instruction": "Replace the seaplane in the image with a hot air balloon.",
      "results": {
        "ours": "static/images/results/edit/e06_ours.jpg",
        "dimo": "static/images/results/edit/e06_dimo.jpg",
        "teacher_full": "static/images/results/edit/e06_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e07_source.jpg",
      "type": "Adjust",
      "instruction": "Change the luxury boat color to red.",
      "results": {
        "dimo": "static/images/results/edit/e07_dimo.jpg",
        "ours": "static/images/results/edit/e07_ours.jpg",
        "teacher_full": "static/images/results/edit/e07_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e08_source.jpg",
      "type": "Style",
      "instruction": "Transfer the image into an ornate steampunk brass-engraving style.",
      "results": {
        "dimo": "static/images/results/edit/e08_dimo.jpg",
        "ours": "static/images/results/edit/e08_ours.jpg",
        "teacher_full": "static/images/results/edit/e08_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e09_source.jpg",
      "type": "Add",
      "instruction": "Add a bee on the flower center in the lower-left foreground.",
      "results": {
        "ours": "static/images/results/edit/e09_ours.jpg",
        "teacher_full": "static/images/results/edit/e09_teacher_full.jpg",
        "dimo": "static/images/results/edit/e09_dimo.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e10_source.jpg",
      "type": "Replace",
      "instruction": "Replace the dog in the lower right foreground of the image with a large wolf.",
      "results": {
        "ours": "static/images/results/edit/e10_ours.jpg",
        "teacher_full": "static/images/results/edit/e10_teacher_full.jpg",
        "dimo": "static/images/results/edit/e10_dimo.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e11_source.jpg",
      "type": "Adjust",
      "instruction": "Change the large stone pedestal … to a smooth dark gray texture.",
      "results": {
        "ours": "static/images/results/edit/e11_ours.jpg",
        "teacher_full": "static/images/results/edit/e11_teacher_full.jpg",
        "dimo": "static/images/results/edit/e11_dimo.jpg"
      }
    },
    {
      "source": "static/images/results/edit/e12_source.jpg",
      "type": "Background",
      "instruction": "Change the grassy meadow in the background to a beach setting.",
      "results": {
        "ours": "static/images/results/edit/e12_ours.jpg",
        "teacher_full": "static/images/results/edit/e12_teacher_full.jpg",
        "dimo": "static/images/results/edit/e12_dimo.jpg"
      }
    }
  ],
  "control": [
    {
      "source": "static/images/results/control/c1_condition.jpg",
      "type": "Subject-driven",
      "instruction": "Seen from the inside looking out, it offers panoramic city views through large windows, filled with passengers seated comfortably ….",
      "results": {
        "ours": "static/images/results/control/c1_ours.jpg",
        "t3d": "static/images/results/control/c1_t3d.jpg",
        "dimo": "static/images/results/control/c1_dimo.jpg",
        "cdlm": "static/images/results/control/c1_cdlm.jpg",
        "teacher_full": "static/images/results/control/c1_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/control/c2_condition.jpg",
      "type": "Subject-driven",
      "instruction": "Gracefully set on a grassy hill during an outdoor concert, it's framed against a vivid sunset, the silhouettes of musicians and audience adding ….",
      "results": {
        "ours": "static/images/results/control/c2_ours.jpg",
        "t3d": "static/images/results/control/c2_t3d.jpg",
        "dimo": "static/images/results/control/c2_dimo.jpg",
        "cdlm": "static/images/results/control/c2_cdlm.jpg",
        "teacher_full": "static/images/results/control/c2_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/control/c3_condition.jpg",
      "type": "Depth",
      "instruction": "Perched elegantly on a marble countertop, it resides amidst an evening dinner party scene, with candles flickering softly and guests mingling ….",
      "results": {
        "ours": "static/images/results/control/c3_ours.jpg",
        "t3d": "static/images/results/control/c3_t3d.jpg",
        "dimo": "static/images/results/control/c3_dimo.jpg",
        "cdlm": "static/images/results/control/c3_cdlm.jpg",
        "teacher_full": "static/images/results/control/c3_teacher_full.jpg"
      }
    },
    {
      "source": "static/images/results/control/c4_condition.jpg",
      "type": "Canny",
      "instruction": "Amidst a bustling street market, it dangles from a vendor's stall, surrounded by colorful trinkets and vibrant fabrics ….",
      "results": {
        "ours": "static/images/results/control/c4_ours.jpg",
        "t3d": "static/images/results/control/c4_t3d.jpg",
        "dimo": "static/images/results/control/c4_dimo.jpg",
        "cdlm": "static/images/results/control/c4_cdlm.jpg",
        "teacher_full": "static/images/results/control/c4_teacher_full.jpg"
      }
    }
  ],
  "mmu": [
    {
      "image": "static/images/results/mmu/q1.jpg",
      "question": "How many types of drinks are there in the fridge?",
      "results": {
        "ours": "There are {{two types of drinks }}in the fridge.",
        "t3d": "There is [[one bottle of water]].",
        "dimo": "There are a types of [[juice, in the,, in the juice,, and in the the]].....",
        "cdlm": "There are multiple types of drinks in the fridge: [[including, juice,, mineral water,, orange juice,, water, and carbon mineral water.]]",
        "teacher_full": "There {{are two types of drinks }}in the fridge."
      }
    },
    {
      "image": "static/images/results/mmu/q2.jpg",
      "question": "Where was this photo taken?",
      "results": {
        "ours": "This photo was taken {{in a mountainous region Japan a lake}}. The presence includes a lake surrounded calm water, and a large mountain visible in the background.",
        "t3d": "The photo was taken in [[a mountain,, ]]specifically a",
        "dimo": "The photo was taken in the town of,,, the, of the the mountain..... [[the the the the the the the the the the ]]mountain",
        "cdlm": "This photo was taken in a [[lake area]], as indicated by the presence of the water, in [[the the]], and the mountain visible in the background.",
        "teacher_full": "This photo was {{taken in Japan}}. The photo shows {{a large mountain }}in the background."
      }
    },
    {
      "image": "static/images/results/mmu/q3.jpg",
      "question": "Please describe the image.",
      "results": {
        "ours": "A image shows a {{airplane flying through a blue sky}}.",
        "t3d": "The image shows a close-up of a bird against against a [[clear sky sky]]. The bird‘s wings is adorned [[with with with]] ….",
        "dimo": "The image is a [[large airplane airplane ]]flying in the a of the sky.. image of a large airplane airplane [[in in in sky sky]]. The is is a the airplane with [[a a red of]], and the yellow the the tail.",
        "cdlm": "A image of a large airplane flying in the sky. The airplane is red in [[and. and is flying of a a sky with with ]]blue clouds.",
        "teacher_full": "The image depicts a {{large airplane flying in a clear blue sky}}. The airplane is predominantly white with red and yellow accents."
      }
    }
  ]
},

  // Overall scores at 8 image / 64 text steps (Tables 1 and 4 of the paper).
  scores: {
    t2i: {
      columns: ["GenEval", "DPG-Bench", "UniGenBench", "OneIG", "TIIF-Bench"],
      rows: {
        teacher_full: [0.867, 83.8, 0.722, 0.445, 0.781],
        teacher_few:  [0.784, 78.6, 0.676, 0.357, 0.699],
        t3d:          [0.775, 69.1, 0.640, 0.306, 0.663],
        dimo:         [0.810, 80.8, 0.700, 0.327, 0.705],
        cdlm:         [0.521, 66.2, 0.536, 0.280, 0.599],
        ours:         [0.828, 83.0, 0.710, 0.381, 0.768],
      },
    },
    mmu: {
      columns: ["MM-Vet", "Vibe-Eval", "LLaVA-Bench", "COCO captioning", "DeCapBench"],
      rows: {
        teacher_full: [21.3, 12.36, 25.1, 67.2, 44.5],
        teacher_few:  [15.5, 5.30, 14.7, 28.4, 16.2],
        t3d:          [15.3, 3.81, 14.7, 21.3, 13.8],
        dimo:         [17.2, 6.04, 14.5, 33.4, 15.9],
        cdlm:         [18.5, 7.71, 15.6, 50.3, 16.9],
        ours:         [20.0, 8.18, 16.9, 57.2, 19.6],
      },
    },
  },

  bibtex: `@article{huang2026omnidiffusiondistill,
  title   = {Omni-Diffusion-Distill: Few-Step Distillation of Unified Multimodal Diffusion Large Language Models},
  author  = {Huang, Hong and Yang, Chenhongyi and Sun, Junzhe and Sinha, Animesh and Chen, Wuyang and Jiang, Yifan},
  journal = {arXiv preprint},
  year    = {2026}
}`,
};
