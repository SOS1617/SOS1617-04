describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://https://sos1617-04.herokuapp.com/#!/area/');
		element(by.model('api')).sendKeys('12345');
		var results = element.all(by.repeater('dataUnit in data'));

		expect(results.count()).toBeGreaterThan(5);
	});
});