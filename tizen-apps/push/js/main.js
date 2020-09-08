
window.onload = function() {
    var serverPage = 'http://192.168.178.129/tizen/server_sent_events_server.php';
    var eventSource = new EventSource(serverPage);
    var log = document.getElementById('log');

    /* Open event */
    eventSource.onopen = function(e) {
        log.innerHTML += '<p>-----------------------</p>';
        log.innerHTML += '<p>open: ' + new Date() + '</p>';
    };

    /* message event */
    eventSource.onmessage = function(e) {
        log.innerHTML += '<p>[push data]: <br/>' + e.data + '</p>';
    };
}