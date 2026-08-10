const ADMIN_IDS = process.env.ADMIN_IDS
    .split(",")
    .map(id => Number(id.trim()));

function isAdmin(userId) {
    return ADMIN_IDS.includes(userId);
}

module.exports = {
    isAdmin
};