3. PROJECT: “MIRROR: Measuring, Improving, and Reproducing Ranking with Open Retrieval Models”

		INSTRUCTOR:  Professor Tao Yang at UCSB

    1. COURSE: CS291A: Neural Information Retrieval: covers advanced topics on neural information retrieval and web search engines. The content to be focused includes indexing, retrieval, ranking, and system optimization for large-scale search services with deep machine learning and NLP models. Recent papers in top conferences will be reviewed, and issues in relevance, efficiency, and scalability will be studied.  
   2. Writeup: [https://www.overleaf.com/project/675bc7756de4e6a85d6cd043](https://www.overleaf.com/project/675bc7756de4e6a85d6cd043)   
      SUMMARY:  [https://chatgpt.com/c/6929bbd1-c378-8328-843b-18c60e5c5003](https://chatgpt.com/c/6929bbd1-c378-8328-843b-18c60e5c5003)   
        
      For my MIRROR project (\*Measuring, Improving, and Reproducing Ranking with Open Retrieval models\*), I investigated how reliably we can use large language models (LLMs) for zero-shot document re-ranking and how to make these methods more effective and efficient in practice. I started by replicating the SIGIR 2024 “Setwise” paper, which proposed a family of pointwise, pairwise, listwise, and setwise LLM rankers. Using the public \`llm-rankers\` codebase, Pyserini, and open models such as Flan-T5 (large/xl/xxl), I re-ran their experiments on TREC DL and BEIR datasets, automated the pipeline for BM25 retrieval and LLM re-ranking, and built analysis notebooks to compute discrepancy metrics between my results and the paper’s. I was able to match their effectiveness (NDCG@10 within ±3% and the same ordering of methods), but uncovered substantial efficiency differences (e.g., a 96% gap in inference counts traced to batch size differences and 33–40% fewer generated tokens for some setwise methods), highlighting how fragile reproducibility can be when implementation details are under-specified.  
        
      I then treated the original work as a platform to explore improvements and generalization. I extended the evaluation to the NovelEval-2306 dataset, where queries explicitly target information beyond the models’ training cutoff, and showed that all LLM rankers still outperform BM25, with setwise approaches achieving the best NDCG@10 while remaining more efficient than fully pairwise schemes. I systematically redesigned prompts for pointwise, pairwise, and setwise rankers and quantified their impact across BEIR datasets, finding up to 40.7% NDCG@10 gains in some method–dataset pairs, especially for setwise methods, with minimal degradation elsewhere. I also compared base Llama and Llama 2 models to their instruction-tuned and conversational variants (e.g., Llama 3.1 Instruct, Vicuna), observing consistent ranking improvements without significant latency increases.  
        
      This project taught me to think of LLM-based retrieval as an end-to-end system where models, prompts, hardware, and evaluation all interact. I learned to be rigorous about replication—treating discrepancies as signals rather than noise—and to design experiments that expose tradeoffs between effectiveness, efficiency, and robustness (for example, to changes in the initial BM25 ranking). Going forward, I would like to turn MIRROR into a standardized, open benchmarking suite for LLM-based ranking and explore learned prompt or budget-aware ranking strategies, where the system adapts its ranking method to query difficulty and compute constraints.


\begin{document}


% \title{Zero-Shot Document Ranking Using LLMs:\\
% Replication and Improvements}

% Zero-Shot Document Ranking with LLMs:\\
% A Replication Study}

% 
\title{\textsc{MIRROR}: Measuring, Improving and Reproducing \\
Ranking with Open Retrieval models}
% Title: 
% \title{MIRROR: Measuring, Improving, and Reproducing \\
% Zero-Shot LLM Document Ranking}

% RAZOR
% Reproducible Analysis of Zero-shot dOcument Ranking with LLMs
% Emphasizes replication + sharp comparison of ranking methods and efficiency.


\author{Mehak Dhaliwal and Jasmine Lesner}
\affiliation{%
  % \institution{University of California, Santa Barbara}
  \city{Santa Barbara}
  \state{California}
  \country{USA}
}

% \author{Tao Yang}
% \email{tyang@cs.ucsb.edu}
% \affiliation{%
%   % \institution{University of California, Santa Barbara}
%   \city{Santa Barbara}
%   \state{California}
%   \country{USA}
% }



\begin{abstract}

We conduct a replication study of recent advances in zero-shot document ranking with Large Language Models (LLMs), focusing on the Setwise approach introduced at SIGIR 2024. Our results confirm high fidelity in effectiveness metrics (NDCG@10 within ±3\%) but reveal efficiency discrepancies, including 33–40\% lower token usage for setwise methods. Expanding on the original work, we evaluate performance on the NovelEval-2306 dataset, showing strong ranking capabilities for queries beyond the models’ training cutoff. Systematic prompt engineering yields up to 40.7\% improvements in NDCG@10 for specific method-dataset pairs, with setwise methods benefiting the most. Experiments with instruction-tuned and conversationally fine-tuned models (Llama 3.1, Llama 2) show consistent gains without added computational cost. These findings validate the original conclusions and highlight strategies for optimizing LLM-based ranking systems through prompt engineering and model selection. 

\end{abstract}


\ccsdesc[500]{Information retrieval}
\ccsdesc[500]{Language models}
\ccsdesc[300]{Retrieval models and ranking}
\ccsdesc[200]{Evaluation of retrieval results}


\keywords{Zero-shot document ranking, Large Language Models (LLMs), Setwise ranking, Pairwise ranking, Listwise ranking, Prompt engineering, TrecDL datasets, BEIR datasets, NDCG@10, Information retrieval, Model efficiency, Query latency, BM25, Computational cost analysis, Reproducibility}

\maketitle


\section{Introduction}

We selected the paper introducing \textit{Setwise}, a novel method for zero-shot document ranking using Large Language Models (LLMs). This approach enhances efficiency by reducing LLM inferences and prompt token usage during ranking while maintaining high effectiveness. The paper, titled \textit{"A Setwise Approach for Effective and Highly Efficient Zero-shot Ranking with Large Language Models"} \cite{zhuang2024setwise}, was presented at the 47th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR 2024).

We chose this paper because it presents a new methodology that addresses efficiency challenges in zero-shot ranking with LLMs, offering a promising research direction. Previous literature has often lacked a fair and consistent comparison of the effectiveness and efficiency of various techniques. This paper fills that gap by providing a rigorous comparative framework for prompting methods—Pointwise, Pairwise, Listwise, and Setwise—shedding light on their trade-offs. Moreover, with zero-shot and few-shot learning being rapidly evolving fields, this work holds significant relevance.


\section{Background}

 This section summarizes the key algorithms and datasets.
 Readers should refer to \cite{zhuang2024setwise} for foundational details essential to understanding our replication and improvements. 

\subsection{Key Algorithms}

Re-ranking algorithms refine the order of documents retrieved by a fast but approximate initial ranking. These algorithms, while more resource-intensive, optimize the top results for greater relevance. They are crucial for surfacing the most relevant content in applications like search engines.
%
\textbf{Pointwise}: Scores each document independently for relevance \cite{pointwise1, pointwise2, pointwise3}. Variants include:
(1) Yes/No Generation (\textit{pointwise.yes\_no}): Ranks by the likelihood of "yes."
(2) Query Likelihood Modeling (\textit{pointwise.qlm}): Ranks by query-generation likelihood. These methods are efficient but depend on model logits and can suffer from calibration issues.
%
\textbf{Listwise}: Generates ranked lists (\textit{listwise.generate}) using sliding windows to re-rank document chunks iteratively \cite{listwise1, listwise2, Sun2023IsCG}. This method is more efficient than Pointwise but relies on coherent list generation.
%
\textbf{Pairwise}: Compares document pairs for relevance \cite{pairwise1}. Basic approaches (\textit{pairwise.allpairs}) are expensive. Optimized variants use sorting algorithms, e.g., heap sort (\textit{pairwise.heapsort}) or bubble sort (\textit{pairwise.bubblesort}), balancing effectiveness and efficiency.
%
\textbf{Setwise}: Processes multiple documents simultaneously for faster sorting (\textit{setwise.heapsort}, \textit{setwise.bubblesort}). It can also refine Listwise rankings using logits (\textit{listwise.likelihood}), achieving strong effectiveness with greater efficiency than Pairwise methods.

\subsection{Key Datasets}

The authors \cite{zhuang2024setwise} assess performance of re-ranking using: % two dataset families:

\begin{itemize}

\item \textbf{TrecDL Datasets} \cite{craswell2020overview}:
\textbf{TrecDL 2019}: 8.8M passages, 503K queries, 43 test queries ($\sim$50 GB).
\textbf{TrecDL 2020}: Similar structure with document and passage ranking tasks ($\sim$75 GB).

\item \textbf{BEIR Datasets} \cite{thakur2021beir}: Includes datasets like Covid, NFCorpus, Touche, DBPedia, SciFact, Signal-1M (RT), News, and Robust04, ranging in size from $\sim$10 MB to $\sim$20 GB.
\end{itemize}

In this study extend the analysis to the \textbf{NovelEval-2306 Dataset} \cite{Sun2023IsCG}, featuring 21 queries with relevance judgments for 20 passages per query.


\subsection{Key Metrics}
\label{sec:metrics}

The authors in \cite{zhuang2024setwise} evaluate \textbf{Effectiveness} (using NDCG@10, which assesses ranking quality) and \textbf{Efficiency} with:
\begin{itemize}
    \item Average LLM inferences per query.
    \item Average prompt tokens per query.
    \item Average generated tokens per query.
    \item Average query latency (in seconds).
\end{itemize}

In this report, we use a metric for our ability to reproduce their published results: 

\[
\textbf{Discrepancy \%} = \frac{\textbf{Measured} - \textbf{Published}}{\textbf{Published}}
\]

The ideal value for this metric is zero. A large positive or negative Discrepancy \% suggests a mismatch between our measurements and the published results, indicating potential issues.

To evaluate impact of our algorithm modifications on measured results we use:

\[
\textbf{Increase \%} = \frac{\textbf{Modified} - \textbf{Original}}{\textbf{Original}}
\]

For NDCG@10, a high positive Increase \% is desirable but for query latency, a negative Increase \% is ideal.


\section{Method}

We pursued \textbf{three objectives}: 
(1) Reproduce the results from \cite{zhuang2024setwise}.
(2) Apply the work to additional datasets and LLMs.
(3) Explore potential improvements to the work. 

The key results in \cite{zhuang2024setwise} are summarized in two tables. \textit{Table 2} in \cite{zhuang2024setwise} reports the effectiveness (NDCG@10) and efficiency of various ranking methods tested on the TREC DL 2019 and 2020 datasets, comparing three sizes of the Flan-t5 model (large, xl, and xxl). And \textit{Table 3} in \cite{zhuang2024setwise} presents the effectiveness of zero-shot ranking methods across multiple BEIR benchmark datasets, again comparing the three model sizes.

We began by cloning the repository at \url{https://github.com/ielab/llm-rankers}, as referenced in \cite{zhuang2024setwise}. To streamline experimentation, we wrote scripts to automate Pyserini commands, collect evaluation logs, and load the results into a Python notebook. While awaiting experimental results, we also imported from \cite{zhuang2024setwise} both \textit{Table 2} and \textit{Table 3} into the notebook to prepare for comparative analysis.

For all experiments: 
(1) Initial retrieval used BM25 via the Pyserini library with default settings.
(2) Re-ranking was performed on the top 100 documents retrieved by BM25.
(3) Evaluation focused on the NDCG@10 metric.


\section{Observations: Measured vs. Published}

Running experiments we collected over 3,000 metrics, categorized as follows:
17\% were directly from \cite{zhuang2024setwise},
60\% were measurements to replicate their results,
23\% were new measurements evaluating modifications to their algorithms.
%
Our dataset, along with the Python notebook used for analysis, includes a cached copy of our collected data and many tables and charts. In this section, we present a summary of our efforts to reproduce and improve upon the results in \cite{zhuang2024setwise}. 


\subsection{TrecDL Metric Discrepancy (Figure \ref{fig:Measured_vs_Published_TrecDL_Metric_Discrepancy})}

This chart is a match for \cite{zhuang2024setwise}'s \textit{Table 2} which reports the effectiveness (NDCG@10) and efficiency of various ranking methods tested on the TREC DL 2019 and 2020 datasets. Our chart shows the \textit{Discrepancy \%} in each matching value.

\break

\noindent \textbf{Observations} 
\begin{itemize}
    \item Substantial negative discrepancies ($-96\%$) in inference counts were observed for pointwise methods, indicating potential differences in implementation for inference counting.
    \item Setwise methods show consistent negative discrepancies in generated token counts ($-33\%$ to $-40\%$), likely due to variations in token generation definitions.
    \item NDCG@10 discrepancies were minor (mostly within $\pm3\%$), supporting successful replication of effectiveness results.
    \item Pairwise methods displayed varied discrepancy patterns across metrics, reflecting diverse influences in efficiency metrics.
    \item Patterns of discrepancies were consistent across TREC-DL19 and TREC-DL20 datasets, as well as across model sizes (large, xl, xxl).
    \item Prompt token discrepancies were notably larger for setwise and pairwise methods, suggesting differences in prompt engineering approaches.
\end{itemize}

\noindent \textbf{Causes} 
\begin{itemize}
    \item An investigation revealed that the $-96\%$ discrepancy in pointwise inference counts occurred because \cite{zhuang2024setwise} used batch size 1 for their paper but had their shared code configured for batch size 32. 
    \item Differences in library versions can lead to changes in how operations are implemented or executed.
    \item Dependencies (e.g., TensorFlow, PyTorch) and GPU drivers directly influence model performance.
    \item Pretrained model weights are occasionally updated in public repositories. If downloaded at different times or from different sources, slight differences in initialization could impact token generation and inference.
    \item Even small updates to datasets, such as corrections or added examples, can influence model outputs.
    \item Code available in repositories might not exactly match what was used in the original study. 
\end{itemize}

\noindent \textbf{Assessment}
\begin{itemize}
    \item \textit{Challenges:} Large discrepancies in efficiency metrics (inferences, tokens) and systematic patterns of divergence indicate that some implementation details were not fully replicated.
    \item \textit{Successful Aspects:} The NDCG@10 values, the primary effectiveness metric, show minimal discrepancies, and the relative performance ranking of methods is consistent with the original study.
    \item \textit{Overall Assessment:} This represents a partial replication success. While effectiveness metrics validate the main conclusions, efficiency results highlight the importance of detailed implementation documentation in ensuring replicability in ML research.
\end{itemize}


\begin{figure*}[htbp]
    \centering
    % \includegraphics[width=\linewidth]{_generated/Measured_vs_Published_TrecDL_Metric_Discrepancy.png}
    \includegraphics[width=0.9\linewidth]{img/TrecDL_metrics.png}
    \caption{Six heatmaps compare replication results (of Table 2 in \cite{zhuang2024setwise}) for Flan-T5 models (large, xl, xxl) on TREC-DL19 (left) and TREC-DL20 (right). Rows show model sizes; columns separate datasets. Discrepancies (\%) between measured and published values across four metrics (NDCG@10, inferences, prompt tokens, generated tokens).}
    \label{fig:Measured_vs_Published_TrecDL_Metric_Discrepancy}
\end{figure*}


\subsection{BEIR NDCG@10 Discrepancy (Figure \ref{fig:Measured_vs_Published_BEIR_NDCG@10_Discrepancy})}

This chart matches \cite{zhuang2024setwise}'s \textit{Table 3} which presents the effectiveness of zero-shot ranking methods across multiple BEIR benchmark datasets, again comparing the three model sizes. Our chart shows the \textit{Discrepancy \%} in each matching value.

\break 

\noindent \textbf{Observations} 
\begin{itemize}
    \item Most discrepancies are very small, typically within $\pm2\%$, indicating high agreement between measured and published NDCG@10 values.
    \item The \texttt{flan-t5-xxl} heatmap contains many missing values (white cells), indication incomplete measurements for this model size.
    \item A notable outlier was observed: $-25.5\%$ for the \\
    \texttt{pairwise.bubblesort} method on the SciFact dataset \\
    with \texttt{flan-t5-large}.
    \item Setwise methods tend to show slightly larger discrepancies compared to pointwise and pairwise methods.
    \item Results are more complete for \texttt{flan-t5-large} and \texttt{flan-t5-xl}, providing better coverage of datasets and methods.
    \item Certain datasets, such as Covid and Robust04, exhibit more consistent replication results across methods, while the Signal dataset shows greater variability in discrepancies.
\end{itemize}

\noindent \textbf{Causes}
\begin{itemize}
    \item The high number of missing values for \texttt{flan-t5-xxl} is due to computational resource constraints during the replication effort. Section \ref{sec:gpu_mins} explores this further. 
    
    \item Consistently small discrepancies across most measurements could result from:
    \begin{itemize}
        \item Minor preprocessing differences between the replication and original experiments.
        \item Variations caused by random initialization effects.
        \item Differences in hardware or software environments.
    \end{itemize}
    \item The $-25.5\%$ outlier on SciFact may reflect:
    \begin{itemize}
        \item A possible error in the original reported results.
        \item An unaccounted-for implementation detail specific to the \texttt{pairwise.bubblesort} method.
        \item Dataset-specific preprocessing or handling differences.
    \end{itemize}
\end{itemize}

\noindent \textbf{Assessment}
\begin{itemize}
    \item \textit{Challenges:}
    \begin{itemize}
        \item Incomplete replication for the \texttt{flan-t5-xxl} model due to missing measurements.
        \item A small number of notable outliers, especially the $-25.5\%$ discrepancy for \texttt{pairwise.bubblesort} on SciFact.
        \item Systematic differences in setwise methods could indicate implementation variations not fully captured in the replication.
    \end{itemize}
    \item \textit{Successful Aspects:} 
    \begin{itemize}
        \item Most discrepancies are within $\pm5\%$, demonstrating strong alignment between measured and published values.
        \item The general pattern of results is consistent across datasets, methods, and model sizes where measurements are complete.
        \item Measured discrepancies are systematic and minor, suggesting acceptable implementation differences rather than fundamental issues.
    \end{itemize}
    \item \textit{Overall Assessment:} This replication effort can be considered successful. The small discrepancies (typically within $\pm2\%$) confirm the published results with high fidelity. The exceptions, such as missing values and outliers, do not undermine the overall conclusions but highlight areas for further investigation and emphasize the importance of detailed documentation in ensuring replicability in machine learning research.
\end{itemize}

\begin{figure*}[htbp]
    \centering
    \includegraphics[width=\linewidth]{_generated/Measured_vs_Published_BEIR_NDCG@10_Discrepancy.png}
    \caption{The figure shows three heatmaps comparing replication attempts of NDCG@10 results (from Table 3 in  \cite{zhuang2024setwise}) across eight BEIR datasets. Heatmaps are grouped by Flan-T5 model size (large/xl/xxl). Rows represent ranking methods, columns represent datasets. White cells indicate missing data.}
    \label{fig:Measured_vs_Published_BEIR_NDCG@10_Discrepancy}
\end{figure*}





\subsection{Replication of Effectiveness and Efficiency Tradeoffs}

Figures \ref{fig:tradeoff}(a) and \ref{fig:tradeoff}(b) replicate findings from \cite{zhuang2024setwise} (\textit{Figure 3}) on the impact of two hyperparameters: \(c\), which controls the number of documents compared simultaneously in setwise prompting, and \(r\), the number of sliding window repetitions in listwise prompting. 

Figure \ref{fig:tradeoff}(a) shows the tradeoff between efficiency and effectiveness as \(c\) increases. Higher \(c\) values reduce query latency but may compromise effectiveness due to document truncation caused by LLM input length limitations. Additionally, the heap sort algorithm consistently outperforms bubble sort in efficiency.

Figure \ref{fig:tradeoff}(b) reveals a linear relationship between latency and \(r\). Listwise likelihood, which incorporates setwise prompting, is consistently more effective and efficient than listwise generation.

\begin{figure}[!t]
    \centering
    \begin{subfigure}[b]{0.48\textwidth}
        \centering
    \includegraphics[width=\textwidth]{img/figure3a.png}
        \caption{Setwise}
        \label{fig:3a}
    \end{subfigure}
    \hfill
    \begin{subfigure}[b]{0.48\textwidth}
        \centering
        \includegraphics[width=\textwidth]{img/figure3b.png}
        \caption{Listwise}
        \label{fig:3b}
    \end{subfigure}
    \caption{Effectiveness and efficiency tradeoffs across methods. (a) Setwise: scatter plot numbers indicate documents compared (\(c\)) at each step of the sorting algorithm. (b) Listwise: scatter plot numbers indicate sliding window repetitions (\(r\)).}
    \label{fig:tradeoff}
\end{figure}




\subsection{Replication of Sensitivity to the Initial Ranking}

Previous work has highlighted the sensitivity of Listwise and Pairwise re-ranking methods to the initial ranking order (\cite{pairwise1, Sun2023IsCG}). We evaluated this sensitivity for these methods and the setwise approach using three variations of the BM25 list: (1) original, (2) inverted, and (3) randomly shuffled. 

Figure \ref{fig:robustness} shows results with the Flan-T5-large model. Listwise likelihood (using setwise prompting) demonstrates greater robustness to initial ranking order compared to Listwise generation. Heapsort-based methods (pairwise and setwise) deliver consistent performance across rankings, with setwise slightly outperforming pairwise. Bubblesort-based methods are more affected by initial rankings, though setwise bubblesort is more robust than pairwise. Overall, setwise methods exhibit superior robustness to initial ranking variations.

\begin{figure*}[!t]
    \centering
    \includegraphics[width=\textwidth]{img/figure4.png}
        \caption{Sensitivity to the initial ranking for the Flan-T5-large model.}
        \label{fig:robustness}
\end{figure*}

\section{Observations: NovelEval Performance}

Table \ref{table:noveleval} summarizes our NovelEval benchmarks. Consistent with previous findings, all re-ranking methods outperform BM25, confirming that improvements stem from the models' ranking capabilities. Setwise and pairwise prompting achieve the best performance, with setwise prompting being more efficient. This highlights that setwise prompting enables strong ranking even when the models lack prior topic knowledge.




\begin{table}[!h]
\centering
\caption{Effectiveness and efficiency results obtained on NovelEval dataset. The best NDCG@10 results are highlighted in boldface.}
\label{table:noveleval}
\begin{adjustbox}{width=0.47\textwidth}
% \begin{tabular}{c|l|r|c|c|c|c|c}
\begin{tabular}{c|l|r|r|r|r|r|r}
\hline
 & Methods & NDCG@10 & \#Inferences & Pro. tokens & Gen. tokens & Latency (s) \\
\hline
& BM25 & 0.684 & - & - & - & - \\
\hline
\multirow{8}{*}{\rotatebox[origin=c]{90}{flan-t5-large}}
&pointwise.qlm & 0.691 &	4.0  &	15503.9  &	-  &	0.6 \\
&pointwise.yes\_no & 0.738 & 4.0 & 16394 & - & 0.7 \\
&listwise.generation & 0.776 & 242.1 & 123971.1 & 1230.8 & 32.6 \\
&listwise.likelihood & 0.797 & 	242.1 & 	114045.0 & 	- & 12.8\\
&pairwise.allpair & 0.802 & 	4853.6 & 	3000465.5& 48536.2	 & 426.6 \\
&pairwise.heapsort & 0.811 &	211.6 &	130628.5 &	2115.7 &	17.8\\
&pairwise.bubblesort &0.804 & 658.7  &	406968.7 &	6587.1 &	56.5\\
&setwise.heapsort & 0.806 & 72.4 & 41609.2 & 361.9 & 	5.8 \\
&setwise.bubblesort & \textbf{0.844} & 306.7	 & 175563.7 & 	1533.6 & 	30.0\\
\hline
\multirow{8}{*}{\rotatebox[origin=c]{90}{flan-t5-xl}}
&pointwise.qlm & 0.696 & 4.0 & 	15503.9 & 	- & 	1.2\\
&pointwise.yes\_no & 0.770 & 4.0 & 16394 & - & 	1.3\\
&listwise.generation & 0.777& 242.1& 	123975.4& 	1227.8& 	36.7\\
&listwise.likelihood & 0.814 & 	242.1 & 114064.0 & 	-	& 12.5\\
&pairwise.allpair & \textbf{0.818} & 4853.6 & 	3000465.5 & 	48536.2 & 	521.7 \\
&pairwise.heapsort & 0.815 & 	208.7 & 	128694.6 & 	2086.7 & 	22.4\\
&pairwise.bubblesort & 0.813 & 	549.4 & 	339230.2 & 	5493.8 & 	79.2\\
&setwise.heapsort & 0.789 & 	72.9 & 	41947.1 & 	364.5 & 	7.5\\
&setwise.bubblesort & 0.808 & 	311.8 & 	178694.5 & 	1558.8 & 	31.6\\
\hline
\multirow{8}{*}{\rotatebox[origin=c]{90}{flan-t5-xxl}}
&pointwise.qlm &0.684	&4.0&	15503.9&	-&	3.2\\
&pointwise.yes\_no &0.784 &	4.0 &	16394 &	-	 &3.4\\
&listwise.generation &0.816 &	242.1 &	123975.6 &	1228.2 &	60.0\\
&listwise.likelihood & \textbf{0.825} & 	242.1 & 	114073.4 & 	- & 	32.5\\
&pairwise.allpair & 0.797 & 4853.6 & 	3000465.5 & 	48536.2 & 	944.1 \\
&pairwise.heapsort & 0.778 & 	213.9 & 	132073.9 & 	2139.0 & 	42.4\\
&pairwise.bubblesort & 0.806 & 	718.1 & 	443344.9 & 	7181.4 & 	138.4\\
&setwise.heapsort & 0.808 & 	72.9	 & 41988.6 & 	364.3 & 	14.3\\
&setwise.bubblesort & 0.818 & 	302.8 & 	173491.1 & 	1513.8 & 	59.6\\
\hline
\end{tabular}
\end{adjustbox}
\end{table}


\section{Observations: Fine-Tuned Model Performance}
We explored the impact of model fine-tuning by comparing base models (Llama 3.1 8B, Llama 2 7B/13B) with their instruction-tuned (Llama 3.1 8B-Instruct) and conversationally fine-tuned (Vicuna 7B/13B) versions. As shown in Figure \ref{fig:tuning}, fine-tuned models consistently improved NDCG@10 without significant latency increase, suggesting fine-tuning enhances ranking capabilities even without explicit ranking optimization.


\begin{figure*}[htbp]
    \centering
    \includegraphics[width=0.9\textwidth]{instruction_tuned_models.png}
        \caption{Effectiveness (NDCG@10) and efficiency (Latency (s)) comparison of base models (pictured with `X') and their fine-tuned counterparts (pictured with `O').}
        \label{fig:tuning}
