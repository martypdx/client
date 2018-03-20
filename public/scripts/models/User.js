'use strict';

(function (module) {

    const User = {};

    User.current = null;

    const setTokenHeader = token => {
        $.ajaxSetup({
            headers: { token: token }
        });
    };

    User.signup = credentials => {
        return $.post(`${API_URL}/auth/signup`, credentials)
            .then(response => {
                User.current = true;
                window.localStorage.token = response.token;
                setTokenHeader(response.token);
            });
    };

    User.signin = credentials => {
        return $.post(`${API_URL}/auth/login`, credentials)
            .then(response => {
                User.current = true;
                window.localStorage.token = response.token;
                setTokenHeader(response.token);
            });
    };

    User.tryToken = () => {
        const token = window.localStorage.token;
        if(!token) return;

        setTokenHeader(token);
        User.current = true;
    };

    User.logout = () => {
        window.localStorage.removeItem('token');
        User.current = false;
    };

    module.User = User;

})(window.module);