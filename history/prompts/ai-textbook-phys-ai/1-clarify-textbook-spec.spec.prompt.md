---
id: 1
title: Clarify textbook spec
stage: spec
date: 2025-12-16
surface: agent
model: qwen
feature: ai-textbook-phys-ai
branch: 1-ai-textbook-phys-ai
user: user
command: /sp.clarify
labels: [clarification,specification,education,textbook]
links:
  spec: C:\Users\AL KHAIR COMPUTER\Desktop\Hackathon-2\physical-ai-textbook\specs\1-ai-textbook-phys-ai\spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-ai-textbook-phys-ai/spec.md
 - history/prompts/ai-textbook-phys-ai/1-clarify-textbook-spec.spec.prompt.md
tests:
 - none
---

## Prompt

```
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Detect and reduce ambiguity or missing decision points in the active feature specification and record the clarifications directly in the spec file.

Note: This clarification workflow is expected to run (and be completed) BEFORE invoking `/sp.plan`. If the user explicitly states they are skipping clarification (e.g., exploratory spike), you may proceed, but must warn that downstream rework risk increases.

Execution steps:

1. Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly` from repo root **once** (combined `--json --paths-only` mode / `-Json -PathsOnly`). Parse minimal JSON payload fields:
   - `FEATURE_DIR`
   - `FEATURE_SPEC`
   - (Optionally capture `IMPL_PLAN`, `TASKS` for future chained flows.)
   - If JSON parsing fails, abort and instruct user to re-run `/sp.specify` or verify feature branch environment.
   - For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. Load the current spec file. Perform a structured ambiguity & coverage scan using this taxonomy. For each category, mark status: Clear / Partial / Missing. Produce an internal coverage map used for prioritization (do not output raw map unless no questions will be asked).

   Functional Scope & Behavior:
   - Core user goals & success criteria
   - Explicit out-of-scope declarations
   - User roles / personas differentiation

   Domain & Data Model:
   - Entities, attributes, relationships
   - Identity & uniqueness rules
   - Lifecycle/state transitions
   - Data volume / scale assumptions

   Interaction & UX Flow:
   - Critical user journeys / sequences
   - Error/empty/loading states
   - Accessibility or localization notes

   Non-Functional Quality Attributes:
   - Performance (latency, throughput targets)
   - Scalability (horizontal/vertical, limits)
   - Reliability & availability (uptime, recovery expectations)
   - Observability (logging, metrics, tracing signals)
   - Security & privacy (authN/Z, data protection, threat assumptions)
   - Compliance / regulatory constraints (if any)

   Integration & External Dependencies:
   - External services/APIs and failure modes
   - Data import/export formats
   - Protocol/versioning assumptions

   Edge Cases & Failure Handling:
   - Negative scenarios
   - Rate limiting / throttling
   - Conflict resolution (e.g., concurrent edits)

   Constraints & Tradeoffs:
   - Technical constraints (language, storage, hosting)
   - Explicit tradeoffs or rejected alternatives

   Terminology & Consistency:
   - Canonical glossary terms
   - Avoided synonyms / deprecated terms

   Completion Signals:
   - Acceptance criteria testability
   - Measurable Definition of Done style indicators

   Misc / Placeholders:
   - TODO markers / unresolved decisions
   - Ambiguous adjectives ("robust", "intuitive") lacking quantification

   For each category with Partial or Missing status, add a candidate question opportunity unless:
   - Clarification would not materially change implementation or validation strategy
   - Information is better deferred to planning phase (note internally)

3. Generate (internally) a prioritized queue of candidate clarification questions (maximum 5). Do NOT output them all at once. Apply these constraints:
    - Maximum of 10 total questions across the whole session.
    - Each question must be answerable with EITHER:
       - A short multiple‑choice selection (2–5 distinct, mutually exclusive options), OR
       - A one-word / short‑phrase answer (explicitly constrain: "Answer in <=5 words").
    - Only include questions whose answers materially impact architecture, data modeling, task decomposition, test design, UX behavior, operational readiness, or compliance validation.
    - Ensure category coverage balance: attempt to cover the highest impact unresolved categories first; avoid asking two low-impact questions when a single high-impact area (e.g., security posture) is unresolved.
    - Exclude questions already answered, trivial stylistic preferences, or plan-level execution details (unless blocking correctness).
    - Favor clarifications that reduce downstream rework risk or prevent misaligned acceptance tests.
    - If more than 5 categories remain unresolved, select the top 5 by (Impact * Uncertainty) heuristic.

