import { mainContainer } from "./main.js"
const applicationState = {
    requests: [],
    plumbers: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                // Store the external state in application state
                applicationState.plumbers = data
            }
        )
}

// export const fetchCompletions = () => {
//     return fetch(`${API}/completions`)
//         .then(response => response.json())
//         .then(
//             (finished) => {
//                 applicationState.completions = finished
//             }
//         )
// }



export const getRequests = () => {
    // return applicationState.requests.map(request => ({ request }))
return [...applicationState.requests]
}
export const getPlumbers = () => {
    return [...applicationState.plumbers]
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

    // return fetch(`${API}/requests`, fetchOptions)
    //     .then(response => response.json())
    //     .then(() => {

    //     })
}
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}