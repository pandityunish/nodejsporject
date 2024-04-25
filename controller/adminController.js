const AdminNotification = require("../models/AdminNotification");
const DeleteUser = require("../models/DeleteModel");
const User = require("../models/User");
const AdminModel = require("../models/adminmodel");
const GeoJSON = require('geojson');

module.exports.findadminuser = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ mes: "User Not found" });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.getunapproveduser = async (req, res) => {
  try {
    const {page, itemsPerPage } = req.body;
    let users = await User.find({});
    let filteredUsers = users.filter(user => user.status === '' || user.status === 'block')
    filteredUsers.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    res.json(paginatedUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getoldestfirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ createdAt: -1 });;
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.sortdatabasedontype = async (req, res) => {
  try {
    const { searchtext, page } = req.body;
    const itemsPerPage = 10;
    let filteredUsers = await User.find({});
    if (searchtext === "New Profile To Old Profile") {
      filteredUsers.sort((a, b) => b.createdAt - a.createdAt);
    } else if (searchtext === "Old Profile To New Profile") {
      filteredUsers.sort((a, b) => a.createdAt - b.createdAt);
    } else if (searchtext === "Male to Female") {
      filteredUsers.sort((a, b) => b.gender.localeCompare(a.gender));
    }else if (searchtext === "Female to Male") {
      filteredUsers.sort((a, b) => a.gender.localeCompare(b.gender));
    }else if (searchtext === "Age MIN To MAX") {
      filteredUsers.sort((a, b) => a.age - b.age);
    }else if (searchtext === "Age MAX To MIN") {
      filteredUsers.sort((a, b) => b.age - a.age);
    }else if (searchtext === "Distance MIN To MAX") {
      filteredUsers.sort((a, b) => b.createdAt - a.createdAt);
    }else if (searchtext === "Distance MAX To MIN") {
      filteredUsers.sort((a, b) => b.createdAt - a.createdAt);
    }else if (searchtext === "Height MIN To MAX") {
      filteredUsers.sort((a, b) => a.height - b.height);
    }else if (searchtext === "Height MAX To MIN") {
      filteredUsers.sort((a, b) => {
        const heightA = parseFloat(a.height.split(' ')[0]); // Extract numerical value from height string
        const heightB = parseFloat(b.height.split(' ')[0]); // Extract numerical value from height string
        return heightB - heightA;
      });
    }else if (searchtext === "Income MIN To MAX") {
      filteredUsers.sort((a, b) => a.income - b.income);
    }else if (searchtext === "Income MAX To MIN") {
      filteredUsers.sort((a, b) => b.income - a.income);
    }else if (searchtext === "Photo To Without Photo") {
      filteredUsers.sort((a, b) => b.imageurls.length - a.imageurls.length);
    }else if (searchtext === "Without Photo To Photo") {
      filteredUsers.sort((a, b) => a.imageurls.length - b.imageurls.length);
    }else if (searchtext === "Logout to Login") {
      filteredUsers.sort((a, b) => a.isLogOut - b.isLogOut);
    }else if (searchtext === "Login To Logout") {
      filteredUsers.sort((a, b) => b.isLogOut - a.isLogOut);
    }

    filteredUsers.sort((users)=>users.status=="" || users.status === 'block');

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json(paginatedUsers);
  
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}

module.exports.getmalefirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ gender: -1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.findthedeleteuser = async (req, res) => {
  try {
    const {email}=req.body;
    let users = await DeleteUser.findOne({email:email});
    if(!users){
      res.status(404).json({ mes: "Not found" });
    }else{
      res.status(200).json(users);
    }
  
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.gefemalefirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ gender: 1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getminagefirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ age: 1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getmaxagefirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ age: -1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getminheightfirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ height: 1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getmaxheightfirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ height: -1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getminincomefirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ income: 1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getmaxincomefirst = async (req, res) => {
  try {
    let users = await User.find({}).sort({ income: -1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getwithphoto = async (req, res) => {
  try {
    let users = await User.find({}).sort({ 'imageurls': -1 });
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.getwithoutphoto = async (req, res) => {
  try {
    let users = await User.find({}).sort({ 'imageurls': 1 })
    let filteredUsers = users.filter(user => user.status === '');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.updateuserstatus = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.updateOne({ email }, {
      $set: {
        status: "approved"
      }
    });

    res.json(user);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}

module.exports.updateeditstatus = async (req, res) => {
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
module.exports.searchuserbyemail = async (req, res) => {
  try {
    const { searchemail } = req.body;
    let users = await User.find({ email: searchemail });
    // let filteredUsers = users.filter(user => user.email !== email);
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchuserbyid = async (req, res) => {
  try {
    const { puid, email } = req.body;
    let users = await User.find({ puid: puid });
    // let filteredUsers = users.filter(user => user.email !== email);
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchuserbyphoneunmber = async (req, res) => {
  try {
    const { phonenumber, email } = req.body;
    let users = await User.find({ phone: phonenumber });
    // let filteredUsers = users.filter(user => user.email !== email);
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchuserbyname = async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(name);
    const users = await User.aggregate([
      {
        $match: { name: { $regex: new RegExp(name, 'i'), } }, // Match documents with the specified name
      },
      {
        $group: {
          _id: '$name',
          users: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          count: 0, // Exclude count field
        },
      }
      // {
      //   $match: { count: { $gt: 1 } },
      // },
    ]);
    let filteredUsers = users
      // .filter(user => user.email !== email)
      .map(user => user.users)
      .flat();
    console.log(filteredUsers);
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchuserbysurname = async (req, res) => {
  try {
    const { surname, email } = req.body;
    let users = await User.find({ surname });
    // let filteredUsers = users.filter(user => user.email !== email );
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updateuserverifystatus = async (req, res) => {
  try {
    const { email } = req.body;

    let users = await User.updateOne({ email }, {
      $set: {
        verifiedstatus: "verified"
      }
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.updateuserunverifystatus = async (req, res) => {
  try {
    const { email } = req.body;

    let users = await User.updateOne({ email }, {
      $set: {
        verifiedstatus: "unverified"
      }
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.blockuserbyadmin = async (req, res) => {
  try {
    const { email } = req.body;

    let users = await User.updateOne({ email }, {
      $set: {
        status: "block"
      }
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.unblockuserbyadmin = async (req, res) => {
  try {
    const { email } = req.body;

    let users = await User.updateOne({ email }, {
      $set: {
        status: ""
      }
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.reportuserbyadmin = async (req, res) => {
  try {
    const { email } = req.body;

    let users = await User.updateOne({ email }, {
      $set: {
        status: "report"
      }
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.unreportuserbyadmin = async (req, res) => {
  try {
    const { email } = req.body;

    let users = await User.updateOne({ email }, {
      $set: {
        status: ""
      }
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchusers = async (req, res) => {
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
console.log("lfakjsdlfkj")
    if (maxDistanceKm) {
      const userLatitude = parseFloat(latitude);
      const userLongitude = parseFloat(longitude);


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

      ]);
      // const result = await users.paginate({}, { page, itemsPerPage });
      // res.json(users);


      //           if (!email) {
      //             return res.status(400).json({ error: 'Email is required in the request body.' });
      //           }

      //           if (!gender) {
      //             return res.status(400).json({ error: 'Gender or religion is required in the request body.' });
      //           }

      //           // Filter users based on gender and religion while excluding the user's own data
      let filteredUsers = users;
      // console.log(filteredUsers);
      if (gender) {
        filteredUsers = filteredUsers.filter(user => user.gender === gender);
      }

      if (religionList.length) {
        filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion));

      }
      if (ages.length) {
        const intList = ages.map(str => parseInt(str));
        filteredUsers = filteredUsers.filter(user => user.age >= intList[0] && user.age <= intList[1]);

      }
      if (kundaliDoshList.length) {
    
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
        console.log("hello");
        if(educationList.includes("Other")){
         
          filteredUsers = filteredUsers.filter(user => !educationList.includes(user.education));
        }else{
          filteredUsers = filteredUsers.filter(user => educationList.includes(user.education));
        }
       

      }
      if (professionList.length) {
        if(professionList.includes("Other")){
          filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession));
        }else{
          filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession));
        }
        

      }
      if (incomeList.length) {
        filteredUsers = filteredUsers.filter(user => incomeList.includes(user.income));

      }
      if (location.length) {
        filteredUsers = filteredUsers.filter(user => location.includes(user.country));

      }
      if (statelocation.length) {
        filteredUsers = filteredUsers.filter(user => location.includes(user.state));

      }
      if (citylocation.length) {
        filteredUsers = filteredUsers.filter(user => location.includes(user.city));

      }
      filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      res.json(
        paginatedUsers,
      );
      // const nextPage = result.hasNextPage ? `/items?page=${page + 1}&limit=${itemsPerPage}` : null;
      // const prevPage = page > 1 ? `/items?page=${page - 1}&limit=${itemsPerPage}` : null;

      // res.json({
      //     nextPage,
      //     prevPage,
      //     data: filteredUsers
      // });
    } else {
      let users = await User.find({});

      if (!email) {
        return res.status(400).json({ error: 'Email is required in the request body.' });
      }

      if (!gender) {
        return res.status(400).json({ error: 'Gender or religion is required in the request body.' });
      }

      // Filter users based on gender and religion while excluding the user's own data
      // const result = await User.paginate({}, { page, itemsPerPage });
      let filteredUsers = users;
      // console.log(filteredUsers);

      if (gender) {
        filteredUsers = filteredUsers.filter(user => user.gender === gender);
      }

      if (religionList.length) {
        filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion));

      }
      if (ages.length) {
        const intList = ages.map(str => parseInt(str));
      
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
        console.log("hello");
        if(educationList.includes("Other")){
         
          filteredUsers = filteredUsers.filter(user => !educationList.includes(user.education));
        }else{
          filteredUsers = filteredUsers.filter(user => educationList.includes(user.education));
        }
       

      }
      if (professionList.length) {
        if(professionList.includes("Other")){
          filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession));
        }else{
          filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession));
        }
        

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



      res.json(paginatedUsers);
    }


  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.profilesearch = async (req, res) => {
  try {
    const { searchtext, page } = req.body;
    const itemsPerPage = 10;
    let users = await User.find({});
    let filetereduser = users;
    if (searchtext === "male" || searchtext == "female") {
      filetereduser = users.filter(user => user.gender === searchtext);
    } else if (searchtext == "Pending Profiles New male") {
      filetereduser = users.filter(user => user.status === '' && user.gender === "male")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    } else if (searchtext == "Pending Profiles New female") {
      filetereduser = users.filter(user => user.status === '' && user.gender === "female")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    } else if (searchtext == "Approved Profiles New male") {
     
      filetereduser = users.filter(user => user.status === 'approved' && user.gender === "male")
      console.log(filetereduser)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Approved Profiles New female") {
      filetereduser = users.filter(user => user.status === 'approved' && user.gender === "female")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    } else if (searchtext == "Incomplete Profiles") {
      filetereduser = users.filter(user => user.aboutme === '' || user.patnerprefs === "" || user.imageurls.length===0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Complete Profiles") {
      filetereduser = users.filter(user => user.aboutme !== '' && user.patnerprefs !== "" && user.imageurls.length!==0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Profiles with photos") {
      filetereduser = users.filter(user => user. imageurls.length!==0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Profiles without photos") {
      filetereduser = users.filter(user => user.imageurls.length===0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Incomplete Profiles") {
      filetereduser = users.filter(user => user.aboutme === '' )
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "About Me Fill Profiles") {
      filetereduser = users.filter(user => user.aboutme !== '')
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Block Profiles") {
      filetereduser = users.filter(user => user.status === 'block')
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Pending Profiles Edit") {
      filetereduser = users.filter(user => user.editstatus === '')
      filetereduser.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    }else if (searchtext == "Approved Profiles Edit") {
      filetereduser = users.filter(user => user.editstatus === 'approved')
      filetereduser.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    }
    else if (searchtext == "Report Profiles by users") {
      filetereduser = users.filter(user => user.reportlist.length !== 0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "verified profile approved users") {
      filetereduser = users.filter(user => user.verifiedstatus==="verified")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Logout Profiles by Users") {
      filetereduser = users.filter(user => user.isLogOut==="false")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Login Profiles") {
      filetereduser = users.filter(user => user.isLogOut==="true")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Same Mobile No. Profiles") {
      const result = await User.aggregate([
        {
            $group: {
                _id: '$phone',
                users: { $push: '$$ROOT' } // Push all documents in the group into an array
            }
        },
        {
            $match: {
                _id: { $exists: true } // Filter out groups with no phone number (_id field is the phone number)
            }
        }
    ]);

    // Extract the users array from the result
    const usersWithSamePhone = result.map(group => group.users).flat();
    filetereduser=usersWithSamePhone;

    }else if (searchtext == "support seeking profiles") {
      filetereduser = users.filter(user => user.support!==0);
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Saved Preference  Profiles") {
      filetereduser = users.filter(user => user.patnerprefs!=="");
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else{
    filetereduser=users;
    filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filetereduser.slice(startIndex, endIndex);
    res.json(paginatedUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.numberofprofilesearch = async (req, res) => {
  try {
    
    let users = await User.find({});
    let filetereduser = users;
    if (searchtext === "male" || searchtext == "female") {
      filetereduser = users.filter(user => user.gender === searchtext);
    } else if (searchtext == "Pending Profiles New male") {
      filetereduser = users.filter(user => user.status === '' && user.gender === "male")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    } else if (searchtext == "Pending Profiles New female") {
      filetereduser = users.filter(user => user.status === '' && user.gender === "female")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    } else if (searchtext == "Approved Profiles New male") {
     
      filetereduser = users.filter(user => user.status === 'approved' && user.gender === "male")
      console.log(filetereduser)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Approved Profiles New female") {
      filetereduser = users.filter(user => user.status === 'approved' && user.gender === "female")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    } else if (searchtext == "Incomplete Profiles") {
      filetereduser = users.filter(user => user.aboutme === '' || user.patnerprefs === "" || user.imageurls.length===0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Complete Profiles") {
      filetereduser = users.filter(user => user.aboutme !== '' && user.patnerprefs !== "" && user.imageurls.length!==0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Profiles with photos") {
      filetereduser = users.filter(user => user. imageurls.length!==0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Profiles without photos") {
      filetereduser = users.filter(user => user.imageurls.length===0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Incomplete Profiles") {
      filetereduser = users.filter(user => user.aboutme === '' )
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "About Me Fill Profiles") {
      filetereduser = users.filter(user => user.aboutme !== '')
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Block Profiles") {
      filetereduser = users.filter(user => user.status === 'block')
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Pending Profiles Edit") {
      filetereduser = users.filter(user => user.editstatus === '')
      filetereduser.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    }else if (searchtext == "Approved Profiles Edit") {
      filetereduser = users.filter(user => user.editstatus === 'approved')
      filetereduser.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    }
    else if (searchtext == "Report Profiles by users") {
      filetereduser = users.filter(user => user.reportlist.length !== 0)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "verified profile approved users") {
      filetereduser = users.filter(user => user.verifiedstatus==="verified")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Logout Profiles by Users") {
      filetereduser = users.filter(user => user.isLogOut==="false")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Login Profiles") {
      filetereduser = users.filter(user => user.isLogOut==="true")
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "maximum send interest Profiles") {
      filetereduser = users.filter(user => user.numofinterest>=20)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "maximum profile viewer") {
      filetereduser = users.filter(user => user.numofprofileviewer>=20)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "maximum profile viewed") {
      filetereduser = users.filter(user => user.numofinterest>=20)
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }
    else if (searchtext == "Same Mobile No. Profiles") {
      const result = await User.aggregate([
        {
            $group: {
                _id: '$phone',
                users: { $push: '$$ROOT' } // Push all documents in the group into an array
            }
        },
        {
            $match: {
                _id: { $exists: true } // Filter out groups with no phone number (_id field is the phone number)
            }
        }
    ]);

    // Extract the users array from the result
    const usersWithSamePhone = result.map(group => group.users).flat();
    filetereduser=usersWithSamePhone;

    }else if (searchtext == "support seeking profiles") {
      filetereduser = users.filter(user => user.support!==0);
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else if (searchtext == "Saved Preference  Profiles") {
      filetereduser = users.filter(user => user.patnerprefs!=="");
      filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    }else{
    filetereduser=users;
    filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  
    res.json(filetereduser.length);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.addtonotification = async (req, res) => {
  try {
    const { userid, useremail, title, userimage, subtitle,adminemail } = req.body;

    let notifications = AdminNotification({
      userid, useremail, userimage, title, subtitle: subtitle,adminemail
    });
    notifications = await notifications.save();
    res.json(notifications);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchnotibydate = async (req, res) => {
  try {
    const { year, month, day, pagenumber, perpagenumber } = req.body;
    const page = parseInt(pagenumber) || 1;
    const perPage = parseInt(perpagenumber) || 10;

    const skipCount = (page - 1) * perPage;
    let notifications = await AdminNotification.find({
      $expr: {
        $and: [
          { $eq: [{ $year: '$createdAt' }, parseInt(year)] },
          { $eq: [{ $month: '$createdAt' }, parseInt(month)] },
          { $eq: [{ $dayOfMonth: { date: '$createdAt', timezone: 'UTC' } }, parseInt(day)] },
        ]
      }
    }).sort({ _id: -1 })
      .skip(skipCount)
      .limit(perPage);;

    res.json(notifications);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.searchuserbydate = async (req, res) => {
  try {
    const { year, month, day } = req.body;



    let user = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $year: '$createdAt' }, parseInt(year)] },
          { $eq: [{ $month: '$createdAt' }, parseInt(month)] },
          { $eq: [{ $dayOfMonth: { date: '$createdAt', timezone: 'UTC' } }, parseInt(day)] },
        ]
      }
    }).sort({ _id: -1 })


    res.json(user.length);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.findnumberofunseennoti = async (req, res) => {
  try {


    let notifications = await AdminNotification.find({ isSeen: true });

    res.json(notifications);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.getalladmins = async (req, res) => {
  try {


    let admins = await AdminModel.find();

    res.json(admins);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}
module.exports.getallnotification = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const skipCount = (page - 1) * perPage;

    const notifications = await AdminNotification.find({})
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(perPage);

    res.json(notifications);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports.getalldeletedProfile = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const skipCount = (page - 1) * perPage;

    const notifications = await DeleteUser.find({})
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(perPage);

    res.json(notifications);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports.searchnotification = async (req, res) => {
  try {
    const { title } = req.body;
    let noti = await AdminNotification.find({ subtitle: { $regex: new RegExp(title, 'i') } });
    res.json(noti);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
module.exports.searchuserbydistance = async (req, res) => {
  try {
    const { longitude, latitude, maxDistanceKm, email } = req.body;

    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);

    const users = await User.find({
      $and: [
        { lng: { $gte: lon - (maxDistanceKm / 111.32), $lte: lon + (maxDistanceKm / 111.32) }, },
        { lat: { $gte: lat - (maxDistanceKm / (111.32 * Math.cos(lat * (Math.PI / 180)))), $lte: lat + (maxDistanceKm / (111.32 * Math.cos(lat * (Math.PI / 180)))) } }
      ]
    });
    let filteredUsers = users.filter(user => user.email !== email);

    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({ mes: e.message })
  }
}

module.exports.findnumberofusers = async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users.length);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}
module.exports.finddeletenumberofusers = async (req, res) => {
  try {
    let users = await DeleteUser.find({});
    res.json(users.length);
  } catch (e) {
    res.status(500).json({ mes: e.message });
  }
}