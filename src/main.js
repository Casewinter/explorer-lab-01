import "./css/index.css"
import IMask from "imask"

const cardBgColor01 = document.querySelector(".color01")
const cardBgColor02 = document.querySelector(".color02")
const cardLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardFlag(flag) {
  const flagData = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  cardBgColor01.setAttribute("fill", flagData[flag][0])
  cardBgColor02.setAttribute("fill", flagData[flag][1])
  cardLogo.setAttribute("src", `/cc-${flag}.svg`)
}

setCardFlag("visa")

const securityCode = document.querySelector("#security-code")
const securityMasck = {
  mask: "0000",
}
const securityMasked = IMask(securityCode, securityMasck)

const experation = document.querySelector("#expiration-date")

const experationMasck = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}

const experationMasked = IMask(experation, experationMasck)

const cardNumber = document.querySelector("#card-number")
const cardNumberMask = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}

const cardNumberMascked = IMask(cardNumber, cardNumberMask)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  console.log("teste")
})

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
})

let inputText = []

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccValue = document.querySelector(".cc-holder .value")
  ccValue.innerText =
    cardHolder.value.length === 0 ? "NOME DO TÍTULAR" : cardHolder.value
})

securityMasked.on("accept", () => {
  updateCode(securityMasked.value)
})

function updateCode(codeValue) {
  const ccCodeValue = document.querySelector(".cc-security  .value")
  ccCodeValue.innerText = codeValue.length === 0 ? "123" : codeValue
}

cardNumberMascked.on("accept", () => {
  const cardType = cardNumberMascked.masked.currentMask.cardType
  setCardFlag(cardType)
  updateNumber(cardNumberMascked.value)
})

function updateNumber(numberValue) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText =
    numberValue.length === 0 ? "1234 5678 9012 3456" : numberValue
}

experationMasked.on("accept", () => {
  updateExperationDate(experationMasked.value)
})

const updateExperationDate = (dateValue) => {
  const date = document.querySelector(".cc-expiration .value")
  date.innerText = dateValue.length === 0 ? "01/32" : dateValue
}
