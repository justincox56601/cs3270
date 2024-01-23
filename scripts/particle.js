export class ParticleEffect{
	constructor(canvas, width, height, effect){
		this._canvas = canvas
		//this._parent = this._canvas.parentElement;
		canvas.width = width;
		canvas.height = height;
		canvas.style.background = 'black';
		this.width = this._canvas.width;
		this.height = this._canvas.height;
		
		
		this._ctx = this._canvas.getContext('2d');


		this._effect = new effect(this._canvas);
		this._particles = [];
		this._numberofItems = 75;

		window.addEventListener('resize', ()=>{
			this._canvas.width = this._canvas.parentElement.clientWidth; 
			this._canvas.height = this._canvas.parentElement.clientHeight;
		})

		

		this.createItems();


		this.animate();
		
	}


	createItems(){
		for(let i=0; i<this._numberofItems; i++){
			this._particles.push(new Particle(this))
		}
	}
	

	animate(){
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)

		this._effect.update(this._particles)
		this._effect.draw(this._ctx)
		this._particles.forEach(item => item.draw(this._ctx))
		
		requestAnimationFrame(()=>this.animate())
	}
}

class Particle{
	constructor(effect){
		this._effect = effect;
		this.radius = 5 + (Math.random() * 10);
		
		const x = this.radius + (Math.random() * (this._effect.width - this.radius *2));
		const y = this.radius + (Math.random() * (this._effect.height - this.radius *2));
		this.position = new Vector2(x,y);

		this.baseSpeed = 1
 		const vx =  (Math.random() * this.baseSpeed) - this.baseSpeed/2;
		const vy =  (Math.random() * this.baseSpeed) - this.baseSpeed/2;
		this.velocity = new Vector2(vx, vy)

		this.acceleration = new Vector2(0,0)
	}

	getColor(){
		return `hsl(${(this.position.x / this._effect.width) * 360}, 100%, 50%)`
	}

	draw(ctx){
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		ctx.fill();

		//draw velocity for debugging
		// const target = new Vector2(
		// 	this.velocity.x, 
		// 	this.velocity.y
		// )
		// target.scale(this.radius * 2)
		// target.add(this.position)

		// ctx.save();
		// ctx.beginPath();
		// ctx.moveTo(this.position.x, this.position.y);
		// ctx.lineTo(target.x, target.y);
		// ctx.strokeStyle = 'white';
		// ctx.stroke();
		// ctx.restore();
	}

}

class ControlPanel{
	constructor(canvas, width, height){
		this._canvas = canvas;
		this.width = width;
		this.height = height;
		this.controlPanel = this.createControlPanelElement();
		this._canvas.parentElement.appendChild(this.controlPanel)

		this.controlPanel.appendChild(this.addFullScreenControl())

		window.addEventListener('addControl', (e) =>{
			if(e.detail.control != null){
				this.controlPanel.appendChild(e.detail.control)
			}
			
		})
	}

	addControl(controlCofig){
		
	}

	createControlPanelElement(){
		const controlPanel = document.createElement('DIV');
		this.width = this.width;
		this.height = this.height;

		//set the styles for the controll panel
		controlPanel.style.position = 'absolute';
		controlPanel.style.top = 0;
		controlPanel.style.right = 0;
		controlPanel.style.backgroundColor = 'lightgrey';
		controlPanel.style.zIndex = 10;
		controlPanel.style.padding = '1rem';

		return controlPanel;
	}

	addFullScreenControl(){
		const control = document.createElement('DIV');
		const checkBox = document.createElement('input');
		const label = document.createElement('label')
		

		checkBox.type = 'checkbox';
		checkBox.onclick = () =>{
			if(!document.fullscreenElement){
				this._canvas.parentElement.requestFullscreen();
				this._canvas.width
			}else{
				document.exitFullscreen();
			}
			
		}

		window.addEventListener('fullscreenchange', (e)=>{
			checkBox.checked = document.fullscreenElement == null ? false : true
		})

		label.innerText = 'Fullscreen Mode';
		
		control.appendChild(checkBox);
		control.appendChild(label);

		//const event = new CustomEvent('addControl', {detail:{control:control}});
		//dispatchEvent(event)

		return control
	
	}
}

