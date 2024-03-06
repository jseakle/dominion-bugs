// ==UserScript==
// @name         Dominion Bugs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Describes known bugs that might occur in your Dominion games
// @author       Personman
// @match        *://dominion.games/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Change this to the class name you want to monitor
    const targetClassName = 'text-counter'
    var time = performance.now()
    var first = true
    console.log('start')

    // Create a new MutationObserver instance
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {


            // Check if any new nodes were added
            if (mutation.addedNodes.length > 0) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];

                    // Check if the added node or any of its children have the target class
                    if (nodeOrChildHasClass(node, targetClassName)) {
                        var newtime = performance.now()
                        if(!first && newtime - time < 8000) {
                            console.log(newtime-time)
                            return
                        }
                        first = false
                        time = newtime
                        console.log('set: ' + time)

                        fetch("https://tipr.tk/static/dombugs.json").then((response) => response.json()).then((bugs) => {
                            let nodes = document.getElementsByClassName('name-layer');
                            let names = [];
                            let alerts = [];
                            for(let e of nodes) { if(e.children[0]) {names.push(e.children[0].innerHTML)}}
                            let literals = []
                            for(let bug of bugs.bugs) {
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
                        }).catch(error => { alert("dominion-bugs can no longer contact the bug list server. try again in a bit, or if it persists, let Personman know on discord.") })
                    }
                }
            }

        });
    });

    // Helper function to check if a node or any of its children have a particular class
    function nodeOrChildHasClass(node, className) {
        if (node.nodeType == 1) {
            if (node.classList.contains(className)) {
                return true;
            }

            // Check children recursively
            for (let i = 0; i < node.children.length; i++) {
                if (nodeOrChildHasClass(node.children[i], className)) {
                    return true;
                }
            }
        }

        return false;
    }

    // Start observing the entire document
    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();
