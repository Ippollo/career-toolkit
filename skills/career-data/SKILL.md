---
name: "career-data"
description: "File path reference for career data stored in the Obsidian vault and board repo. Use when accessing profile, job history, job postings, or generated artifacts. Documents folder structure, frontmatter schemas, and query patterns."
metadata.pattern: "data-access"
---

# Career Data

You are a data access specialist for the career coaching system. You know the exact file paths, folder structure, and frontmatter schemas needed to read and write career data using file system tools.

## When to Use

- When any workflow or agent needs to read career data (profile, jobs, history)
- When writing or updating job posting files, analyses, resumes, or cover letters
- When you need to know the exact file paths or frontmatter fields
- **Not for**: Firebase/Firestore operations — all career data is local

## Data Locations

| Data | Path | Description |
|---|---|---|
| Profile | `data/profile.md` | Professional summary, cross-cutting additional skills, education, certs, target roles, previous role context. Role-specific skills live in job-history files. |
| Job History | `data/job-history/{Company}.md` | One file per past employer. Use frontmatter `start`/`end` dates to filter which files to read. Each file contains Scope (team/revenue data) and Tools Used / Methods Used. |
| Job Postings | `output/jobs/{Company} - {Title}.md` | One file per tracked job |
| LinkedIn Profile | `data/linkedin-export.md` | LinkedIn profile snapshot. For profile optimization. Check `date_exported` frontmatter for freshness. |
| Generated Output | `output/jobs/{company-slug}/` | Analyses, resumes, cover letters |
| Pipeline | `pipeline.md` | Unified income pipeline — active jobs + consulting prospects at a glance |
| Consulting Prospects | `output/consulting/{Contact Name}.md` | One file per consulting prospect with interaction log |
| Consulting Output | `output/consulting/{company-slug}/` | Proposals, positioning notes, playbooks |

## Frontmatter Schemas

### Profile (`profile.md`)

Standard vault metadata only — the profile body uses markdown headings for structure:

```yaml
---
date: 2026-03-19
type: reference
tags: [career]
---
```

**Sections** (accessed by heading): Professional Summary, Additional Skills (Technical/Tools/Leadership — cross-cutting only; role-specific skills live in job-history files), Education, Certifications, Target Roles, Technical Projects, Team Leadership (routing pointer — see job-history `## Scope` for actual data), Early Career routing table, Previous Role Context.

> **Skills architecture (post Phase 2 restructure, June 2026):** The master Skills section was removed from the profile to eliminate duplication. The profile now contains only skills _not_ tied to any specific employer. At resume generation time, the Skills section is assembled by aggregating `Tools Used` + `Methods Used` from the relevant job-history files plus the profile `Additional Skills` block, then filtering by JD relevance. **Do not look for a comprehensive skills list in the profile — it is not there.**

> **Team Leadership (post Phase 2 restructure, June 2026):** The Team Leadership table was removed from the profile. Leadership scope data (direct reports, team composition, cross-functional influence) lives in the `## Scope` section of each job-history file.

### Job History (`job-history/*.md`)

```yaml
---
date: 2026-03-19
type: reference
tags: [career, job-history]
company: "Northwind Services"
title: "Manager, Customer Operations"
start: 2020-03
end: 2026-02
level: Lead           # Owner, Manager, Senior, or omitted
location: "City, Province"
is_current: false
---
```

**Sections**: Summary, Achievements, Key Responsibilities, Scope (includes direct reports, team composition, cross-functional influence, revenue), Tools Used, Methods Used.

> **Skills derivation:** When building the Skills section for a resume, aggregate `Tools Used` + `Methods Used` from each job-history file used in the Experience section. Combine with `Additional Skills` from the profile, then filter by JD relevance. Do not manually maintain a separate master skills list.

### Job Postings (`jobs/*.md`)

```yaml
---
date: 2026-03-09
type: reference
tags: [career, job-posting]
company: "Acme Software"
title: "Director, Customer Operations"
status: applied        # new | analyzed | resume_generated | applied | interviewing | rejected | offer | not_pursued
url: "https://..."
location: "Canada"
job_type: lead         # strategic | ops | lead
salary_range: "$120k - $150k"
work_arrangement: remote   # remote | on-site | hybrid
application_method: "LinkedIn"
source: manual
outcome: screened_out  # screened_out | no_response | after_interview | position_filled | salary_mismatch | not_comparable
outcome_notes: ""
rejected_at: 2026-03-02
evidence_saved: true
---
```

**Sections**: Job Description, Comparison to Previous Role.

### Generated Output (`board/output/jobs/{slug}/`)

Each subfolder can contain:
- `analysis.md` — gap analysis with match score, gaps, strengths
- `resume.md` — tailored resume
- `cover-letter.md` — tailored cover letter

Output frontmatter references the source job:

```yaml
---
date: 2026-03-19
target_job: "Acme Software - Director, Customer Operations"
---
```

### Consulting Prospects (`consulting/*.md`)

```yaml
---
date: 2026-03-24
type: reference
tags: [consulting, prospect]
company: "Contoso Group"
contact: "Jane Smith"
source: network           # network | linkedin | inbound | referral | cold
status: conversation      # lead | contacted | conversation | proposal_sent | engaged | closed_won | closed_lost
service_area: "ai-integration"
offer_type: ""
referred_by: ""
next_action: "Follow up with Jane"
next_action_date: "2026-04-07"
---
```

**Sections**: Context, Engagement Proposal (if applicable), Deliverables (if applicable), Interaction Log, Related.

## Common Query Patterns

### Read the unified pipeline (RECOMMENDED FIRST STEP)
```markdown
Read the file at `pipeline.md`
```
This gives you the full picture — active jobs, consulting prospects, and summary metrics — in a single read. Use this before scanning individual files.

### Read the candidate's profile
```markdown
Read the file at `data/profile.md`
```

### Read a specific job history entry
```markdown
Read the file at `data/job-history/Company.md`
```

### Read all job history entries
```markdown
List the files in `data/job-history/` and read the relevant ones
```

### Find jobs by status
```markdown
Use your search tool to search for "status: applied" in `output/jobs/` or `pipeline.md`
```

### Find rejected jobs with outcomes
```markdown
Use your search tool to search for "status: rejected" in `output/jobs/` or `pipeline.md`
# Then read each file's frontmatter for outcome details
```

### Read consulting prospects
```markdown
List the files in `output/consulting/` and read each result for interaction logs and status
```

### Find consulting prospects by status
```markdown
Use your search tool to search for "status: conversation" in `output/consulting/`
```

### Read a job posting
```markdown
Read the file at `output/jobs/Company - Title.md`
```

### Read analysis for a job
```markdown
Read the file at `output/jobs/company-slug/analysis.md`
```

### Update a job's status
```markdown
Update the status in `output/jobs/Company - Title.md` from `applied` to `rejected`
```

## Anti-Patterns

- **Don't use Firebase MCP** — all career data is local files
- **Don't hardcode paths** — use the patterns above with actual company/title values
- **Don't ignore frontmatter** — status, outcome, and dates are in YAML frontmatter, not body text
- **Don't modify job descriptions** — the body of job files is reference data; only update frontmatter fields

## Related Skills

- **Complements**: `role-classifier` — uses gap analysis data to classify roles
- **Complements**: `resume-positioning` — screening-tested positioning rules
