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


%% LATEST WRITEUP 


# [>>>> TRY IT <<<<<](https://snipdue.tech)

#### **Our Inspiration**  

We’ve all been there: that sinking feeling you’ve forgotten a critical deadline. Managing assignments, projects, and exams for multiple courses can be overwhelming. While calendars and to-do lists help, the process of manually entering every deadline wastes precious time and is prone to errors.  

We wanted to solve this problem. SnipDue was inspired by our shared desire to simplify this tedious task. By letting students "snip" their schedules and sync them to a calendar, we hope to make staying organized easier than ever.  

---

#### **Our Lessons**  

We were amazed by how powerful modern language models like Claude Sonnet 3.5 are at interpreting the wide variety of formats students encounter in their schedules. Working with Claude taught us the importance of clear, iterative communication with the AI. For example, letting it “think aloud” before finalizing results improved accuracy.  

We also learned how crucial it is to provide meaningful feedback to users—such as warning them if their schedule input is unclear or incomplete. These insights will guide us as we improve the app.  

---

#### **Our Design**  

Our web app is mobile-friendly and built for simplicity. The user can easily copy and paste their schedule, sync it with a calendar, and go.  

---

#### **Implementation**
  
SnipDue is hosted on Cloudflare Pages, with serverless functions powered by Cloudflare Workers. These functions make API calls to Anthropic’s `Claude 3.5 Sonnet 2024-10-22` model to parse and understand schedule data.  

The front end uses plain, mobile-friendly HTML to ensure compatibility and ease of use.  

---

#### **Challenges**  

1. **Cloudflare Setup**:  
   Getting our app running on Cloudflare was harder than expected. We initially cloned and modified an unrelated project ([UFAFU](http://ufafu.com), [GitHub link](https://github.com/jlesner/aipif)) to streamline the process before replacing the original code with our own.  

2. **Time Constraints**:  
   Hackathon time limits meant we couldn’t add all the features we envisioned, like support for Apple Calendar subscriptions or handling every possible edge case.  

3. **UI/UX Challenges**:  
   Designing a user-friendly experience takes time. A larger sample of student feedback would have helped refine the interface. Our frontend developer has since banned last-minute design changes—understandably so!  

4. **Technical Limitations**:  
   - Hosting *.ics files for Apple Calendar integration.  
   - Parsing all possible schedule formats flawlessly.  

---

#### **Prior Work**  

This is not the first attempt to solve this problem, but we noticed significant gaps in existing solutions:  
- **Technical Limitations**: Many tools require local installation, specific environments, or support only a few input formats.  
- **User Experience Issues**: Most apps lack calendar visualization, have clunky interfaces, or fail to handle errors gracefully.  
- **Feature Gaps**: Few tools let you selectively import, batch edit, or manually tweak events.  

You can explore similar projects here:  
- [Syllabus-to-Calendar](https://github.com/jjeongin/Syllabus-to-Calendar)  
- [Syllabuddy](https://www.syllabuddy.com/)  
- [Syllabus2Calendar (Devpost)](https://devpost.com/software/syllabus2calendar)  
- [Syllabus to Google Calendar Processor](https://devpost.com/software/syllabus-to-google-calendar-processor)  
- [Syllabus-to-Calendar (RVU5J0)](https://devpost.com/software/syllabus-to-calendar-rvu5j0)  

The best alternative we found was the commercial SaaS app [AgendaHero](https://agendahero.com/). However, it has drawbacks:  
- Hidden subscription pricing after signing up.  
- No simple way to import only due dates.  
- Overwhelming feature set with no manual event adding.  
- Poor error handling when parsing fails.  

---

With SnipDue, we aim to address these shortcomings and provide a solution that’s simple, intuitive, and tailored for students.  
