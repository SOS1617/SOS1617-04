describe('Data is loaded', function() {
			it('should show a bunch of data', function() {
				browser.get('http://localhost:8080/#!/export');
				element(by.model('api')).sendKeys('12345');
				element(by.buttonText('Send')).click().then(function() {
					var results = element.all(by.repeater('stat in stats'));
					expect(results.count()).toBeGreaterThan(1);
				});

				});
			});
