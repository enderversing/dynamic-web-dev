window.onload = async () => {
  let params = new URL(document.location.toString()).searchParams;
  pin = params.get("pin");
  let files = await fetchFiles(pin);
  display(files);
  document.getElementById("menu_right").addEventListener("click", shareButton);
};

let pin;

let fetchFiles = async (pin) => {
  const url = `/get-canvas?pin=${pin}`;
  try {
    const response = await fetch(url, { method: "POST" });
    const files = await response.json();
    console.log(files);
    return files;
  } catch (error) {
    console.error(error.message);
  }
};

let display = (files) => {
  let list = document.getElementById("list");
  list.innerHTML = files.map((file) => `<li>${file.name}</li>`).join("");
  let index = document.getElementById("index");
  index.innerHTML = files
    .map(
      (file) =>
        `<div><code>${file.name}</code><pre>${atob(file.data)}</pre></div>`,
    )
    .join("");
};

let shareButton = () => {
  alert(`Your PIN is ${pin}. You can use this to join a remote session.`);
};
