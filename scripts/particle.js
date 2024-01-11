export class ParticleEffect{
	constructor(canvas, width, height, effect){
		this._canvas = canvas
		canvas.width = width;
		canvas.height = height;
		canvas.style.background = 'black';

		this._ctx = this._canvas.getContext('2d');

		this.width = this._canvas.width;
		this.height = this._canvas.height;
		this._effect = new effect(this._canvas);
		this._particles = [];
		this._numberofItems = 75;

		window.addEventListener('resize', ()=>{
			this._canvas.width = width;
			this._canvas.height = height;
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
		this._ctx.clearRect(0, 0, this.width, this.height)

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
		this.x = this.radius + (Math.random() * (this._effect.width - this.radius *2));
		this.y = this.radius + (Math.random() * (this._effect.height - this.radius *2));
		this.baseSpeed = 1
		this.vx =  (Math.random() * this.baseSpeed) -(this.baseSpeed/2);
		this.vy =  (Math.random() * this.baseSpeed) -(this.baseSpeed/2);
	}

	getColor(){
		return `hsl(${(this.x / this._effect.width) * 360}, 100%, 50%)`
	}

	draw(ctx){
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fill();
	}

}

class CollisionMap{
	constructor(width, height, cellSize){
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		this.map = new Map()
	}

	coordinatesToMapCell(item){
		const x = Math.floor(item.x / this.cellSize);
		const y = Math.floor(item.y / this.cellSize);
		return {x,y};
	}

	addToMap(item){
		const {x,y} = this.coordinatesToMapCell(item);
		const key = `${x},${y}`;
		const cell = this.map.get(key);
		if(cell == null){
			this.map.set(key, new Set([item]));
		}else{
			cell.add(item);
			this.map.set(key, cell);
		}
		
	}

	queryMap(x, y, radius){
		const {x:cX, y:cY} = this.coordinatesToMapCell({x,y})
		const cellRadius = Math.ceil(radius / this.cellSize)
		const resp = new Set() //this is a very loose collision detection and that is okay for now

		for(let a = cX - cellRadius; a <= cX + cellRadius; a++){
			for(let b = cY -cellRadius; b <= cY  + cellRadius; b++){
				const key = `${a},${b}`
				const cell = this.map.get(key)
				if(cell != null){
					cell.forEach(c =>{
						resp.add(c)
					})
					
				}
			}
		}
		
		return Array.from(resp)
	}

	clear(){
		this.map.clear()
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
			item.x += item.vx
			item.y += item.vy
			if(item.x > (this._canvas.width - item.radius) || item.x < item.radius){ item.vx *= -1}
			if(item.y > (this._canvas.height - item.radius) || item.y < item.radius){ item.vy *= -1}
		})

		items.forEach(item => {
			this._collisionMap.queryMap(item.x, item.y, this.maxLineLength).forEach(connection =>{
				this.lines.push({
					ax: item.x,
					ay: item.y,
					ac: item.getColor(),
					bx: connection.x,
					by: connection.y,
					bc: connection.getColor()
				})
			})
		})
	}


	draw(ctx){
		//draw lines between items
		this.lines.forEach(line =>{
			ctx.save();
			const opacity = 1-(getDistance({x:line.ax, y:line.ay},{x:line.bx, y:line.by}) / this.maxLineLength);
			const gradient = ctx.createLinearGradient(line.ax, line.ay, line.bx, line.by);
			gradient.addColorStop(0, line.ac);
			gradient.addColorStop(1, line.bc)
			ctx.beginPath();
			ctx.moveTo(line.ax, line.ay);
			ctx.lineTo(line.bx, line.by);
			ctx.strokeStyle = gradient;
			ctx.globalAlpha = opacity;
			ctx.stroke();
			ctx.restore();
		})
		

	}
}


/**
 * 
 * UTILITIES
 */

const getDistance = (item1, item2) =>{ 
	const dx = item2.x - item1.x;
	const dy = item2.y - item1.y;

	return Math.sqrt((dx*dx) + (dy*dy))
}

