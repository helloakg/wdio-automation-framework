describe("Test Case 1",()=>{

    it("test google search page",async()=>{
        await browser.url("https://www.google.com")
        await browser.pause(2000)
        await browser.$("[name='q']").setValue('mobiles')
        await browser.pause(2000)
        const title=await browser.getTitle();
        console.log("Title is: ", title);
        console.log("Test Ended");
        

})

})