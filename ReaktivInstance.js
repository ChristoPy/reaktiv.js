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

	SetEvent (EventName, Property, CallBack) {

		if (!this.__CallBacks__[Property]) {

			this.__CallBacks__[Property] = [];
		} 

		const ConfiguredEvent = {};
		ConfiguredEvent[EventName] = CallBack

		this.__CallBacks__[Property] = ConfiguredEvent;
	}

	FireEvent (Property, EventName) {

		const CallBacks = Object.values (this.__CallBacks__);


		if (!this.__CallBacks__[Property] || this.__CallBacks__[Property] === {}) return;


		const AffectedProperty = this.__CallBacks__[Property];
		AffectedProperty[EventName] ();
	}

	AddReaktivProperty (Attribute) {

		let Value = this.__ReaktivData__[Attribute];
		const ME = this;

		Object.defineProperty (this.__ReaktivData__, Attribute, {

			get () {

				return Value;
			},
			set (NewValue) {

				Value = NewValue;
				ME.FireEvent (Attribute, "Change");
			}
		});
	}

	ConfigureData () {

		for (let Key in this.__ReaktivData__) {

			if (this.__ReaktivData__.hasOwnProperty (Key)) {

				this.AddReaktivProperty (Key);
			}
		}
	}
}