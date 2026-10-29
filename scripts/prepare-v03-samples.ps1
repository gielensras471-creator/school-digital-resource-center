param(
  [Parameter(Mandatory = $true)]
  [string]$SourceRoot,
  [switch]$Overwrite
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path $SourceRoot '1.一（下）\1.一（下）\第二周长撇'
$target = Join-Path $projectRoot 'public\videos\calligraphy\g1\w02'
$names = @(
  '1.长撇.mp4',
  '2.人.mp4',
  '3.广.mp4',
  '4.少.mp4',
  '5.左.mp4',
  '6.在.mp4'
)

if (-not (Test-Path -LiteralPath $source -PathType Container)) {
  throw "找不到样本目录：$source。请将 -SourceRoot 指向含有 1.一（下） 等五个年级文件夹的父目录。"
}

# 先完整核验六个文件，避免部分复制成功造成误判。
$missing = @($names | Where-Object { -not (Test-Path -LiteralPath (Join-Path $source $_) -PathType Leaf) })
if ($missing.Count -gt 0) {
  throw "样本不完整，缺少：$($missing -join ', ')"
}

New-Item -ItemType Directory -Path $target -Force | Out-Null
foreach ($name in $names) {
  $destination = Join-Path $target $name
  if ((Test-Path -LiteralPath $destination) -and (-not $Overwrite)) {
    Write-Host "已存在，跳过：$name（如需覆盖加 -Overwrite）" -ForegroundColor Yellow
    continue
  }
  Copy-Item -LiteralPath (Join-Path $source $name) -Destination $destination -Force
  Write-Host "已复制：$name" -ForegroundColor Green
}
Write-Host "V0.3 本地样本准备完成：$target" -ForegroundColor Green
Write-Host 'MP4 已在 .gitignore 中排除，不会作为普通源码提交。'
