export default function Hero() {
  return (
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage:
            "url(https://th.bing.com/th/id/R.dd525ef8ec4debb16d9341db3be66286?rik=u%2fE6P743RoxBIQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f7%2f5%2f7%2f596539.jpg&ehk=yYVrkHopg3PUEDipDdAy%2bqxRGXJdJq7qkqpmVfzvixI%3d&risl=&pid=ImgRaw&r=0)",
        }}
      >
        <div className="hero-overlay bg-opacity-80 "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-light">
              Discover the last blogs
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae.
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
