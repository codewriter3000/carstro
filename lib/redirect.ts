export const redirect = (route: string) => {
    const element = document.createElement('a')
    element.setAttribute(
        'href',
        route
    )

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}