describe('Add data', function() {
			it('should add a new stat', function() {
				browser.get('http://localhost:8080/#!/export');

				element(by.model('api')).sendKeys('12345');

				element(by.buttonText('Send')).click().then(function() {
					element.all(by.repeater('stat in stats'))
						.then(function(initialResults) {
							browser.driver.sleep(2000);
							browser.actions().sendKeys(protractor.Key.ENTER).perform();


							browser.driver.sleep(2000);


							element(by.model("newStat.province")).clear().sendKeys('se');
							element(by.model("newStat.year")).clear().sendKeys('2000');
							element(by.model("newStat.oil")).clear().sendKeys('100');
							element(by.model("newStat.importS")).clear().sendKeys('100');
							element(by.model("newStat.exportS")).clear().sendKeys('100');

							element(by.buttonText('Add')).click().then(function() {
								browser.driver.sleep(2000);
								browser.actions().sendKeys(protractor.Key.ENTER).perform();
							});
							browser.get('http://localhost:8080/#!/export');

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
