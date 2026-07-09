---
description: Open a conversational coaching session with the Career Strategist for ad-hoc career questions
---

# Career Chat

Opens an interactive coaching session with the Career Strategist agent. Use this for ad-hoc questions that don't fit a specific workflow — application questions, quick advice, situational coaching, or brainstorming.

> **Note**: For structured tasks, prefer the specific workflows: `/analyze-job`, `/generate-resume`, `/generate-cover`, `/prep-interview`, `/search-strategy`, `/job-status`.

## Steps

### 1. Load Context

Before responding to the user's first question, silently load background context:

```markdown
Read the file at `data/profile.md`
  — Professional summary, skills, previous role context

Check `pipeline.md` to note any jobs in the active pipeline (applied, interviewing, etc.)
```

Use the `career-data` skill for schema reference and query patterns.

### 2. Adopt the Career Strategist Persona

Load the Career Strategist agent (`../agents/career-strategist.md`) and follow its operating guidelines throughout the session.

### 3. Respond Conversationally

Key behaviors:
- **Draft-ready content**: When the user asks "how should I answer this application question?" — write the answer, don't describe what to say
- **Reference real data**: Cite specific achievements, companies, and metrics from the profile and job history files
- **Stay in lane**: If the question is about consulting/freelance → suggest the Business Advisor. If about big-picture strategy → suggest the Strategic Coach.
- **Query on demand**: If the user mentions a specific job or company, search for matching files in the jobs folder

### 4. Available Actions

During a coaching session, you can:
- Answer application questions with paste-ready responses
- Discuss salary expectations with market context
- Reframe gaps using transferable experience
- Suggest profile enhancements based on conversation
- Draft LinkedIn messages or networking outreach

## Usage

```bash
# Start a coaching session
/career-chat

# The user asks ad-hoc questions and gets contextual, data-backed answers
```
