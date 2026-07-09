---
description: Analyze a job posting against your profile for gap analysis, match scoring, and role classification
---

# Analyze Job

Compares a job posting against your professional profile to produce a structured gap analysis with match score, skill gaps, strengths, and strategic recommendations.

## Steps

### 1. Gather the Job Details

Get the job posting from the user. They may:
- Paste the full job description directly
- Provide a URL (use firecrawl-mcp to scrape it)
- Reference a job already tracked by title or company

If they provide a URL, scrape it first:
```
Use firecrawl_scrape to extract the job title, company, and full description.
```

### 2. Load the Candidate Profile

Read the candidate's profile and job history from the `data/` directory:

```markdown
Read the file at `data/profile.md`
  — Professional summary, skills, education, certs, target roles, previous role context

List the directory `data/job-history/` and read each relevant company file
  — Each file contains: achievements, responsibilities, tools, methods, scope, metrics
  — Read ALL files, then focus analysis on the most role-relevant ones
  — Include early career files when the JD involves financial services, banking, wealth management, or regulated industries
```

> **Note on linkedin-export.md**: This file exists for LinkedIn profile optimization only. Do NOT use it as a primary source for job analysis — it uses different titles and narrative framing than the job-history files, which are the canonical source for generate-resume. Using both creates facts mismatches between the analysis and the resume.

Format the profile for analysis using this priority:
1. **Primary Source**: Job history files from `job-history/` — real companies, dates, achievements with metrics, structured frontmatter
2. **Supplementary**: Skills, education, certifications from professional-profile.md
3. **Narrative**: Professional summary as additional context

### 3. Save Raw JD (BEFORE analysis)

> **Why this step runs first:** The `generate-resume` workflow runs ATS keyword extraction against the JD text. If the raw JD is not saved, the model extracts keywords from the analysis summary instead - which paraphrases terms and drops low-frequency vocabulary. This was the root cause of 52-58% first-pass Jobscan scores across three consecutive resumes (April 2026). Saving the JD before analysis ensures it is captured even if the conversation is interrupted or the agent skips post-analysis steps.

Save the full, unedited job description text to the output folder:
```markdown
Save the content to `output/jobs/{company-slug}/jd.md`
```

The file should contain:
1. The job title and company name as a heading
2. The complete job description text, exactly as scraped or pasted
3. No analysis, no commentary - raw text only

**This step is non-negotiable. Do NOT proceed to analysis until jd.md is written.**

### 4. Run the Analysis

Using the Career Strategist agent persona, analyze the job against the profile:

**Scoring Guidelines:**
- 90-100: Exceptional match, exceeds most requirements
- 75-89: Strong match, meets core requirements with minor gaps
- 60-74: Moderate match, has foundation but notable gaps
- 40-59: Below average match, significant gaps
- 0-39: Poor match, fundamental misalignment

**Produce these sections:**

1. **Match Score** (0-100) with overall assessment paragraph
2. **Hard Skill Gaps** — each with required level, candidate level, severity (low/medium/high/critical), and recommendation
3. **Experience Gaps** — years required vs candidate years, with recommendation
4. **Soft Skill Gaps** — evidence in posting, recommendation
5. **Strengths** — evidence in profile, relevance to posting
6. **Resume Ammunition** — 5-7 specific achievements from the job-history files, ranked by relevance to this JD. These are pre-selected candidates for the Key Achievements section of the resume. For each, provide: the achievement, which role it came from, and why it maps to a JD requirement. The generate-resume workflow selects 3-5 from this list.
7. **Profile Suggestions** — questions to ask the candidate to discover hidden experience that could fill gaps
8. **Role Classification** — classify as `people_leadership`, `operations_systems`, or `hybrid` with reasoning citing specific posting signals

### 5. Present Results

Format as a structured markdown report with:
- Match score prominently displayed
- Gap summary (count by severity)
- Strengths highlighted as leverage points
- Role classification with strategy implications
- Profile suggestions as actionable next steps

