# Rollback

The byte-for-byte rebrand backup was moved outside the Vue project root so the
reskin inventory does not scan the pre-rebrand `.vue` sources as live code.
Nothing was deleted.

- Backup: `E:/workspace/chuangye/solana/ghostpay/.reskin-archive/rebrand-backups/veilary-run-20261022/backup/20261022-005828`
- Extended surfaces: `E:/workspace/chuangye/solana/ghostpay/.reskin-archive/rebrand-backups/veilary-run-20261022/backup/extended/`
- `brand.txt` backup: `E:/workspace/chuangye/solana/ghostpay/.reskin-archive/rebrand-backups/veilary-run-20261022/backup/brandfile-20261022-005643.txt`

Restore the site from the archived backup (copy every file back over the project):

```powershell
$backup = 'E:\workspace\chuangye\solana\ghostpay\.reskin-archive\rebrand-backups\veilary-run-20261022\backup\20261022-005828'
Copy-Item -Path (Join-Path $backup '*') -Destination 'E:\workspace\chuangye\solana\ghostpay\website' -Recurse -Force
```

Then restore the extended surfaces individually from `backup/extended/`
(`root-brand.txt` → repository `brand.txt`, `root-README.md` → repository `README.md`,
`twitter-*` → `twitter/`), rebuild with `npm run build`, and re-run
`node scripts/validate.mjs`.

The original skill command below only works if the backup tree is first copied
back to `website/.rebrand/backup/`:

```bash
python "<skill>/scripts/rollback.py" --project "E:\workspace\chuangye\solana\ghostpay\website" --out "E:\workspace\chuangye\solana\ghostpay\website\.rebrand" --latest
```
