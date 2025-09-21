interface BannerProps {
    title: string;
}

//prop title displays inside Banner component
const Banner = ({title}: BannerProps) => (
    <h1 className="text-center place-content-center my-8">{title}</h1>
);

export default Banner;