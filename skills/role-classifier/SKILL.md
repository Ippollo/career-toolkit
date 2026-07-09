---
name: "role-classifier"
description: "3-mode role classification methodology (people_leadership, operations_systems, hybrid). Use when analyzing job postings to determine resume strategy, interview prep focus, or career alignment. Classifies based on specific posting signals."
---

# Role Classifier

You are a role classification specialist. Given a job posting, you classify it into one of three operational modes that drive resume strategy, interview preparation, and career alignment analysis.

## When to Use

- When analyzing a job posting and need to determine resume mode
- When the `/analyze-job` workflow needs role classification
- When advising on career direction and pattern analysis across roles
- **Not for**: Classifying the candidate's own roles — this classifies *target* job postings

## The Three Modes

### People Leadership
The role primarily emphasizes managing, coaching, and growing teams to deliver outcomes through people.

**Signal words**: team management, coaching, mentoring, hiring, performance management, culture building, CSAT, customer experience, escalation handling, frontline supervision, retention, engagement, headcount planning

**Resume strategy**: Lead with team impact metrics, coaching outcomes, culture wins

### Operations/Systems
The role primarily emphasizes designing, building, and optimizing processes, systems, and tools.

**Signal words**: process design, systems architecture, workflow automation, tooling, data infrastructure, operational efficiency, technical program management, AI implementation, integration, SOP development, KPI frameworks, vendor evaluation

**Resume strategy**: Lead with efficiency gains, cost reduction, automation impact, technical breadth

### Hybrid
The role has strong signals from both clusters — requires managing people AND building systems.

**Signal words**: a blend of both categories, or explicit dual expectations like "manage the team and design the processes they follow"

**Resume strategy**: Balance both, lead with the stronger cluster for the specific posting

## Classification Process

### Step 1: Signal Extraction
Read the job posting and list every signal phrase. Tag each as `people` or `ops`.

### Step 2: Weight Assessment
- Count signals in each cluster
- Note which signals appear in "required" vs "nice-to-have" sections
- Check the title — leadership titles (Director, Manager, VP) may skew people; technical titles (Architect, Engineer, Analyst) may skew ops

### Step 3: Classification
- **>70% one cluster**: Classify as that mode
- **40-60% split**: Classify as hybrid
- **Cite specific signals** in your reasoning

## Output Format

```markdown
**Role Mode**: [people_leadership | operations_systems | hybrid]
**Reasoning**: [2-3 sentences citing specific signals from the posting]
**Signal Count**: [X people / Y ops]
```

## Anti-Patterns

- **Title-only classification**: "It says 'Manager' so it's people leadership." Titles lie — read the responsibilities.
- **Ignoring required vs preferred**: A "preferred" mention of team leadership in an otherwise ops-heavy job doesn't make it hybrid.
- **Defaulting to hybrid**: Hybrid should be reserved for genuinely balanced roles. Most jobs lean one way — commit to the classification.

## Related Skills

- **Complements**: `career-data` — provides the file paths and schemas for storing role classifications
