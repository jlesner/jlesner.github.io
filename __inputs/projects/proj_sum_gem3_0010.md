# Research Projects (v.gem)

### **Project: AI Personalized Interactive Fiction (AIPIF)**

Project title?

AI Personalized Interactive Fiction (AIPIF).

Where did this happen?

This project took place at the University of California, Santa Cruz (UCSC) in the course CMPM146: Game AI, taught by Adjunct Professor Daniel G. Shapiro. The work was also presented at PAIS 2024 and ECAI 2024\.

What was the main research question or goal?

The primary goal was to create a system that empowers young children to craft custom, engaging, choice-based stories using generative AI, while simultaneously enabling parents to review and refine the content to ensure safety. The project aimed to bridge the gap between AI-driven text adventures (often unsuitable for children) and educational storytelling by leveraging the "novelty bias" to improve learning outcomes.

What did you actually do?

I applied Python, XPATH, and XSLT skills to guide generative AI models in building narrative story trees. I designed a "tree of thought" approach where LLMs developed parallel story branches, and I created a Story Production pipeline that utilized multiple AI models to generate text, illustrations, sounds, and music. To manage this, I built a web service and a worker pool system that facilitated asynchronous processing of story elements.

Additionally, I implemented parental oversight mechanisms, allowing parents to review media galleries and request AI regenerations before the child views the story. I handled the transformation of the final story XML into Twee syntax for compilation into an interactive web format using the Twine engine. The system was designed for horizontal scaling using distributed GPU workers.

What tools/tech did you use?

The project utilized Python, XPATH, XSLT, XML, HTML, and the Twine engine (SugarCube). The infrastructure relied on AWS S3 for storage and a worker pool of NVIDIA RTX4090 GPUs to run AI models. Specific AI tools included Large Language Models (GPT-3.5) for text and adapters for text-to-image, text-to-sound, and text-to-music generation.

What were the results? What artifacts were created?

The project resulted in a high-fidelity prototype available for public use and the release of source code under an open-source license. Academic artifacts included a full paper published at PAIS 2024 and a demo paper at ECAI 2024\. A writeup and a demonstration video were also produced to document the system's interaction flow and capabilities.

What was the hardest part, and how did you handle it?

The hardest part was learning how to reliably use AI technology to generate consistent stories with multimedia elements within a software project. I was initially unfamiliar with generative models outside of chat interfaces, so learning to constrain them to specific tasks and output formats was difficult. I also had to overcome the problem of "context rot" in long-format generation.

What did you learn (technically and about yourself as a researcher)?

Technically, I learned how to constrain generative AI models to specific tasks and manage context limitations. I also gained experience in integrating multimodal AI outputs into a cohesive software application. The project marked my first time moving beyond standard chat interfaces to build complex software around generative models.

If you continued this line of work, what would your next step be?

A possible next step would be to implement world state tracking to improve cross-branch coherence. This would involve having both the player and the LLM interact with a persistent environment, ensuring that narrative developments remain consistent across different decision paths.

---

### **Project: MIRROR**

Project title?

MIRROR: Measuring, Improving, and Reproducing Ranking with Open Retrieval Models.

Where did this happen?

This project was conducted at the University of California, Santa Barbara (UCSB) for the course CS291A: Neural Information Retrieval, instructed by Professor Tao Yang.

What was the main research question or goal?

The main goal was to investigate the reliability of Large Language Models (LLMs) for zero-shot document re-ranking and to explore methods for making these techniques more effective and efficient. This involved replicating the SIGIR 2024 “Setwise” paper to validate its findings regarding pointwise, pairwise, and setwise ranking strategies.

What did you actually do?

I replicated the experiments from the "Setwise" paper using the llm-rankers codebase and Pyserini, running tests on TREC DL and BEIR datasets with open models like Flan-T5. I automated the pipeline for BM25 retrieval and LLM re-ranking and built analysis notebooks to compute discrepancy metrics between my results and the original paper's. I also extended the evaluation to the NovelEval-2306 dataset to test performance on queries beyond the models' training cutoff.

Furthermore, I systematically redesigned prompts for pointwise, pairwise, and setwise rankers to quantify their impact, finding significant gains in NDCG@10 for specific method-dataset pairs. I also compared base Llama models against their instruction-tuned and conversational variants to observe the effects on ranking performance and latency.

