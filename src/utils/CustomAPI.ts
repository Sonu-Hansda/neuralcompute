import { APIResponseTypes } from "../types/Enums";

const BASEURL = "http://localhost:5000";
const checkAPI = async (): Promise<boolean> => {
  const response: Response = await fetch(`${BASEURL}/check-working`);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

const verifyEmail = async (email: string): Promise<APIResponseTypes> => {
  try {
    const response: Response = await fetch(`${BASEURL}/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    console.log(response);
    
    if (response.status == 200) {
      return APIResponseTypes.verified;
    } else if (response.status == 401) {
      return APIResponseTypes.notVerified;
    } else {
      return APIResponseTypes.error;
    }
  } catch (error) {
    return APIResponseTypes.error;
  }
};

const verifyOTP = async (email: string, otp: number): Promise<boolean> => {
  try {
    const response: Response = await fetch(`${BASEURL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp }),
    });
    if (response.status == 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const sendMail = async (fname:string,email: string,content:string,lname?:string): Promise<APIResponseTypes> => {
  try {
    const response: Response = await fetch(`${BASEURL}/send-email-to-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "fname":fname,
        "lname":lname,
        "email":email,
        "content":content
      }),
    });
   
    if (response.status == 200){
        return APIResponseTypes.success;
    }else if(response.status == 404 || response.status == 401){
        return APIResponseTypes.notFound;
    }
    else{
        return APIResponseTypes.error;
    }

  } catch (error) {
    return APIResponseTypes.error;
  }
};

export { checkAPI, verifyEmail, verifyOTP ,sendMail};
