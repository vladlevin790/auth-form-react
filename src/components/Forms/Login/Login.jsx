import {userInput} from "../Hooks/UserInput.jsx";

export const Login = () =>{

    const email = userInput("",{emptyInput:true, minLength:4 , emailError: true})
    const password = userInput("", {emptyInput:true})


    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        email.clear()
        fakeServerLogin(email.value, password.value);
    };

    function fakeServerLogin(email, password) {

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Успешная аутентификация!');
            })
            .catch(error => {
                console.error(error.message);
                alert('Ошибка аутентификации');
            });
    }

    return(
        <div className="login-form">
            <form onSubmit={handleSubmit}>

                <h2>Авторизация</h2>

                {email.isDirty && (
                    <div style={{ color: "rgba(255, 3, 3, 0.85)", fontWeight: "bold", textShadow: "0px 1px 1px #8a3749" }}>
                        {email.emptyInput && "Поле не может быть пустым"}
                        {!email.emptyInput && email.minLength && "Email слишком короткий"}
                        {!email.emptyInput && !email.minLength && email.emailError && "Это не электронная почта"}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="fa-solid fa-envelope"></label>
                    <input
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                        value={email.value}
                        type="text"
                        name="email"
                        placeholder="Эллектронная почта"
                    />
                </div>


                {(password.isDirty && password.emptyInput) && <div style={{color:"rgba(255, 3, 3, 0.85)", fontWeight:"bold", textShadow:"0px 1px 1px #8a3749"}}>Поле не может быть пустым</div>}

                <div>
                    <label htmlFor="password" className="fa-solid fa-lock"></label>
                    <input
                        onChange={e => password.onChange(e)}
                        onBlur={e => password.onBlur(e)}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                    />
                </div>
                <button disabled={!email.inputValid || !password.inputValid} type="submit">Авторизоваться</button>

            </form>
        </div>
    )

}