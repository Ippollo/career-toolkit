---
description: Get pipeline summary of all jobs.
---

# Job Status

Scans your local job files and produces a text-based dashboard showing where everything stands.

## Steps

### 1. Scan All Jobs

List and read frontmatter from all job files:

```markdown
List the files in `output/jobs/` (or check `pipeline.md`)
```

For each file, read the YAML frontmatter to extract: `company`, `title`, `status`, `outcome`, `date`, `rejected_at`.

### 2. Group by Status

Count jobs in each status:
- `new` — Captured but not analyzed
- `analyzed` — Gap analysis complete, not yet applied
- `resume_generated` — Resume ready for submission
- `applied` — Application submitted
- `interviewing` — In interview process
- `rejected` — Application rejected
- `offer` — Offer received
- `not_pursued` — Decided not to apply

### 3. Compute Summary Metrics

- **Total active** (new + analyzed + resume_generated + applied + interviewing)
- **Total closed** (rejected + offer + not_pursued)
- **Rejection rate** = rejected / (applied + interviewing + rejected + offer) × 100
- **Most recent activity** — most recent `date` or `rejected_at` field

### 4. Present Dashboard

## Output Format

```markdown
# Job Pipeline Status

## Summary
| Metric | Value |
|---|---|
| Active Jobs | X |
| Consulting Prospects | X |
| Total Tracked | X |
| Rejection Rate | X% |

## Employment Pipeline
| Status | Count | Jobs |
|---|---|---|
| 🆕 New | X | [Company - Title], ... |
| 🔍 Analyzed | X | ... |
| 📄 Resume Ready | X | ... |
| 📨 Applied | X | ... |
| 🎤 Interviewing | X | ... |
| ❌ Rejected | X | ... |
| 🎉 Offer | X | ... |
| ⏭️ Not Pursued | X | ... |

## Consulting Pipeline
| Contact | Company | Status | Next Action | Due |
|---|---|---|---|---|
| [Name] | [Company] | [Status] | [Next action] | [Date] |

## Next Actions
- [X jobs need analysis — run /analyze-job]
- [X jobs have resumes ready — consider applying]
- [X jobs haven't been updated in 7+ days — follow up?]
- [X consulting prospects have follow-ups due]
```

### 5. Sync Pipeline Dashboard

After generating the status report, update `pipeline.md` with current data from the scan. This ensures the pipeline file stays fresh even when individual workflows aren't run.

Include consulting prospects by scanning `output/consulting/` (or checking `pipeline.md`) and reading each file's frontmatter for status, next_action, and next_action_date.
