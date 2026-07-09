---
description: Prepare for interview.
---

# Interview Prep

Generates comprehensive interview preparation materials tailored to a specific role using your profile data, gap analysis, and resume.

## Steps

### 1. Load Context

Read from local files:

```markdown
Read the file at `output/jobs/{company-slug}/jd.md`
  — Job title, company, description

Read the file at `output/jobs/{company-slug}/analysis.md`
  — Gap analysis — know what they'll probe

Read the file at `output/jobs/{company-slug}/resume.md`
  — Generated resume — know what claims to support

Read the file at `data/profile.md`
  — Skills, target roles, previous role context

List the files in `data/job-history/` and read the relevant ones
  — Full work history for STAR story preparation
```

### 2. Generate Preparation Materials

#### Likely Questions (by category)

**Behavioral** (STAR format answers):
- Questions about leadership, conflict resolution, team building
- Each answer pre-built using a real story from your job history

**Technical/Domain**:
- Questions testing specific skills from the job requirements
- Focused on areas where you have strong evidence

**Gap-Probing**:
- Questions about areas where the gap analysis found weaknesses
- Pre-built reframing responses using transferable experience

**Company/Role Specific**:
- "Why this company?" with research prompts
- "Where do you see yourself in 5 years?" aligned with role trajectory

#### Your Questions to Ask
- 3-5 strategic questions that demonstrate understanding of the role
- Tailored to the role classification (leadership vs systems vs hybrid)

#### Red Flags to Address
- Any gaps that might come up and how to reframe them
- Employment gap explanation (if applicable)
- Salary expectation framing

### 3. Present as Prep Sheet

## Output Format

```markdown
# Interview Prep: [Title] at [Company]

## Key Themes to Emphasize
- [Theme 1 with supporting evidence]
- [Theme 2 with supporting evidence]

## Likely Questions & Prepared Answers

### Behavioral
**Q: [Question]**
> **STAR**: [Situation] → [Task] → [Action] → [Result with metric]

### Technical
**Q: [Question]**
> [Concise, confident answer with specific examples]

### Gap-Probing
**Q: [Question about a weakness]**
> **Reframe**: [How to address this using transferable experience]

## Your Questions to Ask
1. [Strategic question]
2. [Strategic question]
3. [Strategic question]

## Salary Discussion Strategy
- Previous baseline: $[X] CAD
- Market range for this role: [research needed]
- Recommended approach: [strategy]
```
