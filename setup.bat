@echo off
echo 🚀 Setting up Resume Builder Application...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

:: Install root dependencies
echo 📦 Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

:: Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

:: Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

:: Create environment files if they don't exist
if not exist "backend\.env.local" (
    echo 📝 Creating backend environment file...
    copy "backend\.env" "backend\.env.local" >nul 2>&1
)

:: Build frontend for production (optional)
echo 🏗️ Building frontend...
cd frontend
call npm run build
cd ..

echo.
echo 🎉 Setup complete!
echo.
echo To start the application:
echo   npm run dev       - Start both frontend and backend in development mode
echo   npm run dev:frontend - Start only frontend development server
echo   npm run dev:backend  - Start only backend development server
echo.
echo The application will be available at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo Happy coding! 🚀
pause