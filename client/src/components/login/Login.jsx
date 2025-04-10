import { useActionState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const [_, loginAction, isPending] = useActionState(loginHandler, { email: ``, password: `` });

    const { userLoginHandler } = useUserContext();

    // Get the login custom hook
    const login = useLogin();


    async function loginHandler(_, formData) {
        console.log(formData);
        const values = Object.fromEntries(formData);

        const authData = await login(values.email, values.password);

        // Simple valid user check
        if (authData?.code === 403) {
            console.log(`Invalid credentials`);
            return;
        }

        userLoginHandler(authData);

        // Return to the page before the login
        navigate(-1);
    }

    return (
        < section id="login-page" className="auth" >
            <form id="login" action={loginAction}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" defaultValue="Login" disabled={isPending} />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section >
    );
}
