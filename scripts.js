//array for object pairs (Name,img) for gearcards
let gearObjects = [
    {title: "Hat", img: "Images/hat.jpg"},
    {title: "Goggles", img: "Images/goggles.jpg"},
    {title: "Coat", img: "Images/coat.webp"},
    {title: "Boots", img: "Images/boots.jpg"},
    {title: "Pants", img: "Images/pants.jpg"},
    {title: "Skis", img: "Images/skis.jpg"},
    {title: "Gloves", img: "Images/gloves.jpg"}
]

//used for items saved to sessions storage
let savedGearObjects = []
//counter for alerts to user for saved items
let savedObjectsCounter = 0

/*I know this seems super long winded but I wanted to practice creating items in the DOM
using only Javascript. This might have been a lot easier if the items were hard-coded in 
the HTML*/


//this function is called upon opening the 'gear' page
    function onLoad() {
        //if its first time running we need to create the session storage for things we are tracking
        //idea used from previous books.js task
        if (sessionStorage.getItem("hasCodeRunBefore") === null) {
            //creates the sessionStorage for array if it is their first time here
            sessionStorage.setItem("savedGearObjects", JSON.stringify(savedGearObjects));
            sessionStorage.setItem("hasCodeRunBefore", true);
            sessionStorage.setItem("savedObjectsCounter", JSON.stringify(savedObjectsCounter));
            //call this function again to create the cards
            onload();
            }
        else {
            //grab our session storage data
            savedGearObjects = JSON.parse(sessionStorage.getItem("savedGearObjects"));
            savedObjectsCounter = JSON.parse(sessionStorage.getItem("savedObjectsCounter"))
            //for every item in our gear array we will create a card in the DOM and display it on the page
            //gear.html has an example of a card commented out
            for (i=0; i<gearObjects.length; i++) {
            let gearContainer = document.getElementById("gear-container")
            //create main div
            let gearDiv = document.createElement("div")
            gearDiv.classList.add("gear-card")
            //create P
            let gearTitle = document.createElement("p")
            gearTitle.id = "gearTitle"
            gearTitle.textContent = gearObjects[i].title
            //create IMG
            let gearImg = document.createElement("img")
            gearImg.src = gearObjects[i].img
            gearImg.alt= "the " + gearObjects[i].title + " I wear"
            //create the form and all bits inside it 
            let gearForm = document.createElement("form")
            let gearDiv2 = document.createElement("div")
            let gearTextArea = document.createElement("textarea")
            let gearBreak = document.createElement("br")
            let gearInput = document.createElement("input")
            gearTextArea.id = "comments"
            gearTextArea.placeholder = "Any comment?"
            gearInput.type = "button"
            gearInput.value = "Add comment"
            gearInput.id = "commentBtn"
            //passing event object "e" as argument to event handler function
            //event listener for adding comments
            gearInput.addEventListener("click", function (e) {
                // console.log(e)
                // console.log(e.target.previousElementSibling.previousElementSibling.value)
                //grab the relevent name from this card
                let responsesTitle = e.target.parentElement.parentElement.parentElement.children[0].textContent
                //append the name onto the div ID so that when we add comments it goes to the correct card
                let responsesDiv = document.getElementById(responsesTitle +"responsesDiv")
                let p = document.createElement("p")
                //grab the text content value from the textarea sibling
                let content = e.target.previousElementSibling.previousElementSibling.value
                //append that textarea value onto a P element
                p.append(content)
                //and finally append the P onto the DIV
                responsesDiv.appendChild(p)
            })
            //create another button for 'save for later'
            let gearButton = document.createElement("button")
            gearButton.textContent = "save for later"
            gearButton.type = "button"
            gearButton.id = "saveForLater"
            //add event listener for when save is clicked
            gearButton.addEventListener("click", function (e) {
                //create a new object using the title and img url, and place it in the saved items array
                savedGear = new gearCard (e.target.parentElement.parentElement.parentElement.children[0].textContent,
                                        e.target.parentElement.parentElement.parentElement.children[1].attributes[0].nodeValue)
                savedGearObjects.push(savedGear)
                //save our updated array to storage
                sessionStorage.setItem("savedGearObjects", JSON.stringify(savedGearObjects));
                //add to the counter
                savedObjectsCounter++
                //and save the counter to storage too
                sessionStorage.setItem("savedObjectsCounter", JSON.stringify(savedObjectsCounter));
                //let the user know
                alert("You now have " + savedObjectsCounter + " items saved")
                // console.log(savedGearObjects)
                // console.log(e)
            })
            //create the heart button elements
            let gearA = document.createElement("a")
            let gearI = document.createElement("i")
            gearI.id = "heart"
            //set its onclick to call another function
            gearI.setAttribute("onclick", "heartClick(this);");
            //add its FA classes
            gearI.classList.add("fa-regular","fa-heart")
            //append all the form peices together
            gearA.appendChild(gearI)
            gearDiv2.appendChild(gearTextArea)
            gearDiv2.appendChild(gearBreak)
            gearDiv2.appendChild(gearInput)
            gearDiv2.appendChild(gearButton)
            gearDiv2.appendChild(gearA)
            gearForm.appendChild(gearDiv2)
            //create the 3rd div for displaying comments
            let gearDiv3 = document.createElement("div")
            //give it a unique ID with concatenation
            gearDiv3.id = gearObjects[i].title + "responsesDiv"
            //add a seperate class for the CSS
            gearDiv3.classList.add("responsesDiv")
            //create the P where comments will be posted
            let gearP = document.createElement('p')
            gearP.textContent = "Comments:"
            gearDiv3.appendChild(gearP)
            //append all main peices to main div
            gearDiv.appendChild(gearTitle)
            gearDiv.appendChild(gearImg)
            gearDiv.appendChild(gearForm)
            gearDiv.appendChild(gearDiv3)
            gearContainer.appendChild(gearDiv)
            }
    }
}

