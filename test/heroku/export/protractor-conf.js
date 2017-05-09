exports.config = {
    seleniumAddress: 'http://localhost:9515',
    specs: ['T02-AddStat.js'],
    capabilities: {
        'browserName': 'phantomjs'
    }
};

//'T01-LoadStat.js',