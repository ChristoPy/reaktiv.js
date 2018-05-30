const ReaktivInstance = require ("./ReaktivInstance.js");


class Reaktiv {

	static Make (SomeObject) {

		return new ReaktivInstance (SomeObject);
	}
}
