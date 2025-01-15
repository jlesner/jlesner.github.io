---
title: "Zero-Shot Document Ranking Using LLMs: Replication and Improvements"
collection: publications
category: preprints
permalink: /publication/2025-01-repllmr_preprint
excerpt: ''
date: 2024-10-16
venue: ''
paperurl: 'https://repllmr.ackop.com/repllmr_0022.pdf'
citation: '<b>Lesner, J.</b>,  Dhaliwal, M., & Yang, T. (2024). Zero-Shot Document Ranking Using LLMs: Replication and Improvements.'
---

Abstract
---
We conduct a replication study of recent advances in zero-shot document ranking with Large Language Models (LLMs), focusing on the Setwise approach introduced at SIGIR 2024. Our results confirm high fidelity in effectiveness metrics (NDCG@10 within ±3%) but reveal efficiency discrepancies, including 33–40% lower token usage for setwise methods. Expanding on the original work, we evaluate performance on the NovelEval-2306 dataset, showing strong ranking capabilities for queries beyond the models’ training cutoff. Systematic prompt engineering yields up to 40.7% improvements in NDCG@10 for specific method-dataset pairs, with setwise methods benefiting the most. Experiments with instruction-tuned and conversationally fine-tuned models (Llama 3.1, Llama 2) show consistent gains without added computational cost. These findings validate the original conclusions and highlight strategies for optimizing LLM-based ranking systems through prompt engineering and model selection. 