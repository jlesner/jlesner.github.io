

PROJECT: Guided Understanding & Agreement Rights Detector (GUARD) Prototype
INSTRUCTOR: Mishra Sra Assistant Professor at UCSB
COURSE: The project started in CMPSC 291I Interactive and Real-Time User Experience of AI: To create innovative AI-supported systems that truly benefit end-users in real-life situations, it is crucial to focus on the interactive and real-time user experience of AI. This course is centered around investigating the various aspects of human-AI systems, including interface design, user agency, explainability, ethics, and the human-centered design process involving AI. We will examine these through reading research papers and through the design and prototyping of an AI Task Guidance System. By prioritizing human needs and preferences in the design process, we will learn to successfully develop AI systems that not only enrich our lives but also serve to amplify our abilities.
Writeup: https://www.overleaf.com/project/6732a2bda24c385d65e38049 
My GUARD prototype identifies potential issues like ambiguities, discrepancies, inconsistencies, and mismatched facts across spoken and written communication with a UI design that is tailored for smartphones. 
The goal of this project is to research interpretable interfaces in AI driven applications. 
The hardest part of this project was designing an interface for a complex AI system that could work on a small mobile device screen that was as usable as possible and kept the users cognitive load as low as possible.
If I continued this on this prototype, the next step would be to extend the prototype with adapters to read documents and record conversations and to interface with AI tools to organize and analyze these inputs and offer targeted recommendations. 



\begin{document}

\title{
Understanding XAI Requirements:
A Comparative Study of Repetitive and Unique Decision Contexts
}

\begin{abstract}
This paper examines how explanation requirements vary between repetitive and unique AI decision contexts through an empirical study of two XAI prototypes. We analyze user interactions with an e-commerce moderation system and a communication monitoring assistant, finding that standardized visual explanations benefit routine tasks while adaptive approaches suit context-specific decisions. Our results suggest design patterns for balancing transparency with usability across different usage scenarios. While our small-scale study (n=8) and prototype-based methodology limit generalizability, particularly regarding real-world implementation challenges and long-term user behavior, our findings provide valuable initial insights into context-dependent explanation design. Further research is needed to validate these patterns at scale and address open questions about optimal confidence communication and security-transparency tradeoffs.
\end{abstract}



\ccsdesc[500]{Human-centered computing~User studies}
\ccsdesc[300]{Human-centered computing~Interaction design}
\ccsdesc[300]{Human-centered computing~Empirical studies in HCI}
\ccsdesc[200]{Security and privacy~Usability in security and privacy}
\ccsdesc[200]{Human-centered computing~Interactive systems and tools}



\keywords{Explainable AI, XAI, Human-Computer Interaction, HCI, User Interface Design, Content Moderation, Communication Monitoring, Interface Evaluation, AI Transparency, User Trust, Decision Support Systems, Cognitive Load Theory, Human-AI Collaboration, User Experience Design}

\maketitle

\section{Introduction}

As AI systems become integral to daily life, ensuring effective human-AI collaboration requires addressing two key challenges in AI transparency: delivering consistent explanations for repetitive tasks and providing contextual explanations for unique situations. This research addresses three fundamental questions:

\begin{enumerate}
\item How do explanation requirements differ between repetitive and unique decision contexts in AI systems?
\item What design patterns most effectively support user understanding and trust across these different usage contexts?
\item How can AI systems balance transparency with cognitive load while maintaining user engagement?
\end{enumerate}


% LENS (LENS: Listing Explanation & Notification System)
% Uses a visual metaphor—helping sellers “see” why something was flagged, aligning nicely with your segmentation and highlighting UI.

% GUARD – Guided Understanding & Agreement Rights Detector
% Vibe: Suggests protection and vigilance; good for emphasizing risk alerts and the color-coded severity model in your UI.

This study investigates these questions through two complementary applications of XAI: 
\textbf{Listing Explanation \& Notification System (LENS)} for e-commerce platforms and 
\textbf{Guided Understanding \& Agreement Rights Detector (GUARD)} for communication monitoring, memory augmentation and misinformation detection. These applications represent \textbf{two distinct scenarios}: (1) repetitive decision-making requiring consistent explanations, and (2) one-time events needing personalized, contextual explanations.

