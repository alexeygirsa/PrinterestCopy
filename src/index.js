import { renderPins, desc, searchPins, selectDesc, list} from './utils/utils.js'

const search = document.querySelector('#search')
const mainPage = document.querySelector('#mainPage')
const dropdown = document.querySelector('#dropdown')
const dropdownContainer = document.querySelector('#myDropdown')

// localStorage.clear()

let pins = []

const getPins = async() => {
    const responce = await fetch('http://localhost:3000/pins')
    try {
        const res = await responce.json()
        renderPins(res)
        pins = res
    } catch(err) {
        alert(err)
    }
}

getPins()

dropdownContainer.addEventListener('click', (e) => {
    const eInner = e.target.innerHTML
    const descNumber = eInner === 'Banned' ? eInner.toLowerCase() : eInner.slice(-1)
    selectDesc(desc[descNumber])
})

dropdown.addEventListener('click', () => {
    document.getElementById("myDropdown").classList.toggle("dropdownShow");
})

search.addEventListener('input', () => {
    const searchValue = search.value
    searchPins(searchValue, pins)
})

mainPage.addEventListener('click', () => {
    list.innerHTML = ''
    renderPins(pins)
})

window.addEventListener("beforeunload", () => {
    localStorage.setItem('desc', JSON.stringify(desc))
})

