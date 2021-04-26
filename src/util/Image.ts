

// TODO should src be a string? Is there a more specific type?
export const loadImage = (src: string): Promise<HTMLImageElement> => 
    new Promise((resolve, reject) => {
        const img = new Image();
        // Setting this forces the image to start loading
        img.src = src;

        // Something went wrong
        // This shouldn't happen since we aren't fetching our images
        // from a network, but from a dataURI
        img.onerror = error => reject(error);

        // Loading finished, the img can be used now
        img.onload = () => resolve(img);
    });
