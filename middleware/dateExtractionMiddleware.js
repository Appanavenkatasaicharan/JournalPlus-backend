
const extractDate = (req,res,next) => {
    const {date} = req.params
    if(!date)
    req.date = new Date(date)
    next()
} 

module.exports = extractDate