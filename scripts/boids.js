//The main particle effect controller
class ParticleEffect{
	constructor(canvas, effect, controlPanel){
		this._canvas = canvas;
		this._parentElem = this._canvas.parentElement;
		canvas.width = this._parentElem.clientWidth;
		canvas.height = this._parentElem.clientHeight;
		canvas.style.background = 'black';
		this.width = this._canvas.width;
		this.height = this._canvas.height;
		this._ctx = this._canvas.getContext('2d');

		this.controlPanel = controlPanel;
		
		this._effect = new effect(this._canvas, this.controlPanel);
		
		this._particles = [];
		this._numberofItems = 75;

		

		window.addEventListener('resize', ()=>{
			this._canvas.width = this._parentElem.clientWidth; 
			this._canvas.height = this._parentElem.clientHeight;
		})

		this._createItems();
		this._createControls();


		this._animate();
		
	}

	_createItems(){
		this._particles = []; //clears out the original array if any are left over;
		for(let i=0; i<this._numberofItems; i++){

			this._particles.push(
				new Particle(
					this, 
					Math.random() * this._canvas.width,
					Math.random() * this._canvas.height
				)
			)
		}
	}

	_createControls(){
		const numBoids = {
			type:'slider', 
			name:'# of boids', 
			min:0, 
			max:200, 
			value: 75,
			units: ' boids',  
			callback: (e)=>{
				this._numberofItems = e.target.value;
				this._createItems();
			} 
		}
		this.controlPanel.addControl(numBoids)
	}
	
	//method repsonsible to refreshing the canvas every frame
	_animate(){
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)

		//update
		this._effect.update(this._particles)
		this._particles.forEach(particle => particle.update())

		//draw
		this._effect.draw(this._ctx)
		this._particles.forEach(particle => particle.draw(this._ctx))
		
		requestAnimationFrame(()=>this._animate())
	}
}

/**
 * Particle class is responsible for storing data on the particle, drawing itself, 
 * and updating it's own position based on the forces acting on it.  The VAST
 * majority of calculations will be handled with the BoidsEffect class.
 */
class Particle{
	constructor(effect, x, y){
		this._effect = effect;
		this.mass = 1;
		this.position = new Vector2(x,y)
		this.velocity = new Vector2(2*Math.random() -1, 2*Math.random()-1);
		this.acceleration = Vector2.zero();
		this.maxForce = 0.01;
		this.maxSpeed = 1;

		this.radius = 5

		//orientation - N basis vectors
	}

	applyForce(force){
		this.acceleration.add(force)
	}

	getColor(){
		return `hsl(${(this.position.x / this._effect.width) * 360}, 100%, 50%)`
	}

	update(){
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);

		this.position.add(this.velocity);
		this.acceleration = Vector2.zero();
	}

	draw(ctx){
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		ctx.fill();
	}

}

/**
 * class for handline the creation of control panel elements such as 
 * sliders, check boxes, etc...
 */
class ControlPanel{
	constructor(element){
		this.element = element
	}

	//only slider controls for now, but can easily be extended for others
	addControl(config){
		//takes a config object and creates a new control
		//{type, name, callback}

		switch (config.type) {
			case 'slider':
				this.element.appendChild(this._createSlider(config))
				break;
		
			default:
				break;
		}
	}

	_createSlider(config){
		//{type, name, callback, min, max, value, units}
		const div = document.createElement('div');

		const name = document.createElement('p');
		name.innerText = config.name;

		const slider = document.createElement('input');
		slider.type = 'range';
		slider.name = config.name;
		slider.id = config.name;
		slider.min = config.min;
		slider.max =config.max;
		slider.value = config.value;
		

		const label = document.createElement('label');
		label.htmlFor = config.name;
		label.innerText = `${slider.value}${config.units??''}`;

		slider.addEventListener('input', (e)=>{
			config.callback(e); 
			label.innerText = `${e.target.value}${config.units??''}`;
			
		})

		div.appendChild(name);
		div.appendChild(slider);
		div.appendChild(label);
		
		return div;
	}
}

