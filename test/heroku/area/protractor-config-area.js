exports.config = {
    seleniumAddress: 'http://localhost:9515',
    specs: ['T01-LoadResource-area.js','T02-AddResource-area.js'],
    capabilities: {
        'browserName': 'phantomjs'
    }
};