class CertificatePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get('https://brunoyam.com/verify');
  }
async getErrorMessage() {

  const errorElement = await this.driver.findElement(By.css('error-message'));
  return await errorElement.getText();
}
  async enterFIO(fio) {
  const falied  = await this.driver.findElement(By.id('fio-input'));
  await  FileDetector.sendkeys(fio);
    return this; 
  }

  async submit() {
   const button = await this.driver.findElement(By.id('submit-button'));
   return this;
  }

  async getErrorMessage() {
  
  }
}

module.exports = CertificatePage;