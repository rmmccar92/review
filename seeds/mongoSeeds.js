const axios = require("axios");

const db = require("../config/connection");
const { Peep, User } = require("../models");

async function getPeeps() {
  return await axios.get("https://randomuser.me/api/?results=10");
}

const structureData = (data) => {
  return {
    title: data.name.title,
    first: data.name.first,
    last: data.name.last,
    number: data.location.street.number,
    name: data.location.street.name,
    city: data.location.city,
    state: data.location.state,
    country: data.location.country,
    postcode: data.location.postcode,
    gender: data.gender,
    email: data.email,
    phone: data.phone,
    cell: data.cell,
    nat: data.nat,
    latitude: data.location.coordinates.latitude,
    longitude: data.location.coordinates.longitude,
    offset: data.location.timezone.offset,
    description: data.location.timezone.description,
    uuid: data.login.uuid,
    username: data.login.username,
    password: data.login.password,
    salt: data.login.salt,
    md5: data.login.md5,
    sha1: data.login.sha1,
    sha256: data.login.sha256,
    date: data.dob.date,
    age: data.dob.age,
    large: data.picture.large,
    medium: data.picture.medium,
    thumbnail: data.picture.thumbnail,
  };
};
db.once("open", async () => {
  try {
    await Peep.deleteMany();
    await User.deleteMany();

    const { data } = await getPeeps();
    const results = data.results.map((dr) => structureData(dr));
    // console.log(results);
    const newPeeps = await Peep.insertMany(results);
    // console.log(newPeeps);
    await User.create({
      username: "test",
      email: "test@test.com",
      password: "test12345",
    });

    const testPeep = await Peep.findOne({ _id: newPeeps[0]._id });
    console.log(testPeep);
    for (let i = 0; i < newPeeps.length; i++) {
      const user = await User.findOneAndUpdate(
        { username: "test" },
        {
          $addToSet: {
            peeps: newPeeps[i]._id,
          },
        }
      );
      console.log("USER", user);
    }
  } catch (error) {
    console.error(error);
  }
  console.log("all done!");
  process.exit(0);
});
