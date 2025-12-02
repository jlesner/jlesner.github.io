

I used to believe that research was strictly about invention—about creating something entirely new from a blank slate. But during my Master’s here at UCSB, that definition shifted. I found myself staring at the logs of a compact language model that had consumed its entire generation budget "thinking" without ever producing an answer. It wasn’t a failure of creativity; it was a failure of reliability.

That moment, which occurred while working on my Master’s project, clarified my trajectory. I realized that as AI systems scale, the gap between their capability and their reliability is becoming the most critical bottleneck in AI. I am applying to the PhD program to close that gap. Specifically, I want to research trustworthy AI, focusing on inference-time scaling LLMs and the intersection of neural networks with formal verification.

--- SMV project versions

%% TODO create smooth transition to my two undergrad projects at UCSC

My first sustained research experience was the State Machine Visualizer project, which I began as an undergraduate research assistant under Dr. Gabriel Elkaim at UCSC. The goal was to automatically generate visual diagrams of state machines from C source code, helping mechatronics students debug complex robot control logic. I designed an annotation pipeline using Abstract Syntax Tree analysis with XPATH/XSLT rule sets to identify state variables, transitions, and guard conditions. The hardest part was extending the system to handle the diversity of student implementations—I collected code samples across two academic years to ensure robustness. When early regex-based approaches failed, I backtracked and rebuilt using proper parsing. The tool is now used in UCSC's mechatronics curriculum, and I am preparing a paper for publication. This project taught me that research requires persistence through dead ends.

As an undergraduate in computer science at UC Santa Cruz, I gravitated toward research-style systems projects. My first project, the State Machine Visualizer, began in an NSF REU and became an open-source tool that extracts state machines from C code and renders them as diagrams. When my initial regular-expression approach collapsed on realistic inputs, I restarted from an AST-based design and iterated until the system handled real student projects robustly. It taught me to abandon weak designs early and to measure success by user impact, not by having something that merely “basically works.”

During my undergraduate years, I started working on a project called the State Machine Visualizer. It began as a job, but when the funding ran out, I didn't stop. I found myself working late nights, not because I had to, but because the problem of reverse-engineering state diagrams from C code was itching at my brain. I realized then that research isn't about innate genius; it is about persistence. It is about the willingness to backtrack when a regex approach fails and the humility to learn Abstract Syntax Trees from scratch.

My first serious research experience came as an undergraduate with **State Machine Visualizer (SMV)**, a tool for automatically extracting and visualizing state machines from students’ mechatronics code. The research problem sounded simple—turn messy C source into accurate diagrams—but quickly became an exercise in program analysis and tool design. I built a static analysis pipeline that parsed C into an abstract syntax tree using PycParser, then used XPATH and XSLT to identify states, transitions, and guards before rendering them with GraphViz. I tested SMV on two years of student projects, iteratively hardening it so it could handle wildly different coding styles. Even after the initial CAHSI funding ended, I kept working on SMV because I wanted it to be robust enough for other instructors to use. That experience taught me that I enjoy the slow, iterative process of turning messy reality into reliable tools.

--- AIPIF project

I created **AIPIF**, a generative storytelling tool for children, which resulted in a full peer-reviewed paper at PAIS 2024 and a demo at ECAI 2024.

In my AI Personalized Interactive Fiction project 
(which started in Game AI class run by Dr.Shaprio)
I explored how generative models could support safe, engaging storytelling for children. I built a system that takes a child’s story idea and uses LLMs to generate a branching narrative, while parents review each page before the child sees it. I designed the story representation and end-to-end pipeline from prompt construction to interactive storybook. This project led to a PAIS-2024 paper and an ECAI-2024 demo and was my first experience treating LLMs as components inside a larger system, where context limits, format control, and safety mattered as much as surface fluency.

After Dr.Shapiro's game AI class finished I continued to work on the project during the gap between my bachelor's and master's degrees. Not because I had to but because I wanted to improve it and write it up as a paper. 

I developed AIPIF (AI Personalized Interactive Fiction), a system that lets young children create interactive stories using generative AI while giving parents oversight over content. I designed a "tree of thought" approach where the LLM develops parallel narrative branches, then used XSLT to transform the story structure into playable web-based fiction. The system integrates text generation, image synthesis, and music generation. I wrote this work up independently with mentorship from Dr. Daniel Shapiro, and to my surprise, both PAIS 2024 and ECAI 2024 accepted my papers. Presenting at ECAI in Santiago de Compostela—my first international conference—was formative. I spoke too fast, I could have been more inquisitive about others' work, but I left knowing I wanted to keep doing this.

---- DbDoctor project

Our colaboration started in Dr.Yan's foundational models course on a project called DBDoctor, a system that uses LLMs to rewrite complex SQL queries into a subset a start of the art an SMT-based verifier can handle, then checks the equivalence of the original and rewritten queries using both formal reasoning and database execution. A central idea is a “rewrite and refute” loop that validates counterexamples on the original queries so that LLM errors create extra work, not incorrect claims. 

 **DBDoctor** tackled a fundamental problem: state of the art SQL equivalance verifiers cannot handle modern SQL features like window functions. Rather than trying to rebuild the verifiers, I designed an agentic framework using LLMs to rewrite complex queries into verifier-friendly forms. We didn't just trust the LLM; we implemented a rigorous "refutation-by-rewrite" loop where counterexamples were validated against the original database. This work, currently in preparation for CAV 2026, demonstrated that LLMs are most powerful when disciplined by formal reasoning.

 DBDoctor, a system that uses LLMs to extend the coverage of SMT-based SQL equivalence verifiers. Many formal verification tools cannot handle modern SQL features like window functions. DBDoctor uses an LLM to rewrite complex queries into verifier-compatible forms, then validates any discovered counterexamples against the original queries to filter spurious results. I evaluated the system on nearly 24,000 LeetCode query pairs, demonstrating extended coverage and discovery of new counterexamples. This work is now being prepared for CAV 2026.


