---
description: Analyze job applications for trends.
---

# Search Strategy

Scans all job files to identify rejection patterns, recurring gaps, and produces a strategic assessment to improve your hit rate.

## Steps

### 1. Gather Rejection Data

Scan all job files for rejected status:

```markdown
Use your search tool to search for "status: rejected" in `output/jobs/` or `pipeline.md`
```

For each rejected job file, read the full frontmatter to extract:
- Job title, company
- Outcome category (no_response, screened_out, after_interview, position_filled, salary_mismatch)
- Outcome notes
- Job type (lead, ops, strategic)
- Work arrangement

Also scan for applied and interviewing jobs to calculate conversion rates:
```markdown
Use your search tool to search for "status: applied" and "status: interviewing"
```

Check for gap analyses in the output folder:
```markdown
Check each company subfolder in `output/jobs/` for analysis.md files
```

### 2. Compute Metrics

- **Rejection rate**: rejected / (applied + interviewing + rejected + offer)
- **Average match score** of rejected jobs vs accepted/interviewing (from analysis files)
- **Outcome breakdown**: count per outcome category
- **Stage analysis**: where in the funnel do you lose? (screening vs interview vs final)

### 3. Identify Patterns

- **Recurring skill gaps**: which skills appear as gaps across multiple analyses?
- **Role type patterns**: are you getting rejected more from leadership roles or ops roles?
- **Company type patterns**: size, industry, or arrangement correlations?
- **Match score threshold**: is there a score below which you always get rejected?

### 4. Present Strategic Assessment

## Output Format

```markdown
# Search Strategy Review

## Key Metrics
| Metric | Value |
|---|---|
| Total Rejected | X |
| Rejection Rate | X% |
| Avg Match Score (rejected) | X/100 |
| Avg Match Score (active) | X/100 |

## Where You're Losing
- **Screening stage**: X applications (suggests resume/ATS issues)
- **After interview**: X applications (suggests interview prep needs)
- **No response**: X applications (suggests targeting issues)

## Recurring Gaps
| Skill/Area | Times Flagged | Recommendation |
|---|---|---|
| [Gap Name] | X | [How to close this gap] |

## Patterns
- [Pattern observation with evidence]
- [Pattern observation with evidence]

## Strategic Recommendations
1. [Specific, actionable recommendation]
2. [Specific, actionable recommendation]
3. [Specific, actionable recommendation]
```
