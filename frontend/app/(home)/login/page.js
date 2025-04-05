import LoginForm from '../_components/LoginForm';

const LoginPage = () => {
    return (
        <div>
            <div className="container">
                <div className="max-w-xl px-8 py-10 mx-auto mt-10 bg-white border border-gray-400 rounded-xl">
                    <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                        Login User
                    </h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
