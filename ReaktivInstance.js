const GenerateId = () => {

	const Result = Array.from (String (Math.random () * Date.now ()));
	const NewResult = Result.filter (Item => Item !== ".");

	return NewResult.join ("");
}

module.exports = class ReaktivInstance {

	constructor (Data) {

		this.__ReaktivId__ = GenerateId ();
		this.__ReaktivData__ = Data;


		const This = this;

		for (let Property in this.__ReaktivData__) {

			this.AddReaktivProperty (Property, this.__ReaktivData__[Property]);
		}
	}

	AddReaktivProperty (PropertyName, Value) {

		if (!this.__ReaktivData__[PropertyName]) {

			this.__ReaktivData__[PropertyName] = Value;
		}

		this[PropertyName] = this.__ReaktivData__[PropertyName];


		Object.defineProperty (this, PropertyName, {

			get: () => {

				console.log ("get", PropertyName);
				return this.__ReaktivData__[PropertyName];
			},

			set: (NewValue) => {

				console.log ("set", PropertyName, NewValue);
				return this.__ReaktivData__[PropertyName] = NewValue;
			}
		});
	}
}