\end{figure*}

\section{Observations: Modified vs Original}

We explored \textbf{prompt tuning} the pointwise, pairwise and setwise algorithms as shown in Figure \ref{fig:prompt1}, Figure \ref{fig:prompt2}, Figure\ref{fig:prompt3}, and Figure \ref{fig:prompt4}. In this section we compare versions of pointwise, pairwise and setwise that use our modified prompts to the original versions using the \textbf{Increase \%} metric from Section \ref{sec:metrics}.

\break

\subsection{BEIR NDCG@10 Increase (Figure \ref{fig:Modified_vs_Original_BEIR_NDCG@10_Increase})}

\begin{figure*}[htbp]
    \centering
    \includegraphics[width=0.99\linewidth]{_generated/Modified_vs_Original_BEIR_NDCG@10_Increase.png}
    \caption{Heatmaps show percentage changes in NDCG@10 scores when prompts for re-ranking methods were modified. Rows represent methods, columns are BEIR datasets, and each heatmap corresponds to a Flan-T5 model size (large/xl).}
    \label{fig:Modified_vs_Original_BEIR_NDCG@10_Increase}
\end{figure*}


\noindent \textbf{Observations}
\begin{itemize}
    \item Setwise methods show consistently larger positive changes, particularly on Touche and SciFact datasets.
    \item A significant improvement of $40.7\%$ is observed for pairwise.bubblesort on SciFact using the Flan-T5-large model.
    \item Pointwise methods often exhibit modest or negative changes, indicating relative insensitivity to prompt modifications.
    \item Datasets such as Touche and SciFact demonstrate higher sensitivity to prompt variations, leading to notable improvements.
    \item The xl model displays more stable and consistent changes compared to the large model, highlighting greater robustness.
    \item Certain method-dataset combinations achieve improvements exceeding $10\%$, emphasizing the impact of prompt changes.
    \item Flan-T5-large generally yields more pronounced improvements than xl, suggesting size-specific dynamics.
