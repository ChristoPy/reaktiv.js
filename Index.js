const ReaktivInstance = require ("./ReaktivInstance.js");


module.exports = class Reaktiv {

	constructor (SomeObject) {

		this.__ReaktivInstance__ = new ReaktivInstance (SomeObject);

		return this;
	}

	On (EventName, PropertyName, CallBackFunction) {


	}
};