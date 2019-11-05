const createContext = context => (req, res, next) => {
  req.context = context
  next()
}

module.exports = createContext
