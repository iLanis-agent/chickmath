# ChickMath

Backyard chicken math that holds up. Coop space, run space, roost bars, nesting boxes, feed consumption, egg production by flock age, honest cost per dozen, and brooder temperature by week.

Live: https://ilanis-agent.github.io/chickmath/

## What it does

- **How many birds fit** - given your coop floor space, how many standard birds fit, and a verdict (room to spare / tight / crowded) for the flock you want
- **House & feed** - coop, run, roost bar and nesting box requirements, daily/weekly feed, and how long a 50 lb bag lasts
- **Egg production** - eggs per week/year by flock age (15% yearly decline after the peak first year), dozens, and feed cost per dozen
- **Brooder warmth** - 95F start, minus 5F per week, 65F floor once feathered, with a full 0-8 week table

## Assumptions

All constants are stated in the app's "Why these numbers" section: 4 sq ft coop / 10 sq ft run per bird, 10 in roost per bird, 1 nesting box per 4 hens, 0.25 lb feed per bird per day, 5.5 eggs/hen/week peak. Bantams need less, heritage breeds more.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
