const GenerateId = () => {

	const Result = Array.from (String (Math.random () * Date.now ()));
	const NewResult = Result.filter (Item => Item !== ".");

	return NewResult.join ("");
}

class ReaktivInstance {

	constructor (Data) {

		this.__ReaktivId__ = GenerateId ();
		this.__ReaktivData__ = Data;
		this.__CallBacks__ = {};

		this.ConfigureData ();
	}

	SetEvent (Property, CallBack) {

		if (!this.__CallBacks__[Property]) {

			this.__CallBacks__[Property] = [];
		} 

		this.__CallBacks__[Property].push (CallBack);
	}

	FireEvent (CallBack, NewValue) {

		if (!this.__CallBacks__[CallBack] || this.__CallBacks__[CallBack].length < 1) return;

		this.__CallBacks__[CallBack].forEach (CallBack => CallBack (this));
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
				ME.FireEvent (Attribute);
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
