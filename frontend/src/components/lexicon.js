const paperStatus = [
    "researching",
    "writing",
    "readySubmit",
    "submitting",
    "submitted",
    "underReview",
    "underEdit",
    "rejected",
    "accepted",
    "canceled"
]
exports.paperStatusList = paperStatus;

const paperTypes = [
    "domesticConf",
    "foreignConf",
    "domesticJour",
    "foreignJour"
]
exports.paperTypesList = paperTypes;

const gender = [
    "male",
    "female"
]
exports.genderList = gender;

const prefix = (locale)=>{
    const list = [
        "Prof",
        "Dr",
        "Mr",
        "Ms"
    ]
    if(locale!=='fa'){
        list.push("Mrs")
        list.push("Miss")
    }
    return list
}
exports.prefixList = prefix;

const educationDegree = [
    "bc_stu",
    "bc",
    "master_stu",
    "master",
    "phd_stu",
    "phd",
    "postDoc"
]
exports.educationDegreeList = educationDegree;
