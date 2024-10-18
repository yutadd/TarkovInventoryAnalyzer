const information = document.getElementById('info')
API.getClipboardText().then(image => {
console.log(image)
  information.innerText = ` clipboard: ${image.isEmpty()}`;
}).catch(error => {
  console.error('Error fetching clipboard text:', error);
});