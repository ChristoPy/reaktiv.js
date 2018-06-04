const GenerateId = () => {

	const Result = Array.from (String (Math.random () * Date.now ()));
	const NewResult = Result.filter (Item => Item !== ".");

	return NewResult.join ("");
}

module.exports = class ReaktivInstance {

	constructor (Data) {

		this.__ReaktivId__ = GenerateId ();
		this.__ReaktivData__ = Data;
		this.__CallBacks__ = {};

		this.ConfigureData ();
	}

	AddReaktivProperty (Attribute) {

		let Value = this.Data[Attribute]
		const ME = this;

		Object.defineProperty (this.Data, Attribute, {

			get () {

				return Value // Simply return the cached value
			},
			set (NewValue) {

				Value = NewValue // Save the NewValue
				ME.NotifyChange (Attribute) // Ignore for now
			}
		});
	}

	// Iterate through our object keys
	ConfigureData () {

		for (let Key in this.__Data__) {

			if (this.__Data__.hasOwnProperty (Key)) {

				this.AddReaktivProperty (Key);
			}
		}
	}
}