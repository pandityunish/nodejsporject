const DeleteUser = require("../models/DeleteModel");
const notification = require("../models/Notification");
const SavedPrefer = require("../models/Save_Pref");
const User = require("../models/User");
module.exports.searchusersbyuser = async (req, res) => {
  try {
    const { email,
      gender, page, ages,
      religionList,
      kundaliDoshList,
      maritalStatusList,
      dietList,
      drinkList,
      smokeList,
      disabilityList,
      heightList,
      educationList,
      professionList,
      incomeList,
      longitude,
      latitude,
      maxDistanceKm,
      citylocation,
      statelocation,
      location } = req.body;
    const itemsPerPage = 10;

    if (maxDistanceKm) {
      const userLatitude = parseFloat(latitude);
      const userLongitude = parseFloat(longitude);
      const currentUser = await User.findOne({ email: email });

      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      const blockList = currentUser.someoneblocklists || [];
      const users = await User.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [userLongitude, userLatitude],
            },
            distanceField: 'dist.calculated',
            maxDistance: maxDistanceKm * 1000, // Convert to meters
          },
        },
        {
          $match: {
            _id: { $nin: blockList },
          },
        }
      ]);


      // res.json(users);


      //           if (!email) {
      //             return res.status(400).json({ error: 'Email is required in the request body.' });
      //           }

      //           if (!gender) {
      //             return res.status(400).json({ error: 'Gender or religion is required in the request body.' });
      //           }

      //           // Filter users based on gender and religion while excluding the user's own data
      let filteredUsers = users.filter(user => user.email !== email && user.status === "approved");
      // console.log(filteredUsers);
      if (gender) {
        filteredUsers = filteredUsers.filter(user => user.gender === gender);
      }

      if (religionList.length) {
        filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion));

      }
      if (ages.length) {
        const intList = ages.map(str => parseInt(str));
        console.log(intList);
        console.log(intList[0]);
        filteredUsers = filteredUsers.filter(user => user.age >= intList[0] && user.age <= intList[1]);

      }
      if (kundaliDoshList.length) {
        console.log("ok")
        filteredUsers = filteredUsers.filter(user => kundaliDoshList.includes(user.kundalidosh));

      }
      if (maritalStatusList.length) {
        filteredUsers = filteredUsers.filter(user => maritalStatusList.includes(user.martialstatus));

      }
      if (dietList.length) {
        filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet));

      }
      if (dietList.length) {
        filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet));

      }
      if (drinkList.length) {
        filteredUsers = filteredUsers.filter(user => drinkList.includes(user.drink));

      }
      if (smokeList.length) {
        filteredUsers = filteredUsers.filter(user => smokeList.includes(user.smoke));

      }
      if (disabilityList.length) {
        filteredUsers = filteredUsers.filter(user => disabilityList.includes(user.disability));

      }
      if (heightList.length) {
        const [minHeight, maxHeight] = heightList.map(str => parseFloat(str.split(" ")[0]));
        console.log(minHeight);
        filteredUsers = filteredUsers.filter(user => {
          const userHeight = parseFloat(user.height.split(" ")[0]);
          return userHeight >= minHeight && userHeight <= maxHeight;
        });
      }


      if (educationList.length) {
        filteredUsers = filteredUsers.filter(user => educationList.includes(user.education));

      }
      if (professionList.length) {
        filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession));

      }
      if (incomeList.length) {
        filteredUsers = filteredUsers.filter(user => incomeList.includes(user.income));

      }
      if (location.length) {
        filteredUsers = filteredUsers.filter(user => location.includes(user.country));

      }
      if (statelocation.length) {
        filteredUsers = filteredUsers.filter(user => statelocation.includes(user.state));

      }
      if (citylocation.length) {
        filteredUsers = filteredUsers.filter(user => citylocation.includes(user.city));

      }
      filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      console.log(filteredUsers);

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      res.json(
        paginatedUsers,
      );
    } else {
      const currentUser = await User.findOne({ email: email });

      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      const blockList = currentUser.someoneblocklists || [];
      let users = await User.find({
        _id: { $nin: blockList }
      });

      if (!email) {
        return res.status(400).json({ error: 'Email is required in the request body.' });
      }

      if (!gender) {
        return res.status(400).json({ error: 'Gender or religion is required in the request body.' });
      }

      // Filter users based on gender and religion while excluding the user's own data
      let filteredUsers = users.filter(user => user.email !== email && user.status === "approved");
      // console.log(filteredUsers);
      if (gender) {
        filteredUsers = filteredUsers.filter(user => user.gender === gender);
      }

      if (religionList.length) {
        filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion));

      }
      if (ages.length) {
        const intList = ages.map(str => parseInt(str));
        console.log(intList);
        console.log(intList[0]);
        filteredUsers = filteredUsers.filter(user => user.age >= intList[0] && user.age <= intList[1]);

      }
      if (kundaliDoshList.length) {
        console.log("ok")
        filteredUsers = filteredUsers.filter(user => kundaliDoshList.includes(user.kundalidosh) && user.religion == "Hindu");

      }
      if (maritalStatusList.length) {
        filteredUsers = filteredUsers.filter(user => maritalStatusList.includes(user.martialstatus));

      }
      if (dietList.length) {
        filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet));

      }
      if (dietList.length) {
        filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet));

      }
      if (drinkList.length) {
        filteredUsers = filteredUsers.filter(user => drinkList.includes(user.drink));

      }
      if (smokeList.length) {
        filteredUsers = filteredUsers.filter(user => smokeList.includes(user.smoke));

      }
      if (disabilityList.length) {
        filteredUsers = filteredUsers.filter(user => disabilityList.includes(user.disability));

      }

      if (heightList.length) {
        const [minHeight, maxHeight] = heightList.map(str => parseFloat(str.split(" ")[0]));
        console.log(minHeight)
        filteredUsers = filteredUsers.filter(user => {
          const userHeight = parseFloat(user.height.split(" ")[0]);
          return userHeight >= minHeight && userHeight <= maxHeight;
        });
      }


      if (educationList.length) {
        filteredUsers = filteredUsers.filter(user => educationList.includes(user.education));

      }
      if (professionList.length) {
        filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession));

      }
      if (incomeList.length) {
        filteredUsers = filteredUsers.filter(user => incomeList.includes(user.income));

      }
      if (location.length) {
        filteredUsers = filteredUsers.filter(user => location.includes(user.country));

      }
      if (statelocation.length) {
        filteredUsers = filteredUsers.filter(user => statelocation.includes(user.state));

      }
      if (citylocation.length) {
        filteredUsers = filteredUsers.filter(user => citylocation.includes(user.city));

      }
      filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // console.log(filteredUsers);
      // Paginate the results
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      res.json(
        paginatedUsers,
      );
    }


  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.createuser = async (req, res) => {
  try {
    const { aboutme, age, puid, diet, lat, lng, disability, drink, imageurls, placeofbirth, timeofbirth, education, height, income, patnerprefs, smoke, displayname, email, religion, name, surname, phone, gender, kundalidosh, martialstatus, profession, location1, city, state, country, token, dob, adminlat, adminlng } = req.body;
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ mes: "Email is not available" })
    } else {

      let user = User({
        aboutme, age, diet, disability,
        puid,
        status: "",
        placeofbirth, timeofbirth,
        location: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        adminlat, adminlng,
        drink, education, lat, lng, height, imageurls, income, patnerprefs, smoke, displayname, email, religion, name, surname, phone, gender, kundalidosh, martialstatus, profession, location1, city, state, country, token, dob
      });

      user = await user.save();
      res.json(user);
    }
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.getuserdata = async (req, res) => {
  
  try {
   
    const { email } = req.params;
    let user = await User.findOne({ email });

    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.getuserdatabyid = async (req, res) => {
  try {
    const { _id } = req.params;
    let user = await User.findOne({ _id });

    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.getuserdatabypuid = async (req, res) => {
  try {
    const { puid } = req.params;
    let user = await User.findOne({ puid: puid });
    if (!user) {
      res.status(404).json({ mes: "User not found" })
    } else {
      res.json(user);


    }
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
// module.exports.getallusers = async (req, res) => {
//   try {
//     const { email, gender, page, ages,
//       religionList,
//       kundaliDoshList,
//       maritalStatusList,
//       dietList,
//       drinkList,
//       smokeList,
//       disabilityList,
//       heightList,
//       educationList,
//       professionList,
//       incomeList,
//       lat,
//       lng,
//       invisiblelist,
//       citylocation,
//       statelocation,
//       location } = req.body;
//     const itemsPerPage = 10;
//     const currentUser = await User.findOne({ email: email });

//     if (!currentUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const blockList = currentUser.someoneblocklists || [];
//     let users = await User.find({
//       _id: { $nin: blockList }
//     });
//     users = users.map(user => user.toObject());

//     if (!email) {
//       return res.status(400).json({ error: 'Email is required in the request body.' });
//     }

//     if (!gender) {
//       return res.status(400).json({ error: 'Gender or religion is required in the request body.' });
//     }

//     // Filter users based on gender and religion while excluding the user's own data
//     let filteredUsers = users.filter(user => user.email !== email && user.status === 'approved');
//     // console.log(filteredUsers);
//     if (gender) {
//       filteredUsers = filteredUsers.filter(user => user.gender === gender);
//     }

//     if (religionList.length) {
//       filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion) && user.status === 'approved');

//     }
//     if (ages.length) {
//       const intList = ages.map(str => parseInt(str));
//       console.log(intList);
//       console.log(intList[0]);
//       filteredUsers = filteredUsers.filter(user => user.age >= intList[0] && user.age <= intList[1] && user.status === 'approved');

//     }
//     if (kundaliDoshList.length) {
//       console.log("ok")
//       filteredUsers = filteredUsers.filter(user => kundaliDoshList.includes(user.kundalidosh) && user.status === 'approved' && user.religion === "Hindu");

//     }
//     if (maritalStatusList.length) {
//       filteredUsers = filteredUsers.filter(user => maritalStatusList.includes(user.martialstatus) && user.status === 'approved');

//     }
//     if (dietList.length) {
//       filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) && user.status === 'approved');

//     }
//     if (dietList.length) {
//       filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) && user.status === 'approved');

//     }
//     if (drinkList.length) {
//       filteredUsers = filteredUsers.filter(user => drinkList.includes(user.drink) && user.status === 'approved');

//     }
//     if (smokeList.length) {
//       filteredUsers = filteredUsers.filter(user => smokeList.includes(user.smoke) && user.status === 'approved');

//     }
//     if (disabilityList.length) {
//       filteredUsers = filteredUsers.filter(user => disabilityList.includes(user.disability) && user.status === 'approved');

//     }
//     if (heightList.length) {
//       if (heightList.length) {
//         const [minHeight, maxHeight] = heightList.map(str => parseInt(str.split(" ")[0]));

//         filteredUsers = filteredUsers.filter(user => {
//           const userHeight = parseInt(user.height.split(" ")[0]);
//           return userHeight >= minHeight && userHeight <= maxHeight;
//         });
//       }

//     }
//     if (educationList.length) {
//       filteredUsers = filteredUsers.filter(user => educationList.includes(user.education) && user.status === 'approved');

//     }
//     if (professionList.length) {
//       filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession) && user.status === 'approved');

//     }
//     if (incomeList.length) {
//       filteredUsers = filteredUsers.filter(user => incomeList.includes(user.income) && user.status === 'approved');

//     }
//     if (location.length) {
//       filteredUsers = filteredUsers.filter(user => location.includes(user.country) && user.status === 'approved');

//     }
//     if (statelocation.length) {
//       filteredUsers = filteredUsers.filter(user => statelocation.includes(user.state));

//     }
//     if (citylocation.length) {
//       filteredUsers = filteredUsers.filter(user => citylocation.includes(user.city));

//     }
//     if (invisiblelist === undefined) {

//     } else {
//       if (invisiblelist.length) {
//         filteredUsers = !filteredUsers.filter(user => invisiblelist.includes(user.puid))
//       }
//     }
//     console.log(filteredUsers+"hello");
//     filteredUsers = filteredUsers.map(user => ({
//       ...user,
//       distance: calculateDistance(lat, lng, user.lat, user.lng),
//     }));

//     filteredUsers.sort((a, b) => a.distance - b.distance);



//     // Paginate the results
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

//     res.json(
//       paginatedUsers,
//     );
//   } catch (e) {
//     res.status(500).json({ mes: e.message })
//   }
// }
module.exports.getallusers = async (req, res) => {
  try {
    const { email, gender, page, ages, religionList, kundaliDoshList, maritalStatusList, dietList, drinkList, smokeList, disabilityList, heightList, educationList, professionList, incomeList, lat, lng, invisiblelist, citylocation, statelocation, location } = req.body;
    const itemsPerPage = 10;

    // Validate required parameters
    if (!email) {
      return res.status(400).json({ error: 'Email is required in the request body.' });
    }

    const currentUser = await User.findOne({ email: email });
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blockList = currentUser.someoneblocklists || [];

    // Build the initial query
    let query = {
      _id: { $nin: blockList },
      email: { $ne: email },
      status: 'approved'
    };

    // Apply additional filters
    if (gender) {
      query.gender = gender;
    }
    if (religionList.length) {
      query.religion = { $in: religionList };
    }
    if (ages.length) {
      const [minAge, maxAge] = ages.map(Number);
      query.age = { $gte: minAge, $lte: maxAge };
    }
    if (kundaliDoshList.length && religionList.includes("Hindu")) {
      query.kundalidosh = { $in: kundaliDoshList };
    }
    if (maritalStatusList.length) {
      query.martialstatus = { $in: maritalStatusList };
    }
    if (dietList.length) {
      query.diet = { $in: dietList };
    }
    if (drinkList.length) {
      query.drink = { $in: drinkList };
    }
    if (smokeList.length) {
      query.smoke = { $in: smokeList };
    }
    if (disabilityList.length) {
      query.disability = { $in: disabilityList };
    }
    if (heightList.length) {
      const [minHeight, maxHeight] = heightList.map(str => parseInt(str.split(" ")[0]));
      query.height = { $gte: minHeight, $lte: maxHeight };
    }
    if (educationList.length) {
      query.education = { $in: educationList };
    }
    if (professionList.length) {
      query.profession = { $in: professionList };
    }
    if (incomeList.length) {
      query.income = { $in: incomeList };
    }
    if (location.length) {
      query.country = { $in: location };
    }
    if (statelocation.length) {
      query.state = { $in: statelocation };
    }
    if (citylocation.length) {
      query.city = { $in: citylocation };
    }

    // Apply additional filter to exclude invisible users
    if (invisiblelist && invisiblelist.length) {
      query.puid = { $nin: invisiblelist };
    }

    // Execute the query
    let users = await User.find(query);

    // Calculate distances and sort by distance
    users = users.map(user => ({
      ...user.toObject(),
      distance: calculateDistance(lat, lng, user.lat, user.lng)
    })).sort((a, b) => a.distance - b.distance);

    // Paginate the results
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json(paginatedUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
module.exports.finduser = async (req, res) => {
  try {
    const { email } = req.params;
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ mes: "User not found" })
    } else {
      res.status(200).json({ mes: "User found", user })
    }

  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.createsavepref = async (req, res) => {
  try {
    const {
      email,
      ageList,
      religionList,
      kundaliDoshList,
      maritalStatusList,
      dietList,
      drinkList,
      smokeList,
      disabilityList,
      heightList,
      educationList,
      professionList,
      incomeList,
      statelocation,
      citylocation,
      location } = req.body;
    let user = await SavedPrefer.findOne({ email });
    if (!user) {
      let saved_pref = await SavedPrefer({
        ageList,
        email,
        religionList,
        kundaliDoshList,
        maritalStatusList,
        dietList,
        drinkList,
        smokeList,
        disabilityList,
        heightList,
        educationList,
        professionList,
        incomeList,
        citylocation,
        statelocation,
        location
      });
      saved_pref = await saved_pref.save();
      res.json(saved_pref);
    } else {
      const query = { email: email };
      const data = await SavedPrefer.updateOne(query,
        {
          $set: {
            ageList: ageList,
            religionList: religionList,
            kundaliDoshList: kundaliDoshList,

            statelocation: statelocation,
            citylocation: citylocation,
            maritalStatusList: maritalStatusList,
            dietList: dietList,
            drinkList: drinkList,
            smokeList: smokeList,
            disabilityList: disabilityList,
            heightList: heightList,
            educationList: educationList,
            professionList: professionList,
            incomeList: incomeList,
            location: location

          }
        });
      res.json(data);
    }

  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.getusersavedpref = async (req, res) => {
  try {
    const { email } = req.params;
    let user = await SavedPrefer.findOne({ email });
    if (!user) {
      res.status(404).json({ mes: "User Not Found" })
    } else {
      res.json(user)

    }
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.edituserprofile = async (req, res) => {
  try {
    const { imageurls, aboutme, patnerprefs, email } = req.body;
    let user = await User.updateOne({ email: email }, { aboutme: aboutme, patnerprefs: patnerprefs, imageurls: imageurls, status: "" });
    console.log(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchuserbyid = async (req, res) => {
  try {
    const { puid, email } = req.body;

    let users = await User.find({ puid });
    let filteredUsers = users.filter(user => user.email !== email && user.status === 'approved');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.connectnow = async (req, res) => {
  try {
    const { uid, email, sendemail, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        sendreq: senduid
      }
    });
    let senduser = await User.updateOne({ email: sendemail }, {
      $addToSet: {
        pendingreq: uid
      }
    });

    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updateblur = async (req, res) => {
  try {
    const { email, isblur } = req.body;
    let user = await User.updateOne({ email: email }, {
      $set: {
        isBlur: isblur
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updateprofession = async (req, res) => {
  try {
    const { email, profession } = req.body;
    let user = await User.updateOne({ email: email }, {
      $set: {
        profession: profession
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updateeducation = async (req, res) => {
  try {
    const { email, education } = req.body;
    let user = await User.updateOne({ email: email }, {
      $set: {
        education: education
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.rejectrequest = async (req, res) => {
  try {
    const { uid, email, sendemail, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $pull: {
        pendingreq: senduid
      }
    });
    let senduser = await User.updateOne({ email: sendemail }, {
      $pull: {
        sendreq: uid
      }
    });

    res.json({ user, senduser });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.acceptrequest = async (req, res) => {
  try {
    const { uid, email, sendemail, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        friends: senduid
      }
    }, {
      $pull: {
        pendingreq: senduid
      }
    });
    let senduser = await User.updateOne({ email: sendemail }, {
      $addToSet: {
        friends: uid
      }
    }, {
      $pull: {
        sendreq: uid
      }
    });

    res.json({ user, senduser });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtosortlist = async (req, res) => {
  try {
    const { email, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        shortlist: senduid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtounapproveblock = async (req, res) => {
  try {
    const { email, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        unapprovedSendlists: senduid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.removefromunapproveblock = async (req, res) => {
  try {
    const { email, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $pull: {
        unapprovedSendlists: senduid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtoblocklists = async (req, res) => {
  try {
    const { email, senduid, sendemail, uid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        blocklists: senduid
      }
    });
    let senduser = await User.updateOne({ email: sendemail }, {
      $addToSet: {
        someoneblocklists: uid
      }
    })

    res.json({ user, senduser });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.unblockuser = async (req, res) => {
  try {
    const { email, senduid, sendemail, uid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $pull: {
        blocklists: senduid
      }
    });

    let senduser = await User.updateOne({ email: sendemail }, {
      $pull: {
        someoneblocklists: uid
      }
    })
    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtoReportlist = async (req, res) => {
  try {
    const { email, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        reportlist: senduid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.removeReportlist = async (req, res) => {
  try {
    const { email, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $pull: {
        reportlist: senduid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtosortlist = async (req, res) => {
  try {
    const { email, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        shortlist: senduid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.removeshortuser = async (req, res) => {
  try {
    const { email, senduid } = req.body;
    let user = await User.updateOne({ email: email }, {
      $pull: {
        shortlist: senduid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.canclereq = async (req, res) => {
  try {
    const { uid, email, sendemail, senduid } = req.body;
    let user = await User.updateOne({ email: email },
      {
        $pull: {
          sendreq: senduid
        }
      });
    let senduser = await User.updateOne({ email: sendemail },
      //   {$pull:{
      //   sendreq :uid

      // }},
      {
        $pull: {
          pendingreq: uid

        }
      });

    res.json({ user, senduser });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updateeditstatus = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.updateOne({ email }, {
      $set: {
        editstatus: "unapprove"
      }
    });

    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.updateeditstatusapprove = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.updateOne({ email }, {
      $set: {
        editstatus: "approved"
      }
    });

    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.uploadvideo = async (req, res) => {
  try {
    const { email, videourl } = req.body;
    let user = await User.updateOne({ email: email }, {
      videolink: videourl
    });
    res.json(user)
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.deletevideo = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.updateOne({ email: email }, {
      videolink: ""
    });
    res.json(user)
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.pushnotification = async (req, res) => {
  try {
    const { title, email } = req.body;

    console.log(notification)
    let user = await User.updateOne({ email: email }, {
      $push: {
        notifications: {
          title: title
        }
      }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.pushadstouser = async (req, res) => {
  try {
    const { description, email,adsid,image } = req.body;

    
    let user = await User.updateOne({ email: email }, {
      $push: {
        showads: {
        
          description:description,
          adsid:adsid,
          image:image
        }
      }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.pulladstouser = async (req, res) => {
  try {
    const {  email,adsid } = req.body;

    
    let user = await User.updateOne({ email: email }, {
      $pull: { showads: { _id: adsid } } 
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updateemail = async (req, res) => {
  try {
    const { editemail, email } = req.body;


    let user = await User.updateOne({ email: email }, {
      $set: {
        email: editemail
      }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.pushactivities = async (req, res) => {
  try {
    const { title, email, username, userimage, userid } = req.body;

    console.log(notification)
    let user = await User.updateOne({ email: email }, {
      $push: {
        activities: {
          title: title,
          username: username,
          userimage: userimage,
          userid: userid
        }
      }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.deleteaccount = async (req, res) => {
  try {
    const { aboutme, age, puid, diet, lat, lng, disability, drink, imageurls, placeofbirth, timeofbirth, education, height, income, patnerprefs, smoke, displayname, email, religion, name, surname, phone, gender, kundalidosh, martialstatus, profession, location, city, state, country, token, dob, reasontodeleteuser,status } = req.body;
    let user = await User.deleteOne({ email: email });
    let deleteaccount = DeleteUser({
      aboutme, age, puid, diet, lat, lng,status, disability, drink, imageurls, placeofbirth, timeofbirth, education, height, income, patnerprefs, smoke, displayname, email, religion, name, surname, phone, gender, kundalidosh, martialstatus, profession, location, city, state, country, token, dob, reasontodeleteuser
    })
    deleteaccount = await deleteaccount.save();

    let sharedpref = await SavedPrefer.deleteOne({ email: email });
    sharedpref.save();
    res.json({ deleteaccount, sharedpref });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.deleteaccountfromadmin = async (req, res) => {
  try {
    const { id } = req.body;
    let user = await DeleteUser.deleteOne({ _id: id });
    
    
    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updatelocation = async (req, res) => {
  try {
    const { email, lat, lng } = req.body;
    let user = await User.updateOne({ email: email }, {
      $set: {
        adminlat: lat,
        adminlng: lng,

      }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.cleartoken = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.updateOne({ email }, {
      $set: {
        token: ""
      }
    });
    res.json(user);
  } catch (e) {

  }
}
module.exports.addtoken = async (req, res) => {
  try {
    const { email, token } = req.body;
    let user = await User.updateOne({ email }, {
      $set: {
        token: token
      }
    });
    res.json(user);
  } catch (e) {

  }

}
module.exports.updatenumofinterest = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.updateOne({ email }, {
    
      $inc: {
        numofinterest: 1
    }
    });

    res.json(user);
  } catch (e) {
res.status(500).json({mes:e.message})
  }

}
module.exports.updatenumofprofileviewer = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.User.updateOne({ email }, {
    
      $inc: {
        numofprofileviewer: 1
    }
    });

    res.json(user);
  } catch (e) {

  }

}
module.exports.updatenumofprofileviewed = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.updateOne({ email }, {
    
      $inc: {
        numofprofileviewed: 1
    }
    });

    res.json(user);
  } catch (e) {

  }

}
module.exports.updatelogin = async (req, res) => {
  try {
    const { email, mes } = req.body;
    let user = await User.updateOne({ email }, {
      $set: {
        isLogOut: mes
      }
    });
    res.json(user);
  } catch (e) {

  }

}