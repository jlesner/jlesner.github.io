6. PROJECT: “SymbolSight: Visual Symbol Sets That Remain Clear Despite Distortions from Retina Implants”  
   1. INSTRUCTOR: Michael Beyeler Associate Professor  at UCSB  
   2. COURSE: The project started in CMPSC 291A Bionic Vision: This graduate course will introduce students to the multidisciplinary field of bionic vision viewed through the lens of computer science, neuroscience, and human-computer interaction. There are no official prerequisites for this course. The instructor will do his best to make the course content self-contained, including a crash course in neuroscience & computational vision. Homeworks will be based around pulse2percept, a Python-based simulation framework for bionic vision. [https://bionicvisionlab.org/teaching/2025-winter-cs291a/](https://bionicvisionlab.org/teaching/2025-winter-cs291a/)   
   3. Write up: [https://www.overleaf.com/project/67b7c350f33b913685f39e2b](https://www.overleaf.com/project/67b7c350f33b913685f39e2b)  
   4. Demo video:   
   5. Project was voted by students and professor the top project in the class of graduate peers (voted \#1 project out of 34 students and 16 projects)  
   6. Currently Dr.Beyeler and I are submitted project write up to IEEE Engineering in Medicine and Biology Society (EMBC 2026\)  
   7. If I continued this line of work, I would want to  
      1.  learn how we can use generative models to create an optimized set of symbols.   
      <!-- 2. Building on SymbolSight, I would like to explore how large language models and transformer architectures can serve as a unifying framework for co-designing symbol sets and decoders for prosthetic reading. A natural next step is to replace these components with transformer-based models: using character-level transformer language models to provide rich contextual priors over letters, and transformer-based visual encoders to produce more human-like confusion matrices for distorted symbols. This would allow symbol assignment to be optimized not just for pairwise letter transitions, but for full-sequence predictions under realistic language context.  
   8. The hardest part of this project was to ... -->



%% LATEST WRITEUP

\title{\textsc{SymbolSight}: Algorithmic Selection of Visually Distinct Symbol Sets for Bionic Vision Systems}


\author{Jasmine~Lesner, Michael~Beyeler\\~University of California, Santa Barbara}

\maketitle

\begin{abstract}
People who use retinal implants often struggle to tell letters apart because of limits in electrode density, signal processing, and how the brain interprets stimulation. Rather than modify the implant, we explore choosing visual symbols that stay distinguishable under prosthetic distortions and mapping them to letters.
%
The approach has four steps: (1) generate many candidate symbols; (2) simulate retinal-implant distortions at several levels; (3) estimate confusion probabilities with pre-trained neural networks; and (4) select a letter--symbol mapping that lowers expected errors using language-specific letter transition probabilities. We target the common single-symbol viewing regime and sketch a hybrid approach in which a few very frequent words have dedicated symbols while the letter mapping covers the rest.
%
Across Arabic, Bulgarian, and English, symbols drawn from diverse sources (DCT, Katakana, Braille) are easier to tell apart than standard letters at higher distortion in our simulations. While user studies are needed, the results suggest that carefully chosen symbol sets may help reading with retinal implants without changes to hardware.
\end{abstract}


\begin{IEEEkeywords}
Bionic Vision, 
Retinal Implants, 
Visual Prosthesis, 
Symbol Recognition, 
Accessibility, 
Human-Computer Interaction, 
Simulated Vision, 
Assistive Reading, 
Biomedical Signal Processing, 
Visual Rehabilitation
\end{IEEEkeywords}

\IEEEpeerreviewmaketitle

\section{Introduction}

People who use retinal implants often struggle to tell letters apart because of limited electrode density, signal processing, and how electrical stimulation is interpreted in the visual system. Rather than change the hardware, we ask a simpler question: can we choose a small set of visual symbols, and map them to letters, so that the symbols stay distinguishable under prosthetic distortions?

In fluent reading with healthy vision, readers benefit from a broad \emph{perceptual span}, \emph{parafoveal preview}, and the \emph{word-superiority effect} \cite{rayner1998eye, reichle2003ez, reicher1969perceptual, wheeler1970processes, schotter2012parafoveal}. Current retinal prostheses, however, typically provide a narrow field of view, coarse sampling, and temporal persistence, which together push users toward sequential, one-symbol-at-a-time viewing \cite{beyeler2019model}. In this single-symbol regime, it is natural to focus on symbols that are easy to tell apart even when distorted.

\begin{figure}[htbp]
    \centering
    \includegraphics[width=.4\textwidth]{include/ssight_overview_0034.png}
    \caption{
    Our approach has four steps: generate symbols, simulate implant distortions, estimate confusion with a pre-trained neural network, and choose a letter-symbol mapping using letter transition probabilities
    }
    \label{fig:ssight_overview}
\end{figure}


We explore this idea with \textsc{SymbolSight}  (Fig.~\ref{fig:ssight_overview}), a four-step approach: (1) generate many candidate symbols; (2) simulate retinal-implant distortions at several levels; (3) estimate symbol confusions with a pre-trained neural network; and (4) choose a letter--symbol mapping that lowers expected errors using language-specific letter transition probabilities. We also propose a pragmatic hybrid: a few very frequent words receive dedicated symbols, while the letter mapping covers everything else. This keeps the system simple while allowing common words to be read more quickly.

In simulations with Arabic, Bulgarian, and English, symbol sets drawn from diverse sources (e.g., DCT, Katakana, Braille) remained more distinct than standard letters as distortion increased. These results are preliminary and depend on models and assumptions; user studies are needed to test whether this approach improves real-world reading with retinal implants.


\subsection{Related Work}

Research has explored how visual symbols stay clear in situations with poor viewing conditions. For example, studies on traffic signs have looked at how easy they are to read in different weather, highlighting the need for designs that stay clear amid visual noise and poor visibility \cite{hutchinson1978performance, carlos2008traffic, huo2024legibility}. For example  Clearview typeface was developed specifically to make road signs more readable in low light and bad weather \cite{garvey1996development, carlson2005maximizing}.

Similarly, research on airplane cockpits has taught us about symbol recognition in challenging conditions. Cockpit display symbols designed for high-vibration environments must stay readable despite effects like retina image slip and motion blur \cite{adelstein2009influence}. Research by Wickens et al. \cite{wickens2021engineering} created guidelines for display features that stay distinct even when the human visual system is affected by environmental stress — problems similar to those faced by retina implant users.

These studies help us understand how to design visual symbols that work well despite various distortions. Research in bionic vision has mainly focused on restoring natural vision of symbols by either working with these known distortions \cite{srivastava2009detection, kiral2013embracing, bruce2022greedy} or finding ways to avoid them by improving how the stimulus is encoded \cite{granley2022hybrid, granley2023human, wu2024optimizing}.

What's new about our approach is that instead of trying to adapt or work around the distortions in retina implants, we focus on using the existing implant interface as it is to maximize information transfer. Rather than trying to recreate natural vision, our approach accepts the limits of current retina implant technology and finds sets of symbols (for the letter patterns of a given language) that remain clearly distinguishable despite these limits.

\subsection{Organization}

The rest of paper is organized as follows. We first show how different symbol sets are affected by retina implant distortions. We then fine tune neural networks to recognize symbol sets affected by various levels of retina implant distortion to measure the resulting confusion matrices. These serve as a stand-in for how retina implant distortions are likely to cause symbol confusion for users. With these measured confusion matrices, we then demonstrate an algorithm that assigns letters to symbols in a way that minimizes confusion based on letter transition patterns in a given language. The algorithm considers which letter sequences appear most often in a language and assigns them the symbols least likely to be confused by a simulated visual system. This assignment is done for all letters and symbols at once to minimize confusion for an entire language. We conclude by testing our algorithm on three languages: Arabic, Bulgarian and English.


\begin{figure*}[!htbp]
    \centering
    \subfloat{\includegraphics[width=0.41\textwidth]{figures/all_symbols______E16x16_100_0.pdf}}
    \subfloat{\includegraphics[width=0.41\textwidth]{figures/all_symbols_td35_E16x16_100_0.pdf}}\\[1ex]
    \subfloat{\includegraphics[width=0.41\textwidth]{figures/all_symbols______E16x16_300_1000.pdf}}
    \subfloat{\includegraphics[width=0.41\textwidth]{figures/all_symbols_td35_E16x16_300_1000.pdf}}\\[1ex]
    \subfloat{\includegraphics[width=0.41\textwidth]{figures/all_symbols______E16x16_500_5000.pdf}} \subfloat{\includegraphics[width=0.41\textwidth]{figures/all_symbols_td35_E16x16_500_5000.pdf}}
    \caption{\textbf{Left side:} Seven symbol sets (Latin, DCT, Arabic, Japanese Katakana, Cyrillic, Braille, Korean Hangul) subjected to low, medium and high levels of pulse2percept distortion. \textbf{Right side:} Simulation of what happens when symbols are presented sequentially and the perceptual residue of the previous symbol causes further distortion.}
    \label{fig:all_symbol_sets}
\end{figure*}

\section{Methodology}

When simulating prosthetic vision, we show visual scenes with white on a black background. This increases contrast and makes things easier to see, which is important because current prosthetic vision systems have limited brightness range and resolution. Due to the limits of current retina implants, symbols are shown one at a time, and different implant users see various shapes ranging from small spots to long streaks rather than uniform patterns \cite{beyeler2019model}. 

This variation happens for several reasons: how much the retina has degenerated affects which cells survive, the distance between electrodes and the retina varies, and passing nerve fibers can be activated. The parameters $\rho$ and $\lambda$ in their axon map model represent key aspects of how electrical current spreads: $\rho$ controls how the current spreads perpendicular to nerve fibers (affecting how wide the perceived shape is), while $\lambda$ determines the spread along nerve pathways (affecting how elongated the shape appears).

\subsection{Symbol Distortion}
\label{sec:symbol_distortion}

To make our simulations show a range of possible visual experiences, we used pulse2percept \cite{beyeler2017pulse2percept} for three levels of distortion (shown top to bottom on the left side of Figure \ref{fig:all_symbol_sets}) based on Hans et al. methodology \cite{han2021deep}:

\begin{itemize}

    \item \textbf{Low Distortion}: no axonal stimulation ($\rho = 100\mu m, \lambda=0\mu m$),
    
    \item \textbf{Medium Distortion}: medium sized phosphenes with intermediate axonal stimulation ($\rho = 300\mu m, \lambda=1000\mu m$),
    
    \item \textbf{High Distortion}: large phosphenes with strong axonal stimulation ($\rho = 500\mu m, \lambda=5000\mu m$).

\end{itemize}

Our simulations use a custom 16x16 electrode grid (with 256 total electrodes) as a middle ground between older retina implants that still have users like Argus II \cite{strickland2022obsolete} and newer implants that are available or being developed like PRIMA \cite{lorach2015photovoltaic}. 

The right side of Figure \ref{fig:all_symbol_sets} shows what happens to the symbols on the left when they are shown rapidly one after another and the leftover image of the previous symbol causes more distortion. This happens because a faded afterimage of the previously viewed symbol remains partly visible. This distortion can greatly affect symbol recognition by creating overlapping visual effects.


\subsection{Symbol Recognition} \label{sec:symbol_recognition}

To measure how these overlapping visual effects impact the ability to recognize symbols distorted by retina implants, we used a neural network (NN) already trained for vision as our simulated vision system. 

After testing several pre-trained NNs, we chose MobileNetV3 \cite{howard2019searching} because it was computationally efficient and shares features with biological vision systems\footnote{Neuroscience studies show similarities between neural network structures and how biological vision works; for example, certain types of convolutional filters naturally develop center-surround patterns similar to mammalian retina structures \cite{babaiee2024neural}, and features like shallow paths and skip connections mimic biological neural pathways \cite{winding2023connectome}.}. 

Examining how distortions affected the symbol sets in Figure \ref{fig:all_symbol_sets}, we selected three for recognition testing:
\begin{itemize}
    \item \textbf{Katakana Symbols}: These have a simple, attractive appearance and stay recognizable even when blurred.
    \item \textbf{Braille Symbols}: These patterns of dots are used by blind people for reading with their fingers.
    \item \textbf{DCT Symbols}: These are used by image compression algorithms because they can represent key visual features efficiently \cite{ahmed1974discrete}.
\end{itemize}

To perform recognition testing we modified MobileNetV3 for our needs by replacing its ImageNet classification top layers with layers suitable for our symbol set and only allowing the weights in its top four layers to be changed during our fine-tuning. The trained weights in the lower layers were kept fixed to preserve the already learned general feature extraction abilities. 

All fine-tuning was limited to seven epochs because our goal was not to train the best possible classifier but to measure which symbols pose the most confusion during learning. We used the Adam optimizer with a small learning rate (0.0001) and gradient clipping (clip value = 0.5), and categorical cross-entropy loss. To prepare symbol images for training, we applied hundred-fold augmentation with `mixup' image augmentation as a way to simulate how images persist in vision \cite{zhang2017mixup}. 

For each of our distortion levels (Section \ref{sec:symbol_distortion}), we fine-tuned a separate MobileNetV3 model keeping everything else the same. For each model, we measured how likely one symbol was to be confused with another. These confusion measurements were then used to guide our algorithm to select the best symbol set.


\begin{figure*}[htbp]
    \centering
    \subfloat{\includegraphics[width=0.42\textwidth]{figures/confusion_matrix______E16x16_100_0.pdf}}
    \subfloat{\includegraphics[width=0.42\textwidth]{figures/training_symbols_td35_E16x16_100_0.pdf}}\\[1ex]
    \subfloat{\includegraphics[width=0.42\textwidth]{figures/confusion_matrix______E16x16_300_1000.pdf}}
    \subfloat{\includegraphics[width=0.42\textwidth]{figures/training_symbols_td35_E16x16_300_1000.pdf}}\\[1ex]
    \subfloat{\includegraphics[width=0.42\textwidth]{figures/confusion_matrix______E16x16_500_5000.pdf}}
    \subfloat{\includegraphics[width=0.42\textwidth]{figures/training_symbols_td35_E16x16_500_5000.pdf}}
    \caption{
        \textbf{Right:} DCT, Katakana and Braille symbol sets (with some mirrored and flipped symbols added) selected for recognition testing. These symbol grids appear from top to bottom at low, medium and high levels of distortion.
        \textbf{Left:} Heatmaps show confusion probabilities of a pre-trained neural network fine-tuned to recognize the symbols to their right.
    }
    \label{fig:training_confusion_symbol_sets}
\end{figure*}



\subsection{Symbol Selection}

To choose which symbols are good to assign to letters, we can use measured confusion probabilities to avoid symbols that are easily confused. And we improve this further by accounting for the letter-to-letter transition probabilities (for  given language). Assigning letters that frequently follow each other to symbols least likely to be confused helps reduce reading errors. This requires analyzing both symbol confusion probabilities and letter transition probabilities for a given language.  

The optimization problem is: given a letter co-occurrence matrix \( C \) (\( L \times L \), where \( L \) is the number of letters) and a symbol confusion matrix \( F \) (\( S \times S \), where \( S \) is the number of symbols), find a mapping function \( \pi \) that assigns each letter \( i \) to a symbol \( \pi(i) \) to minimize the cost function:  

\[
\text{Cost} = \sum_{i=0}^{L-1} \sum_{\substack{j=0 \\ j \neq i}}^{L-1} C_{i,j} \times F_{\pi(i), \pi(j)}
\]

This function measures confusion based on two factors: how often letter pairs appear together (e.g., "th" in English) and how likely their assigned symbols are to be mistaken for each other due to retina implant distortions. Multiplying these probabilities for all letter pairs gives a total confusion measure. Our goal is to assign letters to symbols to minimize this confusion.

% \textbf{Selection Algorithms}: 
To solve this problem we developed an adaptive approach that uses different strategies based on the input size:

\begin{itemize}
    \item For small problems ($L\leq 36, S \leq 100$), we use the Hungarian Algorithm (Kuhn-Munkres algorithm) \cite{kuhn1955hungarian}, which guarantees the best possible solution. This approach creates a complete cost matrix for all possible letter-symbol pairings and finds the best overall assignment, though it works best for smaller problem sizes because of its 
    %cubic time complexity. The 
    time complexity is $O(L^3)$.

    \item For medium-sized problems ($L\leq36, S\leq 500$), we use a local search strategy. This starts by assigning the clearest symbols to the most frequent letters, then gradually improves the solution by swapping pairs of assignments that reduce the overall confusion cost. This method is faster but may get stuck in locally good solutions rather than finding the best possible solution. The time complexity is $O(L^2 \cdot I \cdot S)$ because each iteration needs to evaluate $O(L^2)$ potential swaps, cost calculation for each swap is $O(S)$ in the worst case, and with $I$ iterations, the total is $O(L^2 \cdot I \cdot S)$.

    \item For larger problems, it is possible to use a hybrid approach. This first reduces the options by selecting a subset of the most distinct symbols, applies local search to this smaller problem, and further improves the solution using simulated annealing to avoid getting stuck in locally good solutions. The time complexity is $O(L^2 \cdot I \cdot S + L\cdot T\cdot S)$ because symbol subset selection is $O(S \log S)$, local search on the reduced problem is $O(L^2 \cdot I \cdot S)$ and simulated annealing is $O(L \cdot T \cdot S)$ where T = iterations\_per\_temp * temperature steps. 
\end{itemize}


\section{Results}

We fine-tuned three different MobileNetV3 neural networks: one for low distortion symbols, one for medium distortion symbols, and one for high distortion symbols. Figure \ref{fig:training_confusion_symbol_sets} shows some of the symbols we used for training and the confusion probabilities of each trained network. We only show a small sample of the 75,000+ symbol images we used, since how a symbol looks depends on its place in randomly created symbol sequences.

The heatmaps on the left in Figure \ref{fig:training_confusion_symbol_sets} show how often symbols are confused with each other. The middle diagonal line shows correct identification. Offset diagonal lines appear because similar symbols (mirrored or flipped) have similar features. The faint vertical patterns show which actual symbols get misidentified as others. The box patterns show that DCT symbols are confused with other DCT symbols, Katakana with other Katakana symbols, and Braille with other Braille symbols. This effect is strongest with low distortion and weakest with high distortion when the key visual features become harder to see. Symbols from different sets are less likely to be confused with each other than symbols within the same set, which suggests using symbols from multiple sets together works better.

With one confusion matrix for each distortion level, we tested our symbol selection algorithm on Arabic, English, and Bulgarian languages. We chose these three languages because they are very different from each other, and each has enough text online (from Project Gutenberg + OSCAR \cite{projectgutenberg, abadji2022towards}) for us to measure letter transition probabilities. Figures \ref{fig:arabic_transition_probabilities}, \ref{fig:bulgarian_transition_probabilities}, and \ref{fig:english_transition_probabilities} show our measured letter transition probabilities visually. In English, many letter combinations never or rarely happen (shown as light or white areas in the heatmap of Figure \ref{fig:english_transition_probabilities}). These rules about which letters can follow others help English readers understand unclear symbols based on context. Arabic has fewer of these restrictions (fewer light areas in the heatmap of Figure \ref{fig:arabic_transition_probabilities}), which likely makes it harder to guess unclear symbols from context. Bulgarian falls somewhere in between, with some letter restrictions (some light areas in the heatmap of Figure \ref{fig:bulgarian_transition_probabilities}) but not as many as English.

Static images don't show what happens when symbols appear quickly one after another (in the typical order of a given language) and the leftover image of the previous symbol causes more distortion. Despite this limitation, by comparing the third row to the sixth row in Figures \ref{fig:arabic_symbol_rows}, \ref{fig:bulgarian_symbol_rows}, and \ref{fig:english_symbol_rows}, we can see
%
% %
% \footnote{
% We could also fine-tune neural networks and measure confusion rates for original symbol sets vs new symbol sets, but this analysis is beyond what we cover in this study.
% }%
%
that with higher distortion, the new symbols chosen by our algorithm are easier to tell apart for all tested languages. We expect the biggest benefit for Arabic, which has letter symbols that are easily distorted (rows two and three in Figure \ref{fig:arabic_symbol_rows}) and few letter sequence rules that could help with unclear symbols.

\begin{figure}[ht]
    \setlength{\fboxsep}{0pt}
    \setlength{\lineskip}{0pt}
    \setlength{\parskip}{0pt}
    \raggedleft
    \includegraphics[width=\columnwidth]{figures/arabic_letter_bigrams.pdf}
    
    \caption{
        Heatmap showing Arabic language letter transition probabilities.
    }
    \label{fig:arabic_transition_probabilities}
\end{figure}

\begin{figure}[ht]
    \setlength{\fboxsep}{0pt}
    \setlength{\lineskip}{0pt}
    \setlength{\parskip}{0pt}
    \raggedleft
    \includegraphics[width=\columnwidth]{figures/bulgarian_letter_bigrams.pdf}

    \caption{
        Heatmap showing Bulgarian language letter transition probabilities.
    }
    \label{fig:bulgarian_transition_probabilities}
\end{figure}

\begin{figure}[ht]
    \setlength{\fboxsep}{0pt}
    \setlength{\lineskip}{0pt}
    \setlength{\parskip}{0pt}
    \raggedleft
    \includegraphics[width=\columnwidth]{figures/english_letter_bigrams.pdf}

    \caption{
        Heatmap showing English language letter transition probabilities.
    }
    \label{fig:english_transition_probabilities}
\end{figure}


\begin{figure*}
    \centering
    \includegraphics[width=0.96\linewidth]{figures/up_Arabic_01_E16x16_100_0.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Arabic_02_E16x16_300_1000.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Arabic_03_E16x16_500_5000.pdf}

    \vspace{0.2cm}
    \includegraphics[width=0.96\linewidth]{figures/up_Arabic_04_E16x16_100_0.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Arabic_04_E16x16_300_1000.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Arabic_04_E16x16_500_5000.pdf}
    \caption{
         The first three rows show Arabic letter symbols at low, medium and high distortion. The bottom three rows show the matching output of our symbol selection algorithm. 
    }
    \label{fig:arabic_symbol_rows}
\end{figure*}




\begin{figure*}
    \centering
    \includegraphics[width=0.96\linewidth]{figures/up_Bulgarian_01_E16x16_100_0.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Bulgarian_02_E16x16_300_1000.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Bulgarian_03_E16x16_500_5000.pdf}
    
    \vspace{0.2cm}
    \includegraphics[width=0.96\linewidth]{figures/up_Bulgarian_04_E16x16_100_0.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Bulgarian_04_E16x16_300_1000.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_Bulgarian_04_E16x16_500_5000.pdf}
    \caption{
         The first three rows show Bulgarian letter symbols at low, medium and high distortion. The bottom three rows show the matching output of our symbol selection algorithm. 
    }
    \label{fig:bulgarian_symbol_rows}
\end{figure*}




\begin{figure*}
    \centering
    \includegraphics[width=0.96\linewidth]{figures/up_English_01_E16x16_100_0.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_English_02_E16x16_300_1000.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_English_03_E16x16_500_5000.pdf}
    
    \vspace{0.2cm}
    \includegraphics[width=0.96\linewidth]{figures/up_English_04_E16x16_100_0.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_English_04_E16x16_300_1000.pdf}
    \includegraphics[width=0.96\linewidth]{figures/up_English_04_E16x16_500_5000.pdf}
    \caption{
         The first three rows show English letter symbols at low, medium and high distortion. The bottom three rows show the matching output of our symbol selection algorithm. 
    }
    \label{fig:english_symbol_rows}
\end{figure*}


\section{Discussion}

This work is an early exploration. Our results come from simulations and a neural network stand-in for human perception; we did not run user studies. The models do not capture the full variety of percepts seen with retinal implants, so any claimed benefits should be treated as hypotheses to test, not conclusions.

\textbf{Symbol design.} We sampled a wide but still limited set of symbols. Future work should try a broader pool (e.g., flags, emoji, simple face icons) and also learn new symbols directly with contrastive objectives that push symbols apart under distortion. Mixing sources seemed to reduce confusions; a more systematic search could make this effect clearer.

\textbf{Distortion modeling.} Our simulations covered three distortion levels but left out important realities. Next steps include:
\begin{itemize}
\item Varying electrode-grid density to span current and emerging devices,
\item Simulating dead electrodes and other “blind spots,”
\item Extending temporal effects beyond two symbols to capture longer persistence,
\item Using pulse2percept’s temporal features on symbol-sequence videos.
\end{itemize}

\textbf{Recognition model.} We fine-tuned MobileNetV3 for convenience, not because it best matches human vision. Architectures that better align with known visual pathways could yield more realistic confusion matrices and help us understand when symbol differences actually matter to users \cite{sarfraz2023study}.

\textbf{Letters vs. words.} Reading with prosthetic vision is often serial due to narrow field of view, low sampling, and persistence \cite{beyeler2019model}. Our letter-level optimization targets this one-symbol-at-a-time regime while keeping key terms like \emph{perceptual span}, \emph{parafoveal preview}, and the \emph{word-superiority effect} in mind \cite{rayner1998eye, reicher1969perceptual, wheeler1970processes, schotter2012parafoveal, reichle2003ez}. A practical extension is a \emph{hybrid set}: give a small number of very frequent words their own symbols and use the letter mapping for everything else. Because word frequencies are Zipf-like, a small word set could cover much of everyday text without overwhelming learning.

\textbf{Objective function.} We optimized using letter bigrams. A direct word-level objective (e.g., making whole words harder to confuse) might better predict reading performance. Comparing letter-based and word-based optimization under matched distortion would show how much is gained by moving to sequences.

Overall, we see this as a starting point. The next step is careful user testing, richer distortion models, broader symbol searches, and head-to-head comparisons of letter-only versus hybrid symbol sets on speed, accuracy, and learning curves.


\section{Conclusion}

\textsc{SymbolSight} takes a simple approach: instead of changing hardware, pick symbols that stay distinct when seen through retinal implants. We follow four steps—generate symbols, simulate implant distortions, estimate confusion with a pre-trained neural network, and choose a letter–symbol mapping using letter transition probabilities. In simulation, mixing diverse symbols (e.g., DCT, Katakana, Braille) helped Arabic, Bulgarian, and English stay more readable at higher distortion than standard letters.

This is an early result. Our simulations do not capture the full variety of percepts, and neural networks are only proxies for people. We focused on the common single-symbol, serial reading setting and did not run user studies. Next, we should test with implant users, expand the distortion models, and explore more symbol types. It may also help to try a small set of whole-word symbols for frequent words alongside the letter mapping and directly compare speed, accuracy, and learning.

Even with these limits, the findings suggest that carefully chosen symbol sets could make reading with retinal implants easier—without changing the hardware.

