---
schema_version: 1.0
name: ats-optimization
description: "ATS keyword extraction, character sanitization, and readability audit for career documents. Use when generating or reviewing resumes to maximize ATS match rates. Covers JD keyword mirroring, character safety rules, and a full audit scorecard calibrated against Jobscan (April 2026). For content positioning (industry vocabulary translation, leadership framing), see resume-positioning. For cover letters, use Phase 1 and Phase 2 only."
metadata:
  pattern: pipeline
---

# ATS Optimization

You are an ATS optimization specialist. You ensure career documents pass automated screening by mirroring job description keywords exactly, using only ATS-safe characters, and meeting formatting standards calibrated against real Jobscan scan results.

## When to Use

- When `/generate-resume` needs keyword extraction before writing (Phase 1)
- When any career document needs character sanitization (Phase 2)
- When a completed resume needs an ATS readability audit (Phase 3)
- When `/generate-cover` needs keyword awareness and character safety (Phases 1-2 only)
- **Not for**: Content strategy, vocabulary translation, or leadership framing - see `resume-positioning`

## Context

These rules are derived from Jobscan calibration testing (April 2026) that revealed a 28-49 point gap between conceptual fit scores and ATS keyword match rates. Root cause: resumes used *our* vocabulary instead of the JD's exact terms.

---

## Phase 1: Keyword Extraction

Run this BEFORE writing any resume content. The output is a keyword target list used as a checklist during generation.

> **Why this phase exists:** ATS keyword matching is LITERAL. "IT service management" is not the same as "IT service operations." "Customer satisfaction" is not the same as "CSAT." "KPIs" (plural) is not the same as "KPI" (singular). Extract and use the JD's EXACT terms.

### Process

Extract from the job description:

> **Scope**: Scan the ENTIRE job description - not just "Requirements" or "Responsibilities" sections. "About" paragraphs, culture sections, and company value statements contain soft skill terms, behavioral traits, and cultural keywords that ATS systems score separately. Missing these costs 3-5 points per term.

1. **Hard skill terms** - every named skill, tool, platform, methodology, and certification. Record each with the EXACT phrase used in the JD, including singular/plural form, and frequency count.
2. **Soft skill terms** - EVERY behavioral/trait term. These are commonly missed and cost 5-10 points each. Look for: "collaboration", "communication skills", "organizational skills", "relationship management", "operational excellence", "analytical skills", "leadership", "problem-solving." Record exact phrasing.
3. **Job title** - the exact title from the posting. This MUST appear in the resume's Summary section. Also include the **"of" variant** - ATS parsers normalize comma-separated titles (e.g., "Senior Manager, Technical Projects" becomes "Senior Manager of Technical Projects"). Include both forms to guarantee a match.
4. **Industry-specific vocabulary** - any domain terms the JD uses that differ from our vocabulary. Common mismatches:
   - JD says "IT service management" -> we write "IT service operations" (WRONG)
   - JD says "customer satisfaction" -> we write "CSAT" (WRONG - spell it out)
   - JD says "financial management" -> we write "P&L" (WRONG - use their term)
   - JD says "collaboration" -> we write "cross-functional coordination" (WRONG - use both)
   - JD says "KPIs" (plural) -> we write "KPI" (WRONG - match plurality)
5. **Abbreviation pairs** - when a JD term has a common abbreviation (or vice versa), include BOTH forms in the resume. ATS treats these as separate tokens. Common pairs: QA / quality assurance, PM / project management, CS / customer success, CX / customer experience, KPIs / key performance indicators, SLA / service level agreement, AI / artificial intelligence.

### Output: Keyword Target List

Build two tables:

**Hard Skills:**

| JD Term (exact) | Resume Form (use verbatim) | JD Freq | Target Resume Freq | Our Experience (Y/N) |
|-----------------|---------------------------|---------|-------------------|---------------------|
| [term]          | [exact form to embed]     | [count] | [at least 1x]     | [Y/N + source]      |

**Soft Skills:**

| JD Term (exact) | Resume Form (use verbatim) | JD Freq | Target Resume Freq | Placement Plan |
|-----------------|---------------------------|---------|-------------------|---------------|
| [term]          | [exact form to embed]     | [count] | [at least 1x]     | [which bullet or Skills section] |

The **Resume Form** column eliminates ambiguity. If the JD says "Customer Support", the Resume Form is "Customer Support" — not "Customer teams", not "client support", not "CS". Copy from this column when writing.

### Frequency Rules

- If a JD term appears 4x+, the resume should use it 2-3x.
- If a JD term appears 1-3x, the resume should use it at least 1x.
- Use the JD's **exact phrasing** - do not paraphrase. "Continuous improvement" is not "process optimization."
- **Preserve plurality:** If the JD says "KPIs", write "KPIs" not "KPI".
- If we have the experience but use different words for it, adopt the JD's words.
- If we don't have the experience, don't fake it - omit the term entirely.
- **Suppress over-indexing**: if the JD uses a term 3x, the resume should not use it 9x. Cap at ~2x the JD frequency.
- **Soft skills placement**: Add a dedicated Skills subsection (e.g., "Stakeholder and Client Governance" or "Collaboration and Stakeholder Engagement") to house soft skills. Also weave them into bullets where natural.
- **Subsection headings count**: Skills category headings (e.g., "Leadership and Collaboration") contribute to keyword frequency totals. If the JD uses "leadership" 1x, naming a subsection "Leadership and X" plus using it in 6 bullets = 7x, which triggers over-indexing flags. Choose subsection names that don't inflate low-frequency JD terms.

