# Запускаем frontend в новом окне PowerShell
Start-Process powershell -ArgumentList "-NoExit", "cd frontend; npm run start"

# Запускаем backend в новом окне PowerShell
Start-Process powershell -ArgumentList "-NoExit", "cd backend; npm run start"