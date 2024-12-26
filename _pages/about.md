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

<div class="projects">
  <h2>Recent Projects</h2>

  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem;">
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <img src="images/500x300.png" alt="AIPIF Project" style="width: 100%; height: auto;">
    </div>
    <div class="project-content" style="flex: 1; max-width: 50%;">
      <h3>AI Personalized Interactive Fiction (AIPIF)</h3>
      <p>Led the development of a multimodal AI system that creates personalized interactive stories for young children, integrating:</p>
      <ul>
        <li>Large Language Models for dynamic narrative generation</li>
        <li>Text-to-Image (StableDiffusion XL) for visual storytelling</li>
        <li>Text-to-Speech (Bark) and Music Generation (MusicGen) for immersive audio</li>
      </ul>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
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
  </div>

  <div class="project-container" style="display: flex; gap: 2rem;">
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <img src="images/500x300.png" alt="SMV Project" style="width: 100%; height: auto;">
    </div>
    <div class="project-content" style="flex: 1; max-width: 50%;">
      <h3>State Machine Visualizer (SMV)</h3>
      <p>Developed a tool to help students better understand complex computational systems by:</p>
      <ul>
        <li>Automatically generating visual representations of state machines</li>
        <li>Creating an intuitive bridge between code and visual understanding</li>
        <li>Supporting computer science education through improved system visualization</li>
      </ul>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
        <a href="https://github.com/jlesner/smv2" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-github" style="margin-right: 0.5rem;"></i>GitHub
        </a>
        <a href="https://www.youtube.com/watch?v=IHp0X0J5Di8" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-youtube" style="margin-right: 0.5rem;"></i>Demo Video
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Add Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<section class="gallery" style="padding: 2rem 0;">
    <h2 style="text-align: center; margin-bottom: 2rem;">Gallery</h2>
    
    <div id="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; padding: 0 1rem;">
        <!-- Images will be dynamically inserted here -->
    </div>
</section>

<script>
async function loadGalleryImages() {
    try {
        
        const sampleImages = [
            'images/image1.jpg',
            'images/image2.jpg',
            'images/image3.jpg',
            'images/image4.jpg',
            'images/image5.jpg',
            'images/image6.jpg',
            // Add more image paths as needed
        ];
        
        const galleryGrid = document.getElementById('gallery-grid');
        
        // Create and append image elements for each path
        sampleImages.forEach(imagePath => {
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = `
                aspect-ratio: 1;
                overflow: hidden;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            `;
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Gallery image - ${imagePath.split('/').pop()}`;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            `;
            
            // Add hover effect
            imgContainer.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            imgContainer.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
            
            imgContainer.appendChild(img);
            galleryGrid.appendChild(imgContainer);
        });
    } catch (error) {
        console.error('Error loading gallery images:', error);
    }
}

// Load images when the page loads
document.addEventListener('DOMContentLoaded', loadGalleryImages);
</script>