(()=>{
  const getRandomInt = (min, max) =>
    Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
    )
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  setInterval(() => {
    const increments = document.getElementById('increments')
    const currentRating = Number(increments.getAttribute('rating'))
    if(currentRating <= 5) {
      increments.setAttribute('rating', `${currentRating + 0.1}`)
      document.getElementById('rating').innerText = (currentRating + 0.1).toFixed(2)
    }else{
      increments.setAttribute('rating', '0')

      document.getElementById('rating').innerText = 0
    }

  }, 250)

  setInterval(() => {

    const starNumber = document.getElementById('starNumber')
    const total = getRandomInt(1, 10)
    const rating = getRandomInt(1, total)
    starNumber.setAttribute('rating', rating)
    starNumber.setAttribute('total', total)
    document.getElementById('star-number-rating').innerText = rating
    document.getElementById('star-number-total').innerText = total

    const starColour = document.getElementById('starColour')
    const colour = getRandomColor()
    const background = getRandomColor()
    const reviews = getRandomInt(0, 200)
    starColour.setAttribute('colour', colour)
    starColour.setAttribute('background', background)
    starColour.setAttribute('reviews', reviews)
    document.getElementById('colour').innerText = colour
    document.getElementById('background').innerText = background
    document.getElementById('reviews').innerText = reviews

  }, 5000)
})()