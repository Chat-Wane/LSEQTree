
/*!
 * \class Couple
 * \brief Immutable and unique couples which contains an element and its id
 * \param e the element
 * \param i the identifier
 */
function Couple(e, i){
    this._e = e;
    this._i = i;
};

/*!
 * \brief Compare the couples regarding their identifier
 * \param o the other couple to compare with
 * \return negative value if this<o; zero if this=o; positive value if this>o
 */
Couple.prototype.compare = function(o){
    return this._i.compare(o._i);
};

module.exports = Couple;