class CollisionMap{
	constructor(width, height, cellSize){
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		this.map = new Map()
	}

	coordinatesToMapCell(coordinate){
		return new Vector2(
			Math.floor(coordinate.x / this.cellSize),
			Math.floor(coordinate.y / this.cellSize)
		)
	}

	addToMap(item){
		const {x,y} = this.coordinatesToMapCell(item.position);
		const key = `${x},${y}`;
		const cell = this.map.get(key);
		if(cell == null){
			this.map.set(key, new Set([item]));
		}else{
			cell.add(item);
			this.map.set(key, cell);
		}
		
	}

	queryMap(position, radius){
		const {x, y} = this.coordinatesToMapCell(position)
		const cellRadius = Math.ceil(radius / this.cellSize)
		const potenials = new Set(); 
	
		for(let a = x - cellRadius; a <= x + cellRadius; a++){
			for(let b = y -cellRadius; b <= y  + cellRadius; b++){
				const key = `${a},${b}`
				const cellItems = this.map.get(key)
				if(cellItems != null){
					cellItems.forEach(item =>{
						potenials.add(item)
					})
					
				}
			}
		}

		const response = []
		potenials.forEach(item =>{	
			if(position.getDistanceTo(item.position) <= radius){
				response.push(item)
			}
		})
		return response
		
	}

	clear(){
		this.map.clear()
	}
	
	getItems(){
		return this.map;
	}
}

class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y
	}

	add(vector){
		this.x += vector.x;
		this.y += vector.y
	}

	subtract(vector){
		this.x -= vector.x
		this.y -= vector.y
	}

	scale(scalar){
		this.x *= scalar;
		this.y *= scalar;
	}

	normalize(){
		const magnitude = Math.sqrt((this.x * this.x)+(this.y * this.y))
		if(magnitude > 0){
			this.x /= magnitude;
			this.y /= magnitude;
		}
	}

	partialScale(vScalar){
		this.x *= vScalar.x;
		this.y *= vScalar.y;
	}

	getDistanceTo(vector){
		const dx = this.x - vector.x;
		const dy = this.y - vector.y;
		return Math.sqrt((dx * dx)+(dy * dy))
	}

	magnitude(){
		return Math.sqrt((this.x * this.x)+(this.y * this.y))
	}

	copy(){
		return new Vector2(this.x, this.y)
	}
}



/**
 * EFFECTS
 */

export class ConstellationEffect{
	constructor(canvas){
		this._canvas = canvas
		this.lines = [];
		this.maxLineLength = 100;
		this._collisionMap = new CollisionMap(this._canvas.width, this._canvas.height, 25)
	}

	update(items){
		this.lines.length = 0;
		this._collisionMap.clear();
		items.forEach(item => this._collisionMap.addToMap(item))

		items.forEach(item =>{
			item.position.add(item.velocity)
			if(item.position.x > (this._canvas.width - item.radius) || item.position.x < item.radius){ item.velocity.x *= -1}
			if(item.position.y > (this._canvas.height - item.radius) || item.position.y < item.radius){ item.velocity.y *= -1}
		})

		items.forEach(item => {
			this._collisionMap.queryMap(item.position, this.maxLineLength).forEach(connection =>{
				this.lines.push({
					aPosition: item.position,
					aColor: item.getColor(),
					bPosition: connection.position,
					bColor: connection.getColor()
				})
			})
		})
		
	}


	draw(ctx){
		//draw lines between items
		this.lines.forEach(line =>{
			ctx.save();
			const opacity = 1- (line.aPosition.getDistanceTo(line.bPosition) / this.maxLineLength);
			const gradient = ctx.createLinearGradient(line.aPosition.x, line.aPosition.y, line.bPosition.x, line.bPosition.y);
			gradient.addColorStop(0, line.aColor);
			gradient.addColorStop(1, line.bColor)
			ctx.beginPath();
			ctx.moveTo(line.aPosition.x, line.aPosition.y);
			ctx.lineTo(line.bPosition.x, line.bPosition.y);
			ctx.strokeStyle = gradient;
			ctx.globalAlpha = opacity;
			ctx.stroke();
			ctx.restore();
		})
		

	}
}

