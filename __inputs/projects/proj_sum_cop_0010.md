# **Research Projects** (v.cop)

---

## **1\. State Machine Visualizer (SMV)**

**Project Title:** State Machine Visualizer (SMV) — An Automated Tool for State Machine Diagram Generation in Mechatronics Education

**Where did this happen?** This project began as part of the CAHSI (Computing Alliance of Hispanic-Serving Institutions) Program research experience for undergraduates at UC Santa Cruz, under the mentorship of Dr. Gabriel Elkaim. The project started during the second year of undergrad in 2022 and continued for approximately two years on a part-time basis. Notably, after the official CAHSI program funding ended, the work continued independently for about a year as the tool was refined and improved. The visualization tool was developed specifically for UCSC's ECE118: Introduction to Mechatronics course, which combines lab exercises with open-ended team projects where students build and program robots.

**What was the main research question or goal?** The central research question was: How can we automatically generate accurate visual representations of state machines directly from source code? The goal was to develop a tool that reverse-engineers and visualizes state machines by analyzing C source code, addressing the challenge that as state machines grow in complexity, debugging and maintaining correspondence between design and implementation becomes increasingly difficult for students.

**What did you actually do?** The tool was developed using Abstract Syntax Tree (AST) analysis combined with an annotation pipeline implemented using XPATH and XSLT. The approach was designed to be lightweight and accessible to students. The tool supports Finite State Machines (FSM), Extended Finite State Machines (EFSM), and Hierarchical State Machines (HSM) diagrams. Code samples were collected from mechatronics students across two years to ensure the transpiler could handle diverse inputs. A key simplifying assumption was that the tool targets explicit state machines where the state is tracked using a single "current state" variable, aligning with the mechatronics programming style taught at UCSC.

**Algorithms designed:** An annotation pipeline using XPATH/XSLT rule sets for efficient AST analysis and transformation was developed. The system identifies state machine patterns in C code including current-state variables, state transitions, event types, and guard conditions.

**Systems implemented:** A complete transpiler system that converts C source code into Graphviz diagram descriptions was built. The system uses Docker containers for cross-platform compatibility and includes heuristics for resolving library include files.

**Experiments run:** Evaluations were conducted with students (Ryan Taylor, Aidan Doshier, and Julio Galan) to validate the tool's effectiveness. The tool was tested on real student and competition code to ensure accuracy.

**Data collected or curated:** Code samples from mechatronics students across two academic years were collected to ensure the transpiler handles diverse implementations.

**Tools/tech used:** C language, Python, XPATH, XSLT, Abstract Syntax Trees, Graphviz, Docker containers for cross-platform deployment.