\end{itemize}

\noindent \textbf{Causes}
\begin{itemize}
    \item Larger improvements for setwise methods imply that original prompts were suboptimal for these techniques, allowing room for optimization.
    \item Dataset-specific sensitivities may reflect task or domain characteristics affecting performance.
    \item The xl model's stability suggests that larger models have more robust representations, making them less affected by prompt variations.
    \item Dramatic improvements for SciFact could indicate that original prompts overlooked domain-specific needs, making changes particularly effective.
    \item Pointwise methods’ modest changes suggest less dependence on or responsiveness to prompt engineering compared to other methods.
\end{itemize}


\noindent \textbf{Evaluation of Modifications}
\begin{itemize}
    \item \textit{Challenges:}
    \begin{itemize}
        \item Performance gains are inconsistent, with some methods and datasets showing reduced performance.
        \item Many changes are minor (under $5\%$), questioning the modifications' overall impact.
        \item Divergent behavior between large and xl models raises concerns about generalizability across architectures.
        \item Results may not extrapolate to untested datasets or models, limiting the changes' broader applicability.
    \end{itemize}
    \item \textit{Successful Aspects:}
    \begin{itemize}
        \item Substantial gains exceeding $10\%$ in key scenarios, with a $40.7\%$ improvement for setwise.heapsort on SciFact, demonstrate the modifications' effectiveness.
        \item Over all datasets, setwise methods appears to have benefited the most from the modified prompts. 
        \item Consistent positive outcomes for the xl model imply robustness and scalability of improvements.
        \item Improvements span multiple datasets for certain methods, showing generalizability across domains.
        \item Worst-case declines are limited to $-7\%$, avoiding catastrophic performance degradations.
    \end{itemize}
