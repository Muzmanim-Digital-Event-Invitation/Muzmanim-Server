import { execute } from "../2-utils/dal";
import { UserModel } from "../4-models/UserModel";

export async function getUserIdByEmail(email: string) {
    
    const query = "SELECT * FROM users WHERE email = ?;";
    const [rows] = await execute<UserModel>(query, [email]);
    if(!rows[0]){
      console.log("there is no user with this email");
      return false;
    }
    return rows[0].id
}


export async function Register(email: string): Promise<boolean> {
    const [existingUser] = await execute<UserModel>("SELECT * FROM users WHERE email = ?", [email]);
    console.log(existingUser);
    console.log("test");
    
    if (existingUser[0]) {
      return false;
    }
    
    const query = "INSERT INTO users (email) VALUES (?);";
    const result = await execute(query, [email]);
    return true;
  }

