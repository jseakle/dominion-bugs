# dominion-bugs
Tools for alerting users of the [Shuffle iT Dominion client](https://dominion.games) about incorrectly implemented card interactions

## Usage

For now, dominion-bugs is available as plain javascript that you can run in the developer console, or as a [bookmarklet](javascript:fetch("https://gist.githubusercontent.com/jseakle/583d977f789feb416bf5989004f1a6d2/raw").then(e=>e.json()).then(e=>{let t=document.getElementsByClassName("name-layer"),l=[],f=[];for(let n of t)n.children[0]&&l.push(n.children[0].innerHTML);for(let s of e.bugs){let o=0;for(let i of s)if("!"==i[0]){for(let r of e[i])if(l.includes(r)){o+=1;break}}else l.includes(i)&&(o+=1);o==s.length-1&&f.push(s.at(-1))}if(f.length){console.log(f);let h="";for(let a of f)h+=a+"\n";alert(h+"\nIf you disprove OR REPRODUCE any of these bugs, please let us know in #shuffleit-client!")}});) — right click that link, choose Copy Link Address, and then paste it into the URL field of a new bookmark on your bookmarks bar. Click it at the beginning of a Dominion game, and if any known bugs are possible, a message explaining them will be displayed.