//when heart is clicked it will toggle between 2 different classes
//make the heart either solid or empty
function heartClick(x) {
    console.log("heart clicked")
    x.classList.toggle("fa-solid")
    x.classList.toggle("fa-regular")
}

//this function is called when the saved for later page is loaded up
function onLoad2() {
    //recalls the array of saved items only
    savedGearObjects = JSON.parse(sessionStorage.getItem("savedGearObjects"));
    //for each item in the saved array, we create a card just like in the main function above
    for (i=0; i<savedGearObjects.length; i++) {
    let gearContainer = document.getElementById("gear-container")
    //create new object so we can access name and url
    //create main div
    let gearDiv = document.createElement("div")
    gearDiv.classList.add("gear-card")
    //create P
    let gearTitle = document.createElement("p")
    gearTitle.id = "gearTitle"
    gearTitle.textContent = savedGearObjects[i].title
    //create IMG
    let gearImg = document.createElement("img")
    gearImg.src = savedGearObjects[i].img
    gearImg.alt= "the " + savedGearObjects[i].title + " I wear"
    //create the form and all bits inside it
    let gearForm = document.createElement("form")
    let gearDiv2 = document.createElement("div")
    let gearTextArea = document.createElement("textarea")
    let gearBreak = document.createElement("br")
    let gearInput = document.createElement("input")
    gearTextArea.id = "comments"
    gearTextArea.placeholder = "Any comment?"
    gearInput.type = "button"
    gearInput.value = "Add comment"
    gearInput.id = "commentBtn"
    //passing event object "e" as argument to event handler function
    //adds comments
    gearInput.addEventListener("click", function (e) {
        console.log(e)
        console.log(e.target.previousElementSibling.previousElementSibling.value)
        console.log(e.target.parentElement.parentElement.parentElement.children[0].textContent)
        let responsesTitle = e.target.parentElement.parentElement.parentElement.children[0].textContent
        let responsesDiv = document.getElementById(responsesTitle +"responsesDiv")
        console.log(responsesDiv)
        let p = document.createElement("p")
        let content = e.target.previousElementSibling.previousElementSibling.value
        p.append(content)
        responsesDiv.appendChild(p)
    })
    //this could be changed to a delete button later on
    let gearButton = document.createElement("button")
    gearButton.textContent = "save for later"
    gearButton.type = "button"
    gearButton.id = "saveForLater"
    //disabled redundant button
    // gearButton.addEventListener("click", function (e) {
    //     //create a new object using the title and img url, and place it in the saved items array
    //     savedGear = new gearCard (e.target.parentElement.parentElement.parentElement.children[0].textContent,
    //                               e.target.parentElement.parentElement.parentElement.children[1].attributes[0])
    //     savedGearObjects.push(savedGear)
    //     console.log(savedGearObjects)
    //     console.log(e)
    // })

    //no heart needed
    // let gearA = document.createElement("a")
    // let gearI = document.createElement("i")
    // gearI.id = "heart"
    // gearI.setAttribute("onclick","heartClick(this);");
    // gearI.classList.add("fa-regular","fa-heart")
    // gearA.appendChild(gearI)
    gearDiv2.appendChild(gearTextArea)
    gearDiv2.appendChild(gearBreak)
    gearDiv2.appendChild(gearInput)
    gearDiv2.appendChild(gearButton)
    //gearDiv2.appendChild(gearA)
    gearForm.appendChild(gearDiv2)
    //create the 3rd div for displaying comments
    let gearDiv3 = document.createElement("div")
    gearDiv3.id = savedGearObjects[i].title + "responsesDiv"
    gearDiv3.classList.add("responsesDiv")
    let gearP = document.createElement('p')
    gearP.textContent = "Comments:"
    gearDiv3.appendChild(gearP)
    //append all main peices to main div
    gearDiv.appendChild(gearTitle)
    gearDiv.appendChild(gearImg)
    gearDiv.appendChild(gearForm)
    gearDiv.appendChild(gearDiv3)
    gearContainer.appendChild(gearDiv)
    
}
}

//object constructor used for saving items
function gearCard (title, img){
    this.title = title
    this.img = img
}
