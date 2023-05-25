// texto aparece embaixo do anterior uma letra por vez

export function callDialog() {
    const dialogo = document.getElementById("lore");

    const texto = [
        "> Alright, I've been thinking.",
        "> When life gives you lemons, don't make lemonade!",
        "> Make life take the lemons back!",
        "> Get mad! I don't want your damn lemons, what am I supposed to do with these!?",
        "> Demand to see life's manager! Make life rue the day it thought it could give E-Thereo lemons!",
        "> Do you know who I am? I'm the program who's gonna burn your house down! With the lemons!",
        "> I'm gonna get my engineers to invent a combustible lemon that burns your house down!"
    ]
    
    var tamanho = texto.length
    var i = 0
    var count = 0
    
    document.addEventListener("keydown", (event) =>{
        if (count < tamanho) {
            if (event.key === "i") {
                dialogo.innerHTML = "<br>"
                const intervalo = setInterval(function() {
                    var frase = texto[count]
                    if (i < frase.length) {
                        const letra = frase.charAt(i)
                        dialogo.innerHTML += letra
                        i++
                    } else {
                        clearInterval(intervalo)
                        count++
                        i = 0
                    }
                }, 20)
            }
        }
    })
}
