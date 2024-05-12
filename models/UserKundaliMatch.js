const mongoose=require("mongoose");

const kundaliSchema=mongoose.Schema({
    gname:{
        type:String,
        default:"" 
    },
    gday:{
        type:String,
        default:""
    },
    gmonth:{
        type:String,
        default:""
    },
    gyear:{
        type:String,
        default:""
    },
    ghour:{
        type:String,
        default:""
    },
    gsec:{
        type:String,
        default:""
    },
    gplace:{
        type:String,
        default:""
    },
    bname:{
        type:String,
        default:"" 
    },
    bday:{
        type:String,
        default:""
    },
    bmonth:{
        type:String,
        default:""
    },
    byear:{
        type:String,
        default:""
    },
    bhour:{
        type:String,
        default:""
    },
    bsec:{
        type:String,
        default:""
    },
    bplace:{
        type:String,
        default:""
    },
    userid:{
        type:String,
        required:true,
    },
    totalgun:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:""  
    },
    gam:{
        type:String,
        default:""  
    },
    bam:{
        type:String,
        default:""  
    },
},{
    timestamps:true
   });
const Userkundlimatch=mongoose.model("userkundlimatch",kundaliSchema);
module.exports=Userkundlimatch;