describe('Add data', function () {
	it('should add a new data', function (){
		browser.get('https://sos1617-sos161704lgz.c9users.io/price.html');

		element.all(by.repeater('dataUnit in data')).then(function (initialResults){
				browser.driver.sleep(2000);
	
				element(by.model('newData.province')).sendKeys('Sevilla');
				element(by.model('newData.year')).sendKeys('2049');
				element(by.model('newData.priceaceite')).sendKeys('50');
				element(by.model('newData.priceextra')).sendKeys('20');
				element(by.model('newData.pricevirgen')).sendKeys('50000');
				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (results){
						expect(results.length).toEqual(initialResults.length+1);
					});
				
				});
			
		});
	});
	
});