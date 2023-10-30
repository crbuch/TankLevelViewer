@echo off
start cmd /k "python server.py"
start cmd /k "ngrok http 8080"