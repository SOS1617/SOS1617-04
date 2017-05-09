describe('Add data', function() {
	it('should add a new data', function() {
		browser.get('http://localhost:8080/#!/price');

		element.all(by.repeater('dataUnit in data'))
		.then(function(initialResults) {
			browser.driver.sleep(10000);

			element(by.model('newData.province')).sendKeys('sevilla');
			element(by.model('newData.year')).sendKeys('2007');
			element(by.model('newData.priceaceite')).sendKeys('10');
			element(by.model('newData.priceextra')).sendKeys('8');
			element(by.model('newData.pricevirgen')).sendKeys('7');
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
