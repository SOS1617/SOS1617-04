describe('Add data', function() {
			it('should add a new stat', function() {
				browser.get('https://sos1617-04.herokuapp.com/#!/area');

				element(by.model('api')).sendKeys('12345');

				element(by.buttonText('Send')).click().then(function() {
					element.all(by.repeater('stat in stats'))
						.then(function(initialResults) {
							browser.driver.sleep(2000);
							browser.actions().sendKeys(protractor.Key.ENTER).perform();


							browser.driver.sleep(2000);


							element(by.model("newStat.province")).clear().sendKeys('se');
							element(by.model("newStat.year")).clear().sendKeys('2000');
							
							element(by.model("newStat.areaS")).clear().sendKeys('100');
							element(by.model("newStat.productionS")).clear().sendKeys('100');

							element(by.buttonText('Add')).click().then(function() {
								browser.driver.sleep(2000);
								browser.actions().sendKeys(protractor.Key.ENTER).perform();
							});
							browser.get('https://sos1617-04.herokuapp.com/#!/area');

							element(by.model('api')).sendKeys('12345');

							element(by.buttonText('Send')).click().then(function() {
										element.all(by.repeater('stat in stats'))
											.then(function(results) {
												expect(results.length)
													.toEqual(initialResults.length + 1);
											});

									});
							});

						});
				});

			});
