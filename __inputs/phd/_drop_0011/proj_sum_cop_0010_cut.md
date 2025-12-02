

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
