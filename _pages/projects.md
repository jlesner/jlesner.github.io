---
layout: archive
title: ""
permalink: /projects/
author_profile: true
redirect_from:
  - /portfolio
---
{% include base_path %}

<style>

  body {
      padding: 60px 0 0;
  }

  .author__bio {
      padding-right: 70px;
  }

  .project-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: center;
    flex-wrap: wrap;
  }

    @media (max-width: 768px) {
      .project-container {
        flex-direction: column;
      }

      .project-image, .project-content {
        max-width: 100%;
      }

      .project-image {
        display: none;
      }
    }
</style>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="hapo">HAPO: Hyper-reflection for Automatic Prompt Optimization</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: top; flex-wrap: wrap;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
        An improvement of GEPA (automatic prompt optimization) through "hyper-reflection", enabling compact LLMs to achieve performance closer to frontier models on complex tasks like SQL query equivalence generation and refutation.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://jlesner0.ackop.com/hapo_0023.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Preprint
        </a>
      </div>
      <p>
        Preparing submission for IJCAI-2026 with <a href="https://sites.cs.ucsb.edu/~xyan/" target="_blank">Dr. Xifeng Yan</a>.
      </p>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/hapo_0010.JPG" target="_blank">
        <img src="../images/hapo_0010.JPG" alt="" style="width: 100%; height: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      </a>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="dbdoctor">DBDoctor: LLM-Aided SMT Refutation of SQL Query Equivalence</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: top; flex-wrap: wrap;">
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/dbdoctor_0010.JPG" target="_blank">
        <img src="../images/dbdoctor_0010.JPG" alt="" style="width: 100%; height: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      </a>
    </div>
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
        <!-- A verification framework that combines large language models with SMT solvers to detect semantic bugs in SQL query rewrites. -->
        DBDoctor uses LLMs to propose counterexamples and rewrite queries into SMT-friendly forms, dramatically reducing the rate of "unsupported" query pairs from 100% to 1% and successfully refuting 47% of previously unverifiable cases.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://jlesner0.ackop.com/dbdoctor_cav_0036.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Preprint
        </a>
      </div>
      <p>
        Preparing submission for CAV-2026 with <a href="https://sites.cs.ucsb.edu/~xyan/" target="_blank">Dr. Xifeng Yan</a>.
      </p>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="symbolsight">SymbolSight: Robust Symbols for Retinal Implants</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: top; flex-wrap: wrap;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
        A research project optimizing visual symbol sets for patients with retinal implants. 
        By analyzing confusion matrices over simulated letter recognition using the pulse2percept framework, SymbolSight derives symbol sets that remain distinguishable even under the severe distortions introduced by low-resolution prosthetic vision.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://jlesner0.ackop.com/symbolsight_0034.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Preprint
        </a>
        <a href="https://youtu.be/S6PFpY1Rfho" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-youtube" style="margin-right: 0.5rem;"></i>Video
        </a>
      </div>
      <p>
        Voted #1 out of 16 projects in the graduate Bionic Vision course. Preparing submission for IEEE EMBC-2026 with <a href="https://engineering.ucsb.edu/people/michael-beyeler" target="_blank">Dr. Michael Beyeler</a>.
      </p>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/symbolsight_0010.JPG" target="_blank">
        <img src="../images/symbolsight_0010.JPG" alt="" style="width: 100%; height: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      </a>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="nutrignn">NutriGNN: Food Nutrient Prediction with GNNs</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: top; flex-wrap: wrap;">
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/nutrignn_0010.JPG" target="_blank">
        <img src="../images/nutrignn_0010.JPG" alt="" style="width: 100%; height: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      </a>
    </div>
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
        A graph neural network approach to predicting missing nutrient values in food composition databases. 
        By building a knowledge graph enriched with LLM-derived semantic relations between foods, NutriGNN improves representation learning and prediction quality, especially for low-resource food items with sparse nutritional data.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://jlesner0.ackop.com/nutrignn_0032.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Report
        </a>
      </div>
      <p>
        Developed for a graduate course on Graphs and GNNs with <a href="https://sites.cs.ucsb.edu/~ambuj/" target="_blank">Dr. Ambuj K. Singh</a>.
      </p>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="snipdue">SnipDue: Never Miss Another Deadline</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: top; flex-wrap: wrap;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
        A deadline import tool with near universal support for all the ways to represent a schedule. Our tool uses Claude 3.5 Sonnet and works with Google Calendar, Apple Calendar, Outlook, and any iCal-compatible app.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://devpost.com/software/ssnip" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>DevPost
        </a>
        <a href="https://snipdue.tech/" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Try it!
        </a>
      </div>
        <p>
        Built at <a href="https://sb-hacks-xi.devpost.com/" target="_blank">SBHacks XI</a> with my partner <a href="https://www.linkedin.com/in/samantha-lesner-592aa8211/" target="_blank">Samantha Lesner</a>, our project won the "Best Use of GenAI Award" out of 221 hackathon participants.
        </p>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/snipdue_sale_0010.png" target="_blank">
        <img  src="../images/snipdue_sale_0010.png" alt="" style="width: 100%; height: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      </a>
      <p>SnipDue is live and running 24/7!</p>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1>Explainable AI Requirements: A Comparative Study of Repetitive and Unique Decision Contexts</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: top; flex-wrap: wrap;">
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/xai_notif4.png" target="_blank">
        <img  src="../images/xai_notif4.png" alt="" style="width: 100%; height: auto;">
      </a>
    </div>
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
        We designed and tested two Explainable AI (XAI) prototypes with four groups of participants.
        My partner,
        <a href="https://www.linkedin.com/in/kay-krachenfels/" target="_blank">Kay Krachenfels</a>, created the "Commerce Moderator," while I developed the "Communication Monitor."
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://memoir.ackop.com/index7.html" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Communication Monitor
        </a>
        <a href="https://xai.ackop.com/xai_0021.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Pilot Study Report
        </a>
      </div>
      <!-- <p>
      Deciding on a full study for publication with <a href="https://ml.ucsb.edu/people/faculty/misha-sra" target="_blank">Dr. Misha Sra</a>.
      </p> -->
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1>Zero-Shot Document Ranking Using LLMs: Replication and Improvements</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: top; flex-wrap: wrap;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
      My partner, <a href="https://mehak126.github.io/" >Mehak Dhaliwal</a>, and I conducted a study replicating and enhancing recent advancements in zero-shot document ranking using Large Language Models (LLMs).
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://repllmr.ackop.com/repllmr_0022.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Study Report
        </a>
        <a href="https://repllmr.ackop.com/jbook_a/index.html" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Data Analysis
        </a>
      </div>
      <!-- <p>
      Plan with <a href="https://www.cs.ucsb.edu/people/faculty/tao-yang">Dr. Tao Yang</a> is to prepare for publication at the end of June 2025.
      </p> -->
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/llm_ranking_results_0010.png" target="_blank">
        <img  src="../images/llm_ranking_results_0010.png" alt="" style="width: 100%; height: auto;">
      </a>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1>Embedding Vector Augmentation of USDA's Food Nutrient Imputation</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/betterfoodgroups.png" target="_blank">
        <img src="../images/betterfoodgroups.png" alt="" style="width: 100%; height: auto;">
      </a>
    </div>
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
      For a Statistical Machine Learning
      graduate course, I selected <a href="https://fdc.nal.usda.gov/">USDA's food nutrition dataset</a> and chose to explore whether OpenAI's LLM technology can enhance estimates of food nutrition. This research effort was motivated by personal health interests.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://fnana3.ackop.com/fnana0043g.html" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Data Analysis Study
        </a>
      </div>
      <p>Seeking a food nutrition expert to review and help guide this research further.</p>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="aiptf">AI Personalized <span style="color: darkblue;">Teaching</span> Fiction (AIPTF)</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
        This solo summer project stemmed from my goal to make AIPIF faster and more cost-efficient. Along the way, I developed stories to teach children specific life lessons. Each story includes a quiz at the end to encourage critical thinking and tracks correct and incorrect answers. While AIPTF keeps the original AIPIF interface, I re-implemented the back-end using Javascript Cloudflare functions.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://www.ufafu.com/" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Try it!
        </a>
      </div>
      <p>AIPTF is live and running 24/7!</p>
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/aiptf_0020.png" target="_blank">
        <img src="../images/aiptf_0020.png"  target="_blank" alt="AIPIF Project" style="width: 100%; height: auto;">
      </a>
      TIP: Click on emojis to reveal images.
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="aipif">AI Personalized <span style="color: darkblue;">Interactive</span> Fiction (AIPIF)</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/aipif_0010.png" target="_blank">
        <img src="../images/aipif_0010.png"  target="_blank" alt="AIPIF Project" style="width: 100%; height: auto;">
      </a>
    </div>
    <div class="project-content" style="flex: 1; max-width: 90%;">
      <p>
      AIPIF began
      with three partners in <a href="http://www.isle.org/~dgs/">Dr. Daniel Shapiro</a>'s
      <a href="https://courses.engineering.ucsc.edu/courses/cmpm146">CMPM146: Game AI</a>
      course and with his mentorship, we refined the project and showcased it at
      ECAI-2024 and PAIS-2024.
      </p>
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://youtu.be/TaVGem3nFrk?autoplay=1&fs=1" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-youtube" style="margin-right: 0.5rem;"></i>Video
        </a>
        <a href="https://www.ufafu.com/" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Try it!
        </a>
        <a href="/photos#ecai2024" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Conferences
        </a>
        <a href="https://ebooks.iospress.nl/doi/10.3233/FAIA241074" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Publication
        </a>
      </div>
      <p>New AIPIF stories are disabled to manage costs. All other features are live 24/7.</p>
    </div>
  </div>

  <hr style="height: 5px; background-color: black; border: none;">
  <h1 id="smv">State Machine Visualizer (SMV)</h1>
  <div class="project-container" style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center;">
    <div class="project-content" style="flex: 1; max-width: 90%;">
      This project was advised by <a href="https://users.soe.ucsc.edu/~elkaim/elkaim/Home.html">Dr. Gabriel Elkaim</a>
      and began during my CAHSI/NSF-sponsored undergraduate research internship.
      Dr. Elkaim provided guidance on requirements, while I focused on development and testing.
      <div class="project-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://www.youtube.com/watch?v=IHp0X0J5Di8?autoplay=1&fs=1" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-youtube" style="margin-right: 0.5rem;"></i>Video
        </a>
        <a href="https://github.com/jlesner/smv2" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fab fa-github" style="margin-right: 0.5rem;"></i>GitHub
        </a>
        <a href="https://smv.ackop.com/smv_ieee_ICRA_0054.pdf" target="_blank" style="flex: 1; display: inline-block; padding: 0.5rem; text-align: center; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; white-space: nowrap;">
          <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i>Preprint
        </a>
      </div>
      <!-- <p>
        Preprint pending ICRA-2025 peer review.
      </p> -->
    </div>
    <div class="project-image" style="flex: 1; max-width: 50%;">
      <a href="../images/smv4.png" target="_blank">
        <img src="../images/smv4.png" alt="" style="width: 100%; height: auto;">
      </a>
    </div>
  </div>
  <hr style="height: 5px; background-color: black; border: none;">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
