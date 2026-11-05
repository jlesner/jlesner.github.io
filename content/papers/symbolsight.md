---
title: "SymbolSight: Minimizing Inter-Symbol Interference for Reading with Prosthetic Vision"
category: publications
date: 2025-11-01
venue: IEEE EMBC 2026
paper_url: "https://arxiv.org/abs/2601.17326"
project: symbolsight
image: projects/symbolsight_0010.JPG
summary: >
  SymbolSight assigns symbol-to-letter mappings that minimize confusion between frequently adjacent letters,
  reducing predicted confusion by a median factor of 22 across Arabic, Bulgarian, and English.
citation: "**Lesner, J.**, & Beyeler, M. (2026). *IEEE EMBC 2026*."
---
## Abstract

Retinal prostheses offer limited visual restoration, but their low spatial resolution and temporal persistence create challenges for reading. Sequential letter presentation causes afterimages to interfere with subsequent symbol perception, resulting in predictable recognition failures. Rather than waiting for hardware advances, this work explores whether customizing visual symbols can reduce temporal interference effects. We introduce SymbolSight, a system that assigns symbol-to-letter mappings to minimize confusion between frequently adjacent letters. Using simulated prosthetic vision and a neural observer model, we calculate pairwise symbol confusability and optimize mappings based on language-specific bigram patterns. Testing across Arabic, Bulgarian, and English revealed that the custom symbol sets reduced predicted confusion by a median factor of 22 compared to standard alphabets. The findings indicate that conventional typography is mismatched for serial, bandwidth-limited prosthetic vision, demonstrating how computational approaches can identify promising visual encoding candidates for future clinical evaluation.
