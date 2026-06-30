$ErrorActionPreference = "Stop"

$preferredPort = 4178
$appPath = Join-Path $PSScriptRoot "outputs"
$serverPath = Join-Path $PSScriptRoot "server.py"

if (-not (Test-Path -LiteralPath $appPath)) {
  Write-Host "Could not find app folder: $appPath" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path -LiteralPath $serverPath)) {
  Write-Host "Could not find app server: $serverPath" -ForegroundColor Red
  exit 1
}

$pythonCandidates = @(
  (Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"),
  "python",
  "py"
)

$python = $null
foreach ($candidate in $pythonCandidates) {
  try {
    $version = & $candidate --version 2>$null
    if ($LASTEXITCODE -eq 0 -and $version) {
      $python = $candidate
      break
    }
  } catch {
    # Try the next Python candidate.
  }
}

if (-not $python) {
  Write-Host "Python was not found. Install Python or start the app from Codex." -ForegroundColor Red
  exit 1
}

function Test-PortAvailable {
  param([int]$Port)

  $listener = $null
  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
    $listener.Start()
    return $true
  } catch {
    return $false
  } finally {
    if ($listener) {
      $listener.Stop()
    }
  }
}

$port = $preferredPort
while (-not (Test-PortAvailable -Port $port)) {
  $port += 1
}

$ipAddresses = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
  Where-Object {
    $_.IPAddress -notlike "127.*" -and
    $_.IPAddress -notlike "169.254.*" -and
    $_.InterfaceAlias -notmatch "Loopback"
  } |
  Select-Object -ExpandProperty IPAddress

Write-Host ""
Write-Host "CGC Quote Calculator LAN server" -ForegroundColor Cyan
Write-Host "Serving folder: $appPath"
Write-Host "Port: $port"
Write-Host ""
Write-Host "Open this on this PC:" -ForegroundColor Green
Write-Host "  http://127.0.0.1:$port/"
Write-Host ""

if ($ipAddresses) {
  Write-Host "Your work mates can try one of these addresses while on the same Wi-Fi:" -ForegroundColor Green
  foreach ($ip in $ipAddresses) {
    Write-Host "  http://$ip`:$port/"
  }
} else {
  Write-Host "Could not automatically find your LAN IP. Run ipconfig and use your IPv4 address:" -ForegroundColor Yellow
  Write-Host "  http://YOUR-IP-ADDRESS:$port/"
}

Write-Host ""
Write-Host "Leave this window open while people are using the app. Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

Set-Location -LiteralPath $PSScriptRoot
& $python $serverPath $port
