
export default class c2m_View {

	constructor(model ){
		this.model = model;

		this.render();
	}

	render(){
	}

	renderChooseWord() {
		console.log("1. Choose the Word document");
	}

	renderCheckHtml() {
		console.log("2. Check the HTML");
	}

	renderCheckModule() {
		console.log("3. Check the Canvas Module");
	}

	renderComplete() {
		console.log("4. Complete");
	}
}

