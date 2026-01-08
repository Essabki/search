const body = document.body;
const slider = document.getElementById("slider");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const toggleBtn = document.getElementById("toggleImages");
const wall = document.querySelector(".wallper");
const uploadBtn = document.getElementById("uploadImage");
const fileInput = document.getElementById("fileInput");

let sliderImgs = Array.from(document.querySelectorAll(".slider-track img"));

// ---------------------
// CLICK TO CHANGE BACKGROUND
// ---------------------
function addClickBg(img) {
    img.addEventListener("click", () => {
        body.style.backgroundImage = `url('${img.src}')`;
    });
}

// Preload and add click for existing images
sliderImgs.forEach(img => {
    new Image().src = img.src;
    addClickBg(img);
});

// Set initial background
if(sliderImgs.length) body.style.backgroundImage = `url('${sliderImgs[0].src}')`;

// ---------------------
// SLIDER LOGIC
// ---------------------
let index = 0;
const visible = 4;

function imgStep() {
    return sliderImgs[0].offsetWidth + 15;
}

function updateSlider() {
    slider.style.transform = `translateX(-${index * imgStep()}px)`;
}

next.addEventListener("click", e => {
    e.stopPropagation();
    const max = sliderImgs.length - visible;
    if (index < max) index++;
    updateSlider();
});

prev.addEventListener("click", e => {
    e.stopPropagation();
    if (index > 0) index--;
    updateSlider();
});

// ---------------------
// TOGGLE SLIDER
// ---------------------
toggleBtn.addEventListener("click", e => {
    e.stopPropagation();
    wall.classList.toggle("hidden");
    toggleBtn.classList.toggle("closed");
});

document.body.addEventListener("click", () => {
    if(!wall.classList.contains("hidden")){
        wall.classList.add("hidden");
        toggleBtn.classList.add("closed");
    }
});

wall.addEventListener("click", e => e.stopPropagation());

// ---------------------
// GOOGLE SEARCH
// ---------------------
document.getElementById("search").addEventListener("keydown", e => {
    if(e.key === "Enter" && e.target.value.trim()) {
        location.href = "https://www.google.com/search?q=" + encodeURIComponent(e.target.value.trim());
    }
});

// ---------------------
// UPLOAD CUSTOM IMAGE
// ---------------------
uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = event => {
        // 1. Set background immediately
        body.style.backgroundImage = `url('${event.target.result}')`;

        // 2. Add image to slider
        const img = document.createElement("img");
        img.src = event.target.result;

        img.onload = () => {
            slider.appendChild(img);
            sliderImgs.push(img);
            addClickBg(img); // attach click for future
        };
    };
    reader.readAsDataURL(file);
});