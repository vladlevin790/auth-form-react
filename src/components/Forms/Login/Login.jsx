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

                {(email.isDirty && email.emptyInput) && <div style={{color:"rgba(255, 3, 3, 0.85)", fontWeight:"bold", textShadow:"0px 1px 1px #8a3749"}}>Поле не может быть пустым</div>}
                {(email.isDirty && email.minLength) && <div style={{color:"rgba(255, 3, 3, 0.85)", fontWeight:"bold", textShadow:"0px 1px 1px #8a3749"}}>Email слишком короткий</div>}
                {(email.isDirty && email.emailError) && <div style={{color:"rgba(255, 3, 3, 0.85)", fontWeight:"bold", textShadow:"0px 1px 1px #8a3749"}}>Это не эллектронная почта</div>}

                <input
                    onChange={e => email.onChange(e)}
                    onBlur={e => email.onBlur(e)}
                    value={email.value}
                    type="text"
                    placeholder="Эллектронная почта"
                />


                {(password.isDirty && password.emptyInput) && <div style={{color:"rgba(255, 3, 3, 0.85)", fontWeight:"bold", textShadow:"0px 1px 1px #8a3749"}}>Поле не может быть пустым</div>}
                <input
                    onChange={e => password.onChange(e)}
                    onBlur={e => password.onBlur(e)}
                    type="password"
                    placeholder="Пароль"
                />

                <button disabled={!email.inputValid || ! password.inputValid} type="submit">Авторизоваться</button>

            </form>
        </div>
    )

}