### **Statement of Purpose**
**Applicant:** [Your Name]
**Department:** Computer Science

I used to believe that research was strictly about invention—about creating something entirely new from a blank slate. But during my Master’s year here at UCSB, that definition shifted. I found myself staring at the logs of a compact language model that had consumed its entire generation budget "thinking" without ever producing an answer. It wasn’t a failure of creativity; it was a failure of reliability.

That moment, which occurred while working on my Master’s project, **HAPO**, clarified my trajectory. I realized that as AI systems scale, the gap between their capability and their reliability is becoming the most critical bottleneck in computer science. I am applying to the PhD program to close that gap. Specifically, I want to research trustworthy AI, focusing on inference-time scaling, prompt optimization, and the intersection of neural networks with formal verification.

My preparation for this work has been defined by a shift from using models to dismantling them. In the **HAPO (Hyper-Reflection for Automatic Prompt Optimization)** project, advised by **Professor Xifeng Yan**, I investigated how to make compact models (like Qwen3-8B) perform as well as frontier models on verifiable tasks. I utilized the GEPA framework to optimize prompts but quickly ran into a "thinking truncation" failure mode. The models were performing Chain-of-Thought reasoning that exceeded their context windows. Instead of abandoning the approach, I implemented YaRN embeddings to extend the context to 40k tokens. We achieved 100% success on SQL Synthesis and 75% accuracy on SQL Analysis, outperforming baselines by 30%. This taught me that sophisticated prompts must be matched by adequate compute budgets—a concept I call "Context is Compute."

I deepened this focus on reliability in the **DBDoctor** project, a collaboration with Dr. Fuheng Zhao and Professor Yan. We faced a fundamental problem: standard SMT verifiers cannot handle modern SQL features like window functions. Rather than trying to rebuild the verifiers, I designed an agentic framework using LLMs to rewrite complex queries into verifier-friendly forms. We didn't just trust the LLM; we implemented a rigorous "refutation-by-rewrite" loop where counterexamples were validated against the original database. We reduced the "unsupported" query rate from 100% to 1% on our dataset. This work, currently in preparation for CAV 2026, demonstrated that LLMs are most powerful when disciplined by formal reasoning.

I have also learned the importance of skepticism in system evaluation. In the **MIRROR** project for Professor Tao Yang’s Neural Information Retrieval course, I replicated the SIGIR 2024 "Setwise" paper. While I reproduced their effectiveness metrics, I uncovered a 96% discrepancy in inference counts due to undocumented batch size settings. This experience reinforced my belief that rigorous replication is as vital as novelty. I learned to treat discrepancies not as noise, but as signals exposing the tradeoffs between effectiveness and efficiency.

My research foundation was laid at UC Santa Cruz, where I turned class projects into published research. I created **AIPIF**, a generative storytelling tool for children, which resulted in a full paper at PAIS 2024 and a demo at ECAI 2024. I also developed **State Machine Visualizer**, a tool still used in the UCSC Mechatronics curriculum. These experiences gave me the confidence that I can identify a problem, build a solution, and carry the work through to peer-reviewed publication.

I am choosing UCSB for my PhD specifically to continue my work with **Professor Xifeng Yan**. My Master’s research with him has been the most intellectually rewarding period of my academic career. I aim to join his lab to work on the internals of LLM adapters and multi-agent systems.

I see a specific opportunity to extend Dr. Yan’s work on ADL/MICA (a DSL for multi-agent chatbots). Currently, agents are specified in YAML. I propose a direction I call **LEAP (Learning from Evolved and Augmented Prompts)**: using the optimization trajectories from tools like GEPA to train lightweight, deployable prompt rewriters. Instead of hand-tuning specifications, we could train controllers that sit between users and foundation models, optimizing interactions dynamically. This aligns perfectly with the lab’s focus on AI for Systems and Multimodal AI Assistants.

My long-term goal is to lead research in trustworthy AI, likely within an industrial R&D lab or as a research scientist. I look at fields like oncology—where my family has been deeply affected by cancer—and I see a domain that desperately needs AI but cannot afford to trust it yet. We need systems that are robust to distribution shifts and capable of explaining their reasoning.

I am done "skating to where the puck is." I want to help build the ice. A PhD at UCSB is the necessary next step to gain the theoretical depth and experimental rigor required to build AI systems that are not just powerful, but dependable enough for the real world.

---

### **Personal History Statement**
**Applicant:** [Your Name]
**Department:** Computer Science

I spent a long time believing I wasn't "PhD material."

Growing up in Palo Alto, I attended Gunn High School, a place known for its intense academic pressure. While my peers seemed to effortlessly grasp advanced calculus, I struggled with math. I internalized a narrative that I was behind, that I lacked the innate "spark" required for deep technical work. When I applied to colleges, I was rejected by most of the UC system and admitted to UC Santa Cruz only off the waitlist. I carried that sense of imposter syndrome with me for years.

It wasn't a single moment that changed my mind, but a slow accumulation of evidence. During my undergraduate years, I started working on a project called the State Machine Visualizer. It began as a job, but when the funding ran out, I didn't stop. I found myself working late nights, not because I had to, but because the problem of reverse-engineering state diagrams from C code was itching at my brain. I realized then that research isn't about innate genius; it is about persistence. It is about the willingness to backtrack when a regex approach fails and the humility to learn Abstract Syntax Trees from scratch.

However, the hesitation lingered. After graduating, I chose a Master’s degree at UCSB rather than a PhD because I was afraid to commit. I needed to know if I could handle the rigor.

The past year at UCSB has been the most transformative of my life. I didn’t just survive the coursework; I thrived in the research environment. I found that my "non-traditional" path—struggling with math early on, focusing on building tools for students—gave me a pragmatic perspective that many purely theoretical students lacked. I learned that my strength lies in bridging the gap between abstract algorithms and usable systems.

My motivation for pursuing a PhD now is deeply personal. My family has been shaped by cancer; both my grandfather and uncle passed away from it. Living with that genetic history, I look at the medical field and see a desperate need for better diagnostic tools. But I also know, from my work on LLM reliability, that current AI models are too brittle for high-stakes oncology decisions. I want to build systems that are robust enough to be trusted with human lives. That is the moral weight behind my interest in "trustworthy AI." It isn’t just an academic puzzle; it is a requirement for the future I want to see.

At UCSB, I plan to contribute to the diversity of the department by continuing my work in mentorship. For the past year, I have engaged with the Women in Computer Science (WiCS) club, offering advice to undergraduates interested in LLMs. I also regularly return to UCSC to give guest lectures in the Game AI course, helping students demystify the gap between classwork and research. I know what it feels like to be the student who thinks they aren't "smart enough" for this field. As a PhD student, I want to be the mentor who helps dismantle that narrative for the next generation of researchers.

I am ready to move from questioning my place in this field to leading within it. I bring resilience born from early struggles, a proven track record of research, and a clear vision of how my work can serve the broader community.