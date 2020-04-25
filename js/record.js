const preview = document.getElementById("preview");

var recorder;

let recordedPreview = document.getElementById("recorded-preview");

const grabar = document.getElementById("grabar");

const estop = document.getElementById("estop");
estop.style.display = "none";
const upload = document.getElementById("upload");
// upload.style.display = "none";
const ripit = document.getElementById("ripit");
// ripit.style.display = "none";

const timeElapsed = document.getElementById("time-elapsed");

const timeStopContainer = document.getElementById("time-stop-container");
timeStopContainer.style.display = "none";

const uploadRepeatContainer = document.getElementById(
  "upload-repeat-container"
);
uploadRepeatContainer.style.display = "none";

const previewBackground = document.getElementById("preview-background");
// previewBackground.style.display = "none";

const img = document.getElementById("ripit");

const setRecorder = async () => {
  let stream = null;
  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      height: { max: 500 },
    },
    audio: false,
  });
  preview.srcObject = stream;
  preview.play();
  return stream;
};

const record = async () => {
  try {
    let stream = await setRecorder();
    recorder = new RecordRTCPromisesHandler(stream, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      // canvas: { width: 200, height: 200 },
    });
    return recorder;
  } catch (err) {
    console.log(err);
  }
};

const showPreview = (blob) => {
  const objectURL = URL.createObjectURL(blob);
  recordedPreview.src = objectURL;
};

const format = (blob) => {
  let form = new FormData();
  form.append("file", blob, "myGif.gif");
  return form;
};

const postForm = async (form) => {
  try {
    let response = await fetch(
      "http://upload.giphy.com/v1/gifs?api_key=nviDGCCp3515X3VeiJdD4zAohJ9inqtJ",
      {
        method: "POST",
        body: form,
      }
    );
    let result = await response.json();
    console.log(await result.meta.msg);
  } catch (err) {
    console.log(err);
  }
};

function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);

  if (min < 10) {
    min = "0" + min;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }

  if (hr <= 0) {
    return min + ":" + sec;
  }

  return hr + ":" + min + ":" + sec;
}

const recordGif = () => {
  grabar.onclick = async () => {
    grabar.disabled = true;
    grabar.style.display = "none";
    estop.style.display = "flex";
    let recorder = await record();
    recorder.startRecording();
    let dateStarted = new Date().getTime();

    (function looper() {
      if (!recorder) {
        return;
      }
      let time = calculateTimeDuration(
        (new Date().getTime() - dateStarted) / 1000
      );
      // console.log(time);
      timeElapsed.innerHTML = time;
      setTimeout(looper, 1000);
    })();

    timeStopContainer.style.display = "flex";
    estop.onclick = async () => {
      recordedPreview.style.display = "block";
      await recorder.stopRecording();
      preview.style.display = "none";
      grabar.disabled = false;
      let blob = await recorder.getBlob();
      console.log(blob);
      showPreview(blob);
      let form = format(blob);
      console.log(form.get("file"));
      timeStopContainer.style.display = "none";
      // upload.style.display = "block";
      // ripit.style.display = "block";
      uploadRepeatContainer.style.display = "flex";
      recorder = null;
      upload.onclick = async () => {
        uploadRepeatContainer.style.display = "none";
        recordedPreview.style.display = "none";
        await postForm(form);
      };
    };
  };

  ripit.onclick = () => {
    grabar.style.display = "flex";
    uploadRepeatContainer.style.display = "none";
    // ripit.style.display = "none";
    // upload.style.display = "none";
    preview.style.display = "block";
    recordedPreview.style.display = "none";
    timeStopContainer.style.display = "none";
    img.setAttribute("src", "");
    recordGif();
    recorder.reset();
  };
};

recordGif();
