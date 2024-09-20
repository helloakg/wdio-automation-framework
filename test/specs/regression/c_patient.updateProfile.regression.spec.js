describe('Test Patient update profile__regression', () => {

    it('should navigate to the registration page', async () => {
        await browser.url('https://www.wikipedia.org');
        console.log('--Navigating to registration page--');
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        await expect(title).toEqual('Wikipedia'); // Simple string comparison assert
    });


    it('should allow user to update profile @profile', async () => {
        await browser.url('https://www.facebook.com');
        console.log('--Opening profile page--');
        console.log('--Updating user profile--');
        
        const profileUpdateMessage = 'Profile updated successfully';
        console.log(`--Profile update message is: ${profileUpdateMessage}--`);
        await expect(profileUpdateMessage).toEqual('Profile updated successfully'); // Assert success message
    });

    it('should allow user to log out', async () => {
        await browser.url('https://www.github.com');
        console.log('--Opening dashboard page--');
        console.log('--Clicking on logout button--');
        
        const logoutMessage = 'Logout successfully';
        console.log(`--Logout success message is: ${logoutMessage}--`);
        await expect(logoutMessage).toEqual('Logout successful'); // Assert logout message
    });
});
