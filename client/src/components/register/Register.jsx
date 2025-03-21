import { useActionState, useContext } from "react";
import { Link } from "react-router";
import { useRegister } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";

export default function Register() {
    // Register custom hook
    const register = useRegister();
    // Get the login handler to automatically login after registration
    const { userLoginHandler } = useContext(UserContext);

    async function registerHandler(previousState, formData) {
        const { email, password, "confirm-password": rePassword } = Object.fromEntries(formData);

        // Here we can make a custom hook for validation
        if (password !== rePassword) {
            // Best to display a message to the user with a toast or something
            console.log(`Passwords do not match!`);

            return;
        }

        const authData = await register(email, password);

        // If the data is valid, then automatically login the user and navigate to the games page
        userLoginHandler(authData);
    }

    const [_, registerAction, isPending] = useActionState(registerHandler, { email: ``, password: ``, confirmPassword: `` });

    return (
        < section id="register-page" className="content auth" >
            <form id="register" action={registerAction}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com" />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" />
                    <input className="btn submit" type="submit" defaultValue="Register" disabled={isPending} />
                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section >
    );
}