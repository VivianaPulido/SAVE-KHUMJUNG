const canvas= document.getElementById("canvas");
const ctx= canvas.getContext("2d");
canvas.width = 900
canvas.height = 560
const huntersScoreHTML = document.querySelector(".huntersScore")
const timeHtml= document.querySelector(".countTime")
const botonComprar= document.getElementById("comprar")
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
    }
    draw(){
        ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height)
    }
}
class Enemy extends Component {
    constructor(x, y, width, height, imgSource, velocity, strength){
        super(x, y, width, height, imgSource)
        this.velocity= velocity;
        this.enemyImg= new Image()
        this.enemyImg.src= imgSource
        this.enemyImg.onload= ()=>{
            this.draw()
         }
        this.strength= strength;
        }
        draw(){
            ctx.drawImage(this.enemyImg, this.x, this.y, this.width, this.height)
        }
        move(){
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
}
draw(){
    ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height)
}}
class Proyectiles {
    constructor(x, y, radio, color, velocity){
    this.x = x;
    this.y = y;
    this.radio= radio;
    this.color= color;
    this.velocity= velocity;
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radio,0,Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
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

const yMitad= canvas.height/2
const yInicial = canvas.height - canvas.height
const xInicial = canvas.width - canvas.width
//Instanciammiento de jugadores y personajes
let ground= new Ground(0, 0, canvas.width, canvas.height)
let yeti1= new Player(xInicial+10, yMitad, 70, 70)
let bigFoot1 = new Shooter(xInicial+90, yInicial+ 5, 70, 70)
let bigFoot2 = new Shooter(xInicial+90, yInicial+80, 70, 70)
let bigFoot3 = new Shooter(xInicial+90, yInicial+150, 70, 70)
let enemiesAmarillosArr= [];
let enemiesRojosArr= [];
let enemiesArr= [];
let proyectilesArr= [];
let bigFootArr= [bigFoot1, bigFoot2, bigFoot3];
let particlesArray= [];
console.log(bigFoot1)


//Función de generación de enemigos
function generarEnemigoRojo(){
    setInterval(() =>{
        let width= 70
        let height=70
        let x= canvas.width + width
        let y= ((Math.random() * (canvas.height-height)) + height) 
        velocity= {
            x: -2,
            y: 0,
        }
        //enemiesAmarillosArr.push(new Enemy(x, y, width, height,"./imagenes/Cazador1.jpeg", velocity, 5)) //""
        //enemiesArr= [...enemiesAmarillosArr]
        enemiesArr.push(new Enemy(x, y, width, height,"./imagenes/cazador2.png", velocity, 1)) //
    },3000)
}

function generarEnemigoAmarillo(){
    setInterval(() =>{
        let width= 70
        let height=70
        let x= canvas.width + width
        let y= ((Math.random() * (canvas.height-height)) + height) 
        velocity= {
            x: -2,
            y: 0,
        }
        enemiesArr.push(new Enemy(x, y, width, height,"./imagenes/Cazador1.png", velocity, 1)) //
    },5000)
}

function generarEnemigoJeep(){
    setInterval(() =>{
        let width= 70
        let height=70
        let x= canvas.width + width
        let y= ((Math.random() * (canvas.height-height)) + height) 
        velocity= {
            x: -2,
            y: 0,
        }
        //enemiesAmarillosArr.push(new Enemy(x, y, width, height,"./imagenes/Cazador1.jpeg", velocity, 5)) //""
        //enemiesArr= [...enemiesAmarillosArr]
        enemiesArr.push(new Enemy(x, y, width, height,"./imagenes/jeepCazador.png", velocity, 5)) //
    },5000)
}


//Variables para Animacion
let animationId
let frame = 0
let scoreHunters = 0
let gameTime = 0
function updateCanvas(){
  requestAnimationFrame(updateCanvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ground.draw()
    yeti1.draw()
    bigFootArr.forEach((bigF) =>{
        
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
        if (proyect.x-proyect.radio > canvas.width){           
                proyectilesArr.splice(index, 1)
    }
    })
    enemiesArr.forEach((enemy, index)=>{
        enemy.draw()
        enemy.updateEnemy()
        proyectilesArr.forEach((proyect, proyectIndex)=>{
            const distance= Math.hypot(proyect.x-enemy.x, proyect.y-enemy.y)
            if(distance-proyect.radio-enemy.width <0.5){
                for(let i=0; i<8; i++){
                    particlesArray.push(new Particles(
                        proyect.x, 
                        proyect.y, 
                        Math.random()*2, 
                        "red", 
                        {x:(Math.random()-0.5)*(Math.random()*3),
                         y:(Math.random()-0.5)*(Math.random()*3)})) 
                }
                if(enemy.strength>=1){
                    enemy.strength-=1
                        proyectilesArr.splice(proyectIndex, 1)
                   
                }else{
                    //aumenta conteo cazadores abatidos
                    scoreHunters+=1
                    huntersScoreHTML.innerHTML = scoreHunters
                    //desaparece proy y enemigo al bajarle vida a 0
                        enemiesArr.splice(index, 1)
                        console.log(enemiesArr)
                        proyectilesArr.splice(proyectIndex, 1)
        
                }
            }
        })
        //if (enemy.x < 0 - enemy.width){        
        //        enemiesArr.splice(index, 1)         
       // }
    })
    frame++
}

//Comprar nuevos BigFoot
//botonComprar.addEventListener("click", (event)=>{
//})

//se activan los disparadores
        addEventListener ("click", (event)=>{
            console.log(event.clientX, event.clientY)
            let canvasRect= canvas.getBoundingClientRect()
            for (let i=0; i<bigFootArr.length; i++){
                if(event.clientX - canvasRect.left <= bigFootArr[i].x+bigFootArr[i].width && event.clientX -canvasRect.left > bigFootArr[i].x
                    && event.clientY - canvasRect.top < bigFootArr[i].y + bigFootArr[i].height && event.clientY -canvasRect.top > bigFootArr[i].y){
            const velocity= {
                x: 4,
                y: 0
            }
            proyectilesArr.push(new Proyectiles(bigFootArr[i].x,bigFootArr[i].y+35, 5, "red", velocity))
        }
    }
        })
        //let bigFoot1 = new Shooter(100, y, 70, 70)
        //let bigFoot2 = new Shooter(100, y+150, 70, 70) 
    botonComprar.addEventListener("click", (event)=>{
        let x = xInicial + 90
        let y = yInicial + 5
        let width= 70
        let height= 70
        let newBigFoot= new Shooter(x, y, width, height)
        for(let i = 0; i < bigFootArr.length; i++){        
            if(newBigFoot.x === bigFootArr[i].x && newBigFoot.y === bigFootArr[i].y){
                newBigFoot.y+75
                bigFootArr.push(newBigFoot)
            }else{
                bigFootArr.push(newBigFoot)
            }
        }
    })   
    
    

   /* addEventListener("click", (event) =>{
        const velocity= {
            x: 4,
            y: 0
        }
        for (let i=0; i<bigFootArr.length; i++){
            
            proyectilesArr.push(new Proyectiles(bigFootArr[i].x,bigFootArr[i].y+35, 5, "red", velocity))
        }
    })*/
    //FUNCION PARA PROCESSAR IMAGENES
    /*function init () {
        updateCanvas()
    }
    resources.load([
        "./images/yeti.png",
    ]);
    resources.onReady(init);*/
    updateCanvas()
generarEnemigoRojo()
generarEnemigoAmarillo()
generarEnemigoJeep()
console.log(enemiesArr)
console.log(particlesArray)