\end{itemize}


\noindent \textbf{Assessment:}
The prompt modifications show clear benefits, particularly for setwise methods. Key evidence includes:
\begin{enumerate}
    \item Substantial improvements, including a $40\%$ gain for pairwise.bubblesort, outweigh modest degradations.
    \item The xl model’s consistent results suggest the changes scale well with larger architectures.
    \item Gains for newer methods indicate potential for further optimization through prompt engineering.
    \item Limited degradations (no worse than $-7\%$) ensure that the modifications do not introduce significant trade-offs.
\end{enumerate}

While the our prompt modifications are not universally effective, they yield substantial benefits in specific method-dataset combinations, demonstrating significant potential without severe downsides.


\subsection{BEIR Metric Increase (Figures \ref{fig:Modified_vs_Original_BEIR_Metric_Increase_1} and \ref{fig:Modified_vs_Original_BEIR_Metric_Increase_2}) }

\begin{figure*}[htbp] 
    \centering 
    \includegraphics[width=0.9\linewidth]{_generated/Modified_vs_Original_BEIR_Metric_Increase_1.png} 
    \caption{Eight paired heatmaps show the effect of prompt changes on reranking methods. Each pair compares flan-t5-large (left) and flan-t5-xl (right) across four BEIR datasets (Covid, Touche, News, Signal). Heatmaps display percentage changes in NDCG@10, inferences, prompt tokens, and generated tokens, based on our replication baseline.}
    \label{fig:Modified_vs_Original_BEIR_Metric_Increase_1} 
