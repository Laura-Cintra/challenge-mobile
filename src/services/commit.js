import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Captura o hash do último commit
const commitHash = execSync("git rev-parse HEAD").toString().trim();

// Caminho do arquivo JSON a ser gerado
const outputPath = path.resolve("./src/services/commit.json");

// Cria o JSON com o hash
fs.writeFileSync(outputPath, JSON.stringify({ commit: commitHash }, null, 2));

console.log(`Commit hash salvo em ${outputPath}`);
console.log(`Hash: ${commitHash}`);