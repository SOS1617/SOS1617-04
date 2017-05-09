exports.config = {
    seleniumAddress: 'http://localhost: 9515',
    specs: ['heroku/area/T01-LoadStat.js','heroku/area/T02-AddStat'],
    capabilities: {
        'browserName': 'phantomjs'
    }
};