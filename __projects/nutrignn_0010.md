7. PROJECT: “NutriGNN: Food Nutrient Prediction with an LLM Enriched Knowledge Graph“  
   1. INSTRUCTOR: Distinguished Professor Ambuj K. Singh at UCSB  
   2. COURSE: The project started in CMPSC 292F Graphs and Graph Neural Networks: This course will examine graphs and graph neural networks from the specific aspects of representation, reasoning, robustness, and symmetry.  
   3. Writeup: [https://www.overleaf.com/project/678f59976006e02f0f2aa21c](https://www.overleaf.com/project/678f59976006e02f0f2aa21c)   
   4. After my GNN project Dr.Singh contacted me and invited me to be a part of his research group for drug discovery and despite such work being incredibly valuable for medicine I had to turn him down to prioritize the four graduate courses I already had on my plate. I’ve learned about myself as a researcher that I can succeed at highly valuable work, but I need to be strategic about balancing research opportunities with the demands of my required coursework.  
   5. If I continued this line of work, a possible next step would be to ...  
   6. The hardest part of this project was to ...  



% anything better than PDF citation
%% M. Moˇzina, S. ˇZitnik, B. K. Seljak, and T. Eftimov, Enhancing Food
% Composition Databases: Predicting Missing Values via Knowledge
% Graph Embeddings. PhD thesis, Univerza v Ljubljani, Fakulteta za
% raˇcunalniˇstvo in informatiko, 2023



%% bare_jrnl.tex
%% V1.4b
%% 2015/08/26
%% by Michael Shell
%% see http://www.michaelshell.org/
%% for current contact information.

\documentclass[journal]{IEEEtran}
\usepackage{graphicx}
\usepackage{amsmath}
\usepackage{cite}
\usepackage{hyperref}
\usepackage{booktabs}

% \usepackage{tcolorbox}
% \tcbuselibrary{enhanced}

% \hyphenation{op-tical net-works semi-conduc-tor}


\begin{document}
%
% paper title
% Titles are generally capitalized except for words such as a, an, and, as,
% at, but, by, for, in, nor, of, on, or, the, to and up, which are usually
% not capitalized unless they are the first or last word of the title.
% Linebreaks \\ can be used within to get better formatting as desired.
% Do not put math or special symbols in the title.
\title{Food Nutrient Prediction with \\
an LLM Enriched Knowledge Graph}
%
%
% author names and IEEE memberships
% note positions of commas and nonbreaking spaces ( ~ ) LaTeX will not break
% a structure at a ~ so this keeps an author's name from being broken across
% two lines.
% use \thanks{} to gain access to the first footnote area
% a separate \thanks must be used for each paragraph as LaTeX2e's \thanks
% was not built to handle multiple paragraphs
%

\author{Jasmine~Lesner, Sathvika~Anand\\
~University of California, Santa Barbara}

% The paper headers
\markboth{Journal of Machine Learning on Graphs, March~2025}%
{}
% The only time the second header will appear is for the odd numbered pages
% after the title page when using the twoside option.
% 
% *** Note that you probably will NOT want to include the author's ***
% *** name in the headers of peer review papers.                   ***
% You can use \ifCLASSOPTIONpeerreview for conditional compilation here if
% you desire.


% If you want to put a publisher's ID mark on the page you can do it like
% this:
%\IEEEpubid{0000--0000/00\$00.00~\copyright~2015 IEEE}
% Remember, if you use this you must call \IEEEpubidadjcol in the second
% column for its text to clear the IEEEpubid mark.

% use for special paper notices
%\IEEEspecialpapernotice{(Invited Paper)}

% make the title area
\maketitle

\begin{abstract}
Food composition databases are essential for nutrition research and policy, yet they remain incomplete, with only 31\% of food-nutrient pairs directly measured in the USDA database. We present a novel approach to predict missing nutrient values by enriching food-nutrient knowledge graphs with information derived from Large Language Models (LLMs). Our method combines USDA data with OpenAI embeddings and GPT-4o-generated nutrient groupings to create a comprehensive graph with over 645,000 edges connecting 8,170 nodes. We train Graph Neural Networks (GNNs) on this enriched structure to predict missing nutrient values. Our best model achieves 67.55\% accuracy (predictions within $\pm$30\% of true values), substantially outperforming the baseline food group median imputation method (30.29\%). Through ablation studies, we demonstrate that most LLM-derived features improve prediction performance, though some—like GPT-4o-generated nutrient groups—unexpectedly reduced accuracy. Our approach demonstrates how domain knowledge encoded in LLMs can enhance structured prediction tasks, particularly when dealing with incomplete data. This work contributes to making food composition databases more complete and useful for nutrition science and public health applications.
\end{abstract}


\begin{IEEEkeywords}
Nutrient Prediction,
Knowledge Graphs,
Large Language Models, LLMs,
Graph Neural Networks, GNNs,
Embedding Vectors,
Data Imputation,
Food Composition Databases,
\end{IEEEkeywords}


% \title{Food Nutrient Prediction with an LLM Enriched Knowledge Graph}

\section{Introduction} %--- SECTION: Introduction

\begin{figure}[b]
\begin{center}
\includegraphics[width=0.98\linewidth]{figures/missing_data.png}
\end{center}
   \caption{Our analysis of USDA-tracked foods showing which nutrient values are measured (green), estimated (yellow), or missing (red). 
   About 31\% are measured, 45\% are missing, and 24\% are estimated.
   The clustered heatmap sorts similar foods (rows) and nutrients (columns) together to show missing data patterns.}
\label{fig:missing_data}
\end{figure}

Food composition databases like the USDA's Food Nutrition Data are vital tools for research, diet planning, and policy. They aim to document the nutrient content of foods to serve scientists, nutritionists, and consumers \cite{usda2019}. Yet, these databases remain incomplete. In our analysis of USDA data, only 31\% of the possible 1.17 million food-nutrient pairs have been directly measured. About 24\% are estimated, and the rest are missing (Figure \ref{fig:missing_data}).

\begin{figure}[t]
\begin{center}
\includegraphics[width=0.98\linewidth]{figures/conceptual_graph.png}
\end{center}
   \caption{Overview of our LLM-enriched knowledge graph for nutrient prediction. It combines USDA food composition data, OpenAI embeddings, and GPT-4o nutrient groups, creating a graph with over 645,000 edges.}
\label{fig:conceptual_graph}
\end{figure}

This data gap poses a major challenge. Direct nutrient measurement is costly and slow, requiring lab equipment and protocols. As a result, many foods lack full nutrient profiles, especially rare foods or nutrients that are harder to measure. These gaps limit how useful these databases can be for work that needs complete nutrition data.

Existing methods to predict missing values often use regression or clustering \cite{Schakel1997Procedures}. These rely on patterns in the structured data. While sometimes helpful, they struggle to capture deeper relationships—like those found in literature, recipes, or cultural food knowledge.

\begin{figure*}[t]
\begin{center}
\includegraphics[width=0.9\linewidth]{figures/stripplot.png}
\end{center}
   \caption{Strip plots showing Iron, Protein, and Phosphorus levels in 7,800 foods, grouped by food type. USDA measures nutrients per 100g of edible food. The values span five orders of magnitude, are skewed, and often multi-modal.}
\label{fig:stripplot}
\end{figure*}

Our method addresses this by enriching a food-nutrient knowledge graph with knowledge from Large Language Models (LLMs). LLMs encode broad information, including nutritional science and food-related knowledge. By using LLMs and a graph-based imputation approach, we aim to improve predictions of missing nutrient values.

\section{Contributions} %--- SECTION: Contributions

Our work makes the following contributions:

\begin{itemize}
    \item We introduce a new method for enriching food-nutrient knowledge graphs using LLM-derived information.
    
    \item We build a graph (Figure \ref{fig:conceptual_graph}) that combines USDA data, GPT-4o nutrient groupings, and OpenAI embeddings for food and nutrient names. We also use clustering to form new food groups.
    
    \item We show that Graph Neural Networks can use this enriched graph to predict missing nutrient values more accurately.
    
    \item We run an ablation study to measure how each part of our approach contributes to prediction performance.
\end{itemize}

\section{Background} %--- SECTION: Background

\subsection{Graph Neural Networks}

Graph Neural Networks (GNNs) are a class of deep learning models designed to process graph-structured data and are effective for modeling relational information data. Common architectures include Graph Convolutional Networks \cite{kipf2017} that aggregate information from neighboring nodes, Graph Attention Networks \cite{velivckovic2018} that introduce attention mechanisms during aggregation, and GraphSAGE \cite{hamilton2017inductive}, which samples neighborhoods for inductive learning on large graphs. GNNs have been used in chemistry \cite{gilmer2017neural}, biology \cite{zitnik2018}, and recommendation systems \cite{ying2018graph}.


\subsection{Food Nutrition Databases}

Nutrition databases developed by governments and researchers aim to track the nutrient content of foods \cite{greenfield2003food}. The USDA database is one of the most detailed, with data on about 8,000 foods and 150 nutrients \cite{usda2019}. Other efforts include the UK's McCance and Widdowson's database \cite{mccance2019} and the EuroFIR project \cite{eurofir2018}. Still, these databases all face the same challenge: missing data, due to the high cost of full lab testing \cite{ahuja2013usda}.

\subsection{Graphs for Nutrient Prediction}

Možina et al.\ \cite{movzina2023enhancing} built a knowledge graph where foods and nutrients are nodes and relationships are edges. Using the ComplEx model \cite{trouillon2016complex}, they showed that graphs can reveal food similarities that simpler models miss. Their method turned nutrient prediction into a classification task by grouping nutrient values into bins (e.g., “between x and y”). Their best model achieved an MRR of 0.81 and Hits@10 of 0.94.

Our approach differs in key ways. We treat nutrient prediction as a regression task instead of classification. Rather than predicting a category, we predict exact values. This matters because:
\begin{enumerate}
    \item Regression keeps fine-grained details of nutrient values.
    \item It allows more precise predictions across wide value ranges.
    \item It better handles the skewed and multi-modal data common in food composition.
\end{enumerate}

Možina et al.\ included food groups in their graph. We go further, adding LLM-derived groupings for both foods and nutrients. Also, their study used 351 foods and 25 nutrients, while ours covers 7,800 foods and 150 nutrients.


\section{Method} 

\subsection{Dataset}

We use the USDA Food Nutrition Database, which includes $\sim$7,800 foods and 150 nutrients \cite{usda2019}. Its schema (Figure \ref{fig:original_schema}) includes tables for foods, nutrients, food groups, and nutrient values.

As shown in Figure \ref{fig:stripplot}, measurements of nutrients:

\begin{itemize}
    \item Span five orders of magnitude
    \item Have distributions that are tail heavy
    \item Have distributions are highly skewed 
\end{itemize}

Because of these traits adaptive scaling is required before using them for machine learning.

\begin{figure}[t]
\centering 
\includegraphics[width=0.95\linewidth]{figures/original_schema.png}
\caption{USDA schema: The nutrient\_value column in the food\_nutrient\_measurements table indicates how much of a nutrient (nutrient\_id) is in a food (food\_id).}
\label{fig:original_schema}
\end{figure}



\subsection{Adaptive Scaling}

To handle wide, skewed, and multi-modal nutrient distributions, we apply adaptive scaling. We first analyze each nutrient’s distribution and then choose one of the transformation paths shown in Figure \ref{fig:adaptive_scaling}. This helps represent values in a way that suits neural network training, while keeping relative differences intact.

\subsection{Graph Enrichment}

\noindent We enrich the graph using four steps (Figure \ref{fig:enhanced_schema}):

\textbf{1. Vector Embedding:} We use OpenAI's ``text-embedding-3-small'' model \cite{openai_text_embedding_3_small} to create vector embeddings of USDA food, nutrient, and group names. These serve as node features, capturing semantic meaning.

\textbf{2. Nutrient Groups:} Since the USDA does not define nutrient groups, we asked GPT-4o to create them and assign USDA nutrients to these groups. We first prompted the model to generate approximately 80 distinct nutrient groups, and then asked the model to categorize each of the ~150 nutrients into these nutrient groups. For example, GPT-4o grouped calcium, iron, and zinc under 'Minerals'. This added $\sim$80 new nutrient groups.

\textbf{3. Embedding Clusters:} t-SNE plots (Figure \ref{fig:food_embedding_tsne}) revealed clear subgroups within the USDA-provided food groups. We used K-means clustering with angular distance to define more granular groupings for both food and nutrient embeddings. Silhouette scores determined optimal cluster counts.

\textbf{4. New Groups:} We added the previously mentioned embedding clusters as food/nutrient group nodes, with edges connecting each food or nutrient to its respective group. This integration uses knowledge that large language models (LLMs) have learned from their extensive text training corpora. While embeddings are trained to predict words, and LLMs may generate plausible but false answers, we were curious if their general knowledge could still improve prediction.


\begin{figure}[t]
\begin{center}
\includegraphics[width=0.86\linewidth]{figures/enhanced_schema.png}
\end{center}
\caption{To enrich the knowledge graph: (1) We added OpenAI embeddings as node features. (2) GPT-4o suggested nutrient groupings. (3) We clustered embedding vectors. (4) These clusters became additional food and nutrient groups.}
\label{fig:enhanced_schema}
\end{figure}


\begin{figure}[b]
\begin{center}
\includegraphics[width=0.9\linewidth]{figures/actual_graph3.png}
\end{center}
   \caption{Structure of our knowledge graph. Nodes: foods (yellow), nutrients (blue), food groups (orange), and nutrient groups (purple). Graph has 8,170 nodes and 645,209 edges.}
\label{fig:actual_graph}
\end{figure}

\begin{figure}[bht]
\begin{center}
\includegraphics[width=0.9\linewidth]{figures/adaptive_scaling.png}
\end{center}
   \caption{Adaptive scaling: Each nutrient's distribution is analyzed, then a suitable transformation is applied.}
\label{fig:adaptive_scaling}
\end{figure}


\subsection{Graph Composition}

Our graph (Figure \ref{fig:actual_graph}) includes:
\textbf{Food nodes}: $\sim$7,800 foods tracked by USDA
\textbf{Nutrient nodes}: $\sim$150 nutrients tracked by USDA.
\textbf{Food group nodes}: $\sim$150 total, $\sim$25 from USDA, the rest from clustering.
\textbf{Nutrient group nodes}: $\sim$150 total, $\sim$70 from GPT-4o, the rest from clustering.
\textbf{Food-nutrient edges} show how much of a nutrient a food contains per 100g.
\textbf{Food-food group edges} link foods to their groups.
\textbf{Nutrient-nutrient group edges} link nutrients to their groups. 

USDA does not supply nutrient groups and assigns foods to a single food group. We added nutrient groups (from GPT4-o), and unlike USDA's database schema, our graph allows foods and nutrients to be members of multiple groups.




\subsection{GNN Architecture}
\label{sec:gnn_arch}

Our best-performing GNN uses a $4$-layer design with hidden dimension $h=500$ and dropout rate $p=0.1$. The model combines food and nutrient embeddings with bidirectional message passing across six relation types, including food-to-food group and food-to-nutrient edges. Node features are first transformed using layer normalization, followed by GraphSAGE convolutional layers with residual connections. Figure \ref{fig:gnn_structure} shows a two-layer version of this architecture, which performed worse than the four-layer version but shares the same structure.

We use HuberLoss ($\delta=1.0$) to reduce the effect of outliers in nutrient values, and optimize with AdamW ($\eta=10^{-4}$, weight decay=$10^{-4}$). The learning rate decreases on plateau (factor=$0.5$, patience=$20$). Training runs for up to $3000$ epochs with early stopping (patience=$200$), based on regularization loss. This setup supports strong nutrient prediction across diverse food types.

We also tested a GAT-based heterogeneous GNN with multi-head attention (heads=$4$). Our best performing version had $3$ layers and used attention-based message passing over the same six relation types. While it applied attention weights to highlight key node relationships, it consistently underperformed compared to our GraphSAGE model. This is likely due to the fact that the GAT architecture does not support edge attributes. The GAT used the same layer normalization and residual connections, but struggled to model the complex structure of the nutrition graph.

We further explored a Transformer-based heterogeneous GNN using TransformerConv layers over the same six relation types. Although transformer layers can model long-range dependencies, the best  Transformer-based model we found still performed poorly on our task. 

\begin{figure}[b]
\begin{center}
\includegraphics[width=0.9\linewidth]{figures/gnn_structure.png}
\end{center}
   \caption{GNN architecture for nutrient prediction. Various  node types go through initial transformations, then heterogeneous graph convolutions. Our best performing models use four GNN layers.This diagram shows only two GNN layers for clarity.}
\label{fig:gnn_structure}
\end{figure}


\subsection{Prediction Evaluation}

We split our data 80/20 for training and validation and report performance only from validation. 
Metrics used:
\textbf{Loss}: Mean Squared Error.
\textbf{R²}: Coefficient of determination.
\textbf{Accuracy ±30\%}: Fraction of predictions within ±30\% of the true value. This range reflects natural variation in food composition caused by factors like soil, climate, and genetics. Nutrient values often vary by 20–30\% even in lab settings, so this margin is a practical benchmark. No single threshold fits all nutrients or foods.

For our evaluation we did not rely on USDA's nutrient estimates (yellow in figure \ref{fig:missing_data}) but only considered actual nutrient measurements (green in figure \ref{fig:missing_data}).




  
\begin{table*}[tbhp]
\centering
\caption{Single Feature Ablation Study}
\label{tab:ablation-results1}
% \begin{tabular}{lccc}
\begin{tabular}{p{7cm}ccc}  % First column has fixed width of 5cm
\toprule
\textbf{Model Configuration} & \textbf{MSE (Loss)} & \textbf{R²} & 
\textbf{Accuracy (±30\%)} \\
\midrule
Imputation with Food Group Means & - & - &  0.1918 \\
Imputation with Food Group Medians & - & - & 0.3029 \\
\midrule
All Enrichment Enabled & 0.0501 & 0.8754 & 0.6654 \\
All Enrichment Disabled & 0.0796 & 0.7995 & 0.6080 \\
\midrule
Food Groups (FGs) Disabled & 0.0507 & 0.8736 & 0.6669 \\
Nutrient Groups (NGs) Disabled & 0.0502 & 0.8748 & 0.6641 \\
\midrule
Food Embedding Vectors (FEV) Disabled & 0.0705 & 0.8228 & 0.6293 \\
Nutrient Embedding Vectors (NEV) Disabled & 0.0519 & 0.8702 & 0.6569 \\
\midrule
Food Group Embedding Vectors (FGEV) Disabled & 0.0496 & 0.8761 & 0.6665 \\
Nutrient Group Embedding Vectors (NGEV) Disabled & \textbf{0.0481} & \textbf{0.8811} & \textbf{0.6718} \\
\bottomrule
\end{tabular}
\end{table*}



\begin{table*}[tbhp]
\centering
\caption{Dual Feature Ablation: Nutrient Group Embedding Vectors (NGEV) Always Disabled}
% always: "use_nutrient_group_embeddings": False},
\label{tab:ablation-results2}
% \begin{tabular}{lccc}
\begin{tabular}{p{7cm}ccc}  % First column has fixed width of 5cm
\toprule
\textbf{Model Configuration} & \textbf{MSE (Loss)} & \textbf{R²} & 
\textbf{Accuracy (±30\%)} \\
\midrule
Imputation with Food Group Means & - & - &  0.1918 \\
Imputation with Food Group Medians & - & - & 0.3029 \\
\midrule
NGEV Disabled & 0.0509 & 0.8733 & 0.6629 \\
% NGEV Disabled (Run1) & 0.0509 & 0.8733 & 0.6629 \\
% NGEV Disabled (Run2) & 0.0513 & 0.8726 & 0.6571 \\
NGEV and FGs Disabled & 0.0491 & 0.8783 & 0.6699 \\
NGEV and NGs Disabled & \textbf{0.0484} & \textbf{0.8796} & \textbf{0.6755} \\
NGEV and FEV Disabled & 0.0738 & 0.8148 & 0.6143 \\
NGEV and NEV Disabled & 0.0541 & 0.8656 & 0.6476 \\
NGEV and FGEV Disabled & 0.0491 & 0.8780 & 0.6667 \\
\bottomrule
\end{tabular}
\end{table*}


\begin{figure}[h]
\begin{center}
\includegraphics[width=\linewidth]{figures/food_embedding_tsne.png}
\end{center}
   \caption{t-SNE plot of food embedding vectors, colored by cluster. Clear separations show that the embeddings capture meaningful groupings.}
\label{fig:food_embedding_tsne}
\end{figure}

\section{Results}

The common imputation method, which assigns missing values based on the median of each food group, achieves an accuracy (±30\%) of 0.3029 on our dataset. By contrast, the first version of our GNN model (Section \ref{sec:gnn_arch}) with all enrichments included reaches an accuracy (±30\%) of 0.6654. When graph enrichment is removed, accuracy drops to 0.6080. This 6-point drop shows that predictions improve when using an LLM-enriched knowledge graph.

In our first ablation study (Table \ref{tab:ablation-results1}), we found that disabling nutrient embedding vectors actually improved performance to 0.6712. This suggests that including these embeddings was hurting accuracy.

We removed nutrient groups and repeated the ablation study (Table \ref{tab:ablation-results2}). This led to our highest accuracy: 0.6755. 

These nutrient groups—and their assignments—were generated entirely by GPT-4o. While the output initially appeared reasonable, our results suggest that GPT-4o did not produce nutrient groupings that improved prediction accuracy.

\section{Discussion}

% Disabling all enrichment yields an accuracy (±30\%) of 0.6080 (Table \ref{tab:ablation-results1}). When we also disable nutrient groups and nutrient embedding vectors (``NGEV and NGs Disabled''), accuracy rises to 0.6755 (Table \ref{tab:ablation-results2}). This 6-point gain shows that LLM-enriched graphs can improve food nutrient prediction.

% \subsection{Future Work}

While our results show that GNNs can benefit from LLM-enhanced food nutrient graphs, several areas remain for future work:

\begin{itemize}

    \item We tuned hyperparameters using a single RTX4090 GPU over two days. Further tuning may lead to better performance.
    
    \item We did not explicitly model food processing methods (e.g., raw vs. cooked) or regional variations. Some of these are implicitly captured in USDA labels used for embedding vector computation.
    
    \item Prediction accuracy varies across nutrients, but we did not study which ones perform well or poorly. Future work should include this analysis and consider a confidence model to indicate prediction reliability.

\end{itemize}

\section{Conclusion}

This paper presents a new approach to food nutrient prediction using GNNs applied to an LLM-enriched knowledge graph. By incorporating semantic knowledge from LLMs, we build a graph that helps predict missing nutrient values.

Our best GNN achieves 0.6755 accuracy (±30\%), far outperforming the food group median baseline of 0.3029 on the same USDA dataset of 7,800 foods and 150 nutrients. While LLM-derived features generally improve performance, ablation studies are essential to identify which ones help. For example, we found that removing GPT-4o-generated nutrient groups led to better predictions. All other enrichments contributed to a 6-point gain.

Our results show the potential of using LLMs to enhance structured prediction, especially when data is incomplete. This method could apply to other domains where domain-specific knowledge from LLMs can improve predictions.

By improving estimates of missing nutrient values, our work helps make food composition databases more complete and useful. These databases are key to nutrition research, public health, and food policy.

\section*{Author Contributions}

J. L. used LLMs to enhance the USDA food nutrition dataset and implemented adaptive scaling. Both S. A. and J. L. evaluated GNNs for nutrient value prediction. S. A. explored different GNN architectures, and J. L. conducted ablation studies on the best-performing one. Both authors contributed to writing the manuscript.

\bibliographystyle{ieeetr}
\bibliography{reference}


\end{document}