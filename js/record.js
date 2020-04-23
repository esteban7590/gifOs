//---------------------------------------------

const setRecorder = async () => {
  let stream = null;
  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      height: { max: 450 },
    },
    audio: false,
  });
  const preview = document.getElementById("preview");
  preview.srcObject = stream;
  preview.play();
  return stream;
};

var recorder;

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
  document.getElementById("recorded-preview").src = objectURL;
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

const estop = document.getElementById("estop");
estop.style.display = "none";
const upload = document.getElementById("upload");
upload.style.display = "none";
const ripit = document.getElementById("ripit");
ripit.style.display = "none";

const recordGif = () => {
  const grabar = document.getElementById("grabar");
  grabar.onclick = async () => {
    grabar.disabled = true;
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
      console.log(time);
      setTimeout(looper, 1000);
    })();

    const estop = document.getElementById("estop");
    estop.style.display = "block";
    document.getElementById("recorded-preview").style.display = "block";
    estop.onclick = async () => {
      ripit.style.display = "block";
      await recorder.stopRecording();
      grabar.disabled = false;
      let blob = await recorder.getBlob();
      console.log(blob);
      showPreview(blob);
      let form = format(blob);
      console.log(form.get("file"));
      estop.style.display = "none";
      const upload = document.getElementById("upload");
      upload.style.display = "block";
      recorder = null;
      upload.onclick = async () => {
        await postForm(form);
      };
    };
  };

  ripit.onclick = () => {
    const img = document.getElementById("example");
    img.setAttribute("src", "");
    recordGif();
    recorder.reset();
  };
};

recordGif();
