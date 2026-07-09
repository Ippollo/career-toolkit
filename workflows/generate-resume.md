---
description: Generate tailored resume.
---

# Generate Resume

Creates a tailored resume from your profile data, optimized for the target role using mode-adaptive strategy (people leadership, operations/systems, or hybrid). Delegates ATS keyword extraction and audit to the `ats-optimization` skill.

## Steps

### 1. Identify the Target Role

Get the job details. The user may:
- Reference a job already analyzed (use the gap analysis results)
- Provide a new job description
- Describe the target role type generally

If a gap analysis exists, use it — the role classification drives the resume strategy.

### 2. Load Profile Data

Read from local files:

```markdown
Read the file at `data/profile.md`
  — Additional Skills (cross-cutting/aspirational only), education, certs, target roles, previous role context
  — NOTE: The master Skills list no longer lives here (removed June 2026). Skills are derived from
    job-history `Tools Used` / `Methods Used` at generation time. Read the profile for everything
    EXCEPT skills — those come from Step 2b below.
  — Check "Early Career" section for early career experience that may bridge domain gaps

List the files in `data/job-history/` and read each relevant company file   [Step 2b]
  — For each relevant role: achievements, responsibilities, tools, methods, scope (team/revenue data)
  — Read the frontmatter `start` / `end` dates before loading full files. For most roles,
    only the 2-4 most recent or most relevant files need to be read in full.
    Use start/end to skip roles outside the target date range or seniority tier.
  — Include early career files when the JD involves financial services, banking, wealth management, or regulated industries

Read the file at `output/jobs/{company-slug}/analysis.md`
  — Gap analysis (if exists) — guides emphasis areas

Read the file at `output/jobs/{company-slug}/resume.md`
  — Previous resume (if exists) — as a starting point for iterations
```

### 3. Determine Resume Mode

Based on role classification (from gap analysis or fresh classification):

**People Leadership Mode:**
- Lead with team impact: coaching outcomes, culture building, retention improvements
- Emphasize: CSAT improvements, team growth metrics, mentorship results
- Scope preambles should lead with people management (direct reports, team growth, coaching relationships)
- Verbs: "Led", "Coached", "Grew", "Mentored", "Championed"

**Operations/Systems Mode:**
- Lead with process design: automation impact, efficiency gains, system implementations
- Emphasize: cost reduction, tooling deployments, workflow optimization, data-driven improvements
- Show technical breadth: platforms, methodologies, integration architecture
- Verbs: "Designed", "Automated", "Optimized", "Integrated", "Architected"

**Hybrid Mode:**
- Balance people outcomes with operational achievements
- Show the intersection: "built the team AND the systems they use"
- Lead with the stronger cluster for the specific target role

### 4. Extract JD Keywords and Save to File

Read and apply the `ats-optimization` skill — **Phase 1: Keyword Extraction**. This produces a keyword target list (hard skills + soft skills tables) used as a checklist during content generation.

**Primary source for extraction:** Load the raw JD text from `output/jobs/{company-slug}/jd.md`. If this file does not exist, extract keywords from the analysis.md gap analysis instead — but note that this fallback loses exact vocabulary and typically costs 20-30 Jobscan points.

> **Why jd.md matters:** ATS matching is literal. The analysis summary paraphrases JD terms ("actionable insights" instead of "data-driven insights", "CSAT" instead of "customer satisfaction", "P&L" instead of "financial management"). The raw JD preserves the exact tokens that ATS systems scan for.

**After extraction, save the keyword tables to a file:**

```markdown
Save the content to `output/jobs/{company-slug}/keywords.md`
```

This materializes the checklist so it can be re-read before and after writing. Do NOT rely on working memory — Jobscan calibration (April 2026) showed models self-reporting 100% keyword coverage while actual scores were 55-71%.

### 5. Generate Resume Content

**Before generating**: Read and apply the `resume-positioning` skill. It contains mandatory vocabulary translations, leadership framing rules, platform alias mappings, and anti-patterns derived from rejection data.

**Use the keyword target list from Step 4 as a checklist while writing.** Every bullet should be an opportunity to include a JD keyword organically.

Produce these sections:

1. **Summary** (3-4 sentences) — mode-adaptive, referencing match to the target role. **Must include the exact job title from the posting** (e.g., "Services Delivery Manager" not "Service Operations Leader" when the JD says "Services Delivery Manager").
2. **Key Achievements** (3-5 bullets) — cherry-picked greatest hits from across all roles, optimized for the target JD. This is the "15-second scan" section: a hiring manager who reads nothing else should walk away knowing this person has done the job. Rules:
   - **If an analysis exists, read its Resume Ammunition section first** — these achievements have already been ranked by JD relevance. Select 3-5 from that list rather than re-deriving from scratch.
   - If no analysis exists, select from job-history files directly based on JD fit.
   - Each bullet follows the **Action → Scope → Metric → Business Impact** chain (see "So What?" rule below)
   - Select for breadth: cover different competency domains the JD requires (e.g., one people, one systems, one commercial)
   - These are the polished, impact-focused versions; the corresponding bullet in the Experience section should be shortened or omitted to avoid duplication
   - Every bullet should include at least one JD keyword from the target list