**What were the results?** A demo video was created and published on YouTube. The source code was open-sourced on GitHub (https://github.com/jlesner/smv2). A technical report was produced, and a research paper is being prepared for publication. The tool successfully generates accurate state diagrams from student implementations and is actively used in the UCSC mechatronics curriculum.

**What was the hardest part?** Extending the XPATH/XSLT rule sets to support many different possible implementations was the most challenging aspect. The project required collecting code from students across two years to ensure the transpiler could handle diverse inputs. Initially, a regex-based approach was attempted, which proved insufficient as complexity grew, requiring backtracking to different approaches multiple times.

**What did you learn?** Technically, the importance of using proper parsing techniques (AST-based) rather than regex for code analysis was learned. About research itself: persistence is key—when approaches prove insufficient, backtracking and trying different methods is necessary. Research can be both frustrating and deeply rewarding, and not giving up in the face of seemingly insurmountable obstacles leads to success.

**If continued, what would be the next step?** A possible next step would be to use the transpiler as an automatic "teacher" to train an LLM to generate state diagrams across many programming languages. The tool could generate a dataset of (source code → state diagram description) pairs, which could fine-tune a large language model to handle more diverse C code and potentially generalize to other languages like C++, Java, and Python.

---

## **2\. AI Personalized Interactive Fiction (AIPIF)**

**Project Title:** AI Personalized Interactive Fiction (AIPIF)

**Where did this happen?** This project started in CMPM146: Game AI at UC Santa Cruz, taught by Adjunct Professor Daniel G Shapiro. The course examines the use of artificial intelligence in games, covering core AI technologies for search, control, and learning, and their application to improve game design, development, and gameplay.

**What was the main research question or goal?** The goal was to empower young children with AI for crafting custom interactive stories while enabling parents to review and refine these stories. Recognizing that existing AI-driven text adventure apps like AI Dungeon and NovelAI are unsuitable for young children due to mature content and advanced reading levels, the project aimed to create an age-appropriate, educational AI storytelling tool.

**What did you actually do?** Python/XPATH/XSLT skills from the State Machine Visualizer project were applied to guide generative AI models in building narrative story trees. XPATH/XSLT was used to translate XML story trees into interactive HTML story webpages. A "tree of thought" approach was independently designed (before knowing about the formal technique) to have LLMs develop different parallel branches of a story. The system lets children choose story topics using emojis, and after narrative completion, LLM-generated descriptions create illustrations, sounds, and music using secondary AI models. The final story XML is transformed into Twee format, which compiles into interactive web-based stories using the Twine engine.

**Algorithms designed:** A branching narrative algorithm using XML representation and XSLT transformations was developed. LLM prompt chains were designed to develop each branch independently while maintaining story coherence.

**Systems implemented:** A complete prototype system including: LLM-powered story generation, text-to-image integration (Stable Diffusion), text-to-sound (Suno Bark), text-to-music (MusicGen), parental oversight mechanisms for content review and regeneration, and a scalable architecture using GPU worker pools.

**Experiments run:** Story quality was demonstrated using GPT-3.5, with plans to upgrade to GPT-4. Various AI models for illustrations, sounds, and music were evaluated and integrated.

**Tools/tech used:** Python, XPATH, XSLT, XML, GPT-3.5/GPT-4, Stable Diffusion XL, Suno Bark, MusicGen, Twine engine, Twee syntax, SugarCube styling, Mermaid.js for flow charts, Cloudflare for hosting.

**What were the results?** A high-fidelity prototype is publicly available at www.ufafu.com. Source code was released under open-source license on GitHub (https://github.com/jlesner/aipif). A conference paper was published at PAIS 2024 as a full paper, and a demo paper was published at ECAI 2024\. A demonstration video was also created.

**What was the hardest part?** Learning to reliably use AI technology for generating stories with pictures, music, and sounds in a software project was the biggest challenge. It was the first experience with generative AI models outside of a normal chat interface, so learning how to constrain them to specific tasks and understanding problems like context rot required significant effort.

**What did you learn?** Age-appropriate content generation requires careful prompt engineering and model selection. Balancing story coherence with interactive elements is challenging in branching narratives. Parental oversight is critical in AI-generated content for children. Multimedia integration enhances engagement but introduces technical challenges.

**If continued, what would be the next step?** Implementing world state tracking to improve cross-branch coherence would be the next step. This would involve having both the player and the LLM interacting with an environment, addressing the current limitation where LLM writes each story branch independently, which sometimes leads to converging story tropes.

---

## **3\. MIRROR: Measuring, Improving, and Reproducing Ranking with Open Retrieval Models**

**Project Title:** MIRROR: Measuring, Improving, and Reproducing Ranking with Open Retrieval Models

**Where did this happen?** This project was conducted in CS291A: Neural Information Retrieval at UCSB, taught by Professor Tao Yang. The course covers advanced topics on neural information retrieval and web search engines, including indexing, retrieval, ranking, and system optimization for large-scale search services with deep machine learning and NLP models.

**What was the main research question or goal?** The project investigated how reliably LLMs can be used for zero-shot document re-ranking and how to make these methods more effective and efficient in practice. A key focus was replicating and extending the SIGIR 2024 "Setwise" paper, which proposed a family of pointwise, pairwise, listwise, and setwise LLM rankers.

**What did you actually do?** A replication study of the Setwise approach was conducted using the public `llm-rankers` codebase and Pyserini with open models (Flan-T5 large/xl/xxl). Experiments on TREC DL and BEIR datasets were re-run, and the pipeline for BM25 retrieval and LLM re-ranking was automated. Analysis notebooks were built to compute discrepancy metrics between results and the paper's claims. The evaluation was extended to the NovelEval-2306 dataset with queries beyond model training cutoffs. Prompts for pointwise, pairwise, and setwise rankers were systematically redesigned, and instruction-tuned/conversational model variants (Llama 3.1 Instruct, Vicuna) were compared.

**Algorithms designed:** Modified prompts for pointwise, pairwise, and setwise ranking methods were developed, with systematic evaluation of their impact across datasets.

**Systems implemented:** An automated pipeline for BM25 retrieval and LLM re-ranking was built, along with analysis notebooks for computing discrepancy metrics and comparing effectiveness/efficiency.

**Experiments run:** Replication experiments achieving NDCG@10 within ±3% of published results were conducted. Efficiency discrepancies (96% gap in inference counts, 33-40% lower token usage for setwise methods) were uncovered. NovelEval-2306 evaluation showed LLM rankers outperform BM25 even for queries beyond training cutoff. Prompt modifications yielded up to 40.7% NDCG@10 gains for specific method-dataset pairs.

**Data collected or curated:** Results on TREC DL 2019/2020, eight BEIR datasets, and NovelEval-2306 were collected, including comprehensive GPU time measurements.

**Tools/tech used:** Python, Pyserini, llm-rankers codebase, Flan-T5 (large/xl/xxl), Llama 3.1, Llama 2, Vicuna, NVIDIA A100s and RTX 4090 GPUs, vast.ai GPU instances.

**What were the results?** High fidelity in effectiveness metrics (NDCG@10 within ±3%) was confirmed, but substantial efficiency discrepancies were revealed. The work demonstrated that prompt engineering can yield significant improvements (up to 40.7% NDCG@10 gains) and that instruction-tuned models provide consistent gains without computational overhead.

**What was the hardest part?** Ensuring rigorous replication while uncovering under-specified implementation details was challenging. Treating discrepancies as signals rather than noise and designing experiments that expose tradeoffs between effectiveness, efficiency, and robustness required careful methodology.

**What did you learn?** LLM-based retrieval should be thought of as an end-to-end system where models, prompts, hardware, and evaluation all interact. Rigor in replication is essential, and discrepancies can be valuable signals. Comprehensive documentation and hardware transparency are critical for reproducibility.

**If continued, what would be the next step?** MIRROR could be developed into a standardized, open benchmarking suite for LLM-based ranking. Exploring learned prompt or budget-aware ranking strategies where the system adapts its ranking method to query difficulty and compute constraints would be valuable extensions.

---

## **4\. GUARD: Guided Understanding & Agreement Rights Detector**

**Project Title:** GUARD: Guided Understanding & Agreement Rights Detector Prototype

**Where did this happen?** This project started in CMPSC 291I: Interactive and Real-Time User Experience of AI at UCSB, taught by Assistant Professor Mishra Sra. The course focused on investigating aspects of human-AI systems including interface design, user agency, explainability, ethics, and human-centered design processes involving AI.

**What was the main research question or goal?** The research focused on three fundamental questions: (1) How do explanation requirements differ between repetitive and unique decision contexts in AI systems? (2) What design patterns most effectively support user understanding and trust across different usage contexts? (3) How can AI systems balance transparency with cognitive load while maintaining user engagement?

**What did you actually do?** The GUARD prototype was developed to identify potential issues like ambiguities, discrepancies, inconsistencies, and mismatched facts across spoken and written communication. This was compared with a second prototype called LENS (Listing Explanation & Notification System) for e-commerce moderation. A user study (n=8) was conducted to evaluate how explanation requirements vary between repetitive tasks (e-commerce moderation) and unique decision contexts (communication monitoring).

**Algorithms designed:** Approaches for memory augmentation combined with misinformation detection were developed, and context-aware explanation strategies for different usage patterns were designed.

**Systems implemented:** The GUARD prototype with a UI tailored for smartphones was built, featuring progressive disclosure, contextual evidence presentation, and color-coded severity models for risk alerts.

**Experiments run:** A user study with 8 participants was conducted using Likert-scale surveys. E-commerce users showed high trust (3-5/5) in standardized explanations, while communication monitoring users exhibited more variance (2-5/5). Open-ended feedback was collected on interface preferences.

**Tools/tech used:** Web technologies for prototype development, smartphone-optimized UI design, user study methodology with Likert scales.

**What were the results?** A prototype demo is publicly available at https://memoir.ackop.com/index7.html. A user study paper about the prototype was produced. Key findings: repetitive tasks benefit from standardized, action-oriented explanations with consistent visual elements; unique decisions require adaptive explanations with progressive disclosure and strong privacy controls; both contexts need clear confidence communication and user agency in verification.

**What was the hardest part?** Designing an interface for a complex AI system that could work on a small mobile device screen while being as usable as possible and keeping users' cognitive load as low as possible was the primary challenge.

**What did you learn?** Trust formation differs by context and user expertise. E-commerce moderation benefits from standardized visual explanations, while communication monitoring requires adaptive approaches. Transparent confidence metrics and user control are critical in sensitive contexts.

**If continued, what would be the next step?** Extending the prototype with adapters to read documents and record conversations and interfacing with AI tools to organize and analyze these inputs and offer targeted recommendations would be the logical next steps.

---

## **5\. SnipDue**

**Project Title:** SnipDue

**Where did this happen?** This was a hackathon project at SBHacks 2025 at UCSB. The project applied concepts learned from Dr. Sra's explainable AI class.

**What was the main research question or goal?** The goal was to solve the problem of manually entering course deadlines into calendars—a time-consuming and error-prone process. The project aimed to create an app that allows LLMs to handle the main parsing task while humans make corrections and have final say on what goes to their calendar, embodying human-AI collaboration principles.

**What did you actually do?** A mobile-friendly web app was built that lets students "snip" their course schedules, paste them into the site, and instantly sync cleaned-up deadlines into their calendar of choice. The system uses Anthropic's Claude 3.5 Sonnet running on Cloudflare Workers for intelligent schedule parsing. An interactive drag-and-drop calendar UI was implemented, allowing users to review and modify AI-generated entries.

**Algorithms designed:** Prompt engineering for Claude 3.5 Sonnet to interpret diverse schedule formats was developed, along with a "think aloud" prompting approach to improve parsing accuracy.

**Systems implemented:** A serverless architecture using Cloudflare Pages and Workers was built, with a mobile-friendly HTML frontend and calendar integration capabilities.

**Experiments run:** Testing across various student schedule formats and edge cases was conducted, with iterative prompt refinement based on parsing results.

**Tools/tech used:** Anthropic Claude 3.5 Sonnet (2024-10-22), Cloudflare Pages, Cloudflare Workers, plain HTML (mobile-friendly), calendar APIs.

**What were the results?** Winner of "Best Use of Gen AI" Award at SBHacks 2025\. The project was featured as a poster at UCSB's AI CoP Spring Symposium 2025\. Source code was open-sourced on GitHub (https://github.com/sklesner/ssnip). A working prototype is available at https://snipdue.tech.

**What was the hardest part?** Cloudflare setup was harder than expected—initially cloning and modifying an unrelated project to streamline the process before replacing original code. Time constraints prevented adding all envisioned features. UI/UX challenges arose from limited student feedback, and technical limitations existed around hosting .ics files and parsing all possible schedule formats.

**What did you learn?** Modern language models like Claude Sonnet 3.5 are remarkably powerful at interpreting varied schedule formats. Clear, iterative communication with AI improves accuracy, and letting the model "think aloud" before finalizing results is beneficial. Providing meaningful feedback to users (warnings about unclear input) is crucial.

**If continued, what would be the next step?** Running prompt optimization and turning the interface into an extension to Google Calendar would be the next logical steps.

---

## **6\. SymbolSight**

**Project Title:** SymbolSight: Visual Symbol Sets That Remain Clear Despite Distortions from Retina Implants

**Where did this happen?** This project started in CMPSC 291A: Bionic Vision at UCSB, taught by Associate Professor Michael Beyeler. The course introduces the multidisciplinary field of bionic vision through computer science, neuroscience, and human-computer interaction lenses, with homeworks based on pulse2percept, a Python-based simulation framework.

**What was the main research question or goal?** The central question was: Can we choose a small set of visual symbols, and map them to letters, so that the symbols stay distinguishable under prosthetic distortions? Rather than modifying implant hardware, the goal was to select symbols that remain clear despite the limitations of current retinal prostheses.

**What did you actually do?** A four-step approach called SymbolSight was developed: (1) generate many candidate symbols from diverse sources (DCT, Katakana, Braille, Arabic, Cyrillic, Korean Hangul, Latin); (2) simulate retinal-implant distortions at several levels using pulse2percept; (3) estimate confusion probabilities using pre-trained neural networks (MobileNetV3) as stand-ins for human perception; (4) select letter-symbol mappings that minimize expected errors using language-specific letter transition probabilities. A hybrid approach was also proposed where frequent words get dedicated symbols while letter mapping covers the rest.

**Algorithms designed:** An optimization algorithm that assigns letters to symbols to minimize confusion based on letter transition patterns in a given language was developed. The algorithm considers which letter sequences appear most often and assigns them symbols least likely to be confused.

**Systems implemented:** A complete pipeline for symbol generation, distortion simulation (low/medium/high levels), confusion matrix estimation via fine-tuned neural networks, and optimal symbol assignment was built.

**Experiments run:** Experiments across Arabic, Bulgarian, and English were conducted, showing that symbols from diverse sources remained more distinct than standard letters at higher distortion. Sequential symbol presentation with perceptual residue effects was also simulated.

**Data collected or curated:** Symbol sets from seven different writing systems/sources were curated. Letter transition probabilities for Arabic, Bulgarian, and English were compiled. Confusion matrices at multiple distortion levels were generated.

**Tools/tech used:** Python, pulse2percept simulation framework, MobileNetV3 neural network, PyTorch, NumPy, language transition probability analysis tools.

**What were the results?** The project was voted \#1 project out of 34 students and 16 projects in the class. A paper is currently being prepared for submission to IEEE Engineering in Medicine and Biology Society (EMBC 2026\) with Dr. Beyeler. Simulations showed that carefully chosen symbol sets from diverse sources remained more distinguishable than standard letters under prosthetic distortion.

**What was the hardest part?** The work is inherently preliminary—results depend on simulations and neural network proxies for human perception rather than actual user studies. Models don't capture the full variety of percepts seen with retinal implants, so benefits are hypotheses to test rather than conclusions.

**What did you learn?** Mixing symbol sources (e.g., combining DCT, Katakana, and Braille) helps reduce confusions. The serial, single-symbol reading regime of prosthetic vision requires different optimization approaches than natural reading. Trade-offs between letter-level and word-level optimization exist.

**If continued, what would be the next step?** User testing with implant users is essential. Expanding distortion models to include varying electrode-grid density, dead electrodes, and longer temporal persistence would be valuable. Exploring broader symbol pools (emoji, flags, face icons) and learning new symbols directly with contrastive objectives could improve results.

---

## **7\. NutriGNN: Food Nutrient Prediction with an LLM Enriched Knowledge Graph**

**Project Title:** NutriGNN: Food Nutrient Prediction with an LLM Enriched Knowledge Graph

**Where did this happen?** This project started in CMPSC 292F: Graphs and Graph Neural Networks at UCSB, taught by Distinguished Professor Ambuj K. Singh. The course examines graphs and graph neural networks from aspects of representation, reasoning, robustness, and symmetry. After the project, Dr. Singh invited participation in his research group for drug discovery work.

**What was the main research question or goal?** Food composition databases remain incomplete, with only 31% of food-nutrient pairs directly measured in the USDA database. The goal was to predict missing nutrient values by enriching food-nutrient knowledge graphs with information derived from Large Language Models, then training Graph Neural Networks on this enriched structure.

**What did you actually do?** A novel approach was introduced for enriching food-nutrient knowledge graphs using LLM-derived information. USDA data was combined with OpenAI embeddings and GPT-4o-generated nutrient groupings to create a comprehensive graph with over 645,000 edges connecting 8,170 nodes. GNNs were trained on this enriched structure to predict missing nutrient values. Ablation studies were conducted to measure how each LLM-derived feature contributes to prediction performance.

**Algorithms designed:** An adaptive scaling approach for handling nutrient values spanning five orders of magnitude was implemented. Graph enrichment techniques combining structural USDA data with semantic LLM knowledge were developed.

**Systems implemented:** A complete GNN pipeline for nutrient prediction was built, including data preprocessing for USDA database (7,800 foods, 150 nutrients), graph construction with multiple edge types, and training/evaluation infrastructure.

**Experiments run:** Ablation studies comparing all-enrichment-enabled vs. disabled configurations were conducted. Single-feature ablations identified that disabling nutrient group embedding vectors actually improved performance. The best model achieved 67.55% accuracy (predictions within ±30% of true values), far outperforming the baseline food group median imputation (30.29%).

**Data collected or curated:** USDA Food Nutrition Database with \~7,800 foods and 150 nutrients was processed. Analysis showed 31% measured, 24% estimated, and 45% missing values. OpenAI embeddings for food and nutrient names were generated, along with GPT-4o nutrient groupings.

**Tools/tech used:** Python, PyTorch Geometric, Graph Neural Networks (GCN, GAT, GraphSAGE architectures), OpenAI API for embeddings, GPT-4o for nutrient groupings, RTX 4090 GPU for hyperparameter tuning, t-SNE for visualization.

**What were the results?** The best GNN model achieved 67.55% accuracy within ±30%, substantially outperforming baseline food group median imputation (30.29%). Ablation studies revealed that most LLM-derived features improved performance, though GPT-4o-generated nutrient groups unexpectedly reduced accuracy. The approach demonstrated how domain knowledge encoded in LLMs can enhance structured prediction tasks.

**What was the hardest part?** Learning about GNNs was challenging because it represented a different paradigm for how neural networks obtain features compared to prior experience.

**What did you learn?** Not all LLM-derived features are beneficial—ablation studies are essential to identify which ones help. LLM-enriched graphs can significantly improve structured prediction tasks, especially with incomplete data. Balancing research opportunities with required coursework demands is important for success.

**If continued, what would be the next step?** Explicitly modeling food processing methods (raw vs. cooked) and regional variations would be valuable. Analyzing which nutrients perform well or poorly and developing a confidence model to indicate prediction reliability are important extensions. Further hyperparameter tuning with more computational resources could improve results.

---

## **8\. DBDoctor: LLM-Aided SMT Refutation of SQL Query Equivalence**

**Project Title:** DBDoctor: LLM-Aided SMT Refutation of SQL Query Equivalence

**Where did this happen?** This project started in CMPSC 291A: Special Topics in Foundation Models at UCSB, taught by Professor Xifeng Yan and co-chaired by Distinguished Professor Amr El Abbadi. The course focuses on Large Language Models, examining the latest research publications with emphasis on LLM foundations and applications. Work is ongoing with Dr. Fuheng Zhao (UCSB PhD alumni) toward publication at CAV 2026\.

**What was the main research question or goal?** Automated optimization of SQL queries requires knowing when a rewritten query remains semantically equivalent to the original. Many formal verification tools cannot handle features common in modern SQL (e.g., window functions). The goal was to create a computer-aided verification system that uses LLMs to rewrite unsupported SQL into verifier-friendly forms while maintaining rigorous verification through SMT solvers.

**What did you actually do?** DBDoctor was developed as an agentic framework that uses LLMs to rewrite SQL queries containing unsupported constructs into semantically aligned, verifier-compatible forms. The system delegates refutation to SMT-based SQL equivalence checkers (e.g., VeriEQL) to produce counterexamples. A crucial self-correcting loop was implemented where counterexamples found on rewritten pairs are validated against original queries, accepting only counterexamples that prove non-equivalence of the original SQL.

**Algorithms designed:** A rewrite-to-verify methodology that translates complex SQL into SMT verifier-compatible forms without changing the verifier was developed. A counterexample validation loop that filters spurious rewrites was created.

**Systems implemented:** A complete agentic system combining OpenAI's tool-calling gpt-4.1-mini and o4-mini "thinking" models was built. The system includes database command execution, SQL verifier integration (VeriEQL), and iterative feedback loops.

**Experiments run:** Evaluation on a dataset of 23,994 LeetCode query pairs was conducted, demonstrating extended coverage to previously unsupported queries, discovery of new counterexamples missed under practical time budgets, and consistency with SMT-based verifier where it already succeeds.

**Theoretical work:** The approach addresses the fundamental undecidability of SQL equivalence verification by creating a practical hybrid system that leverages LLM heuristics disciplined by formal SMT reasoning and grounded by empirical database feedback.

**Tools/tech used:** Python, OpenAI API (gpt-4.1-mini, o4-mini), VeriEQL SMT-based SQL verifier, PostgreSQL/SQLite for counterexample validation, SQL parsing and analysis tools.

**What were the results?** A paper is being prepared for the International Conference on Computer Aided Verification (CAV 2026\) with Dr. Fuheng Zhao and Dr. Xifeng Yan. The system extends verifier coverage to previously unsupported queries, discovers additional counterexamples, and agrees with the SMT verifier where it already succeeds.

**What was the hardest part?** The challenges include handling the undecidable nature of SQL equivalence, ensuring LLM rewrites preserve semantic relationships across both queries, and managing issues like list semantics (ORDER BY), non-deterministic queries (LIMIT, floating-point arithmetic), and verifier timeouts.

**What did you learn?** LLM-driven rewrites need not be perfect; they must only land inside the verifier's coverage while preserving relative transformation across both queries. The division of labor leverages complementary strengths: LLMs for reaching verifiable forms, SMT verification for formal reasoning, and database execution for final judgment.

**If continued, what would be the next step?** Extending to list semantics (preserving ORDER BY constraints), handling non-deterministic queries robustly, leveraging the small-scope hypothesis for converting hard instances to tractable ones, implementing tree-structured LLM interaction (tree-of-thoughts), and automatic prompt optimization are all promising directions.

---

## **9\. HAPO: Hyper-Reflection for Automatic Prompt Optimization**

**Project Title:** HAPO: Hyper-Reflection for Automatic Prompt Optimization

**Where did this happen?** This was the UCSB Masters Project, advised by Professor Xifeng Yan with Distinguished Professor Amr El Abbadi as co-chair. Dr. Fuheng Zhao (UCSB PhD alumni with experience combining LLMs and database problems) also provided advising.

**What was the main research question or goal?** Frontier-scale LLMs demonstrate high accuracy in complex tasks but remain computationally expensive, while compact models are efficient but brittle. The research investigated Automatic Prompt Optimization (APO) as a bridge to enhance compact models for verifiable tasks, specifically SQL Synthesis (Example Generation) and SQL Analysis (Counterexample Discovery).

**What did you actually do?** Using the GEPA (Genetic-Pareto) framework, prompts were optimized for two SQL verification tasks. A novel contribution called "Hyper-Reflection" was introduced, which utilizes frontier models to optimize the reflection mechanism within GEPA itself. A critical "thinking truncation" failure mode was identified and resolved—where compact models performing Chain-of-Thought reasoning consumed the entire generation budget on thinking, leaving no tokens for answers. This was addressed by extending context windows via YaRN.

**Algorithms designed:** Hyper-Reflection was developed as a meta-optimization technique that applies prompt optimization to GEPA's reflection instructions using multiple frontier models (Claude Opus, GPT-5, Gemini 2.5). The approach generates improved reflection templates (opus1, gemni1, gpt5think1) enabling diverse reflection strategy exploration.

**Systems implemented:** A complete APO pipeline using DSPy and GEPA was built. vLLM serving infrastructure with both standard (8k context) and high-context (40k) configurations was implemented. YaRN rope scaling for context window extension from 8k to 40,960 tokens was integrated.

**Experiments run:** SQL Synthesis achieved 100% success rate with optimized prompts. SQL Analysis reached 75% accuracy on challenging counterexample discovery, outperforming baselines by 30%. The "thinking truncation" failure mode was documented and resolved.

**Tools/tech used:** Python, DSPy framework, GEPA (Genetic-Pareto), vLLM for inference, Qwen3-8B compact model, YaRN for context extension, OpenAI API, Anthropic API, Google AI API for frontier model access, RTX 5090 GPUs (32GB VRAM).

**What were the results?** The compact Qwen3-8B model achieved 100% success on SQL Synthesis and 75% accuracy on SQL Analysis with APO, Hyper-Reflection, and extended context windows—outperforming baselines by 30%. A presentation and detailed writeup were produced.

**What was the hardest part?** Identifying and resolving the "thinking truncation" failure mode was a key challenge—discovering that sophisticated Hyper-Reflection templates caused compact models to engage in extensive Chain-of-Thought reasoning that consumed all generation tokens before producing answers.

**What did you learn?** The complexity of optimized prompts must be matched by adequate generation budget. Sutton's "Bitter Lesson" applies—leveraging computation to discover reflection strategies automatically outperforms hand-crafting. Meta-optimization (optimizing the optimizer) is a powerful technique.

**If continued, what would be the next step?** A promising direction is "LEAP – Learning from Evolved and Augmented Prompts": systematically converting optimization trajectories from GEPA, C-Evolve, Maestro, and other optimizers into training data for BPO-style prompt rewriters. This would distill expensive search-based optimizers into lightweight, deployable systems while studying how synthetic preference data interacts with human preference datasets regarding robustness, bias, and alignment.

