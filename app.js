let buttons1 = document.querySelectorAll(".button1")
let buttons2 = document.querySelectorAll(".button2")

let fromRate = document.querySelector(".from")
let toRate = document.querySelector(".to")

let input1 = document.querySelector(".amount-input1")
let input2 = document.querySelector(".amount-input2")

let internetError = document.querySelector(".internet")

let sonInput = "input1"
let network = navigator.onLine

input1.addEventListener("input", () => {
    sonInput = "input1"

    let deyer1 = input1.value
    deyer1 = deyer1.replaceAll(",", ".")
    deyer1 = deyer1.replace(/[^0-9.]/g, "")

    if (deyer1[0] == ".") {
        deyer1 = "0" + deyer1

    }

    let arrayInput1 = deyer1.split(".")
    if (arrayInput1.length > 1) {
        arrayInput1[1] = arrayInput1[1].slice(0, 5)
        deyer1 = arrayInput1[0] + "." + arrayInput1[1]
    }

    input1.value = deyer1

    if (deyer1 == "") {
        input2.value = ""
    } else {
        convert(input1, input2)
    }


    convert(input1, input2)
})

input2.addEventListener("input", () => {
    sonInput = "input2"

    let deyer2 = input2.value
    deyer2 = deyer2.replaceAll(",", ".")
    deyer2 = deyer2.replace(/[^0-9.]/g, "")

    if (deyer2[0] == ".") deyer2 = "0" + deyer2

    let arrayInput2 = deyer2.split(".")
    if (arrayInput2.length > 1) {
        arrayInput2[1] = arrayInput2[1].slice(0, 5)
        deyer2 = arrayInput2[0] + "." + arrayInput2[1]
    }

    input2.value = deyer2

    if (deyer2 == "") {
        input1.value = ""
    } else {
        convert(input1, input2)
    }

    convert(input2, input1)
})

function convert(fromInput, toInput) {
    let from = document.querySelector(".colored").textContent
    let to = document.querySelector(".colored2").textContent
    let amount = fromInput.value

    if (amount != amount) {
        return
    }

    if (from == to) {
        toInput.value = Number(amount).toString()

        fromRate.textContent = `1 ${from} = 1 ${to}`
        toRate.textContent = `1 ${to} = 1 ${from}`
    
    } 
    else if (network == false) {
        internetError.style.display = "flex"
        
    } else {
        fetch(`https://hexarate.paikama.co/api/rates/${from}/${to}/latest`)
            .then(resp => resp.json())
            .then(d => {
                let res = Number((d.data.mid * amount).toFixed(5)).toString()
                toInput.value = res
                fromRate.textContent = `1 ${from} = ${d.data.mid.toFixed(5)} ${to}`
                toRate.textContent = `1 ${to} = ${(1 / d.data.mid).toFixed(5)} ${from}`
            })

    }

}

buttons1.forEach(b => {
    b.addEventListener("click", () => {
        buttons1.forEach(x => {
            x.classList.remove("colored")
        })
        b.classList.add("colored")

        if (sonInput == "input1" && input1.value) {
            convert(input1, input2)
        }
        if (sonInput == "input2" && input2.value) {
            convert(input2, input1)
        }
    })
})

buttons2.forEach(b => {
    b.addEventListener("click", () => {
        buttons2.forEach(x => x.classList.remove("colored2"))
        b.classList.add("colored2")

        if (sonInput == "input1" && input1.value) {
            convert(input1, input2)
        }
        if (sonInput == "input2" && input2.value) {
            convert(input2, input1)
        }
    })
})

window.addEventListener("offline", () => {
    network = false
    internetError.style.display = "flex"
})

window.addEventListener("online", () => {
    network = true
    internetError.style.display = "none"

    if (sonInput == "input1" && input1.value) {
        convert(input1, input2)
    }
    if (sonInput == "input2" && input2.value) {
        convert(input2, input1)
    }
})
