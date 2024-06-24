const convertButton = document.getElementById('convertButton');
const fileInput = document.getElementById('fileInput');
const fileReader = new FileReader();

let file;

fileReader.addEventListener('load', async (event) => {
  Logger.log(`New file loaded: ${file.name}`);
  const loadedFile = event.target.result;

  if (loadedFile) {
    Main.run(loadedFile);
  } else {
    Logger.error(`File loading failed.`);
  }
});

fileInput.addEventListener('change', (event) => {
  file = event.target.files?.[0];
  Logger.log(`New file selected: ${file?.name}`);
  if (file?.type === 'text/html') {
    Logger.error(`Html files are no longer supporter, please use .rosz exports instead.`);
  } else if (file?.name.includes('.rosz') || file?.name.includes('.ros')) {
    Logger.log(`Loading file: ${file.name}`);
    fileReader.readAsBinaryString(file);
  } else {
    Logger.error(`No file or invalid file type selected.`);
  }
});

window.onload = (() => {
  RosterHistory.showList();

  document.getElementById('lastUpdate').innerHTML = Object.keys(wahapediaData.last_update)[0];
});