3. **Experience** — 2-4 most relevant roles from job history, each with:
   - Title, Company, Dates
   - **Scope preamble** (1-2 sentences before bullets): state team size, org functions, revenue/client scope, and what you were accountable for. This replaces the standalone Leadership Scope block — scope is embedded per-role so each entry is self-contained and the leadership signal is impossible to miss.
   - 3-5 achievement-oriented bullets with metrics
   - Prioritized by relevance to target role, not just recency. Every role must earn its space by directly supporting the target role's requirements.
   - **Each bullet should include at least one JD keyword from the target list.**
4. **Skills** — grouped by: Technical, Tools & Platforms, Methodologies, and a dedicated soft skills subsection. **Pull skill category names and terms from the JD when possible.** Soft skills subsection naming should avoid inflating low-frequency JD terms (see `ats-optimization` Phase 1 frequency rules). Soft skills are the single largest point-loss category in ATS scans.

   **Skills assembly process (derived model):** Do NOT read the profile for a comprehensive skills list — it no longer exists there. Instead:
   1. Collect `Tools Used` from each job-history file used in the Experience section
   2. Collect `Methods Used` from each job-history file used in the Experience section
   3. Read the `Additional Skills` block in `data/profile.md` (cross-cutting/aspirational skills not tied to any employer)
   4. Merge all three sources, deduplicate, then filter by JD relevance before writing the Skills section
5. **Education** — degrees and relevant certifications. **Include years of experience explicitly** (e.g., "12+ years in service delivery and operations leadership") to satisfy "Job Level Match" checks.
6. **Tailoring Notes** — what was emphasized, what was de-emphasized, and why. Include a summary of keyword coverage from the target list.

Apply **Phase 2: Character Sanitization** from the `ats-optimization` skill to all generated content.

**"So What?" Rule (mandatory):** Every achievement bullet must include a downstream business impact, not just a metric. The pattern is: **[Action verb]** [what you did] **[by/through]** [method], **[metric]**, **[resulting in / enabling / driving]** [business impact]. Example: "Cut onboarding from 8 weeks to 3" → "Cut onboarding from 8 weeks to 3, accelerating revenue recognition by 5 weeks per new client." Exception: metrics that are self-evidently impactful (e.g., "Grew team from 12 to 34 while maintaining 91% retention") don't need a forced impact chain. Don't manufacture impact — if the source data doesn't support a downstream outcome, the metric alone is fine.

### 6. Rules

- **ONLY use verified work history.** Every experience entry MUST map to a real job history file. Never fabricate roles, companies, or dates.
- **Metrics are mandatory.** Every bullet should include a quantifiable result when the profile data contains one.
- **Forbidden phrases**: "utilizing", "leveraging", "synergies", "spearheaded" (unless the candidate specifically uses them), "passionate about", "results-driven professional", "results-oriented", "detail-oriented", "self-starter", "dynamic", "proactive", "proactively" (see also `ats-optimization` Phase 2 Negative Words list)
- **Restricted phrases**: "Proven track record" - only when immediately followed by a specific metric.
- **Keep it to 2 pages.** Prioritize ruthlessly.
- **Include LinkedIn URL in contact header.** Use the URL from `config.md`

### 7. Self-Review Scoring

Before presenting to the user, score the resume 1-10 across six dimensions. Fix anything scoring below 7 before showing the draft:

1. **Relevance to target role** — Does every section (roles, skills, certs) support the target job?
2. **Bullet quality & impact** — Does every bullet follow the Action → Scope → Metric → Business Impact chain? Are Key Achievements the strongest evidence you've already done the job? Score below 7 if any bullet states a responsibility without a metric, or states a metric without a downstream business impact (where one exists in the source data).
3. **Narrative coherence** — Does the story hold together? Any unearned claims or timeline confusion?
4. **Writing quality** — No hedging, no em dashes in body text, bullets under 35 words, no forbidden/restricted phrases?
5. **JD keyword coverage (estimation)** — Quick check: are the major JD terms visually present? This is a fast scan, not the final verification.
6. **ATS keyword audit (mandatory grep)** — Run Step 7b. This is not optional. The estimation in dimension 5 is insufficient — April 2026 calibration showed models reporting 100% coverage at 55% actual scores.

If the overall score is below 7, revise and re-score before proceeding.

### 7b. Post-Write Keyword Verification (MANDATORY — Use grep_search)

> **Why this step exists:** In five consecutive resumes (April 2026), self-review estimated 85-100% keyword coverage while actual Jobscan scores were 55-71%. The model was overconfident because it counted paraphrases as hits. "Customer teams" is NOT "Customer Support." "GTM strategy" is NOT "GTM initiatives."

**Re-read the keyword file from Step 4:**
```markdown
Read the file at `output/jobs/{company-slug}/keywords.md`
```

**For every term in the keyword target list where Our Experience = Y:**
1. Use your search tool to find the **exact string** from the **Resume Form** column (case-insensitive)
2. Record: term, expected count, actual count, line numbers where found
3. Flag any term with 0 actual hits as MISS

