export default function swDev() {
  // Direct path to sw.js in the public folder
  let swUrl = "/sw.js";

  navigator.serviceWorker
    .register(swUrl)
    .then((response) => {
      console.warn("Service worker registered with response: ", response);
    })
    .catch((error) => {
      console.error("Service worker registration failed: ", error);
    });
}
