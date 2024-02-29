# dominion-bugs
Tools for alerting users of the [Shuffle iT Dominion client](https://dominion.games) about incorrectly implemented card interactions

## Usage

For now, dominion-bugs is available as [plain javascript](https://github.com/jseakle/dominion-bugs/blob/main/bugs.js) that you can run in the developer console, or as a [bookmarklet](https://github.com/jseakle/dominion-bugs/blob/main/bookmarklet) — open that link, copy the single long line of code, and then paste it into the URL field of a new bookmark on your bookmarks bar. Click it at the beginning of a Dominion game, and if any known bugs are possible, a message explaining them will be displayed.

Eventually it will be offered as a TamperMonkey script that runs automatically at the start of each game as well.

## Data

You can see (and comment on) the source data for the known bugs in [this Google sheet](https://docs.google.com/spreadsheets/d/1R-W1s4BW7p2j3kg9r3UC_O5TfQarj-WsFVhKBPyWTIQ/edit?usp=sharing). The initial dataset comes from the [Dominion League bugs list](https://dominionleague.org/resources#dominion-online-bugs), which has been relatively recently updated at the time of publication, plus CornGuilds 2E bugs as they are reported in discord. That data is turned into the JSON format understood by the script by [this Apps Script script](https://script.google.com/u/0/home/projects/1xEBjAQu_K-tpTYdn0P888SVd9TSbRcDjHZ_TG9vm0fSzZLpVPgMDEEYW/edit) and then manually pasted into the public gist read by the script.

## Contributing

I am happy to receive pull requests and comments regarding anything that you think would make this more useful. Particular areas of known future work include:

* TamperMonkey script + easy setup guide
* Getting the script to read the JSON directly from google sheets so I don't have to paste things into a gist
* Making the alerts name which cards triggered them (but what about when many combinations trigger the same alert?)
* Implementing the "other players' turns" bugs
* Implementing bugs with deprecated cards

and of course

* Finding more bugs, reporting reproductions of known bugs so I can update the "last seen" dates, and reporting fixed bugs that should be removed from the sheet!
