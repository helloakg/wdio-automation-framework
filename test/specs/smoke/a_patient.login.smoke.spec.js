import allureReporter from "@wdio/allure-reporter";


describe('Test Patient Login Module__smoke', () => {

    xit("Test allure",async()=>{

        await expect('Google').toEqual('Google');


    })



    it('TC_1 should open login page @smoke @critical', async () => {
        allureReporter.addFeature('--login page--');
        allureReporter.addSeverity('critical');
        
        // Open the page (you can replace this with the actual login page URL)
        await browser.url('https://www.google.com'); 
        console.log('--Opening login page--');
        allureReporter.addStep('--Opening login page--');
        
        // Get and log page title
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        allureReporter.addStep('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        allureReporter.addStep(`--Page title is: ${title}--`);
        
        // Expect the title to be "Google"
        await expect(title).toEqual('Google');
        
        // Interact with the search box (will update lastElement)
        await browser.$('[name="q"]').setValue('mobiles');
        await browser.pause(2000);
    
        // Intentionally fail this step by setting value to a non-interactable element
        //await browser.$('*=Gmail').setValue('buggy code');
        await browser.pause(2000);
    });


    xit('TC_2 should open login page @smoke @critical', async () => {
        allureReporter.addFeature('--login page opening--')
        allureReporter.addSeverity('minor')
        await browser.url('https://www.google.com'); // Open a login page (replace with actual URL if needed)
        console.log('--Opening login page--');
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        await expect(title).toEqual('Google'); // Simple string comparison assert
    });

    xit('TC_3 should open login page @smoke @critical', async () => {
        allureReporter.addFeature('--login page valid test--')
        allureReporter.addSeverity('minor')
        await browser.url('https://www.google.com'); // Open a login page (replace with actual URL if needed)
        console.log('--Opening login page--');
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        await expect(title).toEqual('Google'); // Simple string comparison assert
    });

    xit('TC_4 should open login page @smoke @critical', async () => {
        allureReporter.addFeature('--login page invalid--')
        allureReporter.addSeverity('medium')
        await browser.url('https://www.google.com'); // Open a login page (replace with actual URL if needed)
        console.log('--Opening login page--');
        const title = await browser.getTitle();
        console.log('--Page title fetched--');
        console.log(`--Page title is: ${title}--`);
        await expect(title).toEqual('Google2'); // Simple string comparison assert
    });

  
});
