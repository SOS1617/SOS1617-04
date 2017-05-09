describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://localhost:8080');
		var results = element.all(by.repeater('dataUnit in data'));

		expect(results.count()).toBeGreaterThan(1);
	});
});