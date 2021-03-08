const Utility = (() => {
    return {
        getFileExtension: (mimetype) => {
            return (/[/]/.exec(mimetype)) ? /[^/]+$/.exec(mimetype) : undefined;
        }
    }
})();

module.exports = Utility;

