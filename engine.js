/* ChickMath engine - honest backyard chicken math. Pure functions, no DOM. */
var ChickEngine = (function () {
  var COOP_SQFT = 4;      /* per bird, inside */
  var RUN_SQFT = 10;      /* per bird, outside */
  var ROOST_IN = 10;      /* roost bar inches per bird */
  var BAR_LEN_IN = 48;    /* a standard 4 ft roost bar */
  var FEED_LB_DAY = 0.25; /* per laying bird */
  var BAG_LB = 50;
  var PEAK_EGGS_WK = 5.5; /* year-one hen */
  var DECLINE = 0.15;     /* production lost per year after the first */

  function r1(x) { return Math.round(x * 10) / 10; }
  function r2(x) { return Math.round(x * 100) / 100; }

  function coopSqft(birds) { return birds * COOP_SQFT; }
  function runSqft(birds) { return birds * RUN_SQFT; }
  function roostInches(birds) { return birds * ROOST_IN; }
  function roostBars(birds) { return Math.ceil(roostInches(birds) / BAR_LEN_IN); }
  function nestingBoxes(birds) { return Math.ceil(birds / 4); }

  function feedLbPerDay(birds) { return r1(birds * FEED_LB_DAY); }
  function feedLbPerWeek(birds) { return r1(birds * FEED_LB_DAY * 7); }
  function bagDays(birds) { return Math.floor(BAG_LB / (birds * FEED_LB_DAY)); }

  /* laying declines ~15% per year after the first; year 1 is the peak */
  function eggsPerWeek(hens, ageYears) {
    var factor = Math.pow(1 - DECLINE, Math.max(0, ageYears - 1));
    return r1(hens * PEAK_EGGS_WK * factor);
  }
  function eggsPerYear(hens, ageYears) {
    return Math.round(eggsPerWeek(hens, ageYears) * 52);
  }
  function dozenPerWeek(hens, ageYears) {
    return r2(eggsPerWeek(hens, ageYears) / 12);
  }

  /* honest cost per dozen from feed alone */
  function costPerDozen(birds, ageYears, feedPricePerLb) {
    var weeklyCost = birds * FEED_LB_DAY * 7 * feedPricePerLb;
    var dozens = eggsPerWeek(birds, ageYears) / 12;
    if (dozens <= 0) return null;
    return r2(weeklyCost / dozens);
  }

  function maxBirds(sqft) { return Math.floor(sqft / COOP_SQFT); }
  function spaceVerdict(birds, coopSqftAvail) {
    var need = birds * COOP_SQFT;
    if (coopSqftAvail >= need) return 'room to spare - ' + coopSqftAvail + ' sq ft against a ' + need + ' sq ft need';
    if (coopSqftAvail >= birds * 3) return 'tight - ' + coopSqftAvail + ' sq ft for birds that want ' + need + '; watch for pecking and keep them busy';
    return 'crowded - ' + coopSqftAvail + ' sq ft against a ' + need + ' sq ft need; crowding is how pecking, mites and respiratory trouble start';
  }

  /* brooder warmth: start 95F, drop 5F a week until feathered (~6 weeks) */
  function brooderTempF(ageWeeks) {
    var t = 95 - 5 * Math.floor(ageWeeks);
    return Math.max(t, 65);
  }

  return {
    COOP_SQFT: COOP_SQFT, RUN_SQFT: RUN_SQFT, FEED_LB_DAY: FEED_LB_DAY, PEAK_EGGS_WK: PEAK_EGGS_WK,
    coopSqft: coopSqft, runSqft: runSqft, roostInches: roostInches, roostBars: roostBars,
    nestingBoxes: nestingBoxes, feedLbPerDay: feedLbPerDay, feedLbPerWeek: feedLbPerWeek,
    bagDays: bagDays, eggsPerWeek: eggsPerWeek, eggsPerYear: eggsPerYear,
    dozenPerWeek: dozenPerWeek, costPerDozen: costPerDozen,
    maxBirds: maxBirds, spaceVerdict: spaceVerdict, brooderTempF: brooderTempF
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = ChickEngine;
