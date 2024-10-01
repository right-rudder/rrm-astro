import Marquee from 'react-fast-marquee';
import clientLogos from '../data/clientLogos.js';

const MarqueeComponent = () => {
    return (
        <div className="">
          <Marquee
            pauseOnHover={true}
            gradient={true}
            gradientColor="#091220"
            style={{ zIndex: -20 }}
          >
              {clientLogos.map((logo, index) => (
                  <a
                      href={logo.link}
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex justify-center align-middle py-2"
                  >
                      <img
                          src={logo.url}
                          alt={`${logo.name} logo`}
                          className={`min-w-16 md:max-h-16 max-w-36 md:max-w-52 w-full object-contain duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-110 ${
                              logo.invert ? 'invert' : ''
                          }`}
                          style={{ margin: '0 20px' }}
                      />
                  </a>
              ))}
          </Marquee>
        </div>
    );
};

export default MarqueeComponent;
