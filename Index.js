/**
 * Get the reaktiv instance.
 * @type {Object}
 */
const ReaktivInstance = require ("./ReaktivInstance.js");


/**
 * Export the main class used.
 * @type {Objet}
 */
module.exports = class Reaktiv {

	/**
	 * Instantiate the class.
	 * @param  {Object} Data The data to be manipulated.
	 * @return {Object}      The configured instance.
	 */
	constructor (SomeObject) {

		/**
		 * Create a ReaktivInstance based on the received data.
		 * @type {ReaktivInstance}
		 */
		this.__ReaktivInstance__ = new ReaktivInstance (SomeObject);


		/**
		 * Bind the data of this object to the created ReaktivInstance.
		 * @param {Object} Target This object.
		 * @param {String} Name   The property to be affected.
		 * @param {Any} Value	  The value to be added.
		 */
		return new Proxy (this, {

			set: function (Target, Name, Value) {

				/**
				 * Access the data and set the value of the key.
				 */
				Target.__ReaktivInstance__.__ReaktivData__[Name] = Value;
			}
		});
	}

	/**
	 * Add an event to the object.
	 * @param {String} EventName        The name of the event.
	 * @param {String} PropertyName     The name of the property.
	 * @param {Function} CallBackFunction The function to handle the callback.
	 */
	On (EventName, PropertyName, CallBackFunction) {

		/**
		 * Set the especified event.
		 */
		this.__ReaktivInstance__.SetEvent (EventName, PropertyName, CallBackFunction);
	}
};