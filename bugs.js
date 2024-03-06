console.log('loaded')
export function detect_bugs() {
	fetch("https://tipr.tk/static/dombugs.json").then((response) => response.json()).then((bugs) => {
	    console.log('foo')
	    let nodes = document.getElementsByClassName('name-layer');
	    let names = [];
	    let alerts = [];
	    for(let e of nodes) { if(e.children[0]) {names.push(e.children[0].innerHTML)}}
	    let literals = []
	    for(let bug of bugs.bugs) {
		if(bug.at(-1) == 'Rare') { continue; }
	        let count = 0;
	        for(let card of bug) {
	            if(card[0] == "!") {
	                for(let elt of bugs[card]) {
	                    if(names.includes(elt) && !literals.includes(elt)) {
	                       count += 1;
	                       break
	                    }
	                }
	            }
	            else if(names.includes(card)) {count += 1; literals.push(card)}
	        }
	        if(count == bug.length - 1 && !alerts.includes(bug.at(-1))) { alerts.push(bug.at(-1)) }
	    }
	    if(alerts.length) {
	        console.log(alerts)
	        let msg = ""
	        for(let alt of alerts) {
	             msg += alt + "\n\n"
	        }
		alert(msg + "\nIf you disprove OR REPRODUCE any of these bugs, please let us know in #shuffleit-client!")
	    }
	})
}
