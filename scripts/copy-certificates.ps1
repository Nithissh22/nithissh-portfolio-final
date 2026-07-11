# Run this script to copy certificate files from OneDrive to the portfolio.
# If any fail due to OneDrive cloud sync timeouts, right-click the files in 
# File Explorer > "Always keep on this device", wait for sync, then re-run.

$dest = "d:\Portfolio\public\certificates"

$files = @(
    @{ src = "C:\Users\Nithissh\OneDrive\Desktop\certificates\C#.pdf"; dst = "csharp.pdf" },
    @{ src = "C:\Users\Nithissh\OneDrive\Desktop\certificates\computer-networks-certificates.pdf"; dst = "computer-networks.pdf" },
    @{ src = "C:\Users\Nithissh\OneDrive\Desktop\certificates\network-security-computer-networks.pdf"; dst = "network-security.pdf" },
    @{ src = "C:\Users\Nithissh\OneDrive\Desktop\certificates\TATA-GEN-AI.pdf"; dst = "tata-gen-ai.pdf" },
    @{ src = "C:\Users\Nithissh\OneDrive\Desktop\certificates\Yuga-Yatra-intern-certificate.jpeg"; dst = "yuga-yatra-intern.jpg" },
    @{ src = "C:\Users\Nithissh\OneDrive\Desktop\certificates\Google Analytics Certification • Nithissh S G • Skillshop.html"; dst = "google-analytics.html" },
    @{ src = "C:\Users\Nithissh\OneDrive\Desktop\Udemy CERTIFICATES\hackerrank\sql_advanced certificate.pdf"; dst = "sql-advanced.pdf" }
)

foreach ($f in $files) {
    $target = Join-Path $dest $f.dst
    if (Test-Path $target) {
        Write-Host "[SKIP] $($f.dst) already exists" -ForegroundColor Yellow
        continue
    }
    try {
        Copy-Item $f.src $target -Force -ErrorAction Stop
        Write-Host "[OK]   $($f.dst)" -ForegroundColor Green
    } catch {
        Write-Host "[FAIL] $($f.dst) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nDone. Files in certificates folder:"
Get-ChildItem $dest | Select-Object Name, Length
