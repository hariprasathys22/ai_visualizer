
export const APPCONSTANTS = {
    HOME: {
        logo: getImagePath('logo.png')
    }
}

function getImagePath(imageName: string): string{
    return `/assets/images/${imageName}`
}