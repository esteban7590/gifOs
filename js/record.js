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

const previewBackground = document.getElementById("preview-background");
// previewBackground.style.display = "none";

const uploadedPreview = document.getElementById("uploaded-preview");
// previewBackground.style.display = "none";

const copyLinkButton = document.getElementById("copy-link-button");
// copyLinkButton.style.display = "none";

const downloadButton = document.getElementById("download-button");
// copyLinkButton.style.display = "none";

const doneButton = document.getElementById("done-button");
// timeStopContainer.style.display = "none";

const doneWindowContainer = document.getElementById("done-window-container");
doneWindowContainer.style.display = "none";

const img = document.getElementById("ripit");

var stream = null;
const setRecorder = async () => {
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

const showPreview = (element, blob) => {
  const objectURL = URL.createObjectURL(blob);
  element.src = objectURL;
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
    // let message = result.meta.msg;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    uploadingContainer.innerHTML = "Something fucked up :/ try again";
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

    const looper = () => {
      if (!recorder) {
        return;
      }
      let time = calculateTimeDuration(
        (new Date().getTime() - dateStarted) / 1000
      );
      console.log(time);
      timeElapsed.innerHTML = time;
      setTimeout(looper, 500);
    };

    looper();

    timeStopContainer.style.display = "flex";
    estop.onclick = async () => {
      recordedPreview.style.display = "block";
      await recorder.stopRecording();
      preview.style.display = "none";
      grabar.disabled = false;
      var blob = await recorder.getBlob();
      console.log(blob);
      showPreview(recordedPreview, blob);
      let form = format(blob);
      console.log(form.get("file"));
      var ahref = URL.createObjectURL(blob);
      document.getElementById("file-link").href = ahref;
      timeStopContainer.style.display = "none";
      // upload.style.display = "block";
      // ripit.style.display = "block";
      uploadRepeatContainer.style.display = "flex";
      recorder.reset();
      stream.getTracks().forEach(function (track) {
        console.log("stop");
        track.stop();
      });
      recorder = false;
      upload.onclick = async () => {
        uploadRepeatContainer.style.display = "none";
        recordedPreview.style.display = "none";
        uploadingContainer.style.display = "block";
        cancelButton.style.display = "block";
        let result = await postForm(form);
        let message = result.meta.msg;
        if (message === "OK") {
          document.getElementById("record-window").style.display = "none";
          document.getElementById("crear-window").style.display = "flex";
          document.getElementById("crear-instructions").style.display = "none";
          document.getElementById("window-title-container").style.display =
            "none";
          document.getElementById(
            "empezar-terminar-btn-container"
          ).style.display = "none";
          doneWindowContainer.style.display = "block";
          let uploadedPreview = document.getElementById("uploaded-preview");
          uploadedPreview.style.display = "block";
          showPreview(uploadedPreview, blob);
        } else {
          console.log("something went wrong");
          uploadingContainer.innerHTML = "Something fucked up :/ try again";
        }

        var gifId = result.data.id;
        localStorage.setItem(gifId, JSON.stringify(result));

        copyLinkButton.onclick = async () => {
          let response = await apiFetch(API_URL + "/" + gifId + "?" + API_KEY);
          let giphyUrl = response.url;
          copyToClipboard(giphyUrl);
          copyLinkButton.innerHTML = "Copied!";
          setTimeout(() => {
            copyLinkButton.innerHTML = "Copiar Enlace Giphy";
          }, 1500);
          console.log("link copied");
        };
      };
    };
  };
};
ripit.onclick = () => {
  setRecorder();
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
cancelButton.onclick = () => {
  changeHtml("mis-guifos.html");
};

doneButton.onclick = () => {
  changeHtml("mis-guifos.html");
};

downloadButton.onclick = () => {
  console.log("downloaded");
};

copyLinkButton.onclick = () => {
  copyLinkButton.innerHTML = "Copied!";
  setTimeout(() => {
    copyLinkButton.innerHTML = "Copiar Enlace Giphy";
  }, 1500);
};

const copyToClipboard = (text) => {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

recordGif();
