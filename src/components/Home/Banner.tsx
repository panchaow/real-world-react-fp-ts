export interface BannerProps {
  appName: string;
}

export const Banner = (props: BannerProps) => {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {props.appName.toLowerCase()}
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
};

