---
permalink: /
title: "Jasmine Lesner"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hi! I am a first-year MSc student in the Computer Science Department at the University of California, Santa Barbara.

My research focuses on the intersection of `Human-AI Interaction`, `Interactive AI Systems`, `Educational Technology`. 

**Research Mission:** To make AI systems more accessible and comprehensible to diverse users, particularly learners and educators, by creating intuitive, multimodal interfaces that bridge the gap between complex AI capabilities and everyday user needs. I believe that AI-powered educational tools should be so engaging and natural to use that learning through technology becomes as intuitive as learning from a human teacher.

Feel free to reach out to me at `jlesner [at] ucsb.edu`!

<br/>

<style>
  .project-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: center;
    flex-wrap: wrap;
  }

  /* @media (max-width: 768px) {
    .project-container {
      flex-direction: column;
    }

    .project-image, .project-content {
      max-width: 100%;
    }

    .project-image {
      margin-bottom: 1rem;
    }
  } */

    @media (max-width: 768px) {
      .project-container {
        flex-direction: column;
      }

      .project-image, .project-content {
        max-width: 100%;
      }

      .project-image {
        display: none; /* Hide all images */
      }
    }

</style>

<div class="projects">
  <h1>Projects</h1>

  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center; flex-wrap: wrap;">
    <!-- <div class="project-image" style="flex: 1; max-width: 50%; display: flex; justify-content: center; align-items: center;">
      <img src="images/xai_notif2.png" alt="AIPIF Project" style="width: 70%; height: auto;">
    </div> -->
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <h2>Exploring User Reactions to XAI: Lessons from Contrasting Domains</h2> <p>Examined user interactions with two XAI prototypes to analyze explanation strategies for repetitive and unique AI decision contexts:</p> <ul> <li><b>Moderator Prototype:</b> Standardized visual explanations and actionable feedback to support consistent decision-making in e-commerce moderation.</li> <li><b>Monitor Prototype:</b> Contextual explanations and interactive features to detect and resolve inconsistencies in communications, combining memory augmentation with fact-checking.</li> </ul>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://xai.ackop.com/xai_169.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Paper
        </a>
        <a href="https://xai.ackop.com/xai_169.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-powerpoint" style="margin-right: 0.5rem;"></i>Slides
        </a>
        <a href="https://xai.ackop.com/moderator.html" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Moderator Prototype
        </a>
        <a href="https://xai.ackop.com/monitor.html" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Monitor Prototype
        </a>
      </div>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <img src="images/xai_notif2.png" alt="AIPIF Project" style="width: 100%; height: auto;">
    </div>
  </div>

  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <h2>Semantic Embedding Augmentation of USDA’s Food Nutrient Imputation</h2>
      <p>Developed machine learning models to enhance the USDA National Nutrient Database by accurately predicting missing nutrient values, focusing on a single nutrient for demonstration purposes, integrating:</p>
      <ul>
        <li>Predictive modeling leveraging measured data and food name embeddings</li>
        <li>Evaluation through comparison with USDA imputation methods</li>
      </ul>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://fnana3.ackop.com/fnana0043g.html" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Notebook
        </a>
      </div>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <img src="images/betterfoodgroups.png" alt="Semantic Embedding Augmentation of USDA’s Food Nutrient Imputation" style="width: 100%; height: auto;">
    </div>
  </div>

  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <h2>AI Personalized Interactive Fiction (AIPIF)</h2>
      <p>Led the development of a multimodal AI system that creates personalized interactive stories for young children, integrating:</p>
      <ul>
        <li>Large Language Models for dynamic narrative generation</li>
        <li>Text-to-Image (StableDiffusion XL) for visual storytelling</li>
        <li>Text-to-Speech (Bark) and Music Generation (MusicGen) for immersive audio</li>
      </ul>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://github.com/jlesner/aipif" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-github" style="margin-right: 0.5rem;"></i>GitHub
        </a>
        <a href="https://youtu.be/TaVGem3nFrk" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-youtube" style="margin-right: 0.5rem;"></i>Demo Video
        </a>
        <a href="https://www.ufafu.com/" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Live Demo
        </a>
      </div>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <img src="images/aipif.png" alt="AIPIF Project" style="width: 100%; height: auto;">
    </div>
  </div>

  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <h2>State Machine Visualizer (SMV)</h2>
      <p>Developed a tool to help students better understand complex computational systems by:</p>
      <ul>
        <li>Automatically generating visual representations of state machines</li>
        <li>Creating an intuitive bridge between code and visual understanding</li>
        <li>Supporting computer science education through improved system visualization</li>
      </ul>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://github.com/jlesner/smv2" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-github" style="margin-right: 0.5rem;"></i>GitHub
        </a>
        <a href="https://www.youtube.com/watch?v=IHp0X0J5Di8" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-youtube" style="margin-right: 0.5rem;"></i>Demo Video
        </a>
      </div>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <img src="images/smv4.png" alt="SMV Project" style="width: 100%; height: auto;">
    </div>
  </div>
  
</div>

<!-- Add Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<!-- <section class="gallery" style="padding: 2rem 0;">
   <h2 style="text-align: center; margin-bottom: 2rem;">Gallery</h2>
   
   <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; padding: 0 1rem;">
       <div class="img-container" style="aspect-ratio: 1; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
           <img src="images/image1.jpg" alt="Gallery image 1" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
       </div>
       
       <div class="img-container" style="aspect-ratio: 1; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
           <img src="images/image2.jpg" alt="Gallery image 2" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
       </div>
       
       <div class="img-container" style="aspect-ratio: 1; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
           <img src="images/image3.jpg" alt="Gallery image 3" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
       </div>
       
       <div class="img-container" style="aspect-ratio: 1; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
           <img src="images/image4.jpg" alt="Gallery image 4" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
       </div>
       
       <div class="img-container" style="aspect-ratio: 1; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
           <img src="images/image5.jpg" alt="Gallery image 5" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
       </div>
       
       <div class="img-container" style="aspect-ratio: 1; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
           <img src="images/image6.jpg" alt="Gallery image 6" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
       </div>
   </div>
</section> -->