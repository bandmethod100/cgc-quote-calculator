const STORAGE_KEYS = {
  parts: "sandblast-parts-pricing.parts",
  quote: "sandblast-parts-pricing.quote",
  addOns: "sandblast-parts-pricing.addOns",
  quoteMeta: "sandblast-parts-pricing.quoteMeta",
  collapsedModels: "sandblast-parts-pricing.collapsedModels",
  fixedRepairs: "sandblast-parts-pricing.fixedRepairs",
  yearlyIncreaseLog: "sandblast-parts-pricing.yearlyIncreaseLog",
  authSession: "cgc-quote-calculator.authSession"
};

const FIREBASE_API_KEY = "AIzaSyAbhBkbHsFX9ZUphNymfqd9wl8qVSviPHY";
const FIREBASE_DATABASE_URL = "https://cgc-quote-calculator-default-rtdb.asia-southeast1.firebasedatabase.app";

const sampleParts = [
  { id: "default-777-front-stub-axle", model: "777", description: "Front Stub Axle", baseCost: 240, sellPercent: 25 },
  { id: "default-777-front-w-hub", model: "777", description: "Front W/Hub", baseCost: 300, sellPercent: 20 },
  { id: "default-777-rear-spindle", model: "777", description: "Rear Spindle", baseCost: 280, sellPercent: 25 },
  { id: "default-777-rear-w-hub", model: "777", description: "Rear W/Hub", baseCost: 400, sellPercent: 15 },
  { id: "default-785c-front-stub-axle", model: "785C", description: "Front Stub Axle", baseCost: 240, sellPercent: 25 },
  { id: "default-785c-front-w-hub", model: "785C", description: "Front W/Hub", baseCost: 300, sellPercent: 20 },
  { id: "default-785c-rear-spindle", model: "785C", description: "Rear Spindle", baseCost: 280, sellPercent: 25 },
  { id: "default-785c-rear-w-hub", model: "785C", description: "Rear W/Hub", baseCost: 450, sellPercent: 15 },
  { id: "default-789c-front-stub-axle", model: "789C", description: "Front Stub Axle", baseCost: 240, sellPercent: 25 },
  { id: "default-789c-front-w-hub", model: "789C", description: "Front W/Hub", baseCost: 300, sellPercent: 20 },
  { id: "default-789c-rear-spindle", model: "789C", description: "Rear Spindle", baseCost: 280, sellPercent: 25 },
  { id: "default-789c-rear-w-hub", model: "789C", description: "Rear W/Hub", baseCost: 450, sellPercent: 15 },
  { id: "default-793c-front-stub-axle", model: "793C", description: "Front Stub Axle", baseCost: 240, sellPercent: 25 },
  { id: "default-793c-front-w-hub", model: "793C", description: "Front W/Hub", baseCost: 300, sellPercent: 20 },
  { id: "default-793c-rear-spindle", model: "793C", description: "Rear Spindle", baseCost: 280, sellPercent: 25 },
  { id: "default-793c-rear-w-hub", model: "793C", description: "Rear W/Hub", baseCost: 450, sellPercent: 15 },
  { id: "default-793f-front-stub-axle", model: "793F", description: "Front Stub Axle", baseCost: 240, sellPercent: 25 },
  { id: "default-793f-front-w-hub", model: "793F", description: "Front W/Hub", baseCost: 300, sellPercent: 20 },
  { id: "default-793f-rear-spindle", model: "793F", description: "Rear Spindle", baseCost: 280, sellPercent: 25 },
  { id: "default-793f-rear-w-hub", model: "793F", description: "Rear W/Hub", baseCost: 450, sellPercent: 15 },
  { id: "default-830e-rear-wheel-hub", model: "830E", description: "Rear Wheel Hub", baseCost: 280, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-830e-outer-lower-seal-ring", model: "830E", description: "Outer/Lower Seal Ring", baseCost: 136.5, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-830e-finger-ring", model: "830E", description: "Finger Ring", baseCost: 136.5, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-830e-torque-tube", model: "830E", description: "Torque Tube", baseCost: 245, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-830e-main-frame", model: "830E", description: "Main Frame", baseCost: null, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-830e-front-stub-axle", model: "830E", description: "Front Stub Axle", baseCost: 217, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-830e-front-wheel-hub", model: "830E", description: "Front Wheel Hub", baseCost: 245, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-930e-front-stub-axle", model: "930E", description: "Front Stub Axle", baseCost: 217, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-930e-front-wheel-hub", model: "930E", description: "Front Wheel Hub", baseCost: 245, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-930e-rear-spindle", model: "930E", description: "Rear Spindle", baseCost: 315, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 },
  { id: "default-930e-rear-wheel-hub", model: "930E", description: "Rear Wheel Hub", baseCost: 280, sellPercent: 30, crackTestBaseCost: 155, crackTestSellPercent: 45 }
];

const baseCostMigrations = [
  { model: "789C", description: "Rear W/Hub", from: 410, to: 450 }
];

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD"
});

const sellPercentOptions = [0, 5, 8, 10, 15, 20, 25, 30, 35];
const defaultCrackTestBaseCost = 155;
const defaultCrackTestSellPercent = 15;
const defaultAddOnPrices = { measure: 165, cleanPack: 247.5, weldRepairs: 0, weldRepairsHours: "", reCracktest: 178.5, delivery: 150, additional: 0, consumablesPercent: 5 };
const weldRepairsHourlyRate = 165;
const threadRepairPricingScales = {
  "m10-m16": {
    points: [
      { quantity: 1, total: 625 },
      { quantity: 5, total: 1625 },
      { quantity: 10, total: 2000 },
      { quantity: 15, total: 2333.33 },
      { quantity: 20, total: 2625 },
      { quantity: 25, total: 2854.17 },
      { quantity: 30, total: 3041.67 },
      { quantity: 35, total: 3187.5 },
      { quantity: 40, total: 3312.5 },
      { quantity: 45, total: 3416.67 },
      { quantity: 50, total: 3500 },
      { quantity: 55, total: 3575 },
      { quantity: 60, total: 3637.5 },
      { quantity: 65, total: 3687.5 },
      { quantity: 70, total: 3716.67 },
      { quantity: 71, total: 3727.5 }
    ],
    finalUnitRate: 52.5,
    fallbackUnitRate: 625
  },
  "m18-m24": {
    points: [
  { quantity: 1, total: 750 },
  { quantity: 5, total: 1950 },
  { quantity: 10, total: 2400 },
  { quantity: 15, total: 2800 },
  { quantity: 20, total: 3150 },
  { quantity: 25, total: 3425 },
  { quantity: 30, total: 3650 },
  { quantity: 35, total: 3825 },
  { quantity: 40, total: 3975 },
  { quantity: 45, total: 4100 },
  { quantity: 50, total: 4200 },
  { quantity: 55, total: 4290 },
  { quantity: 60, total: 4365 },
  { quantity: 65, total: 4425 },
      { quantity: 70, total: 4460 },
      { quantity: 71, total: 4473 }
    ],
    finalUnitRate: 63,
    fallbackUnitRate: 750
  }
};

