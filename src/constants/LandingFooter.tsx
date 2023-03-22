interface FooterTypes {
    logo?: string,
    text?: string,
    icons?: string[],
    iconLinks?: string[],
    icon?: string,
    title?: string,
    link?: string
};

export const SocialLinks = {
    facebook: "https://www.facebook.com/companyal/",
    youtube: "https://www.youtube.com/channel/companyal",
    instagram: "https://www.instagram.com/companyal",
    twitter: "https://www.twitter.com/companyal"
}

export const LandingFooterAbout: Array<FooterTypes> = [{
    logo: 'svg/boldo-dual.svg',
    text: `Social media validation business model canvas graphical user interface launch party creative facebook iPad twitter.`,
}]

export const LandingFooterServices: Array<FooterTypes> = [
    {
        title: "Home",
        link: "#"
    },
    {
        title: "Products",
        link: "#"
    },
    {
        title: "Services",
        link: "#"
    }
];

export const LandingFooterSupport: Array<FooterTypes> = [
    {
        title: "Blog",
        link: "#"
    },
    {
        title: "Products",
        link: "#"
    },
    {
        title: "Services",
        link: "#"
    }
];
