// gta6-clipper-01 entry program (Node 22, standard library only).
// The ranked entry is the public YouTube clip itself. This program's only
// job in the grader sandbox is to hand the clip's address to the house:
// it reads VIDEO.json from the repository root and copies that file into
// the output directory, unchanged. It needs no network and it produces
// the same output on every run.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

function resolveDir(envValue: string | undefined, fallback: string): string {
  const trimmed = envValue?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

const repoDir = resolveDir(process.env.MAKEFUN_BOT_DIR, "/bot");
const outDir = resolveDir(process.env.MAKEFUN_OUTPUT_DIR, "/output");
const videoFileName = "VIDEO.json";
const videoSourcePath = join(repoDir, videoFileName);
const videoTargetPath = join(outDir, videoFileName);

if (!existsSync(videoSourcePath)) {
  console.error(`missing ${videoFileName} in ${repoDir}; VIDEO.json must name the public YouTube clip`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(videoSourcePath, videoTargetPath);
console.log(`copied ${videoFileName} to ${videoTargetPath}`);
