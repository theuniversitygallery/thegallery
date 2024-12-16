// const sessionCode = process.env.sessionSetting
const sessionSetting = {
    secret:  process.env.sessionSetting || 'BEC4CDA3995632E818C67BB118C51',
    saveUninitialized: false,
    resave: false,
    visted: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
 
}

module.exports =  sessionSetting;