\end{figure*} 

\begin{figure*}[htbp] 
    \centering
    \includegraphics[width=0.9\linewidth]{_generated/Modified_vs_Original_BEIR_Metric_Increase_2.png} \caption{Eight paired heatmaps show the effect of prompt changes on reranking methods. Each pair compares flan-t5-large (left) and flan-t5-xl (right) across four BEIR datasets (Robust04, NFCorpus, DBPedia, SciFact). Heatmaps display percentage changes in NDCG@10, inferences, prompt tokens, and generated tokens, based on our replication baseline.} \label{fig:Modified_vs_Original_BEIR_Metric_Increase_2} 
\end{figure*}


\noindent \textbf{Observations} 
\begin{itemize}
    \item \textit{Model Size Matters:} flan-t5-large and flan-t5-xl models often display different, sometimes opposite patterns of changes in metrics. 
    \item \textit{Metric Correlations:} Changes in inference counts often correlate with changes in generated tokens, suggesting an interdependence between these metrics.
    \item \textit{Dataset Sensitivity:} Certain datasets, such as Robust04 and SciFact, exhibit more dramatic changes, indicating varying levels of impact based on dataset characteristics.
    \item \textit{Method-Specific Patterns:}
    \begin{itemize}
        \item Pointwise methods show minimal changes in inference counts, highlighting stability in efficiency.
        \item Pairwise methods often exhibit larger changes across all metrics, reflecting higher sensitivity to prompt modifications.
        \item Setwise methods show mixed results, with some instances of dramatic efficiency gains.
    \end{itemize}
    \item \textit{Efficiency-Effectiveness Tradeoff:} Some methods achieve simultaneous NDCG@10 improvements and reductions in computational costs, pointing to potential optimization opportunities.
