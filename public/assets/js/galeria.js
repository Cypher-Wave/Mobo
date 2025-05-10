window.onload = function () {
  const galleryElement = document.getElementById("gallery");

  // Exibir a foto armazenada
  const photoData = localStorage.getItem("photo");
  if (photoData) {
    let imgElement = document.createElement("img");
    imgElement.src = photoData;
    galleryElement.appendChild(imgElement);
  }

  // Exibir o vídeo armazenado
  const videoData = localStorage.getItem("video");
  if (videoData) {
    let videoElement = document.createElement("video");
    videoElement.controls = true;
    videoElement.src = videoData;
    galleryElement.appendChild(videoElement);
  }
};
