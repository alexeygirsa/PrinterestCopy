import images from '../img/*.jpg'
import authors from '../autors/*.jpg'

export const desc = JSON.parse(localStorage.getItem('desc')) || {1:[],2:[],3:[],banned:[]}

export const list = document.querySelector('ul')

export const renderPins = (pins) => {
    const template = document.querySelector('#template')
    pins?.forEach((pin) => {
        const li = template.content.cloneNode(true)
        const pinContainer = li.querySelector('li')
        const pinImg = pinContainer.querySelector('#pinImg')
        const pinBtn = pinContainer.querySelector('#pinBtn')
        const pinMenu = pinContainer.querySelector('#pinMenu')
        const pinMenuClose = pinContainer.querySelector('#pinMenuClose')
        const autorImg = pinContainer.querySelector('#autorImg')
        const description = pinContainer.querySelector('#description')
        const pinTag = pinContainer.querySelector('.pinTag')
        const descSelect = pinContainer.querySelector('#descSelect')
        const descSelectbtn = pinContainer.querySelector('#descSelectbtn')
        const complainBtn = pinContainer.querySelector('#complainBtn')
        const complainSelect = pinContainer.querySelector('#complainSelect')
        const complainClose = pinContainer.querySelector('#complainClose')
        const sendComplaint = pinContainer.querySelector('#sendComplaint')
        description.textContent = pin.desc
        pinImg.src = images[`img${pin.id}`]
        autorImg.src = authors[`au${pin.id}`]
        pinTag.textContent = pin.tag

        pinBtn.addEventListener('mouseover', () => {
        pinMenu.classList.toggle('hiddenPinMenu')
        })

        pinMenuClose.addEventListener('click', () => {
        pinMenu.classList.toggle('hiddenPinMenu')
        })

        descSelect.addEventListener('click', (e) => {
            const eInner = e.target.innerHTML
            e.preventDefault()
            const descNumber = eInner.slice(-1)
            if(!desc[descNumber].find((p) => {
                return p.id===pin.id
                }) ) {
               desc[descNumber].push(pin)
                }
            descSelect.classList.toggle("descSelectShow")
        })

        descSelectbtn.addEventListener('click', () => {
            descSelect.classList.toggle("descSelectShow")
        })
        complainBtn.addEventListener('click', () => {
            complainSelect.classList.toggle("complaintShow")
        })
        complainClose.addEventListener('click', () => {
            complainSelect.classList.toggle("complaintShow")
            pinMenu.classList.toggle('hiddenPinMenu')
        })
        sendComplaint.addEventListener('click', () => {
            if(!desc.banned.find((p) => {
                return p.id===pin.id
            }) ) {
                desc.banned.push(pin)
            }
            complainSelect.classList.toggle("complaintShow")
            pinMenu.classList.toggle('hiddenPinMenu')
            sendComplaint.closest('li').classList.add("banned")
        })
        
        list.append(li)
    })
}

const updatePins = (pins) => {
    list.innerHTML = ''
    renderPins(pins)
}

export const selectDesc = (descPins) => {
    updatePins(descPins)
    document.getElementById("myDropdown").classList.toggle("dropdownShow");
}

export const searchPins = (searchValue, pins) => {
    const searchPins = pins.filter((pin)=> pin.tag.includes(searchValue))
    updatePins(searchPins)
}
