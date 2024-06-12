const AdminNotification = require("../models/AdminNotification");
const DeleteUser = require("../models/DeleteModel");
const SavedPreferSearch = require("../models/SavePreferenceSearch");
const User = require("../models/User");
const Userkundlimatch = require("../models/UserKundaliMatch");
const UserSearch = require("../models/UserSearchModel")
const express = require("express");
const ExcelJS = require('exceljs');
const AdminModel = require("../models/adminmodel");
const Query = require("../models/query_data");
const RatingModel = require("../models/Rating");
const EditProfiles = require("../models/Editprofile");
const profileRouter = express.Router();
profileRouter.post("/addusersearch", async (req, res) => {
    try {
        const { searchidprofile, searchDistance, age, religion, kundlidosh, marital_status, diet, smoke, drink, disability, height, education, profession, income, location, userid,name,location1,statelocation,citylocation } = req.body;
        let user = await UserSearch({ searchidprofile, searchDistance, age, religion, kundlidosh, marital_status, diet, smoke, drink, disability, height, education, profession, income, location, userid,name,location1,statelocation,citylocation });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/createrating", async (req, res) => {
    try {
        const { useremail,ratingnumber,description } = req.body;

        let user = await RatingModel({ useremail,ratingnumber,description  });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/getrating", async (req, res) => {
    try {
        const { useremail } = req.body;

        let user = await RatingModel.findOne({ useremail });
       
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/getallusersearch", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await UserSearch.find({ userid: id });
        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/addkundalimatch", async (req, res) => {
    try {
        const { gname, gday, gmonth, gyear, ghour, gsec, bname, bday, bmonth, byear, bhour, bsec, bplace, userid, gplace,totalgun,name,gam,bam } = req.body;

        let user = await Userkundlimatch({ gname, gday, gmonth, gyear, ghour, gsec, bname, bday, bmonth, gplace, byear, bhour, bsec, bplace, userid,totalgun,name,gam,bam });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/getalluserkundli", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await Userkundlimatch.find({ userid: id });
        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.get("/update", async (req, res) => {
    try {
        let users = await EditProfiles.updateMany({}, {
            $set: {
                lng:0.3312,
                

            },
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.get("/updatenoti", async (req, res) => {
    try {
        let users = await AdminNotification.updateMany({}, {
            $set: {
                isSeen: false,

            },
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/getadminnotification", async (req, res) => {
    try {
        const {adminemail}=req.body;
        let users = await AdminNotification.find({adminemail});
        
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.get("/updatedata", async (req, res) => {
    try {
        
        const user = await EditProfiles.updateMany(
            {},
            { $set: {dateofbirth:""} },
            { upsert: true } 
          );
       
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e.message })
    }
});
profileRouter.post("/addtokentoadmin", async (req, res) => {
    try {
        const {email,token}=req.body;
        const user = await AdminModel.updateOne(
            {email:email},
            { $set: {token:token} },
            
          );
       
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e.message })
    }
});
profileRouter.get('/download-users', async (req, res) => {
    try {
      const {searchtext}=req.query;
      const users = await User.find();
      let filetereduser = users;
      console.log(searchtext);
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
        filetereduser = users.filter(user => user.aboutme !== '' || user.patnerprefs !== "" || user.imageurls.length!==0)
        filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      }
      else if (searchtext == "Profiles with photos") {
        filetereduser = users.filter(user => user. imageurls.length!==0)
        filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      }
      else if (searchtext == "Profiles without photos") {
        filetereduser = users.filter(user => user. imageurls.length===0)
        filetereduser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      }else if (searchtext == "Incomplete Profiles") {
        filetereduser = users.filter(user => user.aboutme === '')
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
  
      }else if (searchtext == "Same Mobile No. Profiles") {
        const users = await User.aggregate([
          {
            $group: {
              _id: '$mobile',
              users: { $push: '$$ROOT' },
              count: { $sum: 1 },
            },
          },
          {
            $match: {
              count: { $gt: 1 },
            },
          },
        ]);
        filetereduser=users;
  
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
      // Create a new Excel workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');
      
      
      // Add headers to the worksheet
      worksheet.columns = [
        { header: 'ProfileID', key: 'profileid', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'First Name', key: 'fname', width: 20 },
        { header: 'Surname', key: 'lname', width: 20 },
        { header: 'Gender', key: 'gender', width: 20 },
        { header: 'Moblie Number', key: 'number', width: 20 },
        { header: 'Date of Birth', key: 'dob', width: 20 },
        { header: 'Time of Birth', key: 'tob', width: 20 },
        { header: 'Place of Birth', key: 'place', width: 20 },
        { header: 'Religion', key: 'religion', width: 20 },
        { header: 'Kundli Dosh', key: 'kundli', width: 20 },
        { header: 'Marital Status', key: 'martial', width: 20 },
        { header: 'Diet', key: 'diet', width: 20 },
        { header: 'Drink', key: 'drink', width: 20 },
        { header: 'Somke', key: 'smoke', width: 20 },
        { header: 'Disability', key: 'disability', width: 20 },
        { header: 'Height', key: 'height', width: 20 },
        { header: 'Education', key: 'education', width: 20 },
        { header: 'Profession', key: 'profession', width: 20 },
        { header: 'Annual Income', key: 'income', width: 20 },
        { header: 'City', key: 'city', width: 20 },
        { header: 'State', key: 'state', width: 20 },
        { header: 'Country', key: 'country', width: 20 },
        { header: 'About me', key: 'about', width: 20 },
        { header: 'About Partner Preference', key: 'aboutpatner', width: 20 },
        // Add more columns as needed
      ];
  
      // Populate data from MongoDB into the worksheet
      filetereduser.forEach(user => {
        worksheet.addRow({ profileid: user.puid, email: user.email,fname:user.name,
            lname:user.surname,gender:user.gender,number:user.phone,dob:formatDateFromTimestamp(user.dob) ,tob:user.timeofbirth,religion:user.religion,
            place:user.placeofbirth,
        kundli:user.kundalidosh,martial:user.martialstatus,diet:user.diet,drink:user.drink,smoke:user.smoke,disability:user.disability,
        height:user.height,education:user.education,profession:user.profession,income:user.income,
        city:user.city,state:user.state,country:user.country,about:user.aboutme,aboutpatner:user.patnerprefs
        });
        // Add more rows/columns as needed based on your User model
      });
  
      // Generate a unique filename for the Excel file
      const filename = 'disclose_later.xlsx';
  
      // Set content type and attachment header for the response
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
      // Pipe the workbook to the response
      await workbook.xlsx.write(res);
  
      // End the response
      res.end();
  
    } catch (error) {
      console.error('Error downloading users:', error);
      res.status(500).send('Error downloading users');
    }
  });
  function formatDateFromTimestamp(timestamp) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${year} ${month} ${day}`;
}
profileRouter.post("/updatedelete", async (req, res) => {
    try {
        const { email } = req.body;
        let users = await User.updateOne({ email: email }, {
            $set: {
                isDeleted: true,

            },
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/addsharepref", async (req, res) => {
    try {
        const {
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
            userid,
            name,
            location } = req.body;
        let saved_pref = await SavedPreferSearch({
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
            userid,
            location,
            name
        });
        saved_pref = await saved_pref.save();
        res.json(saved_pref);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/getsearchprofilepref", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await SavedPreferSearch.find({ userid: id });
        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/updateonlineuser", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await User.updateOne({ _id: id }, {
            $set: {
                onlineuser: true
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/updatedownloadbiodata", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await User.updateOne({ _id: id }, {
            $set: {
                downloadbiodata: true
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/updatechatnow", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await User.updateOne({ _id: id }, {
            $inc: {
                chatnow: 1
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/updatesupport", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await User.updateOne({ _id: id }, {
            $inc: {
                support: 1
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/share", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await User.updateOne({ _id: id }, {
            $inc: {
                share: 1
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/freepersonmatch", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await User.updateOne({ _id: id }, {
            $inc: {
                freepersonmatch: 1
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
profileRouter.post("/marriageloan", async (req, res) => {
    try {
        const { id } = req.body;
        let users = await User.updateOne({ _id: id }, {
            $inc: {
                marriageloan: 1
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
module.exports = profileRouter;