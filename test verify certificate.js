const { Builder} = require('selenium-webdriver');
const{ expect } = require('Chai');
const CertificatePage = require('../pages/CertificatePage');
const { after } = require('node:test');



describe('проверка отправки сертификата на подлиность', function () {

  let driver;
  const page = {
    goPage: () => driver.get('<https://brunoyam.com/verify>'),
    sleep: (time) => driver.sleep(time),
  };

  before(async function () {
    this.timeout(15000);
    driver = await new Builder().forBrowser('chrome').build();
    CertificatePage = CertificatePage(driver);
    await CertificatePage.open();

  });
  after(async function () {
          await driver.quit();
      });

  it('Поле ФИО Обязательно для заполнения этой формы ', async function () {
    await page.goPage();
    await page.sleep(15000);
    await CertificatePage.submit();
    const errorText = await CertificatePage.getErrorMessage()
    expect(errorText) .to.equal('Это поле ввода обязательно для заполнения');
    await page.sleep(15000);
    });
    it('Показываать ошибку при заполнении неверных данных' , async function (){
       await CertificatePage
       .enterFIO('Несуществующее ФИО ddd')
       .submit();
        
       const errorText = await CertificatePage.getErrorMessage();
       expect(errorText).to.equal('Сертификат с указаными данными отсутсвует!');

    })
});