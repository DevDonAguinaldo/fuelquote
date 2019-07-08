module.exports = {
    inState: function(state) {
        return state === 'TX' ? true : false;
    },
    hasHistory: function(quoteHistory) {
        return quoteHistory === undefined ? true : false;
    },
    inSummmer: function(month) {
        if(month === 'May' || month === 'June' || month === 'July' || month === 'August') return true;
        else return false;
    }
};