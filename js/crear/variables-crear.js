var stream, dateStarted, recorder, result, gifId, blob, form;
var controller = new AbortController();

const uploadingContainer = document.getElementById("uploading-container");
const timeStopContainer = document.getElementById("time-stop-container");
const uploadRepeatContainer = document.getElementById(
  "upload-repeat-container"
);

const recordedPreview = document.getElementById("recorded-preview");
const preview = document.getElementById("preview");
const uploadedPreview = document.getElementById("uploaded-preview");

const cancelButton = document.getElementById("cancel-button");
const recordButton = document.getElementById("grabar");
const stopButton = document.getElementById("estop");
const uploadButton = document.getElementById("upload");
const repeatButton = document.getElementById("ripit");
const copyLinkButton = document.getElementById("copy-link-button");
