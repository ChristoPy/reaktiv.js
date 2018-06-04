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

		let Value = this.__Data__[Attribute]
		const ME = this;

		Object.defineProperty (this.__Data__, Attribute, {

			get () {

				return Value
			},
			set (NewValue) {

				Value = NewValue
				ME.NotifyChange (Attribute)
			}
		});
	}

	ConfigureData () {

		for (let Key in this.__Data__) {

			if (this.__Data__.hasOwnProperty (Key)) {

				this.AddReaktivProperty (Key);
			}
		}
	}
}