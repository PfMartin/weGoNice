import User from "../models/User.js";
import Measure from "../models/Measure.js";

export const createUsers = async () => {
  await User.create({
    firstName: "Martin",
    lastName: "Pfatrisch",
    userName: "martin",
  });

  await User.create({
    userName: "lea",
    firstName: "Lea",
    lastName: "Haberl",
  });

  console.log("Done.");
};

/**
 * Creates time measures for select fields
 * @return {Promise}
 */
export const createMeasures = async () => {
  await Measure.create({
    title: "Seconds",
    abbreviation: "sec",
    category: "time",
  });

  await Measure.create({
    title: "Minutes",
    abbreviation: "min",
    category: "time",
  });

  await Measure.create({
    title: "Hours",
    abbreviation: "h",
    category: "time",
  });

  console.log("Done.");
};