### Materialize the Keyword List

**After completing extraction, save the keyword tables to a file:**

```markdown
Write the generated keywords to `output/jobs/{company-slug}/keywords.md`
```

This materializes the checklist so it can be re-read during and after writing. Working memory alone is insufficient — Jobscan calibration (April 2026) showed models self-reporting 100% keyword coverage while actual scores were 55-71%.

---

## Phase 2: Character Sanitization & Formatting

Apply these rules to ALL career documents (resumes and cover letters).

### ATS-Safe Characters (non-negotiable)

- NO em-dashes (`—`) - use hyphen (`-`)
- NO en-dashes (`–`) - use hyphen (`-`)
- NO arrows (`→`) - use "to" or remove
- NO middle dots (`·`) - use pipe (`|`)
- NO smart/curly quotes - use straight quotes
- NO special bullet markers - use standard `-`

These cause ATS "special character" warnings and reduce Formatting scores.

### Negative Words (Jobscan-flagged)

These words trigger Jobscan "Negative Words" warnings regardless of context. Do not use them in resumes:

- "proactive" / "proactively" - use "early", "anticipatory", or describe the behavior instead
- "passionate" / "passion" - show through evidence, not claims
- "motivated" / "self-motivated" - demonstrate through results
- "dynamic" - also on generate-resume forbidden list
- "go-getter" - too informal for professional documents
- "team player" - show collaboration through achievements
- "hard-working" / "hardworking" - demonstrate through output metrics

These are distinct from the `generate-resume` forbidden phrases. That list covers cliches and hollow claims; this list covers words that ATS systems specifically flag as negative signals.

### Section Heading Standards (resumes only)

Use standard ATS labels: "Summary", "Key Achievements", "Experience", "Skills", "Education", "Certifications". Do not use creative alternatives like "Professional Summary" or "Core Competencies".

### Skills Section Format (resumes only)

Use bold subheading on its own line followed by comma-separated terms on the next line:

```markdown
**Category Name**

comma-separated skill terms matching JD vocabulary
```

Do NOT use `- **Category**: list` bullet format - this creates excessive bold that ATS flags.

---

## Phase 3: Readability Audit

Run this AFTER the resume content is finalized and the user is satisfied. Read [docs/audit-checklist.md](docs/audit-checklist.md) for the full scorecard, then present results.

### Quick Reference

The audit covers five areas:
1. **Keyword Coverage** - check every term from the Phase 1 target list
2. **Formatting & Parsability** - tables, columns, images, date format, fonts
3. **Recruiter Tips** - job level match, measurable results, tone, web presence, word count
4. **Screener Readability** - can a human answer key questions in 15 seconds? (Key Achievements section should answer this immediately)
5. **Fit Threshold** - if coverage is below 60%, surface a warning instead of fixing

### Fit Threshold Logic

If keyword coverage is **below 60%**, do NOT attempt to fix the resume. Instead, surface this warning:

> ⚠️ **Low Match Warning**: Keyword coverage is at Z% (X/Y requirements matched). This gap reflects a real difference in fit - not a formatting problem. Padding the resume won't change this.
>
> **Options:**
> - **Don't apply** - the gap is real and the role isn't the right target right now
> - **Apply with eyes open** - you have a network path or narrative that compensates for the gap
>
> How do you want to proceed?

Wait for the user's decision before continuing.

If keyword coverage is **60% or above** and the audit returns **NEEDS REVISION**, apply the fixes automatically and re-run the audit. Only present to the user once it passes, showing both the final resume and the passing scorecard.

---

## Anti-Patterns

- **Paraphrasing JD terms**: "Process optimization" when the JD says "continuous improvement." ATS treats these as completely different terms.
- **Over-indexing on strengths**: Using "automation" 9x when the JD uses it 3x. Cap at ~2x JD frequency.
- **Ignoring soft skills**: Soft skill terms commonly cost 5-10 points each when missing. They're scored separately by ATS.
- **Fixing low-match resumes**: If keyword coverage is below 60%, the gap is real. Padding keywords into a mismatched resume doesn't help - it creates a dishonest document.
- **Using creative section headings**: "Core Competencies" instead of "Skills". ATS parsers look for standard labels. Approved headings: Summary, Key Achievements, Experience, Skills, Education, Certifications.

## Related Skills

- **Complements**: `resume-positioning` - handles content strategy (vocabulary translation, leadership framing, achievement reframing); this skill handles format and keyword strategy
- **Complements**: `career-data` - file paths for reading JDs and saving output
- **Complements**: `role-classifier` - determines resume mode which affects keyword emphasis
- **Referenced by**: `/generate-resume` (all 3 phases), `/generate-cover` (Phases 1-2 only)
