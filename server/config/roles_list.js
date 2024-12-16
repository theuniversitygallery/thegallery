const ROLES = {
    "Admin": 4507,
    "Editor": 4560,
    "Basic": 1997
}
const ROLES_LIST = {
    "Admin": { "Admin": ROLES.Admin, "Editor": ROLES.Editor, "Basic": ROLES.Basic },
    "Editor": { "Editor": ROLES.Editor, "Basic": ROLES.Basic },
    "Basic": { "Basic": ROLES.Basic }
};

module.exports = ROLES_LIST;