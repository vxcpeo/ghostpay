# Rebrand blocked before editing

- Checked: 2026-10-21T16:48:49.332Z
- Reason: all checked candidates failed X or .xyz availability
- Browser: chrome-cdp Chrome/155.0.8059.85
- Proxy: direct

| Candidate | .xyz | X | Verdict |
|---|---|---|---|
| **veilova** | available | taken | fail |

No project files were edited. Generate the next naming wave if candidates were exhausted:

```bash
python "<skill>/scripts/name.py" --project "<project>" --out "<project>/.rebrand" --count 60 --wave 2
node "<skill>/scripts/check.mjs" --project "<project>" --out "<project>/.rebrand" --top 10
```

If the environment is offline, configure a working proxy or network and rerun the Chrome check. Never pick an unverified name.