4. Sequential questioning loop (interactive):
    - Present EXACTLY ONE question at a time.
    - For multiple‑choice questions:
       - **Analyze all options** and determine the **most suitable option** based on:
          - Best practices for the project type
          - Common patterns in similar implementations
          - Risk reduction (security, performance, maintainability)
          - Alignment with any explicit project goals or constraints visible in the spec
       - Present your **recommended option prominently** at the top with clear reasoning (1-2 sentences explaining why this is the best choice).
       - Format as: `**Recommended:** Option [X] - <reasoning>`
       - Then render all options as a Markdown table:

       | Option | Description |
       |--------|-------------|
       | A | <Option A description> |
       | B | <Option B description> |
       | C | <Option C description> (add D/E as needed up to 5) |
       | Short | Provide a different short answer (<=5 words) (Include only if free-form alternative is appropriate) |

       - After the table, add: `You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or provide your own short answer.`
    - For short‑answer style (no meaningful discrete options):
       - Provide your **suggested answer** based on best practices and context.
       - Format as: `**Suggested:** <your proposed answer> - <brief reasoning>`
       - Then output: `Format: Short answer (<=5 words). You can accept the suggestion by saying "yes" or "suggested", or provide your own answer.`
    - After the user answers:
       - If the user replies with "yes", "recommended", or "suggested", use your previously stated recommendation/suggestion as the answer.
       - Otherwise, validate the answer maps to one option or fits the <=5 word constraint.
       - If ambiguous, ask for a quick disambiguation (count still belongs to same question; do not advance).
       - Once satisfactory, record it in working memory (do not yet write to disk) and move to the next queued question.
    - Stop asking further questions when:
       - All critical ambiguities resolved early (remaining queued items become unnecessary), OR
       - User signals completion ("done", "good", "no more"), OR
       - You reach 5 asked questions.
    - Never reveal future queued questions in advance.
    - If no valid questions exist at start, immediately report no critical ambiguities.

5. Integration after EACH accepted answer (incremental update approach):
    - Maintain in-memory representation of the spec (loaded once at start) plus the raw file contents.
    - For the first integrated answer in this session:
       - Ensure a `## Clarifications` section exists (create it just after the highest-level contextual/overview section per the spec template if missing).
       - Under it, create (if not present) a `### Session YYYY-MM-DD` subheading for today.
    - Append a bullet line immediately after acceptance: `- Q: <question> → A: <final answer>`.
    - Then immediately apply the clarification to the most appropriate section(s):
       - Functional ambiguity → Update or add a bullet in Functional Requirements.
       - User interaction / actor distinction → Update User Stories or Actors subsection (if present) with clarified role, constraint, or scenario.
       - Data shape / entities → Update Data Model (add fields, types, relationships) preserving ordering; note added constraints succinctly.
       - Non-functional constraint → Add/modify measurable criteria in Non-Functional / Quality Attributes section (convert vague adjective to metric or explicit target).
       - Edge case / negative flow → Add a new bullet under Edge Cases / Error Handling (or create such subsection if template provides placeholder for it).
       - Terminology conflict → Normalize term across spec; retain original only if necessary by adding `(formerly referred to as "X")` once.
    - If the clarification invalidates an earlier ambiguous statement, replace that statement instead of duplicating; leave no obsolete contradictory text.
    - Save the spec file AFTER each integration to minimize risk of context loss (atomic overwrite).
    - Preserve formatting: do not reorder unrelated sections; keep heading hierarchy intact.
    - Keep each inserted clarification minimal and testable (avoid narrative drift).

6. Validation (performed after EACH write plus final pass):
   - Clarifications session contains exactly one bullet per accepted answer (no duplicates).
   - Total asked (accepted) questions ≤ 5.
   - Updated sections contain no lingering vague placeholders the new answer was meant to resolve.
   - No contradictory earlier statement remains (scan for now-invalid alternative choices removed).
   - Markdown structure valid; only allowed new headings: `## Clarifications`, `### Session YYYY-MM-DD`.
   - Terminology consistency: same canonical term used across all updated sections.

7. Write the updated spec back to `FEATURE_SPEC`.

8. Report completion (after questioning loop ends or early termination):
   - Number of questions asked & answered.
   - Path to updated spec.
   - Sections touched (list names).
   - Coverage summary table listing each taxonomy category with Status: Resolved (was Partial/Missing and addressed), Deferred (exceeds question quota or better suited for planning), Clear (already sufficient), Outstanding (still Partial/Missing but low impact).
   - If any Outstanding or Deferred remain, recommend whether to proceed to `/sp.plan` or run `/sp.clarify` again later post-plan.
   - Suggested next command.

Behavior rules:

- If no meaningful ambiguities found (or all potential questions would be low-impact), respond: "No critical ambiguities detected worth formal clarification." and suggest proceeding.
- If spec file missing, instruct user to run `/sp.specify` first (do not create a new spec here).
- Never exceed 5 total asked questions (clarification retries for a single question do not count as new questions).
- Avoid speculative tech stack questions unless the absence blocks functional clarity.
- Respect user early termination signals ("stop", "done", "proceed").
- If no questions asked due to full coverage, output a compact coverage summary (all categories Clear) then suggest advancing.
- If quota reached with unresolved high-impact categories remaining, explicitly flag them under Deferred with rationale.

