Statement of Purpose

I was staring at the logs of a compact language model, watching it consume its entire generation budget. It was supposed to be answering a SQL synthesis problem. Instead, it was just "thinking." The model, a Qwen3-8B instance, was stuck in a loop of self-correction and reasoning steps that led nowhere. It had plenty of creativity; it generated page after page of coherent, plausible-sounding logic. But it never produced the final answer. The compute budget ran out, and the process died.

It wasn’t a failure of intelligence. It was a failure of reliability.

That quiet moment, occurring late in my Master’s year here at UC Santa Barbara, clarified the trajectory I had been on for years. I realized that as we scale AI systems, the widening gap between their raw capability and their operational reliability is becoming the most critical bottleneck in the field. I couldn’t ignore it. I am applying to the PhD program to close that gap. Specifically, I want to research trustworthy AI, focusing on inference-time scaling and the intersection of neural networks with formal verification.

My path to this realization didn't start with neural networks. It started with messy, human-written C code.

As an undergraduate at UC Santa Cruz, I took a job as a research assistant under Dr. Gabriel Elkaim. The project was called the State Machine Visualizer (SMV). The goal sounded simple enough: take the chaotic C source code written by mechatronics students and automatically generate clean, visual state diagrams to help them debug their robots.

I started with the obvious approach: regular expressions. I wrote complex regex patterns to catch state definitions and transitions. It worked on the simple test cases. Then I fed it real student code. It collapsed immediately. Students wrote code in ways I hadn't predicted—weird spacing, macros, unexpected control structures. My tool was fragile.

I could have patched it. I could have added more regex rules to handle the edge cases. But I looked at the output—broken arrows, missing states—and realized that "basically working" wasn't enough. I scrapped the regex approach entirely.

I spent the next few months learning how to build a proper annotation pipeline using Abstract Syntax Tree (AST) analysis. I used PycParser to break the code down, then designed XPATH and XSLT rule sets to identify the logic structures reliably. It was slow, tedious work. When the initial funding from CAHSI ran out, I didn't stop. I found myself working late nights, not for a paycheck, but because the problem of reverse-engineering logic was itching at my brain. I collected code samples from two academic years to ensure robustness. Today, SMV is used in the UCSC mechatronics curriculum. That experience taught me that research isn't about innate genius. It is about the willingness to backtrack when a design fails and the persistence to turn messy reality into a reliable tool.

I carried that lesson into the world of generative AI. During a gap between my bachelor’s and master’s degrees, I continued working on a project I had started in a Game AI class: AI Personalized Interactive Fiction (AIPIF).

I wanted to see if generative models could support safe storytelling for children. I built a system where a child could provide a story idea, and an LLM would generate a branching narrative. But I knew the risks. An LLM left unchecked could veer into inappropriate territory or lose the plot entirely. I designed a "tree of thought" approach where the model developed parallel narrative branches, and I built an interface for parents to review content before it reached the child.

This was my first experience treating an LLM not as a magic box, but as a component in a larger system where safety constraints mattered as much as fluency. I wrote up the work and, to my surprise, it was accepted at PAIS 2024. Presenting at the ECAI conference in Santiago de Compostela was a turning point. I stood at the podium, speaking a little too fast, wishing I had asked more questions during the earlier sessions. But as I looked at the other researchers, I realized this wasn't just about building cool demos. It was about rigorous inquiry. I left Spain knowing I wanted to do this for the rest of my life.

Coming to UCSB for my Master’s, I sought out Dr. Xifeng Yan. I wanted to work at the intersection of large models and hard constraints.

We started with the DBDoctor project. We tackled a fundamental problem: state-of-the-art SQL equivalence verifiers are rigorous but limited—they can't handle modern features like window functions. Rather than trying to rebuild the mathematical verifiers from scratch, I designed an agentic framework using LLMs to rewrite complex queries into simpler forms that the verifiers could handle.

We didn't just trust the LLM to get it right. We implemented a "rewrite and refute" loop. If the verifier found a counterexample on the rewritten query, my system validated it against the original database to ensure it wasn't a hallucination. I evaluated the system on nearly 24,000 LeetCode query pairs. We demonstrated that we could significantly extend the coverage of formal verification tools by using LLMs as translators, provided we had a rigorous check in the loop. This work is now being prepared for CAV 2026.

This brought me back to the log files I was staring at in the lab.

My Master's thesis project, HAPO (Hyper-Reflection for Automatic Prompt Optimization), was an investigation into making compact models perform like frontier models. I was using the GEPA framework to optimize prompts, but the models kept failing. They weren't hallucinating; they were thinking too much. They would enter Chain-of-Thought reasoning spirals that exceeded their context windows.

I called this failure mode "thinking truncation."

Instead of abandoning the compact models, I implemented YaRN embeddings to extend the context window to 40,000 tokens. I redesigned the prompts to handle this extended "thinking space." The results were stark. We achieved 100% success on SQL Synthesis tasks and improved accuracy on SQL Analysis by 30% over the baselines. I learned that sophisticated prompting must be matched by adequate compute budgets—a concept I’ve come to call "Context is Compute."

I am choosing to apply to the PhD program at UCSB specifically to continue this work with Professor Xifeng Yan. My Master’s year has been the most intellectually rewarding period of my career, and I have already spent a year learning the department's rhythms. I aim to join Dr. Yan's lab to work on the internals of LLM adapters and multi-agent systems. His focus on turning raw model capabilities into reliable tools for experts aligns perfectly with my own.

I look at the future of this technology, and for me, it is personal.

My grandfather and my uncle both died of cancer. As a blood relative, the statistics are not abstract to me. I want to eventually work in industry research, building AI systems for high-stakes domains like oncology. But I believe the bottleneck in medical AI right now is not a lack of disease-specific data. It is that current systems are brittle and opaque. A clinician cannot trust a diagnosis if the system cannot reliably explain its reasoning or if it fails unpredictably when the data shifts.

By working on the foundational questions of AI reliability now—focusing on inference-time scaling, verification, and self-correction—I will be better positioned to build systems that can actually be deployed where they are needed most.

I am ready for this work. I have published papers, presented internationally, and spent the last year proving to myself that I can handle the rigor of graduate research at UCSB. I have seen the gap between what AI can do and what we can trust it to do. I want to spend the next five years closing it.