const defaultFixedRepairItems = [
  { id: "thread-repairs-m18-m24-repair-threads", model: "M18-M24", item: "Thread Repairs", repairArea: "Repair Threads", method: "Repair Threads", sellPrice: 750, areaKind: "other" },
  { id: "fmg-777-rear-spindle-inner-bearing-area", model: "777", item: "Rear Spindle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1510 },
  { id: "fmg-777-rear-spindle-outer-bearing-area", model: "777", item: "Rear Spindle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1510 },
  { id: "fmg-778-rear-spindle-seal-area", model: "778", item: "Rear Spindle", repairArea: "Seal Area", method: "Laser Cladding", sellPrice: 1100 },
  { id: "fmg-785-rear-spindle-inner-bearing-area", model: "785", item: "Rear Spindle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1650 },
  { id: "fmg-785-rear-spindle-outer-bearing-area", model: "785", item: "Rear Spindle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1650 },
  { id: "fmg-789-rear-spindle-inner-bearing-area", model: "789", item: "Rear Spindle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1680 },
  { id: "fmg-789-rear-spindle-outer-bearing-area", model: "789", item: "Rear Spindle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1680 },
  { id: "fmg-793c-rear-spindle-inner-bearing-area", model: "793C", item: "Rear Spindle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 2150 },
  { id: "fmg-793c-rear-spindle-outer-bearing-area", model: "793C", item: "Rear Spindle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 2150 },
  { id: "fmg-793f-rear-spindle-inner-bearing-area", model: "793F", item: "Rear Spindle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 2150 },
  { id: "fmg-793f-rear-spindle-outer-bearing-area", model: "793F", item: "Rear Spindle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 2150 },
  { id: "fmg-777-rear-wheel-hub-inner-bearing-area", model: "777", item: "Rear Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 1700 },
  { id: "fmg-777-rear-wheel-hub-outer-bearing-area", model: "777", item: "Rear Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1700 },
  { id: "fmg-785-rear-wheel-hub-inner-bearing-area", model: "785", item: "Rear Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 1860 },
  { id: "fmg-785-rear-wheel-hub-outer-bearing-area", model: "785", item: "Rear Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1860 },
  { id: "fmg-789-rear-wheel-hub-inner-bearing-area", model: "789", item: "Rear Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 2250 },
  { id: "fmg-789-rear-wheel-hub-outer-bearing-area", model: "789", item: "Rear Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 2250 },
  { id: "fmg-793c-rear-wheel-hub-inner-bearing-area", model: "793C", item: "Rear Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 2710 },
  { id: "fmg-793c-rear-wheel-hub-outer-bearing-area", model: "793C", item: "Rear Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 2710 },
  { id: "fmg-793f-rear-wheel-hub-inner-bearing-area", model: "793F", item: "Rear Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 3440 },
  { id: "fmg-793f-rear-wheel-hub-outer-bearing-area", model: "793F", item: "Rear Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 3440 },
  { id: "fmg-793c-brake-piston-inner-seal-area", model: "793C", item: "Brake Piston", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1200 },
  { id: "fmg-793c-brake-piston-outer-seal-area", model: "793C", item: "Brake Piston", repairArea: "Outer Seal Area", method: "Metal Spray", sellPrice: 1200 },
  { id: "fmg-793f-brake-piston-inner-seal-area", model: "793F", item: "Brake Piston", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1200 },
  { id: "fmg-793f-brake-piston-outer-seal-area", model: "793F", item: "Brake Piston", repairArea: "Outer Seal Area", method: "Metal Spray", sellPrice: 1200 },
  { id: "westrac-994-wheel-hub-inner-cup-bore", model: "994", item: "Rear Wheel Hub", repairArea: "Inner Cup Bore", method: "Metal Spray", sellPrice: 2905 },
  { id: "westrac-994-wheel-hub-outer-cup-bore", model: "994", item: "Rear Wheel Hub", repairArea: "Outer Cup Bore", method: "Metal Spray", sellPrice: 2905 },
  { id: "westrac-994-wheel-hub-both-cup-bores", model: "994", item: "Rear Wheel Hub", repairArea: "Both Cup Bores", method: "Metal Spray", sellPrice: 4950 },
  { id: "komatsu-830e-rear-wheel-hub-rim-skim-od-taper", model: "830E", item: "Rear Wheel Hub", repairArea: "Rim Skim OD & Taper", method: "Machining", sellPrice: 3080 },
  { id: "komatsu-830e-rear-wheel-hub-laser-clad-od-taper", model: "830E", item: "Rear Wheel Hub", repairArea: "Laser Clad OD & Taper", method: "Laser Cladding", sellPrice: 9450 },
  { id: "komatsu-830e-rear-wheel-hub-laser-clad-outboard-bearing-bore", model: "830E", item: "Rear Wheel Hub", repairArea: "Laser Clad Outboard Bearing Bore", method: "Laser Cladding", sellPrice: 5730 },
  { id: "komatsu-830e-rear-wheel-hub-laser-clad-inboard-bearing-bore-seal-location-area", model: "830E", item: "Rear Wheel Hub", repairArea: "Laser Clad Inboard Bearing Bore and Seal Location Area", method: "Laser Cladding", sellPrice: 6250 },
  { id: "komatsu-830e-rear-wheel-hub-internal-weld-failure-repair-type-1", model: "830E", item: "Rear Wheel Hub", repairArea: "Internal Weld Failure Repair - partial weld removal", method: "Laser Cladding Package", sellPrice: 41050 },
  { id: "komatsu-830e-rear-wheel-hub-internal-weld-failure-repair-type-2", model: "830E", item: "Rear Wheel Hub", repairArea: "Internal Weld Failure Repair - full weld removal", method: "Laser Cladding Package", sellPrice: 59175 },
  { id: "komatsu-830e-outer-lower-seal-ring-felt-seal-location", model: "830E", item: "Outer/Lower Seal Ring", repairArea: "Felt Seal Location", method: "Metal Spray", sellPrice: 2750 },
  { id: "komatsu-830e-finger-ring-interference-fit-location", model: "830E", item: "Finger Ring", repairArea: "Interference Fit Location", method: "Metal Spray", sellPrice: 2750 },
  { id: "komatsu-830e-torque-tube-interference-fit-location", model: "830E", item: "Torque Tube", repairArea: "Interference Fit Location", method: "Metal Spray", sellPrice: 2750 },
  { id: "komatsu-830e-torque-tube-paddle-pump-location", model: "830E", item: "Torque Tube", repairArea: "Paddle Pump Location", method: "Metal Spray", sellPrice: 4175 },
  { id: "komatsu-830e-main-frame-inboard-bearing-journal", model: "830E", item: "Main Frame", repairArea: "Inboard Bearing Journal", method: "Laser Cladding", sellPrice: 6015 },
  { id: "komatsu-830e-main-frame-inboard-paddle-pump-location", model: "830E", item: "Main Frame", repairArea: "Inboard Paddle Pump Location", method: "Laser Cladding", sellPrice: 6920 },
  { id: "komatsu-830e-main-frame-outboard-bearing-journal", model: "830E", item: "Main Frame", repairArea: "Outboard Bearing Journal", method: "Laser Cladding", sellPrice: 6015 },
  { id: "komatsu-830e-main-frame-repair-inner-stator-fit-location", model: "830E", item: "Main Frame", repairArea: "Repair Inner Stator Fit Location", method: "Laser Cladding", sellPrice: 6750 },
  { id: "komatsu-830e-main-frame-planetary-bore-outer-each", model: "830E", item: "Main Frame", repairArea: "Planetary Bore Outer (Each)", method: "Machining", sellPrice: 5315 },
  { id: "komatsu-830e-main-frame-planetary-bore-inner-each", model: "830E", item: "Main Frame", repairArea: "Planetary Bore Inner (Each)", method: "Machining", sellPrice: 4780 },
  { id: "komatsu-830e-front-stub-axle-outer-bearing-area", model: "830E", item: "Front Stub Axle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 2050 },
  { id: "komatsu-830e-front-stub-axle-inner-bearing-area", model: "830E", item: "Front Stub Axle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 2250 },
  { id: "komatsu-830e-front-wheel-hub-inner-bearing-bore", model: "830E", item: "Front Wheel Hub", repairArea: "Inner Bearing Bore", method: "Laser Cladding", sellPrice: 2950 },
  { id: "komatsu-830e-front-wheel-hub-outer-bearing-bore", model: "830E", item: "Front Wheel Hub", repairArea: "Outer Bearing Bore", method: "Laser Cladding", sellPrice: 2750 },
  { id: "komatsu-830e-front-wheel-hub-duo-cone-location", model: "830E", item: "Front Wheel Hub", repairArea: "Duo Cone Location", method: "Laser Cladding", sellPrice: 2150 },
  { id: "komatsu-930e-front-stub-axle-outer-bearing-area", model: "930E", item: "Front Stub Axle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 2150 },
  { id: "komatsu-930e-front-stub-axle-inner-bearing-area", model: "930E", item: "Front Stub Axle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 2365 },
  { id: "komatsu-930e-front-wheel-hub-inner-bearing-bore", model: "930E", item: "Front Wheel Hub", repairArea: "Inner Bearing Bore", method: "Laser Cladding", sellPrice: 3100 },
  { id: "komatsu-930e-front-wheel-hub-outer-bearing-bore", model: "930E", item: "Front Wheel Hub", repairArea: "Outer Bearing Bore", method: "Laser Cladding", sellPrice: 2890 },
  { id: "komatsu-930e-rear-spindle-outer-bearing-journal", model: "930E", item: "Rear Spindle", repairArea: "Outer Bearing Journal", method: "Laser Cladding", sellPrice: 4305 },
  { id: "komatsu-930e-rear-spindle-rear-spindle-journal", model: "930E", item: "Rear Spindle", repairArea: "Inner Bearing Journal", method: "Laser Cladding", sellPrice: 4305 },
  { id: "komatsu-930e-rear-spindle-match-machine-coupling-to-main-spindle", model: "930E", item: "Rear Spindle", repairArea: "Match Machine Coupling to Main Spindle", method: "Machining", sellPrice: 4250 },
  { id: "komatsu-930e-rear-wheel-hub-outer-bearing-bore", model: "930E", item: "Rear Wheel Hub", repairArea: "Outer Bearing Bore", method: "Laser Cladding", sellPrice: 4915 },
  { id: "komatsu-930e-rear-wheel-hub-inner-bearing-bore", model: "930E", item: "Rear Wheel Hub", repairArea: "Inner Bearing Bore", method: "Laser Cladding", sellPrice: 4915 },
  { id: "fmg-777-front-stub-axle-inner-bearing-area", model: "777", item: "Front Stub Axle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1190 },
  { id: "fmg-777-front-stub-axle-outer-bearing-area", model: "777", item: "Front Stub Axle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1190 },
  { id: "fmg-785-front-stub-axle-inner-bearing-area", model: "785", item: "Front Stub Axle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1330 },
  { id: "fmg-785-front-stub-axle-outer-bearing-area", model: "785", item: "Front Stub Axle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1330 },
  { id: "fmg-789-front-stub-axle-inner-bearing-area", model: "789", item: "Front Stub Axle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1380 },
  { id: "fmg-789-front-stub-axle-outer-bearing-area", model: "789", item: "Front Stub Axle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1380 },
  { id: "fmg-793c-front-stub-axle-inner-bearing-area", model: "793C", item: "Front Stub Axle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1420 },
  { id: "fmg-793c-front-stub-axle-outer-bearing-area", model: "793C", item: "Front Stub Axle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1420 },
  { id: "fmg-793f-front-stub-axle-inner-bearing-area", model: "793F", item: "Front Stub Axle", repairArea: "Inner Bearing Area", method: "Laser Cladding", sellPrice: 1420 },
  { id: "fmg-793f-front-stub-axle-outer-bearing-area", model: "793F", item: "Front Stub Axle", repairArea: "Outer Bearing Area", method: "Laser Cladding", sellPrice: 1420 },
  { id: "fmg-777-front-wheel-hub-inner-bearing-area", model: "777", item: "Front Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 1510 },
  { id: "fmg-777-front-wheel-hub-outer-bearing-area", model: "777", item: "Front Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1510 },
  { id: "fmg-785-front-wheel-hub-inner-bearing-area", model: "785", item: "Front Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 1620 },
  { id: "fmg-785-front-wheel-hub-outer-bearing-area", model: "785", item: "Front Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1620 },
  { id: "fmg-789-front-wheel-hub-inner-bearing-area", model: "789", item: "Front Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 1710 },
  { id: "fmg-789-front-wheel-hub-outer-bearing-area", model: "789", item: "Front Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1710 },
  { id: "fmg-793c-front-wheel-hub-inner-bearing-area", model: "793C", item: "Front Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 1800 },
  { id: "fmg-793c-front-wheel-hub-outer-bearing-area", model: "793C", item: "Front Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1800 },
  { id: "fmg-793f-front-wheel-hub-inner-bearing-area", model: "793F", item: "Front Wheel Hub", repairArea: "Inner Bearing Area", method: "Metal Spray", sellPrice: 1800 },
  { id: "fmg-793f-front-wheel-hub-outer-bearing-area", model: "793F", item: "Front Wheel Hub", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1800 },
  { id: "fmg-777-front-brake-anchor-inner-seal-area", model: "777", item: "Front Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1610 },
  { id: "fmg-777-front-brake-anchor-outer-bearing-area", model: "777", item: "Front Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1610 },
  { id: "fmg-785-front-brake-anchor-inner-seal-area", model: "785", item: "Front Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1650 },
  { id: "fmg-785-front-brake-anchor-outer-bearing-area", model: "785", item: "Front Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1650 },
  { id: "fmg-789-front-brake-anchor-inner-seal-area", model: "789", item: "Front Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1740 },
  { id: "fmg-789-front-brake-anchor-outer-bearing-area", model: "789", item: "Front Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1740 },
  { id: "fmg-793c-front-brake-anchor-inner-seal-area", model: "793C", item: "Front Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1840 },
  { id: "fmg-793c-front-brake-anchor-outer-bearing-area", model: "793C", item: "Front Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1840 },
  { id: "fmg-793f-front-brake-anchor-inner-seal-area", model: "793F", item: "Front Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 2070 },
  { id: "fmg-793f-front-brake-anchor-outer-bearing-area", model: "793F", item: "Front Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 2070 },
  { id: "fmg-777-rear-brake-anchor-inner-seal-area", model: "777", item: "Rear Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1610 },
  { id: "fmg-777-rear-brake-anchor-outer-bearing-area", model: "777", item: "Rear Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1610 },
  { id: "fmg-785-rear-brake-anchor-inner-seal-area", model: "785", item: "Rear Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1650 },
  { id: "fmg-785-rear-brake-anchor-outer-bearing-area", model: "785", item: "Rear Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1650 },
  { id: "fmg-789-rear-brake-anchor-inner-seal-area", model: "789", item: "Rear Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1740 },
  { id: "fmg-789-rear-brake-anchor-outer-bearing-area", model: "789", item: "Rear Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1740 },
  { id: "fmg-793c-rear-brake-anchor-inner-seal-area", model: "793C", item: "Rear Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 1840 },
  { id: "fmg-793c-rear-brake-anchor-outer-bearing-area", model: "793C", item: "Rear Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 1840 },
  { id: "fmg-793f-rear-brake-anchor-inner-seal-area", model: "793F", item: "Rear Brake Anchor", repairArea: "Inner Seal Area", method: "Metal Spray", sellPrice: 2070 },
  { id: "fmg-793f-rear-brake-anchor-outer-bearing-area", model: "793F", item: "Rear Brake Anchor", repairArea: "Outer Bearing Area", method: "Metal Spray", sellPrice: 2070 }
];

let fixedRepairItems = mergeDefaultFixedRepairItems(load(STORAGE_KEYS.fixedRepairs, defaultFixedRepairItems));
let parts = mergeDefaultParts(normalizeParts(load(STORAGE_KEYS.parts, sampleParts)));
let quoteItems = [];
const storedAddOnPrices = load(STORAGE_KEYS.addOns, defaultAddOnPrices);
let addOnPrices = {
  ...defaultAddOnPrices,
  ...storedAddOnPrices,
  additional: 0,
  weldRepairs: 0,
  weldRepairsHours: ""
};
if (addOnPrices.reCracktest === 136.5) {
  addOnPrices.reCracktest = defaultAddOnPrices.reCracktest;
}
let quoteMeta = { customerName: "", initialQuoteNumber: "", customerWorkOrder: "" };
let collapsedModels = load(STORAGE_KEYS.collapsedModels, { parts: {}, fixed: {} });
let yearlyIncreaseLog = load(STORAGE_KEYS.yearlyIncreaseLog, []);
let selectedPriceFileIds = new Set();
let editingFixedPriceId = "";
let editingFixedRepairIds = [];
let sharedPricingAvailable = false;
let sharedPricingSource = "";
let sharedPricingSaveTimer = 0;

const els = {
  partsTable: document.querySelector("#partsTable"),
  quoteList: document.querySelector("#quoteList"),
  quoteCount: document.querySelector("#quoteCount"),
  quoteTotal: document.querySelector("#quoteTotal"),
  quoteBaseTotal: document.querySelector("#quoteBaseTotal"),
  quoteSellTotal: document.querySelector("#quoteSellTotal"),
  customerName: document.querySelector("#customerName"),
  initialQuoteNumber: document.querySelector("#initialQuoteNumber"),
  customerWorkOrder: document.querySelector("#customerWorkOrder"),
  measurePrice: document.querySelector("#measurePrice"),
  additionalDescription: document.querySelector("#additionalDescription"),
  additionalPrice: document.querySelector("#additionalPrice"),
  addAdditionalItem: document.querySelector("#addAdditionalItem"),
  cleanPackPrice: document.querySelector("#cleanPackPrice"),
  addMeasure: document.querySelector("#addMeasure"),
  weldRepairsPrice: document.querySelector("#weldRepairsPrice"),
  weldRepairsHours: document.querySelector("#weldRepairsHours"),
  addWeldRepairs: document.querySelector("#addWeldRepairs"),
  reCracktestPrice: document.querySelector("#reCracktestPrice"),
  addReCracktest: document.querySelector("#addReCracktest"),
  addCleanPack: document.querySelector("#addCleanPack"),
  deliveryPrice: document.querySelector("#deliveryPrice"),
  addDelivery: document.querySelector("#addDelivery"),
  consumablesPercent: document.querySelector("#consumablesPercent"),
  addConsumables: document.querySelector("#addConsumables"),
  partSearch: document.querySelector("#partSearch"),
  fixedSearch: document.querySelector("#fixedSearch"),
  partsToggleAll: document.querySelector("#partsToggleAll"),
  fixedToggleAll: document.querySelector("#fixedToggleAll"),
  fixedTable: document.querySelector("#fixedTable"),
  openFixedRepairForm: document.querySelector("#openFixedRepairForm"),
  openFixedRepairEditForm: document.querySelector("#openFixedRepairEditForm"),
  fixedRepairDialog: document.querySelector("#fixedRepairDialog"),
  fixedRepairForm: document.querySelector("#fixedRepairForm"),
  fixedRepairDialogTitle: document.querySelector("#fixedRepairDialogTitle"),
  saveFixedRepair: document.querySelector("#saveFixedRepair"),
  fixedRepairSelectSection: document.querySelector("#fixedRepairSelectSection"),
  fixedRepairSelect: document.querySelector("#fixedRepairSelect"),
  closeFixedRepairForm: document.querySelector("#closeFixedRepairForm"),
  cancelFixedRepairForm: document.querySelector("#cancelFixedRepairForm"),
  fixedModelInput: document.querySelector("#fixedModelInput"),
  fixedItemInput: document.querySelector("#fixedItemInput"),
  fixedAreaInput: document.querySelector("#fixedAreaInput"),
  fixedOtherAreaInput: document.querySelector("#fixedOtherAreaInput"),
  fixedMethodInput: document.querySelector("#fixedMethodInput"),
  fixedInnerSellPriceInput: document.querySelector("#fixedInnerSellPriceInput"),
  fixedOuterSellPriceInput: document.querySelector("#fixedOuterSellPriceInput"),
  fixedSealSellPriceInput: document.querySelector("#fixedSealSellPriceInput"),
  fixedOtherSellPriceInput: document.querySelector("#fixedOtherSellPriceInput"),
  fixedOtherAreaList: document.querySelector("#fixedOtherAreaList"),
  addFixedOtherArea: document.querySelector("#addFixedOtherArea"),
  openPartForm: document.querySelector("#openPartForm"),
  partDialog: document.querySelector("#partDialog"),
  partForm: document.querySelector("#partForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  editingPartId: document.querySelector("#editingPartId"),
  modelInput: document.querySelector("#modelInput"),
  descriptionInput: document.querySelector("#descriptionInput"),
  baseCostInput: document.querySelector("#baseCostInput"),
  sellPercentInput: document.querySelector("#sellPercentInput"),
  crackBaseCostInput: document.querySelector("#crackBaseCostInput"),
  crackSellPercentInput: document.querySelector("#crackSellPercentInput"),
  previewSellCost: document.querySelector("#previewSellCost"),
  closePartForm: document.querySelector("#closePartForm"),
  cancelPartForm: document.querySelector("#cancelPartForm"),
  clearQuote: document.querySelector("#clearQuote"),
  oneValueQuote: document.querySelector("#oneValueQuote"),
  copyQuote: document.querySelector("#copyQuote"),
  selectAllPriceFile: document.querySelector("#selectAllPriceFile"),
  clearPriceFileSelection: document.querySelector("#clearPriceFileSelection"),
  generatePriceFile: document.querySelector("#generatePriceFile"),
  priceFileSelectionCount: document.querySelector("#priceFileSelectionCount"),
  priceFileDropdownText: document.querySelector("#priceFileDropdownText"),
  priceFileSearch: document.querySelector("#priceFileSearch"),
  priceFileOptions: document.querySelector("#priceFileOptions"),
  savePricingChanges: document.querySelector("#savePricingChanges"),
  sharedSaveStatus: document.querySelector("#sharedSaveStatus"),
  yearlyIncrease: document.querySelector("#yearlyIncrease"),
  reverseYearlyIncrease: document.querySelector("#reverseYearlyIncrease"),
  yearlyIncreaseStatus: document.querySelector("#yearlyIncreaseStatus"),
  loginScreen: document.querySelector("#loginScreen"),
  loginForm: document.querySelector("#loginForm"),
  loginUsername: document.querySelector("#loginUsername"),
  loginPassword: document.querySelector("#loginPassword"),
  loginError: document.querySelector("#loginError"),
  emptyPartsTemplate: document.querySelector("#emptyPartsTemplate"),
  emptyQuoteTemplate: document.querySelector("#emptyQuoteTemplate"),
  emptyFixedTemplate: document.querySelector("#emptyFixedTemplate")
};

function todayLoginKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function unlockApp() {
  document.body.classList.remove("auth-locked");
  document.body.classList.add("is-authenticated");
}

function firebaseAuthUrl(action) {
  return `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${encodeURIComponent(FIREBASE_API_KEY)}`;
}

function firebaseTokenUrl() {
  return `https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(FIREBASE_API_KEY)}`;
}

function buildAuthSession(authData, email) {
  return {
    date: todayLoginKey(),
    email: authData.email || email,
    idToken: authData.idToken,
    refreshToken: authData.refreshToken,
    localId: authData.localId || "",
    expiresAt: Date.now() + Math.max(Number(authData.expiresIn || 3600) - 60, 60) * 1000
  };
}

function saveAuthSession(session) {
  localStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify(session));
}

function clearAuthSession() {
  localStorage.removeItem(STORAGE_KEYS.authSession);
}

function getAuthSession() {
  const session = load(STORAGE_KEYS.authSession, null);
  return session?.date === todayLoginKey() ? session : null;
}

async function signInWithFirebase(email, password) {
  const response = await fetch(firebaseAuthUrl("signInWithPassword"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    })
  });

  if (!response.ok) {
    throw new Error("Firebase sign in failed.");
  }

  return buildAuthSession(await response.json(), email);
}

async function refreshFirebaseSession(session) {
  const response = await fetch(firebaseTokenUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: session.refreshToken
    })
  });

  if (!response.ok) {
    throw new Error("Firebase session refresh failed.");
  }

  const authData = await response.json();
  return buildAuthSession(
    {
      email: session.email,
      idToken: authData.id_token,
      refreshToken: authData.refresh_token,
      localId: authData.user_id,
      expiresIn: authData.expires_in
    },
    session.email
  );
}

async function getFirebaseIdToken() {
  const existingSession = load(STORAGE_KEYS.authSession, null);
  if (!existingSession?.idToken || existingSession.date !== todayLoginKey()) {
    throw new Error("Firebase login required.");
  }

  if (existingSession.expiresAt > Date.now() + 60000) {
    return existingSession.idToken;
  }

  const refreshedSession = await refreshFirebaseSession(existingSession);
  saveAuthSession(refreshedSession);
  return refreshedSession.idToken;
}

function startAuthenticatedApp() {
  unlockApp();
  render();
  loadSharedPricingState();
}

async function initializeLogin() {
  els.loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = els.loginUsername.value.trim();
    const password = els.loginPassword.value;
    const submitButton = els.loginForm.querySelector("button[type='submit']");

    els.loginError.textContent = "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Logging in...";
    }

    try {
      const session = await signInWithFirebase(email, password);
      saveAuthSession(session);
      els.loginPassword.value = "";
      startAuthenticatedApp();
    } catch {
      clearAuthSession();
      els.loginError.textContent = "Incorrect email or password.";
      els.loginPassword.value = "";
      els.loginPassword.focus();
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Log in";
      }
    }
  });

  const existingSession = getAuthSession();
  if (existingSession?.idToken) {
    try {
      if (existingSession.expiresAt <= Date.now() + 60000) {
        saveAuthSession(await refreshFirebaseSession(existingSession));
      }
      startAuthenticatedApp();
      return;
    } catch {
      clearAuthSession();
    }
  }

  if (els.loginUsername) {
    els.loginUsername.focus();
  }
}

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeParts(items) {
  return items.map((part) => {
    const model = part.model || extractModel(part.description);
    const description = stripModel(part.description, model);
    const crackTestBaseCost = shouldBlankCrackTest(model, description)
      ? part.crackTestBaseCost ?? null
      : part.crackTestBaseCost ?? defaultCrackTestBaseCost;
    return {
      ...part,
      model,
      description,
      crackTestBaseCost,
      crackTestSellPercent: part.crackTestSellPercent ?? defaultCrackTestSellPercent
    };
  });
}

function mergeDefaultParts(savedParts) {
  const mergedParts = [...savedParts];
  const existingKeys = new Set(
    mergedParts.map((part) => `${part.model}|${part.description}`.toLowerCase())
  );
  const defaultPartsByKey = new Map(
    normalizeParts(sampleParts).map((part) => [
      `${part.model}|${part.description}`.toLowerCase(),
      part
    ])
  );

  mergedParts.forEach((part) => {
    const key = `${part.model}|${part.description}`.toLowerCase();
    const defaultPart = defaultPartsByKey.get(key);
    if (defaultPart && !hasPrice(part.baseCost) && hasPrice(defaultPart.baseCost)) {
      part.baseCost = defaultPart.baseCost;
    }
    if (
      defaultPart &&
      hasPrice(defaultPart.crackTestBaseCost) &&
      (!hasPrice(part.crackTestBaseCost) || Number(part.crackTestBaseCost) === defaultCrackTestBaseCost)
    ) {
      part.crackTestBaseCost = defaultPart.crackTestBaseCost;
    }
    if (defaultPart && ["830E", "930E"].includes(part.model)) {
      if (!hasPrice(part.sellPercent) || Number(part.sellPercent) === 0) {
        part.sellPercent = defaultPart.sellPercent;
      }
      if (
        !hasPrice(part.crackTestBaseCost) ||
        [129.25, 165, 184.25, 258.5].includes(Number(part.crackTestBaseCost))
      ) {
        part.crackTestBaseCost = defaultPart.crackTestBaseCost;
      }
      if (!hasPrice(part.crackTestSellPercent) || Number(part.crackTestSellPercent) === defaultCrackTestSellPercent) {
        part.crackTestSellPercent = defaultPart.crackTestSellPercent;
      }
    }
    const migration = baseCostMigrations.find(
      (item) => `${item.model}|${item.description}`.toLowerCase() === key
    );
    if (migration && Number(part.baseCost) === migration.from) {
      part.baseCost = migration.to;
    }
  });

  defaultPartsByKey.forEach((defaultPart, key) => {
    if (!existingKeys.has(key)) {
      mergedParts.push({ ...defaultPart, id: createId() });
    }
  });

  return mergedParts;
}

function mergeDefaultFixedRepairItems(savedItems) {
  const savedById = new Map((savedItems || []).map((item) => [item.id, item]));
  const mergedItems = defaultFixedRepairItems.map((item) => ({
    ...item,
    ...(savedById.get(item.id) || {})
  }));
  const defaultIds = new Set(defaultFixedRepairItems.map((item) => item.id));
  (savedItems || []).forEach((item) => {
    if (!defaultIds.has(item.id)) {
      mergedItems.push(item);
    }
  });
  return mergedItems;
}

function extractModel(description) {
  return String(description || "").trim().split(/\s+/)[0]?.toUpperCase() || "Other";
}

function stripModel(description, model) {
  const value = String(description || "").trim();
  const prefix = String(model || "").trim();
  if (!prefix || !value.toUpperCase().startsWith(prefix.toUpperCase())) return value;
  return value.slice(prefix.length).trim() || value;
}

function shouldBlankCrackTest(model, description) {
  return model.toUpperCase() === "793F" && description.toLowerCase().includes("rear w/hub");
}

function save() {
  localStorage.setItem(STORAGE_KEYS.parts, JSON.stringify(parts));
  localStorage.setItem(STORAGE_KEYS.quote, JSON.stringify(quoteItems));
  localStorage.setItem(STORAGE_KEYS.addOns, JSON.stringify(addOnPrices));
  localStorage.setItem(STORAGE_KEYS.quoteMeta, JSON.stringify(quoteMeta));
  localStorage.setItem(STORAGE_KEYS.collapsedModels, JSON.stringify(collapsedModels));
  localStorage.setItem(STORAGE_KEYS.fixedRepairs, JSON.stringify(fixedRepairItems));
  localStorage.setItem(STORAGE_KEYS.yearlyIncreaseLog, JSON.stringify(yearlyIncreaseLog));
}

function sharedPricingState() {
  return {
    parts,
    fixedRepairs: fixedRepairItems,
    yearlyIncreaseLog,
    updatedAt: new Date().toISOString()
  };
}

function setSharedSaveStatus(message, tone = "") {
  if (!els.sharedSaveStatus) return;
  els.sharedSaveStatus.textContent = message;
  els.sharedSaveStatus.dataset.tone = tone;
}

function firebasePricingStateUrl(idToken = "") {
  const url = `${FIREBASE_DATABASE_URL.replace(/\/$/, "")}/pricing-state.json`;
  return idToken ? `${url}?auth=${encodeURIComponent(idToken)}` : url;
}

function hasSharedPricingData(state) {
  return Boolean(
    state &&
    (Array.isArray(state.parts) ||
      Array.isArray(state.fixedRepairs) ||
      Array.isArray(state.yearlyIncreaseLog))
  );
}

function applySharedPricingState(state) {
  if (Array.isArray(state.parts)) {
    parts = mergeDefaultParts(normalizeParts(state.parts));
  }
  if (Array.isArray(state.fixedRepairs)) {
    fixedRepairItems = mergeDefaultFixedRepairItems(state.fixedRepairs);
  }
  if (Array.isArray(state.yearlyIncreaseLog)) {
    yearlyIncreaseLog = state.yearlyIncreaseLog;
  }
  save();
}

async function loadFirebasePricingState() {
  if (!FIREBASE_DATABASE_URL) return null;
  const idToken = await getFirebaseIdToken();
  const response = await fetch(firebasePricingStateUrl(idToken), { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Firebase pricing state could not be loaded.");
  }
  return response.json();
}

async function saveFirebasePricingState(payload) {
  const idToken = await getFirebaseIdToken();
  const response = await fetch(firebasePricingStateUrl(idToken), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("Firebase pricing state could not be saved.");
  }
  return response.json();
}

async function saveServerPricingState(payload) {
  const response = await fetch("/api/pricing-state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("Server pricing state could not be saved.");
  }
  return response.json();
}

async function loadSharedPricingState() {
  let state = null;
  let source = "";
  let firebaseWasEmpty = false;

  try {
    const firebaseState = await loadFirebasePricingState();
    if (hasSharedPricingData(firebaseState)) {
      state = firebaseState;
      source = "firebase";
    } else {
      firebaseWasEmpty = true;
    }
  } catch {
    state = null;
  }

  if (!state) {
    try {
      const response = await fetch("/api/pricing-state", { cache: "no-store" });
      if (response.ok) {
        state = await response.json();
        source = "server";
      }
    } catch {
      state = null;
    }
  }

  if (!state) {
    try {
      const response = await fetch("pricing-state.json", { cache: "no-store" });
      if (response.ok) {
        state = await response.json();
        source = "static";
      }
    } catch {
      state = null;
    }
  }

  if (!state) {
    sharedPricingAvailable = false;
    setSharedSaveStatus("Shared pricing file is not available right now. Changes are only local until the server is back.", "warning");
    return;
  }

  applySharedPricingState(state);

  if (source === "firebase") {
    sharedPricingSource = "firebase";
    sharedPricingAvailable = true;
    if (els.savePricingChanges) els.savePricingChanges.disabled = false;
    setSharedSaveStatus("Firebase pricing connected. Save changes when you want to push updates to everyone.", "ready");
  } else if (source === "server") {
    sharedPricingSource = "server";
    sharedPricingAvailable = true;
    if (els.savePricingChanges) els.savePricingChanges.disabled = false;
    setSharedSaveStatus("Shared pricing file connected. Save changes when you want to push updates to everyone.", "ready");
  } else if (FIREBASE_DATABASE_URL) {
    sharedPricingSource = "firebase";
    sharedPricingAvailable = true;
    if (els.savePricingChanges) els.savePricingChanges.disabled = false;
    setSharedSaveStatus("Hosted price file loaded. Click Save Changes once to publish it to Firebase for everyone.", "warning");
  } else {
    sharedPricingSource = "";
    sharedPricingAvailable = false;
    setSharedSaveStatus("Hosted price file loaded. Save Changes is only available in the local/server version.", "warning");
    if (els.savePricingChanges) {
      els.savePricingChanges.disabled = true;
    }
  }

  render();
  if (source === "static" && firebaseWasEmpty) {
    await saveSharedPricingState();
  }
}

function queueSharedPricingSave() {
  if (!sharedPricingAvailable) return;
  window.clearTimeout(sharedPricingSaveTimer);
  sharedPricingSaveTimer = window.setTimeout(saveSharedPricingState, 250);
}

async function saveSharedPricingState() {
  if (!sharedPricingSource) return false;
  try {
    if (sharedPricingSource === "firebase") {
      await saveFirebasePricingState(sharedPricingState());
      return true;
    }
    if (sharedPricingSource === "server") {
      await saveServerPricingState(sharedPricingState());
      return true;
    }
    return false;
  } catch {
    sharedPricingAvailable = false;
    return false;
  }
}

async function savePricingChangesNow() {
  save();
  if (els.savePricingChanges) {
    els.savePricingChanges.disabled = true;
  }
  const sharedTarget = sharedPricingSource === "firebase" ? "Firebase" : "the shared server file";
  setSharedSaveStatus(`Saving pricing changes to ${sharedTarget}...`, "saving");

  try {
    const saved = await saveSharedPricingState();

    if (!saved) {
      setSharedSaveStatus(`Could not save to ${sharedTarget}. Your changes are still on this browser only.`, "warning");
      alert(`Could not save pricing changes to ${sharedTarget}.`);
      return;
    }

    sharedPricingAvailable = true;
    setSharedSaveStatus(`Pricing changes saved to ${sharedTarget} at ${formatLogDate(new Date())}.`, "success");
  } catch {
    sharedPricingAvailable = false;
    setSharedSaveStatus(`Could not reach ${sharedTarget}. Your changes are still on this browser only.`, "warning");
    alert(`Could not reach ${sharedTarget} to save pricing changes.`);
  } finally {
    if (els.savePricingChanges) {
      els.savePricingChanges.disabled = false;
    }
  }
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function money(value) {
  return currency.format(Number(value) || 0);
}

function moneyOrBlank(value) {
  return value === null || value === undefined || value === "" ? "" : money(value);
}

function hasPrice(value) {
  return value !== null && value !== undefined && value !== "";
}

function roundMoneyValue(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function weldRepairsCalculatedPrice() {
  const hours = Number(els.weldRepairsHours?.value);
  if (hours > 0) return roundMoneyValue(hours * weldRepairsHourlyRate);
  return roundMoneyValue(Number(els.weldRepairsPrice?.value) || 0);
}

function addYearlyIncrease(value) {
  return roundMoneyValue(Number(value) * 1.05);
}

function financialYearFor(date = new Date()) {
  const year = date.getFullYear();
  return date.getMonth() >= 6 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

function formatLogDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function activeYearlyIncreaseForYear(financialYear) {
  return yearlyIncreaseLog.find((entry) => entry.financialYear === financialYear && !entry.reversedAt);
}

function lastActiveYearlyIncrease() {
  return yearlyIncreaseLog.slice().reverse().find((entry) => !entry.reversedAt);
}

function sellCost(baseCost, sellPercent) {
  return Number(baseCost) * (1 + Number(sellPercent) / 100);
}

function quoteQuantity(item) {
  return Math.max(1, Number(item.quantity) || 1);
}

function isThreadRepairQuoteItem(item) {
  if (item.serviceType !== "fixed-repair") return false;
  const value = `${item.serviceLabel || ""} ${item.description || ""}`.toLowerCase();
  const mentionsThread = value.includes("thread");
  const mentionsThreadRange = /\bm(?:10|11|12|13|14|15|16|18|19|20|21|22|23|24)\b/i.test(value);
  return mentionsThread || mentionsThreadRange;
}

function threadRepairScaleKey(item) {
  const value = `${item.model || ""} ${item.serviceLabel || ""} ${item.description || ""}`.toLowerCase();
  if (/\bm10\b|\bm11\b|\bm12\b|\bm13\b|\bm14\b|\bm15\b|\bm16\b/.test(value)) return "m10-m16";
  return "m18-m24";
}

function threadRepairTotal(item, quantity) {
  const qty = Math.max(1, Math.floor(Number(quantity) || 1));
  const scale = threadRepairPricingScales[threadRepairScaleKey(item)] || threadRepairPricingScales["m18-m24"];
  const exact = scale.points.find((point) => point.quantity === qty);
  if (exact) return exact.total;

  const lastPoint = scale.points[scale.points.length - 1];
  if (qty > lastPoint.quantity) {
    return lastPoint.total + ((qty - lastPoint.quantity) * scale.finalUnitRate);
  }

  const upperPoint = scale.points.find((point) => point.quantity > qty);
  const lowerPoint = [...scale.points].reverse().find((point) => point.quantity < qty);
  if (!lowerPoint || !upperPoint) return qty * scale.fallbackUnitRate;

  const stepRate = (upperPoint.total - lowerPoint.total) / (upperPoint.quantity - lowerPoint.quantity);
  return lowerPoint.total + ((qty - lowerPoint.quantity) * stepRate);
}

function quoteUnitSell(item) {
  if (isThreadRepairQuoteItem(item)) {
    return threadRepairTotal(item, quoteQuantity(item)) / quoteQuantity(item);
  }
  return sellCost(item.baseCost, item.sellPercent);
}

function quoteLineTotal(item) {
  if (isThreadRepairQuoteItem(item)) return threadRepairTotal(item, quoteQuantity(item));
  return sellCost(item.baseCost, item.sellPercent) * quoteQuantity(item);
}

function isModelCollapsed(tableKey, model) {
  return Boolean(collapsedModels?.[tableKey]?.[model]);
}

function toggleModel(tableKey, model) {
  collapsedModels = {
    parts: collapsedModels.parts || {},
    fixed: collapsedModels.fixed || {}
  };
  collapsedModels[tableKey][model] = !isModelCollapsed(tableKey, model);
  save();
}

function toggleAllModels(tableKey, models) {
  if (!models.length) return;
  collapsedModels = {
    parts: collapsedModels.parts || {},
    fixed: collapsedModels.fixed || {}
  };
  const shouldCollapse = !models.every((model) => isModelCollapsed(tableKey, model));
  models.forEach((model) => {
    collapsedModels[tableKey][model] = shouldCollapse;
  });
  save();
}

function renderYearlyIncreaseStatus() {
  const activeLog = lastActiveYearlyIncrease();
  const currentYear = financialYearFor();
  const currentYearLog = activeYearlyIncreaseForYear(currentYear);

  if (currentYearLog) {
    els.yearlyIncreaseStatus.textContent = `FY ${currentYear} increase already applied on ${formatLogDate(currentYearLog.appliedAt)}.`;
    els.yearlyIncrease.disabled = true;
    els.reverseYearlyIncrease.disabled = false;
    return;
  }

  els.yearlyIncrease.disabled = false;
  els.reverseYearlyIncrease.disabled = !activeLog;

  if (activeLog) {
    els.yearlyIncreaseStatus.textContent = `Last active increase: FY ${activeLog.financialYear}, applied ${formatLogDate(activeLog.appliedAt)}.`;
    return;
  }

  const lastReversed = yearlyIncreaseLog.slice().reverse().find((entry) => entry.reversedAt);
  if (lastReversed) {
    els.yearlyIncreaseStatus.textContent = `Last reversed: FY ${lastReversed.financialYear}, reversed ${formatLogDate(lastReversed.reversedAt)}.`;
    return;
  }

  els.yearlyIncreaseStatus.textContent = "No yearly increase logged yet.";
}

function applyYearlyIncrease() {
  const financialYear = financialYearFor();
  const existingEntry = activeYearlyIncreaseForYear(financialYear);

  if (existingEntry) {
    alert(`The 5% yearly increase has already been applied for FY ${financialYear} on ${formatLogDate(existingEntry.appliedAt)}.`);
    renderYearlyIncreaseStatus();
    return;
  }

  const confirmed = confirm(
    `Are you sure you want to apply a 5% yearly increase for FY ${financialYear}?\n\nThis will increase all blasting base prices, crack-test base prices, and fixed repair sell prices.`
  );
  if (!confirmed) return;

  const beforeParts = parts.map((part) => ({ ...part }));
  const beforeFixedRepairs = fixedRepairItems.map((item) => ({ ...item }));

  parts = parts.map((part) => ({
    ...part,
    baseCost: hasPrice(part.baseCost) ? addYearlyIncrease(part.baseCost) : part.baseCost,
    crackTestBaseCost: hasPrice(part.crackTestBaseCost) ? addYearlyIncrease(part.crackTestBaseCost) : part.crackTestBaseCost
  }));

  fixedRepairItems = fixedRepairItems.map((item) => ({
    ...item,
    sellPrice: addYearlyIncrease(item.sellPrice)
  }));

  yearlyIncreaseLog.push({
    id: createId(),
    financialYear,
    percent: 5,
    appliedAt: new Date().toISOString(),
    beforeParts,
    beforeFixedRepairs
  });

  render();
  queueSharedPricingSave();
}

function reverseLastYearlyIncrease() {
  const entry = lastActiveYearlyIncrease();
  if (!entry) {
    alert("There is no active yearly increase to reverse.");
    renderYearlyIncreaseStatus();
    return;
  }

  const confirmed = confirm(
    `Are you sure you want to reverse the FY ${entry.financialYear} yearly increase?\n\nThis restores the base and fixed repair prices back to what they were before that increase was applied.`
  );
  if (!confirmed) return;

  parts = normalizeParts(entry.beforeParts || parts);
  fixedRepairItems = mergeDefaultFixedRepairItems(entry.beforeFixedRepairs || fixedRepairItems);
  entry.reversedAt = new Date().toISOString();

  render();
  queueSharedPricingSave();
}

function updateAllToggle(button, tableKey, models, label) {
  if (!button) return;
  const allCollapsed = models.length > 0 && models.every((model) => isModelCollapsed(tableKey, model));
  button.textContent = allCollapsed ? "+" : "-";
  button.setAttribute("aria-label", `${allCollapsed ? "Expand" : "Collapse"} all ${label} models`);
  button.setAttribute("aria-expanded", String(!allCollapsed));
  button.disabled = models.length === 0;
}

function modelRowHtml(model, tableKey, colspan) {
  const collapsed = isModelCollapsed(tableKey, model);
  return `
    <td colspan="${colspan}">
      <button class="model-toggle" type="button" data-toggle-model="${escapeHtml(model)}" data-table-key="${tableKey}" aria-expanded="${String(!collapsed)}">
        <span class="model-chevron" aria-hidden="true">${collapsed ? "+" : "-"}</span>
        <span>${escapeHtml(model)}</span>
      </button>
    </td>
  `;
}

function priceFileModelName(model) {
  const value = String(model || "").trim().toUpperCase();
  if (value === "785") return "785C";
  if (value === "789") return "789C";
  return value;
}

function priceFileItemName(item) {
  return String(item || "")
    .trim()
    .replace(/\bW\/Hub\b/gi, "Wheel Hub")
    .replace(/\s+/g, " ");
}

function componentSelectionId(model, item) {
  return `component:${priceFileModelName(model)}|${priceFileItemName(item)}`.toLowerCase();
}

function modelSelectionId(model) {
  return `model:${priceFileModelName(model)}`.toLowerCase();
}

function addPriceFileOption(groupsByKey, model, item, option) {
  const normalizedModel = priceFileModelName(model);
  const normalizedItem = priceFileItemName(item);
  const key = `${normalizedModel}|${normalizedItem}`.toLowerCase();
  const group = groupsByKey.get(key) || {
    id: componentSelectionId(normalizedModel, normalizedItem),
    model: normalizedModel,
    item: normalizedItem,
    services: []
  };
  group.services.push(option);
  groupsByKey.set(key, group);
}

function priceFileOptionGroups() {
  const groupsByKey = new Map();

  parts
    .slice()
    .sort((a, b) => {
      const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
      return modelSort || a.description.localeCompare(b.description);
    })
    .forEach((part) => {
      if (hasPrice(part.baseCost)) {
        addPriceFileOption(groupsByKey, part.model, part.description, {
          label: "Sandblast",
          priceLabel: money(sellCost(part.baseCost, part.sellPercent))
        });
      }

      if (part.crackTestBaseCost !== null) {
        addPriceFileOption(groupsByKey, part.model, part.description, {
          label: "Crack-test",
          priceLabel: money(sellCost(part.crackTestBaseCost, part.crackTestSellPercent))
        });
      }
    });

  fixedRepairItems
    .slice()
    .sort((a, b) => {
      const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
      const itemSort = a.item.localeCompare(b.item);
      return modelSort || itemSort || a.method.localeCompare(b.method) || fixedAreaSort(a.repairArea) - fixedAreaSort(b.repairArea) || a.repairArea.localeCompare(b.repairArea);
    })
    .forEach((item) => {
      addPriceFileOption(groupsByKey, item.model, item.item, {
        label: fixedPriceFileLabel(item),
        priceLabel: money(item.sellPrice)
      });
    });

  const cleanPackPrice = money(addOnPrices.cleanPack ?? 247.5);
  groupsByKey.forEach((group) => {
    if (group.item === "Thread Repairs") {
      group.services = group.services.map((service) =>
        service.label === "Repair Threads"
          ? { ...service, priceLabel: `${service.priceLabel} - discount applies to more threads` }
          : service
      );
      return;
    }
    group.services.push({ label: "Weld Repairs", priceLabel: "To Be Quoted" });
    group.services.push({ label: "Clean & Pack", priceLabel: cleanPackPrice });
  });

  return Array.from(groupsByKey.values()).sort((a, b) => {
    const threadOrder = Number(a.item === "Thread Repairs") - Number(b.item === "Thread Repairs");
    if (threadOrder !== 0) return threadOrder;
    const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
    return modelSort || a.item.localeCompare(b.item);
  });
}

function allPriceFileSelectionIds() {
  return priceFileOptionGroups().map((group) => group.id);
}

function selectedComponentIds() {
  const groups = priceFileOptionGroups();
  const selected = new Set(
    groups
      .filter((group) => selectedPriceFileIds.has(group.id) || selectedPriceFileIds.has(modelSelectionId(group.model)))
      .map((group) => group.id)
  );
  return selected;
}

function prunePriceFileSelection() {
  const validIds = new Set([
    ...allPriceFileSelectionIds(),
    ...new Set(priceFileOptionGroups().map((group) => modelSelectionId(group.model)))
  ]);
  selectedPriceFileIds = new Set([...selectedPriceFileIds].filter((id) => validIds.has(id)));
}

function updatePriceFileSelectionCount() {
  const count = selectedComponentIds().size;
  els.priceFileSelectionCount.textContent = `${count} part${count === 1 ? "" : "s"} selected`;
  els.priceFileDropdownText.textContent = count ? `${count} selected` : "Choose parts";
}

function renderPriceFileOptions() {
  const query = els.priceFileSearch.value.trim().toLowerCase();
  const groups = priceFileOptionGroups();
  const visibleGroups = groups
    .filter((group) => {
      const heading = `${group.model} ${group.item}`;
      const services = group.services.map((service) => `${service.label} ${service.priceLabel}`).join(" ");
      return `${heading} ${services}`.toLowerCase().includes(query);
    });
  const groupsByModel = new Map();
  visibleGroups.forEach((group) => {
    const modelGroups = groupsByModel.get(group.model) || [];
    modelGroups.push(group);
    groupsByModel.set(group.model, modelGroups);
  });

  els.priceFileOptions.innerHTML = Array.from(groupsByModel.entries())
    .map(([model, modelGroups]) => {
      const modelId = modelSelectionId(model);
      const modelChecked = modelGroups.every((group) => selectedPriceFileIds.has(group.id) || selectedPriceFileIds.has(modelId)) ? " checked" : "";
      const partRows = modelGroups
        .map((group) => {
          const checked = selectedPriceFileIds.has(group.id) || selectedPriceFileIds.has(modelId) ? " checked" : "";
          const serviceSummary = group.services.map((service) => service.label).join(", ");
          return `
            <label class="price-file-option">
              <input class="price-file-check" data-price-file-id="${escapeHtml(group.id)}" type="checkbox"${checked}>
              <span>
                <strong>${escapeHtml(`${group.model} ${group.item}`)}</strong>
                <small>${escapeHtml(serviceSummary)}</small>
              </span>
              <em>${group.services.length} option${group.services.length === 1 ? "" : "s"}</em>
            </label>
          `;
        })
        .join("");
      return `
        <section class="price-file-model-group">
          <label class="price-file-model-option">
            <input class="price-file-check" data-price-file-model="${escapeHtml(model)}" type="checkbox"${modelChecked}>
            <span>${escapeHtml(model)}</span>
            <em>${modelGroups.length} part${modelGroups.length === 1 ? "" : "s"}</em>
          </label>
          ${partRows}
        </section>
      `;
    })
    .join("") || `<div class="empty-price-options">No parts match that search.</div>`;
}

function renderParts() {
  const query = els.partSearch.value.trim().toLowerCase();
  const visibleParts = parts.filter((part) =>
    `${part.model} ${part.description}`.toLowerCase().includes(query)
  );

  els.partsTable.innerHTML = "";

  if (!visibleParts.length) {
    updateAllToggle(els.partsToggleAll, "parts", [], "part");
    els.partsTable.append(els.emptyPartsTemplate.content.cloneNode(true));
    return;
  }

  const visibleModels = [...new Set(visibleParts.map((part) => part.model))];
  updateAllToggle(els.partsToggleAll, "parts", visibleModels, "part");

  let currentModel = "";
  visibleParts
    .sort((a, b) => {
      const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
      return modelSort || a.description.localeCompare(b.description);
    })
    .forEach((part) => {
      if (part.model !== currentModel) {
        currentModel = part.model;
        const modelRow = document.createElement("tr");
        modelRow.className = "model-row";
        modelRow.innerHTML = modelRowHtml(currentModel, "parts", 8);
        els.partsTable.append(modelRow);
      }
      if (isModelCollapsed("parts", currentModel)) return;

      const blastSell = hasPrice(part.baseCost) ? money(sellCost(part.baseCost, part.sellPercent)) : "";
      const blastQuoteDisabled = hasPrice(part.baseCost) ? "" : " disabled";
      const blastBaseCell = hasPrice(part.baseCost)
        ? money(part.baseCost)
        : `<input class="price-input" data-blast-base="${part.id}" type="number" min="0" step="0.01" placeholder="Enter price" aria-label="Blast base price for ${escapeHtml(displayPartName(part))}">`;
      const crackSell = part.crackTestBaseCost === null
        ? ""
        : money(sellCost(part.crackTestBaseCost, part.crackTestSellPercent));
      const crackQuoteDisabled = part.crackTestBaseCost === null ? " disabled" : "";
      const crackBaseCell = shouldBlankCrackTest(part.model, part.description)
        ? `<input class="price-input" data-crack-base="${part.id}" type="number" min="0" step="0.01" placeholder="Enter price" value="${part.crackTestBaseCost ?? ""}" aria-label="Crack-test base price for ${escapeHtml(displayPartName(part))}">`
        : moneyOrBlank(part.crackTestBaseCost);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${escapeHtml(part.description)}</td>
        <td class="money">${blastBaseCell}</td>
        <td class="percent">
          <select class="percent-select" data-part-percent="${part.id}" aria-label="Sell percent for ${escapeHtml(displayPartName(part))}">
            ${percentOptionsHtml(part.sellPercent)}
          </select>
        </td>
        <td class="money">${blastSell}</td>
        <td class="money">${crackBaseCell}</td>
        <td class="percent">
          <select class="percent-select" data-crack-percent="${part.id}" aria-label="Crack-test sell percent for ${escapeHtml(displayPartName(part))}"${crackQuoteDisabled}>
            ${percentOptionsHtml(part.crackTestSellPercent)}
          </select>
        </td>
        <td class="money">${crackSell}</td>
        <td>
          <div class="row-actions">
            <button type="button" data-action="quote-sandblast" data-id="${part.id}"${blastQuoteDisabled}>Blast</button>
            <button type="button" data-action="quote-crack" data-id="${part.id}"${crackQuoteDisabled}>Crack</button>
            <button type="button" data-action="edit" data-id="${part.id}">Edit</button>
            <button class="delete-action" type="button" data-action="delete" data-id="${part.id}">Delete</button>
          </div>
        </td>
      `;
      els.partsTable.append(row);
    });
}

function renderFixedItems() {
  const query = els.fixedSearch.value.trim().toLowerCase();
  const visibleItems = fixedRepairItems.filter((item) =>
    `${item.model} ${item.item} ${item.repairArea} ${item.method}`.toLowerCase().includes(query)
  );
  const visibleGroups = groupFixedRepairItems(visibleItems);

  els.fixedTable.innerHTML = "";

  if (!visibleGroups.length) {
    updateAllToggle(els.fixedToggleAll, "fixed", [], "fixed repair");
    els.fixedTable.append(els.emptyFixedTemplate.content.cloneNode(true));
    return;
  }

  const visibleModels = [...new Set(visibleGroups.map((group) => group.model))];
  updateAllToggle(els.fixedToggleAll, "fixed", visibleModels, "fixed repair");

  let currentModel = "";
  visibleGroups
    .sort((a, b) => {
      const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
      const itemSort = a.item.localeCompare(b.item);
      return modelSort || itemSort || a.method.localeCompare(b.method) || a.areaLabel.localeCompare(b.areaLabel);
    })
    .forEach((group) => {
    if (group.model !== currentModel) {
      currentModel = group.model;
      const modelRow = document.createElement("tr");
      modelRow.className = "model-row";
      modelRow.innerHTML = modelRowHtml(currentModel, "fixed", 6);
      els.fixedTable.append(modelRow);
    }
    if (isModelCollapsed("fixed", currentModel)) return;

    const hasInnerOuter = group.innerItem && group.outerItem;
    const actionClass = group.items.length > 4 ? "multi-action" : hasInnerOuter && group.sealItem ? "quad-action" : hasInnerOuter ? "triple-action" : group.items.length > 1 ? "" : "single-action";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td></td>
      <td>${escapeHtml(group.item)}</td>
      <td>${escapeHtml(group.areaLabel)}</td>
      <td><span class="method-pill">${escapeHtml(group.method)}</span></td>
      <td class="money">${escapeHtml(group.priceLabel)}</td>
      <td>
        <div class="row-actions ${actionClass}">
          ${fixedActionButtons(group)}
        </div>
      </td>
    `;
    els.fixedTable.append(row);
  });
}

function groupFixedRepairItems(items) {
  const groupsByKey = new Map();

  items.forEach((item) => {
    const side = item.areaKind || repairAreaSide(item.repairArea);
    const pairedGroup = pairedRepairGroup(item);
    const groupingArea = pairedGroup ? pairedGroup.key : side ? "paired-areas" : item.repairArea;
    const key = `${item.model}|${item.item}|${item.method}|${groupingArea}`.toLowerCase();
    const group = groupsByKey.get(key) || {
      model: item.model,
      item: item.item,
      method: item.method,
      pairedGroup,
      items: [],
      innerItem: null,
      outerItem: null,
      sealItem: null,
      otherItems: [],
      bothItem: null
    };

    group.items.push(item);
    if (side === "inner") group.innerItem = item;
    if (side === "outer") group.outerItem = item;
    if (side === "seal") group.sealItem = item;
    if (side === "other") group.otherItems.push(item);
    if (side === "both") group.bothItem = item;
    groupsByKey.set(key, group);
  });

  return Array.from(groupsByKey.values()).map((group) => {
    const sortedItems = group.items.sort((a, b) => fixedAreaSort(a.repairArea, a.areaKind) - fixedAreaSort(b.repairArea, b.areaKind));
    const hasInnerOuter = group.innerItem && group.outerItem;
    const hasInnerOuterBoth = hasInnerOuter && group.bothItem;
    const sideItems = [group.innerItem, group.outerItem, group.bothItem, group.sealItem, ...group.otherItems].filter(Boolean);
    return {
      ...group,
      items: sortedItems,
      areaLabel: group.pairedGroup
        ? sortedItems.map((item) => item.repairArea).join(" / ")
        : sideItems.length
        ? sideItems.map((item) => item.repairArea).join(" / ")
        : hasInnerOuterBoth
        ? `${group.innerItem.repairArea} / ${group.outerItem.repairArea} / ${group.bothItem.repairArea}`
        : hasInnerOuter
        ? `${group.innerItem.repairArea} / ${group.outerItem.repairArea}`
        : sortedItems.map((item) => item.repairArea).join(" / "),
      priceLabel: group.pairedGroup
        ? sortedItems.map((item) => `${fixedButtonLabel(item)} ${money(item.sellPrice)}`).join(" / ")
        : sideItems.length
        ? sideItems.map((item) => `${fixedButtonLabel(item)} ${money(item.sellPrice)}`).join(" / ")
        : hasInnerOuterBoth
        ? `Inner ${money(group.innerItem.sellPrice)} / Outer ${money(group.outerItem.sellPrice)} / Both ${money(group.bothItem.sellPrice)}`
        : hasInnerOuter
        ? `${money(group.innerItem.sellPrice)} / ${money(group.outerItem.sellPrice)}`
        : sortedItems.map((item) => money(item.sellPrice)).join(" / ")
    };
  });
}

function fixedActionButtons(group) {
  if (group.pairedGroup) {
    return group.items
      .map((item) => {
        const label = fixedButtonLabel(item);
        return `<button type="button" data-action="quote-fixed-set" data-fixed-ids="${item.id}">${escapeHtml(label)}</button>`;
      })
      .join("");
  }

  if (group.innerItem && group.outerItem) {
    const innerLabel = group.item.toLowerCase().includes("brake anchor") ? "Seal" : "Inner";
    const bothIds = group.bothItem ? group.bothItem.id : `${group.innerItem.id},${group.outerItem.id}`;
    return `
      <button type="button" data-action="quote-fixed-set" data-fixed-ids="${group.innerItem.id}">${innerLabel}</button>
      <button type="button" data-action="quote-fixed-set" data-fixed-ids="${group.outerItem.id}">Outer</button>
      <button type="button" data-action="quote-fixed-set" data-fixed-ids="${bothIds}">Both</button>
      ${group.sealItem ? `<button type="button" data-action="quote-fixed-set" data-fixed-ids="${group.sealItem.id}">Seal</button>` : ""}
      ${group.otherItems.map((item) => `<button type="button" data-action="quote-fixed-set" data-fixed-ids="${item.id}">${escapeHtml(item.repairArea)}</button>`).join("")}
    `;
  }

  return group.items
    .map((item) => `<button type="button" data-action="quote-fixed-set" data-fixed-ids="${item.id}">${escapeHtml(fixedButtonLabel(item) || "Add")}</button>`)
    .join("");
}

function pairedRepairGroup(item) {
  if (item.model === "830E" && item.item === "Torque Tube" && item.method === "Metal Spray") {
    return { key: "torque-tube-repair-areas" };
  }
  if (item.model === "830E" && item.item === "Front Wheel Hub" && item.method === "Laser Cladding") {
    return { key: "front-wheel-hub-repair-areas" };
  }
  return null;
}

function fixedButtonLabel(item) {
  if (item.areaKind === "other") return item.repairArea;
  if (repairAreaSide(item.repairArea) === "inner") return "Inner";
  if (repairAreaSide(item.repairArea) === "outer") return "Outer";
  if (repairAreaSide(item.repairArea) === "both") return "Both";
  if (repairAreaSide(item.repairArea) === "seal") return "Seal";
  if (item.item === "Torque Tube" && item.repairArea === "Interference Fit Location") return "Interference";
  if (item.item === "Torque Tube" && item.repairArea === "Paddle Pump Location") return "Paddle Pump";
  if (item.item === "Front Wheel Hub" && item.repairArea === "Inner Bearing Bore") return "Inner";
  if (item.item === "Front Wheel Hub" && item.repairArea === "Outer Bearing Bore") return "Outer";
  if (item.item === "Front Wheel Hub" && item.repairArea === "Duo Cone Location") return "Duo Cone";
  return item.repairArea;
}

function repairAreaSide(repairArea) {
  const area = repairArea.toLowerCase();
  if (area.includes("seal")) return "seal";
  if (area.startsWith("inner ")) return "inner";
  if (area.startsWith("outer ")) return "outer";
  if (area.startsWith("both ")) return "both";
  return "";
}

function fixedAreaSort(repairArea, areaKind = "") {
  const side = areaKind || repairAreaSide(repairArea);
  if (side === "inner") return 1;
  if (side === "outer") return 2;
  if (side === "both") return 3;
  if (side === "seal") return 4;
  if (side === "other") return 5;
  return 6;
}

function fixedAreaIdentityKey(item) {
  const side = item.areaKind || repairAreaSide(item.repairArea) || "";
  if (side === "other") return `other-${String(item.repairArea || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return side || String(item.repairArea || "").trim().toLowerCase();
}

function renderQuote() {
  els.quoteList.innerHTML = "";

  if (!quoteItems.length) {
    els.quoteList.append(els.emptyQuoteTemplate.content.cloneNode(true));
  }

  quoteItems.forEach((item) => {
    const baseUnitSell = sellCost(item.baseCost, item.sellPercent);
    const sell = quoteUnitSell(item);
    const quantity = quoteQuantity(item);
    const lineTotal = quoteLineTotal(item);
    const quoteItem = document.createElement("article");
    quoteItem.className = "quote-item";
    const isEditingFixedPrice = editingFixedPriceId === item.id;
    const fixedSellLabel = isThreadRepairQuoteItem(item) && quantity > 1 ? "Scaled total" : "Sell";
    const metricsHtml = item.serviceType === "fixed-repair" && isEditingFixedPrice ? `
        <label class="fixed-price-edit">
          <span>Sell</span>
          <input type="number" min="0" step="0.01" value="${Number(baseUnitSell).toFixed(2)}" data-quote-fixed-price="${item.id}">
        </label>
        <button class="small-action-btn" type="button" data-quote-price-done="${item.id}">Done</button>
      ` : item.serviceType === "fixed-repair" ? `
        <div class="metric-value metric-value-wide">
          <span>${fixedSellLabel}</span>
          <strong>${money(lineTotal)}</strong>
        </div>
        <button class="small-action-btn" type="button" data-quote-price-edit="${item.id}">Edit price</button>
      ` : item.fixedPrice ? `
        <div class="metric-value metric-value-wide">
          <span>${quantity > 1 ? "Total" : "Sell"}</span>
          <strong>${money(lineTotal)}</strong>
        </div>
      ` : `
        <div class="metric-value">
          <span>Base</span>
          <strong>${money(item.baseCost)}</strong>
        </div>
        <label>
          <span>Sell %</span>
          <select data-quote-percent="${item.id}">
            ${percentOptionsHtml(item.sellPercent)}
          </select>
        </label>
        <div class="metric-value">
          <span>${quantity > 1 ? "Total" : "Sell"}</span>
          <strong>${money(lineTotal)}</strong>
        </div>
      `;
    quoteItem.innerHTML = `
      <div class="quote-title">
        <span>${escapeHtml(displayQuoteName(item))}</span>
        <div class="quote-title-actions">
          <label class="quote-qty">
            <span>Qty</span>
            <input type="number" min="1" step="1" value="${quantity}" data-quote-quantity="${item.id}" aria-label="Quantity for ${escapeHtml(displayQuoteName(item))}">
          </label>
          <button type="button" data-quote-remove="${item.id}" aria-label="Remove ${escapeHtml(displayQuoteName(item))}">Remove</button>
        </div>
      </div>
      <div class="quote-metrics${item.fixedPrice ? " quote-metrics-fixed" : ""}${item.serviceType === "fixed-repair" ? " quote-metrics-fixed-editable" : ""}">
        ${metricsHtml}
      </div>
    `;
    els.quoteList.append(quoteItem);
  });

  const totals = quoteTotals();

  els.quoteCount.textContent = String(quoteItems.length);
  els.quoteTotal.textContent = money(totals.sell);
  els.quoteBaseTotal.textContent = money(totals.base);
  els.quoteSellTotal.textContent = money(totals.sell);
}

function render() {
  prunePriceFileSelection();
  renderPriceFileOptions();
  renderParts();
  renderFixedItems();
  renderQuote();
  updatePriceFileSelectionCount();
  renderYearlyIncreaseStatus();
  save();
}

function openForm(part) {
  els.dialogTitle.textContent = part ? "Edit Part" : "Add Part";
  els.editingPartId.value = part?.id || "";
  els.modelInput.value = part?.model || "";
  els.descriptionInput.value = part?.description || "";
  els.baseCostInput.value = part?.baseCost ?? "";
  els.sellPercentInput.value = part?.sellPercent ?? "";
  els.crackBaseCostInput.value = part?.crackTestBaseCost ?? "";
  els.crackSellPercentInput.value = part?.crackTestSellPercent ?? defaultCrackTestSellPercent;
  updatePreview();
  els.partDialog.showModal();
  els.descriptionInput.focus();
}

function closeForm() {
  els.partForm.reset();
  els.partDialog.close();
}

function setFixedAreaOption(option, checked = true) {
  const input = document.querySelector(`[data-fixed-area-option][value="${option}"]`);
  if (input) input.checked = checked;
}

function addFixedOtherAreaRow(repairArea = "", sellPrice = "") {
  const row = document.createElement("div");
  row.className = "repair-area-row repair-area-row-other extra-other-row";
  row.dataset.fixedOtherRow = "";
  row.innerHTML = `
    <span class="area-choice">Other</span>
    <input type="text" value="${escapeHtml(repairArea)}" placeholder="Skim Face" data-fixed-extra-other-area>
    <span class="currency-input"><span>$</span><input type="number" min="0" step="0.01" value="${sellPrice === "" ? "" : Number(sellPrice)}" placeholder="900" data-fixed-extra-other-price></span>
    <button class="mini-remove-btn" type="button" data-remove-fixed-other aria-label="Remove other repair area">x</button>
  `;
  els.fixedOtherAreaList.append(row);
  return row;
}

function clearFixedOtherAreaRows() {
  els.fixedOtherAreaList.innerHTML = "";
}

function stripAreaPrefix(repairArea, prefix) {
  const value = String(repairArea || "").trim();
  const pattern = new RegExp(`^${prefix}\\s+`, "i");
  return value.replace(pattern, "").trim();
}

function fixedRepairEditGroupKey(item) {
  return `${item.model}|${item.item}|${item.method}`.toLowerCase();
}

function fixedRepairEditGroups() {
  const groupsByKey = new Map();
  fixedRepairItems.forEach((item) => {
    const key = fixedRepairEditGroupKey(item);
    const group = groupsByKey.get(key) || {
      id: key,
      model: item.model,
      item: item.item,
      method: item.method,
      items: []
    };
    group.items.push(item);
    groupsByKey.set(key, group);
  });

  return Array.from(groupsByKey.values())
    .map((group) => ({
      ...group,
      items: group.items.sort((a, b) => fixedAreaSort(a.repairArea, a.areaKind) - fixedAreaSort(b.repairArea, b.areaKind) || a.repairArea.localeCompare(b.repairArea))
    }))
    .slice()
    .sort((a, b) => {
      const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
      const itemSort = a.item.localeCompare(b.item);
      return modelSort || itemSort || a.method.localeCompare(b.method);
    });
}

function populateFixedRepairSelect() {
  const groups = fixedRepairEditGroups();
  const methodCountsByPart = groups.reduce((counts, group) => {
    const key = `${group.model}|${group.item}`.toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());
  els.fixedRepairSelect.innerHTML = `
    <option value="">Select a fixed repair...</option>
    ${groups.map((group) => {
      const partKey = `${group.model}|${group.item}`.toLowerCase();
      const label = methodCountsByPart.get(partKey) > 1 ? `${group.model} ${group.item} - ${group.method}` : `${group.model} ${group.item}`;
      return `<option value="${escapeHtml(group.id)}">${escapeHtml(label)}</option>`;
    }).join("")}
  `;
}

function clearFixedRepairFields() {
  [...document.querySelectorAll("[data-fixed-area-option]")].forEach((option) => {
    option.checked = false;
  });
  els.fixedModelInput.value = "";
  els.fixedItemInput.value = "";
  els.fixedMethodInput.value = "";
  els.fixedAreaInput.value = "";
  els.fixedOtherAreaInput.value = "";
  els.fixedInnerSellPriceInput.value = "";
  els.fixedOuterSellPriceInput.value = "";
  els.fixedSealSellPriceInput.value = "";
  els.fixedOtherSellPriceInput.value = "";
  clearFixedOtherAreaRows();
}

function fillFixedRepairForm(group) {
  clearFixedRepairFields();
  const items = group?.items || [];
  editingFixedRepairIds = items.map((item) => item.id);
  let filledPrimaryOther = false;

  if (!items.length) return;
  const firstItem = items[0];
  els.fixedModelInput.value = group.model;
  els.fixedItemInput.value = group.item;
  els.fixedMethodInput.value = group.method;

  items.forEach((item) => {
    const side = item.areaKind || repairAreaSide(item.repairArea);
    if (side === "inner") {
      setFixedAreaOption("inner");
      els.fixedAreaInput.value = stripAreaPrefix(item.repairArea, "inner") || els.fixedAreaInput.value || "Bearing Area";
      els.fixedInnerSellPriceInput.value = item.sellPrice;
    } else if (side === "outer") {
      setFixedAreaOption("outer");
      els.fixedAreaInput.value = stripAreaPrefix(item.repairArea, "outer") || els.fixedAreaInput.value || "Bearing Area";
      els.fixedOuterSellPriceInput.value = item.sellPrice;
    } else if (side === "seal") {
      setFixedAreaOption("seal");
      els.fixedSealSellPriceInput.value = item.sellPrice;
    } else {
      if (!filledPrimaryOther) {
        setFixedAreaOption("other");
        els.fixedAreaInput.value = item.repairArea;
        els.fixedOtherAreaInput.value = item.repairArea;
        els.fixedOtherSellPriceInput.value = item.sellPrice;
        filledPrimaryOther = true;
      } else {
        addFixedOtherAreaRow(item.repairArea, item.sellPrice);
      }
    }
  });

  if (!els.fixedAreaInput.value && firstItem) {
    els.fixedAreaInput.value = "Bearing Area";
  }
}

function fixedRepairGroupFromItem(item) {
  if (!item) return null;
  return fixedRepairEditGroups().find((group) => group.id === fixedRepairEditGroupKey(item)) || null;
}

function openFixedRepairForm(item = null, showSelector = false) {
  els.fixedRepairForm.reset();
  editingFixedRepairIds = [];
  els.fixedRepairSelectSection.hidden = !showSelector;
  els.fixedRepairDialogTitle.textContent = showSelector || item ? "Edit Fixed Repair" : "Add Fixed Repair";
  els.saveFixedRepair.textContent = showSelector || item ? "Save changes" : "Save fixed repair";

  if (showSelector) {
    populateFixedRepairSelect();
  }
  if (item) {
    fillFixedRepairForm(fixedRepairGroupFromItem(item));
  }

  els.fixedRepairDialog.showModal();
  (showSelector ? els.fixedRepairSelect : els.fixedModelInput).focus();
}

function closeFixedRepairForm() {
  els.fixedRepairForm.reset();
  editingFixedRepairIds = [];
  els.fixedRepairDialog.close();
}

function selectedFixedRepairAreas() {
  const selectedOptions = [...document.querySelectorAll("[data-fixed-area-option]:checked")].map((option) => option.value);
  const detail = els.fixedAreaInput.value.trim();
  const structuredAreaOptions = selectedOptions.filter((option) => option !== "other");
  const otherArea = selectedOptions.includes("other") && !structuredAreaOptions.length && detail
    ? detail
    : els.fixedOtherAreaInput.value.trim();
  const extraOtherAreas = [...document.querySelectorAll("[data-fixed-extra-other-area]")].map((input) => {
    const row = input.closest("[data-fixed-other-row]");
    const priceInput = row?.querySelector("[data-fixed-extra-other-price]");
    return {
      key: `other-${input.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      areaKind: "other",
      repairArea: input.value.trim(),
      sellPrice: priceInput?.value.trim() === "" ? Number.NaN : Number(priceInput?.value)
    };
  }).filter((area) => area.repairArea || !Number.isNaN(area.sellPrice));

  if (!selectedOptions.length && !extraOtherAreas.length) return [];

  const innerOuterDetail = detail || "Bearing Area";
  const priceValue = (input) => input.value.trim() === "" ? Number.NaN : Number(input.value);
  const selectedAreas = selectedOptions
    .map((option) => {
      if (option === "inner") return { key: option, areaKind: option, repairArea: `Inner ${innerOuterDetail}`, sellPrice: priceValue(els.fixedInnerSellPriceInput) };
      if (option === "outer") return { key: option, areaKind: option, repairArea: `Outer ${innerOuterDetail}`, sellPrice: priceValue(els.fixedOuterSellPriceInput) };
      if (option === "seal") return { key: option, areaKind: option, repairArea: "Seal Area", sellPrice: priceValue(els.fixedSealSellPriceInput) };
      if (option === "other") return { key: `other-${otherArea.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, areaKind: "other", repairArea: otherArea, sellPrice: priceValue(els.fixedOtherSellPriceInput) };
      return null;
    })
    .filter(Boolean);

  return [...selectedAreas, ...extraOtherAreas];
}

function updatePreview() {
  const base = Number(els.baseCostInput.value) || 0;
  const percent = Number(els.sellPercentInput.value) || 0;
  const crackBase = Number(els.crackBaseCostInput.value) || 0;
  const crackPercent = Number(els.crackSellPercentInput.value) || 0;
  els.previewSellCost.textContent = `${money(sellCost(base, percent))} blast sell / ${money(sellCost(crackBase, crackPercent))} crack-test sell`;
}

function addQuoteItem(part, serviceType = "sandblast") {
  if (serviceType === "sandblast" && !hasPrice(part.baseCost)) return;
  if (serviceType === "crack-test" && part.crackTestBaseCost === null) return;

  const isCrackTest = serviceType === "crack-test";
  quoteItems.push({
    id: createId(),
    partId: part.id,
    serviceType,
    serviceLabel: isCrackTest ? "Crack-test" : "Sandblast",
    model: part.model,
    description: part.description,
    baseCost: isCrackTest ? part.crackTestBaseCost : part.baseCost,
    sellPercent: isCrackTest ? part.crackTestSellPercent : part.sellPercent,
    quantity: 1
  });
  render();
}

function addFixedQuoteItem(item) {
  quoteItems.push({
    id: createId(),
    partId: item.id,
    serviceType: "fixed-repair",
    serviceLabel: item.method,
    fixedPrice: true,
    model: item.model,
    description: `${item.item} - ${item.repairArea}`,
    baseCost: item.sellPrice,
    sellPercent: 0,
    quantity: 1
  });
  render();
}

function addFixedQuoteItems(items) {
  items.forEach((item) => {
    quoteItems.push({
      id: createId(),
      partId: item.id,
      serviceType: "fixed-repair",
      serviceLabel: item.method,
      fixedPrice: true,
      model: item.model,
      description: `${item.item} - ${item.repairArea}`,
      baseCost: item.sellPrice,
      sellPercent: 0,
      quantity: 1
    });
  });
  render();
}

function addManualFixedQuoteItem(label, price) {
  const sellPrice = Number(price) || 0;
  quoteItems.push({
    id: createId(),
    partId: label.toLowerCase().replaceAll(" ", "-"),
    serviceType: "manual-fixed",
    serviceLabel: label,
    fixedPrice: true,
    model: "",
    description: "",
    baseCost: sellPrice,
    sellPercent: 0,
    quantity: 1
  });
  render();
}

function addConsumablesQuoteItem(percent) {
  const selectedPercent = Number(percent) || 0;
  const currentTotal = quoteTotals().sell;

  if (!currentTotal) {
    alert("Add at least one quote item before adding consumables.");
    return;
  }

  addManualFixedQuoteItem(`Consumables ${formatPercent(selectedPercent)}`, currentTotal * (selectedPercent / 100));
}

function formatPercent(value) {
  return `${Number(value).toLocaleString("en-AU", { maximumFractionDigits: 2 })}%`;
}

function displayPartName(part) {
  return [part.model, part.description].filter(Boolean).join(" ");
}

function displayQuoteName(item) {
  return [item.serviceLabel, displayPartName(item)].filter(Boolean).join(" - ");
}

function percentOptionsHtml(currentValue) {
  const current = Number(currentValue) || 0;
  const options = [...new Set([...sellPercentOptions, current])].sort((a, b) => a - b);
  return options
    .map((value) => {
      const selected = value === current ? " selected" : "";
      return `<option value="${value}"${selected}>${formatPercent(value)}</option>`;
    })
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function quoteText() {
  const lines = quoteItems.map((item) => {
    return `${displayQuoteName(item)} x ${quoteQuantity(item)} - ${money(quoteLineTotal(item))}`;
  });
  lines.push(`Total: ${els.quoteSellTotal.textContent}`);
  return lines.join("\n");
}

function quoteTotals() {
  return quoteItems.reduce(
    (acc, item) => {
      const quantity = quoteQuantity(item);
      if (!item.fixedPrice) acc.base += Number(item.baseCost) * quantity;
      acc.sell += quoteLineTotal(item);
      return acc;
    },
    { base: 0, sell: 0 }
  );
}

function quoteItemRootName(item) {
  if (isThreadRepairQuoteItem(item)) return "Repair Threads";
  if (!item.model) return "";
  const description = (item.description || "").split(" - ")[0].trim();
  return [item.model, description].filter(Boolean).join(" ");
}

function quoteLineLabel(item) {
  if (isConsumablesItem(item)) return "Consumables";
  if (item.serviceType === "manual-fixed") return item.serviceLabel;
  if (item.serviceType === "sandblast") return "Sandblast";
  if (item.serviceType === "crack-test") return "Crack-test";
  if (isThreadRepairQuoteItem(item)) return "Repair Threads";

  const repairArea = (item.description || "").split(" - ").slice(1).join(" - ").trim();
  if (!repairArea) return item.serviceLabel;
  if (item.serviceLabel === "Laser Cladding") return `Laser Clad ${repairArea}`;
  if (item.serviceLabel === "Laser Cladding Package") return `Laser Clad Package ${repairArea}`;
  return `${item.serviceLabel} ${repairArea}`;
}

function isConsumablesItem(item) {
  return item.serviceType === "manual-fixed" && item.serviceLabel.startsWith("Consumables");
}

function buildQuoteSections() {
  const sections = [];
  let currentSection = null;

  quoteItems.forEach((item) => {
    const startsSection = item.serviceType === "manual-fixed" && item.serviceLabel === "Measure";

    if (isConsumablesItem(item)) {
      if (currentSection?.items.length) sections.push(currentSection);
      sections.push({ heading: "", items: [item], standalone: true });
      currentSection = null;
      return;
    }

    if (startsSection) {
      if (currentSection?.items.length) sections.push(currentSection);
      currentSection = { items: [] };
    }

    if (!currentSection) currentSection = { items: [] };
    currentSection.items.push(item);
  });

  if (currentSection?.items.length) sections.push(currentSection);

  return sections.map((section, index) => {
    if (section.standalone) return section;
    const headingSource = section.items.find((item) => quoteItemRootName(item));
    return {
      heading: headingSource ? quoteItemRootName(headingSource) : `Quote Item ${index + 1}`,
      items: section.items
    };
  });
}

function quoteSectionTotal(section) {
  return section.items.reduce((total, item) => total + quoteLineTotal(item), 0);
}

function buildQuotePrintHtml(oneValue = false) {
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + 30);
  const customerName = quoteMeta.customerName.trim();
  const initialQuoteNumber = quoteMeta.initialQuoteNumber.trim();
  const customerWorkOrder = quoteMeta.customerWorkOrder.trim();
  const quoteDocumentTitle = initialQuoteNumber ? `Quote ${initialQuoteNumber}` : "Quote";
  const totals = quoteTotals();
  const logoUrl = new URL("cgc-logo.png", window.location.href).href;
  const company = {
    name: "CGC Engineering",
    address: "56 May Holman Drive, Bassendean, Western Australia, 6054",
    email: "workshop@cgcengineering.com.au",
    phone: "08 9379 2000"
  };
  const rows = buildQuoteSections()
    .map((section) => {
      if (oneValue && !section.standalone && section.heading) {
        const sectionTotal = quoteSectionTotal(section);
        return `
          <tr>
            <td class="line-desc">${escapeHtml(section.heading)}</td>
            <td class="money">${money(sectionTotal)}</td>
            <td class="qty">1</td>
            <td class="money">${money(sectionTotal)}</td>
          </tr>
        `;
      }

      const sectionRows = section.items
        .map((item) => {
          const sell = quoteUnitSell(item);
          const quantity = quoteQuantity(item);
          const lineTotal = quoteLineTotal(item);
          const descClass = isConsumablesItem(item) ? "line-desc standalone-desc" : "line-desc";
          const rowClass = isConsumablesItem(item) ? ` class="standalone-row"` : "";
          return `
            <tr${rowClass}>
              <td class="${descClass}">${escapeHtml(quoteLineLabel(item))}</td>
              <td class="money">${money(sell)}</td>
              <td class="qty">${quantity}</td>
              <td class="money">${money(lineTotal)}</td>
            </tr>
          `;
        })
        .join("");
      if (section.standalone) {
        return sectionRows;
      }
      return `
        <tr class="group-row">
          <td colspan="4">${escapeHtml(section.heading)}</td>
        </tr>
        ${sectionRows}
      `;
    })
    .join("");

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(quoteDocumentTitle)}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            color: #05070a;
            font-family: Arial, Helvetica, sans-serif;
            background: #fff;
          }
          .screen-actions {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 10px 14px;
            background: #f3f6f8;
            border-bottom: 1px solid #d7e0e7;
          }
          .screen-actions button {
            min-height: 34px;
            padding: 7px 12px;
            border: 1px solid #ccd7e0;
            border-radius: 8px;
            color: #1d2730;
            background: #fff;
            font: 700 12px Arial, Helvetica, sans-serif;
            cursor: pointer;
          }
          .screen-actions button:first-child {
            color: #fff;
            border-color: #10756d;
            background: #10756d;
          }
          .quote-page {
            position: relative;
            min-height: 100vh;
            max-width: 860px;
            margin: 0 auto;
            padding: 54px 72px 42px;
            overflow: hidden;
            background:
              repeating-radial-gradient(ellipse at 18% -14%, rgba(14, 116, 144, 0.12) 0 1px, transparent 2px 9px),
              repeating-radial-gradient(ellipse at -15% 93%, rgba(5, 7, 10, 0.18) 0 1px, transparent 2px 10px),
              repeating-radial-gradient(ellipse at 112% 95%, rgba(5, 7, 10, 0.16) 0 1px, transparent 2px 10px),
              linear-gradient(#fff, #fff);
            background-size: 620px 240px, 280px 240px, 290px 250px, auto;
            background-position: left top, left bottom, right bottom, center;
            background-repeat: no-repeat;
          }
          .quote-head {
            display: grid;
            grid-template-columns: minmax(300px, 1fr) auto;
            gap: 42px;
            align-items: start;
            margin-bottom: 50px;
          }
          .brand {
            align-self: start;
          }
          .brand img {
            display: block;
            width: 285px;
            max-width: 100%;
            height: auto;
            margin: 0;
          }
          .meta {
            justify-self: end;
            min-width: 190px;
            padding-top: 10px;
            font-size: 12px;
          }
          .meta div {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            padding: 2px 0;
          }
          .meta strong {
            font-size: 14px;
          }
          .parties {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 70px;
            margin-bottom: 30px;
            font-size: 12px;
          }
          .party-title,
          .terms-title {
            display: block;
            margin-bottom: 4px;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
          }
          .party p,
          .terms p {
            margin: 0;
            line-height: 1.28;
          }
          .terms {
            margin: 0 0 24px;
            font-size: 12px;
            font-style: italic;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 0;
          }
          th,
          td {
            padding: 12px 0;
            border-bottom: 0;
            text-align: left;
            vertical-align: top;
            font-size: 12px;
          }
          th {
            padding-bottom: 10px;
            border-bottom: 3px solid #111827;
            color: #05070a;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
          }
          tbody tr:first-child td {
            padding-top: 22px;
          }
          .group-row td {
            padding: 18px 0 6px;
            color: #05070a;
            font-size: 13px;
            font-weight: 800;
          }
          .group-row:first-child td {
            padding-top: 22px;
          }
          .line-desc {
            padding-left: 18px;
          }
          .standalone-desc {
            padding-left: 0;
            font-weight: 700;
          }
          .standalone-row td {
            padding-top: 18px;
            border-top: 2px solid #111827;
          }
          .money {
            text-align: right;
            white-space: nowrap;
            font-variant-numeric: tabular-nums;
          }
          .qty {
            text-align: center;
            font-variant-numeric: tabular-nums;
          }
          .summary-area {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 240px;
            gap: 56px;
            margin-top: 18px;
            padding-top: 16px;
            border-top: 3px solid #111827;
          }
          .totals div {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            padding: 6px 0;
            font-size: 12px;
          }
          .totals div:last-child {
            margin-top: 10px;
            font-size: 14px;
            font-weight: 700;
          }
          .validity {
            margin: 0 0 8px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .notes {
            margin: 0;
            color: #05070a;
            font-size: 12px;
            line-height: 1.28;
          }
          .footer-mark {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 12px;
            color: #8b98a5;
            font-size: 9px;
            text-align: center;
          }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .screen-actions { display: none; }
            .quote-page {
              width: 210mm;
              min-height: 297mm;
              padding: 18mm 22mm 16mm;
            }
          }
        </style>
        <script>
          function textBytes(text) {
            return new TextEncoder().encode(text);
          }

          function concatBytes(chunks) {
            const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
            const output = new Uint8Array(total);
            let offset = 0;
            chunks.forEach((chunk) => {
              output.set(chunk, offset);
              offset += chunk.length;
            });
            return output;
          }

          function dataUrlToBytes(dataUrl) {
            const base64 = dataUrl.split(",")[1];
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
            return bytes;
          }

          function makePdfFromJpeg(jpegDataUrl, pageWidth, pageHeight) {
            const imageBytes = dataUrlToBytes(jpegDataUrl);
            const encoder = new TextEncoder();
            const contentStream = "q " + pageWidth + " 0 0 " + pageHeight + " 0 0 cm /Im0 Do Q";
            const contentBytes = encoder.encode(contentStream);
            const objects = [
              encoder.encode("1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n"),
              encoder.encode("2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n"),
              encoder.encode("3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + pageWidth + " " + pageHeight + "] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\\nendobj\\n"),
              concatBytes([
                encoder.encode("4 0 obj\\n<< /Type /XObject /Subtype /Image /Width " + pageWidth + " /Height " + pageHeight + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + imageBytes.length + " >>\\nstream\\n"),
                imageBytes,
                encoder.encode("\\nendstream\\nendobj\\n")
              ]),
              concatBytes([
                encoder.encode("5 0 obj\\n<< /Length " + contentBytes.length + " >>\\nstream\\n"),
                contentBytes,
                encoder.encode("\\nendstream\\nendobj\\n")
              ])
            ];
            const chunks = [encoder.encode("%PDF-1.4\\n")];
            const offsets = [0];
            let offset = chunks[0].length;
            objects.forEach((objectBytes) => {
              offsets.push(offset);
              chunks.push(objectBytes);
              offset += objectBytes.length;
            });
            const xrefOffset = offset;
            let xref = "xref\\n0 6\\n0000000000 65535 f \\n";
            for (let i = 1; i <= 5; i += 1) {
              xref += String(offsets[i]).padStart(10, "0") + " 00000 n \\n";
            }
            xref += "trailer\\n<< /Size 6 /Root 1 0 R >>\\nstartxref\\n" + xrefOffset + "\\n%%EOF";
            chunks.push(encoder.encode(xref));
            return new Blob(chunks, { type: "application/pdf" });
          }

          function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
            const words = String(text || "").split(/\\s+/).filter(Boolean);
            let line = "";
            let currentY = y;
            words.forEach((word) => {
              const testLine = line ? line + " " + word : word;
              if (ctx.measureText(testLine).width > maxWidth && line) {
                ctx.fillText(line, x, currentY);
                line = word;
                currentY += lineHeight;
              } else {
                line = testLine;
              }
            });
            if (line) ctx.fillText(line, x, currentY);
            return currentY + lineHeight;
          }

          async function downloadQuotePdf() {
            const pageWidth = 1240;
            const pageHeight = 1754;
            const canvas = document.createElement("canvas");
            canvas.width = pageWidth;
            canvas.height = pageHeight;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, pageWidth, pageHeight);
            ctx.fillStyle = "#05070a";
            ctx.font = "22px Arial";

            const logo = document.querySelector(".brand img");
            if (logo) {
              const img = new Image();
              img.src = logo.src;
              await img.decode().catch(() => {});
              if (img.complete) ctx.drawImage(img, 90, 70, 360, 150);
            }

            ctx.font = "700 26px Arial";
            ctx.fillText("INITIAL QUOTE #", 790, 85);
            ctx.fillText(document.querySelector(".meta div:nth-child(1) strong:last-child")?.textContent || "", 1040, 85);
            ctx.font = "20px Arial";
            const metaRows = [...document.querySelectorAll(".meta div")].slice(1);
            let metaY = 125;
            metaRows.forEach((row) => {
              const label = row.querySelector("span")?.textContent || "";
              const value = row.querySelector("strong")?.textContent || "";
              ctx.fillText(label, 790, metaY);
              ctx.font = "700 20px Arial";
              ctx.fillText(value, 1040, metaY);
              ctx.font = "20px Arial";
              metaY += 34;
            });

            ctx.font = "700 18px Arial";
            ctx.fillText("SENDER:", 90, 300);
            ctx.fillText("QUOTE TO:", 520, 300);
            ctx.font = "18px Arial";
            const parties = document.querySelectorAll(".party");
            [...(parties[0]?.querySelectorAll("p") || [])].forEach((p, index) => ctx.fillText(p.textContent, 90, 330 + index * 26));
            [...(parties[1]?.querySelectorAll("p") || [])].forEach((p, index) => ctx.fillText(p.textContent, 520, 330 + index * 26));

            let y = 455;
            ctx.font = "700 18px Arial";
            ctx.fillText("DESCRIPTION", 120, y);
            ctx.fillText("PRICE", 610, y);
            ctx.fillText("QTY", 810, y);
            ctx.fillText("AMOUNT", 1000, y);
            y += 24;
            ctx.strokeStyle = "#111827";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(120, y);
            ctx.lineTo(1120, y);
            ctx.stroke();
            y += 42;

            const rows = [...document.querySelectorAll("tbody tr")];
            rows.forEach((row) => {
              const cells = [...row.querySelectorAll("td")].map((cell) => cell.textContent.trim());
              if (row.classList.contains("group-row")) {
                ctx.font = "700 20px Arial";
                ctx.fillText(cells[0] || "", 120, y);
                y += 36;
                return;
              }
              ctx.font = row.classList.contains("standalone-row") ? "700 19px Arial" : "18px Arial";
              const nextY = drawWrappedText(ctx, cells[0] || "", row.classList.contains("standalone-row") ? 120 : 150, y, 420, 24);
              ctx.fillText(cells[1] || "", 610, y);
              ctx.fillText(cells[2] || "", 830, y);
              ctx.fillText(cells[3] || "", 1000, y);
              y = Math.max(nextY, y + 36);
            });

            y += 25;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(120, y);
            ctx.lineTo(1120, y);
            ctx.stroke();
            y += 42;

            const totalRows = [...document.querySelectorAll(".totals div")].map((row) => [...row.children].map((child) => child.textContent.trim()));
            ctx.font = "18px Arial";
            totalRows.forEach((row, index) => {
              if (index === totalRows.length - 1) ctx.font = "700 21px Arial";
              ctx.fillText(row[0] || "", 770, y);
              ctx.fillText(row[1] || "", 980, y);
              y += 34;
            });

            ctx.font = "700 18px Arial";
            ctx.fillText("Quote Valid For 30 Days", 120, 1540);
            ctx.font = "16px Arial";
            ctx.fillText("Prices shown in AUD and exclude GST unless otherwise stated.", 120, 1570);

            const pdfBlob = makePdfFromJpeg(canvas.toDataURL("image/jpeg", 0.92), pageWidth, pageHeight);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(pdfBlob);
            link.download = (document.title || "Quote") + ".pdf";
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href);
            link.remove();
          }
        </script>
      </head>
      <body>
        <div class="screen-actions" aria-label="Quote actions">
          <button type="button" onclick="downloadQuotePdf()">Save to PC</button>
          <button type="button" onclick="window.print()">Print</button>
        </div>
        <main class="quote-page">
          <header class="quote-head">
            <div class="brand" aria-label="${company.name}">
              <img src="${logoUrl}" alt="CGC Engineering">
            </div>
            <aside class="meta" aria-label="Quote details">
              <div><strong>INITIAL QUOTE #</strong><strong>${escapeHtml(initialQuoteNumber)}</strong></div>
              <div><span>Customer W/O #:</span><strong>${escapeHtml(customerWorkOrder)}</strong></div>
              <div><span>Date:</span><strong>${today.toLocaleDateString("en-AU")}</strong></div>
              <div><span>Valid Until:</span><strong>${validUntil.toLocaleDateString("en-AU")}</strong></div>
            </aside>
          </header>

          <section class="parties" aria-label="Quote parties">
            <div class="party">
              <span class="party-title">Sender:</span>
              <p>${company.name}</p>
              <p>${company.address}</p>
              <p>${company.email}</p>
              <p>${company.phone}</p>
            </div>
            <div class="party">
              <span class="party-title">Quote To:</span>
              <p>${escapeHtml(customerName || "Customer")}</p>
              <p>Project / Site</p>
            </div>
          </section>

          <section class="terms" aria-label="Payment terms">
            <span class="terms-title">Payment terms:</span>
            <p>As agreed. Prices shown in AUD and exclude GST unless otherwise stated.</p>
          </section>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th class="money">Price</th>
                <th class="qty">Qty</th>
                <th class="money">Amount</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>

          <section class="summary-area" aria-label="Quote totals and terms">
            <div>
              <p class="validity">Quote Valid For 30 Days</p>
              <p class="notes"><strong>Terms &amp; Conditions:</strong><br>Delivery timeline and scope to be confirmed after job inspection. Quote applies to the listed work only.</p>
            </div>
            <div class="totals">
              <div><span>Sub-Total</span><strong>${money(totals.sell)}</strong></div>
              <div><span>GST</span><strong>Excluded</strong></div>
              <div><span>TOTAL QUOTE</span><strong>${money(totals.sell)}</strong></div>
            </div>
          </section>

          <div class="footer-mark">Prepared by ${company.name}</div>
        </main>
      </body>
    </html>
  `;
}

function fixedPriceFileLabel(item) {
  if (isThreadRepairFixedItem(item)) return "Repair Threads";
  if (item.method === "Laser Cladding") return `Laser Clad ${item.repairArea}`;
  if (item.method === "Laser Cladding Package") return `Laser Clad Package ${item.repairArea}`;
  return `${item.method} ${item.repairArea}`;
}

function isThreadRepairFixedItem(item) {
  const model = String(item.model || "").trim().toUpperCase();
  const itemName = String(item.item || "").trim().toUpperCase();
  const repairArea = String(item.repairArea || "").trim().toUpperCase();
  const method = String(item.method || "").trim().toUpperCase();
  return (
    model === "THREAD REPAIRS" ||
    itemName === "THREAD REPAIRS" ||
    repairArea === "REPAIR THREADS" ||
    method === "REPAIR THREADS"
  );
}

function isThreadPriceFileEntry(entry) {
  return (
    String(entry.model || "").trim().toUpperCase() === "THREAD REPAIRS" ||
    String(entry.item || "").trim().toUpperCase() === "THREAD REPAIRS" ||
    entry.services.some((service) => service.label === "Repair Threads")
  );
}

function mergeThreadPriceFileEntries(entries) {
  const threadEntries = entries.filter(isThreadPriceFileEntry);
  const nonThreadEntries = entries.filter((entry) => !isThreadPriceFileEntry(entry));

  if (!threadEntries.length) return entries;

  const combinedThreadEntry = {
    model: "",
    item: "Thread Repairs",
    services: threadEntries.flatMap((entry) =>
      entry.services.map((service) => ({
        ...service,
        label: (() => {
          if (service.label !== "Repair Threads") return service.label;
          const modelName = priceFileModelName(entry.model);
          const itemName = priceFileItemName(entry.item);
          if (modelName === "THREAD REPAIRS" && itemName) return itemName;
          if (itemName === "Thread Repairs" && modelName) return modelName;
          return "Repair Threads";
        })()
      }))
    )
  };

  return [...nonThreadEntries, combinedThreadEntry];
}

function selectedPriceFileEntries() {
  const selectedIds = selectedComponentIds();
  const entriesByComponent = new Map();

  const selectedParts = parts
    .filter((part) => selectedIds.has(componentSelectionId(part.model, part.description)))
    .sort((a, b) => {
      const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
      return modelSort || a.description.localeCompare(b.description);
    });

  selectedParts.forEach((part) => {
    if (hasPrice(part.baseCost)) {
      addPriceFileOption(entriesByComponent, part.model, part.description, {
        label: "Sandblast",
        sellPrice: sellCost(part.baseCost, part.sellPercent)
      });
    }
    if (part.crackTestBaseCost !== null) {
      addPriceFileOption(entriesByComponent, part.model, part.description, {
        label: "Crack-test",
        sellPrice: sellCost(part.crackTestBaseCost, part.crackTestSellPercent)
      });
    } else {
      addPriceFileOption(entriesByComponent, part.model, part.description, {
        label: "Crack-test",
        priceLabel: "To Be Quoted"
      });
    }
  });

  fixedRepairItems
    .filter((item) => selectedIds.has(componentSelectionId(item.model, item.item)))
    .sort((a, b) => {
      const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
      const itemSort = a.item.localeCompare(b.item);
      return modelSort || itemSort || a.method.localeCompare(b.method) || fixedAreaSort(a.repairArea) - fixedAreaSort(b.repairArea) || a.repairArea.localeCompare(b.repairArea);
    })
    .forEach((item) => {
      addPriceFileOption(entriesByComponent, item.model, item.item, {
        label: fixedPriceFileLabel(item),
        sellPrice: item.sellPrice
      });
    });

  let entries = Array.from(entriesByComponent.values()).sort((a, b) => {
    const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
    return modelSort || a.item.localeCompare(b.item);
  });

  entries.forEach((entry) => {
    if (isThreadPriceFileEntry(entry)) {
      entry.services = entry.services.map((service) =>
        service.label === "Repair Threads"
          ? { ...service, note: "Discount applies to higher thread quantities." }
          : service
      );
      return;
    }
    entry.services.push({ label: "Weld Repairs", priceLabel: "To Be Quoted" });
    entry.services.push({ label: "Clean & Pack", sellPrice: addOnPrices.cleanPack ?? 247.5 });
  });

  entries = mergeThreadPriceFileEntries(entries).sort((a, b) => {
    const threadOrder = Number(isThreadPriceFileEntry(a)) - Number(isThreadPriceFileEntry(b));
    if (threadOrder !== 0) return threadOrder;
    const modelSort = a.model.localeCompare(b.model, undefined, { numeric: true });
    return modelSort || a.item.localeCompare(b.item);
  });

  return entries;
}

function buildPriceFileHtml() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const priceFileTitle = `Price current of ${currentYear}`;
  const logoUrl = new URL("cgc-logo.png", window.location.href).href;
  const company = {
    name: "CGC Engineering",
    address: "56 May Holman Drive, Bassendean, Western Australia, 6054",
    email: "workshop@cgcengineering.com.au",
    phone: "08 9379 2000"
  };
  const entries = selectedPriceFileEntries();
  const rows = entries
    .map((entry) => {
      const serviceRows = entry.services
        .map((service) => `
          <tr class="service-row">
            <td class="service-cell">
              <span class="service-bullet"></span>
              <span>${escapeHtml(service.label)}</span>
            </td>
            <td class="money">
              <span>${service.priceLabel ? escapeHtml(service.priceLabel) : money(service.sellPrice)}</span>
              ${service.note ? `<span class="service-note">${escapeHtml(service.note)}</span>` : ""}
            </td>
          </tr>
        `)
        .join("");
      return `
        <tr class="component-row">
          <td colspan="2">${escapeHtml(`${entry.model} ${entry.item}`)}</td>
        </tr>
        ${serviceRows}
      `;
    })
    .join("");

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(priceFileTitle)}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
            background: #fff;
          }
          .screen-actions {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 10px 14px;
            background: #f3f6f8;
            border-bottom: 1px solid #d7e0e7;
          }
          .screen-actions button {
            min-height: 34px;
            padding: 7px 12px;
            border: 1px solid #ccd7e0;
            border-radius: 8px;
            color: #1d2730;
            background: #fff;
            font: 700 12px Arial, Helvetica, sans-serif;
            cursor: pointer;
          }
          .screen-actions button:first-child {
            color: #fff;
            border-color: #10756d;
            background: #10756d;
          }
          .price-page {
            position: relative;
            min-height: 100vh;
            max-width: 860px;
            margin: 0 auto;
            padding: 48px 68px 40px;
            background:
              repeating-radial-gradient(ellipse at 12% -12%, rgba(14, 116, 144, 0.11) 0 1px, transparent 2px 9px),
              repeating-radial-gradient(ellipse at 112% 105%, rgba(5, 7, 10, 0.14) 0 1px, transparent 2px 10px),
              linear-gradient(#fff, #fff);
            background-size: 620px 220px, 290px 250px, auto;
            background-position: left top, right bottom, center;
            background-repeat: no-repeat;
          }
          .price-head {
            display: grid;
            grid-template-columns: minmax(300px, 1fr) auto;
            gap: 42px;
            align-items: start;
            margin-bottom: 34px;
          }
          .brand img {
            display: block;
            width: 285px;
            max-width: 100%;
            height: auto;
          }
          .meta {
            min-width: 190px;
            padding-top: 10px;
            font-size: 12px;
          }
          .meta div {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 2px 0;
          }
          .meta strong { font-size: 14px; }
          .intro {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            margin-bottom: 28px;
            font-size: 12px;
          }
          .intro-title {
            display: block;
            margin-bottom: 5px;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
          }
          .intro p {
            margin: 0;
            line-height: 1.32;
          }
          h1 {
            margin: 0 0 18px;
            font-size: 22px;
            letter-spacing: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            padding: 11px 0;
            font-size: 12px;
            text-align: left;
            vertical-align: top;
          }
          th {
            border-bottom: 3px solid #111827;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
          }
          .component-row td {
            padding: 20px 0 8px;
            color: #111827;
            font-size: 13px;
            font-weight: 800;
            border-bottom: 1px solid #d9e1e7;
          }
          .component-row:first-child td {
            padding-top: 16px;
          }
          .service-cell {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding-left: 18px;
          }
          .service-row td {
            border-bottom: 1px solid #edf1f4;
          }
          .service-bullet {
            width: 6px;
            height: 6px;
            margin-top: 5px;
            border-radius: 999px;
            background: #10756d;
            flex: 0 0 auto;
          }
          .money {
            width: 150px;
            text-align: right;
            white-space: nowrap;
            font-variant-numeric: tabular-nums;
          }
          .money span {
            display: block;
          }
          .service-note {
            margin-top: 4px;
            color: #5b6875;
            font-size: 10px;
            font-weight: 600;
            white-space: normal;
          }
          .notes {
            margin-top: 28px;
            padding-top: 16px;
            border-top: 3px solid #111827;
            font-size: 12px;
            line-height: 1.35;
          }
          .notes strong {
            text-transform: uppercase;
          }
          .footer-mark {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 12px;
            color: #8b98a5;
            font-size: 9px;
            text-align: center;
          }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .screen-actions { display: none; }
            .price-page {
              width: 210mm;
              min-height: 297mm;
              padding: 18mm 22mm 16mm;
            }
          }
        </style>
        <script>
          function textBytes(text) {
            return new TextEncoder().encode(text);
          }

          function concatBytes(chunks) {
            const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
            const output = new Uint8Array(total);
            let offset = 0;
            chunks.forEach((chunk) => {
              output.set(chunk, offset);
              offset += chunk.length;
            });
            return output;
          }

          function dataUrlToBytes(dataUrl) {
            const base64 = dataUrl.split(",")[1] || "";
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let index = 0; index < binary.length; index += 1) {
              bytes[index] = binary.charCodeAt(index);
            }
            return bytes;
          }

          function makePdfFromJpeg(dataUrl, width, height) {
            const jpegBytes = dataUrlToBytes(dataUrl);
            const objects = [];
            const encoder = new TextEncoder();
            objects.push(encoder.encode("1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n"));
            objects.push(encoder.encode("2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n"));
            objects.push(
              encoder.encode(
                "3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + width + " " + height + "] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\\nendobj\\n"
              )
            );
            objects.push(
              concatBytes([
                encoder.encode(
                  "4 0 obj\\n<< /Type /XObject /Subtype /Image /Width " +
                    width +
                    " /Height " +
                    height +
                    " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " +
                    jpegBytes.length +
                    " >>\\nstream\\n"
                ),
                jpegBytes,
                encoder.encode("\\nendstream\\nendobj\\n")
              ])
            );
            const content = encoder.encode("q\\n" + width + " 0 0 " + height + " 0 0 cm\\n/Im0 Do\\nQ\\n");
            objects.push(
              concatBytes([
                encoder.encode("5 0 obj\\n<< /Length " + content.length + " >>\\nstream\\n"),
                content,
                encoder.encode("endstream\\nendobj\\n")
              ])
            );
            let offset = 0;
            const chunks = [encoder.encode("%PDF-1.4\\n")];
            offset += chunks[0].length;
            const offsets = [0];
            objects.forEach((object) => {
              offsets.push(offset);
              chunks.push(object);
              offset += object.length;
            });
            const xrefOffset = offset;
            let xref = "xref\\n0 6\\n0000000000 65535 f \\n";
            for (let index = 1; index <= 5; index += 1) {
              xref += String(offsets[index]).padStart(10, "0") + " 00000 n \\n";
            }
            xref += "trailer\\n<< /Size 6 /Root 1 0 R >>\\nstartxref\\n" + xrefOffset + "\\n%%EOF";
            chunks.push(encoder.encode(xref));
            return new Blob(chunks, { type: "application/pdf" });
          }

          function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
            const words = String(text || "").split(/\\s+/).filter(Boolean);
            let line = "";
            let currentY = y;
            words.forEach((word) => {
              const testLine = line ? line + " " + word : word;
              if (ctx.measureText(testLine).width > maxWidth && line) {
                ctx.fillText(line, x, currentY);
                line = word;
                currentY += lineHeight;
              } else {
                line = testLine;
              }
            });
            if (line) ctx.fillText(line, x, currentY);
            return currentY + lineHeight;
          }

          async function downloadPriceFilePdf() {
            const pageWidth = 1240;
            const pageHeight = 1754;
            const canvas = document.createElement("canvas");
            canvas.width = pageWidth;
            canvas.height = pageHeight;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, pageWidth, pageHeight);
            ctx.fillStyle = "#111827";

            const logo = document.querySelector(".brand img");
            if (logo) {
              const img = new Image();
              img.src = logo.src;
              await img.decode().catch(() => {});
              if (img.complete) ctx.drawImage(img, 90, 70, 360, 150);
            }

            ctx.font = "700 26px Arial";
            ctx.fillText("PRICE CURRENT OF", 720, 85);
            ctx.fillText(document.querySelector(".meta div:nth-child(1) strong:last-child")?.textContent || "", 1030, 85);
            ctx.font = "20px Arial";
            ctx.fillText(document.querySelector(".meta div:nth-child(2) span")?.textContent || "", 790, 125);
            ctx.font = "700 20px Arial";
            ctx.fillText(document.querySelector(".meta div:nth-child(2) strong")?.textContent || "", 1030, 125);

            ctx.font = "700 18px Arial";
            ctx.fillText("SENDER:", 90, 290);
            ctx.fillText("PREPARED FOR:", 520, 290);
            ctx.font = "18px Arial";
            const introBlocks = document.querySelectorAll(".intro > div");
            [...(introBlocks[0]?.querySelectorAll("p") || [])].forEach((p, index) => ctx.fillText(p.textContent, 90, 320 + index * 26));
            [...(introBlocks[1]?.querySelectorAll("p") || [])].forEach((p, index) => ctx.fillText(p.textContent, 520, 320 + index * 26));

            ctx.font = "700 26px Arial";
            ctx.fillText(document.querySelector("h1")?.textContent || "Component Price File", 90, 450);

            let y = 505;
            ctx.font = "700 18px Arial";
            ctx.fillText("DESCRIPTION", 120, y);
            ctx.fillText("SELL PRICE", 930, y);
            y += 24;
            ctx.strokeStyle = "#111827";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(120, y);
            ctx.lineTo(1120, y);
            ctx.stroke();
            y += 42;

            const rows = [...document.querySelectorAll("tbody tr")];
            rows.forEach((row) => {
              const cells = [...row.querySelectorAll("td")].map((cell) => cell.textContent.trim());
              if (row.classList.contains("component-row")) {
                ctx.font = "700 20px Arial";
                ctx.fillText(cells[0] || "", 120, y);
                y += 36;
                return;
              }
              ctx.font = "18px Arial";
              const nextY = drawWrappedText(ctx, cells[0] || "", 150, y, 620, 24);
              drawWrappedText(ctx, cells[1] || "", 900, y, 220, 24);
              y = Math.max(nextY, y + 36);
            });

            y += 22;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(120, y);
            ctx.lineTo(1120, y);
            ctx.stroke();
            y += 34;
            ctx.font = "16px Arial";
            drawWrappedText(
              ctx,
              "Prices shown in AUD and exclude GST unless otherwise stated. This price file only includes selected sell prices and does not show base costs.",
              120,
              y,
              820,
              22
            );

            const pdfBlob = makePdfFromJpeg(canvas.toDataURL("image/jpeg", 0.92), pageWidth, pageHeight);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(pdfBlob);
            link.download = (document.title || "Price File") + ".pdf";
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href);
            link.remove();
          }
        </script>
      </head>
      <body>
        <div class="screen-actions" aria-label="Price file actions">
          <button type="button" onclick="downloadPriceFilePdf()">Save to PC</button>
          <button type="button" onclick="window.print()">Print</button>
        </div>
        <main class="price-page">
          <header class="price-head">
            <div class="brand" aria-label="${company.name}">
              <img src="${logoUrl}" alt="CGC Engineering">
            </div>
            <aside class="meta" aria-label="Price file details">
              <div><strong>PRICE CURRENT OF</strong><strong>${currentYear}</strong></div>
              <div><span>Date:</span><strong>${today.toLocaleDateString("en-AU")}</strong></div>
            </aside>
          </header>

          <section class="intro" aria-label="Price file details">
            <div>
              <span class="intro-title">Sender:</span>
              <p>${company.name}</p>
              <p>${company.address}</p>
              <p>${company.email}</p>
              <p>${company.phone}</p>
            </div>
            <div>
              <span class="intro-title">Prepared For:</span>
              <p>Customer</p>
              <p>Selected component pricing</p>
            </div>
          </section>

          <h1>Component Price File</h1>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th class="money">Sell Price</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>

          <section class="notes">
            <p><strong>Notes:</strong><br>Prices shown in AUD and exclude GST unless otherwise stated. This price file is subject to change at any time and any other works is subject to quote.</p>
          </section>

          <div class="footer-mark">Prepared by ${company.name}</div>
        </main>
      </body>
    </html>
  `;
}

function printProfessionalQuote(autoPrint = false, oneValue = false) {
  if (!quoteItems.length) {
    alert("Add at least one item to the quote before printing.");
    return;
  }

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow pop-ups for this page so the quote can open and print.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildQuotePrintHtml(oneValue));
  printWindow.document.close();
  printWindow.focus();
  if (autoPrint) {
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}

function printPriceFile() {
  addOnPrices.cleanPack = Number(els.cleanPackPrice.value) || 0;
  addOnPrices.weldRepairs = weldRepairsCalculatedPrice();

  if (!selectedPriceFileIds.size) {
    alert("Select at least one part before generating a price file.");
    return;
  }

  if (!selectedPriceFileEntries().length) {
    alert("The selected lines do not have sell prices to include.");
    return;
  }

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow pop-ups for this page so the price file can open and print.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildPriceFileHtml());
  printWindow.document.close();
  printWindow.focus();
}

els.openPartForm.addEventListener("click", () => openForm());
els.closePartForm.addEventListener("click", closeForm);
els.cancelPartForm.addEventListener("click", closeForm);
els.openFixedRepairForm.addEventListener("click", () => openFixedRepairForm());
els.openFixedRepairEditForm.addEventListener("click", () => openFixedRepairForm(null, true));
els.closeFixedRepairForm.addEventListener("click", closeFixedRepairForm);
els.cancelFixedRepairForm.addEventListener("click", closeFixedRepairForm);
els.addFixedOtherArea.addEventListener("click", () => {
  const row = addFixedOtherAreaRow();
  row.querySelector("[data-fixed-extra-other-area]")?.focus();
});
els.fixedOtherAreaList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-fixed-other]");
  if (!button) return;
  button.closest("[data-fixed-other-row]")?.remove();
});
els.fixedRepairSelect.addEventListener("change", () => {
  const group = fixedRepairEditGroups().find((fixedGroup) => fixedGroup.id === els.fixedRepairSelect.value);
  fillFixedRepairForm(group || null);
});
els.partSearch.addEventListener("input", renderParts);
els.fixedSearch.addEventListener("input", renderFixedItems);
els.selectAllPriceFile.addEventListener("click", () => {
  selectedPriceFileIds = new Set(allPriceFileSelectionIds());
  renderPriceFileOptions();
  updatePriceFileSelectionCount();
});
els.clearPriceFileSelection.addEventListener("click", () => {
  selectedPriceFileIds.clear();
  renderPriceFileOptions();
  updatePriceFileSelectionCount();
});
els.savePricingChanges?.addEventListener("click", savePricingChangesNow);
els.generatePriceFile.addEventListener("click", printPriceFile);
els.priceFileSearch.addEventListener("input", renderPriceFileOptions);
els.yearlyIncrease.addEventListener("click", applyYearlyIncrease);
els.reverseYearlyIncrease.addEventListener("click", reverseLastYearlyIncrease);
els.priceFileOptions.addEventListener("change", (event) => {
  const modelOption = event.target.closest("input[data-price-file-model]");
  if (modelOption) {
    const model = modelOption.dataset.priceFileModel;
    const modelId = modelSelectionId(model);
    const componentIds = priceFileOptionGroups()
      .filter((group) => group.model === model)
      .map((group) => group.id);

    if (modelOption.checked) {
      selectedPriceFileIds.add(modelId);
      componentIds.forEach((id) => selectedPriceFileIds.add(id));
    } else {
      selectedPriceFileIds.delete(modelId);
      componentIds.forEach((id) => selectedPriceFileIds.delete(id));
    }
    renderPriceFileOptions();
    updatePriceFileSelectionCount();
    return;
  }

  const option = event.target.closest("input[data-price-file-id]");
  if (!option) return;

  if (option.checked) {
    selectedPriceFileIds.add(option.dataset.priceFileId);
  } else {
    selectedPriceFileIds.delete(option.dataset.priceFileId);
    const group = priceFileOptionGroups().find((item) => item.id === option.dataset.priceFileId);
    if (group) selectedPriceFileIds.delete(modelSelectionId(group.model));
  }
  renderPriceFileOptions();
  updatePriceFileSelectionCount();
});
els.partsToggleAll.addEventListener("click", () => {
  const query = els.partSearch.value.trim().toLowerCase();
  const models = [
    ...new Set(
      parts
        .filter((part) => `${part.model} ${part.description}`.toLowerCase().includes(query))
        .map((part) => part.model)
    )
  ];
  toggleAllModels("parts", models);
  renderParts();
});
els.fixedToggleAll.addEventListener("click", () => {
  const query = els.fixedSearch.value.trim().toLowerCase();
  const models = [
    ...new Set(
      groupFixedRepairItems(
        fixedRepairItems.filter((item) =>
          `${item.model} ${item.item} ${item.repairArea} ${item.method}`.toLowerCase().includes(query)
        )
      ).map((group) => group.model)
    )
  ];
  toggleAllModels("fixed", models);
  renderFixedItems();
});
els.descriptionInput.addEventListener("blur", () => {
  if (els.modelInput.value.trim()) return;

  const model = extractModel(els.descriptionInput.value);
  if (model !== "Other") {
    els.modelInput.value = model;
    els.descriptionInput.value = stripModel(els.descriptionInput.value, model);
  }
});
els.baseCostInput.addEventListener("input", updatePreview);
els.sellPercentInput.addEventListener("input", updatePreview);
els.crackBaseCostInput.addEventListener("input", updatePreview);
els.crackSellPercentInput.addEventListener("input", updatePreview);

els.partForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = els.editingPartId.value || createId();
  const model = els.modelInput.value.trim().toUpperCase();
  const description = els.descriptionInput.value.trim();
  const crackBaseValue = els.crackBaseCostInput.value.trim();
  const nextPart = {
    id,
    model,
    description,
    baseCost: Number(els.baseCostInput.value),
    sellPercent: Number(els.sellPercentInput.value),
    crackTestBaseCost: crackBaseValue === "" ? null : Number(crackBaseValue),
    crackTestSellPercent: Number(els.crackSellPercentInput.value) || 0
  };

  if (!nextPart.model || !nextPart.description) return;

  const existingIndex = parts.findIndex((part) => part.id === id);
  if (existingIndex >= 0) {
    parts[existingIndex] = nextPart;
  } else {
    parts.push(nextPart);
  }

  closeForm();
  render();
  queueSharedPricingSave();
});

els.fixedRepairForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const model = els.fixedModelInput.value.trim().toUpperCase();
  const item = els.fixedItemInput.value.trim();
  const repairAreas = selectedFixedRepairAreas();
  const method = els.fixedMethodInput.value.trim();

  if (!model || !item || !repairAreas.length || !method) {
    alert("Add at least one repair area before saving.");
    return;
  }

  const invalidArea = repairAreas.find((area) => !area.repairArea || Number.isNaN(area.sellPrice));
  if (invalidArea) {
    alert("Each selected repair area needs a name and its own sell price.");
    return;
  }

  const existingEditedIdsByArea = new Map(
    fixedRepairItems
      .filter((fixedItem) => editingFixedRepairIds.includes(fixedItem.id))
      .map((fixedItem) => [fixedAreaIdentityKey(fixedItem), fixedItem.id])
  );

  fixedRepairItems = fixedRepairItems.filter((fixedItem) => !editingFixedRepairIds.includes(fixedItem.id));
  repairAreas.forEach((area) => fixedRepairItems.push({
    id: existingEditedIdsByArea.get(area.key) || `manual-fixed-${createId()}-${area.repairArea.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    model,
    item,
    repairArea: area.repairArea,
    areaKind: area.areaKind || area.key,
    method,
    sellPrice: area.sellPrice
  }));

  closeFixedRepairForm();
  render();
  queueSharedPricingSave();
});

els.partsTable.addEventListener("change", (event) => {
  const blastBaseInput = event.target.closest("input[data-blast-base]");
  if (blastBaseInput) {
    const part = parts.find((item) => item.id === blastBaseInput.dataset.blastBase);
    if (!part) return;

    part.baseCost = blastBaseInput.value === "" ? null : Number(blastBaseInput.value);
    render();
    queueSharedPricingSave();
    return;
  }

  const crackBaseInput = event.target.closest("input[data-crack-base]");
  if (crackBaseInput) {
    const part = parts.find((item) => item.id === crackBaseInput.dataset.crackBase);
    if (!part) return;

    part.crackTestBaseCost = crackBaseInput.value === "" ? null : Number(crackBaseInput.value);
    render();
    queueSharedPricingSave();
    return;
  }

  const blastSelect = event.target.closest("select[data-part-percent]");
  const crackSelect = event.target.closest("select[data-crack-percent]");
  const select = blastSelect || crackSelect;
  if (!select) return;

  const part = parts.find((item) => item.id === (select.dataset.partPercent || select.dataset.crackPercent));
  if (!part) return;

  if (blastSelect) {
    part.sellPercent = Number(select.value) || 0;
  } else {
    part.crackTestSellPercent = Number(select.value) || 0;
  }
  render();
  queueSharedPricingSave();
});

els.partsTable.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle-model]");
  if (toggle) {
    toggleModel(toggle.dataset.tableKey, toggle.dataset.toggleModel);
    renderParts();
    return;
  }

  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const part = parts.find((item) => item.id === button.dataset.id);
  if (!part) return;

  if (button.dataset.action === "quote-sandblast") {
    addQuoteItem(part, "sandblast");
  }

  if (button.dataset.action === "quote-crack") {
    addQuoteItem(part, "crack-test");
  }

  if (button.dataset.action === "edit") {
    openForm(part);
  }

  if (button.dataset.action === "delete" && confirm(`Delete ${part.description}?`)) {
    parts = parts.filter((item) => item.id !== part.id);
    render();
    queueSharedPricingSave();
  }
});

els.fixedTable.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle-model]");
  if (toggle) {
    toggleModel(toggle.dataset.tableKey, toggle.dataset.toggleModel);
    renderFixedItems();
    return;
  }

  const button = event.target.closest("button[data-action='quote-fixed-set']");
  if (!button) return;

  const itemIds = button.dataset.fixedIds.split(",");
  const items = itemIds
    .map((id) => fixedRepairItems.find((fixedItem) => fixedItem.id === id))
    .filter(Boolean);
  if (!items.length) return;

  addFixedQuoteItems(items);
});

els.quoteList.addEventListener("change", (event) => {
  const percentInput = event.target.closest("[data-quote-percent]");
  const priceInput = event.target.closest("[data-quote-fixed-price]");
  const quantityInput = event.target.closest("[data-quote-quantity]");

  if (quantityInput) {
    const quoteItem = quoteItems.find((item) => item.id === quantityInput.dataset.quoteQuantity);
    if (!quoteItem) return;

    quoteItem.quantity = Math.max(1, Math.floor(Number(quantityInput.value) || 1));
    renderQuote();
    save();
    return;
  }

  if (percentInput) {
    const quoteItem = quoteItems.find((item) => item.id === percentInput.dataset.quotePercent);
    if (!quoteItem) return;

    quoteItem.sellPercent = Number(percentInput.value) || 0;
    renderQuote();
    save();
    return;
  }

  if (priceInput) {
    const quoteItem = quoteItems.find((item) => item.id === priceInput.dataset.quoteFixedPrice);
    if (!quoteItem) return;

    quoteItem.baseCost = Number(priceInput.value) || 0;
    quoteItem.sellPercent = 0;
    renderQuote();
    save();
  }
});

els.quoteList.addEventListener("click", (event) => {
  const editPriceButton = event.target.closest("button[data-quote-price-edit]");
  if (editPriceButton) {
    editingFixedPriceId = editPriceButton.dataset.quotePriceEdit;
    renderQuote();
    return;
  }

  const donePriceButton = event.target.closest("button[data-quote-price-done]");
  if (donePriceButton) {
    editingFixedPriceId = "";
    renderQuote();
    return;
  }

  const button = event.target.closest("button[data-quote-remove]");
  if (!button) return;

  if (button.dataset.quoteRemove === editingFixedPriceId) editingFixedPriceId = "";
  quoteItems = quoteItems.filter((item) => item.id !== button.dataset.quoteRemove);
  render();
});

els.clearQuote.addEventListener("click", () => {
  if (!quoteItems.length) return;
  quoteItems = [];
  render();
});

els.oneValueQuote.addEventListener("click", () => {
  printProfessionalQuote(false, true);
});

els.copyQuote.addEventListener("click", () => {
  printProfessionalQuote(false, false);
});

els.measurePrice.value = addOnPrices.measure ?? 165;
els.additionalPrice.value = addOnPrices.additional ?? 0;
els.weldRepairsPrice.value = addOnPrices.weldRepairs ?? 0;
els.weldRepairsHours.value = addOnPrices.weldRepairsHours ?? "";
els.reCracktestPrice.value = addOnPrices.reCracktest ?? defaultAddOnPrices.reCracktest;
els.cleanPackPrice.value = addOnPrices.cleanPack ?? 247.5;
els.deliveryPrice.value = addOnPrices.delivery ?? 150;
els.consumablesPercent.value = addOnPrices.consumablesPercent ?? 5;
els.customerName.value = quoteMeta.customerName ?? "";
els.initialQuoteNumber.value = quoteMeta.initialQuoteNumber ?? "";
els.customerWorkOrder.value = quoteMeta.customerWorkOrder ?? "";

els.customerName.addEventListener("input", () => {
  quoteMeta.customerName = els.customerName.value.trim();
  save();
});

els.initialQuoteNumber.addEventListener("input", () => {
  quoteMeta.initialQuoteNumber = els.initialQuoteNumber.value.trim();
  save();
});

els.customerWorkOrder.addEventListener("input", () => {
  quoteMeta.customerWorkOrder = els.customerWorkOrder.value.trim();
  save();
});

els.measurePrice.addEventListener("change", () => {
  addOnPrices.measure = Number(els.measurePrice.value) || 0;
  save();
});

els.additionalPrice.addEventListener("change", () => {
  addOnPrices.additional = Number(els.additionalPrice.value) || 0;
  save();
});

els.weldRepairsPrice.addEventListener("change", () => {
  addOnPrices.weldRepairs = Number(els.weldRepairsPrice.value) || 0;
  renderPriceFileOptions();
  save();
});

els.weldRepairsHours.addEventListener("input", () => {
  addOnPrices.weldRepairsHours = els.weldRepairsHours.value;
  if (els.weldRepairsHours.value !== "" && Number(els.weldRepairsHours.value) >= 0) {
    const calculated = roundMoneyValue(Number(els.weldRepairsHours.value) * weldRepairsHourlyRate);
    els.weldRepairsPrice.value = calculated.toFixed(2);
    addOnPrices.weldRepairs = calculated;
    renderPriceFileOptions();
  }
  save();
});

els.reCracktestPrice.addEventListener("change", () => {
  addOnPrices.reCracktest = Number(els.reCracktestPrice.value) || 0;
  save();
});

els.cleanPackPrice.addEventListener("change", () => {
  addOnPrices.cleanPack = Number(els.cleanPackPrice.value) || 0;
  renderPriceFileOptions();
  save();
});

els.deliveryPrice.addEventListener("change", () => {
  addOnPrices.delivery = Number(els.deliveryPrice.value) || 0;
  save();
});

els.consumablesPercent.addEventListener("change", () => {
  addOnPrices.consumablesPercent = Number(els.consumablesPercent.value) || 5;
  save();
});

els.addMeasure.addEventListener("click", () => {
  addOnPrices.measure = Number(els.measurePrice.value) || 0;
  addManualFixedQuoteItem("Measure", addOnPrices.measure);
});

els.addAdditionalItem.addEventListener("click", () => {
  const description = els.additionalDescription.value.trim();
  if (!description) {
    alert("Add a description for the additional item or repair.");
    els.additionalDescription.focus();
    return;
  }
  addOnPrices.additional = Number(els.additionalPrice.value) || 0;
  addManualFixedQuoteItem(description, addOnPrices.additional);
});

els.addWeldRepairs.addEventListener("click", () => {
  addOnPrices.weldRepairs = weldRepairsCalculatedPrice();
  addOnPrices.weldRepairsHours = els.weldRepairsHours.value;
  els.weldRepairsPrice.value = addOnPrices.weldRepairs.toFixed(2);
  addManualFixedQuoteItem("Weld Repairs", addOnPrices.weldRepairs);
});

els.addReCracktest.addEventListener("click", () => {
  addOnPrices.reCracktest = Number(els.reCracktestPrice.value) || 0;
  addManualFixedQuoteItem("Re-cracktest", addOnPrices.reCracktest);
});

els.addCleanPack.addEventListener("click", () => {
  addOnPrices.cleanPack = Number(els.cleanPackPrice.value) || 0;
  addManualFixedQuoteItem("Clean & Pack", addOnPrices.cleanPack);
});

els.addDelivery.addEventListener("click", () => {
  addOnPrices.delivery = Number(els.deliveryPrice.value) || 0;
  addManualFixedQuoteItem("Delivery", addOnPrices.delivery);
});

els.addConsumables.addEventListener("click", () => {
  addOnPrices.consumablesPercent = Number(els.consumablesPercent.value) || 5;
  addConsumablesQuoteItem(addOnPrices.consumablesPercent);
});

initializeLogin();
