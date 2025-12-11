# Statement of Purpose

I was staring at logs when I realized what kind of researcher I wanted to be. It was late in my Master's year at UCSB, and I was testing a compact language model on SQL tasks. The model had consumed its entire generation budget "thinking"—pages of chain-of-thought reasoning—without ever producing an answer. It wasn't a failure of intelligence. It was a failure of reliability.

That moment clarified my trajectory. As AI systems scale, the gap between what they can do and what they can be trusted to do is becoming the most critical bottleneck in the field. I am applying to the PhD program to close that gap. Specifically, I want to research trustworthy AI, focusing on inference-time scaling for large language models and the intersection of neural networks with formal verification.

---

My path to this focus began as an undergraduate at UC Santa Cruz. I joined an NSF REU under Dr. Gabriel Elkaim to build the State Machine Visualizer, a tool that extracts state machines from C code and renders them as diagrams. The goal was simple: help mechatronics students debug their robot control logic. The execution was not.

My first approach used regular expressions. It collapsed on realistic inputs within weeks. I scrapped it and taught myself Abstract Syntax Tree parsing from scratch, building a pipeline with PycParser, XPATH, and XSLT to identify states, transitions, and guard conditions. The hardest part was handling the diversity of student implementations—I collected code samples across two academic years to harden the system against coding styles I hadn't anticipated.

When the funding ended, I kept working. Not because I had to, but because the problem was still unsolved. The tool is now used in UCSC's mechatronics curriculum, and I am preparing a paper for publication. That project taught me something I still carry: research is not about innate genius. It is about the willingness to backtrack and rebuild.

---

Between my bachelor's and master's degrees, I developed AIPIF—AI Personalized Interactive Fiction—a system that lets young children create stories using generative AI while giving parents oversight over content. I designed a branching narrative structure where the LLM develops parallel story paths, then used XSLT to transform the output into a playable web-based storybook. The system integrates text generation, image synthesis, and music.

I wrote this work up independently with mentorship from Dr. Daniel Shapiro. To my surprise, both PAIS 2024 and ECAI 2024 accepted my papers. Presenting at ECAI in Santiago de Compostela was formative. I spoke too fast. I could have asked better questions about others' work. But I left knowing I wanted to keep doing this.

AIPIF was also my first experience treating LLMs as components inside a larger system, where context limits, format control, and safety mattered as much as surface fluency. That lesson became central to everything I did next.

---

My collaboration with Professor Xifeng Yan began in his foundation models course with a project called DBDoctor. The problem: state-of-the-art SQL equivalence verifiers cannot handle modern features like window functions. Rather than rebuilding the verifiers, I designed an agentic framework that uses LLMs to rewrite complex queries into verifier-friendly forms.

We didn't just trust the LLM. I implemented a "refutation-by-rewrite" loop where any counterexamples were validated against the original database, so LLM errors created extra work rather than incorrect claims. I evaluated the system on nearly 24,000 LeetCode query pairs, demonstrating extended coverage and discovery of new counterexamples. This work is now being prepared for CAV 2026.

DBDoctor crystallized a principle I now hold firmly: LLMs are most powerful when disciplined by formal reasoning.

---

Dr. Yan then recommended I focus my Master's project on prompt optimization. The result was HAPO—Hyper-Reflection for Automatic Prompt Optimization—which investigated how to make compact models like Qwen3-8B perform as well as frontier models on verifiable tasks.

Using the GEPA framework, I optimized prompts for SQL synthesis and analysis. Early results were frustrating. Then I identified the failure mode: sophisticated reflection prompts caused the models to exhaust their generation budget on reasoning before producing answers. The same problem I'd seen in those late-night logs.

I implemented YaRN embeddings to extend context to 40,000 tokens. Success rates jumped—100% on SQL synthesis, 75% on counterexample discovery, outperforming baselines by 30%. I also introduced "Hyper-Reflection," a meta-optimization technique where stronger models improve the reflection templates themselves.

The official requirement for my Master's was a slide deck defense. After graduating, I took extra time to turn those slides into a research paper. I believed in the work.

---

I am choosing UCSB for my PhD specifically to continue working with Professor Yan. My Master's research with him has been the most intellectually rewarding period of my academic career. His focus on turning raw model capabilities into reliable tools—across finance, healthcare, and science—aligns precisely with my interests. I want to join his lab to study the internals of LLM adapters and multi-agent systems.

More broadly, I am drawn to UCSB because I already know I can thrive here. I have spent a year learning the department's rhythms—attending seminars, working with faculty, engaging with the graduate community. This is not an abstract choice. It is a continuation.

---

After my PhD, I want to work in industry research, building AI systems robust enough for high-stakes deployment. The domain I care most about is oncology. Cancer killed both my grandfather and my uncle. As a blood relative, this is not abstract to me.

But I believe the bottleneck in medical AI is not disease-specific models. It is that current systems are brittle and opaque. Clinicians cannot trust them. By working on foundational questions of reliability now—inference-time scaling, formal verification, self-correcting systems—I will be better positioned to build tools that doctors can actually use.

I have published, presented internationally, and spent a year proving I can do graduate research at UCSB. I am ready to keep going.