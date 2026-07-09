# ATS Readability Audit Checklist

Reference checklist for Phase 3 of the `ats-optimization` skill. Present results as a scorecard after the resume content is finalized.

## Keyword Coverage Check

1. Use the keyword target list from Phase 1 - you already have every term and its target frequency
2. Check each one against the resume - exact match or accepted alias (per `resume-positioning` Rule 3)
3. Flag any requirement that appears in the posting but is **missing entirely** from the resume
4. Report coverage ratio: `X/Y keywords matched (Z%)`
5. **Check the exact job title appears in the Summary section**

## Formatting & Parsability Check (Jobscan-calibrated)

- ✅ No tables in the resume body (ATS parsers cannot reliably parse them - text may appear out of order)
- ✅ No columns or multi-column layouts
- ✅ No headers inside bullet points
- ✅ No images, icons, or special characters as bullet markers (ATS cannot read images)
- ✅ Section headings use standard labels: "Summary", "Key Achievements", "Experience", "Skills", "Education", "Certifications" (not creative alternatives)
- ✅ Dates use a consistent, parseable format (e.g., "Jan 2020 - Mar 2023")
- ✅ No orphaned bullets (achievement lines not clearly under a role heading)
- ✅ **Font**: 1-2 font faces only; use standard ATS-safe fonts (Open Sans, Roboto, Lato, Calibri, Segoe UI, Arial)
- ✅ **Bold styling**: Job titles, company names, and candidate name use bold for readability
- ✅ **Text alignment**: Left-aligned only (no justified text - ATS can't detect spaces in justified blocks)
- ✅ **No special characters overuse**: Minimize special characters that could cause ATS parsing errors
- ✅ **No header/footer content**: Avoid content in PDF header/footer zones - some ATS can't parse them
- ✅ **Page setup**: Standard Letter size, margins between 0.5" and 1"

## Recruiter Tips Check

- ✅ **Job Level Match**: Years of experience are stated explicitly somewhere in the resume (summary or dedicated line)
- ✅ **Measurable Results**: At least 5 bullets contain quantified results
- ✅ **Resume Tone**: No banned words (see career-strategist.md Banned Words list). No cliches or buzzwords.
- [ ] **Web Presence**: LinkedIn URL is included in the contact header
- ✅ **Word Count**: Between 400-1,000 words (under 1,000 for relevance; over 400 for substance)

## Screener Readability Check

- Can a human screener answer "What does this person do?" from the first 3 lines?
- Can they answer "Have they managed people?" within the first 15 seconds? (Key Achievements section should answer this immediately.)
- Are the top 3 most relevant achievements within the first half of the document?
- Does the language mirror the job posting's vocabulary? ("customer" vs "client", "team" vs "group")

## Structural Completeness Check

- ✅ **Key Achievements section exists** between Summary and Experience
- ✅ **Key Achievements count**: 3-5 bullets (not fewer, not more than 5)
- ✅ **Key Achievements pattern**: each bullet follows Action → Scope → Metric → Business Impact chain
- ✅ **Key Achievements breadth**: bullets cover different competency domains (not all from one role or skill area)
- ✅ **No full duplication**: Key Achievements bullets are not copied verbatim into Experience entries
- ✅ **Scope preambles present**: each experience entry has a 1-2 sentence scope preamble before the bullet list
- ✅ **Scope preamble content**: states team size, org functions, and revenue/portfolio scope
- ✅ **Impact chains present**: experience bullets answer "so what?" — not just a metric but a downstream business outcome

## Scorecard Output Template

```
## ATS Readability Audit

| Check                       | Result    | Notes                        |
|-----------------------------|-----------|------------------------------|
| Keyword Coverage            | X/Y (Z%)  | [missing keywords listed]    |
| Job Title in Summary        | ✅/❌      | [exact title check]          |
| Formatting Clean            | ✅/⚠️/❌  | [issues if any]              |
| Recruiter Tips              | X/5 pass  | [failures listed]            |
| Screener Readability        | ✅/⚠️/❌  | [issues if any]              |
| Language Mirroring          | ✅/⚠️/❌  | [mismatches if any]          |
| Structural Completeness     | ✅/⚠️/❌  | [missing elements if any]    |

**Verdict: PASS / NEEDS REVISION**
[If NEEDS REVISION: specific fixes listed as actionable bullets]
```