/**
 * Collision detection can get costly.  niavely each object has to 
 * check its collision against every other object.  This can quickly
 * get out of control.  O(n^2) time.  The CollisionMap class is a 
 * spatial partitioning tool that allows an object to query its position
 * and the area around it returning only a few objects to be checked 
 * against.  
 */
class CollisionMap{
	constructor(width, height, cellSize){
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		this.map = new Map();  
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
			this.map.set(key, new Set([item])); //using sets instead of arrays to guarantee no duplicates
		}else{
			cell.add(item);
			this.map.set(key, cell);
		}
		
	}

	queryMap(position, radius){
		const {x, y} = this.coordinatesToMapCell(position)
		const cellRadius = Math.ceil(radius / this.cellSize)
		const potenials = new Set(); 
		
		//rough detection - grabbing all of the objects in cells within the radius 
		//to reduce number of future calculations needed.
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

		//fine detection - checking every object from the potentials list
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

/**
 * using x,y positioning, acceleration, and velocity values lends itself
 * to using vector math.  This small vector class abstracts a lot of the 
 * math needed to calculate forces in the BoidsEffect class.
 */
class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y
	}

	static zero(){
		return new Vector2(0,0)
	}

	static sub(vector1, vector2){
		return new Vector2(
			vector1.x - vector2.x,
			vector1.y - vector2.y
		)
	}

	setMagnitude(scalar){
		return this.normalize().scale(scalar);

	}

	limit(scalar){
		if(this.magnitude() > scalar){
			this.setMagnitude(scalar)
		}
		return this
	}

	add(vector){
		this.x += vector.x;
		this.y += vector.y

		return this;
	}

	subtract(vector){
		this.x -= vector.x
		this.y -= vector.y

		return this
	}

	scale(scalar){
		this.x *= scalar;
		this.y *= scalar;

		return this
	}

	normalize(){
		const magnitude = Math.sqrt((this.x * this.x)+(this.y * this.y))
		if(magnitude > 0){
			this.x /= magnitude;
			this.y /= magnitude;
		}
		return this
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

	addAngle(angle){
		//angle must be in radians
		const x = (Math.cos(angle)* this.x) -(Math.sin(angle)*this.y);
		const y = (Math.sin(angle)*this.y) + (Math.cos(angle)*this.y)
		this.x = x
		this.y = y
	}

	rotate(degree){
		//degree must be in radians
		const sin = Math.sin(degree);
		const cos = Math.cos(degree)
		const base = new Vector2(cos, sin);
		const orthogonal = new Vector2(-sin, cos)
		const v = this.copy()
		this.x = (base.x * v.x) + (orthogonal.x * v.y)
		this.y = (base.y * v.x) + (orthogonal.y * v.y)
	}

	static fromDirection(direction){
		//direction needs to be in radians
		//returns a unit vector
		const vector = new Vector2(0,0)
		vector.x += parseFloat(Math.cos(direction).toFixed(2))
		vector.y += parseFloat(Math.sin(direction).toFixed(2))
		return new Vector2(
			parseFloat(Math.cos(direction).toFixed(2)),
			parseFloat(Math.sin(direction).toFixed(2))
		)
		
		return vector
	}
}

/**
 * This is the main efffect class.  This class is responsible for all 
 * of the calculation needed to create the behavior displayed by the 
 * boids on screen.
 */
export class BoidsEffect{
	constructor(canvas, controlPanel){
		this._canvas = canvas;
		this._controlPanel = controlPanel;
		this._collisionMap = new CollisionMap(this._canvas.width, this._canvas.height, 25)
		this._viewDistance = 100
		this._maxForce = 0.2
		this.cohesionScale = 1;
		this.alignmentScale = 1;
		this.separationScale = 1;

		this._createControls();

	}

