export interface Volume {
    accessInfo?: {};
    etag?: string;
    id?: string;
    kind?: string;
    saleInfo?: {};
    selfLink?: string;
    volumeInfo?: VolumeInfo;
}

export interface VolumeInfo {
    allowAnonLogging?: boolean;
    authors?: string[];
    canonicalVolumeLink?: string;
    categories?: string[];
    contentVersion?: string;
    imageLinks?: { smallThumbnail: string, thumbnail: string };
    industryIdentifiers?: []
    infoLink?: string;
    language?: string;
    maturityRating?: string;
    pageCount?: number;
    previewLink?: string;
    printType?: string;
    publishedDate?: string;
    publisher?: string;
    readingModes?: {};
    subtitle?: string;
    title?: string;
}