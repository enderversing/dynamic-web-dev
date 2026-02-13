window.onload = () => {

document.querySelector("button").addEventListener("click", async () => {
  let userSupplied = document.getElementById("amount").value;

  let params = new URLSearchParams({
    cashAward: userSupplied,
  });

  let url = "https://starling.directory/api/filter?" + params;

  let response = await fetch(url); // this must be inside an async function

  let jsonData = await response.json(); //Display this data!
  document.getElementById("first").classList.add("hidden");
  document.getElementById("second").classList.remove("hidden");

  if (userSupplied == 0) {
    document.getElementById("second").innerHTML =
      `<center><br><br><br><br><br><br><br><br>
<p>That's so wholesome! Enjoy your life without money.</p></center>`;
  } else if (userSupplied > 1000000 - 1) {
    document.getElementById("second").innerHTML =
      `<center><br><br><br><br><br><br><br><br><p>Oops, that's too much money! I can't help you. Maybe ask for less?</p></center>`;
  } else {
    document.getElementById("second").innerHTML =
      `<center><br><br><br><br><br><br><br><br>
<p>Here are some math problems you can solve to make money!</p>   <br><br><br><br><br><br><br><br>
    <br>
    <pretty-json> ${JSON.stringify(jsonData)} </pretty-json></center> `;
  }
});
  
}
