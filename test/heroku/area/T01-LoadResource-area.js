describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		//browser.get('https://localhost:8080');
		browser.get('https://sos1617-04.herokuapp.com/#!/area');
		browser.driver.sleep(2000);
		element(by.model('api')).sendKeys('12345');
		var data = element.all(by.repeater('dataUnit in data'));

		expect(data.count()).toBeGreaterThan(5);
	});
});