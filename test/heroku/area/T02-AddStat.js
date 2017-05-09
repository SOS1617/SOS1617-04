describe('Add data', function () {
	it('should add a new data', function (){
		browser.get('https://https://sos1617-04.herokuapp.com/#!/area/');

		element.all(by.repeater('dataUnit in data')).then(function (initialResults){
				browser.driver.sleep(2000);
	
				element(by.model('newData.province')).sendKeys('Sevilla');
				element(by.model('newData.year')).sendKeys('2015');
				element(by.model('newData.area')).sendKeys('50');
				element(by.model('newData.production')).sendKeys('20');
				
				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (results){
						expect(results.length).toEqual(initialResults.length+1);
					});
				
				});
			
		});
	});
	
});