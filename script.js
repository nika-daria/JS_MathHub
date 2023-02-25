const getRandomNumInRange = (min, max) => {
    const randomNum = ( Math.random() * (max - min) + min ).toFixed(0)
    return randomNum
}

const getTask = () => {
    const symbol = (Math.random() > 0.5) ? "+" : "-"
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}

const gameElements = document.getElementById("my_game").children
const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]

const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}

const startGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = "Игра началась!"
        userAnswer.value = null
        userTask.innerText = getTask()
        userAnswer.hidden = false
    } else {
        const isRight = gameState.rightAnswer == userAnswer.value
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        title.innerText = (isRight) ? "Вы победили!" : "Вы проиграли!"
    }
    toggleGameState()
    btnGame.innerText = (gameState.taskInProcess) ? "ПРОВЕРИТЬ!" : "НАЧАТЬ ЗАНОВО!"
}

btnGame.addEventListener("click", startGameFunc)
userAnswer.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.key === "Enter") {
        startGameFunc()
    } else if (e.keyCode === 27) {
        userAnswer.blur()
    }
})






const chooosedEl = document.querySelectorAll(".choosed_block-container > div") // .children выше 
const counterEl = document.querySelector(".choosed_block span")

const elemetnsState = {
    countElements: 0,
}

const changeCount = (value) => {
    elemetnsState.countElements += value 
    counterEl.innerText = elemetnsState.countElements
}

const eventFunc = (e) => {
    if (e.target.className === "") {
        e.target.className = "choosed_element"
        changeCount(1)
    } else {
        e.target.className = ""
        changeCount(-1)
    }
}

for (let i = 0; i < chooosedEl.length; i++) {
    chooosedEl[i].addEventListener("click", eventFunc)
}







const postsBlock = document.querySelector(".posts_block-container")
const showPostsBtn = document.querySelector(".posts_block button")


function addPost(title, body) {
    const postTitle = document.createElement("h3")
    const postBody = document.createElement("span")
    const postsItem = document.createElement("p")
    
    postTitle.innerText = title
    postBody.innerText = body

    postsBlock.append(postsItem)
    postsItem.append(postTitle, postBody)
}


function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then( res => res.json() )
    .then( data => {
        for (item of data) {
            addPost(item.title, item.body)
        }
    } )
    .catch( err => console.log(err.message) )
}

showPostsBtn.onclick = getPosts