------------ HAPO project

After the DbDoctor project Dr.Yan recommended that I put my focus on Prompt Optimizaton investigating the techniques like GEPA.

Our collaboration continued through to my Master project which Dr.Yan supervised which is titled "HAPO: Hyper-Reflection for Automatic Prompt Optimization". I introduced Hyper-Reflection, where stronger models optimize the reflection templates themselves, and identified a “thinking truncation” failure mode in which chain-of-thought prompts consumed the token budget before reaching an answer. By extending the context window and redesigning prompts, I improved success rates on SQL synthesis and analysis tasks. 

In the **HAPO (Hyper-Reflection for Automatic Prompt Optimization)** project, advised by **Professor Xifeng Yan**, I investigated how to make compact models (like Qwen3-8B) perform as well as frontier models on verifiable tasks. I utilized the GEPA framework to optimize prompts but quickly ran into a "thinking truncation" failure mode. The models were performing Chain-of-Thought reasoning that exceeded their context windows. Instead of abandoning the approach, I implemented YaRN embeddings to extend the context to 40k tokens. We achieved 100% success on SQL Synthesis and 75% accuracy on SQL Analysis, outperforming baselines by 30%. This taught me that sophisticated prompts must be matched by adequate compute budgets—a concept I call "Context is Compute."

My master's project, HAPO (Hyper-Reflection for Automatic Prompt Optimization), investigated how to optimize prompts for compact models on verifiable tasks. Using the GEPA framework, I optimized prompts for SQL synthesis and analysis, achieving 100% success on synthesis and 75% accuracy on counterexample discovery—outperforming baselines by 30%. I introduced "Hyper-Reflection," a meta-optimization technique that uses frontier models to improve GEPA's reflection mechanism itself. I also identified and resolved a critical failure mode: sophisticated reflection prompts caused compact models to exhaust their generation budget on chain-of-thought reasoning before producing answers. Extending context windows via YaRN solved this. The project crystallized my interest in automatic prompt optimization as a research direction.

Because I took extra courses during my Master the final project requirement was just a slide deck defence presentation but because I believed in my project reserach after I graduated I took the extra time to collect my presentation slides and turn them into a research paper. 


--------- Why UCSB? Why Dr.Yan?


I am choosing UCSB for my PhD specifically to continue my work with **Professor Xifeng Yan**. My Master’s research with him has been the most intellectually rewarding period of my academic career. I aim to join his lab to work on the internals of LLM adapters and multi-agent systems.


My Masters work with Dr. Xifeng Yan points directly toward the PhD research I want to pursue. 

I am choosing UCSB for my PhD specifically to continue my work with **Professor Xifeng Yan**. My Master’s research with him has been the most intellectually rewarding period of my academic career. I aim to join his lab to work on the internals of LLM adapters and multi-agent systems.

In my PhD I want futher study how to make AI systems that are reliable and self-correcting, with a concrete focus on inference time LLM scaling. 
UCSB is where I want to continue this work, and Dr. Yan’s group is the natural home for it. His research on foundation models, multimodal assistants, and applications in domains such as finance, healthcare, and science focuses on turning raw model capabilities into reliable tools for experts, which aligns closely with my interests. 
I belive Dr. Yan would be a strong mentor for my future research.


More broadly, I am drawn to UCSB because of its culture of rigorous, collaborative research. I have already spent a year learning the department's rhythms—attending seminars, working with faculty across courses, and engaging with the graduate community. I know I can thrive here.


My Masters in Computer Science at UCSB has deepened my  research orientation. Graduate projects routinely turned into paper drafts or ongoing collaborations rather than one-off assignments. Completing the degree in a single year while pursuing several research efforts trained me to manage time under pressure, absorb recent papers quickly, and design experiments that truly answer a question.

I aim to pursue a PhD in computer science at UC Santa Barbara focused on trustworthy AI systems, especially inference-time scaling for LLMs. I want to design AI systems that behave reliably and can be trusted for high-stakes decisions.


---- SUMMARY

I am applying for a PhD rather than going directly to industry because the past year at UCSB has changed how I see my potential as a researcher. Completing the M.S. in one year while presenting work at PAIS and ECAI made research feel like something I can shape, not just read. My long-term goal is to serve as a research scientist who builds systems and also helps set research directions, especially around trustworthy AI in high-stakes settings. I bring a record of steady growth, persistence through setbacks, and a sustained focus on the reliability of AI systems, and I would be grateful for the opportunity to continue that trajectory as a PhD student in the UCSB Computer Science department.

After my PhD, I want to work in industry research, building AI systems that are robust enough for high-stakes deployment. The specific domain I care most about is oncology—cancer killed both my grandfather and my uncle, and as a blood relative, this is not abstract to me. But I believe the bottleneck in medical AI is not disease-specific models; it is that current systems are brittle and opaque. By working on foundational questions of AI reliability now, I will be better positioned to build systems that clinicians can actually trust.

My long-term goal is to lead research in trustworthy AI, likely within an industrial R&D lab or as a research scientist. I look at fields like oncology—where my family has been deeply affected by cancer—and I see a domain that desperately needs AI but cannot afford to trust it yet. We need systems that are robust to distribution shifts and capable of explaining their reasoning.

A PhD at UCSB is the necessary next step to gain the theoretical depth and experimental rigor required to build AI systems that are not just powerful, but dependable enough for the real world.

I am ready for this work. I have published, presented internationally, and spent a year proving I can do graduate research at UCSB. I want to keep going.
