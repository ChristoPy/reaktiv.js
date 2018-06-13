const ReaktivInstance = require ("./ReaktivInstance.js");


module.exports = class Reaktiv {

	constructor (SomeObject) {

		this.__ReaktivInstance__ = new ReaktivInstance (SomeObject);


		return new Proxy (this, {

			set: function (Target, Name, Value) {

				Target.__ReaktivInstance__.__ReaktivData__[Name] = Value;
			}
		});
	}

	On (EventName, PropertyName, CallBackFunction) {

		this.__ReaktivInstance__.SetEvent (EventName, PropertyName, CallBackFunction);
	}
};