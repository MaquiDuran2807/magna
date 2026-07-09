# Genera variables de entorno desde el .env del proyecto
param()

$envFile = Join-Path $PSScriptRoot "..\..\.env"
$ansibleVars = @{}

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -and $line -notmatch '^\s*#') {
            $parts = $line -split '=', 2
            if ($parts.Count -eq 2) {
                $key = $parts[0].Trim()
                $val = $parts[1].Trim().Trim('"').Trim("'")
                if ($key -and $val) {
                    Set-Item -Path "env:$key" -Value $val
                }
            }
        }
    }
    Write-Host "[OK] Variables cargadas desde .env"
} else {
    Write-Host "[WARN] .env no encontrado en $envFile"
}