\end{itemize}

\noindent \textbf{Causes}
\begin{itemize}
    \item \textit{Model Size Differences:} Divergent patterns between flan-t5-large and flan-t5-xl may reflect:
    \begin{itemize}
        \item Optimal prompting strategies varying by model capacity.
        \item Greater robustness of larger models (e.g., flan-t5-xl) to prompt variations.
    \end{itemize}
    \item \textit{Dataset-Specific Variations:} Differences across datasets could be due to:
    \begin{itemize}
        \item Domain-specific language characteristics influencing prompt effectiveness.
        \item Varying complexity in the underlying ranking tasks.
    \end{itemize}
    \item \textit{Method-Specific Patterns:} Discrepancies might arise from:
    \begin{itemize}
        \item Differences in prompt dependency across ranking methods.
        \item Variations in optimization opportunities depending on architectural choices.
    \end{itemize}
\end{itemize}

\noindent \textbf{Evaluation of Modifications}
\begin{itemize}
    \item \textit{Challenges:}
    \begin{itemize}
        \item Improvements are inconsistent across datasets and models, making generalization difficult.
        \item Some significant degradations occur in efficiency metrics, raising concerns about reliability.
    \end{itemize}
    \item \textit{Successful Aspects:}
    \begin{itemize}
        \item Several methods show simultaneous effectiveness and efficiency gains, demonstrating potential for improvement.
        \item Dramatic improvements (e.g., $>30\%$) are observed in some cases, highlighting areas of opportunity.
        \item Optimization potential is evident in ranking methods, supporting further exploration.
        \item No catastrophic failures suggest the approach is fundamentally sound.
        \item Some consistent patterns across datasets and methods provide actionable insights for refinement.
    \end{itemize}
