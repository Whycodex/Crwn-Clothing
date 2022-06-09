import { async } from '@firebase/util';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';

const SignIn = () => {
    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocref = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in With Google Popup
            </button>
        </div>
    )
}

export default SignIn;