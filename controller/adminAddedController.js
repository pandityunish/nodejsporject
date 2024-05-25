const AdminAddedUsers = require("../models/AdminAddedUser");
const User = require("../models/User");
const AdminModel = require("../models/adminmodel");


module.exports.getalldata = async (req, res) => {
  try {
    const { userid } = req.body;
    let finduser = await AdminAddedUsers.findOne({ userid: userid });

    let allusers = await User.find({ puid: { $in: finduser.userlist } });
    res.json(allusers);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.postalldata = async (req, res) => {
  try {
    const { id, listofids } = req.body;
    for (let index = 0; index < listofids.length; index++) {
      const element = listofids[index];
      let user = await AdminAddedUsers.findOne({ userid: element });
      if (!user) {
        let newuser = AdminAddedUsers({ userid: listofids[index], userlist: [id] });
        newuser.save();
        //    res.json(newuser);
      } else {
        const users = await AdminAddedUsers.updateOne({ userid: listofids[index] }, {
          $addToSet: {
            userlist: id
          }
        })
        // res.json(users);
      }
    }
    res.json({ mes: "Successfully added" })

  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.updateallvalue = async (req, res) => {
  try {
    const updateQuery = {
      $set: { 'activities.$[].isSeen': false },
    };
    let user = await User.updateMany({}, updateQuery,);
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.countofnotification = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const unseenObjects = user.activities.filter(item => !item.isSeen);
    res.json(unseenObjects.length);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updatenotification = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.updateMany(
      { _id: userId, 'activities.isSeen': false },
      { $set: { 'activities.$[elem].isSeen': true } },
      { arrayFilters: [{ 'elem.isSeen': false }] }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user)
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.deletenotificationfromuser = async (req, res) => {
  try {
    const { userId, notiId } = req.body;
    const user = await User.updateOne(
      { _id: userId, 'activities._id': notiId },
      { $set: { 'activities.$.delete': true } }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user)
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtosendlink = async (req, res) => {
  try {
    const { email, value } = req.body;
    let user = await User.updateOne({ email: email }, {
      $addToSet: {
        sendlink: value
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.createadmin = async (req, res) => {
  try {
    const { email, username, permissions } = req.body;
    let existuser = await AdminModel.findOne({ email });
    console.log(existuser)
    if (existuser) {
      res.status(400).json({ mes: "Already exist" })
    } else {
      let user = await AdminModel({ email, username, permissions })
      user = await user.save();

      res.json({ user });
    }

  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtopermissions = async (req, res) => {
  try {
    const { email, value, username,useremail } = req.body;
    let user = await AdminModel.updateOne({ email }, {
      $set: {
        email:useremail,
        permissions: value,
        username: username
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addsendlinktoeachuser = async (req, res) => {
  try {
    const { userIds, value } = req.body;
    let user = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { sendlink: value } }
    );


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.removesendlink = async (req, res) => {
  try {
    const { email, value } = req.body;
    let user = await User.updateOne({ email: email }, {
      $pull: {
        sendlink: value
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtoboostprofile = async (req, res) => {
  try {
    const { puid, id } = req.body;
    let user = await User.updateOne({ _id: id }, {
      $addToSet: {
        boostprofile: puid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtoshareprofile = async (req, res) => {
  try {
    const { puid, id } = req.body;
    let user = await User.updateOne({ _id: id }, {
      $addToSet: {
        boostprofile: puid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.boosttoall = async (req, res) => {
  try {
    const { id,gender } = req.body;
    let user = await User.updateMany({gender:gender}, {
      $addToSet: {
        boostprofile: id
      }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtoinvisibleprofile = async (req, res) => {
  try {
    const { puid, id } = req.body;
    let user = await User.updateOne({ _id: id }, {
      $addToSet: {
        invisibleprofile: puid
      }
    });


    res.json({ user });
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.invisibletoall = async (req, res) => {
  try {
    const { id } = req.body;
    let user = await User.updateMany({}, {
      $addToSet: {
        invisibleprofile: id
      }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.getboostprofile = async (req, res) => {
  const { userIds } = req.body;

  try {
    const users = await User.find({ puid: { $in: userIds } });



    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports.getshareprofile = async (req, res) => {
  const { userIds } = req.body;

  try {
    const users = await User.find({ puid: { $in: userIds } });



    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports.getinvisibleprofile = async (req, res) => {
  const { userIds } = req.body;

  try {
    const users = await User.find({ puid: { $in: userIds } });



    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}