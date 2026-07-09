# Career Toolkit

An LLM-agnostic, multi-agent toolkit for managing career transitions, job searches, and consulting pipelines. 

This repository provides a structured way to store your career data locally (so it's never ingested into training models without your consent) and a set of workflows, agents, and skills to help you generate highly tailored resumes, prepare for interviews, and analyze job opportunities.

## How It Works

This toolkit is designed to be used with any LLM (ChatGPT, Claude, Gemini, etc.) or multi-agent framework. 

It separates **Data** (your profile, history, pipeline) from **Logic** (the agents, skills, and workflows). You provide the LLM with the context it needs by pasting or loading the relevant local files.

## Getting Started

1. **Clone the repository** to your local machine.
2. **Set up your data:**
   - Copy `config.template.md` to `config.md` and fill in your details.
   - Copy `pipeline.template.md` to `pipeline.md`.
   - Copy `strategy/positioning.template.md` to `strategy/positioning.md` and define your personal strategy.
   - Go to `data/templates/` and use them to create your `data/profile.md` and your `data/job-history/*.md` files.
3. **Start using workflows:**
   - Pick a workflow from the `workflows/` directory (e.g., `analyze-job.md`).
   - Follow the instructions in the workflow, providing the necessary files to your LLM.

## Repository Structure

- `data/`: Your personal career data (profile, job history). **Never commit your personal data if you fork this repository.**
- `strategy/`: Your positioning rules, vocabulary translation, and target industry metrics.
- `output/`: The generated artifacts (resumes, cover letters, gap analyses).
- `workflows/`: Step-by-step instructions (prompts) to accomplish specific tasks.
- `agents/`: System prompts defining specialized AI personas (e.g., Career Strategist, Business Advisor).
- `skills/`: Complex reasoning frameworks (e.g., `resume-positioning`) that agents use to perform specialized tasks.
- `knowledge/`: General knowledge and frameworks (e.g., Alex Hormozi's business frameworks) referenced by the strategic agents.

## Privacy and Data Security

By design, this toolkit stores all your personal information in local markdown files. The `.gitignore` is pre-configured to ignore all files in `data/`, `output/`, and the root `.md` files (except templates) to ensure you don't accidentally push your private career details, contact information, or proprietary job analyses to a public repository.

## License

MIT License. Feel free to fork, modify, and share.
