const { Builder} = require('selenium-webdriver');
const{ expect } = require('chai');
const CertificatePage = require('C:/code3/CertificatePage.js');
require ('chromedriver');


describe('проверка отправки сертификата на подлиность', function () {

  let driver;
  let certificatePage;

  before(async function () {
    this.timeout(15000);
    driver = await new Builder().forBrowser('chrome').build();
    certificatePage = new CertificatePage(driver);
    await certificatePage.open();

  });
  after(async function () {
          await driver.quit();
      });

  it('Поле ФИО Обязательно для заполнения этой формы ', async function () {
    await certificatePage.submit();
    const errorText = await certificatePage.getErrorMessage()
    expect(errorText) .to.equal('Это поле ввода обязательно для заполнения');
    });
    it('Показываать ошибку при заполнении неверных данных' , async function (){
       await certificatePage.enterFIO('Несуществующее ФИО ddd')
       await certificatePage.submit();
        
       const errorText = await certificatePage.getErrorMessage();
       expect(errorText).to.equal('Сертификат с указаными данными отсутсвует!');

    })
});
