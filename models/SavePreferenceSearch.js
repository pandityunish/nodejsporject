const mongoose=require("mongoose");

const savedSchema=mongoose.Schema({
    email:{
       type:String,
       required:true
    },
    ageList:[
        {
            type:String
        }
    ],
    religionList:[
        {
            type:String
        }
    ],
    kundaliDoshList:[
        {
            type:String
        }
    ],
    maritalStatusList:[
        {
            type:String
        }
    ],
    dietList:[
        {
            type:String
        }
    ],
    drinkList:[
        {
            type:String
        }
    ],
    smokeList:[
        {
            type:String
        }
    ],
    disabilityList:[
        {
            type:String
        }
    ],
    heightList:[
        {
            type:String
        }
    ],
    educationList:[
        {
            type:String
        }
    ],
    professionList:[
        {
            type:String
        }
    ],
    incomeList:[
        {
            type:String
        }
    ],
    location:[
        {
            type:String
        }
    ],
    statelocation:[
        {
            type:String
        }
    ],
    citylocation:[
        {
            type:String
        }
    ],
    userid:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        default:""
    }
},{
    timestamps:true
   });
const SavedPreferSearch=mongoose.model("save_pref_search",savedSchema);
module.exports=SavedPreferSearch;