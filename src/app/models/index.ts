export type MemeResponse = {
    memes: Meme[],
    next_page_url: string
}

export type Meme = {
    title: string;
    content: {
        contentType: ContentTypes;
        url: string
    }
}

export enum ContentTypes {
    image = 'IMAGE',
    video = "Video"
}
