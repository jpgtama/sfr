add-type -AssemblyName microsoft.VisualBasic

add-type -AssemblyName System.Windows.Forms

Function startCMD ($title, $wd, $c){
    echo "params: $title, $wd, $c"
    start cmd.exe 

    start-sleep -Milliseconds 3000

    [Microsoft.VisualBasic.Interaction]::AppActivate("cmd.exe")

    [System.Windows.Forms.SendKeys]::SendWait("title $title")
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")

    [System.Windows.Forms.SendKeys]::SendWait("cd $wd")
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    start-sleep -Milliseconds 3000

    [System.Windows.Forms.SendKeys]::SendWait($c)
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    start-sleep -Milliseconds 3000

    Write-Host  "DONE" -ForegroundColor Green
}


##############################

$cwd = Split-Path -Parent $MyInvocation.MyCommand.Definition
$projectFolder =  Split-Path -Parent $cwd

Write-Host  "project folder is $projectFolder" -ForegroundColor Green

# start apache
startCMD 'Apache' 'D:\developer_programs\web-servers\apache24\Apache24\bin'  'httpd.exe'

# start Mysql
startCMD 'MySQL' 'D:\developer_programs\mysql-5.7.11-winx64\bin'  'mysqld.exe --console'

# start gulp watch
startCMD 'Gulp Watch' $projectFolder  'npm run gulp watch'

# start sass watch
startCMD 'Sass' "$projectFolder\\src\fe\styles"  'sass index.scss:index.css --watch --style expanded'