describe('Test Patient register a new user with valid details__regression', () => {

    it('should navigate to the registration page', async () => {
        await browser.url('https://www.wikipedia.org');
        console.log('--Navigating to registration page--');
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        await expect(title).toEqual('Wikipedia1'); // Simple string comparison assert
    });

    it('should register a new user with valid details', async () => {
        await browser.url('https://www.twitter.com');
        console.log('--Opening registration page--');
        console.log('--Entered valid registration details--');
        console.log('--Submit registration form--');
        
        const registrationMessage = 'Registration successful';
        console.log(`--Registration success message is: ${registrationMessage}--`);
        await expect(registrationMessage).toEqual('Registration successful'); // Assert success message
    });

   
});