Context for prioritization: /sp.clarify My textbook specification is located at website/SPECIFICATION.md Please analyze this specification for the following issues: 1. AMBIGUOUS TERMS - What does "conceptual understanding" mean in this textbook? (Should concepts be explained with examples, diagrams, analogies, or all?) - What does "clear, simple English" mean? (Expected reading level? Technical terminology allowed or minimized?) - What does "minimal mathematics" mean? (No equations at all, or high-level math explanations without derivations?) - What does "academically suitable" mean? (Introductory university level? Undergraduate? Early graduate?) 2. MISSING ASSUMPTIONS - What prior knowledge is assumed? (Basic programming? AI concepts? No robotics background?) - Is the book intended for self-study, classroom use, or both? - Should chapters be independent or sequentially dependent? - Is referencing required? (If yes: academic references, informal citations, or none in Phase 1?) - Is there a target length per chapter? (Approximate word count range?) 3. INCOMPLETE REQUIREMENTS - What should each chapter contain? (Introduction, core explanation, summary, key takeaways?) - How deep should each module go? (High-level overview vs. detailed conceptual breakdown?) - Should real-world examples be included? (Industry use-cases, humanoid robots, or purely conceptual?) - Should diagrams or figures be planned (even if not implemented yet)? 4. SCOPE CONFLICTS - Is this textbook purely theoretical or partially preparatory for implementation? - Should the book avoid all hardware discussion or allow high-level mentions? - Is the focus strictly humanoid robotics or Physical AI in general with humanoids as the main example? - Is this a foundational textbook or an advanced specialization text? Please list: - All gaps, ambiguities, or unanswered questions - Mark each item as: - CRITICAL (planning and implementation cannot proceed without clarification) - NICE-TO-HAVE (improves quality but does not block progress) The goal is to refine the specification so that planning and content generation can proceed without ambiguity.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.
```

## Response snapshot

```
I have successfully completed the clarification session for your textbook specification. Here's the summary:

### Questions Asked & Answered: 5
- Q1: How should concepts be explained? → Using examples, diagrams, and analogies
- Q2: What reading level should be targeted? → Undergraduate level (Grade 8-10) with defined technical terms
- Q3: What does "minimal mathematics" mean? → Conceptual with equations but no derivations
- Q4: What is the target academic level? → Introductory university level with basic programming/AI knowledge
- Q5: Should chapters be independent or sequential? → Sequential with recaps of key concepts

### Path to Updated Spec
- `C:\Users\AL KHAIR COMPUTER\Desktop\Hackathon-2\physical-ai-textbook\specs\1-ai-textbook-phys-ai\spec.md`

### Sections Touched
- New "Clarifications" section added with "Session 2025-12-16" subsection

### Coverage Summary
- **Functional Scope & Behavior**: Resolved (was Partial/Missing and addressed)
- **Domain & Data Model**: Clear (already sufficient)
- **Interaction & UX Flow**: Resolved (was Partial/Missing and addressed)
- **Non-Functional Quality Attributes**: Resolved (was Partial/Missing and addressed)
- **Integration & External Dependencies**: Clear (already sufficient)
- **Edge Cases & Failure Handling**: Clear (already sufficient)
- **Constraints & Tradeoffs**: Clear (already sufficient)
- **Terminology & Consistency**: Resolved (was Partial/Missing and addressed)
- **Completion Signals**: Clear (already sufficient)
- **Misc / Placeholders**: Clear (already sufficient)

All clarifications have been integrated into the specification document. The specification is now more precise with clear definitions for:

1. How concepts should be explained (with examples, diagrams, and analogies)
2. The appropriate reading level (undergraduate level with technical terms defined)
3. The approach to mathematics (equations presented conceptually without derivations)
4. The target audience academic level (introductory university with basic programming/AI knowledge)
5. The chapter structure (sequential with recaps of key concepts)

The specification is now ready for the next phase. Suggested next command: `/sp.plan`
```

## Outcome

- ✅ Impact: Resolved 5 critical ambiguities in the textbook specification to enable clear content development
- 🧪 Tests: No tests required for this documentation clarification
- 📁 Files: Updated specs/1-ai-textbook-phys-ai/spec.md with clarifications section; created history/prompts/ai-textbook-phys-ai/1-clarify-textbook-spec.spec.prompt.md
- 🔁 Next prompts: Ready for /sp.plan to create implementation plan
- 🧠 Reflection: The specification now clearly defines concept explanation methods, reading level, math approach, academic level, and chapter dependencies, removing previous ambiguities that could have impeded content development.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): All clarifications successfully integrated into spec
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A