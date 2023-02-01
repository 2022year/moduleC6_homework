const inpMessage = document.querySelector('.inputMessage');
const btnSending = document.querySelector('.btnSend');
const btnGeoLocation = document.querySelector('.btnGeo');
const boxChating = document.querySelector('.chatBox');
const inform = document.querySelector('.info');

const url = "wss://echo.websocket.events/.ws";
let websocket;

websocket = new WebSocket(url);

function writeToScreen(message) {
	let tag = document.createElement("p");
	tag.style = "break-word";
	tag.innerHTML = message;
	boxChating.appendChild(tag);
	boxChating.scrollTop = boxChating.scrollHeight;
}

btnSending.addEventListener('click', () => {
    const message = inpMessage.value;
    if (message != '') {
    	writeToScreen('<span class="sendUser">' + message +'</span>');
    	websocket.send('СЕРВЕР: '+message);
    	inpMessage.value = '';
    } 
});

websocket.onopen = function(e) {
    inform.innerHTML = '<span style="color: green;">Соединение работает</span>';
}

websocket.onmessage = function(evt) {
    if (evt.data !== 'echo.websocket.events sponsored by Lob.com') {
    	writeToScreen('<span class="sendServer">' + evt.data +'</span>');
    }
};

websocket.onclose = function(e) {
    inform.innerHTML = '<span style="color: red;">Соединение отсутствует</span>\
    <button id="reset" class="btnReset">Обновить</button>';
    const btn = document.querySelector('.btnReset');
    
    btn.addEventListener('click', () => {
        location.reload(); 
    });
}


websocket.onerror = function(evt) {
    writeToScreen('<span class="sendServer" style="color: red;">ERROR: </span> ' + evt.data);
  };


btnGeoLocation.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            writeToScreen(`<a class="sendUser" href = https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude} \
            id="map-link" target="_blank">Ваша геолокация</a>`)
        }, () => {
            writeToScreen(`<span class="sendServer" style="color: red;">Необходимо разрешить доступ к геолокации.</span>`);
        });
    } else {
        writeToScreen(`<span class="sendServer" style="color: red;">Геолокация не определена</span>`);   
    }
});
