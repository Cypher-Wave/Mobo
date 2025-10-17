let videoElement = document.getElementById("video");
let takePhotoButton = document.getElementById("take-photo");
let startRecordingButton = document.getElementById("start-recording");
let stopRecordingButton = document.getElementById("stop-recording");
let toggleFullscreenButton = document.getElementById("toggle-fullscreen");
let mediaRecorder;
let recordedChunks = [];

// Função para acessar a câmera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoElement.srcObject = stream;
    setupRecording(stream);
  } catch (error) {
    console.error("Erro ao acessar a câmera:", error);
  }
}

// Função para configurar a gravação
function setupRecording(stream) {
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (event) {
    recordedChunks.push(event.data);
  };

  mediaRecorder.onstop = function () {
    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
    const videoURL = URL.createObjectURL(videoBlob);
    localStorage.setItem("video", videoURL); // Armazenar vídeo no localStorage
    recordedChunks = []; // Limpar o buffer
  };
}

// Função para capturar uma foto
takePhotoButton.addEventListener("click", function () {
  let canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  let context = canvas.getContext("2d");
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  let imageURL = canvas.toDataURL("image/png");
  localStorage.setItem("photo", imageURL); // Armazena img no localStorage
});

// Função para iniciar a gravação de vídeo
startRecordingButton.addEventListener("click", function () {
  mediaRecorder.start();
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;
});

// Função para parar a gravação de vídeo
stopRecordingButton.addEventListener("click", function () {
  mediaRecorder.stop();
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;
});

// Função para alternar o modo tela cheia
toggleFullscreenButton.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    // Entrar em tela cheia
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      // Firefox
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      // IE/Edge
      videoElement.msRequestFullscreen();
    }
    toggleFullscreenButton.textContent = "Sair da Tela Cheia";
  } else {
    // Sair da tela cheia
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
    toggleFullscreenButton.textContent = "Tela Cheia";
  }
});

// Iniciar a câmera quando a página carregar
window.onload = function () {
  startCamera();
};
