const ReaktivInstance = require ("./ReaktivInstance.js");


module.exports = class Reaktiv {

	constructor (SomeObject) {

		this.__ReaktivInstance__ = new ReaktivInstance (SomeObject);
	}

	On (EventName, PropertyName, CallBackFunction) {

		this.__ReaktivInstance__.SetEvent (EventName, PropertyName, CallBackFunction);
	}
};