Our \textbf{first XAI prototype} called LENS%
%
\footnote{LENS \cite{emp_2024} \href{https://xai.ackop.com/moderator.html}{https://xai.ackop.com/moderator.html}}%
%
addresses the challenge of listing moderation on e-commerce platforms. Platforms must ensure marketplace integrity by identifying and removing prohibited items while providing actionable feedback to sellers. Success depends on standardized yet detailed explanations that guide compliance. Effective systems must flag problematic listings accurately and communicate their reasoning clearly to foster seller understanding and compliance.

Our \textbf{second XAI prototype} called GUARD%
%
\footnote{GUARD \cite{cmp_2024} \href{https://xai.ackop.com/monitor.html}{https://xai.ackop.com/monitor.html}}
%
combines memory augmentation with misinformation detection in an AI assistant that monitors communications — such as conversations, emails, and documents — for factual inconsistencies or errors. While memory aids and fact-checking tools are well-studied separately, their integration introduces unique opportunities. Memory systems enhance recall but may propagate misunderstandings, while fact-checking tools verify information but often lack personal context. Our integrated approach addresses these limitations, helping users detect misunderstandings, errors, or dishonesty in communication. Cognitive Load Theory underscores the challenges of recalling details in information-rich environments, where human working memory struggles \cite{cowan2010magical}. The assistant must offer timely, relevant interventions while minimizing cognitive overload.

This work examines how recurring and one-time decision patterns shape explanation strategies. Although both scenarios highlight explainability’s role in fostering user trust and effective collaboration, they differ in requirements. E-commerce moderation calls for standardized, scalable explanations to ensure consistency across cases. In contrast, communication monitoring requires highly contextual explanations that combine personal history with real-time fact-checking. By exploring these contrasting cases, we aim to advance XAI frameworks that adapt to varied usage patterns while addressing shared challenges: balancing transparency with usability and maintaining user engagement through clear, actionable explanations.


% \section{Contributions}


% This paper makes three contributions to the study of explainable AI interfaces:

% \begin{enumerate}
%     \item We present initial evidence that explanation requirements differ between repetitive and unique decision contexts, drawn from user evaluations of two prototype interfaces.
    
%     \item We identify specific design patterns that show promise for different usage scenarios:
%     \begin{itemize}
%         \item Standardized visual explanations with clear action paths for routine decisions
%         \item Progressive disclosure with contextual evidence for unique situations
%     \end{itemize}
    
%     \item We document preliminary challenges in explanation design across different contexts:
%     \begin{itemize}
%         \item Balancing detail with cognitive load
%         \item Communicating AI confidence effectively
%         \item Managing privacy concerns in personal communications
%     \end{itemize}
% \end{enumerate}

% While our small-scale study cannot make definitive claims, these findings suggest directions for future research in context-aware explainable AI design.


\section{Related Work}

Research integrating memory augmentation with misinformation detection is scarce. However, prior work in explainable AI, content moderation, memory assistance, and misinformation detection provides foundational insights. We build on these domains to design interfaces that make AI decision-making transparent and actionable across various contexts.

\textbf{Explainable AI}: Effective explanations must balance clarity and utility \cite{miller2019explanation}. While model-agnostic methods offer broad applicability \cite{ribeiro2016should}, the optimal approach depends on context and decision frequency. 
Recent advances, such as Chen et al.'s XplainLLM dataset and framework \cite{chen2023xplainllm}, leverage knowledge graphs and reasoning elements to generate grounded explanations. 
Inspired by such developments, we tailor explanation strategies to specific usage patterns in our dual-prototype approach.

Engaging users with AI explanations remains a challenge. Dual process theory highlights the tension between fast, intuitive `System 1' thinking and deliberate, analytical `System 2' thinking \cite{kahneman2002maps}. Structured interventions can activate System 2 processes, improving understanding \cite{lambe2016dual}. Our UI designs combine intuitive workflows with prompts for deeper analysis, using visual cues to encourage reflection on AI outputs.

\textbf{Content Moderation}: While explainability research in e-commerce is limited, studies in social media moderation offer some insights:
\begin{itemize}
    \item 42\% of Reddit users were unaware of post removals until surveyed, but explanations improved perceived fairness \cite{reddit_reactions}.
    \item Moderation messages with AI explanations enhanced fairness perceptions, though human explanations were preferred \cite{moderation_frustration}.
    \item Moderator tools should emphasize rapid reclassification of false AI flags \cite{design_XAI_moderation}.
\end{itemize}

Content moderation highlights the value of structured explanations for systematic feedback \cite{amershi2019guidelines} and the need for dynamic, trust-preserving explanations in real-time decisions \cite{liao2022designing}. Frameworks categorizing explainability by user needs \cite{arya2019one, google_pair_programming_guidebook} inform our e-commerce moderation prototype, which uses standardized visual explanations for repetitive tasks. Meanwhile, our communication monitor incorporates dynamic explanations for contextual decisions.

\textbf{Memory Augmentation and Misinformation Detection}: Advances in large language models support conversational memory recall, aiding decision-making for users under cognitive load, including older adults \cite{Memoro, MemPal}. Building on these capabilities, our communication monitoring prototype addresses a critical gap: verifying information accuracy across conversations and documents.


While automated misinformation detection systems show promise, research has highlighted risks of human over-reliance on these tools, suggesting the need for transparent and educational approaches that empower rather than replace human judgment \cite{nguyen2018believe}.
% TODO above convey the idea that misinformation detection models are good, but its important to consider how humans can overrely on these systems and that's what \cite{nguyen2018believe} addresses

By synthesizing memory augmentation and misinformation detection, we design an interface that integrates recall assistance with accuracy validation. This integration allows our communication monitoring prototype to move beyond isolated memory support or fact-checking. It offers a unified solution to maintain information integrity across diverse digital interactions, addressing the growing complexity of modern communication.


\section{E-Commerce Moderation Prototype}

\begin{figure}[h!]
    \centering
    % \includegraphics[width=0.8\textwidth] 
    \includegraphics[width=0.45\textwidth] 
    {img/moderation-dashboard/default-screen.png}
    \caption{E-Commerce Seller UI shows their listings as a grid of cards which sellers are able to scroll up and down. Listings that have been flagged are colored red and have a red triangle which is an alert action button.}
    \label{fig:moderation_layout}
\end{figure}

\begin{figure*}[p]
    \centering
    \includegraphics[width=\textwidth] 
    {img/moderation-dashboard/desk-flow.png}
    \caption{UI flow for notify $\rightarrow$ explain $\rightarrow$ adjust or appeal flow, where the model has incorrectly flagged a listing. In this case, the user is \textit{notified} by the alert icon, and clicks on it to see that their listing has been (incorrectly) flagged as an image-text mismatch. The pop-ups \textit{explain} what the mismatch is, highlighting/segmenting parts of the image and text that the AI thinks do not align. The user \textit{appeals} by clicking ``unflag and post'', following prompts to submit the petition.}
    \label{fig:sample_flow}
\end{figure*}

\begin{figure*}[p]
    \centering
    \includegraphics[width=\textwidth] 
    {img/moderation-dashboard/other-flows.png}
    \caption{Two other e-commerce moderation examples. In both cases the model has correctly identified listings to be flagged. The user has two options for each; they can petition to unflag, or adjust price (shoes) or view all prohibited items (e-cigarettes).}
    \label{fig:other_flows}
\end{figure*}


For regulatory compliance, fraud prevention and liability reasons online marketplaces require their listings follow (often a long list of) specific rules.
%
According to these rules a listing may be flagged for one or more different reasons. This can leave sellers frustrated struggling to understand what happened and what actions they can take. Our UI prototype demonstrates explanations for three such reasons:
\begin{enumerate}
\item The item is prohibited from being sold on the site
\item Mismatch between listing text and listing images
\item The item price deviates too much from the norm
\end{enumerate}

Each flagged listing follows a similar review process, in which a user views explanations for the listing being flagged and then is offered actions to take.  Listings that are flagged are colored red, and a red triangle alert button is placed at the corner of the image, easily noticeable, but non-intrusive. 
%
For each flagged listing the UI flow (Figure \ref{fig:sample_flow} and Figure \ref{fig:other_flows}) follows three steps: 

\textbf{Step 1: Notify} The user sees the alert icon/button in the corner of the listing, and the listing is colored red.

\textbf{Step 2: Explain} The interface informs the user of why the item was flagged. Contextual visual elements are used:
\begin{itemize}
    \item \textit{Price mismatch/deviation:} The popup displays a graph showing the average prices of similar items. The mismatch in price will be highlighted on the listing.
    \item \textit{Image-text mismatch:} The mismatched portion of the image is highlighted (via segmentation) and the mismatched portion of the text is highlighted. 
    \item \textit{Prohibited item:} The mismatched portion(s) of the image and/or text are highlighted and/or segmented. 
\end{itemize}

\textbf{Step 3: Adjust or Appeal} The user now has the opportunity to take action. In each case, the user has the option to click a button labeled “unflag and post,” which allows them to appeal the flagging decision. The context specific courses of action they can take are:
\begin{itemize}
    \item \textit{Price mismatch/deviation:} adjust the list price of their item.
    \item \textit{Image-text mismatch:} change the listing text or image to remove the mismatch.
    \item \textit{Prohibited item:} view the list of prohibited items. The prohibited item detected will be highlighted on the list.
\end{itemize}

\subsection{Promotion of Analytical Thinking}

The e-commerce moderation design encourages analytical thinking through the following elements:

\begin{enumerate}
    \item \textbf{Progressive Information Disclosure}: The three-step flow 
    (notify $\rightarrow$ explain $\rightarrow$ act) presents details incrementally, 
    prompting users to process information step-by-step.

    \item \textbf{Visual Evidence Presentation}: 
    \begin{itemize}
        \item Price graphs show market distributions, guiding sellers to analyze pricing strategies.
        \item Image segmentation highlights mismatched elements, encouraging careful comparison.
        \item Prohibited item indicators, paired with a comprehensive list, clarify policy context.
    \end{itemize}

    \item \textbf{Interactive Decision Points}: Users actively engage through:
    \begin{itemize}
        \item Explicit choices between adjustment and appeal options.
        \item Evidence review before decision-making.
        \item A structured appeal process requiring justification.
    \end{itemize}

    \item \textbf{Contextual Learning}: When viewing prohibited items, the system highlights specific violations alongside the full policy, helping users understand rules through concrete examples.
\end{enumerate}

Together, these elements transform moderation into an interactive learning experience, fostering understanding of marketplace policies and listing best practices.





\section{Communication Monitoring Prototype}

AI-powered communication monitoring identifies potential issues like ambiguities, discrepancies, inconsistencies, and mismatched facts across spoken and written communication. While some memory augmentation tools require specialized devices \cite{Memoro, MemPal}, our UI design (Figures \ref{fig:push_notifiaction} and \ref{fig:core_feature_screens}) is tailored for smartphones. 

\begin{figure}[ht]
    \centering
    \includegraphics[width=0.8\linewidth]{img/factminder/push_notification.png}
    \caption{Users receive notifications on their smartphones, leveraging familiar mobile alerts to communicate detected inconsistencies non-intrusively.}
    \label{fig:push_notifiaction}
\end{figure}

\begin{figure*}[ht]
    \centering
    \includegraphics[width=\textwidth]{img/factminder/core_screens.png}
    \caption{Communication monitoring nav-bar includes: 
    (a) \textit{Documents} for managing personal files, 
    (b) \textit{Notifications} for reviewing detected issues,
    (c) \textit{Recording} for manual audio monitoring control,
    (d) \textit{Settings} for customization, and
    (e) \textit{Information} for user education.}
    \label{fig:core_feature_screens}
\end{figure*}



\subsection{Nav-bar Sections}

The footer nav-bar has five main sections: 

\begin{enumerate}
    \item \textbf{Documents} are used by the assistant during analysis. The UI supports uploading documents, connecting storage accounts (e.g., Google Drive), searching, tracking recent changes, and ensuring important data is available for contextual alerts.

    \item \textbf{Notifications} are color-coded by severity: 
    \begin{itemize}
        \item \textit{Red} for high-risk alerts (e.g., medical or financial issues).
        \item \textit{Orange} for moderate risks (e.g., schedule conflicts).
        \item \textit{Yellow} for low-risk issues.
    \end{itemize}

    \item \textbf{Recording} gives users control over what is recorded and analyzed. This feature accommodates those who prefer manual monitoring or want to temporarily disable it.

    \item \textbf{Settings} allows users to adjust detection thresholds, manage app permissions, and configure features like internet-based fact-checking. These controls emphasize user privacy and autonomy.

    \item \textbf{Information} explains how the assistant works, highlights secure data storage practices, and outlines alert categories. Clear communication in this section builds trust.
\end{enumerate}






\subsection{Notification Features and Tabs}

Notifications combine text with contextually relevant emojis (e.g., a house emoji for lease-related alerts). Users can sort notifications by recency, importance, or confidence level.

Detailed explanations are accessible through the Notifications view, where users can review issues via notification cards. Tapping `Learn More' provides in-depth insights and guidance for resolving inconsistencies, as shown in Figure \ref{fig:explaination_tabs}. This process moves through three stages, implemented as tabs:

\begin{enumerate}
   \item \textbf{Overview Tab}. This tab summarizes the detected issue, confidence level, and supporting evidence. Problematic statements are highlighted in red, and contrasting evidence from verified documents is shown in green (e.g., highlighting a lease clause permitting backyard access that contradicts the landlady's claim). This transparent design helps users quickly understand the issue.
   
   \item \textbf{Discuss Tab}. This tab uses an interactive chatbot interface to explain the detection process, explore potential risks, and clarify confidence levels. Users can ask questions or use suggested prompts. The chatbot provides detailed responses tailored to each scenario, as illustrated in Figure \ref{fig:discuss_expanded}. 
   
   \item \textbf{Resolve Tab}. This tab focuses on actionable solutions. It suggests AI-generated resolutions (e.g., contacting relevant parties via default apps or addressing discrepancies in healthcare or financial records), allows users to report false positives to improve system accuracy, and enables custom resolution paths. These options personalize the user experience while improving future recommendations.
\end{enumerate}


\begin{figure}[ht]
    \centering
    \begin{tikzpicture}[
        node distance = .4cm,
        box/.style = {rectangle, draw, rounded corners, minimum width=4cm, minimum height=0.6cm},
        arrow/.style = {->, >=stealth, thick},
        phase/.style = {rectangle, draw, dashed, inner sep=10pt}
    ]
    
    % Main flow
    \node[box] (A) {Participant Recruitment};
    \node[box, below=of A] (B) {Assignment to Interface};
    \node[box, below=of B] (C) {Pre-study Briefing};
    \node[box, below=of C] (D) {Guided Interaction Phase};
    \node[box, below=of D] (E) {Retrospective Interview};
    \node[box, below=of E] (F) {Thematic Analysis};
    
    % Draw arrows for main flow
    \draw[arrow] (A) -- (B);
    \draw[arrow] (B) -- (C);
    \draw[arrow] (C) -- (D);
    \draw[arrow] (D) -- (E);
    \draw[arrow] (E) -- (F);
    
    \end{tikzpicture}
    \caption{User Study Methodology}
    \label{fig:methodology}
\end{figure}



\subsection{Promotion of Analytical Thinking}

The communication monitor design employs several elements to encourage analytical thinking and deeper user engagement:

\begin{enumerate}
 \item \textbf{Progressive Information Architecture}: The three-tab system (Overview $\rightarrow$ Discuss $\rightarrow$ Resolve) guides users through increasingly detailed analysis levels, promoting systematic evaluation of detected inconsistencies. The multimodal approach enhances comprehension through Dual Coding Theory \cite{sadoski2004dual}, using emojis selected by LLMs for context-appropriate symbolism \cite{zhou2024emojisdecodedleveragingchatgpt}.

 \item \textbf{Interactive Evidence Review}: Users actively engage with supporting documentation through color-coded highlights and linked references, encouraging critical comparison of contradictory information. Confidence scores use color indicators (green for high, yellow for low), progress bars, and concise descriptions, aligning with best practices to prevent AI overreliance \cite{lubrano2023simpleefficientconfidencescore, Zhang_2020}.

 \item \textbf{Guided Inquiry Interface}: The Discuss tab's chatbot uses structured prompts and follow-up questions to promote deeper analysis of detected issues, their implications, and confidence assessments. This draws on research about AI conversational interfaces promoting reflective thinking \cite{Vasconcelos_2023}.

 \item \textbf{Action-Oriented Resolution}: The Resolve tab requires users to evaluate and select appropriate responses, transforming passive consumption into active decision-making. These structured interactions help manage cognitive load while maintaining engagement.
\end{enumerate}

% These elements work together to transform potential information overload into systematic analytical engagement, supporting both quick understanding and thorough investigation when needed.


\begin{figure*}[ht]
    \centering
    \includegraphics[width=.85\textwidth]{img/factminder/explaination_tabs.png}
    % \caption{Three-tab notification interface for a lease inconsistency: (a) Overview tab showing detection summary, confidence, and evidence, (b) Discuss tab with chatbot for exploring detection details, and (c) Resolve tab offering solutions.}
    \caption{A lease agreement contradiction detected with 93\% confidence, showing tabs for (a) Overview (detection details), (b) Discuss (chatbot interaction), and (c) Resolve (proposed solutions).}
    \label{fig:explaination_tabs}
\end{figure*}



\begin{figure*}[ht]
    \centering
    \includegraphics[width=.85\textwidth]{img/factminder/discuss_expanded.png}
    % \caption{Example chatbot interactions about a lease inconsistency: (a) Detection explanation, (b) Evidence collection process, (c) Risks associated with backyard usage, and (d) Confidence justification. These guided conversations deepen user understanding.}
    \caption{Key stages of lease inconsistency analysis: issue identification from phone call, examination of lease agreement evidence, assessment of potential tenant risks, and explanation of high confidence (93\%) based on clear lease terms.}
    \label{fig:discuss_expanded}
\end{figure*}






\section{User Study Methodology}


We conducted a qualitative study (Figure \ref{fig:methodology}) with eight participants (university students, ages 18–22)%
% recruited via university peer networks
. This sample size was chosen as appropriate for our preliminary investigation, allowing for detailed qualitative analysis while gathering initial insights to inform future prototype iterations. The limited scale enabled in-depth interviews and thorough analysis of user interactions, with plans to expand to a larger participant pool in subsequent studies.

Participants were evenly split: four computer science (CS) majors with AI experience and four non-CS majors with limited AI exposure. This balance allowed us to assess how varying AI literacy affects understanding and trust in explainable interfaces.

Using a between-subjects design, participants evaluated one interface: two CS and two non-CS users tested the e-commerce moderation prototype, while the same split applied to the communication monitoring prototype.

    
\textbf{E-commerce Moderation Tasks:}
\begin{enumerate}
    \item Review a listing flagged for image-text mismatch: Figure \ref{fig:sample_flow} showing desk photo with incorrect description.
    \item Evaluate a price mismatch case: top of Figure \ref{fig:other_flows} showing shoes priced significantly above market.
    \item Assess a prohibited item flag: bottom of Figure \ref{fig:other_flows} showing e-cigarette listing.
\end{enumerate}

\textbf{Communication Monitor Tasks:}
\begin{enumerate}
    \item Analyze a lease agreement contradiction: Figures \ref{fig:explaination_tabs} and \ref{fig:discuss_expanded} showing backyard access dispute.
    \item Review a medical information discrepancy: Figures \ref{fig:health_explaination} and \ref{fig:health_discuss_expanded} showing conflicting treatment advice.
    \item Evaluate a social inconsistency: Figures \ref{fig:sushi_explaination} and \ref{fig:sushi_discuss_expanded} showing conflicting food preferences.
\end{enumerate}
    
A retrospective interview collected feedback on participants' experiences, understanding of AI explanations, and improvement suggestions. Participants also rated explanation effectiveness on Likert scales, focusing on understanding the AI's decision-making and trust in its explanations (Appendices \ref{sec:scenario1_interview}, \ref{sec:scenario2_interview}).

We focused our analysis on how the explanations affected comprehension and trust metrics, with particular attention to differences between CS and non-CS participants' responses.

\section{User Study Results}

Table \ref{tab:study-results} shows how users rated our prototypes on  ``Understanding'' and ``Trust''.
%
For the e-commerce prototype, while understanding was uniformly high (5/5) across both groups, CS participants showed more skepticism in their trust ratings (3-4/5) compared to non-CS participants (4-5/5) suggesting that technical expertise can lead to more critical evaluation of AI systems.
%
In the communication monitoring prototype, CS participants demonstrated higher understanding (4-5/5) but lower trust (2-3/5) compared to non-CS participants' more varied understanding (3-5/5) and trust (3-5/5) ratings. CS participants cited specific technical concerns about privacy and verification mechanisms, while non-CS participants focused more on practical utility.

\begin{table}[htbp]
\centering
\caption{System Understanding and Trust Ratings (Likert 1-5 Scale) Across CS and Non-CS Major Participants}
\label{tab:study-results}
\begin{tabular}{llcc}
\toprule
\textbf{Prototype} & \textbf{Participant} & \textbf{System} & \textbf{Trust in} \\
 & \textbf{(CS/non-CS)} & \textbf{Understanding} & \textbf{System} \\
\midrule
\multirow{4}{*}{\begin{tabular}[c]{@{}l@{}}E-Commerce\\Moderation\\Prototype\end{tabular}} 
 & P1 (non-CS) & 5 & 4 \\
 & P2 (non-CS) & 5 & 5 \\
 & P3 (CS) & 5 & 3 \\
 & P4 (CS) & 5 & 4 \\
\midrule
\multirow{4}{*}{\begin{tabular}[c]{@{}l@{}}Communication\\Monitoring\\Prototype\end{tabular}} 
 & P5 (non-CS) & 3 & 5 \\
 & P6 (non-CS) & 5 & 3 \\
 & P7 (CS) & 4 & 3 \\
 & P8 (CS) & 5 & 2 \\
\bottomrule
\end{tabular}
\end{table}


\subsection{E-Commerce Moderation}

The key themes from user feedback are shown in Table \ref{tab:ecommerce-themes}.


\begin{table*}[htbp]
\centering
\caption{Key Themes from E-Commerce Moderation Feedback}
\label{tab:ecommerce-themes}
\begin{tabular}{p{0.3\textwidth}p{0.6\textwidth}}
\toprule
\textbf{Theme} & \textbf{Representative Participant Comments} \\
\midrule
Visual Explanations & ``Liked the graph showing price distribution'' (P3) \\
                   & ``Highlighting prohibited items on the list was helpful'' (P3) \\
\midrule
Actionable Feedback & ``Clear options to adjust or appeal'' (P2) \\
                   & ``Easy to understand what needed to be fixed'' (P1) \\
\midrule
Areas for Improvement & ``Would like to see what items AI detected in images'' (P1) \\
                     & ``Price mismatch warnings felt unnecessary'' (P4) \\
\bottomrule
\end{tabular}
\end{table*}


\begin{figure}[htbp]
    \includegraphics[width=0.5\textwidth]{img/moderation-dashboard/fairness-transparency.png}
    \caption{Perception of fairness and transparency of e-commerce moderation explanations.}
    \label{fig:fairness_transparency}
\end{figure}


\textbf{Understanding and Trust:} 
As shown in Table \ref{tab:study-results} participants have relatively high trust in the e-commerce moderation explanations, responding with at least a 3/5 or above. Additionally, participants indicated a strong understanding and rated this a 5/5. 

\textbf{Fairness and Transparency:}
Results are displayed in Figure \ref{fig:fairness_transparency}. In general, participants felt at least neutral about the statement that each type of scenario explanation was neutrally fair and transparent (we had no responses for somewhat disagree or strongly agree here). 

In the image-text mismatch scenarios, participants generally agreed with explanations being fair and transparent. In the price mismatch scenario, both P1 and P2 strongly agreed with this statement. P4 was neutral, but P3 participant strongly agreed and commented they \textit{liked the graph and distribution of the price in the shoes listing}. All participants strongly agreed that the prohibited item explanation was fair and transparent, with P4 saying that they \textit{``liked the warning about prohibited items''} and P3 saying that they \textit{``liked the e-cigarette pop-up that highlighted which item it was on the list that was prohibited.''}

\textbf{Frustration:}
For each scenario, participants were asked to rate agreement/disagreement with the phrase ``The pop-ups for [X] detection were frustrating.''  
where [X] was one of ``image detection mismatches'', ``price detection mismatches'' or ``prohibited item detection''.
%
During surveys, we realized that this question may not have been worded clearly as participants interpreted this differently. However, we have a few interesting remarks. P4, who indicated neutral agreement towards price mismatch fairness and transparency, also gave strong agreement towards this scenario's pop-ups being frustrating, commenting: \textit{``price mismatch warning didn't feel necessary.''} For image-text mismatch, P1 said they ``somewhat agreed'' with the pop-ups being frustrating, and remarked that they would have liked to \textit{``see alternatives for what the computer thought the detected image was or see other detected items in the image.''}



\subsection{Communication Monitoring}

The key themes from user feedback are shown in Table \ref{tab:comm-themes}.

\begin{table*}[htbp]
\centering
\caption{Key Themes from Communication Monitoring Feedback}
\label{tab:comm-themes}
\begin{tabular}{p{0.3\textwidth}p{0.6\textwidth}}
\toprule
\textbf{Theme} & \textbf{Representative Participant Comments} \\
\midrule
Trust Factors & ``Trust high for factual checks, lower for interpretations'' (P5) \\
             & ``Need more explanation of confidence scores'' (P6) \\
\midrule
Privacy Concerns & ``Want control over what gets recorded'' (P8) \\
                & ``Unclear who has access to conversation data'' (P6) \\
\midrule
Interface Design & ``Color coding simplified understanding'' (P7) \\
                & ``Text explanations could be overwhelming'' (P7) \\
\midrule
Use Cases & ``Useful for verifying presentation accuracy'' (P6) \\
         & ``Concerns about challenging expert knowledge'' (P7) \\
\bottomrule
\end{tabular}
\end{table*}

\textbf{Trust Dynamics and Verification:}
Participants’ trust in the system varied depending on the type of inconsistency it flagged. Factual inconsistencies were trusted more than subjective interpretations. As P5 stated, \textit{``If it is based on anything factual, I would trust it very highly. If it comes to interpreting what someone means...I would give it a three.''} Users also emphasized the importance of transparent confidence metrics, preferring simplified indicators over precise percentages. P6 asked, \textit{``What makes it 92\% not 100\%?''} while P7 expressed the need for verifiable confidence, saying, \textit{``I’d probably want some stats to verify...the goodness of the measure.''}

Interestingly, all participants did not realize that the highlights on evidence were not reflective of the AI’s attention mechanisms but were designed to help users quickly spot inconsistencies. Despite this, the highlights were universally appreciated for their utility in guiding the user's attention. As P7 noted, \textit{``The red highlights showed me exactly what to focus on...it helped me see the contradiction clearly.''} This misunderstanding did not appear to undermine user trust in the system.

\textbf{Privacy and Control Preferences:}
Participants strongly preferred opt-in controls and manual recording options, valuing agency over when and how the system monitors conversations. P8 noted, \textit{``I probably wouldn't let it quit conversation monitor...I'd probably do the recording myself.''} There was also concern about data handling, with users wanting greater transparency regarding who can access their data and how it is used. P6 summarized this sentiment, saying, \textit{``I don’t think I would just carry this around and be like, sure, listen to all of my conversations.''}

\textbf{Interface and User Experience:}
The system’s use of color coding for risk levels was well-received, as it simplified comprehension, though text-heavy explanations were criticized for being overwhelming. P7 remarked, \textit{``The green to the red to green is nice...there's a lot of text here and that really simplifies it.''} Initial difficulties understanding the help sections improved after hands-on interaction, with P6 observing, \textit{``While I didn't understand the explanations in the info tab, once I was exposed to the notifications...I understood what it meant.''}

\textbf{Use Case Applications:}
Users identified value in professional and academic settings, particularly for verifying accuracy in presentations and documents. P6 suggested, \textit{``If I was doing a presentation and I uploaded all of my references...I'd want to know if anything I'm saying is contradicted in a reference.''} However, caution was expressed about the system challenging domain expertise. As P7 explained, \textit{``This approaches like this territory where you're challenging someone who has a few years of experience in this field.''}





\section{Discussion}

We analyzed how explanation designs in AI systems enhance user understanding, trust, and satisfaction, informing future XAI development. Our findings align with and extend prior work on explainable AI interfaces \cite{miller2019explanation, amershi2019guidelines}, while addressing our core research questions about explanation requirements across contexts, effective design patterns, and balancing transparency with cognitive load.

For e-commerce moderation, our first research question revealed that repetitive tasks benefit from structured explanations that effectively clarify flagged items and outline corrective actions. Visual segmentation, particularly for prohibited items, improved comprehension, supporting research on the value of visual explanations in AI systems \cite{ribeiro2016should}. Graphs highlighting price deviations demonstrated the effectiveness of multimodal elements for nuanced decisions, consistent with findings on dual coding theory \cite{sadoski2004dual}. However, participants expressed frustration with explanations lacking sufficient context for price mismatches, echoing challenges identified in social media moderation research \cite{reddit_reactions, moderation_frustration}. This highlights the need for user-friendly, data-grounded rationales.

For communication monitoring, addressing our second research question revealed that design patterns must prioritize simplicity and clarity in unique decision contexts. Participants preferred intuitive confidence metrics over precise percentages, aligning with research on effective confidence visualization \cite{lubrano2023simpleefficientconfidencescore, Zhang_2020}. Highlighted inconsistencies effectively guided users, though some misinterpreted them as representing AI attention mechanisms. This finding suggests opportunities to leverage `System 2' analytical thinking through structured visual cues \cite{kahneman2002maps, lambe2016dual}.

Regarding our third research question on cognitive load, our results demonstrate that effective explanations must balance detail with accessibility. The highlights significantly aided comprehension despite misinterpretation, emphasizing the importance of designs that communicate complex processes without overwhelming users. This validates our approach of progressive disclosure and visual anchoring as methods to manage cognitive load while maintaining engagement.

\subsection{Implications for Practitioners}

Our findings suggest several practical recommendations for XAI interface design:

1. \textbf{Progressive Disclosure}: Layer explanations to prevent cognitive overload \cite{amershi2019guidelines}. Start with high-level summaries and allow users to drill deeper as needed.

2. \textbf{Visual Anchoring}: Use consistent visual elements (highlighting, color-coding) to draw attention to key information. This aligns with research showing improved comprehension through multimodal presentation \cite{sadoski2004dual}.

3. \textbf{Confidence Communication}: Present certainty levels through simple visual indicators rather than just precise percentages, following best practices in uncertainty visualization \cite{lubrano2023simpleefficientconfidencescore}.

4. \textbf{Interactive Controls}: Provide mechanisms for users to adjust explanation depth and verify AI decisions, supporting findings on the importance of user agency in XAI systems \cite{liao2022designing}.

These guidelines particularly benefit developers implementing explainable AI in production systems, where balancing transparency with usability is crucial for adoption.


\subsection{Key Lessons}

Our user study reinforces three key lessons for explainable AI design:

\begin{enumerate}

   \item \textbf{Context-Aware Explanations}: Effective explanations align with task frequency. Structured feedback works well for repetitive tasks, while personalized explanations suit unique, context-specific decisions.
   
   \item \textbf{User Agency}: Participants valued mechanisms to act on explanations, such as ``adjust'' or ``appeal'' options in the e-commerce system and interactive resolution tabs in the communication monitor. Allowing users to control their engagement with explanations fosters trust and autonomy.
   
   \item \textbf{Transparency and Usability}: Transparent systems build trust but must avoid overwhelming users with excessive detail. Combining confidence scoring with visual aids, like color-coded indicators, effectively communicates certainty. Adapting explanation depth based on user engagement balances clarity with simplicity.
   
\end{enumerate}


\subsection{Ethical Considerations}

Our prototypes aim to adhere to four key principles:

\textbf{Privacy}:  In e-commerce, it’s crucial to anonymize sensitive data to protect sellers’ competitive information. For communication monitoring, privacy is safeguarded through strong speaker verification, clear consent mechanisms, and transparency about recorded data. Systems must also tackle risks like altered memories from selective reinforcement or falsified recordings. Tools such as audio replays can aid this effort, but generative AI adds challenges by enabling convincing fake recordings.

\textbf{Bias and Fairness}: E-commerce moderation must avoid reinforcing marketplace biases by auditing explanation patterns across seller demographics. Communication monitoring should account for cultural differences to ensure fair flagging and scoring. Systems must also address risks of altered recollections from selective reinforcement or faked recordings. Features like audio replays can help, but generative AI complicates this by enabling realistic but falsified recordings.

\textbf{Limitations of Explanations}: Systems must communicate the limits of their explanations for example by indicating AI model confidence. In e-commerce moderation, users should be cautioned against over-relying on explanations, which cannot fully represent the underlying moderation processes.

\textbf{Balanced Adaptability}: Systems should adapt to user behavior, such as frequent dismissal of explanations, by adjusting explanation depth. Effective explanations must also balance transparency with system security and user privacy. Continuous evaluation of explanations' impact on user understanding and decisions is essential.


\subsection{Limitations and Future Work}

This study faces four key limitations that present opportunities for future research:

\textbf{Prototype Fidelity}: Our low-fidelity prototypes simulating AI responses prevented evaluation under real conditions with varying accuracy, processing speeds, and edge cases. Future work should implement production-grade AI models to validate findings and identify real-world challenges. 

\textbf{Implementation Challenges}: Real-world deployment introduces integration hurdles with existing platforms, scalability requirements, and privacy compliance needs across jurisdictions. Research is needed on balancing explanation quality with performance and regulatory constraints.

\textbf{Confidence Communication}: Current percentage-based confidence scores lack contextual meaning. Future work should explore personalized calibration techniques for contextualizing scores.

\textbf{Security-Transparency Tradeoffs}: Over-disclosure of detection methods risks exploitation by malicious actors seeking to evade detection. Research must determine optimal transparency levels that build trust while maintaining system integrity. This extends work on adversarial robustness in explainable systems \cite{baniecki2024adversarial} by examining explanation-specific vulnerabilities.

% These limitations highlight the need for research bridging the gap between prototype designs and production implementations while maintaining security and usability.


\section{Conclusion}

Our study of explainable AI interfaces across e-commerce moderation and communication monitoring revealed distinct patterns in how explanation design impacts user trust and understanding. The findings advance our understanding of context-dependent XAI design in three key areas:

\textbf{Task-Specific Explanation Patterns.} For repetitive e-commerce tasks, structured visual explanations with clear action paths proved effective, with users reporting high understanding (5/5) across both technical and non-technical backgrounds. In contrast, communication monitoring required more nuanced, contextual explanations, leading to varied understanding (3-5/5) but highlighting the importance of progressive disclosure for complex decisions.

\textbf{Trust Dynamics.} Our results revealed that trust formation differs by context and user expertise. E-commerce users showed high trust in standardized explanations for routine decisions (3-5/5), while communication monitoring users exhibited more variance (2-5/5), particularly around privacy and verification. This aligns with our discussion findings on the importance of transparent confidence metrics and user control in sensitive contexts.

\textbf{Design Implications.} The synthesis of our findings suggests a framework for context-aware XAI:
\begin{itemize}
    \item Repetitive tasks benefit from standardized, action-oriented explanations with consistent visual elements
    \item Unique decisions require adaptive explanations with progressive disclosure and strong privacy controls
    \item Both contexts need clear confidence communication and user agency in verification
\end{itemize}

While our small-scale study provides valuable initial insights, several critical questions warrant future investigation at scale:
\begin{itemize}
    \item How do these explanation patterns perform under real-world conditions with varying accuracy and edge cases?
    \item What are optimal approaches for contextualizing confidence scores across different usage scenarios?
    \item How can explanation designs balance transparency with security against adversarial exploitation?
\end{itemize}

By identifying these context-dependent patterns in XAI design, our work provides a foundation for developing more effective, human-centered explainable AI systems. Future research can build on these findings to create interfaces that maintain user trust and understanding while addressing the unique challenges of different application domains.

\section*{Author Contributions}
K. K. developed the LENS e-commerce moderation prototype.  
J. L. developed the GUARD communication monitoring prototype. 
% M. S. guided and supervised the work. 


% \balance

% \pagebreak

%%
%% The next two lines define the bibliography style to be used, and
%% the bibliography file.

\bibliographystyle{ACM-Reference-Format}
\bibliography{XAI_paper}

\appendix


% \section{User Survey Questions} 

\section{E-Commerce Moderation User Survey}
\label{sec:scenario1_interview}

Each question or statement was rated on a Likert scale from 1-5, where 1 indicated strong disagreement, 3 was neutral, and 5 was strong agreement. Participants were asked two general questions after reviewing all scenarios and the full interface, as well as two questions for each type of listing flag scenario.

The two general questions were:
\begin{enumerate}
    \item ``I would trust this system.''
    \item ``I understand this system.''
\end{enumerate}

For each of the three scenarios, participants were asked two additional questions about frustration and about fairness and transparency: 
\begin{enumerate}
    \item ``The pop-ups for [X] were frustrating.''
    \item ``The explanations for [X] were fair and transparent.''
\end{enumerate}
where [X] was one of ``image detection mismatches'', ``price detection mismatches'' or ``prohibited item detection''.

Finally, participants provided open-ended feedback on what aspects of the interface they liked, disliked, or would change.

% \columnbreak

\section{Communication Monitoring User Survey}
\label{sec:scenario2_interview}

% As before, each question or statement was rated on a Likert scale from 1-5, where 1 indicated strong disagreement, 3 was neutral, and 5 was strong agreement. 
As before, each question or statement was rated on a Likert scale. Participants were asked five general questions after reviewing all scenarios and the full interface, along with an initial comprehension question for each inconsistency scenario.

For each inconsistency scenario, participants were first asked:
\begin{enumerate}
\item ``In your own words, explain what inconsistency the system detected.''
\end{enumerate}

After reviewing all scenarios, participants rated their agreement with the following statements:
\begin{enumerate}
\item ``The system's inconsistency detection is reliable.''
\item ``I trust this system's ability to detect inconsistencies.''
\item ``I would be comfortable using this system in my daily life.''
\item ``I understand the system's explanations.''
\end{enumerate}

Finally, participants provided open-ended feedback on what aspects of the explanations influenced their trust or distrust in the system.

% \section{Additional Scenarios for Communication Monitoring}
\section{Additional Scenarios}

\begin{figure*}[ht]
    \centering
    \includegraphics[width=.80\textwidth]{img/factminder/health_explaination.png}
    \caption{A medical alert for conflicting sprained ankle treatments, where a doctor recommended heat therapy contrary to guidelines advocating ice therapy.}
    \label{fig:health_explaination}
\end{figure*}

\begin{figure*}[ht]
    \centering
    \includegraphics[width=.80\textwidth]{img/factminder/health_discuss_expanded.png}
    \caption{Stages of a medical alert explanation: issue detection from a monitored conversation, evidence collection from orthopedic guidelines, analysis of potential risks from incorrect treatment, and explanation of the system's confidence assessment.}
    \label{fig:health_discuss_expanded}
\end{figure*}

\begin{figure*}[ht]
    \centering
    \includegraphics[width=0.80\textwidth]{img/factminder/sushi_explaination.png}
    \caption{A conversation contradiction alert, where Alex made sushi dinner plans despite earlier expressing disinterest in sushi, with 52\% AI confidence in the detected inconsistency.}
    \label{fig:sushi_explaination}
\end{figure*}

\begin{figure*}[ht]
    \centering
    \includegraphics[width=0.80\textwidth]{img/factminder/sushi_discuss_expanded.png}
    \caption{Detailed analysis of a sushi dinner contradiction: issue detection at Company Office Building, SMS evidence collection, assessment of social risks, and explanation of low 52\% confidence due to ambiguous mood indicators and informal planning.}
    \label{fig:sushi_discuss_expanded}
\end{figure*}
\end{document}
\endinput
%%
%% End of file `sample-sigconf-xelatex.tex'.



