@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM
@REM Required ENV Vars:
@REM JAVA_HOME - location of a JDK home dir
@REM
@REM optional ENV vars
@REM MAVEN_BATCH_ECHO - set to 'on' to enable the echoing of the input commands
@REM MAVEN_BATCH_PAUSE - set to 'on' to pause at the end of this script
@REM MAVEN_OPTS - parameters to pass to the Java VM when running Maven
@REM     e.g. to debug Maven itself, use
@REM set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
@REM MAVEN_SKIP_RC - flag to disable loading of mavenrc files
@REM ----------------------------------------------------------------------------

@REM Begin all REM lines with '@' in case MAVEN_BATCH_ECHO is 'on'
@echo off
@setlocal EnableExtensions EnableDelayedExpansion

set ERROR_CODE=0

@REM To isolate internal variables from possible post configs, we use another set of variables
set "WRAPPER_JAR=%~dp0\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%~dp0\.mvn\wrapper\maven-wrapper.properties"

if exist "%WRAPPER_JAR%" goto runWrapper

if not exist "%WRAPPER_PROPERTIES%" (
  echo Error: %WRAPPER_PROPERTIES% not found!
  exit /b 1
)

for /f "tokens=2 delims==" %%i in ('findstr "wrapperUrl" "%WRAPPER_PROPERTIES%"') do (
  set "WRAPPER_URL=%%i"
)

echo Downloading Maven Wrapper JAR from !WRAPPER_URL!...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('!WRAPPER_URL!', '%WRAPPER_JAR%')"
if ERRORLEVEL 1 (
  echo Error downloading %WRAPPER_JAR%
  exit /b 1
)

:runWrapper
if not defined JAVA_HOME (
  for %%i in (java.exe) do set "JAVACMD=%%~$PATH:i"
) else (
  set "JAVACMD=%JAVA_HOME%\bin\java.exe"
)

if not exist "%JAVACMD%" (
  echo The JAVA_HOME environment variable is not defined correctly.
  echo It is needed to run this program.
  exit /b 1
)

"%JAVACMD%" %MAVEN_OPTS% -jar "%WRAPPER_JAR%" %*
exit /b %ERRORLEVEL%
