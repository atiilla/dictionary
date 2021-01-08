const searchInput = document.querySelector('#search')
const searchBtn = document.querySelector('.btn-default')
const lang = document.querySelector('select[name="lang"]')
const api = 'https://api.dictionaryapi.dev/api/v2/entries'
let currentobj = {}
const wordText = document.querySelector('.word-text')
const pronunciation = document.querySelector('.pronunciation-text')
const play = document.querySelector('#play-pause-button')
const defindex = document.querySelector('#definitions-container')

async function getWord(word) {
    let response = await fetch(`${api}/${lang.value}/${word}`)
    
    let data = await response.json();
    return data;
}

searchBtn.addEventListener('click', (e) => {
    getWord(searchInput.value)
        .then(res => {
            let obj = res[0]
            currentobj = obj
            wordText.innerHTML = obj.word
            pronunciation.innerHTML = obj.phonetics[0].text
            console.log(res)
            let definitionsall = []
            obj.meanings.forEach(e => {

                definitionsall.push(...e.definitions)
            })
            console.log(definitionsall)
            defindex.innerHTML=""
            definitionsall.forEach((def, index) => {
                if (def.synonyms != undefined) {
                    defindex.innerHTML += `
                
                    <div class="row" style="border-top: solid 1px #e6e6e6; padding: 10px 0">
                    <div class="col-sm-1 ">
                        <p class="text-white bg-primary border text-center border-secondary defindex">#${index}</p>
                    </div>
                    <div class="col-sm-10 my-auto text-white definition">
                        <div class="definitions mb-2 text-dark">
                          <p class="text-white d-inline bg-dark p-1">Definition:</p> <p class="values d-inline">${def.definition}</p>
                        </div>
                        
                        <div class="examples mb-2 text-dark">
                        <p class="text-white d-inline bg-dark p-1">Example:</p> <p class="values d-inline">${(def.example!=undefined)?def.example:'There is no example!'}</p>
                        </div>

                        <div class="synonyms text-dark">
                        <p class="text-white d-inline bg-dark p-1">Synonyms:</p> <p class="values d-inline">${def.synonyms.toString()}</p>
                        </div>
                        <br></div>
    
                </div>
                    `
                } else {

                    defindex.innerHTML += `
                
                    <div class="row" style="border-top: solid 1px #e6e6e6; padding: 10px 0">
                    <div class="col-sm-1 ">
                        <p class="text-white bg-primary border text-center border-secondary defindex">#${index}</p>
                    </div>
                    <div class="col-sm-10 my-auto text-white definition">
                        <div class="definitions mb-2 text-dark ">
                          <p class="text-white d-inline bg-dark p-1">Definition:</p> <p class="values d-inline">${def.definition}</p>
                        </div>
                        
                        <div class="examples text-dark">
                        <p class="text-white d-inline bg-dark p-1">Example:</p> <p class="values d-inline">${(def.example!=undefined)?def.example:'There is no example!'}</p>
                        </div>

                        <br></div>
    
                </div>
                    `
                }

            })
        })
})


play.addEventListener('click', (e) => {
    var audio = new Audio(currentobj.phonetics[0].audio);
    console.log(currentobj)
    let toggle = (e.target.className === "fa fa-play");
    console.log(toggle)
    if (toggle == true) {
        e.target.className = "fa fa-pause"
        audio.play();
    } else {
        e.target.className = "fa fa-play"
        audio.pause();
    }

    audio.onended = function () {
        play.className = "fa fa-play"
    }

})