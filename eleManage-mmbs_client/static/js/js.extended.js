Array.prototype.contains = function(str) {
    for (i in this) {
        if (this[i] == str) return true;
    }
    return false;
}