import {ACCESS_TOKEN, API_BASE_URL} from './Constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest) {
    return request({
        url: API_BASE_URL + "/auth/register",
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/accounts/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/accounts/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/accounts/me",
        method: 'GET'
    });
}

export function getPosts() {
    return request({
        url: API_BASE_URL + "/posts",
        method: 'GET',
    });
}

export function getTopicsList() {
    return request({
        url: API_BASE_URL + "/forum",
        method: 'GET',
    });
}

export function getPostsUnderTopic(id) {
    return request({
        url: API_BASE_URL + "/forum/topic/" + id,
        method: 'GET',
    });
}

export function addTopic(topic) {
    return request({
        url: API_BASE_URL + "/forum/addTopic",
        method: 'POST',
        body: JSON.stringify(topic)
    });
}

export function addPostToTopic(post) {
    return request({
        url: API_BASE_URL + "/forum/addForumPost",
        method: 'POST',
        body: JSON.stringify(post)
    });
}

export function deleteTopic(id) {
    return request({
        url: API_BASE_URL + "/forum/topic/ " + id,
        method: 'DELETE',
    })
}

export function editTopic(topic) {
    return request({
        url: API_BASE_URL + "/forum/topic",
        method: 'PUT',
        body: JSON.stringify(topic)
    })
}

