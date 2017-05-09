exports.config = {
    seleniumAddress: 'http://localhost: 9515',
    specs: ['T01-LoadStat.js','T02-AddStat'],
    capabilities: {
        'browserName': 'phantomjs'
    }
};