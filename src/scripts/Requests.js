import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `
        <ul>
         ${requests.map(convertRequestToListElement).join("")}
        
        </ul>
       
    `

    return html
}

export const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    return `
   <li>
   ${request.description}
   <button class="request__delete"
   id="request--${request.id}">
Delete
</button>
<select class="plumbers" id="plumbers">
   
    ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
        }
</select>
        </li>

</ul>`
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

