export class User {
    First_Name: string;
    Last_Name: string;
    Login_Id: string;
    Contact_Number: string;
    Email: string;
    Password: string;
    Confirm_Password: string;
    Login_Status: boolean;
  constructor() {
      this.First_Name = "";
      this.Last_Name = "";
      this.Login_Id = "";
      this.Contact_Number = "";
      this.Email = "";
      this.Password = "";
      this.Confirm_Password = "";
      this.Login_Status = false;
    }
  }