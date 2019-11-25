const { isAncestor } = require("../methods/tests");

module.exports = ({ node, child }) => {
    return isAncestor({ node, child });
};