\end{itemize}

\noindent \textbf{Overall Assessment:} 
The results show promise but also highlight risks and limitations. Dataset and model-specific optimization appears more effective than generalized prompt modifications. Inconsistencies across datasets and models indicate that a one-size-fits-all approach is unlikely to succeed. A nuanced strategy that accounts for dataset characteristics and model capacity is more practical. While degradation risks are present, the potential for significant improvements justifies further investigation when modifications are carefully matched to the use case.


\section{Conclusion}

This study contributes to zero-shot document ranking with Large Language Models (LLMs) in three key ways. 

First, our replication of \cite{zhuang2024setwise} confirms the effectiveness of their approach while revealing discrepancies in efficiency metrics. We aligned closely with the original study on ranking performance (NDCG@10 within ±3\%) but observed notable differences in efficiency, including a 96\% reduction in inference counts for pointwise methods (which we now know is due to differences in batch size 1 vs 32) and a 33\%-40\% decrease in token usage for setwise methods. These findings underscore the need for precise implementation documentation in machine learning research.

Second, our experiments on the NovelEval dataset show the robustness of LLM-based ranking methods when addressing queries with information beyond the models’ training cutoff dates. All methods outperformed the BM25 baseline, with setwise and pairwise approaches excelling. This result highlights the strong generalization ability of LLMs, even for unfamiliar topics.

Third, our exploration of prompt engineering and model fine-tuning demonstrates substantial potential for improvement. Prompt modifications led to up to 40.7\% gains in NDCG@10 for certain method-dataset combinations, especially benefiting setwise methods. Fine-tuning experiments across models like Llama 3.1 and Llama 2 showed consistent gains without major computational costs. These results suggest that tailored optimization strategies outperform one-size-fits-all approaches.

These findings offer guidance for both research and practical applications. Researchers should prioritize comprehensive documentation and hardware transparency to ensure reproducibility. Practitioners can achieve significant performance improvements through prompt engineering and model selection, even with limited computational resources. However, our work also highlights challenges in generalizing improvements across datasets and models, reinforcing the need for context-specific optimizations.


