
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

