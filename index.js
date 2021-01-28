const ctx= canvas.getContext("2d");
canvas.width = 900
canvas.height = 560
const yMitad= canvas.height/2
const yInicial = canvas.height - canvas.height
const xInicial = canvas.width - canvas.width



//DOM
const huntersScoreHTML = document.querySelector(".huntersScore")
const timeHtml= document.querySelector(".countTime")
const botonComprar= document.getElementById("comprar")
const botonStart = document.querySelector(".btnStartGame")
const botonRestart = document.getElementsByClassName("btnRestarttGame")
const gameOver = document.querySelector("gameOver")
const yetiLiveCount = document.querySelector(".livesCount")
const coinsCountHtml = document.querySelector(".coinsCounter")
const aldeanosCountHtml= document.querySelector(".aldeanosCount")
let lastTime //REVISAR 
const updateTime= (()=>{
    let now= Date.now()
    let dt= (now-lastTime)/1000
    updateCanvas(dt)
})
class Ground {
    constructor(x, y, width, height){
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;
        this.imgSource= new Image();
        this.imgSource.src= "./imagenes/ground.png"
        this.imgSource.onload= () => {
        this.draw()
  }
    }
    draw(){
        ctx.drawImage(this.imgSource, this.x, this.y, this.width, this.height)
    }
}
const image= new Image()
class Component {
    constructor(x, y, width, height, imgSource){
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;
        this.imgSource= imgSource;
    }
}
class Player extends Component {
    constructor(x, y, width, height){
    super(x, y, width, height)
    this.playerImg= new Image();
    this.playerImg.src= "./imagenes/yeti.png"
    this.playerImg.onload= () => {
    this.draw()
    }
    this.vida = 3
 
    }
    draw(){
        ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height)
    }
    moveUp(){ ///revisar error que aparece, no afeta en jugabilidad pero hay que revisarlo
        if(this.y <= yInicial+5) {
          y=(canvas.height - canvas.height)  + this.height 
        } else {
        this.y-=25 
        }
    }
    moveDown(){
        if(this.y+this.height >= canvas.height-10) {
            y=(canvas.height-this.height)
          } else {
          this.y+=25 
          }
    }
}
class Enemy extends Component {
    constructor(x, y, width, height, imgSource, velocity, strength, name){
        super(x, y, width, height, imgSource)
        this.velocity= velocity;
        this.enemyImg= new Image()
        this.enemyImg.src= imgSource
        this.enemyImg.onload= ()=>{
            this.draw()
         }
        this.strength= strength;
        this.name= name;
        }
        draw(){
            ctx.drawImage(this.enemyImg, this.x, this.y, this.width, this.height)
        }
        updateEnemy(){
            this.x = this.x + this.velocity.x
            this.y = this.y +  this.velocity.y
        }
}
class Shooter extends Component {
    constructor(x, y, width, height){
    super (x, y, width, height)
    this.playerImg= new Image();
    this.playerImg.src= "./imagenes/bigfoot.png"
    this.playerImg.onload= () => {
    this.draw()
    }
    this.vida = 5
}
draw(){
    ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height)
}}
class Proyectiles extends Component {
    constructor(x, y,imgSource, velocity){
        super(x, y, imgSource) //cuando usas exted y el width es doferente hay que ponerlo en el super??
        this.width = 20
        this.height = 20
        this.velocity = velocity;
        this.imgSource= new Image()
        this.imgSource.src= imgSource
        this.imgSource.onload= ()=>{
            this.draw()
         }
    }
    draw(){
        ctx.drawImage(this.imgSource, this.x, this.y, this.width, this.height)
    }
    updateProyectil(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        
    }
}
const friction= 0.99
class Particles extends Component {
    constructor(x, y, radio, color, velocity){
        super(x,y)
        this.radio= radio;
        this.color= color;
        this.velocity= velocity;
        this.alpha= 1
    }
    draw(){
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radio,0,Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
    updateParticles(){
        this.draw()
        this.velocity.x *= friction 
        this.velocity.y *= friction 
        this.x = this.x + this.velocity.x
        this.y = this.y +  this.velocity.y
        this.alpha-=0.01
    }
}

//Instanciammiento de jugadores y personajes

let groundGame= new Ground(0, 0, canvas.width, canvas.height)
let groundLost= new Ground(0, 0, canvas.width, canvas.height)
let yeti1 = new Player(xInicial+10, yMitad, 70, 70)
let bigFoot1 = new Shooter(xInicial+90, yInicial+ 5, 70, 70)
let bigFoot2 = new Shooter(xInicial+90, yInicial+75, 70, 70) 
let bigFoot3 = new Shooter(xInicial+90, yInicial+145, 70, 70) 
let bigFootArr= [bigFoot1, bigFoot2, bigFoot3];
let enemiesArr= [];
let proyectilesArr= [];
let particlesArray= [];
//let inGameMusic;

//Funcion para arrancar con botones Restart y Start
function init() {
     enemiesArr= [];
     proyectilesArr= [];
     particlesArray= [];
     huntersScoreHTML.innerHTML = 0
     //gameOver.style.display="none"
}
//Función de generación de enemigos

const filasGroundEjeY = [yInicial + 5, yInicial + 75, yInicial+143,
     yInicial+213, yInicial+283, yInicial+353, yInicial+423, yInicial+489]
console.log(filasGroundEjeY)
function generarEnemigoRojo(){
    setInterval(() =>{
        let width= 70
        let height=70
        let x= canvas.width + width
        let y= filasGroundEjeY[Math.floor(Math.random() * filasGroundEjeY.length)] 
                        
        console.log(y)
        velocity= {
            x: -2,
            y: 0,
        }
        enemiesArr.push(new Enemy(x, y, width, height,"./imagenes/cazador2.png", velocity, 1, "rojo")) //
    },1500)
} 
function generarEnemigoAmarillo(){
    setInterval(() =>{
        let width= 70
        let height=70
        let x= canvas.width + width
        let y= filasGroundEjeY[Math.floor(Math.random() * filasGroundEjeY.length)] + height
        velocity= {
            x: -2,
            y: 0,
        }
        enemiesArr.push(new Enemy(x, y, width, height,"./imagenes/Cazador1.png", velocity, 1, "amarillo")) //
    },4000)
}
function generarEnemigoJeep(){
    setInterval(() =>{ 
        let width= 70
        let height=70
        let x= canvas.width + width
        let y= filasGroundEjeY[Math.floor(Math.random() * filasGroundEjeY.length)] + height
        velocity= {
            x: -2,
            y: 0,
        }
        enemiesArr.push(new Enemy(x, y, width, height,"./imagenes/jeepCazador.png", velocity, 5, "jeep")) 
    },10000)
}
console.log(enemiesArr)
//funcio disparos automaticos Yeti
function proyectilesYeti () {
        /*let canvasRect= canvas.getBoundingClientRect()
    setInterval(()=>{
        let x = yeti1.x + yeti1.width/2 
        let y = yeti1.y + yeti1.height/2 
        const velocity= {
              x: 5,
              y: 0
          }
        proyectilesArr.push(new Proyectiles(x-5, y, "./imagenes/snowball.png", velocity))
    },1000)
    console.log(proyectilesArr)*/
   
   }

