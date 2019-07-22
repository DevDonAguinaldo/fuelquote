module.exports = {
    inState: function(state) {
        return state === 'TX' ? true : false;
    },
    hasHistory: function(quoteHistory) {
        return quoteHistory === undefined ? true : false;
    },
    inSummer: function(month) {
        if(month === 6 || month === 7 || month === 8) 
            return true;
        else 
            return false;
    }
};