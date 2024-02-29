fetch("https://gist.githubusercontent.com/jseakle/583d977f789feb416bf5989004f1a6d2/raw").then((response) => response.json()).then((bugs) => {
    let nodes = document.getElementsByClassName('name-layer');
    let names = [];
    let alerts = [];
    for(let e of nodes) { if(e.children[0]) {names.push(e.children[0].innerHTML)}}
    for(let bug of bugs.bugs) {
        let count = 0;
        for(let card of bug) {
            if(card[0] == "!") {
                for(let elt of bugs[card]) {
                    if(names.includes(elt)) {
                       count += 1;
                       break
                    }
                }
            }
            else if(names.includes(card)) {count += 1}
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
