let mongoose = require("mongoose");
// const Schema = mongoose.Schema; 
//Page Schema
var PageSchema = mongoose.Schema({
    
    title:{
        type:String,
        require:true
    },
    slug:{
        type:String
    },
    content:{
        type:String,
        require:true
    },
    sorting:{
        type:Number
    }
});


let page = module.exports = mongoose.model("Page", PageSchema);