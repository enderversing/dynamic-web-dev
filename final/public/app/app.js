window.onload = async () => {
  let params = new URL(document.location.toString()).searchParams;
  let pin = params.get("pin");
  let cid = await fetchCID(pin);
  let files = await fetchFiles(cid);
  console.log(files);
};

let fetchCID = async (pin) => {
  const url = `/get-canvas?pin=${pin}`;
  try {
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const cid = await response.text();
    return cid;
  } catch (error) {
    console.error(error.message);
  }
};

let fetchFiles = async (cid) => {
  let input = await cid;
  let sid = Multiformats.CID.parse(input);
  console.log(sid);
  const response = await HeliaVerifiedFetch.verifiedFetch(sid);
  const json = await response.json();
  return json;
};
