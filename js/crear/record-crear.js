var stream, dateStarted, recorder, result, gifId, blob, form, controller;

//containers used more than once
const uploadingContainer = document.getElementById("uploading-container");
const timeStopContainer = document.getElementById("time-stop-container");
const uploadRepeatContainer = document.getElementById(
  "upload-repeat-container"
);

//img or video tags used more than once
const recordedPreview = document.getElementById("recorded-preview");
const preview = document.getElementById("preview");
const uploadedPreview = document.getElementById("uploaded-preview");

//Buttons used more than once
const cancelButton = document.getElementById("cancel-button");
const recordButton = document.getElementById("record-button");
const stopButton = document.getElementById("stop-button");
const uploadButton = document.getElementById("upload");
const repeatButton = document.getElementById("repeat-button");
const copyLinkButton = document.getElementById("copy-link-button");

//environment setup
const initialSetup = () => {
  document.getElementById("nav-buttons").style.display = "none";
  document.getElementById("done-window-container").style.display = "none";
  uploadingContainer.style.display = "none";
  timeStopContainer.style.display = "none";
  uploadRepeatContainer.style.display = "none";
  cancelButton.style.display = "none";
};

const setCrearWindow = () => {
  document.getElementById("start").onclick = () => {
    document.getElementById("mis-guifos-section").style.display = "none";
    document.getElementById("crear-window").style.display = "none";
    recordButton.style.display = "flex";
    document.getElementById("record-window").style.display = "flex";
    setRecorder();
  };

  document.getElementById("cancel").onclick = () => {
    setUrl("mis-guifos.html");
  };
};

//recording related functions
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

const recordGif = () => {
  recordButton.onclick = async () => {
    recordButton.disabled = true;
    recordButton.style.display = "none";
    stopButton.style.display = "flex";
    timeStopContainer.style.display = "flex";
    recorder = await record();
    recorder.startRecording();
    dateStarted = new Date().getTime();
    looper();
  };
};

const looper = () => {
  if (!recorder) {
    return;
  }
  const time = calculateTimeDuration(
    (new Date().getTime() - dateStarted) / 1000
  );
  console.log(time);
  document.getElementById("time-elapsed").innerHTML = time;
  setTimeout(looper, 1000);
};

const calculateTimeDuration = (secs) => {
  let hr = Math.floor(secs / 3600);
  let min = Math.floor((secs - hr * 3600) / 60);
  let sec = Math.floor(secs - hr * 3600 - min * 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return hr + ":" + min + ":" + sec;
};

const record = async () => {
  try {
    let stream = await setRecorder();
    recorder = new RecordRTCPromisesHandler(stream, {
      type: "gif",
      frameRate: 1,
      quality: 10,
    });
    return recorder;
  } catch (err) {
    console.log(err);
  }
};

const stopGifRecording = () => {
  stopButton.onclick = async () => {
    recordedPreview.style.display = "block";
    await recorder.stopRecording();
    preview.style.display = "none";
    recordButton.disabled = false;
    blob = await recorder.getBlob();
    console.log(blob);
    showPreview(recordedPreview, blob);
    form = format(blob);
    console.log(form.get("file"));
    document.getElementById("file-link").href = URL.createObjectURL(blob);
    timeStopContainer.style.display = "none";
    uploadRepeatContainer.style.display = "flex";
    recorder.reset();
    stream.getTracks().forEach(function (track) {
      console.log("stop");
      track.stop();
    });
    recorder = false;
  };
};

const format = (blob) => {
  let form = new FormData();
  form.append("file", blob, "myGif.gif");
  return form;
};

const showPreview = (element, blob) => {
  element.src = URL.createObjectURL(blob);
};

const uploadGif = () => {
  uploadButton.onclick = async () => {
    uploadRepeatContainer.style.display = "none";
    recordedPreview.style.display = "none";
    uploadingContainer.style.display = "block";
    cancelButton.style.display = "block";

    createProgressBarBoxes();

    result = await postForm(form);
    if (result) {
      gifId = result.data.id;
      localStorage.setItem(gifId, JSON.stringify(result));

      const message = await result.meta.msg;
      if (message === "OK") {
        document.getElementById("record-window").style.display = "none";
        document.getElementById("crear-window").style.display = "flex";
        document.getElementById("crear-instructions").style.display = "none";
        document.getElementById("window-title-container").style.display =
          "none";
        document.getElementById(
          "empezar-terminar-btn-container"
        ).style.display = "none";
        document.getElementById("done-window-container").style.display =
          "block";
        uploadedPreview.style.display = "block";
        showPreview(uploadedPreview, blob);
        document.getElementById("done-button").onclick = () => {
          setUrl("mis-guifos.html");
        };
      }
    } else {
      console.log("something went wrong");
      uploadingContainer.innerHTML = "Something fucked up :/ try again";
    }
  };
};

const createProgressBarBoxes = () => {
  for (let index = 0; index < 23; index++) {
    const barBox = document.createElement("div");
    document.getElementById("progress").appendChild(barBox);
  }
};

const postForm = async (form) => {
  try {
    controller = new AbortController();
    let response = await fetch(
      "https://upload.giphy.com/v1/gifs?api_key=nviDGCCp3515X3VeiJdD4zAohJ9inqtJ",

      {
        method: "POST",
        body: form,
        signal: controller.signal,
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    uploadingContainer.innerHTML = "Something fucked up :/ try again";
  }
};

const cancelUpload = () => {
  cancelButton.onclick = () => {
    controller.abort();
    setTimeout(() => {
      setUrl("mis-guifos.html");
    }, 1000);
  };
};

const copyLink = () => {
  copyLinkButton.onclick = async () => {
    const response = await apiFetch(API_URL + "/" + gifId + "?" + API_KEY);
    const giphyUrl = response.url;
    copyToClipboard(giphyUrl);
    copyLinkButton.innerHTML = "Copied!";
    setTimeout(() => {
      copyLinkButton.innerHTML = "Copiar Enlace Giphy";
    }, 1500);
    console.log("link copied");
  };

  repeatButton.onclick = () => {
    setRecorder();
    recordButton.style.display = "flex";
    uploadRepeatContainer.style.display = "none";
    preview.style.display = "block";
    recordedPreview.style.display = "none";
    timeStopContainer.style.display = "none";
    recordGif();
    recorder.reset;
  };
};

const copyToClipboard = (text) => {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

const downloadGif = () => {
  document.getElementById("download-button").onclick = () => {
    console.log("downloaded");
  };
};

//initialization functions for the recording environment
const setRecordEnvironment = () => {
  setCrearWindow();
  recordGif();
  stopGifRecording();
  uploadGif();
  cancelUpload();
  copyLink();
  downloadGif();
};
