import EventEmitter from "./EventEmitter.js"

export default class Sizes extends EventEmitter{
	constructor()
	{
		super()

		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixerRatio = Math.min(devicePixelRatio, 2)

		//Resize event
		window.addEventListener('resize', () => 
		{
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.pixerRatio = Math.min(devicePixelRatio, 2)

			this.trigger('resize')
		})
	}
}