/* Global Variables */
const zipCode = document.getElementById("zip");
const feelingsContent = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const button = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "85d244fe04627695d89fd738cf7bc3b0";

// Event listener to add function to existing HTML DOM element
button.addEventListener("click", generate);

/* Function called by event listener */
function generate() {
  //Empty Fields
  date.innerText = "";
  temp.innerText = "";
  content.innerText = "";

  let data = {
    date: newDate,
    temp,
    content: feelingsContent.value,
  };
  weater(zipCode.value).then((info) => {
    if (
      info.message == "Nothing to geocode" ||
      info.message == "city not found" ||
      isNaN(zipCode.value)
    ) {
      alert("Wrong Zip Code");
      return;
    }
    data.temp = info.list[0].main.temp;
    postData(data);
    updateUI();
    setTimeout(() => {
      document.querySelector(".entry").scrollIntoView();
    }, 100); //autoscroll to show information
  });
}

/* Function to GET Web API Data*/
const weater = async (zip) => {
  const weatherInfo = await fetch(
    "http://api.openweathermap.org/data/2.5/forecast?zip=" +
      zip +
      "&appid=" +
      apiKey
  );
  try {
    const result = weatherInfo.json();
    return result;
  } catch (err) {
    console.log("error: " + err);
  }
};
/* Function to POST data */
async function postData(data) {
  let res = await fetch("http://localhost:8000/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    return res.json();
  } catch (err) {
    console.log("error: " + err);
  }
}

/*updates the UI dynamically*/
async function updateUI() {
  let res = await fetch("http://localhost:8000/all");
  try {
    res.json().then((data) => {
      date.innerText = `Date: ${data.date}`;
      temp.innerText = `Temperature: ${data.temp}`;
      content.innerText = `I feel ${data.content}`;
    });
  } catch (err) {
    console.log("error: " + err);
  }
}
