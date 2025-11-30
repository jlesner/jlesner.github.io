PROJECT: “DBDoctor: LLM-Aided SMT Refutation of SQL Query Equivalence”   
   1. INSTRUCTOR: Professor Xifeng Yan and and Distinguished Professor Amr El Abbadi at UCSB  
   2. COURSE: The project started in CMPSC 291A Special Topics in Foundation Models: This graduate-level research course focuses on foundation models, specifically Large Language Models (LLMs). Throughout the course, we will examine the latest research publications in this rapidly evolving field, with a particular emphasis on the foundations of LLMs and their applications. Students are expected to engage in reviewing and presenting research papers, and completing a substantial course project. The primary objective of this course is to cultivate a deep understanding of LLMs and their limitations.  
   3. Writeup: [https://www.overleaf.com/project/6905a204e42ec15cbcf613cf](https://www.overleaf.com/project/6905a204e42ec15cbcf613cf)  
   4. Working with Dr. Fuheng Zhao and Dr. Yan this work is in the process of getting submitted to International Conference on Computer Aided Verification (CAV 2026\)  
   5. If I continued this line of work, a possible next step  
   6. The hardest part of this project was to


\begin{document}
%
\title{LLM-Aided SMT Refutation of\\SQL Query Equivalence}

\author{Jasmine Lesner\inst{1} \and
Fuheng~Zhao\inst{1} \and
 Xifeng~Yan\inst{1} \and
 Amr~El~Abbadi\inst{1}}
%
\authorrunning{Lesner et al.}
% First names are abbreviated in the running head.
% If there are more than two authors, 'et al.' is used.
%
\institute{University of California, Santa Barbara 
\email{\{jlesner,fuheng\_zhao,xyan,amr\}@cs.ucsb.edu}\\
}
%
\maketitle   
\begin{abstract}
Automated optimization of SQL queries hinges on knowing when a rewritten query remains semantically equivalent to the original. Yet many formal verification tools, while rigorous, cannot handle features common in modern SQL (e.g., window functions), leaving large portions of real workloads outside their scope. This paper presents \textsc{DBDoctor}, an computer-aided verification system that uses Large Language Models (LLMs) to rewrite unsupported SQL into verifier-friendly forms and then delegates refutation to a state-of-the-art SMT-based SQL equivalence checker. The verifier’s counterexamples are validated against the original queries, creating a self-correcting loop. We show that our LLM aided approach extends verifier coverage to previously unsupported queries, discovers new counterexamples missed under practical time budgets, and remains consistent with the SMT-based verifier where it already succeeds. For database systems, this capability enables safer query optimization, regression testing of query rewrites, and guardrails for automated tuning -- impacting reliability and cost at scale -- while also exemplifying how LLMs can be combined with formal reasoning.

\keywords{SQL Equivalence Verification \and Large Language Models (LLM)\and SMT Solvers \and Database Systems \and Formal Verification \and Computer-Aided Verification.}
\end{abstract}

\section{Introduction}

Our computer aided verification system, called \textsc{DBDoctor} (Fig \ref{fig:oloop}), uses an LLM to rewrite SQL queries containing constructs unsupported by formal SMT verifiers into semantically aligned, verifier-compatible forms, and then delegates the refutation step to SMT verification (e.g., VeriEQL \cite{yang2024verieql}) to produce counterexamples. Crucially, any counterexample found on the rewritten pair is validated against the original queries, forming a self-correcting loop that accepts only counterexamples that show non-equivalence of the original SQL (Fig \ref{fig:rewriting_loop}). This design brings several benefits: (i) it broadens the effective domain of formal SQL checkers without changing their core SMT engines, (ii) it preserves rigor by employing SMT reasoning, and (iii) it yields actionable artifacts (counterexample databases) that are useful for debugging query rewrites.

\begin{figure}[t]
\centering
\includegraphics[width=.7\linewidth]{diagram/oloop_0025.png}
\caption{\textsc{DBDoctor}'s workflow is an iterative cycle where the system generates SQL query verification requests and database commands. This continuous feedback loop enables data-driven behavior based on empirical evidence from database tests and SQL verifier results. Our implementation employs a mix of OpenAI's tool-calling \textsc{gpt-4.1-mini} and \textsc{o4-mini} `thinking' models \cite{openai2024gpt4technicalreport}.}
\label{fig:oloop}
\end{figure}

\begin{figure*}[htb]
\centering
\includegraphics[width=1\linewidth]{diagram/rewrite_loop_0011.png}
\caption{
The core workflow of \textsc{DBDoctor} combines heuristic SQL rewriting by an LLM with formal analysis by an SMT based SQL equivalence verifier.
In this example, two queries ($Q_1, Q_2$) with unsupported window functions are rewritten into equivalent forms ($Q_1', Q_2'$) that use only verifiable SQL constructs.
The SQL verifier can then process the rewritten pair to find a counterexample, proving non-equivalence.
A crucial final step is to validate this counterexample against the original queries ($Q_1, Q_2$).
If the counterexample is invalid for the original pair, the LLM is prompted to generate a new rewrite, creating a self-correcting loop.
}
\label{fig:rewriting_loop}
\end{figure*}
% \FloatBarrier

\subsection{Related Work}

The intersection of LLMs and databases is a rapidly growing field, especially for text-to-SQL generation and automated optimization \cite{leis2015good,yao2025query,tan2025large,sun2024rbot}.
A common theme in optimization is ensuring that a rewritten query is equivalent to the original.
Some approaches involve having LLMs select from a predefined set of trusted rewrite rules \cite{li2024llmr} or use a formal verifier to check LLM-generated optimizations \cite{dharwada2025query}.
However, these strategies are limited; a fixed set of rules constrains novelty and may contain bugs, while existing verifiers support only a limited subset of SQL, leaving most complex, real-world queries unverified \cite{yang2024verieql}.
The task of verifying SQL equivalence is a well-known, undecidable problem in computer science.

Research has produced two main classes of tools:
\begin{enumerate}

\item \textit{Bounded} verification tools like Cosette \cite{chu2017cosette}, Qex \cite{veanes2010qex}, and VeriEQL \cite{yang2024verieql} support a subset of SQL and aim to prove or disprove equivalence for database instances up to a certain size, producing a concrete counterexample if non-equivalence is found.

\item \textit{Unbounded} verification tools like SPES \cite{zhou2022spes} and HoTTSQL \cite{chu2017hottsql} attempt to prove equivalence for all possible database instances but are typically restricted to an even smaller subset of SQL.

\end{enumerate}

This leaves a significant gap between what can be formally verified and the types of queries used in practice.
Recent studies have investigated using LLMs directly for SQL equivalence checking, with prompting techniques like \textit{Miniature \& Mull} \cite{zhao2023llmsqlsolver} and providing execution plans as context \cite{singh2024exploringllms}.
While these approaches show LLMs can offer valuable heuristic insights, they also suffer from factual hallucination and instability.
Crucially, prior work has not explored an workflow where an LLM can actively use tools or run experiments to validate its hypotheses.
Our work builds on these insights by creating a symbiotic system where LLM intuition is disciplined by the rigor of formal methods and grounded by empirical feedback from a live database.

\subsection{Contributions}

This paper’s contributions, evaluated on realistic SQL query pairs, are:

\begin{itemize}
\item \textbf{A verification-first agentic framework.} We design \textsc{DBDoctor}, which integrates LLM-guided rewriting with a formal SQL verifier and empirical validation, using the verifier as a source of counterexamples.

\item \textbf{Coverage extension via rewrite-to-verify.} We introduce a method that rewrites complex, unsupported SQL into SMT verifier-compatible forms without requiring changes to the verifier, thereby expanding its effective coverage.

\item \textbf{Counterexample-driven soundness checks.} We show that verifier-produced counterexamples on rewritten queries can be validated against the original pair, filtering spurious rewrites and yielding actionable counterexamples of non-equivalence.

\item \textbf{Practical impact for database tooling.} Our evaluation demonstrates extended coverage on previously unsupported SQL query pairs, discovery of additional counterexamples, and agreement with the SMT verifier where it already succeeds -- supporting safer optimizer rule deployment, automated tuning guardrails, and regression testing in practice.
\end{itemize}

\section{Methodology}\label{sec:method}

We formalize the problem as follows. Given two SQL queries $Q_1$ and $Q_2$ (often an ``optimized'' candidate vs.\ a reference), determine whether $Q_1 \equiv Q_2$ under relational semantics. Let $\mathcal{V}$ be a SQL  verifier (e.g., VeriEQL~\cite{yang2024verieql}) that accepts only a subset of SQL. Let $\mathcal{S}$ denote that supported SQL subset and let $\mathcal{R}$ be a rewriting procedure driven by an LLM that attempts to map $(Q_1,Q_2)$ to $(Q_1',Q_2') \in \mathcal{S}\times\mathcal{S}$ while \emph{preserving the intended semantics of both queries in lockstep}. Concretely, the LLM is instructed that any structural change introduced to make one side verifiable must be symmetrically applied to the other side to maintain a plausible equivalence relation.

\noindent\textbf{Refutation-by-rewrite loop}\quad (Fig \ref{fig:rewriting_loop})
\begin{enumerate}
\item \textbf{Rewrite.} Use the LLM to propose $(Q_1',Q_2')$ with only constructs in $\mathcal{S}$, conserving schema and inputs.
\item \textbf{Verify.} Submit $(Q_1',Q_2')$ to $\mathcal{V}$. If $\mathcal{V}$ produces a bounded counterexample instance $I$ witnessing $Q_1'(I)\neq Q_2'(I)$, proceed; otherwise, adapt the LLM prompt and attempt a new rewrite or return \textsc{non-refuted}.
\item \textbf{Validate on originals.} Execute $Q_1$ and $Q_2$ on the same $I$. If $Q_1(I)\neq Q_2(I)$, return \textsc{refuted} with counterexample $I$; else, reject the spurious counterexample and continue the loop.
\end{enumerate}

\noindent\textbf{Soundness for refutation (w.r.t.\ concrete execution)}\quad
The system reports \textsc{refuted} only when it has validated a counterexample $I$ such that $Q_1(I)\neq Q_2(I)$ on the original queries. Hence, any reported counterexample is a true behavioral discrepancy under standard SQL execution. Completeness is not claimed: if no rewrite lands in $\mathcal{S}$ or the verifier times out, the system may return \textsc{non-refuted} even when the queries differ.

\noindent\textbf{Design choices}\quad
(i) \emph{Verifier-centric correctness:} the LLM proposes hypotheses; $\mathcal{V}$ and the database executor arbitrate correctness. 
(ii) \emph{Minimal engineering to extend coverage:} we leverage existing engines (e.g., VeriEQL’s SMT procedures) without modifying them, expanding their effective coverage via rewrite-to-verify. 
(iii) \emph{Actionable artifacts:} validated counterexamples are concrete databases, useful for optimizer debugging, rule regression tests, and CI pipelines in practice.

\begin{figure}[htbp]
\centering
\includegraphics[width=1\linewidth]{diagram/results_0030.png}
\caption{\textbf{Performance of \textsc{DBDoctor} vs.\ VeriEQL, with per-pair detail.} \emph{Top Middle:} Running VeriEQL on the full LeetCode set (n=23{,}994) yields 22.9\% unsupported, 62.1\% non-refuted, and 15.0\% refuted query pairs. These three buckets define our evaluation subsets. \emph{Bottom (2x3 panels):} For each bucket (Subset~1: unsupported; Subset~2: non-refuted; Subset~3: refuted), we sample 100 query pairs and run four methods (Methods~1–4). In each panel, the \emph{upper bar chart} summarizes outcomes for the 100 pairs, while the \emph{heatmap} directly below shows the same results at per-pair resolution: each column is a method, each row is a query pair, and colors match the legend (red = unsupported, yellow = non-refuted, green = refuted). The bar heights are the marginal proportions of colored cells in the heatmap beneath them—i.e., the bar chart is an aggregate view of the per-pair matrix. These results show that \textsc{DBDoctor} expands verifier coverage on previously unsupported pairs (Subset~1), discovers additional counterexamples in non-refuted pairs (Subset~2), and remains consistent with the verifier on refuted pairs (Subset~3).}
\label{fig:results}
\end{figure}

\subsection{Methods Compared}

To isolate component contributions we compare:
\begin{itemize}
\item \textbf{Method~1 (LLM Only):} search for counterexamples without tools.
\item \textbf{Method~2 (LLM + Database):} executes candidates against a DB to guide counterexample search.
\item \textbf{Method~3 (LLM + SQL Verifier):} rewrite-to-verify loop using $\mathcal{V}$.
\item \textbf{Method~4 (LLM + DB + Verifier):} full system with verifier and database validation.
\end{itemize}

\subsection{Benchmark Dataset}

We evaluate against VeriEQL \cite{yang2024verieql} using the LeetCode corpus (23{,}994 pairs) curated in \cite{yang2024verieql}, where each candidate is paired with a known-correct reference. Queries are complex and representative of practical patterns; we repair minor scraping errors and adapt to PostgreSQL when necessary.

\subsection{Evaluation Protocol}

We first run VeriEQL for up to 10 minutes per pair, reproducing \cite{yang2024verieql}, and partition into \textbf{Unsupported}, \textbf{Non-refuted}, and \textbf{Refuted}. From each bucket we sample $n=100$ pairs (margin of error $\approx\pm 10\%$ at 95\% confidence) and apply Methods~1–4. We study: (i) \emph{Coverage} (\% pairs not \textsc{unsupported}); (ii) \emph{Refutation rate}; and (iii) \emph{Agreement} with VeriEQL on the Refuted bucket. All reported refutations include validated concrete counterexamples.

\section{Results}\label{sec:results}

Our experimental results are presented in Figure \ref{fig:results}. The experiments test four methods across three distinct subsets of query pairs, with each method tested on the same sample of 100 pairs per subset.

\paragraph*{Subset 1: Unsupported}
This tests coverage extension -- the central goal. Method~4 reduces \textsc{unsupported} from 100\% to 1\% and refutes 47\% of pairs, demonstrating that rewrite-to-verify plus DB validation converts many previously out-of-scope instances into actionable refutations. Method~2 also performs strongly (47\% refuted, 4\% unsupported), indicating that empirical execution substantially helps the LLM search; Method~3 sometimes fails to produce verifier-acceptable rewrites (9\% unsupported), underscoring the benefit of database feedback.

\paragraph*{Subset 2: Non-refuted}
Here we test whether the system can uncover counterexamples that time-bounded VeriEQL missed. Method~1 refutes 15\% of pairs, while Methods~2–4 each achieve 13\% refutation under the same budget, showing that LLM assistance can expose subtle inequivalences even when a SOTA verifier times out or yields \textsc{non-refuted}. Because every reported counterexample is validated on the originals, these are genuine defects.

\paragraph*{Subset 3: Refuted}
Methods~3 and~4 (those invoking $\mathcal{V}$) achieve 100\% agreement -- every VeriEQL refutation is reproduced. Methods without the verifier are weaker: Method~2 refutes 83\%, Method~1 refutes 81\%, highlighting the value of formal reasoning when the problem lies squarely within the verifier’s native coverage.
\FloatBarrier

\section{Discussion}\label{sec:discussion}

\paragraph*{Application domain and impact}
Database engines and data platforms increasingly apply automated rewrites -- cost-based rules, ML-guided tuning, and human-authored transformations -- to control latency and resource cost. A single wrong rewrite can silently corrupt analytics, violate compliance filters, or miscompute business metrics. By furnishing \emph{validated} counterexamples for inequivalent rewrites, \textsc{DBDoctor} provides (i) a guardrail for auto-tuners and LLM assistants, (ii) a regression oracle for optimizer rules, and (iii) a forensic tool for triaging customer-reported inconsistencies. For operators, this translates to lower incident rates and reduced compute spend via safe optimization; for researchers, it demonstrates how LLMs can be used to extend the practical coverage of SMT-based SQL verification.

\paragraph*{Why the loop works}
LLM-driven rewrites need not be perfect; they must only land inside the verifier’s coverage while preserving the \emph{relative} transformation across both queries. The verifier excels at \emph{refutation}; when it produces a counterexample, we confirm it on the originals, filtering out artifacts of imperfect LLM rewrites. This division of labor leverages complementary strengths: LLMs to reach $\mathcal{S}$, SMT verification for reasoning, and database execution for final judgment.

\paragraph*{Limitations}
Completeness is bounded by (i) the SMT verifier’s scope and timeouts, (ii) the LLM’s ability to find a semantics-preserving pair in $\mathcal{S}$, and (iii) nondeterminism and list semantics (Section~\ref{sec:futurework}), where simple set-based equality can be misleading. Nevertheless, the refutation results are sound due to database validation.

\section{Future Work}\label{sec:futurework}

\paragraph*{List Semantics}
Current result comparison uses set semantics; outermost \texttt{ORDER BY} requires list semantics to avoid false equivalence (Listings~\ref{lst:q1}–\ref{lst:q3}). Extending validation with stable-order checks -- and teaching $\mathcal{R}$ to preserve or align order constraints -- would strengthen guarantees.

\begin{lstlisting}[language=SQL, caption={$Q_1$: A query with a guaranteed ordering.}, label={lst:q1}]
SELECT id, name, salary
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;
\end{lstlisting}

\begin{lstlisting}[language=SQL, caption={$Q_2$: A query with no guaranteed ordering.}, label={lst:q2}]
SELECT * FROM (
    SELECT id, name, salary
    FROM employees
    WHERE department = 'Engineering'
) AS engineering_employees;
\end{lstlisting}

\begin{lstlisting}[language=SQL, caption={$Q_3$: A query where ordering is not guaranteed to be preserved.}, label={lst:q3}]
SELECT * FROM (
    SELECT id, name, salary
    FROM employees
    WHERE department = 'Engineering'
    ORDER BY salary DESC
) AS engineering_employees;
\end{lstlisting}
\FloatBarrier

\paragraph*{Handling Non-Deterministic Queries}
We plan to model common nondeterminism sources (unordered \texttt{LIMIT}, ties in \texttt{ORDER BY}, non-deterministic functions, floating-point aggregation; Listings~\ref{lst:limit}–\ref{lst:float}) so that counterexamples must be robust across admissible executions, not just a single run.

\begin{lstlisting}[language=SQL, caption={An unordered query with a `LIMIT' clause is non-deterministic.}, label={lst:limit}]
WITH Employees (EmployeeID, Name, Department) AS (
    SELECT 1, 'Alice', 'Engineering'
    UNION ALL
    SELECT 2, 'Bob', 'Engineering'
)
SELECT EmployeeID, Name, Department
FROM Employees
LIMIT 1;
\end{lstlisting}

\begin{lstlisting}[language=SQL, caption={Floating-point arithmetic can be non-deterministic.}, label={lst:float}]
WITH number_set (id, val) AS (
  VALUES
    (1,  1e18::double precision), 
    (2, -1e18::double precision), 
    (3,  1.0::double precision) 
)
SELECT
    -- result_a is 1.0 since the large numbers cancel
    SUM(val ORDER BY id ASC) AS result_a,
    -- result_b is 0.0, since the small number is lost
    SUM(val ORDER BY val DESC) AS result_b,
    -- result_c is unknown due to unspecified  order
    SUM(val) AS result_c
FROM
    number_set;
\end{lstlisting}

\paragraph*{Leveraging the Small-Scope Hypothesis}
Timeouts in bounded verification suggest exploring counterexample downscaling and upscaling strategies informed by the small-scope hypothesis \cite{miao2019explaining,yang2024verieql}, converting hard instances into tractable ones without losing discriminative power.

\paragraph*{Tree-Structured LLM Interaction}
Rather than a single linear history (Fig.~\ref{fig:linear_tree_llm_interaction}), a tree-of-thoughts exploration \cite{yao2023tree} could expand several rewrite candidates in parallel and prioritize promising branches by verifier feedback.

\begin{figure}[H]
    \centering
    \includegraphics[width=\linewidth]{diagram/linear_tree_0010.png}
    \caption{Our current approach uses a linear interaction pattern which grows the LLM context with each LLM response until a successful answer is discovered or number of attempts is exhausted. One future direction is investigating how to run parallel LLM attempts organized in a tree.}
    \label{fig:linear_tree_llm_interaction}
\end{figure}


\paragraph*{Improving Contextual Framing}
Schema translation to familiar canonical domains (e.g., employees/products) may help the LLM reason about subtle semantic differences \cite{hua2024disentangling,lampinen2024language}.

\paragraph*{Automatic Prompt Optimization}
Automating prompt search (e.g., via programmatic prompt optimizers) shows early promise for this task \cite{agrawal2025gepa}.

\section{Conclusion}\label{sec:conclusion}

% \textsc{DBDoctor} combines LLM-guided query rewriting with SMT-reasoning and database validation. Empirically, it extends coverage to previously unsupported queries, surfaces additional counterexamples, and agrees with the verifier where the latter already succeeds -- all while reporting only validated, concrete counterexamples.
% This illustrates a pragmatic path in computer aided verification of data systems: retain formal methods for reasoning and robustly apply LLMs to broaden coverage. 


Faced with the reality that formal verifiers cannot handle many modern SQL features and that LLMs can be unreliable, we have developed a hybrid approach.
%
Our system uses an LLM to robustly rewrite queries into verifiable forms and then employs a SMT based formal verifier to find counterexamples that prove non-equivalence.

The system has a number of limitations and we have shared several research directions to to make it more powerful, robust, and efficient. 
%
Despite its limitations experiments with a dataset of 23,994 LeetCode query pairs show that we can improve the coverage of a SOTA verifier and find new counterexamples that the verifier missed.
%
Our approach extends the practical reach of formal methods, offering a promising path for computer aided verification of database systems.

% ---- Bibliography ----

% BibTeX users should specify bibliography style 'splncs04'.
% References will then be sorted and formatted in the correct style.
%
\bibliographystyle{splncs04}
\bibliography{citations}
%

\end{document}
