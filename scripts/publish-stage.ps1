# 每个阶段在「本机运行 + 用户验收」通过后执行，自动检查、commit、tag、push。
# 示例： .\scripts\publish-stage.ps1 -Version v0.2 -Message "feat: complete v0.2 responsive scaffold"
param(
    [Parameter(Mandatory=$true)][ValidatePattern('^v\d+\.\d+(?:\.\d+)?$')][string]$Version,
    [Parameter(Mandatory=$true)][string]$Message
)
$ErrorActionPreference = 'Stop'
Set-Location (Resolve-Path (Join-Path $PSScriptRoot '..'))

function Check-LastExit([string]$step) {
    if ($LASTEXITCODE -ne 0) { throw "步骤失败：$step。已经中止，未继续执行后续 Git 操作。" }
}

if (-not (Test-Path '.git')) {
    throw '未发现 .git。请先 git init -b main，在 GitHub 创建项目空仓库，并配置 git remote add origin <GitHub仓库SSH或HTTPS地址>。'
}
$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($origin)) {
    throw '未配置 origin。请先在 GitHub 创建项目空仓库并执行 git remote add origin <GitHub仓库URL>。'
}
$exists = git tag --list $Version
if ($exists -eq $Version) { throw "Git 标签 $Version 已存在。请检查历史，不要覆盖已经发布的标签。" }

Write-Host '1/5 运行类型检查...'
npm run type-check
Check-LastExit 'npm run type-check'
Write-Host '2/5 运行构建...'
npm run build
Check-LastExit 'npm run build'
Write-Host '3/5 检查变更（dist、node_modules、视频和密钥在 .gitignore 中）...'
git status --short
Write-Host '准备 Git 暂存与提交...'
git add -A
Check-LastExit 'git add -A'
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) { throw '没有待提交的文件变更，已停止。' }
if ($LASTEXITCODE -ne 1) { throw '无法检查 Git 暂存差异。' }
git commit -m $Message
Check-LastExit 'git commit'
Write-Host "4/5 创建阶段标签 $Version..."
git tag $Version
Check-LastExit 'git tag'
Write-Host '5/5 推送当前分支和阶段标签至 GitHub...'
git push -u origin HEAD
Check-LastExit 'git push branch'
git push origin $Version
Check-LastExit 'git push tag'
Write-Host "完成：本地构建、提交、推送分支和标签 $Version。"
