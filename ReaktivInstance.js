/**
 * Generate a pseudo random id.
 * @return {Number} The id.
 */
const GenerateId = () => {

	/**
	 * Get a String from multiplying a random number plus the current date
	 * and turn it into an Array.
	 * @type {Array}
	 */
	const Result = Array.from (String (Math.random () * Date.now ()));

	/**
	 * Filter the Array and exclude dots from it.
	 * @param  {String} Item The current item from the Array of the iteration.
	 * @return {Array}      A new Array without dots.
	 */
	const NewResult = Result.filter (Item => Item !== ".");

	/**
	 * Join the Array into a single String, convert it to a Number and returns.
	 */
	return Number (NewResult.join (""));
}


/**
 * Export the main class used.
 * @type {Objet}
 */
module.exports = class ReaktivInstance {

	/**
	 * Instantiate the class.
	 * @param  {Object} Data The data to be manipulated.
	 * @return {Object}      The configured instance.
	 */
	constructor (Data) {

		/**
		 * Set an Id for the instance.
		 * @type {Number}
		 */
		this.__ReaktivId__ = GenerateId ();

		/**
		 * Store the received data.
		 * @type {Object}
		 */
		this.__ReaktivData__ = Data;

		/**
		 * Object to store all callbacks.
		 * @type {Object}
		 */
		this.__CallBacks__ = {};


		/**
		 * Configure the received data.
		 */
		this.ConfigureData ();
	}


	/**
	 * Set an event to the object.
	 * @param {String} EventName The name of the event.
	 * @param {String} Property  The property that will be watched.
	 * @param {Function} CallBack  The callback handler.
	 */
	SetEvent (EventName, Property, CallBack) {

		let ConfiguredEvent = {};
		ConfiguredEvent[EventName] = CallBack;


		/**
		 * If the property has callbacks, ConfiguredEvent receive every callback to him 
		 * and receive the same callback to the same event again, overwriting existing 
		 * callback for the same event if it exists.
		 * @param  {Object} this.__CallBacks__[Property] The reference of the property to be watched.
		 * @return {Object}                               The configured event reference. 
		 */
		if (this.__CallBacks__[Property]) {

			/**
			 * The ConfiguredEvent receive the existent callbacks to the property.
			 * @type {Object}
			 */
			ConfiguredEvent = this.__CallBacks__[Property];

			/**
			 * Set the callback to the event name.
			 */
			ConfiguredEvent[EventName] = CallBack;
		}


		/**
		 * Set the callback(s) to the property referenced.
		 */
		this.__CallBacks__[Property] = ConfiguredEvent;
	}


	/**
	 * Fire an event for a property.
	 * @param {String} Property  The property to fire the event.
	 * @param {String} EventName The name of the event.
	 */
	FireEvent (Property, EventName) {

		/**
		 * If the callbacks for the property don't exists or be differente from an Object, 
		 * do nothing.
		 */
		if (!this.__CallBacks__[Property] || this.__CallBacks__[Property] === {}) return;

		/**
		 * Get the property on all callbacks.
		 * @type {Object}
		 */
		const AffectedProperty = this.__CallBacks__[Property];

		/**
		 * Call the event of the property.
		 */
		AffectedProperty[EventName] ();
	}

	/**
	 * Add a property and bind an event to it.
	 * @param {String} Attribute The property to be manipulated.
	 */
	AddReaktivProperty (Attribute) {

		/**
		 * Get the value of the property.
		 * @type {Any}
		 */
		let Value = this.__ReaktivData__[Attribute];

		/**
		 * Small helper.
		 * @type {Object}
		 */
		const ME = this;


		/**
		 * Make the getters and setters for the data.
		 * @param  {Object} this.__ReaktivData__ The object to be configured.
		 * @param  {String} Attribute            The object's property to be configured.
		 * @param  {Object} options				 An object containing the setters and getters.
		 * @return {Object}                      The configuration for the object.
		 */
		Object.defineProperty (this.__ReaktivData__, Attribute, {

			get () {

				return Value;
			},
			set (NewValue) {

				Value = NewValue;

				/**
				 * Fire the standard Change event.
				 */
				ME.FireEvent (Attribute, "Change");
			}
		});
	}

	/**
	 * Get all the properties and make them reactive.
	 */
	ConfigureData () {

		/**
		 * Get all properties and loop thru them.
		 * @param  {String} Key The current property on the iteration.
		 */
		for (let Key in this.__ReaktivData__) {

			/**
			 * Check if the property exists on the data and make it reactive.
			 * @param  {Boolean} this.__ReaktivData__.hasOwnProperty (Key)         If has the property.
			 */
			if (this.__ReaktivData__.hasOwnProperty (Key)) {

				this.AddReaktivProperty (Key);
			}
		}
	}
}