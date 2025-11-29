## **B. SOP – Your academic & research story**

### **1\. Why a CS PhD (and why now)?**

3. Why do you want to pursue a **PhD in computer science** rather than just a master’s or going straight to industry?

My long-term goal is to work in industry, building and deploying advanced AI systems. However, after my undergraduate degree I felt unprepared to contribute meaningfully to the kinds of AI technologies that are rapidly transforming software engineering. In the words often attributed to Canada’s famous Wayne Gretzky, I want to “skate to where the puck is going to be,” and for me that means gaining the depth of understanding and research training that a PhD in computer science provides.

When I first applied to graduate school, I chose a master’s rather than a PhD because I wasn’t yet confident that I belonged on a research path. I had struggled with math early on, and at Palo Alto’s highly competitive Gunn High School I was surrounded by exceptionally strong students, which made me underestimate my own abilities. With a 3.9 GPA, when I applied to several UCs I was admitted only to UCSC and only to the waitlist so when I graduated with my BSc this still reinforced my hesitation to commit to something as long and demanding as a PhD.

Completing my Masters at UCSB in one year has shifted that perspective entirely. The experience showed me that I can thrive in graduate-level coursework and research, and it left me feeling that my time in school was too short rather than too long. More importantly, it ignited my curiosity: I now have several concrete research ideas in AI that I am eager to pursue and develop more rigorously. Rather than stepping away to industry at this moment, I want to build on this momentum, deepen my theoretical and experimental foundations, and train myself to lead cutting-edge AI work. That is why I am applying for a PhD in computer science now, rather than stopping at a master’s or going directly into industry.

4. What **big questions or problems** in CS are you most excited about?

I want to research how AI can be harnessed to build systems that are robust and reliable that society can trust.

5. When did you first realize you enjoy **research** (vs just classes or coding)?

I first realized I enjoyed research as an undergraduate working on State Machine Visualizer. I started as a paid research assistant but even when the grants supporting me ran out I continued working on the project and the bulk of my discovery happened well after funding was gone and I am still hoping to publish the paper, because I believe the ideas we developed can be useful to others and I want to contribute back to the community that first drew me into research.

This early research experience motivated me during the gap between end of my Bsc and start of Msc to continue on my own working on my AIPIF project and with the help of Dr.Shaprio (as my mentor outside any coursework since I had already finished UCSC) writing it up for PAIS 2024 and ECAI 2024\. When to my surprise and joy both conferences accepted my work I began to think to myself I could keep doing more of these. Which at first was a fun project that could be turned into a thorough paper for other researchers to gain insight from was almost unbelievable to me. 

Last year during my UCSB masters, leaving three graduate courses  in the middle of my first quarter to travel to Europe was daunting. And during ECAI/PAIS 2024 was a bit rocky start, there were so many points I wanted to improve (not speaking so fast during my presentation, being more inquisitive to others’ publications, asking those who enjoyed my demo’s booth to vote for my project), I always believe skills need iteration in order to become better at them, so i’ve had this desire to try again. 

### **2\. Research interests (what you want to work on at UCSB)**

6. Describe your **main research interests** as specifically as you can.

My present research interest lies in: NNs, LLMs, VNNs, GNNs,.. I am passionate about learning how these work, how to improve them, how to best use them to solve important problems, and most of all how to make them trustworthy and reliable.

7. Are there **sub-areas** or keywords that describe your interests? (e.g., “concurrency,” “program analysis,” “graph neural networks,” “human-AI interaction,” “security & privacy,” etc.)

   Inference-Time LLM Scaling 

   LLM Automatic Prompt Optimization 

   Mechanistic Interpretability 

   Self Healing Prompt optimization for when there are updates to the LLM provider. Using statistical techniques to detect anomalies, and then apply Gepa or other prompt optimizing strategies

   I’ve engrained myself in the UCSB research community working with several profs in the CS department. I’ve already spent a year learning the lab and school culture.  

   How can prompts be best optimized for individual tasks? 