\bibliographystyle{ACM-Reference-Format}
\bibliography{main_0010}

\appendix


\section{APPENDIX: Relation to Class Material}

The lecture slides on ranking and learning significantly complement the project's exploration of LLM-based document ranking. The coverage of loss function design strategies -- pointwise, pairwise, and listwise approaches -- parallels the ranking methods discussed in our project. Both highlight how these fundamental approaches can be applied whether using traditional machine learning or modern LLMs. The slides' theoretical foundation helps contextualize our project's practical implementation of zero-shot LLM ranking within the broader field of learning-to-rank methodologies.


% \section{APPENDIX: Modified LLM Prompts}

\begin{figure}[htbp]
    \centering
    % \includegraphics[width=0.8\textwidth] 
    \includegraphics[width=0.4\textwidth]{img/pointwise_yes_no_prompt.jpg}
    \caption{}
    \label{fig:prompt1}
\end{figure}

\begin{figure}[htbp]
    \centering
    % \includegraphics[width=0.8\textwidth] 
    \includegraphics[width=0.4\textwidth]{img/pointwise_qlm_prompt.jpg}
    \caption{}
    \label{fig:prompt2}
\end{figure}

\begin{figure}[htbp]
    \centering
    % \includegraphics[width=0.8\textwidth] 
    \includegraphics[width=0.4\textwidth]{img/pairwise_prompt.jpg}
    \caption{}
    \label{fig:prompt3}
\end{figure}

\begin{figure}[htbp]
    \centering
    % \includegraphics[width=0.8\textwidth] 
    \includegraphics[width=0.4\textwidth]{img/setwise_prompt.jpg}
    \caption{}
    \label{fig:prompt4}
\end{figure}



\section{APPENDIX: GPU Minutes (Figure \ref{fig:Measured_vs_Published_BEIR_GPU_Minutes})}
\label{sec:gpu_mins}

\begin{figure*}[htbp] 
    \centering 
    \includegraphics[width=0.9\linewidth]{_generated/Measured_vs_Published_BEIR_GPU_Minutes.png} 
    \caption{GPU computation time (in minutes) required to evaluate different re-ranking methods across eight BEIR datasets. The heatmaps are organized by Flan-T5 model size (large/xl/xxl from top to bottom). Each cell represents the total GPU minutes required for a specific method-dataset combination. Color intensity corresponds to computational demand, with darker reds indicating longer processing times. Missing values (denoted by "-") indicate experiments that weren't completed. The layout corresponds to \textit{Table 3} in \cite{zhuang2024setwise}, allowing direct comparison between computational costs and reported NDCG@10 performance.}
    \label{fig:Measured_vs_Published_BEIR_GPU_Minutes}
\end{figure*} 

\noindent \textbf{Observations} 
\begin{itemize}
    \item \textit{Efficiency Tiers:} Pointwise experiments methods were the fastest (3-22 minutes), followed by listwise methods (20-100 minutes), with pairwise methods being the slowest (often exceeding 200 minutes).
    \item \textit{Model Size Impact:} 
    \begin{itemize}
        \item Substantial computation increase for complex methods as model size grew.
        \item It appears there is minimal computation increase from large to xl for simple methods however to fully use our resources we ran two XL experiments per GPU and four large model experiments per GPU. 
        \item Very limited xxl experiments were completed. Experiments with xxl models frequently crashed due to insufficient GPU memory despite having the entire 24GB GPU.
    \end{itemize}
    \item \textit{Dataset Impact:} 
    \begin{itemize}
        \item DBPedia was consistently the most time-consuming dataset.
        \item News datasets were generally the fastest to process.
        \item There was a 5-10x variation in computation time for the same method across different datasets.
    \end{itemize}
    \item \textit{Setwise vs Pairwise:} Setwise methods showed moderate efficiency improvements over pairwise methods.
\end{itemize}




\section{APPENDIX: GPU Resources}

In their paper \cite{zhuang2024setwise} state: ``We carried out the efficiency evaluations on a local GPU workstation equipped with an AMD Ryzen Threadripper PRO 3955WX 16-Core CPU, a NVIDIA RTX A6000 GPU with 49GB of memory, and 128GB of DDR4 RAM.'' 

Our research was carried out using NVIDIA A100s and RTX 4090 GPUs. Figure \ref{fig:rep_hw} shows the hardware we used to reproduce results and Figure \ref{fig:mod_hw} shows the hardware we used to measure the impact of our prompt modifications. 


\begin{figure}[htbp]
    \centering
    % \includegraphics[width=0.8\textwidth] 
    \includegraphics[width=0.4\textwidth]{img/vastai.png}
    \caption{Hardware configurations of RTX 4090 GPU instances used for baseline replication experiments. Each instance features 24GB VRAM, with varying CPU configurations including Intel Xeon E5-2680/2690 v4 and AMD Ryzen processors. The systems achieve between 81.4-82.6 TFLOPS of computing performance.}
    \label{fig:rep_hw}
\end{figure}


\begin{figure}[htbp]
    \centering
    % \includegraphics[width=0.8\textwidth] 
    \includegraphics[width=0.4\textwidth]{img/vastai2.png}
    \caption{Hardware specifications of the NVIDIA RTX 4090 GPU instances used for experiments with modifications. The systems feature AMD processors (including Ryzen 9, EPYC 7302, and Threadripper) paired with 24GB VRAM GPUs delivering 81.4-82.2 TFLOPS of computing performance.}
    \label{fig:mod_hw}
\end{figure}



\end{document}

