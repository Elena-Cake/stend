http://modeller:9090/run  Запуск задачи, возвращает строку 'running process 265982' при успешном запуске
http://modeller:9090/getlog Запрос лога, возвращает текущее состояние задачи, при выполнении возвращает - 'finished'
http://modeller:9090/getres Запрос результата. Если расчет не окончен выдает строку  Wait for process is finished or kill process 266401
http://modeller:9090/abort Принудительное завершение выполнения задачи


C:\Program Files\Google\Chrome\Application\chrome.exe --disable-web-security --user-data-dir="D:\temp"