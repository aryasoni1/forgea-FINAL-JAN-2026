# content-engine (Python)

This service runs Python-only AI agents and vector DB logic. MUST remain isolated from the Node.js workspace.

Rules:

- Use `requirements.txt` or `pyproject.toml` for Python deps.
- Do NOT add a `package.json` here.
- Do not include this folder in Node build pipelines; keep runtime and CI commands separate.
- Use a dedicated virtual environment (venv) or Poetry.
