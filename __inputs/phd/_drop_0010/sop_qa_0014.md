STATEMENT OF PURPOSE (SOP) ANSWERS

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

22. Any **teaching or mentoring** experience (TA, tutor, mentoring juniors, leading workshops, etc.)?  
    * What did you teach/mentor?  
    * What did you enjoy or learn from it?

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

**NOTE: PROJECTS below are repeated and that is OK**





