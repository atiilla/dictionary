const searchInput = document.querySelector('#search')
const searchBtn = document.querySelector('.btn-default')
const api = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const jumbo = document.querySelector('.jumbotronx')
let currentobj = {}
const wordText = document.querySelector('.word-text')
const pronunciation = document.querySelector('.pronunciation-text')
const definition = document.querySelector('.definition')
const play = document.querySelector('#play-pause-button')
const examples = document.querySelector('.examples')
const defindex = document.querySelector('#definitions-container')

async function getWord(word) {
    let response = await fetch(`${api}/${word}`)
    let data = await response.json();
    return data;
}

searchBtn.addEventListener('click', (e) => {
    getWord(searchInput.value)
        .then(res => {
            let obj = res[0]
            // console.log(JSON.stringify(obj))
            currentobj = obj
            wordText.innerHTML = obj.word
            pronunciation.innerHTML = obj.phonetics[0].text
            // obj.meanings[1].forEach(def=>{
            //     defs.innerHTML+=`
            //     <p>${def}</p>
            //     `
            // })
            obj.meanings[1].definitions.forEach((def, index) => {
                //  console.log(def.synonyms.toString())

                if (def.synonyms != undefined) {
                    defindex.innerHTML += `
                
                    <div class="row" style="border-top: solid 1px #e6e6e6; padding: 10px 0">
                    <div class="col-sm-1 ">
                        <p class="lead text-white border text-center border-secondary defindex">#${index}</p>
                    </div>
                    <div class="col-sm-10 my-auto text-white definition">
                        <div class="definitions">
                          <p class="text-warning d-inline">Definition</p>: ${def.definition}
                        </div>
                        
                        <div class="examples">
                        <p class="text-warning d-inline">Example</p>: ${def.example}
                        </div>

                        <div class="synonyms">
                        <p class="text-warning d-inline">Synonyms</p>: ${def.synonyms.toString()}
                        </div>
                        <br></div>
    
                </div>
                    `
                } else {

                    defindex.innerHTML += `
                
                    <div class="row" style="border-top: solid 1px #e6e6e6; padding: 10px 0">
                    <div class="col-sm-1 ">
                        <p class="lead text-white border text-center border-secondary defindex">#${index}</p>
                    </div>
                    <div class="col-sm-10 my-auto text-white definition">
                        <div class="definitions">
                          <p class="text-warning d-inline">Definition</p>: ${def.definition}
                        </div>
                        
                        <div class="examples">
                        <p class="text-warning d-inline">Example</p>: ${def.example}
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