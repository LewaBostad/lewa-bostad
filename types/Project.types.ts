import { StaticImageData } from "next/image";

export interface Project {
    title: string;
    location: string;
    status: string;
    image: StaticImageData;
    imageAlt: string;
}