### 6. Store Results

Save the analysis to the output folder. **Every analysis.md MUST start with YAML frontmatter** before the analysis body:

```yaml
---
company: "[Company Name]"
title: "[Job Title]"
slug: [company-slug]
score: [0-100]
role_mode: [people_leadership | operations_systems | hybrid]
status: analyzed
analyzed_at: [YYYY-MM-DD]
---
```

Write the file:
```markdown
Save the analysis to `output/jobs/{company-slug}/analysis.md`
```

If the job is tracked in a file, update its status:
```markdown
Update the status in the tracked job file from `new` to `analyzed`.
```

### 6b. Verify Output Files

**Before proceeding to the decision gate, confirm both files exist:**
1. `output/jobs/{company-slug}/jd.md` - raw JD text
2. `output/jobs/{company-slug}/analysis.md` - gap analysis

If `jd.md` is missing, STOP and save it now. Do not proceed to the decision gate without it.

### 7. Apply / Not-Pursue Decision Gate

**Ask the user**: "Will you apply for this role?"

**If YES → Pursue:**
- Keep the `analysis.md` frontmatter `status: analyzed` (it will be updated to `resume_generated` later by the `/generate-resume` workflow).
- Update the job tracking note status to `analyzed` (if tracked).
- Update `pipeline.md` — move row to **Resume Ready** section.

**If NO → Not Pursuing:**
- Update the analysis.md frontmatter:
  - `status: not_pursued`
- Update the job tracking note status from `analyzed` to `not_pursued`
- Update `pipeline.md` — move row to **Not Pursued** section (or remove if not yet added)

> **Why this matters:** Only `applied`, `rejected`, `interviewing`, and `no_response` statuses are counted in search strategy metrics. `analyzed` and `not_pursued` are excluded. This keeps score averages and gap analysis clean.

### 8. Update Pipeline Dashboard

Update `pipeline.md` — add or update the job's row in the appropriate section. Keep the pipeline sorted alphabetically within each section.

## Output Format

```markdown
---
company: "[Company Name]"
title: "[Job Title]"
slug: [company-slug]
score: [0-100]
role_mode: [people_leadership | operations_systems | hybrid]
status: analyzed
analyzed_at: [YYYY-MM-DD]
---

# Gap Analysis: [Job Title] at [Company]

**Match Score: XX/100** — [Overall Assessment]
**Role Mode: [people_leadership | operations_systems | hybrid]**

## Strengths (X found)
- **[Area]**: [Evidence] → [Relevance]

## Gaps (X hard skill, X experience, X soft skill)

### Critical/High Priority
- **[Skill]** (critical): Required [X], You have [Y] → [Recommendation]

### Medium/Low Priority
- ...

## Resume Ammunition (5-7 candidates for Key Achievements)

Ranked by JD relevance. The generate-resume workflow selects 3-5 of these for the Key Achievements section.

1. **[Achievement]** (from [Role]) — maps to JD requirement: [requirement]. Suggested framing: [1-sentence Action → Metric → Impact version]
2. **[Achievement]** (from [Role]) — maps to: [requirement]
3. ...

## Profile Enhancement Opportunities
- **[Gap Area]**: [Question to ask yourself] → If yes, add: [suggestion]

## Strategic Recommendation
[Mode-specific advice based on role classification]
```

## Status Lifecycle

```
new → analyzed → resume_generated → applied → interviewing → [rejected | offer | withdrawn]
                                             ↘ not_pursued
                                             ↘ no_response
```

| Status | Counted in Stats? |
|---|---|
| `analyzed` | No |
| `resume_generated` | No |
| `not_pursued` | No |
| `applied` | Yes |
| `no_response` | Yes |
| `rejected` | Yes |
| `interviewing` | Yes |

## Skills Used

- `career-data` — file paths and frontmatter schemas for profile and job data
- `role-classifier` — 3-mode classification methodology
