---
description: Generate tailored cover letter.
---

# Generate Cover Letter

Drafts a cover letter tailored to a specific job, using your profile data and the gap analysis to emphasize strengths and address gaps strategically.

## Steps

### 1. Gather Inputs

- **Job details**: title, company, description (from vault job file or pasted)
- **Gap analysis** (if available): strengths to emphasize, gaps to address
- **Resume** (if available): ensure consistency between documents
- **Tone preference**: Ask the user:
  - `professional` — Formal, buttoned-up. Best for corporate, government, finance.
  - `confident` — Direct, assertive. Best for senior/leadership roles.
  - `conversational` — Warm, personable. Best for startups, culture-forward companies.

### 1b. Research the Company

Before writing, research the company's current situation:
- Check the company website for mission, recent news, and strategic direction
- Identify the core **problem this role solves** for the company — this drives the opening
- Note any cultural signals, values, or language patterns to mirror
- If the company is unknown or stealth, infer from the JD's language and industry context

### 2. Load Profile Data

Read from local files:

```markdown
Read the file at `data/profile.md`
  — Skills, previous role context, professional summary

Read the relevant files in `data/job-history/`
  — Relevant roles for evidence

Read the file at `output/jobs/{company-slug}/analysis.md` (if it exists)
  — Gap analysis — know what to address proactively

Read the file at `output/jobs/{company-slug}/resume.md` (if it exists)
  — Generated resume — maintain consistency
```

### 2b. Keyword and Character Rules

Review the `ats-optimization` skill — **Phase 1** (keyword extraction) and **Phase 2** (character sanitization). You don't need the full keyword target list for cover letters, but:
- Use the JD's exact vocabulary when describing skills and achievements
- **Apply these character rules to ALL cover letter content:**
  - NO em-dashes (—) or en-dashes (–) — use commas, periods, or colons instead
  - NO ` - ` (space-hyphen-space) as em-dash substitutes — restructure the sentence
  - NO arrows (→) — write "to" or "from X to Y"
  - NO smart/curly quotes — use straight quotes only
  - NO middle dots (·) — use pipes (|) for separators

> **Why this is explicit:** All three cover letters generated in April 2026 required manual fix passes for em-dash substitutes (` - ` constructions). The model defaults to em-dash-style punctuation. This rule must be applied during drafting, not caught after.

### 3. Draft the Letter

Use the **PSEC structure** (Problem -> Solution -> Evidence -> Call to Action):

1. **Greeting** — Use hiring manager name if known, otherwise "Dear Hiring Team"
2. **Problem** (1-2 sentences) — State the company's challenge that this role addresses. Write from *their* perspective, not yours. Show you understand what they need before talking about yourself.
3. **Solution** (1-2 sentences) — Position yourself as the answer to that problem. Bridge from their need to your capability.
4. **Evidence** (2-3 paragraphs) — Prove your claim with specific accomplishments, metrics, and named tools/frameworks from your work history. Each paragraph should address a key requirement. **If a resume exists with a Key Achievements section, draw Evidence paragraphs from those achievements first** — the cover letter and resume should tell the same story, not introduce different evidence. Show adaptability where relevant — career pivots, M&A transitions, new process builds demonstrate it naturally.
5. **Call to Action** (1-2 sentences) — Suggest a concrete next step. Not "thank you for your consideration" but "Let's discuss how I can help [Company] with [specific challenge]." Propose a timeframe.
6. **Sign-off** — Match the tone (Professional: "Sincerely," / Confident: "Best regards," / Conversational: "Looking forward to connecting,")

**Personality injection**: Include one brief anecdote or specific detail that reveals *how you think* — not just what you did. This is what separates a cover letter from a resume summary. Let your voice come through in word choice and sentence rhythm.

### 4. Rules

- **Draw only from verified profile data** — real achievements, real companies, real metrics
- **Don't repeat the resume** — the cover letter shows personality and narrative, not a bullet list
- **Address gaps by reframing** — if the analysis found a gap, preemptively address it with transferable experience
- **Keep to one page** — 300-400 words maximum (Jobscan optimal range: 250-400)
- **No cliches**: "I'm passionate about...", "I believe I would be a great fit...", "I'm excited about the opportunity to...", "To Whom It May Concern", "I am a hard worker", "I think outside the box"
- **Problem-first, not me-first** — The opening paragraph is about the company's need, not your background. Earn the right to talk about yourself by showing you understand their world first.

### 5. Save Output

Save the cover letter:
```markdown
Save the content to `output/jobs/{company-slug}/cover-letter.md`
```

## Output Format

```markdown
[Greeting],

[PROBLEM: 1-2 sentences on the company's challenge]

[SOLUTION: 1-2 sentences positioning you as the answer]

[EVIDENCE paragraph 1: key requirement + metric-backed proof]

[EVIDENCE paragraph 2: second requirement + proof]

[CALL TO ACTION: concrete next step + timeframe]

[Sign-off],
[Candidate Name]

---
*Tailoring Notes: [Problem identified, solution framing, evidence selected, gaps addressed, personality element used]*
```

## Skills Used

- `career-data` — file paths and schemas for profile and job data
- `resume-positioning` — screening-tested positioning rules (industry vocabulary translation, technology aliases, metric reframing)
- `ats-optimization` — keyword awareness (Phase 1) and character sanitization (Phase 2) only
