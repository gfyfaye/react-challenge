interface BannerProps {
    title: string;
}

//prop title displays inside Banner component
const Banner = ({title}: BannerProps) => (
    <h1>{title}</h1>
);

export default Banner;