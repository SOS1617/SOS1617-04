describe('Add data', function () {
	it('should add a new data', function (){
		
		browser.get('https://sos1617-04.herokuapp.com/#!/area/');
		element(by.model('api')).sendKeys('12345');
		element(by.buttonText('Send')).click().then(function (){
		element.all(by.repeater('dataUnit in data')).then(function (initialArea){
				browser.driver.sleep(10000);
				
				element(by.model('newStat.province')).sendKeys('prueba');
				element(by.model('newStat.year')).sendKeys('2013');
				element(by.model('newStat.areaS')).sendKeys('100');
				element(by.model('newStat.productionS')).sendKeys('200');
				
				element(by.buttonText('Add')).click().then(function (){
					browser.driver.sleep(10000);
					element.all(by.repeater('dataUnit in data')).then(function (areaStats){
						expect(areaStats.length).toEqual(initialArea.length+1);
					});
				
				});
			
		});
	});
	
});
});