	_createControls(){
		//create a slider for alignment, separation, cohesion
		const separationControl = {
			name: 'Separation Force',
			type: 'slider',
			min: 0,
			max: 200,
			value: 100,
			units: '%',
			callback: (e)=>{
				this.separationScale = parseInt(e.target.value, 10) / 100
			}
		}
		this._controlPanel.addControl(separationControl);

		const cohesionControl = {
			name: 'Cohesion Force',
			type: 'slider',
			min: 0,
			max: 200,
			value: 100,
			units: '%',
			callback: (e)=>{
				this.cohesionScale = parseInt(e.target.value, 10) / 100
			}
		}
		this._controlPanel.addControl(cohesionControl)

		const alignmentControl = {
			name: 'Alignment Force',
			type: 'slider',
			min: 0,
			max: 200,
			value: 100,
			units: '%',
			callback: (e)=>{
				this.AlignmentScale = parseInt(e.target.value, 10) / 100
			}
		}
		this._controlPanel.addControl(alignmentControl)
	}

	//main method for calculating force needed.
	//takes in an item and a target position then caluclates force needed to steer towards that position
	seek(item, target){
		//move towards the target at maximum speed
		const force = Vector2.sub(target, item.position);
		force.setMagnitude(item.maxSpeed)
		force.subtract(item.velocity)
		force.limit(item.maxForce)

		return force;

	}

	//avoid hitting your neighbors by maximizing distance from all of them 
	separation(item, neighbors){
		const avgForce = Vector2.zero();
		if(neighbors.length == 0){return avgForce}

		for(const neighbor of neighbors){
			const neighborCopy = neighbor.position.copy()
			neighborCopy.subtract(item.position);
			const dist = neighborCopy.magnitude();
			neighborCopy.scale(-dist/this._viewDistance) //inverts the direction of the force and makes further away objects exert less force
			avgForce.add(neighborCopy)
			
		}

		avgForce.scale(1/neighbors.length)
		avgForce.add(item.position)
		
		return this.seek(item, avgForce)
	}

	//move in the same direction as your neighbors
	alignment(item, neighbors){
		const avgVelocity = Vector2.zero();
		if(neighbors.length === 0){return avgVelocity}

		for(const neighbor of neighbors){
			avgVelocity.add(neighbor.velocity)
		}

		avgVelocity.scale(1/neighbors.length)
		avgVelocity.add(item.position)

		return this.seek(item, avgVelocity)
	}

	//move towards the middle of your neighbors
	cohesion(item, neighbors){
		const avgPosition = Vector2.zero();
		if(neighbors.length == 0){return avgPosition}

		for(const neighbor of neighbors){
			avgPosition.add(neighbor.position)
		}

		avgPosition.scale(1/neighbors.length);
		
		return this.seek(item, avgPosition)
	}

	_getNeighbors(item){
		return this._collisionMap.queryMap(item.position, this._viewDistance).filter(neighbor => {
			return neighbor !== item
		})
	}

	update(items){
		//update collision map for space partitioning
		this._collisionMap.clear();
		items.forEach(item => this._collisionMap.addToMap(item))
		
		items.forEach((item) =>{
			const neighbors = this._getNeighbors(item)
			const appliedForce = Vector2.zero();


			appliedForce.add(this.alignment(item, neighbors).scale(this.alignmentScale))
			appliedForce.add(this.cohesion(item, neighbors).scale(this.cohesionScale))
			appliedForce.add(this.separation(item, neighbors).scale(this.separationScale))

			item.applyForce(appliedForce)
			
			//screen wrap
			if(item.position.x > (this._canvas.width - item.radius)){item.position.x = item.radius}
			else if(item.position.x < item.radius){item.position.x = this._canvas.width - item.radius}
			if(item.position.y > (this._canvas.height - item.radius)){item.position.y = item.radius}
			else if(item.position.y < item.radius){item.position.y = this._canvas.height - item.radius}
		})

	}

	//even though this is currently empty, it isn't always and the ParticleEffect class expects it to be here
	//useful when wanting to draw things for debugging on the effect.
	draw(ctx){}
	
}

const canvas = document.querySelector('.effect-canvas');
const ui = document.querySelector('.ui');
const controlPanel = new ControlPanel(ui)
const effect = new ParticleEffect(canvas, BoidsEffect, controlPanel)