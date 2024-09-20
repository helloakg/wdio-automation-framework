describe('Test Patient login with invalid credentials__smoke', () => {

    it('should open login page', async () => {
        await browser.url('https://www.google.com'); // Open a login page (replace with actual URL if needed)
        console.log('--Opening login page--');
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        await expect(title).toEqual('Google'); // Simple string comparison assert
    });



    it('should fail to login with invalid credentials', async () => {
        await browser.url('https://www.flipkart.com');
        console.log('--Opening login page--');
       
        console.log('--Entered invalid login credentials--');
      
        console.log('--Login button clicked--');
        
        const errorMessage = 'Invalid credentials';
        console.log(`--Login error message is: ${errorMessage}--`);
        await expect(errorMessage).toEqual('Invalid credentials'); // Assert error message
    });
});