What tools/tech did you use?

The project used Python, Pyserini for retrieval, and the llm-rankers repository. I utilized various LLMs including Flan-T5 (large/xl/xxl), Llama 2, Llama 3.1, and Vicuna. Experiments were run on hardware including NVIDIA A100 and RTX 4090 GPUs.

What were the results? What artifacts were created?

I successfully reproduced the effectiveness metrics (NDCG@10 within ±3%) of the original study but uncovered a 96% discrepancy in inference counts due to batch size differences. I demonstrated that setwise approaches achieved the best performance on the NovelEval dataset. My prompt engineering efforts yielded up to 40.7% improvements in specific scenarios. Artifacts included a detailed writeup and analysis notebooks.

What was the hardest part, and how did you handle it?

The hardest aspect was dealing with the fragility of reproducibility when implementation details are under-specified. I encountered massive discrepancies in efficiency metrics (e.g., inference counts) which required deep investigation to trace back to configuration differences, such as batch size settings in the shared code versus the paper.

What did you learn (technically and about yourself as a researcher)?

I learned to view LLM-based retrieval as an end-to-end system where models, prompts, and hardware interact. I learned to be rigorous about replication, treating discrepancies as signals rather than noise, and to design experiments that expose tradeoffs between effectiveness, efficiency, and robustness.

If you continued this line of work, what would your next step be?

My next step would be to turn MIRROR into a standardized, open benchmarking suite for LLM-based ranking. I would also explore learned prompt or budget-aware ranking strategies, where the system adapts its ranking method based on query difficulty and compute constraints.

---

### **Project: DBDoctor**

Project title?

DBDoctor: LLM-Aided SMT Refutation of SQL Query Equivalence.

Where did this happen?

This project began in CMPSC 291A: Special Topics in Foundation Models at UCSB, instructed by Professor Xifeng Yan and Distinguished Professor Amr El Abbadi.

What was the main research question or goal?

The goal was to automate the optimization and verification of SQL queries by determining when a rewritten query remains semantically equivalent to the original. Specifically, the project aimed to bridge the gap between formal SMT verifiers, which support a limited subset of SQL, and complex real-world queries by using LLMs to rewrite unsupported SQL into verifier-compatible forms.

What did you actually do?

I designed \\textsc{DBDoctor}, a computer-aided verification system that integrates LLM-guided rewriting with formal SMT verification. I implemented a "Refutation-by-rewrite loop" where an LLM rewrites unsupported queries (e.g., those with window functions) into supported subsets. I then used a formal verifier (VeriEQL) to find counterexamples on the rewritten queries.

Crucially, I implemented a validation step where these counterexamples are tested against the original queries to filter out spurious results. I evaluated this system on the LeetCode corpus of nearly 24,000 query pairs, comparing different methods of LLM and database interaction to measure coverage extension and refutation rates.

What tools/tech did you use?