8. Are there any **papers, talks, or projects** that shaped your interest in this area? What about them grabbed you?

   [https://arxiv.org/abs/2507.19457](https://arxiv.org/abs/2507.19457) GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning, This paper came out while I was working on my final masters project. My interest in this paper was so strong that I was committed to replicating the result, by writing my own implementation. Once their code was available I was their first user and submitted their first ten github tickets reporting issues that I discovered and proposing patches. 

   Perhaps the reason why I was so attracted to this paper was because I knew from first hand experience that LLM can be good at writing prompts and the GEPA paper introduced a principled search approach based on a pareto front and genetic programming cross overs. Since LLM’s became popular I’ve been interested in Inference-time scaling strategies such as chain of thought, tree of thought, and ReAct/Reflexion because they align with human patterns of problem solving.   

   [Why are prompt optimizers still so underrated?](https://www.youtube.com/watch?v=0bkwd9OYqfk) \- Last week I attended the Bay Area DSPy Meetup in SF and watched a talk given by Stanford professor Chris Potts and discussed with other researchers and industry software engineers the development of automatic prompt optimizers being able to beat RL posttraining. I learned that for startups, using prompt optimization is faster (uses less rollouts) than having to RL for new weights every time a newer and better model comes out, given how fast this field evolves on discovering new internal frameworks for transformers and discovering which models perform the best on which specifics. Dr. Potts' talks opened up a new world of directions and current problems in the area of prompt optimization that I am interested in pursuing, like how we can make prompt optimization more attractive to developers that don’t want to build a training and test set for their LLM agent.

### **3\. Research experience (projects, labs, theses, internships)**

For **each significant research project**, answer these (copy/paste this block per project):

9. **Project title / topic:**

10. Where did this happen? (e.g., undergrad thesis, RA in Prof. X’s lab, internship at Company Y, independent project)

11. Time frame (approx. dates).

12. What was the **main research question or goal**?

13. What did *you* actually do? (Be detailed\!)  
    * Algorithms you designed?  
    * Systems you implemented?  
    * Experiments you ran?  
    * Data you collected or curated?  
    * Theoretical work you did?

14. What tools/tech did you use? (Languages, libraries, frameworks, hardware, etc.)

15. What were the **results**?

    * Any papers, posters, demos, code releases, internal reports, or just partial/negative results?

16. What was the **hardest part**, and how did you handle it?

17. What did you **learn** (technically and about yourself as a researcher)?

18. If you continued this line of work, what would your **next step** be?

For each big project from your undergrad and masters and conference in Spain:

* Name of the professors involved?  
* Names of people you did the project with?  
* What did you study?   
* Why did you pick this topic?   
* What did you accomplish?    
* What lessons did you learn?  
* **How does it connect to your PhD ambitions?**

Many but not all of my research project started in courses that encourage students to conduct research: 

1. PROJECT: State machine visualizer (SMV)  
   1. MENTOR: Dr. Gabriel Elkaim at UCSC  
   2. The project started as part of the CAHSI program research experience for undergraduates and continued on my own initiative as I continued to improve the tool after funding ran out for about a year after the official CAHSI program ended. The project started in my second year undergrad in 2022 and continued for about two years with me working on it part time.  
   3. The visualization tool was developed for UCSC course ECE118: Introduction to Mechatronics: Technologies involved in mechatronics (intelligent electro-mechanical systems) and techniques necessary to integrate these technologies into mechatronic systems. Topics include electronics (A/D, D/A converters, opamps, filters, power devices), software program design (event-driven programming, state machine-based design), DC and stepper motors, basic sensing, and basic mechanical design (machine elements and mechanical CAD). Combines lab component of structured assignments with a large and open-ended team project. Students who enrolled in this class will learn how to solve engineering problems using the C Programming Language.   
   4. URL: [https://www.overleaf.com/project/66e5e44212c7ea4a0efe4dbe](https://www.overleaf.com/project/66e5e44212c7ea4a0efe4dbe)   
   5. What were the **results**? Any papers, posters, demos, code releases, internal reports? Apart from the visualization tool released as open source on github I have a demo video and a technical report and a research paper that I am hoping to publish.    
   6. Demo video: [https://www.youtube.com/watch?v=IHp0X0J5Di8?autoplay=1\&fs=1](https://www.youtube.com/watch?v=IHp0X0J5Di8?autoplay=1&fs=1)   
   7. Source code: [https://github.com/jlesner/smv2](https://github.com/jlesner/smv2)   
   8. Technical report: [https://smv.ackop.com/smv\_ieee\_ICRA\_0054.pdf](https://smv.ackop.com/smv_ieee_ICRA_0054.pdf)   
   9. What was the **hardest part**, and how did you handle it?  The hardest part was extending the XPATH/XSLT rule sets the project uses to support many different possible implementations. The project involved me collecting code from mechatronics students across two years to make sure the transpiler can handle a diverse set of inputs.  
   10. What did you **learn** (technically and about yourself as a researcher)?  When I started I took the wrong approach trying to use regex without using a proper C code parser, and during the project I had to back track with a different approach a few times as each time the complexity grew and the approach I was using proved insufficient. I learned that research can be both frustrating and deeply rewarding. I learned that when I try try try and do not give up I can overcome even seemingly insurmountable obstacles.  
   11. If you continued this line of work, what would your **next step** be?  
       A possible **next step is to use the developer transpiler as an automatic “teacher” to train an LLM to generate state diagrams across many programming languages.**  
       Right now, the main limitation of our tool is that it only understands robot control code written in C that follows specific conventions (explicit current-state variables, consistent naming, particular switch/if patterns, etc.). However, within that niche, the tool is very reliable: it can take real student and competition code and automatically produce accurate state diagrams.  
       Because of that reliability, we could run the tool on a large collection of C-based robot controllers and automatically build a dataset of **(source code → state diagram description)** pairs (e.g., Graphviz descriptions). This dataset could then be used to **fine-tune a large language model** specifically for the task of turning control code into state diagrams.  
       The interesting research question is whether a fine-tuned LLM, once it has seen many such pairs, can:  
1. **Handle more diverse C code** than our tool (looser naming conventions, mixed patterns, less-structured code), and

2. **Generalize to other languages** it already understands (e.g., C++, Java, Python) and generate equivalent state diagram descriptions for them, even though our original tool only works on C.

   We could then evaluate this next step by comparing:

* LLM-generated diagrams vs. diagrams from our tool on C projects, and

* LLM-generated diagrams vs. human-drawn diagrams (like the student Graphviz diagram in the paper),

  to see whether the LLM truly extends the reach of our original static-analysis approach across languages and coding styles.


2. PROJECT: AI Personalized Interactive Fiction (AIPIF)  
   1. INSTRUCTOR: Adjunct Professor Daniel G Shapiro at UCSC  
   2. COURSE: The project started in CMPM146: Game AI: Examines the use of artificial intelligence (AI) in games. Covers core AI technologies for search, control, and learning, and the application of AI to improve game design, development, and game play. Examines the AI content in multiple commercial games. This is an online class; most lectures are asynchronous. The weekly lab is synchronous, focused on Q\&A and group discussion of work in progress.  
   3. I applied my PYTHON/XPATH/XSLT skills from the State Machine Visualizer project to guide generative AI models to build narrative story trees, and used XPATH/XSLT to translate these XML story tries into interactive story webpages in HTML.  This work predated my knowledge of the “tree of thought” approach with LLM but I had designed a similar approach to have LLMs to develop different parallel branches of a story.       
   4. Prototypes are available for public use at: [https://www.ufafu.com/](https://www.ufafu.com/)  
   5. Source code available under open source licence at [https://github.com/jlesner/aipif](https://github.com/jlesner/aipif)   
   6. Writeup: [https://www.overleaf.com/project/66c96831e34c6606d54edfb9](https://www.overleaf.com/project/66c96831e34c6606d54edfb9)   
   7. Conference Paper: [https://ebooks.iospress.nl/volumearticle/70169](https://ebooks.iospress.nl/volumearticle/70169) Was published at PAIS 2024 as a full paper  
   8. DEMO Paper: [https://ebooks.iospress.nl/doi/10.3233/FAIA241036](https://ebooks.iospress.nl/doi/10.3233/FAIA241036) and ECAI 2024 as a demo paper  
   9. The hardest part of this project was to learn how to reliably use AI technology for generating stories with pictures, music and sounds in a software project. It was my first time, I was not familiar with generative AI models outside of a normal chat interface. So learning how to constrain them to my task was difficult to wrap my head around. Also understanding the problems of context rot.   
   10. If I continued this line of work, a possible next step would be to have a world state tracking to improve the cross branch coherence.   
         
3. PROJECT: “MIRROR: Measuring, Improving, and Reproducing Ranking with Open Retrieval Models”

		INSTRUCTOR:  Professor Tao Yang at UCSB

    1. COURSE: CS291A: Neural Information Retrieval: covers advanced topics on neural information retrieval and web search engines. The content to be focused includes indexing, retrieval, ranking, and system optimization for large-scale search services with deep machine learning and NLP models. Recent papers in top conferences will be reviewed, and issues in relevance, efficiency, and scalability will be studied.  
   2. Writeup: [https://www.overleaf.com/project/675bc7756de4e6a85d6cd043](https://www.overleaf.com/project/675bc7756de4e6a85d6cd043)   
      SUMMARY:  [https://chatgpt.com/c/6929bbd1-c378-8328-843b-18c60e5c5003](https://chatgpt.com/c/6929bbd1-c378-8328-843b-18c60e5c5003)   
        
      For my MIRROR project (\*Measuring, Improving, and Reproducing Ranking with Open Retrieval models\*), I investigated how reliably we can use large language models (LLMs) for zero-shot document re-ranking and how to make these methods more effective and efficient in practice. I started by replicating the SIGIR 2024 “Setwise” paper, which proposed a family of pointwise, pairwise, listwise, and setwise LLM rankers. Using the public \`llm-rankers\` codebase, Pyserini, and open models such as Flan-T5 (large/xl/xxl), I re-ran their experiments on TREC DL and BEIR datasets, automated the pipeline for BM25 retrieval and LLM re-ranking, and built analysis notebooks to compute discrepancy metrics between my results and the paper’s. I was able to match their effectiveness (NDCG@10 within ±3% and the same ordering of methods), but uncovered substantial efficiency differences (e.g., a 96% gap in inference counts traced to batch size differences and 33–40% fewer generated tokens for some setwise methods), highlighting how fragile reproducibility can be when implementation details are under-specified.  
        
      I then treated the original work as a platform to explore improvements and generalization. I extended the evaluation to the NovelEval-2306 dataset, where queries explicitly target information beyond the models’ training cutoff, and showed that all LLM rankers still outperform BM25, with setwise approaches achieving the best NDCG@10 while remaining more efficient than fully pairwise schemes. I systematically redesigned prompts for pointwise, pairwise, and setwise rankers and quantified their impact across BEIR datasets, finding up to 40.7% NDCG@10 gains in some method–dataset pairs, especially for setwise methods, with minimal degradation elsewhere. I also compared base Llama and Llama 2 models to their instruction-tuned and conversational variants (e.g., Llama 3.1 Instruct, Vicuna), observing consistent ranking improvements without significant latency increases.  
        
      This project taught me to think of LLM-based retrieval as an end-to-end system where models, prompts, hardware, and evaluation all interact. I learned to be rigorous about replication—treating discrepancies as signals rather than noise—and to design experiments that expose tradeoffs between effectiveness, efficiency, and robustness (for example, to changes in the initial BM25 ranking). Going forward, I would like to turn MIRROR into a standardized, open benchmarking suite for LLM-based ranking and explore learned prompt or budget-aware ranking strategies, where the system adapts its ranking method to query difficulty and compute constraints.

      

4. PROJECT: Guided Understanding & Agreement Rights Detector (GUARD) Prototype  
   1. INSTRUCTOR: Mishra Sra Assistant Professor at UCSB  
   2. COURSE: The project started in CMPSC 291I Interactive and Real-Time User Experience of AI: To create innovative AI-supported systems that truly benefit end-users in real-life situations, it is crucial to focus on the interactive and real-time user experience of AI. This course is centered around investigating the various aspects of human-AI systems, including interface design, user agency, explainability, ethics, and the human-centered design process involving AI. We will examine these through reading research papers and through the design and prototyping of an AI Task Guidance System. By prioritizing human needs and preferences in the design process, we will learn to successfully develop AI systems that not only enrich our lives but also serve to amplify our abilities.  
   3. Writeup: [https://www.overleaf.com/project/6732a2bda24c385d65e38049](https://www.overleaf.com/project/6732a2bda24c385d65e38049)   
   4. My GUARD prototype identifies potential issues like ambiguities, discrepancies, inconsistencies, and mismatched facts across spoken and written communication with a UI design that is tailored for smartphones.   
   5. The goal of this project is to research interpretable interfaces in AI driven applications.   
   6. The hardest part of this project was designing an interface for a complex AI system that could work on a small mobile device screen that was as usable as possible and kept the users cognitive load as low as possible.  
   7. If I continued this on this prototype, the next step would be to extend the prototype with adapters to read documents and record conversations and to interface with AI tools to organize and analyze these inputs and offer targeted recommendations.   
        
        
5. PROJECT: SnipDue [https://snipdude.com/](https://snipdude.com/)   
   1. Hackathon project at SBHacks 2025  at UCSB  
   2. I applied what I learned from Dr.Sra’s explainable AI class to to design an app that allows LLMs to handle the main part of the task and the user can make corrections and additions that it notices that the LLM missed, ultimately humans have the final say on what goes to their calendar       
   3. Winner of “Best Use of Gen AI” Award @ SBHacks 2025   
      [https://sb-hacks-xi.devpost.com/project-gallery](https://sb-hacks-xi.devpost.com/project-gallery)   
      Writeup: [https://devpost.com/software/ssnip](https://devpost.com/software/ssnip)   
        
      SnipDue is a mobile-friendly web app from SB Hacks XI that lets students “snip” their course schedules, paste them into the site, and instantly sync cleaned-up deadlines into their calendar of choice using Anthropic’s Claude 3.5 Sonnet running on Cloudflare Workers. It features an interactive drag-and-drop calendar UI.  
        
   4. Featured poster at UCSB’s AI CoP Spring Symposium 2025  
      [https://otl.ucsb.edu/ai-cop-spring-symposium-2025](https://otl.ucsb.edu/ai-cop-spring-symposium-2025)   
   5. Project source code open sourced: [https://github.com/sklesner/ssnip](https://github.com/sklesner/ssnip)   
   6. If I continued this line of work, a possible next step would be to   
      1. Run prompt optimization  
      2. Turn the interface into an extension to google calendars  

   

   

6. PROJECT: “SymbolSight: Visual Symbol Sets That Remain Clear Despite Distortions from Retina Implants”  
   1. INSTRUCTOR: Michael Beyeler Associate Professor  at UCSB  
   2. COURSE: The project started in CMPSC 291A Bionic Vision: This graduate course will introduce students to the multidisciplinary field of bionic vision viewed through the lens of computer science, neuroscience, and human-computer interaction. There are no official prerequisites for this course. The instructor will do his best to make the course content self-contained, including a crash course in neuroscience & computational vision. Homeworks will be based around pulse2percept, a Python-based simulation framework for bionic vision. [https://bionicvisionlab.org/teaching/2025-winter-cs291a/](https://bionicvisionlab.org/teaching/2025-winter-cs291a/)   
   3. Write up: [https://www.overleaf.com/project/67d6610b61ac30007830bfbc](https://www.overleaf.com/project/67d6610b61ac30007830bfbc)  
   4. Demo video:   
   5. Project was voted by students and professor the top project in the class of graduate peers (voted \#1 project out of 34 students and 16 projects)  
   6. Currently Dr.Beyeler and I are submitted project write up to IEEE Engineering in Medicine and Biology Society (EMBC 2026\)  
   7. If I continued this line of work, I would want to  
      1.  learn how we can use generative models to create an optimized set of symbols.   
      2. Building on SymbolSight, I would like to explore how large language models and transformer architectures can serve as a unifying framework for co-designing symbol sets and decoders for prosthetic reading. A natural next step is to replace these components with transformer-based models: using character-level transformer language models to provide rich contextual priors over letters, and transformer-based visual encoders to produce more human-like confusion matrices for distorted symbols. This would allow symbol assignment to be optimized not just for pairwise letter transitions, but for full-sequence predictions under realistic language context.  
   8. The hardest part of this project was to ...

      

7. PROJECT: “NutriGNN: Food Nutrient Prediction with an LLM Enriched Knowledge Graph“  
   1. INSTRUCTOR: Distinguished Professor Ambuj K. Singh at UCSB  
   2. COURSE: The project started in CMPSC 292F Graphs and Graph Neural Networks: This course will examine graphs and graph neural networks from the specific aspects of representation, reasoning, robustness, and symmetry.  
   3. Writeup: [https://www.overleaf.com/project/678f59976006e02f0f2aa21c](https://www.overleaf.com/project/678f59976006e02f0f2aa21c)   
   4. After my GNN project Dr.Singh contacted me and invited me to be a part of his research group for drug discovery and despite such work being incredibly valuable for medicine I had to turn him down to prioritize the four graduate courses I already had on my plate. I’ve learned about myself as a researcher that I can succeed at highly valuable work, but I need to be strategic about balancing research opportunities with the demands of my required coursework.  
   5. If I continued this line of work, a possible next step would be to ...  
   6. The hardest part of this project was to ...  
        
        
8. PROJECT: “DBDoctor: LLM-Aided SMT Refutation of SQL Query Equivalence”   
   1. INSTRUCTOR: Professor Xifeng Yan and and Distinguished Professor Amr El Abbadi at UCSB  
   2. COURSE: The project started in CMPSC 291A Special Topics in Foundation Models: This graduate-level research course focuses on foundation models, specifically Large Language Models (LLMs). Throughout the course, we will examine the latest research publications in this rapidly evolving field, with a particular emphasis on the foundations of LLMs and their applications. Students are expected to engage in reviewing and presenting research papers, and completing a substantial course project. The primary objective of this course is to cultivate a deep understanding of LLMs and their limitations.  
   3. Writeup: [https://www.overleaf.com/project/6905a204e42ec15cbcf613cf](https://www.overleaf.com/project/6905a204e42ec15cbcf613cf)  
   4. Working with Dr. Fuheng Zhao and Dr. yan this work is in the process of getting submitted to International Conference on Computer Aided Verification (CAV 2026\)  
   5. If I continued this line of work, a possible next step would be to   
      1.   
   6. The hardest part of this project was to

      

9. PROJECT: “PHAST: Prompt Hyper-reflection for Analysis and Synthesis Tasks”  
   1. INSTRUCTOR: Professor Xifeng Yan was my advisor and Distinguished Professor Amr El Abbadi was co-chair and Dr. Fuheng Zhao at UCSB  
   2. Presentation: [https://jlesner0.ackop.com/dbdoctor\_0040\_stripped.pdf](https://jlesner0.ackop.com/dbdoctor_0040_stripped.pdf)   
   3. Write up: [https://www.overleaf.com/project/6929dd0ffb57e87c2a169f51](https://www.overleaf.com/project/6929dd0ffb57e87c2a169f51)   
   4. The hardest part of this project was to ...  
   5. What is next for this?  
      [**https://chatgpt.com/c/6928fbcd-e42c-8325-85e6-8bf10b9dc55e**](https://chatgpt.com/c/6928fbcd-e42c-8325-85e6-8bf10b9dc55e): A possible future direction this line of work occurred to me at last week’s Bay Area DSPy Meetup in SF listening to Stanford professor Chris Potts give a presentation about automatic prompt optimizers like GEPA [https://www.youtube.com/watch?v=0bkwd9OYqfk](https://www.youtube.com/watch?v=0bkwd9OYqfk) . At the time I was also thinking about Rich Sutton “Bitter Lesson” (that I learned about Dr. Yan’s CS405 foundational models class) and how it might apply to GEPA and it occurred to me that automatic prompt optimization algorithms can be turned into *data generators* to improve prompt optimizers like Black-Box Prompt Optimization (BPO) [https://arxiv.org/pdf/2311.04155](https://arxiv.org/pdf/2311.04155). BPO currently learns to rewrite user instructions into better prompts using human preference datasets (e.g., OASST, HH-RLHF, Arena), but it is limited by the coverage and biases of those corpora and mostly targets single-turn instruction following. In parallel, very recent methods such as GEPA, C-Evolve, Maestro, Feedback Descent, and ACE already outperform GEPA on multi-step reasoning and agentic benchmarks like HotpotQA, IFBench, and AppWorld, yet the rich trajectories they produce—evolving prompts, pairwise preferences, and textual rationales—are not reused as supervision for general-purpose prompt optimizers.  
      Thus an unexplored path that I could take in my PhD research could be to systematically convert optimization trajectories into training data for BPO-style models. A possible title for this research could be “**LEAP** – *Learning from Evolved and Augmented Prompts”*. Concretely, I could collect logs from several optimizers on standard benchmarks (and across multiple base LLMs), then transform them into examples where a model learns to map from original user instructions to improved prompts or contexts, optionally using intermediate edits and rationales as additional supervision. I will compare a human-only BPO baseline against variants trained on human \+ synthetic endpoints and on full synthetic trajectories, measuring gains in accuracy, safety, and sample efficiency, and testing generalization to new tasks not seen during data generation. The longer-term goal is to distill the behavior of expensive search-based optimizers into lightweight, deployable prompt rewriters, while rigorously studying how synthetic preference data interacts with human preference datasets in terms of robustness, bias, and alignment.

### **4\. Coursework & technical preparation**

19. List the **most relevant upper-level / grad courses** you’ve taken for your target area (name \+ brief note on any major project).

CMPSC 291A Neural Information Retrieval with Dr. Tao Yang [https://cs.ucsb.edu/education/courses/special-topics-seminars/special-topics-course/cmpsc-291a-neural-information](https://cs.ucsb.edu/education/courses/special-topics-seminars/special-topics-course/cmpsc-291a-neural-information) 

20. Any **math / statistics / theory** background that’s particularly relevant? (e.g., real analysis, probability, linear algebra, optimization, complexity).

21. Technical skills inventory:  
    * Programming languages?  
    * Libraries / frameworks (PyTorch, TensorFlow, MPI, CUDA, etc.)?  
    * Tools/platforms (AWS, Kubernetes, etc.)?  
    * Any specialized hardware experience (GPUs, clusters, embedded devices)?

### **5\. Professional / industry / teaching experience (if relevant)**

22. Do you have any **industry internships or jobs** related to CS?  
    * Where, when, role title?  
    * What did you work on?  
    * Any part of it **research-like** (experiments, prototyping, reading papers)?

23. Any **teaching or mentoring** experience (TA, tutor, mentoring juniors, leading workshops, etc.)?  
    * What did you teach/mentor?  
    * What did you enjoy or learn from it?

Demo presentations @ ECAI-24

Talk and poster @ PAIS-24

For the past two years I’ve given guest talks to Dr. Shapiro’s Game AI class at UCSC. Also for the past year that i’ve been around the WiCS club talking with undergrads. 

I’ve enjoyed giving advice to undergrads looking to investigate LLMs and/or research. It gives me a fresh new perspective on the knowledge level of beginner developers.  

### **6\. Why UCSB CS?**

24. Which **UCSB CS faculty** are you most interested in working with? List a few and, for each: What about their research matches your interests? Any specific papers / projects of theirs that excited you?

My UCSB Masters project was supervised by Professor Xifeng Yan (with Professor Albadi as co-chair) and I would like to continue my PhD with Dr. Yan in a similar direction as my Masters research.

25. Are there specific **labs, institutes, or research groups** at UCSB you want to join?

I would like to join Professor Xifeng Yan’s Lab, as we worked very well together with him being my advisor for my masters project. Dr. Yan’s lab has been focused on the internals of LLM models (adapters) and DSL to create multi-agent systems. I want to bring a new perspective of understanding the prompt side of the LLM perspective. 

Dr. Yan co-invented ADL/MICA, a declarative DSL and runtime for multi-agent chatbots where agents and their prompts are specified in YAML and executed by a multi-agent engine; and my idea of reusing optimizer trajectories as training data maps could map onto *learning better agent prompts, roles, and flows* inside ADL/MICA, instead of hand-tuning YAML specs.

Dr. Yan’s research agenda explicitly spans Foundation Models, Multimodal AI Assistants, and AI for Systems/IoT, my idea of training general-purpose prompt optimizers from synthetic trajectories can be evaluated on lab-typical application domains—e.g., financial forecasting agents, scientific discovery assistants, and IoT or robotics controllers—probing how well LEAP generalizes across the same cross-disciplinary axes his group already works in.

Directional Stimulus Prompting already trains a smaller policy model to emit auxiliary prompts that guide large black-box LLMs; BPO and LEAP extend that idea from “stimulus prompts” to “full prompt rewriting,” meaning I could continue  a core theme in the lab—learned controllers that sit between users and foundation models. [https://arxiv.org/pdf/2302.11520](https://arxiv.org/pdf/2302.11520) 

%% Augment this answer with relevant details from [https://sites.cs.ucsb.edu/\~xyan/](https://sites.cs.ucsb.edu/~xyan/) 

26. Are there **courses or resources** at UCSB that are especially attractive to you?

During UCSB Comp Sci Masters, I’ve come to enjoy grad courses where you are encouraged and incentivized to start research projects. My first research publications started in an undergraduate capstone class research course, so I’ve always appreciated this style of courses. I believe this is the type of environment I’d like to continue learning in.

27. How do you see yourself **fitting into the UCSB CS research community**?

I see myself fitting perfectly into UCSB graduate studies and I am confident of this because of what I learned during my UCSB masters over the last year. I am a familiar face to most of the UCSB computer science professors due to the classes they have taught me and the research project I carried out with their mentorship and guidance. 

### **7\. Future goals**

28. What do you want to do **after** your PhD? Industry R\&D? Startup / entrepreneurial? Government or nonprofit research?

I like building prototypes, developing and testing new algorithms and technologies so becoming a CS research scientist would be my preferred line of work.  After my PhD I hope to have a job in which I can continue research of trustworthy AI and its applications. Rather than just being a researcher in some lab I hope to have a leadership position that allows me to set the research questions and direction. This could be in academia or it could be in industry or at a government or nonprofit. I believe that AI technology can unleash so much new wealth in our economy that our lives will substantially be improved regardless where you work. 

29. How will a **UCSB CS PhD** help you reach those long-term goals?

**UCSB CS PhD** will help me reach this long term goal because leadership jobs in research tend to require having a PhDs.

30. In your ideal world, what kind of problems are you working on in **10 years**?

In 10 years, I hope to work at the intersection of AI and oncology, building systems that make cancer something we can detect earlier, treat more precisely, and possibly prevent altogether. Cancer has shaped my family’s story—both my grandfather and my uncle died from it—and as a blood relative, I live with the knowledge that my mother, my sister, myself, and any future children may face the same risk. That isn’t an abstract motivation for me; it’s a daily reminder of why I care about the real-world consequences of the models we build.

My strengths are in software and AI, and I believe that is exactly where I can have the greatest impact. However, what has become increasingly clear to me is that the main bottleneck in bringing AI into high-stakes domains like oncology is not a lack of clever models for specific diseases, but the fact that current systems are often brittle, opaque, and difficult to trust. If an AI system is going to influence decisions about biopsies, chemotherapy, or clinical trial eligibility, then it must be robust to distribution shifts, make calibrated predictions, handle missing and noisy data, and provide outputs that clinicians can interrogate and rely on.

For that reason, in my PhD I want to focus on foundational questions of reliability, dependability, and robustness in AI: how to quantify and communicate uncertainty, how to detect and correct for spurious correlations, how to design models that fail gracefully, and how to make their reasoning more interpretable to human experts. These questions are domain-agnostic, but they are absolutely critical for oncology and other safety-critical areas. By working on these core challenges now, I will be better positioned to later build cancer-focused systems that are not only accurate in a benchmark sense, but trustworthy enough to be deployed in real clinics.

In other words, I am “skating to where the puck is going,” and I see the most impactful path as first helping to make AI itself more reliable as a technology, and then applying those advances in collaboration with expert clinicians and medical researchers to change outcomes for patients like the people in my family.

### **8\. Additional context (optional, for SOP only if academic)**

31. Are there any **bumps in your academic record** we should briefly explain (one bad semester, gap in studies, changing majors, etc.)?

32. Anything else you think **demonstrates your preparation and aptitude** for grad-level CS research that we haven’t covered?

