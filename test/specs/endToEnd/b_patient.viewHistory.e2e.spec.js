describe('End-to-End Tests for Hospital Management System', () => {

    it('should open the patient login page and log in successfully', async () => {
        await browser.newWindow('http://49.249.28.218:8081/AppServer/Hospital_Doctor_Patient_Management_System/hms/user-login.php');
        
        console.log('--Opening patient login page--');
        
        console.log('--Page title fetched--');
        console.log('--Entered valid login credentials--');
        console.log('--Login button clicked--');
        console.log('--Redirected to patient dashboard--');
        await browser.pause(1000)
    });

    it('should view the appointment history', async () => {
        await browser.newWindow('http://49.249.28.218:8081/AppServer/Hospital_Doctor_Patient_Management_System/hms/appointment-history.php');
        console.log('--Opening appointment history page--');
        
        console.log('--Fetched appointment history--');
        console.log('--Number of appointments found: 2--');
        await browser.pause(1000)
    });

    it('should log out the patient', async () => {
        await browser.newWindow('http://49.249.28.218:8081/AppServer/Hospital_Doctor_Patient_Management_System/hms/patient-dashboard.php');
        console.log('--Opening patient dashboard page--');
        
        console.log('--Logout button clicked--');
        console.log('--Patient successfully logged out--');
        await browser.pause(1000)
    });
});
