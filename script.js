const video = document.getElementById('video')
faceapi.env.monkeyPatch({
Canvas: HTMLCanvasElement,
Image: HTMLImageElement,
ImageData: ImageData,
Video: HTMLVideoElement,
createCanvasElement: () => document.createElement('canvas'),
createImageElement: () => document.createElement('img')
})
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(`${__dirname}/models`),
  faceapi.nets.faceRecognitionNet.loadFromUri(`${__dirname}/models`),
  faceapi.nets.faceLandmark68Net.loadFromUri(`${__dirname}/models`),
  faceapi.nets.ssdMobilenetv1.loadFromUri(`${__dirname}/models`)
]).then(startVideo)

function startVideo() {
  document.body.append('Loaded')
  navigator.getUserMedia(
    { video: {}},
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    resizedDetections.forEach(detection => {
      const box = detection.detection.box;
      const drawbox = new faceapi.draw.DrawBox(box, { label:'face'})
      drawbox.draw(canvas)
    })
  }, 50)
})
