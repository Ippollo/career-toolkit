---
description: Convert resume/cover letter to PDF.
---

# Export PDF

Converts a finalized markdown resume or cover letter into a professionally styled PDF.

## Prerequisites

- Node.js installed (already available)
- The markdown file has been reviewed and approved by the user

## Steps

// turbo-all

### 1. Confirm the Target File

Ask the user which markdown file to convert. They may:
- Provide a file path directly
- Reference a job name (find the latest resume/cover letter for that job)
- Say "the resume" or "the cover letter" if context is clear

Validate the file exists and has a `.md` extension.

### 2. Generate the PDF

Run the conversion (or ask your LLM to run it if it has terminal access):

```powershell
node assets/pdf/md-to-pdf.js <file-path> --stylesheet assets/pdf/resume-style.css
```

> **Note:** This uses a wrapper script (`md-to-pdf.js`) that calls the md-to-pdf API directly, bypassing the CLI's `get-stdin` bug that causes indefinite hangs in non-piped terminals.

Then move the generated PDF to your desired output location (like your Downloads folder), renaming to drop any double-extensions:

```powershell
Move-Item <generated-pdf> "<target-directory>\<clean-name>.pdf" -Force
```

### 3. Confirm Output

Verify the PDF file was created in `<target-directory>`. Report:
- Output file path
- File size

Let the user know they can open it to review the formatting.

## Notes

- The CSS stylesheet at `assets/pdf/resume-style.css` controls all visual styling. Edit it to change fonts, margins, or layout.
- To combine a resume and cover letter into a single PDF, concatenate them into one markdown file with a `<div class="page-break"></div>` between them, then run this workflow once.
- Tailoring notes (italic text after the final `---`) are automatically hidden in the PDF output.
