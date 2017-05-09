exports.config = {
    seleniumAddress: 'http://localhost: 9515',
    specs: ['T01-LoadResource.js','T02-AddResource'],
    capabilities: {
        'browserName': 'phantomjs'
    }
};