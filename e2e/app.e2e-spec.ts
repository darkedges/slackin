import { SlackinPage } from './app.po';

describe('slackin App', function() {
  let page: SlackinPage;

  beforeEach(() => {
    page = new SlackinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