   function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
   
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.playLoop = function () {
        this.sound.play();
        this.sound.loop =true
    }
    this.stop = function(){
      this.sound.pause();
      this.sound.currentTime = 0
    }


  }

  

////////////////////////
//ANIMACION////////////
///////////////////
let inGameMusic = new sound("./audio/Grieg - In the Hall of the Mountain King - 8-bit Remix.mp3")
let lostGameMusic = new sound("./audio/Game Over (8-Bit Music).mp3")
let enemyHitSound = new sound("./audio/hitEnemy.mp3")
let shootSound = new sound("./audio/lanzamiento.mp3")
let animationId 
let frame = 0
let scoreHunters = 0
let gameTime = 0
let coinSuma= 0
let aldeanosSuma= 0
let yetiVida= yeti1.vida
function updateCanvas(){
  animationId = requestAnimationFrame(updateCanvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    groundGame.draw()
    yeti1.draw()
    bigFootArr.forEach((bigF) =>{
        bigF.draw()
    })
    //const updateGameTime= (dt)=>{
     //   gameTime += dt
      //  console.log(gameTime)
    //}
    //timeHtml.innerText= updateGameTime()
    particlesArray.forEach((particle, index) => {
        particle.updateParticles()
        if(particle.alpha <= 0){
            particlesArray.splice(index, 1)
        }else{
            particle.updateParticles()
        }
    })
    proyectilesArr.forEach((proyect, index)=>{
        proyect.updateProyectil()
        
        if (proyect.x-proyect.width > canvas.width){           
                proyectilesArr.splice(index, 1)
    }
    })
    enemiesArr.forEach((enemy, index)=>{
        enemy.draw()
        enemy.updateEnemy()
        //EndGame
        const distance= Math.hypot(yeti1.x-enemy.x, yeti1.y-enemy.y)
        if(distance-yeti1.width-enemy.width <0.5) {
            for(let i=0; i<8; i++){
                particlesArray.push(new Particles(
                    yeti1.x+40, 
                    yeti1.y+30, 
                    Math.random()*6, 
                    "yellow", 
                    {x:(Math.random()-0.5)*(Math.random()*5),
                     y:(Math.random()-0.5)*(Math.random()*5)})) 
            }
            if(yeti1.vida>=1) {
                enemiesArr.splice(index, 1)
                yeti1.vida-=1
                yetiLiveCount.innerHTML= yeti1.vida
            } else {
                cancelAnimationFrame(animationId)
                clearInterval()
                groundLost.draw()
                
                inGameMusic.stop()
             
                //lostGameMusic = new sound("./audio/Game Over (8-Bit Music).mp3")
                lostGameMusic.play()
                //gameOver.style.display="block"    
            }
        }
        //Enemigos chocan y disminuyen vida Shooter    
        bigFootArr.forEach((bigF, bigFIndex)=>{
            const distance= Math.hypot(bigF.x-enemy.x, bigF.y-enemy.y)
            if(distance-bigF.width-enemy.width <0.5){
                for(let i=0; i<8; i++){
                    particlesArray.push(new Particles(
                        bigF.x+40, 
                        bigF.y+30, 
                        Math.random()*4, 
                        "white", 
                        {x:(Math.random()-0.5)*(Math.random()*3),
                         y:(Math.random()-0.5)*(Math.random()*3)})) 
                }
                if(bigF.vida >= 1){
                    enemiesArr.splice(index, 1)
                    bigF.vida=-1
                }
            else {
                enemiesArr.splice(index, 1)
                bigFootArr.splice(bigFIndex, 1)
            }    
        }
        })
        //Daño, desaparicion de proyectiles y enemigos
        proyectilesArr.forEach((proyect, proyectIndex)=>{
            const distance= Math.hypot((proyect.x+proyect.width) - enemy.x, (proyect.y + proyect.width) - enemy.y)
            if(distance-enemy.width <0.5){
                //explota al chocar proyectil con enemigo
                for(let i=0; i<8; i++){
                    particlesArray.push(new Particles(
                        proyect.x, 
                        proyect.y, 
                        Math.random()*2, 
                        "gray", 
                        {x:(Math.random()-0.5)*(Math.random()*3),
                         y:(Math.random()-0.5)*(Math.random()*3)})) 
                }
                if(enemy.strength>0){
                    enemy.strength-=1
                        proyectilesArr.splice(proyectIndex, 1)
                }else{

                    if(enemy.name==="jeep"){
                        coinSuma+=5
                        aldeanosSuma+=10  
                        scoreHunters+=1                     
                        enemiesArr.splice(index, 1)
                        proyectilesArr.splice(proyectIndex, 1)
                        enemyHitSound.play()
                        coinsCountHtml.innerHTML= coinSuma
                        aldeanosCountHtml.innerHTML= aldeanosSuma
                        huntersScoreHTML.innerHTML = scoreHunters 

                    }else if(enemy.name==="rojo"){
                            
                            coinSuma+=3
                            aldeanosSuma+=7
                        scoreHunters+=1
                        enemiesArr.splice(index, 1)
                        proyectilesArr.splice(proyectIndex, 1)
                        enemyHitSound.play()
                        huntersScoreHTML.innerHTML = scoreHunters 
                        coinsCountHtml.innerHTML= coinSuma
                        aldeanosCountHtml.innerHTML= aldeanosSuma
                        }else{
                            coinSuma+=1
                            aldeanosSuma+=5
                        
                            //aumenta conteo cazadores abatidos
                        scoreHunters+=1
                        //desaparece proy y enemigo al bajarle vida a 0
                        enemyHitSound.play()
                        enemiesArr.splice(index, 1)
                        proyectilesArr.splice(proyectIndex, 1)
                        huntersScoreHTML.innerHTML = scoreHunters 
                        coinsCountHtml.innerHTML= coinSuma
                        aldeanosCountHtml.innerHTML= aldeanosSuma
                        }
                }
            }
        })
        //if (enemy.x < 0 - enemy.width){        
        //        enemiesArr.splice(index, 1)         
       // }
    })
    frame++
}

//Activar Shooters
addEventListener ("click", (event)=>{

    let canvasRect= canvas.getBoundingClientRect()
    for (let i=0; i<bigFootArr.length; i++){
        if(event.clientX - canvasRect.left <= bigFootArr[i].x+bigFootArr[i].width &&
            event.clientX -canvasRect.left > bigFootArr[i].x &&
            event.clientY - canvasRect.top < bigFootArr[i].y + bigFootArr[i].height &&
            event.clientY -canvasRect.top > bigFootArr[i].y) 
            {
                const velocity= {
                x: 4,
                y: 0
                    }
                proyectilesArr.push(new Proyectiles(bigFootArr[i].x+20,bigFootArr[i].y+35,"./imagenes/stone.png",velocity))
                shootSound.play()
}
}
})
//Comprar nuevos BigFoot
addEventListener("keydown", (event)=>{
if (event.defaultPrevented) {
    return; 
} 

switch(event.code){
case "Space":
let x = xInicial + 90
let y = yInicial + 5
let width= 70
let height= 70

if(coinSuma>=1){
    coinSuma-=1
    coinsCountHtml.innerHTML= coinSuma
    for(let i = 0; i < bigFootArr.length; i++){        
        if(y == bigFootArr[i].y && y<=canvas.height-3){
             y= bigFootArr[i].y + height
        }  
    }
        bigFootArr.push(new Shooter(x, y, width, height)) 

}
}
})   
//Moviemiento Yeti Up and Down con flechas teclado
/*for(let i = 0; i < bigFootArr.length; i++){        
    if(y == bigFootArr[i].y && y<=canvas.height-3){
         y= bigFootArr[i].y + height
    }  
}
    bigFootArr.push(new Shooter(x, y, width, height)) */
//bloquear teclas izq y der
/// revisar que no se mueva el scroll del browser
addEventListener("keydown", event =>{
if (event.defaultPrevented) {
return; 
}
console.log(event.code)
switch(event.code) {
case "ArrowUp":
    yeti1.moveUp();
    break;
case "ArrowDown":
    yeti1.moveDown();
    break;
}
})


//Funcion para boton Start
botonStart.addEventListener("click", () => {
init()
updateCanvas()
generarEnemigoRojo()
generarEnemigoAmarillo()
generarEnemigoJeep()
proyectilesYeti () 
lostGameMusic.stop()


inGameMusic.playLoop()

})
//Cuando salga Game over convertir el boton Start en Restart o aparecer uno grandote en la parte alta de gameover
/*const restartGame = restartGame.addEventListener("click", () => {
init()
updateCanvas()
generarEnemigoRojo()
generarEnemigoAmarillo()
generarEnemigoJeep()
proyectilesYeti () 
gameOver.style.display="none"
})*/
//updateCanvas()
//generarEnemigoRojo()
//generarEnemigoAmarillo()
//generarEnemigoJeep()
//proyectilesYeti () 
console.log(enemiesArr)
console.log(particlesArray)
