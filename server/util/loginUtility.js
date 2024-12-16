const citizen = {
    users: require("./../models/citizen.json"),
    createUser: function (data) { this.users = data}
}


const validateCitizenName = (citizenName) => {
    const emailRegex = /^\w+@[a-zA-Z_\.]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(citizenName) || !citizenName.includes("@"); 
  }
  
module.exports = validateCitizenName;