**Present a verification table:**

| Term | Resume Form | Target | Actual | Lines | Status |
|------|-------------|--------|--------|-------|--------|
| [JD term] | [exact form] | 1x | 2x | L9, L23 | PASS |
| [JD term] | [exact form] | 1x | 0x | — | MISS |

**If ANY Y-term has 0 hits**, fix the resume before presenting to the user. Do not present a resume with known misses.

**Do not rely on estimation or reading comprehension.** Use your search tool to count actual occurrences. Verify real hits, not paraphrases.

### 8. Present and Iterate

Present the resume in clean markdown. Let the user:
- Request emphasis changes ("more leadership", "add the CRM migration work")
- Edit specific bullets
- Switch modes ("try it as operations-focused instead")

### 9. ATS Readability Audit

After the user is satisfied with the content, run **Phase 3: Readability Audit** from the `ats-optimization` skill. Present the scorecard and apply the fit threshold logic before finalizing.

### 10. Save Output

Save the final resume:
```markdown
Save the content to `output/jobs/{company-slug}/resume.md`
```

Update the job status if tracked:
```markdown
Update the status in the tracked job file from `analyzed` to `resume_generated`
```

### 11. Update Pipeline Dashboard

Update `pipeline.md` — move the job from "Analyzed" to "Applied" or "Resume Ready" section as appropriate. Keep the pipeline sorted alphabetically within each section.

## Output Format

> **CRITICAL**: This template defines the exact markdown structure required by the PDF export. Do not deviate from the blank lines, bold markers, or list syntax shown here. Incorrect formatting will produce broken output.

```markdown
# [Candidate Name]

**[Professional Title - from resume-positioning Rule 5]**

[Email] | [Phone] | [City, Province] | [LinkedIn URL]

## Summary

[3-4 sentences, mode-adaptive. Use hyphens not em-dashes. No special characters.]

## Key Achievements

- [Strongest achievement: Action → Scope → Metric → Business Impact]
- [Second strongest, different competency domain than #1]
- [Third, showing breadth across JD requirements]
- [Optional fourth if space allows and it covers a JD gap]

## Experience

### [Title] - [Company]

**[Mon YYYY - Mon YYYY]**

[Scope preamble: 1-2 sentences stating team size, org functions, revenue/client scope, and accountability. E.g., "Leading a 35-person cross-functional organization across Support, Implementation, and Client Success for a $12M ARR managed services portfolio serving 75 enterprise clients."]

- [Achievement bullet with metric and business impact]
- [Achievement bullet with metric and business impact]
- [Achievement bullet with metric and business impact]

### [Title] - [Company]

**[Mon YYYY - Mon YYYY]**

[Scope preamble]

- ...

## Education

- **[Program]** - [Institution], [Year]

## Certifications

- **[Cert Name]** - [Issuer], [Year]

## Skills

**[Category Name]**

[comma-separated skill terms matching JD vocabulary]

**[Category Name]**

[comma-separated skill terms matching JD vocabulary]

---
*Tailoring Notes: [What was emphasized and why]*
```

### Formatting Rules (non-negotiable)

These rules ensure the PDF export renders correctly:

1. **Professional title** uses `**bold**` on its own line with blank lines above and below
2. **Every `##` and `###` heading** must have a blank line after it
3. **Every `**date range**`** must have a blank line after it
4. **Skills categories** use bold subheading on its own line, terms on the next line (see `ats-optimization` Phase 2)
5. **Education/Certification items** must use `- **Name**` format (list markers + bold required)
6. **Key Achievements** uses `- ` list markers, each bullet following the Action → Scope → Metric → Impact pattern
7. **Scope preambles** in experience entries are plain text (no bold, no list marker) on their own line(s) after the date range, with a blank line before the bullet list
8. **Tailoring Notes** after the `---` are automatically hidden in PDF output

### 12. Record Jobscan Results (After Submission)

Once the resume has been run through Jobscan, save the results:

```markdown
Save the content to `output/jobs/{company-slug}/jobscan-results.md`
```

The file should capture:
- Overall match score (%)
- Keyword coverage (matched / total)
- Keywords missed (exact terms flagged as missing)
- Formatting issues flagged
- Scan date

> **Why this step matters:** Jobscan calibration (April 2026) revealed a 28-49 point gap between model-estimated coverage and actual scores. Saving real scan results builds an evidence base for identifying recurring miss patterns. The `/search-strategy` workflow can aggregate these over time.

If recurring miss patterns emerge across multiple scans, add them to `skills/ats-optimization/docs/lessons.md` (create if it doesn't exist) with the pattern, the root cause, and the fix.

## Skills Used

- `career-data` — file paths and schemas for profile, job history, and output files
- `role-classifier` — determines resume mode from job classification
- `resume-positioning` — screening-tested positioning rules (industry vocabulary translation, team leadership framing, technology aliases)
- `ats-optimization` — JD keyword extraction (Phase 1), character sanitization (Phase 2), readability audit (Phase 3)
