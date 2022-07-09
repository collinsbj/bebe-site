const setVH = () => {
  document
    .querySelector(":root")
    .style.setProperty("--max-vh", `${window.innerHeight}px`)
}

setVH()

window.addEventListener("resize", setVH)

VanillaTilt.init(document.querySelectorAll("nav li a"), {
  max: 30,
  speed: 400,
  glare: true,
  "max-glare": 1,
})

const body = document.querySelector("body")
body.classList.add("visible")

// Landing
const landingHeading = document.querySelector("#landing h1")
"New Rookie Due October 2022".split("").forEach((letter, index) => {
  const div = document.createElement("div")
  div.innerText = letter
  div.classList.add("letter")
  if (index % 2 == 0) {
    div.classList.add("blue")
  }
  landingHeading.appendChild(div)
})

// Registry
const registrySection = document.querySelector("#registry")
const registryCallback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) registrySection.classList.add("visible")
  })
}
const registryOptions = {
  rootMargin: "-150px",
}
const observer = new IntersectionObserver(registryCallback, registryOptions)
observer.observe(registrySection)

// Shower
const showerSection = document.querySelector("#shower")
const showerH1 = document.querySelector("#shower h1")
showerH1.addEventListener("mouseover", () =>
  showerSection.classList.add("raining")
)
showerH1.addEventListener("mouseout", () =>
  showerSection.classList.remove("raining")
)

const droplets = 250
for (let r = 0; r < droplets; r++) {
  const newSVGString = `<svg
  class="rain__drop"
  preserveAspectRatio="xMinYMin"
  viewBox="0 0 5 50"
  style="
    --x: ${Math.floor(Math.random() * 100)};
    --y: ${Math.floor(Math.random() * 100)};
    --o: ${Math.random()};
    --a: ${Math.random() + 0.5};
    --d: ${Math.random() * 2 - 1};
    --s: ${Math.random()};
  "
>
  <path
    stroke="none"
    d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
  ></path>
</svg>`
  let parser = new DOMParser()
  let doc = parser.parseFromString(newSVGString, "text/html")
  showerSection.append(doc.body)
}

// Countdown
const today = new Date()
const dueDate = new Date(today.getFullYear(), 9, 25)
const oneDay = 1000 * 60 * 60 * 24
const daysUntilDueDate = Math.ceil(
  (dueDate.getTime() - today.getTime()) / oneDay
)
const countdownText = `${daysUntilDueDate}-ish days!`
const countdownElement = document.querySelector("#countdown h1")

const bebeIcons = [
  "https://cdn-icons-png.flaticon.com/512/822/822174.png",
  "https://cdn-icons.flaticon.com/png/512/2568/premium/2568424.png?token=exp=1657317095~hmac=ab77e5f11582a5015dd3b94bb554ae95",
  "https://cdn-icons-png.flaticon.com/512/2867/2867024.png",
  "https://cdn-icons.flaticon.com/png/512/3436/premium/3436940.png?token=exp=1657317162~hmac=71d18966c08f539446e9e0eedd2948d0",
  "https://cdn-icons.flaticon.com/png/512/709/premium/709373.png?token=exp=1657317181~hmac=25d73b1898abf874d772ae33f65fec58",
  "https://cdn-icons-png.flaticon.com/512/2641/2641649.png",
  "https://cdn-icons-png.flaticon.com/512/2641/2641657.png",
  "https://cdn-icons-png.flaticon.com/512/6381/6381743.png",
  "https://cdn-icons.flaticon.com/png/512/2793/premium/2793069.png?token=exp=1657317238~hmac=dfd9bf948a2a2294737af3d17f9bf248",
  "https://cdn-icons.flaticon.com/png/512/2871/premium/2871858.png?token=exp=1657317256~hmac=a3233ae96aa6363331d30a00104ddabf",
  "https://cdn-icons-png.flaticon.com/512/2176/2176673.png",
  "https://cdn-icons-png.flaticon.com/512/3790/3790678.png",
  "https://cdn-icons-png.flaticon.com/512/3135/3135098.png",
]

const getIcon = index => {
  if (bebeIcons[index]) {
    return bebeIcons[index]
  }
  return getIcon(index - bebeIcons.length)
}

countdownText.split("").forEach((letter, index) => {
  const div = document.createElement("div")
  div.classList.add("letter")
  div.style.setProperty("--background-image", `url(${getIcon(index)})`)

  const span = document.createElement("span")
  span.innerText = letter

  div.appendChild(span)
  countdownElement.appendChild(div)
})
