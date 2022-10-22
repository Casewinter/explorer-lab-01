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

    const foundMask = dynamicMasked.compiledMasks.find(
      ({ regex }) => number.regex
    )
    return foundMask
  },
}

const cardNumberMascked = IMask(cardNumber, cardNumberMasck)
