describe('Add data', function() {
	it('should add a new data', function() {
		browser.get('http://localhost:8080/#!/export');

		element.all(by.repeater('dataUnit in data'))
		.then(function(initialResults) {
			browser.driver.sleep(10000);

			element(by.model('newData.province')).sendKeys('sevilla');
			element(by.model('newData.year')).sendKeys('2000');
			element(by.model('newData.oil')).sendKeys('100');
			element(by.model('newData.importS')).sendKeys('100');
			element(by.model('newData.exportS')).sendKeys('100');
			browser.waitForAngular();



			element(by.buttonText('Add')).click().then(function() {

				element.all(by.repeater('dataUnit in data'))
				.then(function(results) {
					expect(results.length)
					.toEqual(initialResults.length + 1);
				});

			});

		});
	});

});