The system utilized Large Language Models (OpenAI's gpt-4.1-mini and o4-mini) for query rewriting. It employed SMT-based SQL verifiers (VeriEQL) for formal reasoning and PostgreSQL for database execution and counterexample validation. The implementation was likely in Python (inferred from context of course projects).

What were the results? What artifacts were created?

The project reduced the percentage of "unsupported" query pairs from 100% to 1% in the tested subset and successfully refuted 47% of them. Artifacts include a paper currently in progress for the International Conference on Computer Aided Verification (CAV 2026\) and the DBDoctor system itself.

What did you learn (technically and about yourself as a researcher)?

Information not available in the provided text. (The text does not contain a specific section detailing personal or technical learnings for this specific project).

If you continued this line of work, what would your next step be?

Future work involves handling list semantics (extending validation to check stable-order constraints) and modeling sources of non-determinism in queries (like unordered LIMITs or floating-point arithmetic). Additionally, I would explore tree-of-thoughts exploration to expand multiple rewrite candidates in parallel rather than using a linear history.

---

### **Project: HAPO**

Project title?

HAPO: Hyper-reflection for Automatic Prompt Optimization.

Where did this happen?

This was a UCSB Master's Project advised by Professor Xifeng Yan and co-chaired by Distinguished Professor Amr El Abbadi. It also involved collaboration with Dr. Fuheng Zhao.

What was the main research question or goal?

The research question was whether systematic prompt optimization could bridge the capability gap between compact language models and frontier models. The goal was to enable compact models (like 8B parameter models) to approach the performance of larger models on verifiable tasks through "Hyper-Reflection," a meta-optimization of the reflection mechanism itself.

What did you actually do?

I utilized the GEPA (Genetic-Pareto) framework to optimize prompts for SQL Synthesis and Analysis tasks. I introduced "Hyper-Reflection," using frontier models (Claude Opus, GPT-5, Gemini 2.5) to rewrite and optimize the reflection instructions within GEPA. I also identified a "thinking truncation" failure mode where compact models exhausted their token budget on Chain-of-Thought reasoning.

To resolve the truncation issue, I implemented context window extensions using YaRN embeddings, enabling the models to utilize 40k context windows. I ran extensive experiments on dual RTX 5090 servers, comparing different teacher-student model combinations and measuring task success rates across single and multi-step interaction flows.

What tools/tech did you use?

I used the DSPy framework, GEPA, and vLLM for model serving. The hardware consisted of dual NVIDIA RTX 5090 GPUs. Models used included Qwen3-8B (as the student), and GPT-4, Claude Opus, and Gemini 2.5 (as teachers/optimizers). I also utilized YaRN for context extension.

What were the results? What artifacts were created?

The project achieved a 75% accuracy on the SQL Analysis task using a compact 8B model, a 30% improvement over baselines, and 100% success on SQL Synthesis. The project was voted the \#1 project in the class. Artifacts include a writeup, a presentation, and a paper in preparation for IEEE EMBC.


What did you learn (technically and about yourself as a researcher)?

I learned that "Context is Compute"—sophisticated prompts require adequate generation budgets, leading to tradeoffs between prompt complexity and inference cost. On a personal level, I learned that I can succeed at highly valuable work but need to be strategic about balancing research opportunities with coursework demands.

If you continued this line of work, what would your next step be?

A next step would be "LEAP – Learning from Evolved and Augmented Prompts." This involves converting optimization trajectories (logs from optimizers like GEPA) into training data to train lightweight, deployable prompt rewriters (similar to BPO) that distill the behavior of expensive search-based optimizers.

---

### **Project: State Machine Visualizer (SMV)**

Project title?

State Machine Visualizer (SMV).

Where did this happen?

This project started at UCSC as part of the CAHSI program research experience for undergraduates and continued independently for two years. It was developed for the course ECE118: Introduction to Mechatronics, mentored by Dr. Gabriel Elkaim.

What was the main research question or goal?

The goal was to automate the visualization of state machines directly from C source code to aid students in debugging and maintaining event-driven control systems. The project aimed to solve the challenge of reverse-engineering accurate diagrams from complex, varied student code without requiring manual annotations.

What did you actually do?

I developed a static analysis tool that parses C source code into an Abstract Syntax Tree (AST) using PycParser. I built a modular annotation pipeline using XPATH and XSLT to identify state machine components like states, transitions, and guards within the AST. I then transformed this annotated structure into GraphViz descriptions to render visual diagrams.

I collected code from mechatronics students over two years to ensure the transpiler could handle diverse implementation styles. I also conducted benchmarks to evaluate the tool's performance and parallelization potential on multi-core systems.

What tools/tech did you use?

The tool relies on C, Python, and the PycParser library. Core logic was implemented using XPATH and XSLT for AST processing. Other tools included GraphViz for rendering, Docker for containerization, and various Unix utilities. The project handles Finite, Extended, and Hierarchical State Machines.

What were the results? What artifacts were created?

The tool was released as open-source software on GitHub. Artifacts include a demo video, a technical report, and a research paper currently being prepared for publication. User evaluation showed that the tool helped identify logic errors in student code that were difficult to spot manually.

What was the hardest part, and how did you handle it?

The hardest part was extending the XPATH/XSLT rule sets to support many different possible implementations of state machines. I handled this by collecting and testing against a diverse set of code from students across two years to ensure the transpiler was robust.

What did you learn (technically and about yourself as a researcher)?

Technically, I learned that regex was insufficient for code parsing and had to pivot to using a proper C parser (AST-based approach). As a researcher, I learned that research can be frustrating but deeply rewarding, and that persistence allows me to overcome seemingly insurmountable obstacles.

If you continued this line of work, what would your next step be?

The next step would be to use the transpiler as an automatic "teacher" to train an LLM. By generating a large dataset of (source code $\\rightarrow$ state diagram description) pairs, I would fine-tune an LLM to generate diagrams for other languages (Python, Java) that the current tool does not support.

---

### **Project: GUARD**

Project title?

Guided Understanding & Agreement Rights Detector (GUARD) Prototype.

Where did this happen?

This project was part of CMPSC 291I: Interactive and Real-Time User Experience of AI at UCSB, instructed by Assistant Professor Misha Sra.

What was the main research question or goal?

The goal was to research interpretable interfaces in AI-driven applications, specifically examining how explanation requirements differ between repetitive decision contexts (like e-commerce moderation) and unique decision contexts (like communication monitoring). The project sought to design AI systems that balance transparency with cognitive load.

What did you actually do?

I designed and prototyped GUARD, a mobile application interface for communication monitoring that identifies inconsistencies in spoken and written text. I developed a three-tab explanation system (Overview, Discuss, Resolve) to progressively disclose information. I also conducted a qualitative user study with eight participants to compare GUARD against an e-commerce moderation prototype (LENS).

I analyzed user feedback regarding trust, understanding, and fairness. I tailored the UI to support analytical thinking through features like visual anchoring, confidence communication, and interactive controls, while addressing privacy concerns through specific settings and data handling transparency.

What tools/tech did you use?

The project involved mobile UI design tailored for smartphones. The prototype was likely built using web technologies (HTML is mentioned in the demo link) and design tools to create the interactive interface flows.

What were the results? What artifacts were created?

Artifacts include a public prototype demo and a user study paper titled "Understanding XAI Requirements." The study found that standardized visual explanations benefit routine tasks, while adaptive, progressive approaches are better for context-specific decisions. The project highlighted the importance of user agency and context-aware explanations.

What was the hardest part, and how did you handle it?

The hardest part was designing an interface for a complex AI system that could work on a small mobile device screen while keeping the user's cognitive load as low as possible and maximizing usability.

What did you learn (technically and about yourself as a researcher)?

I learned that effective explanations must align with task frequency—structured for repetitive tasks and personalized for unique ones. I also learned that trust formation differs by context; technical users were more skeptical of privacy in communication monitoring, highlighting the need for transparent confidence metrics and control mechanisms.

If you continued this line of work, what would your next step be?

The next step would be to extend the prototype with adapters to actually read documents and record conversations. I would then interface these inputs with AI tools to organize and analyze the data to offer real-time, targeted recommendations.

---

### **Project: NutriGNN**

Project title?

NutriGNN: Food Nutrient Prediction with an LLM Enriched Knowledge Graph.

Where did this happen?

This project was conducted at UCSB in the course CMPSC 292F: Graphs and Graph Neural Networks, instructed by Distinguished Professor Ambuj K. Singh.

What was the main research question or goal?

The goal was to predict missing nutrient values in food composition databases (specifically the USDA database) by enriching food-nutrient knowledge graphs with semantic information derived from Large Language Models (LLMs).

What did you actually do?

I enriched the USDA dataset by using OpenAI embeddings for food and nutrient names and using GPT-4o to generate novel nutrient groupings. I constructed a knowledge graph with over 8,000 nodes and 645,000 edges. I applied adaptive scaling to normalize skewed nutrient data distributions.

I then trained Graph Neural Networks (specifically GraphSAGE architectures) on this enriched graph to predict missing nutrient values. I conducted ablation studies to determine which components of the graph enrichment (embeddings, food groups, nutrient groups) contributed to prediction accuracy.

What tools/tech did you use?

The project used Python, Graph Neural Networks (GraphSAGE, GAT), OpenAI embeddings (text-embedding-3-small), and GPT-4o. The training was performed on an NVIDIA RTX4090 GPU.

What were the results? What artifacts were created?

The best GNN model achieved 67.55% accuracy (predictions within ±30% of true values), significantly outperforming the baseline median imputation method (30.29%). Interestingly, the ablation study revealed that GPT-4o-generated nutrient groups actually reduced accuracy, while embeddings improved it. A writeup/paper was created to document the findings.

What was the hardest part, and how did you handle it?

The hardest part was learning about Graph Neural Networks (GNNs) because it represented a different way for a neural network to derive features compared to what I was used to.

What did you learn (technically and about yourself as a researcher)?

Technically, I learned how to combine LLM-derived semantic knowledge with structured graph learning. As a researcher, I learned that I can succeed at highly valuable work, but I must be strategic about balancing research opportunities (such as the invitation to join the professor's research group) with the demands of my coursework.

If you continued this line of work, what would your next step be?

Future work would involve hyperparameter tuning to further improve performance and explicitly modeling food processing methods (e.g., raw vs. cooked). I would also analyze which specific nutrients are predicted well versus poorly and implement a confidence model to indicate prediction reliability.

---

### **Project: SymbolSight**

Project title?

SymbolSight: Visual Symbol Sets That Remain Clear Despite Distortions from Retina Implants.

Where did this happen?

This project was part of the course CMPSC 291A: Bionic Vision at UCSB, instructed by Associate Professor Michael Beyeler.

What was the main research question or goal?

The goal was to determine if a specific set of visual symbols could be chosen and mapped to letters such that they remain distinguishable under the distortions caused by retinal implants, thereby improving reading capability without modifying the implant hardware.

What did you actually do?

I developed a four-step approach: generating candidate symbols (including DCT, Katakana, and Braille), simulating retinal distortions using pulse2percept at various levels, estimating confusion probabilities using a fine-tuned MobileNetV3 neural network, and selecting a letter-symbol mapping that minimizes error based on language-specific transition probabilities. I designed algorithms (using Hungarian Algorithm and local search) to optimize these mappings for Arabic, Bulgarian, and English.

What tools/tech did you use?

I used Python and the pulse2percept simulation framework. For recognition testing, I used pre-trained neural networks (MobileNetV3). Optimization algorithms included the Hungarian Algorithm and Simulated Annealing.

What were the results? What artifacts were created?

The project was voted the \#1 project in the class by peers and the professor. Results showed that symbol sets drawn from diverse sources remained more distinct than standard letters at high distortion levels. A paper is currently being prepared for submission to IEEE EMBC 2026\.

What was the hardest part, and how did you handle it?

Information not available in the provided text..

What did you learn (technically and about yourself as a researcher)?

Information not available in the provided text..

If you continued this line of work, what would your next step be?

The next steps include conducting user studies to test the approach with actual implant users, expanding the distortion models to include dead electrodes and temporal effects, and exploring a hybrid symbol set that assigns dedicated symbols to frequently used words while using the letter mapping for the rest.

---

### **Project: SnipDue**

Project title?

SnipDue.

Where did this happen?

This was a hackathon project created at SBHacks 2025 at UCSB.

What was the main research question or goal?

The goal was to simplify the tedious task of manually entering course deadlines. We wanted to create a tool that allows students to "snip" their course schedules and instantly sync cleaned-up deadlines to their calendars, addressing the gaps in existing tools regarding usability and parsing accuracy.

What did you actually do?

I built a mobile-friendly web app that uses Cloudflare Workers to interface with Anthropic’s Claude 3.5 Sonnet. I designed the system to parse raw schedule text and identify deadlines. I implemented an interactive drag-and-drop calendar UI that allows users to make corrections and additions to the AI-generated data before finalizing the sync.

What tools/tech did you use?

The app was built using HTML, Cloudflare Pages, and Cloudflare Workers. It utilized Anthropic’s Claude 3.5 Sonnet 2024-10-22 model for data parsing.

What were the results? What artifacts were created?

SnipDue won the "Best Use of Gen AI" Award at SBHacks 2025 and was a featured poster at UCSB’s AI CoP Spring Symposium 2025\. The source code was open-sourced on GitHub. The result is a functioning web app that addresses the limitations of prior tools like AgendaHero.

What was the hardest part, and how did you handle it?

The hardest parts were the time constraints of the hackathon and getting the app running on Cloudflare, which was harder than expected; we handled this by cloning and modifying an unrelated project (UFAFU) to streamline the setup. We also faced UI/UX challenges, leading the frontend developer to ban last-minute design changes.

What did you learn (technically and about yourself as a researcher)?

I learned the importance of clear, iterative communication with AI (e.g., letting it "think aloud") to improve accuracy. I also learned how crucial it is to provide meaningful feedback to users, such as warning them if their schedule input is unclear.

If you continued this line of work, what would your next step be?

The next steps would be to run prompt optimization to further improve the parsing accuracy and to turn the interface into a browser extension for Google Calendar.

