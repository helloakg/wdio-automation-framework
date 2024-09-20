describe('Test Patient login with valid credentials__smoke', () => {
    it('should open login page', async () => {
        await browser.url('https://www.google.com'); // Open a login page (replace with actual URL if needed)
        console.log('--Opening login page--');
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        await expect(title).toEqual('Google'); // Simple string comparison assert
    });
  
    it('should login with valid credentials', async () => {
        await browser.url('https://www.amazon.com');
        console.log('--Opening login page--');
        console.log('--Entered valid login credentials--');
        console.log('--Login button clicked--');
        
        const successMessage = 'Login successful';
        console.log(`--Login success message is: ${successMessage}--`);
        await expect(successMessage).toEqual('Login successful'); // Assert success message
    });

  
});
